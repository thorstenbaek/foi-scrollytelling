FROM node:16 as build

ENV NODE_ENV=production 

WORKDIR /app
COPY . .
COPY package.json package-lock.json svelte.config.js ./
RUN npm ci
RUN npm audit fix

RUN npm run build 


FROM node:16-alpine3.15

WORKDIR /app
COPY --from=build /app .

ENV PORT=80

EXPOSE 80
CMD ["node", "./build/index.js"]