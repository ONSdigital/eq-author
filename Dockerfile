FROM node:7
EXPOSE 3000
WORKDIR /app

RUN npm install -g serve

ARG APPLICATION_VERSION
ENV EQ_AUTHOR_VERSION $APPLICATION_VERSION

ENTRYPOINT ["sh", "docker-entrypoint.sh"]

# Install
COPY . /app
RUN yarn install