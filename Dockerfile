FROM node:8

# workaround for npm in docker
# https://github.com/npm/npm/issues/9863#issuecomment-242691767
# RUN cd $(npm root -g)/npm \
#   && npm install fs-extra \
#   && sed -i -e s/graceful-fs/fs-extra/ -e s/fs\.rename/fs.move/ ./lib/utils/rename.js

# upgrade npm
# RUN npm install -g npm
# Install nodemon
RUN npm install nodemon -g
# Install grunt
# RUN npm install -g grunt

# Provides cached layer for node_modules
# ADD package.json /tmp/package.json
# RUN cd /tmp && npm install
# RUN mkdir -p /src && cp -a /tmp/node_modules /src/
# Not using the cache option, buggy on ubuntu

RUN mkdir -p /src
WORKDIR /src

ADD . /src

RUN npm install

# Expose port
EXPOSE 3000
EXPOSE 5858

# Grunt will build the files, start nodemon and watch for changes
CMD ["nodemon -e '.js' index.js"]
