FROM ubuntu
ARG USUARIO
ARG PASSWD
ARG TZ
ARG DB
ARG USUARIO_DB
ARG PASSWD_DB
ARG DB_IP
ARG DB_PORT
ARG PUERTO
ARG JWT

ENV USUARIO=${USUARIO}
ENV PASSWD=${PASSWD}
ENV TZ=${TZ}
ENV DB_IP=${DB_IP}
ENV DB_NAME=${DB_NAME}
ENV DB_USERNAME=${DB_USERNAME}
ENV DB_PASSWD=${DB_PASSWD}
ENV DB_PORT=${DB_PORT}
ENV PUERTO=${PUERTO}
ENV JWT=${JWT}

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt update && apt install -yq --no-install-recommends \
    gnupg2 \
    ca-certificates \
    nginx

COPY ./build/scripts/start.sh /root
COPY ./build/conf/nginx.conf /root
COPY ./build/conf/id_rsa.pub /root
RUN chmod +x /root/start.sh

RUN apt update && apt install -yq --no-install-recommends \
    apt-utils \
    wget \ 
    curl \ 
    git \
    nano \ 
    tree \
    net-tools \ 
    iputils-ping \
    sudo \ 
    openssh-server \ 
    openssh-client \
    unzip \
    dos2unix \ 
    expect \
    python3 \
    nodejs \
    npm \
    systemd

RUN dos2unix /root/start.sh 
ENTRYPOINT [ "/root/start.sh" ]