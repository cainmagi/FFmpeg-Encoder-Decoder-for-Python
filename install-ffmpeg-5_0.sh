#!/bin/bash

# FFMpeg 5.0 installation script
# by Yuchen Jin (cainmagi) / 04062022
# ---------------------------------------------------------
# This script has been tested on
# `debian:bullseye`
# docker image.
# ---------------------------------------------------------
# Currently, it is only designed for a full installation
# of FFMpeg.
# For those users with CUDA installed, please run:
# ```bash
# ./install-ffmpeg-5_0.sh --all
# ```
# For those users without CUDA (but has GPU), please run:
# ```bash
# ./install-ffmpeg-5_0.sh --all --nvcuda
# ```
# For those users using root mode, please run:
# ```bash
# ./install-ffmpeg-5_0.sh --all --sudofix
# ```

# Make bashline configurations.
set -e
RESET='\033[0m'
COLOR='\033[1;32m'
COLOR_ERR='\033[1;31m'
COLOR_OPT='\033[1;34m'
COLOR_OPT_TEXT='\033[0;34m'

function msg {
  echo -e "${COLOR}$(date): $1${RESET}"
}

function msg_err {
  echo -e "${COLOR_ERR}$(date): $1${RESET}"
}

function fail {
  msg_err "Error : $?"
  exit 1
}

function mcd {
  mkdir -p "$1" || fail
  cd "$1" || fail
}

function apt_dependency {
    apt-get -y install $(apt-cache depends $1 | grep Depends | sed "s/.*ends:\ //" | tr '\n' ' ') || fail
}


SET_HELP=false
SET_DEBUG=false
SET_SUDOFIX=false
SET_NVCUDA=false
SET_ALL=false
SET_BASIC=false
SET_CMAKE=false
SET_SSH=false
SET_VORBIS=false
SET_OPENMPT=false
SET_KRB5=false
SET_RUSTC=false
SET_NASM=false
SET_YASM=false
SET_SRT=false
SET_OPENJPEG=false
SET_XVID=false
SET_VIDSTAB=false
SET_THEORA=false
SET_X264=false
SET_X265=false
SET_VPX=false
SET_FDKAAC=false
SET_MP3LAME=false
SET_OPUS=false
SET_AOM=false
SET_SVTAV1=false
SET_DAV1D=false
SET_VMAF=false
SET_RAV1E=false
SET_FFNVC=false
SET_FFMPEG=false
SET_EXPORT_PATH=false

SOURCE_PATH="/apps/source/ffmpeg"
BUILD_PATH="/apps/build/ffmpeg-5.0"
BIN_PATH="/usr/local/bin"

# Pass options from command line
for ARGUMENT in "$@"
do
    KEY=$(echo $ARGUMENT | cut -f1 -d=)
    if [[ $KEY != '--*' ]]
    then
        VALUE=$(echo $ARGUMENT | cut -f2 -d=)   
    fi
    case "$KEY" in
        --help)        SET_HELP=true ;;
        --debug)       SET_DEBUG=true ;;
        --sudofix)     SET_SUDOFIX=true ;;
        --all)         SET_ALL=true ;;
        --basic)       SET_BASIC=true ;;
        --nvcuda)      SET_NVCUDA=true ;;
        --cmake)       SET_CMAKE=true ;;
        --ssh)         SET_SSH=true ;;
        --vorbis)      SET_VORBIS=true ;;
        --openmpt)     SET_OPENMPT=true ;;
        --krb5)        SET_KRB5=true ;;
        --rustc)       SET_RUSTC=true ;;
        --nasm)        SET_NASM=true ;;
        --yasm)        SET_YASM=true ;;
        --srt)         SET_SRT=true ;;
        --openjpeg)    SET_OPENJPEG=true ;;
        --xvid)        SET_XVID=true ;;
        --vidstab)     SET_VIDSTAB=true ;;
        --theora)      SET_THEORA=true ;;
        --x264)        SET_X264=true ;;
        --x265)        SET_X265=true ;;
        --vpx)         SET_VPX=true ;;
        --fdkaac)      SET_FDKAAC=true ;;
        --lame)        SET_MP3LAME=true ;;
        --opus)        SET_OPUS=true ;;
        --aom)         SET_AOM=true ;;
        --svtav1)      SET_SVTAV1=true ;;
        --dav1d)       SET_DAV1D=true ;;
        --vmaf)        SET_VMAF=true ;;
        --rav1e)       SET_RAV1E=true ;;
        --ffnvc)       SET_FFNVC=true ;;
        --ffmpeg)      SET_FFMPEG=true ;;
        --export-path) SET_EXPORT_PATH=true ;;
        src)           SOURCE_PATH=${VALUE} ;;
        build)         BUILD_PATH=${VALUE} ;;
        bin)           BIN_PATH=${VALUE} ;;
        *)
    esac
