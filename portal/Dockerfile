ARG app_name=portal
FROM node:10-alpine as build-stage

RUN mkdir -p /opt/${app_name}
WORKDIR /opt/${app_name}
COPY ./package.json /opt/${app_name}
RUN npm i yarn
RUN yarn install


COPY ./src /opt/${app_name}/src
COPY ./e2e /opt/${app_name}/e2e
COPY ./.editorconfig /opt/${app_name}
COPY ./angular.json /opt/${app_name}
COPY ./env.js /opt/${app_name}
COPY ./karma.conf.js /opt/${app_name}
COPY ./tsconfig.json /opt/${app_name}
COPY ./tslint.json /opt/${app_name}

WORKDIR /opt/${app_name}

RUN npm run script build

RUN ls /opt/portal/dist/portal/

FROM nginx:alpine
#COPY nginx.conf /etc/nginx/conf.d
WORKDIR /usr/share/nginx/html
COPY --from=build-stage /opt/portal/dist/portal/ .
