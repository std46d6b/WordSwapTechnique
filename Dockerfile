FROM node:lts-slim as build

WORKDIR /app

COPY package.json ./
RUN rm -rf node_modules
RUN rm -rf build
COPY . .
RUN npm install
RUN npm run build

FROM node:lts-slim as run

WORKDIR /app
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/build ./build
RUN npm install --omit=dev

RUN mkdir -p ./build/client/up

EXPOSE 3000
ENTRYPOINT [ "node", "build" ]
