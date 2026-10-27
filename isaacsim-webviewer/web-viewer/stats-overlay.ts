// Shows stream stats (codec / bitrate / resolution ...) in an on-page overlay and the browser console.
// Built into the web viewer by the Dockerfile; `reportStats` is wired to the stream's onStreamStats callback.

const LOG_INTERVAL_MS = 2000;

let overlay: HTMLDivElement | null = null;
let lastLogTime = 0;

function getOverlay(): HTMLDivElement {
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.style.cssText =
            'position:fixed;top:8px;left:8px;z-index:10000;padding:6px 10px;' +
            'background:rgba(0,0,0,0.65);color:#7CFC00;font:12px/1.4 monospace;' +
            'white-space:pre;pointer-events:none;border-radius:4px;';
        document.body.appendChild(overlay);
    }
    return overlay;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function reportStats(message: any): void {
    const s = message?.data?.stats;
    if (!s) {
        return;
    }

    const text =
        `codec      ${s.codec}\n` +
        `resolution ${s.streamingResolutionWidth}x${s.streamingResolutionHeight}\n` +
        `fps        ${s.fps}\n` +
        `bitrate    ${Number(s.currentBitrate).toFixed(1)} Mbps\n` +
        `bandwidth  ${Number(s.totalBandwidth).toFixed(1)} Mbps (${Number(s.utilizedBandwidth).toFixed(0)}% used)\n` +
        `rtd        ${s.rtd} ms, decode ${Number(s.avgDecodeTime).toFixed(1)} ms\n` +
        `loss       frame ${s.frameLoss}, packet ${s.packetLoss}`;
    getOverlay().textContent = text;

    const now = performance.now();
    if (now - lastLogTime >= LOG_INTERVAL_MS) {
        lastLogTime = now;
        console.log('[stream-stats]', s);
    }
}
