echo "Stopping any existing servers"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

node --version
nvm --version
echo "loaded nvm"

pkill node
/home/ec2-user/.nvm/versions/node/v17.4.0/bin/pm2 kill
echo "Stopped the file"