done


# Help mode.
if [ "x${SET_HELP}" = "xtrue" ]
then
    THIS_NAME="$(basename "$(test -L "$0" && readlink "$0" || echo "$0")")"
    HELP_MESSAGE="${COLOR}FFMpeg 5.0 installation script - by Yuchen Jin (cainmagi) / 04062022${RESET}
Use as \"${COLOR_OPT}bash ${THIS_NAME} --flag1 --flag2 ... option1=val1 option2=val2 ...${RESET}\"
where the usages are:
    ${COLOR_OPT}--all${RESET}:
        Run the full script, installing all dependencies and the FFMpeg itself.
    ${COLOR_OPT}--basic${RESET}:
        Install the basic dependencies by apt.
    ${COLOR_OPT}--nvcuda${RESET} [not included by --all]:
        Install NVIDA drivers and CUDA, This option will not be set by --all.
    ${COLOR_OPT}--cmake${RESET}:
        Install CMake.
    ${COLOR_OPT}--ssh${RESET}:
        Install libssh.
    ${COLOR_OPT}--vorbis${RESET}:
        Install Vorbis audio codec.
    ${COLOR_OPT}--openmpt${RESET}:
        Install OpenMPT audio codec (requiring vorbis).
    ${COLOR_OPT}--krb5${RESET}:
        Install libkrb5, with a higher version compared to apt distribution.
    ${COLOR_OPT}--rustc${RESET}:
        Install Rust-lang, Cargo-C and meson.
    ${COLOR_OPT}--nasm${RESET}:
        Install NASM (Netwide Assembler).
    ${COLOR_OPT}--yasm${RESET}:
        Install YASM (Yasm Modular Assembler).
    ${COLOR_OPT}--srt${RESET}:
        Install libsrt (Secure Reliable Transport Protocol).
    ${COLOR_OPT}--openjpeg${RESET}:
        Install openJPEG (JPEG 2000 codec).
    ${COLOR_OPT}--xvid${RESET}:
        Install Xvid Core (video codec).
    ${COLOR_OPT}--vidstab${RESET}:
        Install Vidstab (a video stabilization library).
    ${COLOR_OPT}--theora${RESET}:
        Install Theora (a video / audio codec, supporting ogg).
    ${COLOR_OPT}--x264${RESET}:
        Install X264 video codec (H.264).
    ${COLOR_OPT}--x265${RESET}:
        Install X265 video codec (H.265 / HEVC).
    ${COLOR_OPT}--vpx${RESET}:
        Install VPX video codec (VP8, VP9).
    ${COLOR_OPT}--fdkaac${RESET}:
        Install Fraunhofer FDK AAC audio codec (AAC).
    ${COLOR_OPT}--lame${RESET}:
        Install high-quality MPEG Audio Layer III audio codec (MP3).
    ${COLOR_OPT}--opus${RESET}:
        Install OPUS versatile audio codec.
    ${COLOR_OPT}--aom${RESET}:
        Install Alliance for Open Media video codec (AV1).
    ${COLOR_OPT}--svtav1${RESET}:
        Install Scalable Video Technology for AV1-compliant codec (AV1).
    ${COLOR_OPT}--dav1d${RESET}:
        Install the fastest and cross-platform AV1 decoder (AV1).
    ${COLOR_OPT}--vmaf${RESET}:
        Install the library for calculating the VMAF video quality metric.
    ${COLOR_OPT}--rav1e${RESET}:
        Install the fastest and safest AV1 encoder (AV1).
    ${COLOR_OPT}--ffnvc${RESET}:
        Install the FFMpeg NVIDIA Codec Headers.
    ${COLOR_OPT}--ffmpeg${RESET}:
        Install the FFMpeg (should be installed after all deps installed).
    ${COLOR_OPT}--export-path${RESET}:
        Export the path to the bash prompt and .bashrc file, should be run after the installation.
    ${COLOR_OPT}--sudofix${RESET} [not included by --all]:
        Install sudo (should be specified only when using root mode).
    ${COLOR_OPT}--help${RESET}:
        Display the help message.
    ${COLOR_OPT}  src=${COLOR_OPT_TEXT}<source path>${RESET}:
        Configure the path of the pulled source codes (a user path).
        ${COLOR_OPT_TEXT}Current value${RESET}: ${SOURCE_PATH}
    ${COLOR_OPT}build=${COLOR_OPT_TEXT}<build path>${RESET}:
        Configure the path of the built libraries (a user path).
        ${COLOR_OPT_TEXT}Current value${RESET}: ${BUILD_PATH}
    ${COLOR_OPT}  bin=${COLOR_OPT_TEXT}<bin path>${RESET}:
        Configure the path of the installed binary files and libraries (a system path).
        ${COLOR_OPT_TEXT}Current value${RESET}: ${BIN_PATH}
