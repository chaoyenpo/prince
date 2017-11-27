#!/usr/bin/env bash
set -e

# Where webpack is going to stick the compiled files. build for create-react-app
BUILD_FOLDER=dist

# S3 Configuration
# S3_BUCKET=s3://BUCKET_NAME
# S3_REGION=ap-northeast-1
S3_FLAGS="--region $S3_REGION --acl public-read --delete"

# Ensure dependencies are installed
yarn install

# Build step
yarn run build

# Sync
aws s3 sync $BUILD_FOLDER $S3_BUCKET $S3_FLAGS
