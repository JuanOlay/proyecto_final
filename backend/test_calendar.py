import calendar

def generar_calendario(month, year):
    cal = calendar.month(year, month )
    return cal

# Llama a la función para obtener el calendario de enero de 2024
calendario_enero_2024 = generar_calendario(1, 2024)
print(calendario_enero_2024)

cadena_datos = "10,20,30,40,50"

# Descomponemos la cadena en una lista de strings
lista_strings = cadena_datos.split(',')

# Convertimos cada string a un entero
lista_enteros = list(map(lambda n: int(n), lista_strings))

print(lista_enteros)
