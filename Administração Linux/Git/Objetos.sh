#!/bin/sh

if [ -f /etc/debian_version ]; then
  apt install git
else [ -f /etc/redhat-release ]; then
  yum install git
fi

git clone 

cd 

git cat-file -p HEAD
git cat-file -p
git cat-me.txt
git cat-file -p master
cat .git/refs/heads/master
git log -1
cat .git/HEAD
git tag
git cat-file -p v1.0