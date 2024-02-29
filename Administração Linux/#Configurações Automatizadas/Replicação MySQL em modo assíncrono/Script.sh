#!/bin/bash
source conf.sh
alias credenciais_m = "mysql -h $MASTER_HOST -P $MASTER_PORT -u $MASTER_USER -p $MASTER_PASSWORD -e"
alias credenciais_s = "mysql -h $SLAVE_HOST -P $SLAVE_PORT -u $SLAVE_USER -p $SLAVE_PASSWORD -e"
alias verificacao_erro = " echo $? -eq 0 'feito' : 'deu zica' "
#conectando master
    echo "Concectando ao servidor master..."
    credenciais_m "SHOW VARIABLES LIKE '%version%';"
    verificacao_erro
#Habilitando log binário no master
    echo "Habilitando log binário no master"
    credenciais_m "SET GLOBAL binlog_format='ROW';"
    credenciais_m "SET GLOBAL log_bin_enabled=1;"
    verificacao_erro
# Reiniciando o Servidor Master
    echo "Reiniciando o Servidor Master"
    service mysql restart
    verificacao_erro
# Conectando no slave
    echo "Concectando ao servidor slave..."
    credenciais_s "SHOW VARIABLES LIKE '%version%';"
    verificacao_erro
# Configurando o servidor Slave
    echo "Configurando o servidor Slave"
    credenciais_s "CHANGE MASTER TO MASTER_HOST='$MASTER_HOST', MASTER_USER='$MASTER_USER', MASTER_PASSWORD='$MASTER_PASSWORD', MASTER_PORT='$MASTER_PORT';"
    verificacao_erro
# Iniciando a replicação
    echo "Iniciando a replicação"
    credenciais_s "START SLAVE;"
    verificacao_erro
# Verificando estado da replicação
    echo "Verificando estado da replicação"
    $credenciais_s "SHOW SLAVE STATUS\G;"

echo "Script finalizado"