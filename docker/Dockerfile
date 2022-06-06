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

FROM node:8
RUN rm -rf /usr/local/lib/node_modules/npm \
  && mkdir /usr/local/lib/node_modules/npm \
  && curl -sL https://github.com/npm/npm/archive/v6.1.0.tar.gz | tar xz -C /usr/local/lib/node_modules/npm --strip-components=1 \
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

# Install Docker from official repo
RUN apt-get update -qq && \
    apt-get install -qqy apt-transport-https ca-certificates curl gnupg2 software-properties-common && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add - && \
    apt-key fingerprint 0EBFCD88 && \
    add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable" && \
    apt-get update -qq && \
    apt-get install -qqy docker-ce && \
    usermod -aG docker jenkins && \
    chown -R jenkins:jenkins $JENKINS_HOME/

# thing ashdoasnd TODO
VOLUME /opt/code

#ARG BUILD_DATE=${BUILD_DATE:-undefined_date}
#ARG GIT_HASH=${GIT_HASH:-undefined_hash}
#ENV Q_WORKBENCH_BUILD_DATE $BUILD_DATE
#ENV Q_WORKBENCH_GIT_HASH $GIT_HASH

WORKDIR /opt/code
ENTRYPOINT ["npm"]
CMD ["start"]
