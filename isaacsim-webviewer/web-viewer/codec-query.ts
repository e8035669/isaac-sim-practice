// The streaming library (ov-web-rtc 6.x) only reads these codec switches from the page URL,
// not from the stream config. Add them once and reload, so the viewer works without a manual query string.

const codec = (import.meta.env.VITE_VIDEO_CODEC as string | undefined)?.toUpperCase();

if (codec) {
    const url = new URL(window.location.href);
    if (!url.searchParams.has('codeclist')) {
        const order = [codec, ...['AV1', 'H265', 'H264'].filter((c) => c !== codec)];
        url.searchParams.set('av1', 'true');
        url.searchParams.set('h265', 'true');
        url.searchParams.set('codeclist', order.join(','));
        window.location.replace(url.toString());
    }
}
