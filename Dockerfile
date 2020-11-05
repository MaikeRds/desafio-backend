FROM node:12.18

ENV TZ=America/Fortaleza
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

#RUN apk add --no-cache bash
RUN npm config set cache /home/node/app/.npm-cache --global

RUN npm i -g @nestjs/cli@7.2.0

USER node

WORKDIR /home/node/app
