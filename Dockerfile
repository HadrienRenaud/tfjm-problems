FROM node:8

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json
RUN cd /tmp && npm install --only=production
RUN cd /tmp && npm run build
RUN mkdir -p /opt/app && cp -a /tmp/build
WORKDIR /opt/app
RUN npm install serve -g
ADD . /opt/app

EXPOSE 3000

CMD ['serve', '-s', 'build']
