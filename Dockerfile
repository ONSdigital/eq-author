FROM node:8
MAINTAINER eq.team@ons.gov.uk

EXPOSE 3000
WORKDIR /app

ARG APPLICATION_VERSION
ENV EQ_AUTHOR_VERSION $APPLICATION_VERSION

ENTRYPOINT ["sh", "docker-entrypoint.sh"]

# Install
COPY . /app
RUN yarn install