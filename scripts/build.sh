#!/bin/bash

cd $(dirname $0)/..

set -eo pipefail

cd ./main-vue

nvm use 14.17.6

yarn run build

cd ../

rm -rf ./demo-main-vue/*


mv main-vue/dist/* ./demo-main-vue/
cp ./demo-main-vue/index.html ./demo-main-vue/404.html

cd $(dirname $0)/..

set -eo pipefail

cd ./vite

nvm use 18.20.4

yarn run build

cd ../

rm -rf ./demo-vite/*


mv vite/dist/* ./demo-vite/
cp ./demo-vite/index.html ./demo-vite/404.html
# cd ./demo-vite
git add .
git commit -m 'feat: demo修改'
git push