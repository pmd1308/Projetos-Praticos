from pymongo import MongoClient

def registrar_desconto(desconto):
    with MongoClient("mongodb://localhost:27017") as client:
        db = client["loja"]
        descontos = db["descontos"]
        descontos.insert_one({"desconto": desconto})

def main():
    try:
        valor_compra = float(input("Digite o valor total da compra: "))
        if valor_compra <= 0:
            raise ValueError("Valor da compra inválido.")
        desconto = float(input("Digite o desconto percentual da compra: "))
        if desconto < 0 or desconto > 100:
            raise ValueError("Desconto inválido.")
        valor_final = valor_compra - (valor_compra * desconto / 100)
        registrar_desconto(desconto)
        print(f"Valor final da compra com desconto: R${valor_final}")
    except ValueError as e:
        print(f"Erro: {e}")

if __name__ == "__main__":
    main()
