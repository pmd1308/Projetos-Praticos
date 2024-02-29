#!/bin/bash

echo "<endereço_ip_ou_nome>" >> /etc/ansible/hosts
ssh "<endereço_ip_ou_nome>" "tree"

#playbooks
#instalar pacotes
cat << EOF >> playbook.yml
---
- hosts: all
  tasks:
  - name: Instalando o pacote 'tree'
    apt:
      name: tree
      state: present
EOF

#Atualizar
cat << EOF >> playbook.yml
---
- hosts: all
  tasks:
  - name: Atualizar sistema
    apt:
      update_cache: yes
      upgade: yes
EOF
#Criar usuario
cat << EOF >> playbook.yml
---
- hosts: all
  tasks:
  - name: Criar usuario
    user:
      name: teste
      state: present
      shell:/bin/bash
EOF
#Configurar serviço SSH
  cat << EOF >> playbook.yml
  ---
  - hosts: all
    tasks:
    - name: Configurar SSH
      service:
        name: ssh
        state: started
        enabled: yes
  EOF