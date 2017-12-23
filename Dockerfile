FROM node:8

# workaround for npm in docker
# https://github.com/npm/npm/issues/9863#issuecomment-242691767
# RUN cd $(npm root -g)/npm \
#   && npm install fs-extra \
#   && sed -i -e s/graceful-fs/fs-extra/ -e s/fs\.rename/fs.move/ ./lib/utils/rename.js

RUN mkdir /src

RUN npm install nodemon -g

WORKDIR /src
ADD package.json /src/package.json
RUN npm install

ADD nodemon.json /src/nodemon.json

EXPOSE 3000

CMD npm start
