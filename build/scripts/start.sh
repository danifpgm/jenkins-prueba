#!/bin/bash
set -e

newUser(){
    mkdir "/var/logs"
    echo "Usuario: ${USUARIO}" > "/var/logs/172.150.10.2.log"
    echo "Passwd: ${PASSWD}" >> "/var/logs/172.150.10.2.log"
    if [ ! -d "/home/${USUARIO}" ]
    then
        useradd -rm -d /home/"${USUARIO}" -s /bin/bash "${USUARIO}" 
        echo "root:${PASSWD}" | chpasswd
        echo "${USUARIO}:${PASSWD}" | chpasswd
    fi
}

config_Sudoers(){
    echo "${USUARIO} ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers
}

config_ssh(){
    sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config
    sed -i 's/#Port 22/Port 22/' /etc/ssh/sshd_config
    if [ ! -d /home/${USUARIO}/.ssh ]
    then
        mkdir /home/${USUARIO}/.ssh
        cat /root/id_rsa.pub >> /home/${USUARIO}/.ssh/authorized_keys
    fi
    /etc/init.d/ssh start
}

 config_nginx(){
     cp /root/nginx/ /etc/nginx/nginx.conf
}

npmGitInstalar(){
    mkdir "/home/${USUARIO}/apinest"
    cd "/home/${USUARIO}/apinest"
    git init;
    git clone --branch master "https://github.com/danifpgm/proyectoapinest"
    cd ./proyectoapinest
    echo -e "DB_HOST=$DB_IP
DB_PUERTO=$DB_PORT
DB_NOMBRE=$DB_NAME
DB_NOMBREUSU=$DB_USERNAME
DB_PASSWD=$DB_PASSWD
PUERTO=$PUERTO
JWT_SECRET=$JWT"> .env
    npm cache clean --force
    npm install --force
    echo "instalado"
    npm run start:dev
    echo "funcionando"
}


main(){
    if [ ! -d "/home/${USUARIO}" ]
    then
        newUser
        config_Sudoers
        config_ssh
        config_nginx
        npmGitInstalar
    fi
    tail -f /dev/null 

}

main
