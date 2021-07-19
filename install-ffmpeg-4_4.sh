#!/bin/bash

# Make bashline configurations.
set -e
RESET='\033[0m'
COLOR='\033[1;32m'
COLOR_ERR='\033[1;31m'

function msg {
  echo -e "${COLOR}$(date): $1${RESET}"
}

function msg_err {
  echo -e "${COLOR}$(date): $1${RESET}"
}

function fail {
  msg_err "Error : $?"
  exit 1
}

function mcd {
  mkdir -p "$1" || fail
  cd "$1" || fail
}

msg "Install apt packages."
sudo apt-get update -qq || fail
sudo apt-get -y install \
  autoconf automake build-essential cmake \
  git-core libass-dev libfreetype6-dev \
  libgnutls28-dev libsdl2-dev libtool \
  libva-dev libvdpau-dev libvorbis-dev \
  libxcb1-dev libxcb-shm0-dev libxcb-xfixes0-dev \
  meson ninja-build pkg-config texinfo wget yasm \
  zlib1g-dev libunistring-dev libssl-dev \
  libc6 libc6-dev unzip libnuma1 libnuma-dev \
  perl clang || fail

msg "Install rustc and cargo 1.53.0."
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh || fail
source $HOME/.cargo/env || fail
rustup toolchain install 1.53.0 || fail
cargo install cargo-c || fail

msg "Install the newest meson."
sudo pip3 install --user meson || fail

sudo apt-get -y upgrade || fail
sudo apt-get -y dist-upgrade || fail
sudo apt-get -y autoremove || fail
sudo apt-get -y autoclean || fail

# Create the compile folder
SOURCE_PATH="/apps/source/ffmpeg"
BUILD_PATH="/apps/build/ffmpeg-4.4"
BIN_PATH="/usr/local/bin"
mkdir -p $SOURCE_PATH $BUILD_PATH || fail
sudo mkdir -p $BIN_PATH || fail

# Install dependencies: CMake
msg "Install cmake 3.21.0."
cd $SOURCE_PATH || fail
wget -O- https://cmake.org/files/v3.21/cmake-3.21.0.tar.gz | tar xz -C . || fail
cd cmake-3.21.0 || fail
./bootstrap || fail
make -j$(nproc) || fail
sudo make install || fail

# Install dependencies: NASM
msg "Install nasm 2.15.05."
cd $SOURCE_PATH || fail
wget -O- https://www.nasm.us/pub/nasm/releasebuilds/2.15.05/nasm-2.15.05.tar.bz2 | tar xj -C . || fail
cd nasm-2.15.05 || fail
./autogen.sh || fail
PATH="$BIN_PATH:$PATH" ./configure --prefix="$BUILD_PATH" --bindir="$BIN_PATH" || fail
PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
sudo make install || fail

# Install dependencies: libx264
msg "Install the newest x264."
cd $SOURCE_PATH || fail
git -C x264 pull 2> /dev/null || git clone --depth 1 https://code.videolan.org/videolan/x264.git
cd x264 || fail
PATH="$BIN_PATH:$PATH" PKG_CONFIG_PATH="$BUILD_PATH/lib/pkgconfig:$PKG_CONFIG_PATH" ./configure --prefix="$BUILD_PATH" --bindir="$BIN_PATH" --enable-shared --enable-static --enable-pic || fail
PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
sudo make install || fail

# Install dependencies: libx265
msg "Install x265 3.5."
cd $SOURCE_PATH || fail
git -C x265_git pull 2> /dev/null || git clone --depth 1 -b 3.5 https://bitbucket.org/multicoreware/x265_git
cd x265_git/build/linux || fail
PATH="$BIN_PATH:$PATH" CXXFLAGS="$CXXFLAGS -fpermissive"  cmake -G "Unix Makefiles" -DCMAKE_INSTALL_PREFIX="$BUILD_PATH" -DENABLE_SHARED=on ../../source || fail
PATH="$BIN_PATH:$PATH" CXXFLAGS="$CXXFLAGS -fpermissive"  make -j$(nproc) || fail
sudo make install || fail
sudo cp $BUILD_PATH/bin/x265 $BIN_PATH || fail