"
    echo -e "$HELP_MESSAGE"
    exit 1
fi


# Configure the options when {flag:SET_ALL} has been configured.
if [ "x${SET_ALL}" = "xtrue" ]
then
    msg "${COLOR_ERR}--all): ${COLOR_OPT_TEXT}Run the full script."
    SET_BASIC=true
    # SET_SUDOFIX=true  # should not be specified when not using root mode.
    # SET_NVCUDA=true  # not included, because this option may be not necessary if CUDA has been installed.
    SET_CMAKE=true
    SET_SSH=true
    SET_VORBIS=true
    SET_OPENMPT=true
    SET_KRB5=true
    SET_RUSTC=true
    SET_NASM=true
    SET_YASM=true
    SET_SRT=true
    SET_OPENJPEG=true
    SET_XVID=true
    SET_VIDSTAB=true
    SET_THEORA=true
    SET_X264=true
    SET_X265=true
    SET_VPX=true
    SET_FDKAAC=true
    SET_MP3LAME=true
    SET_OPUS=true
    SET_AOM=true
    SET_SVTAV1=true
    SET_DAV1D=true
    SET_VMAF=true
    SET_RAV1E=true
    SET_FFNVC=true
    SET_FFMPEG=true
    SET_EXPORT_PATH=true
fi


# If run with root and sudo is not installed
if [ "x${SET_SUDOFIX}" = "xtrue" ]; then
    msg "${COLOR_OPT}--sudofix): ${COLOR_OPT_TEXT}Install sudo (only used in root mode)."
    apt-get update -qq || fail
    apt-get -y install sudo || fail
fi


# Create the compile folder
mkdir -p $SOURCE_PATH $BUILD_PATH || fail
sudo mkdir -p $BIN_PATH || fail


# Install apt dependencies
if [ "x${SET_BASIC}" = "xtrue" ]; then
    msg "${COLOR_OPT}--basic): ${COLOR_OPT_TEXT}Install apt packages."
    sudo apt-get update -qq || fail
    sudo apt-get -y full-upgrade || fail
    sudo apt-get -y install curl autoconf automake build-essential \
        cmake git-core libass-dev libfreetype6-dev libgnutls28-dev \
        libsdl2-dev libtool libva-dev libvdpau-dev libogg-dev libcmocka-dev \
        libvorbis-dev libxcb1-dev libxcb-shm0-dev libxcb-xfixes0-dev \
        libunistring-dev libopencore-amrwb-dev libmpg123-dev libltdl-dev \
        libc6 libc6-dev unzip python3-pip libnuma1 libnuma-dev portaudio19-dev \
        gcc g++ bison perl clang libomp-dev libssl-dev libpulse-dev libsndfile-dev \
        ninja-build pkg-config texinfo wget zlib1g-dev libgcrypt20-dev \
        software-properties-common || fail
fi


# Install NVIDIA drivers and cuda (not counted in --all installation).
if [ "x${SET_NVCUDA}" = "xtrue" ]; then
    msg "${COLOR_OPT}--nvcuda): ${COLOR_OPT_TEXT}Install NVIDIA CUDA Toolkits."
    sudo apt-get update -qq || fail
    sudo apt-get -y install gcc g++ curl wget freeglut3-dev build-essential \
    libx11-dev libxmu-dev libxi-dev libglu1-mesa libglu1-mesa-dev \
    libfreeimage-dev software-properties-common || fail
    # The following line only works with Ubuntu
    # sudo apt-get -y install nvidia-cuda-toolkit || fail
    # The following commands are working with Debian.
    sudo add-apt-repository -y "deb http://deb.debian.org/debian/ bullseye main contrib non-free" || fail
    sudo apt-get update -qq || fail
    sudo apt-mark hold nvidia-persistenced || fail
    sudo apt-get -y install nvidia-cuda-toolkit  || fail
fi


# Install dependencies: CMake
if [ "x${SET_CMAKE}" = "xtrue" ]; then
msg "${COLOR_OPT}--cmake): ${COLOR_OPT_TEXT}Install CMake 3.23.0."
    cd $SOURCE_PATH || fail
    wget -O- https://cmake.org/files/v3.23/cmake-3.23.0.tar.gz | tar xz -C . || fail
    cd cmake-3.23.0 || fail
    ./bootstrap || fail
    make -j$(nproc) || fail
    sudo make install || fail
fi


