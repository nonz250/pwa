FROM node:18 AS builder

ARG WORKDIR=/var/www/app
WORKDIR $WORKDIR

COPY ./frontend ${WORKDIR}

RUN npm ci --production=false
RUN npm run build

FROM nginx:1-alpine

ARG WORKDIR=/var/www/app
WORKDIR $WORKDIR

COPY --from=builder ${WORKDIR}/dist ${WORKDIR}
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443