# Install dependencies: libvpx
msg "Install vpx 1.10.0."
cd $SOURCE_PATH || fail
git -C libvpx pull 2> /dev/null || git clone --depth 1 -b v1.10.0 https://chromium.googlesource.com/webm/libvpx.git
cd libvpx || fail
PATH="$BIN_PATH:$PATH" ./configure --prefix="$BUILD_PATH" --enable-pic --enable-shared --disable-examples --disable-unit-tests --enable-vp9-highbitdepth --as=yasm || fail
PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
sudo make install || fail

# Install dependencies: libfdk-aac
msg "Install fdk-aac 2.0.2."
cd $SOURCE_PATH || fail
git -C fdk-aac pull 2> /dev/null || git clone --depth 1 --branch v2.0.2 https://github.com/mstorsjo/fdk-aac
cd fdk-aac || fail
autoreconf -fiv || fail
./configure --prefix="$BUILD_PATH" --enable-shared || fail
PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
sudo make install || fail

# Install dependencies: libmp3lame
msg "Install lame 3.100."
cd $SOURCE_PATH || fail
wget -O- https://downloads.sourceforge.net/project/lame/lame/3.100/lame-3.100.tar.gz | tar xz -C . || fail
cd lame-3.100 || fail
PATH="$BIN_PATH:$PATH" ./configure --prefix="$BUILD_PATH" --bindir="$BIN_PATH" --enable-shared --enable-nasm || fail
PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
sudo make install || fail

# Install dependencies: libopus
msg "Install the newest opus."
cd $SOURCE_PATH || fail
git -C opus pull 2> /dev/null || git clone --depth 1 https://github.com/xiph/opus.git
cd opus || fail
./autogen.sh || fail
./configure --prefix="$BUILD_PATH" --enable-shared || fail
PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
sudo make install || fail

# Install dependencies: libaom
msg "Install the newest aom."
cd $SOURCE_PATH || fail
git -C aom pull 2> /dev/null || git clone --depth 1 https://aomedia.googlesource.com/aom
mkdir -p aom_build || fail
cd aom || fail
cd ../aom_build || fail
PATH="$BIN_PATH:$PATH" cmake -G "Unix Makefiles" -DCMAKE_INSTALL_PREFIX="$BUILD_PATH" -DENABLE_SHARED=on -DCONFIG_PIC=1 -DENABLE_NASM=on ../aom || fail
PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
sudo make install || fail
sudo cp $BUILD_PATH/bin/aom* $BIN_PATH || fail

# Install dependencies: libsvtav1
msg "Install the newest svtav1."
cd $SOURCE_PATH || fail
git -C SVT-AV1 pull 2> /dev/null || git clone --depth 1 https://gitlab.com/AOMediaCodec/SVT-AV1.git
mkdir -p SVT-AV1/build || fail
cd SVT-AV1/build || fail
PATH="$BIN_PATH:$PATH" cmake -G "Unix Makefiles" -DCMAKE_INSTALL_PREFIX="$BUILD_PATH" -DCMAKE_BUILD_TYPE=Release -DBUILD_DEC=ON -DBUILD_SHARED_LIBS=ON .. || fail
PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
sudo make install || fail
sudo cp $BUILD_PATH/bin/SvtAv1* $BIN_PATH || fail

# Install dependencies: libdav1d
msg "Install the newest dav1d."
cd $SOURCE_PATH || fail
git -C dav1d pull 2> /dev/null || git clone --depth 1 https://code.videolan.org/videolan/dav1d.git
mkdir -p dav1d/build || fail
cd dav1d/build || fail
PATH="$BIN_PATH:$PATH" meson setup -Denable_tools=false -Denable_tests=false --default-library=static .. --prefix "$BUILD_PATH" --libdir="$BUILD_PATH/lib" || fail
PATH="$BIN_PATH:$PATH" ninja -j $(nproc) || fail
sudo ninja install || fail

# Install dependencies: libvmaf
msg "Install vmaf 2.1.1."
cd $SOURCE_PATH || fail
wget -O- https://github.com/Netflix/vmaf/archive/v2.1.1.tar.gz | tar xz -C . || fail
mkdir -p vmaf-2.1.1/libvmaf/build || fail
cd vmaf-2.1.1/libvmaf/build || fail
PATH="$BIN_PATH:$PATH" meson setup -Denable_tests=false -Denable_docs=false --buildtype=release --default-library=static .. --prefix "$BUILD_PATH" --bindir="$BUILD_PATH/bin" --libdir="$BUILD_PATH/lib" || fail
PATH="$BIN_PATH:$PATH" ninja -j $(nproc) || fail
sudo ninja install || fail
sudo cp $BUILD_PATH/bin/vmaf $BIN_PATH || fail