# Install dependencies: libssh
if [ "x${SET_SSH}" = "xtrue" ]; then
    msg "${COLOR_OPT}--ssh): ${COLOR_OPT_TEXT}Install libssh 0.9.6."
    # sudo apt-get -y install gcc g++ cmake libssl-dev libgcrypt20-dev zlib1g-dev || fail
    cd $SOURCE_PATH || fail
    wget -O- https://git.libssh.org/projects/libssh.git/snapshot/libssh-0.9.6.tar.gz | tar xz -C . || fail
    cd libssh-0.9.6 || fail
    mkdir -p build || fail
    cd build || fail
    PKG_CONFIG_PATH="$BUILD_PATH/lib/pkgconfig:$PKG_CONFIG_PATH" cmake -DUNIT_TESTING=OFF -DCMAKE_INSTALL_PREFIX="$BUILD_PATH" -DCMAKE_BUILD_TYPE=Release .. || fail
    PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
    sudo make install || fail
fi


# Install dependencies: libvorbis
if [ "x${SET_VORBIS}" = "xtrue" ]; then
    msg "${COLOR_OPT}--vorbis): ${COLOR_OPT_TEXT}Install libvorbis 1.3.7."
    # sudo apt-get -y install libogg-dev libvorbis0a libvorbisenc2 libvorbisfile3 || fail
    cd $SOURCE_PATH || fail
    wget -O- https://downloads.xiph.org/releases/vorbis/libvorbis-1.3.7.tar.gz | tar xz -C . || fail
    cd libvorbis-1.3.7 || fail
    PATH="$BIN_PATH:$PATH" ./configure --prefix=/usr --disable-static || fail
    PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
    sudo make install || fail
fi



# Install dependencies: libopenmpt
if [ "x${SET_OPENMPT}" = "xtrue" ]; then
    msg "${COLOR_OPT}--openmpt): ${COLOR_OPT_TEXT}Install libopenmpt 0.6.2."
    # sudo apt-get -y install libmpg123-dev libltdl-dev libogg-dev libvorbis-dev zlib1g-dev libsndfile-dev portaudio19-dev libpulse-dev || fail
    cd $SOURCE_PATH || fail
    wget -O- https://lib.openmpt.org/files/libopenmpt/src/libopenmpt-0.6.2+release.autotools.tar.gz | tar xz -C . || fail
    cd libopenmpt-0.6.2+release.autotools || fail
    PATH="$BIN_PATH:$PATH" ./configure || fail
    PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
    sudo make install || fail
fi


# Install libkrb5 1.19.3 (require yacc (bison)).
if [ "x${SET_KRB5}" = "xtrue" ]; then
    msg "${COLOR_OPT}--krb5): ${COLOR_OPT_TEXT}Install libkrb5 1.19.3."
    sudo apt-get update -qq || fail
    sudo apt-get -y install comerr-dev bison || fail
    cd $SOURCE_PATH || fail
    wget -O- https://kerberos.org/dist/krb5/1.19/krb5-1.19.3.tar.gz | tar xz -C . || fail
    cd krb5-1.19.3 || fail
    # Perform hot fixtures.
    wget https://www.linuxfromscratch.org/patches/blfs/svn/mitkrb-1.19.3-openssl3_fixes-1.patch || fail
    patch -Np1 -i ./mitkrb-1.19.3-openssl3_fixes-1.patch || fail
    cd src || fail
    sed -i -e 's@\^u}@^u cols 300}@' tests/dejagnu/config/default.exp || fail
    sed -i -e '/eq 0/{N;s/12 //}'    plugins/kdb/db2/libdb2/test/run.test || fail
    sed -i '/t_iprop.py/d'           tests/Makefile.in || fail
    autoreconf -fiv || fail
    # Start to build
    mkdir -p $BUILD_PATH/krb5-1.19.3 || fail
    cd $BUILD_PATH/krb5-1.19.3 || fail
    # Remove --with-system-ss from the suggested configs.
    PATH="$BIN_PATH:$PATH" $SOURCE_PATH/krb5-1.19.3/src/configure --prefix=/usr --sysconfdir=/etc --localstatedir=/var/lib --runstatedir=/run --with-system-et --with-system-verto=no --enable-dns-for-realm || fail
    PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
    sudo make install || fail
fi


# Install rustc and meson.
if [ "x${SET_RUSTC}" = "xtrue" ]; then
    msg "${COLOR_OPT}--rustc): ${COLOR_OPT_TEXT}Install Rust-lang, Cargo 1.59.0."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh || fail
    source $HOME/.cargo/env || fail
    rustup toolchain install 1.59.0 || fail
    cargo install cargo-c || fail

    msg "${COLOR_OPT}--rustc): ${COLOR_OPT_TEXT}Install the newest meson."
    sudo pip3 install --user meson || fail
    sudo cp ~/.local/bin/meson /usr/local/bin/ || fail
fi


