# isaac-sim-practice

使用 [pixi](https://pixi.sh) 管理 Isaac Sim 6.2 與 ROS 2 Jazzy (RoboStack) 的練習專案。

## 系統需求

- Linux x86_64 (glibc >= 2.35，例如 Ubuntu 22.04 / 24.04)
- NVIDIA GPU 與對應驅動程式
- 已安裝 [pixi](https://pixi.sh)

## 安裝

```bash
git clone https://github.com/e8035669/isaac-sim-practice.git
cd isaac-sim-practice
pixi install --all
```

> 必須使用 `--all`，才會一併安裝 `xml2-legacy` 環境。
> Isaac Sim 內建的 FBX SDK 需要舊版 `libxml2.so.2`，與主環境的 `libxml2.so.16` 衝突，
> 因此另外建立 `xml2-legacy` 環境 (libxml2 2.13)，啟動時由
> [scripts/stage-libxml2-legacy.sh](scripts/stage-libxml2-legacy.sh) 將所需的函式庫複製到
> `.pixi/xml2-legacy-libs` 並加入 `LD_LIBRARY_PATH`。

## 使用方式

### 執行 Isaac Sim

```bash
pixi run isaacsim
```

### 串流模式 (Streaming)

```bash
pixi run isaac-streaming
```

此 task 已加上 `--/app/window/dpiScaleOverride=1.5`。串流模式是 headless 虛擬視窗，沒有實體
顯示器，不會自動套用系統的 HiDPI 縮放，所以用這個參數放大介面，否則文字會非常小。
數值可依個人螢幕調整 (例如 `1.25`)。

串流畫面文字模糊的原因：Chrome 與 Electron 打包的程式會響應系統 HiDPI 設定 (例如 125%)，
因此向伺服器請求較小的影片解析度，再於本機放大顯示。連線時需抵銷系統的 HiDPI 縮放：

- **Chrome (Web viewer)**：使用網頁縮放功能抵銷系統縮放。系統為 125% 時，將網頁縮放設為 80%，
  請求的串流解析度就會剛好等於螢幕解析度，文字才會銳利。
- **Isaac Sim WebRTC Streaming Client (桌面 client app)**：以下列指令啟動，關閉裝置縮放：

  ```bash
  /opt/Isaac\ Sim\ WebRTC\ Streaming\ Client/isaacsim-webrtc-streaming-client --force-device-scale-factor=0
  ```

> Web viewer ([isaacsim-webviewer/](isaacsim-webviewer)) 已啟用 `fitStreamResolution: true`，
> 串流解析度會跟隨網頁大小。
>
> 編碼格式 (H264 等) 造成的畫質問題目前未找到伺服器端的調整方式，暫時擱置。

### 執行 ROS 2

```bash
pixi run ros2 <指令>
```

例如：

```bash
pixi run ros2 run turtlesim turtlesim_node
pixi run ros2 topic list
```