# Install dependencies: librav1e
msg "Install rav1e p20210713."
cd $SOURCE_PATH || fail
git -C rav1e pull 2> /dev/null || git clone --depth 1 -b p20210713 --single-branch https://github.com/xiph/rav1e.git
cd rav1e || fail
PATH="$BIN_PATH:$PATH" cargo cbuild --release || fail
sudo cp target/x86_64-unknown-linux-gnu/release/rav1e.h $BUILD_PATH/include/
sudo cp -r target/x86_64-unknown-linux-gnu/release/rav1e $BUILD_PATH/include/
sudo cp target/x86_64-unknown-linux-gnu/release/rav1e.pc $BUILD_PATH/lib/pkgconfig/
sudo cp target/x86_64-unknown-linux-gnu/release/librav1e.* $BUILD_PATH/lib/

# Install dependencies for GPU: ffnvcodec
msg "Install the newest ffnvcodec."
cd $SOURCE_PATH || fail
git -C nv-codec-headers pull 2> /dev/null || git clone --depth 1 https://git.videolan.org/git/ffmpeg/nv-codec-headers.git || fail
cd nv-codec-headers || fail
PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
sudo make install

# Install ffmpeg
msg "Install ffmpeg 4.4."
cd $SOURCE_PATH || fail
wget -O- http://ffmpeg.org/releases/ffmpeg-4.4.tar.xz | tar xJ -C . || fail
cd ffmpeg-4.4 || fail
# Fix the bug caused by NVCC.
wget -O- https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/deps-3.0.0/patch-ffmpeg_4_4.tar.xz | tar xJ -C . || fail
PATH="$BIN_PATH:$PATH" PKG_CONFIG_PATH="$BUILD_PATH/lib/pkgconfig:$PKG_CONFIG_PATH" ./configure \
  --prefix="$BUILD_PATH" \
  --pkg-config-flags="--static" \
  --extra-cflags="-I$BUILD_PATH/include -I/usr/local/cuda/include" \
  --extra-ldflags="-L$BUILD_PATH/lib -L/usr/local/cuda/lib64" \
  --extra-libs="-lpthread -lm" \
  --ld="g++" \
  --bindir="$BIN_PATH" \
  --enable-gpl \
  --enable-gnutls \
  --enable-cuda \
  --enable-cuda-nvcc \
  --enable-nvenc \
  --enable-libnpp \
  --enable-libaom \
  --enable-libass \
  --enable-libfdk-aac \
  --enable-libfreetype \
  --enable-libmp3lame \
  --enable-libopus \
  --enable-libsvtav1 \
  --enable-libdav1d \
  --enable-libvmaf \
  --enable-libvorbis \
  --enable-libvpx \
  --enable-libx264 \
  --enable-libx265 \
  --enable-shared \
  --enable-nonfree
PATH="$HOME/bin:$PATH" make -j$(nproc) || fail
sudo make install || fail
hash -r || fail

# Make path configurations
echo "export LD_LIBRARY_PATH=$BUILD_PATH/lib:\$LD_LIBRARY_PATH" >> ~/.bashrc 
echo "export PATH=$BUILD_PATH:\$PATH" >> ~/.bashrc 
echo "export PKG_CONFIG_PATH=$BUILD_PATH/lib/pkgconfig:\$PKG_CONFIG_PATH" >> ~/.bashrc 
echo "export PKG_CONFIG_LIBDIR=$BUILD_PATH/lib/:\$PKG_CONFIG_LIBDIR" >> ~/.bashrc
export LD_LIBRARY_PATH=$BUILD_PATH/lib:$LD_LIBRARY_PATH
export PATH=$BUILD_PATH:$PATH
export PKG_CONFIG_PATH=$BUILD_PATH/lib/pkgconfig:$PKG_CONFIG_PATH
export PKG_CONFIG_LIBDIR=$BUILD_PATH/lib/:$PKG_CONFIG_LIBDIR

msg "According to the instructions from ffmpeg, you need to run \"source ~/.profile\" now."
