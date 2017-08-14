FROM node:7
EXPOSE 3000
WORKDIR /app

RUN npm install -g serve

ENTRYPOINT ENTRYPOINT ["sh", "docker-entrypoint.sh"]

# Install
COPY . /app
RUN yarn install