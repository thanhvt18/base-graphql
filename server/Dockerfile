ARG app_name=server
FROM node:10-alpine

RUN mkdir -p /opt/${app_name}
WORKDIR /opt/${app_name}
COPY ./package.json /opt/${app_name}
RUN npm i yarn
RUN yarn install
RUN npm install pm2 -g


COPY ./app /opt/${app_name}/app
COPY ./bin /opt/${app_name}/bin
COPY ./public /opt/${app_name}/public
COPY ./routes /opt/${app_name}/routes
COPY ./views /opt/${app_name}/views
COPY ./app.js /opt/${app_name}
COPY ./config.js /opt/${app_name}
COPY ./config.js /opt/${app_name}

WORKDIR /opt/${app_name}

EXPOSE 3000
CMD [ "pm2-runtime", "./bin/www" ]


