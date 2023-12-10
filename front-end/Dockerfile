FROM node:20.10-alpine3.17 AS BUILD_IMAGE
WORKDIR /front-end
COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build

FROM node:20.10-alpine3.17 AS PRODUCTION_STAGE
WORKDIR /front-end

COPY --from=BUILD_IMAGE /front-end/package*.json ./
COPY --from=BUILD_IMAGE /front-end/.next ./.next
COPY --from=BUILD_IMAGE /front-end/public ./public
COPY --from=BUILD_IMAGE /front-end/node_modules ./node_modules
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]