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

sudo apt-get update -qq && sudo apt-get -y install \
  autoconf automake build-essential cmake \
  git-core libass-dev libfreetype6-dev \
  libgnutls28-dev libsdl2-dev libtool \
  libva-dev libvdpau-dev libvorbis-dev \
  libxcb1-dev libxcb-shm0-dev libxcb-xfixes0-dev \
  meson ninja-build pkg-config texinfo wget yasm \
  zlib1g-dev libunistring-dev libssl-dev \
  libc6 libc6-dev unzip libnuma1 libnuma-dev || fail

sudo apt-get -y upgrade || fail
sudo apt-get -y dist-upgrade || fail
sudo apt-get -y autoremove || fail
sudo apt-get -y autoclean || fail

# Create the compile folder
SOURCE_PATH="/apps/source/ffmpeg"
BUILD_PATH="/apps/build/ffmpeg-4.0.6"
BIN_PATH="/usr/local/bin"
mkdir -p $SOURCE_PATH $BUILD_PATH || fail
sudo mkdir -p $BIN_PATH || fail

# Install dependencies: CMake
cd $SOURCE_PATH || fail
wget -O- https://cmake.org/files/v3.20/cmake-3.20.5.tar.gz | tar xz -C . || fail
cd cmake-3.20.5 || fail
./bootstrap || fail
make -j$(nproc) || fail
sudo make install || fail

# Install dependencies: NASM
cd $SOURCE_PATH || fail
wget -O- https://www.nasm.us/pub/nasm/releasebuilds/2.15.05/nasm-2.15.05.tar.bz2 | tar xj -C . || fail
cd nasm-2.15.05 || fail
./autogen.sh || fail
PATH="$BIN_PATH:$PATH" ./configure --prefix="$BUILD_PATH" --bindir="$BIN_PATH" || fail
PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
sudo make install || fail

# Install dependencies: libx264
cd $SOURCE_PATH || fail
git -C x264 pull 2> /dev/null || git clone --depth 1 https://code.videolan.org/videolan/x264.git
cd x264 || fail
git checkout ae03d92b || fail
PATH="$BIN_PATH:$PATH" PKG_CONFIG_PATH="$BUILD_PATH/lib/pkgconfig:$PKG_CONFIG_PATH" ./configure --prefix="$BUILD_PATH" --bindir="$BIN_PATH" --enable-shared --enable-static --enable-pic || fail
PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
sudo make install || fail

# Install dependencies: libx265
cd $SOURCE_PATH || fail
git -C x265_git pull 2> /dev/null || git clone https://bitbucket.org/multicoreware/x265_git
cd x265_git || fail
git checkout 82786fc || fail
cd build/linux || fail
PATH="$BIN_PATH:$PATH" CXXFLAGS="$CXXFLAGS -fpermissive"  cmake -G "Unix Makefiles" -DCMAKE_INSTALL_PREFIX="$BUILD_PATH" -DENABLE_SHARED=on ../../source || fail
PATH="$BIN_PATH:$PATH" CXXFLAGS="$CXXFLAGS -fpermissive"  make -j$(nproc) || fail
sudo make install || fail
sudo cp $BUILD_PATH/bin/x265 $BIN_PATH || fail

# Install dependencies: libvpx
cd $SOURCE_PATH || fail
git -C libvpx pull 2> /dev/null || git clone --depth 1 https://chromium.googlesource.com/webm/libvpx.git
cd libvpx || fail
git checkout 76ad30b || fail
PATH="$BIN_PATH:$PATH" ./configure --prefix="$BUILD_PATH" --enable-pic --enable-shared --disable-examples --disable-unit-tests --enable-vp9-highbitdepth --as=yasm || fail
PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
sudo make install || fail

# Install dependencies: libfdk-aac
cd $SOURCE_PATH || fail
git -C fdk-aac pull 2> /dev/null || git clone --branch v0.1.6 --depth 1 https://github.com/mstorsjo/fdk-aac
cd fdk-aac || fail
autoreconf -fiv || fail
./configure --prefix="$BUILD_PATH" --enable-shared || fail
PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
sudo make install || fail

# Install dependencies: libmp3lame
cd $SOURCE_PATH || fail
wget -O- https://downloads.sourceforge.net/project/lame/lame/3.100/lame-3.100.tar.gz | tar xz -C . || fail
cd lame-3.100 || fail
PATH="$BIN_PATH:$PATH" ./configure --prefix="$BUILD_PATH" --bindir="$BIN_PATH" --enable-shared --enable-nasm || fail
PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
sudo make install || fail

# Install dependencies: libopus
cd $SOURCE_PATH || fail
git -C opus pull 2> /dev/null || git clone --depth 1 https://github.com/xiph/opus.git
cd opus || fail
git checkout 6b6035a || fail
./autogen.sh || fail
./configure --prefix="$BUILD_PATH" --enable-shared || fail
PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
sudo make install || fail

# Install dependencies: libaom
cd $SOURCE_PATH || fail
git -C aom pull 2> /dev/null || git clone --depth 1 https://aomedia.googlesource.com/aom
mkdir -p aom_build || fail
cd aom || fail
git checkout 94ab973 || fail
cd ../aom_build || fail
PATH="$BIN_PATH:$PATH" cmake -G "Unix Makefiles" -DCMAKE_INSTALL_PREFIX="$BUILD_PATH" -DENABLE_SHARED=on -DCONFIG_PIC=1 -DENABLE_NASM=on ../aom || fail
PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
sudo make install || fail
sudo cp $BUILD_PATH/bin/aom* $BIN_PATH || fail

# Install dependencies for GPU: ffnvcodec
cd $SOURCE_PATH || fail
git clone https://git.videolan.org/git/ffmpeg/nv-codec-headers.git || fail
cd nv-codec-headers || fail
PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
sudo make install

# Install ffmpeg
cd $SOURCE_PATH || fail
wget -O- http://ffmpeg.org/releases/ffmpeg-4.0.6.tar.xz | tar xJ -C . || fail
cd ffmpeg-4.0.6 || fail
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
  --enable-cuda-sdk \
  --enable-libnpp \
  --enable-libaom \
  --enable-libass \
  --enable-libfdk-aac \
  --enable-libfreetype \
  --enable-libmp3lame \
  --enable-libopus \
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
