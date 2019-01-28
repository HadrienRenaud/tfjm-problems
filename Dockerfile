FROM node:8

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
RUN mkdir -p /opt/app
WORKDIR /opt/app
ADD . /opt/app
RUN npm install --only=production
RUN npm run build
RUN npm install serve -g
RUN chmod -R 775 /opt/app

EXPOSE 3000

CMD ['serve', '-s', 'build']
