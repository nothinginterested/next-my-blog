echo 'start';
cd /home/lzz-blog/blog-app/next-my-blog/ &&
git pull &&
yarn install --production=false &&
yarn build &&
docker build -t lzz-blog/node-web-app . &&
docker kill app &&
docker rm app &&
docker run --name app --network=host -p 3000:3000 -d lzz-blog/node-web-app &&
echo 'OK!'
