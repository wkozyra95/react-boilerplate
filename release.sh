#!/bin/bash

CURRENT_REVISION=`git rev-parse HEAD`
CURRENT_DIR=`pwd`
TMP_DIR="/tmp/react-boilerplate-release"
BRANCH="gh-pages"
REPO_URL="git@github.com:wkozyra95/react-boilerplate.git"

rm -rf $TMP_DIR

echo "Releasing $CURRENT_REVISION ..."
git clone --depth=1 $REPO_URL $TMP_DIR -b $BRANCH && \
rm -rvf $TMP_DIR/* && \

rm -rf build && \
npm run deploy && \

cp -rv build/* $TMP_DIR/ && \

cd $TMP_DIR && \
git add -A && \
git commit -m "Releasing revision $CURRENT_REVISION" && \
git push origin $BRANCH && \

cd $CURRENT_DIR && \

rm -rvf $TMP_DIR && \
echo -e "\n\nFinished successfully!\n"
