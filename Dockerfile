FROM node:8

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
RUN npm install --only=production
RUN mkdir -p /opt/app && cp -a /tmp/build
WORKDIR /opt/app
ADD . /opt/app
RUN cd /tmp && npm run build
RUN npm install serve -g

EXPOSE 3000

CMD ['serve', '-s', 'build']
