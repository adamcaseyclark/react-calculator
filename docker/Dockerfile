FROM node:14-alpine3.10
RUN rm -rf /usr/local/lib/node_modules/npm \
  && mkdir /usr/local/lib/node_modules/npm \
  && curl -sL https://github.com/npm/cli/archive/v7.1.0.tar.gz | tar xz -C /usr/local/lib/node_modules/npm --strip-components=1 \
  && npm --version

# DEBUG
RUN npm --version
RUN node --version

# Setup log directories and file
RUN mkdir -p /opt/logs
RUN chmod 777 /opt/logs

# Add code to container
COPY /code /opt/code

# Install code dependencies
RUN cd /opt/code/ && npm install > /dev/null

# thing ashdoasnd TODO
VOLUME /opt/code

WORKDIR /opt/code
ENTRYPOINT ["npm"]
CMD ["start"]
