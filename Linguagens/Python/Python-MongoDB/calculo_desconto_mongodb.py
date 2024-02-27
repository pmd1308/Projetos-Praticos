import pymongo
from pymongo import MongoClient

def calcular_valor_final(valor_compra, desconto):
  """
  Função para calcular o valor final de uma compra com desconto.

  Argumentos:
    valor_compra (float): O valor total da compra.
    desconto (float): O desconto percentual da compra.

  Retorna:
    float: O valor final da compra com desconto.
  """
  valor_desconto = valor_compra * desconto / 100
  valor_final = valor_compra - valor_desconto
  return valor_final

def registrar_desconto(desconto):
  """
  Função para registrar a quantidade de vezes que o desconto foi aplicado no MongoDB.

  Argumentos:
    desconto (float): O desconto percentual da compra.
  """
  # Conectar ao banco de dados MongoDB
  client = MongoClient("mongodb://localhost:27017")
  db = client["loja"]
  descontos = db["descontos"]

  # Registrar o desconto
  descontos.insert_one({"desconto": desconto})

def main():
  # Solicitar valores ao usuário
  valor_compra = float(input("Digite o valor total da compra: "))
  desconto = float(input("Digite o desconto percentual da compra: "))

  # Calcular valor final da compra
  valor_final = calcular_valor_final(valor_compra, desconto)

  # Registrar desconto no MongoDB
  registrar_desconto(desconto)

  # Apresentar resultado
  print(f"Valor final da compra com desconto: R${valor_final:.2f}")

if __name__ == "__main__":
  main()
