FROM node:7
EXPOSE 3000
WORKDIR /app

RUN npm install -g serve

ENTRYPOINT yarn build; serve -p 3000 build/

# Install
COPY . /app
RUN yarn install