from mysqlclient import connect


def conectar_banco():
    try:
        host = input("Host: ")
        user = input("Usuário: ")
        password = input("Senha: ")
        database = input("Banco de dados: ")
        # Validação das informações de conexão
        if not host or not user or not password or not database:
            raise ValueError("Todas as informações de conexão são obrigatórias.")

        conexao = connect(host, user, password, database)
        return conexao
    except ValueError as e:
        print(f"Erro: {e}")
        exit()
    except ConnectionError as e:
        print(f"Erro ao conectar ao banco de dados: {e}")
        exit()

def executar_comando(conexao):
    while True:
        comando = input("Digite o comando SQL (ou 'sair' para finalizar): ")
        if comando.lower() == "sair":
            break
        
        try:
            #Criar cursor
            cursor = conexao.cursor()
            cursor.execute(comando)

            if comando.lower().startswith("select"):
                for registro in cursor:
                    print(registro)
            #Confirmar alteração
            conexao.commit()
        except Exception as e:
            print("Erro ao executar comando:", e)

def main():
    conexao = conectar_banco()
    executar_comando(conexao)
    conexao.close()


if __name__ == "__main__":
    main()
