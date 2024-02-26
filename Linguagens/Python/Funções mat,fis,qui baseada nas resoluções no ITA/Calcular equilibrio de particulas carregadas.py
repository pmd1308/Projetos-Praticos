'''
Esse código permite calcular a cotangente do ângulo formado por um fio que sustenta uma partícula com carga em um sistema com duas partículas de massas e cargas iguais em equilíbrio.
'''

import math
#Usei uma escala grande para facilitar a compreenção
# definindo constantes
K= 9e9 # Constante eletroestática no vácuo
g = 9.8 #Aceleração da gravidade

# Cotangente do ângulo
def calc_cotangente(m, Q, d, L):
    F = K * (Q**2/ d**2) # Força eletroestática
    mg = m *g # Força da gravidade
    angulo = math.acos((mg *d) / (F*L)) # Ângulo
    cotangente = math.cos(angulo) / mat.sin(angulo)
    return cotangente


def main():
    m = float(input("Massa da partícula (kg): "))
    Q = float(input("Carga das partículas (C): "))
    d = float(input("Distância entre as párticulas: "))
    L = float(input("Comprimento dos fios (m): "))
    if m <=0 or q <= 0 or d <=0 or 1 <=0:
        print("Como você tem -1 massa?\n Valor positivo apenas")
        return
    cotangente = calc_cotangente(m, Q, d, L)

    print(f"A cotangente do ângulo é: {cotangente}")

if __name__ == "__main__":
    main()

