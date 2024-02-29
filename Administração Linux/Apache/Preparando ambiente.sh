#!/bin/bash

#Instala, configura um virtual host e configura o SSL


apt install -y httpd mod_ssl  libapache2-mod-php7.4

echo "Habilitando"
systemctl enable apache2
systemctl start apache2

echo "Veridicando status"
systemctl status apache2

echo "Arquivo de configuração do host virtual"
sudo touch /etc/apache2/site-avaible/seu_dominio.conf

bash -c 'cat <<EOF >> /etc/apache2/sites-avaible/seu_dominio.conf
<VirtualHost *:80>
  ServerAdmin root@localhost
  ServerName seu_dominio
  DocumentRoot /var/www/seu_dominio

  ErrorLog ${APACHE_LOG_DIR}/seu_dominio-error.log
  CustomLog ${APACHE_LOG_DIR}/seu_dominio-access.log combined

  <Directory /var/www/seu_dominio>
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
  </Directory>
</VirtualHost>
EOF'

echo "Habilitando host"
a2ensite seu_dominio.conf ## 

echo "Recarregando Apache"
systemctl reload apache2

echo "Gerando certificado autoassinado (teste)"
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/apache2/certs/seu_dominio.key -out /etc/apache2/certs/seu_dominio.crt ##

echo "Habilitando o SSL"
bash -c 'cat <<EOF >> /etc/apache2/sites-avaible/seu_dominio.conf
<IfModule mod_ssl.c>
  SSLEngine on
  SSLCertificateFile /etc/apache2/certs/seu_dominio.crt
  SSLCertificateKeyFile /etc/apache2/certs/seu_dominio.key
</IfModule>
EOF'

systemctl reload apache2
