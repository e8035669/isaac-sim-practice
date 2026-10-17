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

### 執行 ROS 2

```bash
pixi run ros2 <指令>
```

例如：

```bash
pixi run ros2 run turtlesim turtlesim_node
pixi run ros2 topic list
```