# Post installtion after RustC and APT updates.
if [ "x${SET_DEBUG}" = "xtrue" ] || [ "x${SET_BASIC}" = "xtrue" ] || [ "x${SET_RUSTC}" = "xtrue" ]; then
    sudo apt-get -y upgrade || fail
    sudo apt-get -y dist-upgrade || fail
    sudo apt-get -y autoremove || fail
    sudo apt-get -y autoclean || fail
fi


# Install dependencies: NASM
if [ "x${SET_NASM}" = "xtrue" ]; then
    msg "${COLOR_OPT}--nasm): ${COLOR_OPT_TEXT}Install NASM 2.15.05."
    cd $SOURCE_PATH || fail
    wget -O- https://www.nasm.us/pub/nasm/releasebuilds/2.15.05/nasm-2.15.05.tar.bz2 | tar xj -C . || fail
    cd nasm-2.15.05 || fail
    ./autogen.sh || fail
    PATH="$BIN_PATH:$PATH" ./configure --prefix="$BUILD_PATH" --bindir="$BIN_PATH" || fail
    PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
    sudo make install || fail
    source ~/.profile || fail
fi


# Install dependencies: YASM
if [ "x${SET_YASM}" = "xtrue" ]; then
    msg "${COLOR_OPT}--yasm): ${COLOR_OPT_TEXT}Install YASM 1.3.0.54.gffbd2"
    cd $SOURCE_PATH || fail
    # The branch v1.3.0 is no longer working.
    git -C yasm pull 2> /dev/null || git clone --single-branch https://github.com/yasm/yasm.git
    cd yasm || fail
    git checkout ffbd22cdc9d80f09decbfe5d5c6e6fdabba7f627 || fail
    ./autogen.sh || fail
    PATH="$BIN_PATH:$PATH" ./configure --prefix=$BUILD_PATH --bindir=$BIN_PATH || fail
    PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
    sudo make install || fail
    source ~/.profile || fail
fi


# Install dependencies: libsrt
if [ "x${SET_SRT}" = "xtrue" ]; then
    msg "${COLOR_OPT}--srt): ${COLOR_OPT_TEXT}Install srt 1.4.4."
    cd $SOURCE_PATH || fail
    git -C srt pull 2> /dev/null || git clone -b v1.4.4 --single-branch --depth 1 https://github.com/Haivision/srt.git
    mkdir -p srt/build || fail
    cd srt/build || fail
    PATH="$BIN_PATH:$PATH" cmake -G "Unix Makefiles" -DCMAKE_INSTALL_PREFIX="$BUILD_PATH" -DENABLE_CXX11=ON -DENABLE_CXX_DEPS=ON -DENABLE_SHARED=ON -DENABLE_STATIC=ON .. || fail
    PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
    sudo make install || fail
    sudo cp $BUILD_PATH/bin/srt-* $BIN_PATH || fail
fi


# Install dependencies: libopenjpeg
if [ "x${SET_OPENJPEG}" = "xtrue" ]; then
    msg "${COLOR_OPT}--openjpeg): ${COLOR_OPT_TEXT}Install openjpeg 2.4.0."
    cd $SOURCE_PATH || fail
    git -C openjpeg pull 2> /dev/null || git clone -b v2.4.0 --single-branch --depth 1 https://github.com/uclouvain/openjpeg.git
    mkdir -p openjpeg/build || fail
    cd openjpeg/build || fail
    PATH="$BIN_PATH:$PATH" cmake -G "Unix Makefiles" -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX="$BUILD_PATH" .. || fail
    PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
    sudo make install || fail
    sudo cp $BUILD_PATH/bin/opj_decompress $BIN_PATH || fail
    sudo cp $BUILD_PATH/bin/opj_compress $BIN_PATH || fail
    sudo cp $BUILD_PATH/bin/opj_dump $BIN_PATH || fail
fi


# Install dependencies: libxvid
if [ "x${SET_XVID}" = "xtrue" ]; then
    msg "${COLOR_OPT}--xvid): ${COLOR_OPT_TEXT}Install xvidcore 1.3.7."
    cd $SOURCE_PATH || fail
    wget -O- https://downloads.xvid.com/downloads/xvidcore-1.3.7.tar.gz | tar xz -C . || fail
    cd xvidcore/build/generic || fail
    sed -i 's/^LN_S=@LN_S@/& -f -v/' platform.inc.in || fail
    PATH="$BIN_PATH:$PATH" ./configure --bindir="$BIN_PATH" --prefix="$BUILD_PATH" || fail
    PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
    sudo make install || fail
fi


