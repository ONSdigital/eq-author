FROM node:7
EXPOSE 3000
WORKDIR /app

RUN npm install -g serve

ENTRYPOINT serve -p 3000 build/

# Install
COPY . /app
RUN yarn install
RUN yarn build

# Tidy up
RUN rm -rf /app/node_modules
RUN yarn cache clean