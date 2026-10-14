#!/bin/sh
# Isaac Sim's bundled FBX SDK needs libxml2.so.2, which conflicts with the libxml2.so.16
# used by the main environment. Copy only libxml2.so.2 and its dependencies from the
# separate xml2-legacy environment so LD_LIBRARY_PATH does not expose the whole env.
# https://github.com/isaac-sim/IsaacLab/issues/5777
# https://github.com/isaac-sim/IsaacSim/discussions/824
src="$PIXI_PROJECT_ROOT/.pixi/envs/xml2-legacy/lib"
dst="$PIXI_PROJECT_ROOT/.pixi/xml2-legacy-libs"

if [ ! -e "$dst/libxml2.so.2" ] && [ -d "$src" ]; then
    mkdir -p "$dst"
    for lib in libxml2.so.2 libicuuc.so.75 libicudata.so.75 libiconv.so.2 liblzma.so.5 libz.so.1; do
        cp -L "$src/$lib" "$dst/$lib"
    done
fi