# Install dependencies: libvidstab
if [ "x${SET_VIDSTAB}" = "xtrue" ]; then
    msg "${COLOR_OPT}--vidstab): ${COLOR_OPT_TEXT}Install the newest vid.stab."
    cd $SOURCE_PATH || fail
    git -C vid.stab pull 2> /dev/null || git clone --depth 1 https://github.com/georgmartius/vid.stab.git
    mkdir -p vid.stab/build || fail
    cd vid.stab/build || fail
    PATH="$BIN_PATH:$PATH" cmake -G "Unix Makefiles" -DCMAKE_INSTALL_PREFIX:PATH="$BUILD_PATH" .. || fail
    PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
    sudo make install || fail
fi


# Install dependencies: libtheora
if [ "x${SET_THEORA}" = "xtrue" ]; then
    msg "${COLOR_OPT}--theora): ${COLOR_OPT_TEXT}Install theora 1.2.0 alpha1."
    cd $SOURCE_PATH || fail
    wget -O- http://downloads.xiph.org/releases/theora/libtheora-1.2.0alpha1.tar.xz | tar xJ -C . || fail
    cd libtheora-1.2.0alpha1 || fail
    ./autogen.sh || fail
    PATH="$BIN_PATH:$PATH" PKG_CONFIG_PATH="$BUILD_PATH/lib/pkgconfig:$PKG_CONFIG_PATH" ./configure --disable-examples --disable-oggtest --prefix="$BUILD_PATH" --bindir="$BIN_PATH" --enable-shared --enable-static || fail
    PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
    sudo make install || fail
fi


# Install dependencies: libx264
if [ "x${SET_X264}" = "xtrue" ]; then
    msg "${COLOR_OPT}--x264): ${COLOR_OPT_TEXT}Install the newest x264."
    cd $SOURCE_PATH || fail
    git -C x264 pull 2> /dev/null || git clone https://code.videolan.org/videolan/x264.git
    cd x264 || fail
    git checkout bfc87b7a330f75f5c9a21e56081e4b20344f139e || fail
    PATH="$BIN_PATH:$PATH" PKG_CONFIG_PATH="$BUILD_PATH/lib/pkgconfig:$PKG_CONFIG_PATH" ./configure --prefix="$BUILD_PATH" --bindir="$BIN_PATH" --enable-shared --enable-static --enable-pic || fail
    PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
    sudo make install || fail
fi


# Install dependencies: libx265
if [ "x${SET_X264}" = "xtrue" ]; then
    msg "${COLOR_OPT}--x265): ${COLOR_OPT_TEXT}Install x265 3.5."
    cd $SOURCE_PATH || fail
    git -C x265_git pull 2> /dev/null || git clone --depth 1 -b 3.5 https://bitbucket.org/multicoreware/x265_git
    cd x265_git/build/linux || fail
    PATH="$BIN_PATH:$PATH" CXXFLAGS="$CXXFLAGS -fpermissive"  cmake -G "Unix Makefiles" -DCMAKE_INSTALL_PREFIX="$BUILD_PATH" -DENABLE_SHARED=on ../../source || fail
    PATH="$BIN_PATH:$PATH" CXXFLAGS="$CXXFLAGS -fpermissive"  make -j$(nproc) || fail
    sudo make install || fail
    sudo cp $BUILD_PATH/bin/x265 $BIN_PATH || fail
fi


# Install dependencies: libvpx
if [ "x${SET_X264}" = "xtrue" ]; then
    msg "${COLOR_OPT}--vpx): ${COLOR_OPT_TEXT}Install vpx 1.11.0."
    cd $SOURCE_PATH || fail
    git -C libvpx pull 2> /dev/null || git clone --depth 1 -b v1.11.0 https://chromium.googlesource.com/webm/libvpx.git
    cd libvpx || fail
    PATH="$BIN_PATH:$PATH" ./configure --prefix="$BUILD_PATH" --enable-pic --enable-shared --disable-examples --disable-unit-tests --enable-vp9-highbitdepth --as=yasm || fail
    PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
    sudo make install || fail
fi


# Install dependencies: libfdk-aac
if [ "x${SET_FDKAAC}" = "xtrue" ]; then
    msg "${COLOR_OPT}--fdkaac): ${COLOR_OPT_TEXT}Install fdk-aac 2.0.2."
    cd $SOURCE_PATH || fail
    git -C fdk-aac pull 2> /dev/null || git clone --depth 1 --branch v2.0.2 https://github.com/mstorsjo/fdk-aac
    cd fdk-aac || fail
    autoreconf -fiv || fail
    ./configure --prefix="$BUILD_PATH" --enable-shared || fail
    PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
    sudo make install || fail
fi


# Install dependencies: libmp3lame
if [ "x${SET_MP3LAME}" = "xtrue" ]; then
    msg "${COLOR_OPT}--lame): ${COLOR_OPT_TEXT}Install lame 3.100."
    cd $SOURCE_PATH || fail
    wget -O- https://downloads.sourceforge.net/project/lame/lame/3.100/lame-3.100.tar.gz | tar xz -C . || fail
    cd lame-3.100 || fail
    PATH="$BIN_PATH:$PATH" ./configure --prefix="$BUILD_PATH" --bindir="$BIN_PATH" --enable-shared --enable-nasm || fail
    PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
    sudo make install || fail
