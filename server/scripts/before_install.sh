curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node

DIR="/home/ec2-user/PinterestLike-server"
if [ -d "$DIR"]; then
    echo "Directory ${DIR} exists"
else
    echo "Directory ${DIR} does not exists"
    mkdir ${DIR}
fi
