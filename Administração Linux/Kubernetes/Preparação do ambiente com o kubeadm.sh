#!/bin/bash

curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | tee -a /etc/apt/sources.list.d/kubernetes.list


apt update ; apt install -y kubeadm kubelet kubectl

kubeadm init --pod-network-cidr=10.233.0.0/16
kubeadmctl mark-master

token=$(kubeadm token list | grep -v "BOOTSTRAP_TOKEN" | awk '{print $1}')

mkdir -p ~/.kube
kubeadm token create --print-secret > ~/.kube/config

kubectl apply -f https://raw.githubusercontent.com/kubernetes/kubectl/master/manifests/kubectl-proxy.yaml

systemctl start kube-proxy

kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/master/src/deploy/recommended/kubernetes-dashboard.yaml

kubectl proxy -p 8001 &