fi


# Install dependencies: libopus
if [ "x${SET_OPUS}" = "xtrue" ]; then
    msg "${COLOR_OPT}--opus): ${COLOR_OPT_TEXT}Install the opus 1.3.1."
    cd $SOURCE_PATH || fail
    git -C opus pull 2> /dev/null || git clone --depth 1 --branch v1.3.1 https://github.com/xiph/opus.git
    cd opus || fail
    ./autogen.sh || fail
    ./configure --prefix="$BUILD_PATH" --enable-shared || fail
    PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
    sudo make install || fail
fi


# Install dependencies: libaom
if [ "x${SET_AOM}" = "xtrue" ]; then
    msg "${COLOR_OPT}--aom): ${COLOR_OPT_TEXT}Install aom 3.3.0."
    cd $SOURCE_PATH || fail
    git -C aom pull 2> /dev/null || git clone --depth 1 --branch v3.3.0 https://aomedia.googlesource.com/aom
    mkdir -p aom_build || fail
    cd aom || fail
    cd ../aom_build || fail
    PATH="$BIN_PATH:$PATH" cmake -G "Unix Makefiles" -DCMAKE_INSTALL_PREFIX="$BUILD_PATH" -DENABLE_SHARED=on -DCONFIG_PIC=1 -DENABLE_NASM=on ../aom || fail
    PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
    sudo make install || fail
    sudo cp $BUILD_PATH/bin/aom* $BIN_PATH || fail
fi


# Install dependencies: libsvtav1
if [ "x${SET_SVTAV1}" = "xtrue" ]; then
    msg "${COLOR_OPT}--svtav1): ${COLOR_OPT_TEXT}Install svtav1 1.0.0-rc1."
    cd $SOURCE_PATH || fail
    git -C SVT-AV1 pull 2> /dev/null || git clone --depth 1 --branch v1.0.0-rc1 https://gitlab.com/AOMediaCodec/SVT-AV1.git
    mkdir -p SVT-AV1/build || fail
    cd SVT-AV1/build || fail
    PATH="$BIN_PATH:$PATH" cmake -G "Unix Makefiles" -DCMAKE_INSTALL_PREFIX="$BUILD_PATH" -DCMAKE_BUILD_TYPE=Release -DBUILD_DEC=ON -DBUILD_SHARED_LIBS=ON .. || fail
    PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
    sudo make install || fail
    sudo cp $BUILD_PATH/bin/SvtAv1* $BIN_PATH || fail
fi


# Install dependencies: libdav1d
if [ "x${SET_DAV1D}" = "xtrue" ]; then
    msg "${COLOR_OPT}--dav1d): ${COLOR_OPT_TEXT}Install dav1d 1.0.0."
    cd $SOURCE_PATH || fail
    git -C dav1d pull 2> /dev/null || git clone --depth 1 --branch 1.0.0 https://code.videolan.org/videolan/dav1d.git
    mkdir -p dav1d/build || fail
    cd dav1d/build || fail
    PATH="~/.local/bin:$BIN_PATH:$PATH" meson setup -Denable_tools=false -Denable_tests=false --buildtype=release --default-library=shared .. --prefix "$BUILD_PATH" --libdir="$BUILD_PATH/lib" || fail
    PATH="$BIN_PATH:$PATH" ninja -j $(nproc) || fail
    sudo ninja install || fail
fi


# Install dependencies: libvmaf
if [ "x${SET_VMAF}" = "xtrue" ]; then
    msg "${COLOR_OPT}--vmaf): ${COLOR_OPT_TEXT}Install vmaf 2.3.0."
    cd $SOURCE_PATH || fail
    wget -O- https://github.com/Netflix/vmaf/archive/v2.3.0.tar.gz | tar xz -C . || fail
    mkdir -p vmaf-2.3.0/libvmaf/build || fail
    cd vmaf-2.3.0/libvmaf/build || fail
    PATH="~/.local/bin:$BIN_PATH:$PATH" meson setup -Denable_tests=false -Denable_docs=false --buildtype=release --default-library=shared .. --prefix "$BUILD_PATH" --bindir="$BUILD_PATH/bin" --libdir="$BUILD_PATH/lib" || fail
    PATH="$BIN_PATH:$PATH" ninja -j $(nproc) || fail
    sudo ninja install || fail
    sudo cp $BUILD_PATH/bin/vmaf $BIN_PATH || fail
fi


