#!/bin/bash
source config.sh

function listar_backups() {
    local diretorio_backups="/var/backups/mysql"
    local arquivos_backup=$(ls -1 $diretorio_backups)

    if [ -z "$arquivos_backup" ]; then
        echo "Nenhum backup encontrado."
        return 1
    fi

    echo "Backups disponíveis:"
    for arquivo in $arquivos_backup; do
        echo " - $arquivo"
    done

    return 0
}

function selecionar_backup() {
    local arquivos_backup=$(listar_backups)

    if [ $? -ne 0 ]; then
        return 1
    fi

    while true; do
        read -p "Digite o nome do backup a ser restaurado: " nome_backup

        if [ -z "$nome_backup" ]; then
            echo "Nome do backup inválido."
            continue
        fi

        if [ ! -f "$diretorio_backups/$nome_backup" ]; then
            echo "Backup '$nome_backup' não encontrado."
            continue
        fi

        break
    done

    echo "Backup '$nome_backup' selecionado."

    return 0
}

function confirmar_restauracao() {
    while true; do
        read -p "Deseja realmente restaurar o backup? (s/n) " resposta

        if [ -z "$resposta" ]; then
            echo "Resposta inválida."
            continue
        fi

        if [[ "$resposta" =~ ^[Ss]$ ]]; then
            echo "Restaurando o backup..."
            break
        elif [[ "$resposta" =~ ^[Nn]$ ]]; then
            echo "Restauração cancelada."
            return 1
        else
            echo "Resposta inválida."
            continue
        fi
    done

    return 0
}
function restaurar_backup() {
    local nome_backup=$1
    local diretorio_backups="/var/backups/mysql"

    if [ ! -f "$diretorio_backups/$nome_backup" ]; then
        echo "Backup '$nome_backup' não encontrado."
        return 1
    fi

    # Desativar foreign keys
    mysql -u "$usuario" -p "$senha" "$banco_de_dados" < /var/backups/mysql/desativar_foreign_keys.sql

    # Restaurar o banco de dados
    if ! mysqldump -u "$usuario" -p "$senha" "$banco_de_dados" < "$diretorio_backups/$nome_backup"; then
        echo "Erro ao restaurar o banco de dados."
        return 1
    fi

    # Ativar foreign keys
    mysql -u "$usuario" -p "$senha" "$banco_de_dados" < /var/backups/mysql/ativar_foreign_keys.sql

    echo "Restauração do backup concluída."

    return 0
}

listar_backups
selecionar_backup

if [ $? -ne 0]; then
    exit 1
fi

confirmar_restauracao

if if [ $? -ne 0]; then
    exit 1
fi

restaurar_backup "$nome_backup"

echo "Restauração do backup realizada com sucesso."

exit 0