# Script que calcula a força gravitacional, força eletrostática e aceleração de um objeto entre duas placas de um capacitor

import math

# Variáveis (com conversão de unidades para kg e m)
massa = float(input("Peso do objeto (g): ")) / 1000  # Converte de g para kg
carga = float(input("Carga (C): "))
tensao = float(input("Diferença de potencial (V): "))
distancia_placas_capacitor = float(input("Distância entre placas do capacitor (cm): ")) / 100  # Converte de cm para m

# Cálculos
forca_gravitacional = massa * 9.8
forca_eletrostatica = carga * tensao / distancia_placas_capacitor
try:
  aceleracao = math.sqrt(3 * 9.8**2 - forca_eletrostatica**2 / massa**2)
except ValueError as e:
  print("Erro: valor negativo em raiz quadrada?")
  print(e)
  aceleracao = None

# Impressão dos resultados
print(f" Força gravitacional: {forca_gravitacional:.2f} N\n Força eletrostática: {forca_eletrostatica:.2f} N")
if isinstance(aceleracao, float):
  print(f" Aceleração do objeto: {aceleracao:.2f} m/s")
else:
  print("Não existe aceleração")