# Install dependencies: librav1e
if [ "x${SET_RAV1E}" = "xtrue" ]; then
    msg "${COLOR_OPT}--rav1e): ${COLOR_OPT_TEXT}Install rav1e p20220405."
    cd $SOURCE_PATH || fail
    git -C rav1e pull 2> /dev/null || git clone --depth 1 --branch p20220405 --single-branch https://github.com/xiph/rav1e.git
    cd rav1e || fail
    PATH="$BIN_PATH:$PATH" RUSTFLAGS="-C target-feature=+avx2,+fma" cargo cbuild --release || fail
    sudo cp target/x86_64-unknown-linux-gnu/release/rav1e.h $BUILD_PATH/include/ || fail
    sudo cp -r target/x86_64-unknown-linux-gnu/release/include/rav1e $BUILD_PATH/include/ || fail
    sudo cp target/x86_64-unknown-linux-gnu/release/rav1e.pc $BUILD_PATH/lib/pkgconfig/ || fail
    sudo cp target/x86_64-unknown-linux-gnu/release/librav1e.* $BUILD_PATH/lib/ || fail
    cd $BUILD_PATH/lib || fail
    sudo ln -s librav1e.so librav1e.so.0 || fail
fi


# Install dependencies for GPU: ffnvcodec
if [ "x${SET_FFNVC}" = "xtrue" ]; then
    msg "${COLOR_OPT}--ffnvc): ${COLOR_OPT_TEXT}Install the newest ffnvcodec."
    cd $SOURCE_PATH || fail
    git -C nv-codec-headers pull 2> /dev/null || git clone --depth 1 https://git.videolan.org/git/ffmpeg/nv-codec-headers.git || fail
    cd nv-codec-headers || fail
    PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
    sudo make install
fi


# Install ffmpeg
if [ "x${SET_FFMPEG}" = "xtrue" ]; then
    msg "${COLOR_OPT}--ffmpeg): ${COLOR_OPT_TEXT}Install ffmpeg 5.0."
    cd $SOURCE_PATH || fail
    wget -O- http://ffmpeg.org/releases/ffmpeg-5.0.tar.xz | tar xJ -C . || fail
    cd ffmpeg-5.0 || fail
    # Fix the bug caused by NVCC (is not required with FFMpeg 5.0).
    #wget -O- https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/deps-3.0.0/patch-ffmpeg_4_4.tar.xz | tar xJ -C . || fail
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
      --enable-version3 \
      --enable-cuda \
      --enable-cuda-nvcc \
      --enable-nvenc \
      --enable-libnpp \
      --enable-sdl2 \
      --enable-libssh \
      --enable-libsrt \
      --enable-libopenjpeg \
      --enable-libaom \
      --enable-libass \
      --enable-libfdk-aac \
      --enable-libfreetype \
      --enable-libmp3lame \
      --enable-libopus \
      --enable-libsvtav1 \
      --enable-libdav1d \
      --enable-libvidstab \
      --enable-librav1e \
      --enable-libvmaf \
      --enable-libvorbis \
      --enable-libtheora \
      --enable-libopenmpt \
      --enable-libopencore-amrwb \
      --enable-libvpx \
      --enable-libxvid \
      --enable-libx264 \
      --enable-libx265 \
      --enable-shared \
      --enable-nonfree
    PATH="$BIN_PATH:$PATH" make -j$(nproc) || fail
    sudo make install || fail
    hash -r || fail
fi

# Make path configurations
if [ "x${SET_EXPORT_PATH}" = "xtrue" ]; then
    msg "${COLOR_OPT}--export-path): ${COLOR_OPT_TEXT}Export the path to the current prompt and the .bashrc file."
    echo "export LD_LIBRARY_PATH=$BUILD_PATH/lib:\$LD_LIBRARY_PATH" >> ~/.bashrc 
    echo "export PATH=$BUILD_PATH:\$PATH" >> ~/.bashrc 
    echo "export PKG_CONFIG_PATH=$BUILD_PATH/lib/pkgconfig:\$PKG_CONFIG_PATH" >> ~/.bashrc 
    echo "export PKG_CONFIG_LIBDIR=$BUILD_PATH/lib/:\$PKG_CONFIG_LIBDIR" >> ~/.bashrc
    export LD_LIBRARY_PATH=$BUILD_PATH/lib:$LD_LIBRARY_PATH
    export PATH=$BUILD_PATH:$PATH
    export PKG_CONFIG_PATH=$BUILD_PATH/lib/pkgconfig:$PKG_CONFIG_PATH
    export PKG_CONFIG_LIBDIR=$BUILD_PATH/lib/:$PKG_CONFIG_LIBDIR
    msg "According to the instructions from ffmpeg, you need to run \"source ~/.profile\" now. You may need to add \"${BIN_PATH}\" to your \$PATH."
fi

msg "FFMpeg installation script finishes."
