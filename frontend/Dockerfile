FROM node:alpine
WORKDIR /app
COPY package.json .
RUN corepack enable
RUN yarn install
COPY . .
EXPOSE 5173
CMD ["yarn", "dev"]