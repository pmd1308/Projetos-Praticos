#!/bin/bash

apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927 ##

echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.6.list ##

apt update ; apt install mongodb-org

cat << EOF | tee /etc/systemd/system/mongodb.service
[Unit]
Description=High-performance, schema-free document-oriented database
After=network.target

[Service]
User=mongodb
ExecStart=/usr/bin/mongod --quiet --config /etc/mongod.conf

[Install]
WantedBy=multi-user.target
EOF

systemctl start mongodb.service
systemctl enable mongodb.service

$EDITOR /etc/mongodb.conf

mongo