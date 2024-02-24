# script para calcular base de objetos dado seu comprimento

def calcular_raio_plataforma(lado_base):
  # Condicional
  if not isinstance(lado_base, float) or lado_base <= 0:
    raise ValueError("O lado da base deve ser um número positivo.")
  raio_minimo = (lado_base * math.sqrt(2)) / 2
  return raio_minimo


def main ():
  lado_base = float(input("Digite o comprimento do objeto: "))

  try:
    raio_minimo = calcular_raio_plataforma(lado_base)
    print(f"O raio mínimo da plataforma é de {raio_minimo:.2f} metros.")
  except ValueError as erro:
    print(f"Erro: {erro}")

if __name__ == "__main__":
  main()