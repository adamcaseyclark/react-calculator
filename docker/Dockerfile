FROM ubuntu:18.04

# Keep upstart quiet
RUN dpkg-divert --local --rename --add /sbin/initctl
RUN ln -sf /bin/true /sbin/initctl

# Disable tty
ENV DEBIAN_FRONTEND noninteractive

# Fix apt
RUN echo "Acquire::http::No-Cache true;" | tee /etc/apt/apt.conf \
    && echo "Acquire::http::Pipeline-Depth 0;" | tee /etc/apt/apt.conf

# Fetch updates / installations
RUN apt-get update --fix-missing && apt-get install -y \
    curl \
    apt-transport-https \
    gnupg2 \
    && rm -rf /var/lib/apt/lists/*

# Node pre-install
RUN curl -sS https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add - \
    && echo "deb https://deb.nodesource.com/node_8.x xenial main" | tee /etc/apt/sources.list.d/nodesource.list

# Fetch updates / installations
RUN apt-get update && apt-get install -y \
    nodejs \
    git \
    ssh \
    && rm -rf /var/lib/apt/lists/*

FROM node:14
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
