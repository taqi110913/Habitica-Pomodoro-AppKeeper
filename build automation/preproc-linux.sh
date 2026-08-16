#!/bin/bash
#
# preproc-linux.sh 1.0.0
#
# Linux build script pre-processor.
#
# This is called from build-linux.sh before packages are built.
# Use this to prepare platform specific resources.
#
# Template Linux preprocessing script for Habitica Pomodoro AppKeeper

if [ "$APP_ARCH" = "x64" ]; then
    :   
    # Handle x64 releases here
fi

if [ "$APP_ARCH" = "arm64" ]; then
    :   
    # Handle ARM64 releases here
fi

if [ "$APP_ARCH" = "armhf" ]; then
    :   
    # Handle ARM releases here
fi 