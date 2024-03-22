sudo chmod -R 777 /home/ec2-user/PinterestLike-server

cd /home/ec2-user/PinterestLike-server

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

npm install
npm i pm2 -g
pm2 kill
pm2 start dist/bundle.js -f --name=server