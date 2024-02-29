#!/bin/bash

apt update && apt upgrade -y

snap install microk8s --classic

microk8s enable dns

microk8s enable dashboard

export KUBECONFIG=/var/snap/microk8s/current/config/kubectl

kubectl &

