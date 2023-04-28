FROM node:20.0.0-alpine3.16  AS alpinebase
WORKDIR /app

# Install apprise, iputils for non-root ping, setpriv
RUN apk add --no-cache iputils setpriv dumb-init python3 py3-cryptography py3-pip py3-six py3-yaml py3-click py3-markdown py3-requests py3-requests-oauthlib && \
    pip3 --no-cache-dir install apprise==0.9.7 && \
    rm -rf /root/.cache

FROM alpinebase AS build01

COPY . .
RUN npm i -g pnpm@8
RUN pnpm i
RUN pnpm run build

EXPOSE 3001
VOLUME ["/app/data"]
HEALTHCHECK --interval=60s --timeout=30s --start-period=180s --retries=5 CMD node extra/healthcheck.js
CMD ["node", "server/server.js"]