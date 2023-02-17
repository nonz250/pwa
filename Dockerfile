FROM node:18 AS builder

ARG WORKDIR=/var/www/app
WORKDIR $WORKDIR

COPY ./frontend ${WORKDIR}

RUN npm ci --production=false
RUN npm run build

FROM nginx:1-alpine

ARG WORKDIR=/var/www/app
WORKDIR $WORKDIR

COPY --from=builder ${WORKDIR}/dist ${WORKDIR}/public/dist
COPY --from=builder ${WORKDIR}/public ${WORKDIR}/public
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf

RUN mv ${WORKDIR}/public/dist/sw.js ${WORKDIR}/public/sw.js

EXPOSE 80 443