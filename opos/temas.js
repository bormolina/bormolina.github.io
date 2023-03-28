const temas = [
  {
    'nombre': 'Tema 1: Representación y comunicación de la información',
    'indice':[
      '1. Introducción', 
      '2. Información',
      '3. Sistemas de numeración*',
        '3.1. Decimal',
        '3.2. Binario',
        '3.3. Octal',
        '3.4. Hexadecimal',
      '4. Representación de la información*',
        '4.1. Texto',
        '4.2. Números',
          '4.2.1. Enteros',
          '4.2.2. Reales',
        '4.3. Instrucciones máquina',
        '4.4. Audio', 
        '4.5. Imágenes',
        '4.6. Video',
      '5. Comunicación de la información*',
        '5.1. Elementos de la comunicación',
        '5.2. Redes informáticas',
          '5.2.1. Tipos de redes informáticas',
        '5.3. Protocolos de comunicación',
        '5.4. Compresión de datos',
        '5.5. Detección y corrección de fallos',
      '6. Conclusión',
      '7. Bibliografía'
    ]
  },
  {
    'nombre': 'Tema 2: Elementos funcionales de un ordenador',
    'indice': [
      '1. Introducción',
      '2. Ordenador digital',
        '2.1. Definción de ordenador',
        '2.2. Evolución de los ordenadores',
        '2.3. Medidas de rendimiento',
        '2.4. Tipos de ordenadores',
      '3. Elementos funcionales de los ordenadores*',
        '3.1. CPU',
        '3.2. Memoria',
        '3.3. Unidad de Entrada/salida',
        '3.4. Buses',
      '4. Arquitectura de un ordenador*',
        '4.1. Arquitectura von Neumann', 
        '4.2. Arquitectura Harvard',
      '5. Conclusión',
      '6. Bibliografía'
    ]
  },
  {
    'nombre': 'Tema 9: Lógica de circuitos. Circuitos combinacionales y secuenciales.',
    'indice': [
      '1. Introducción',
      '2. Circuitos digitales',
        '2.1. Lógica de circuitos',
        '2.2. Variables y operadores lógicos',
        '2.3. Álgebra de Boole',
        '2.4. Mapas de Karnaugh',
      '3. Circuitos combinacionales*',
        '3.1. Sumador',
        '3.2. Codificador',
        '3.3. Decodificador',
        '3.4. Multiplexor',
        '3.5. Demultiplexor',
        '3.6. Memorias ROM',
      '4. Circuitos secuenciales*',
        '4.1. Biestables',
          '4.1.1. Biestables SR',
          '4.1.2. Biestables JK',
          '4.1.3. Biestables D',
          '4.1.4. Biestables T',
        '4.2. Registros',
        '4.3. Contadores',
      '5. Conclusion',
      '6. Bibliografía'
    ]
  },
  {
    'nombre': 'Tema 11: Organización lógica de los datos. Estructuras estáticas',
    'indice': [
      '1. Introducción',
      '2. Organización lógica de los datos',
        '2.1. Datos',
        '2.2. Tipos de dato',
        '2.3. Estructuras de datos',
        '2.4. Tipos de estructuras de datos',
      '3. Estructuras estáticas',
        '3.1. Arrays',
          '3.1.1. Vectores',
          '3.1.2. Cadenas de caracteres',
          '3.1.3. Matrices',
          '3.1.4. Arrays de dimensión n',
        '3.2. Registros',
        '3.3. Conjuntos',
      '4. Conclusión',
      '5. Bibliografía',
    ]
  },
  {
    'nombre': 'Tema 12: Organización lógica de los datos. Estructuras dinámicas',
    'indice': [
      '1. Introducción', 
      '2. Organización lógica de los datos',
        '2.1. Datos', 
        '2.2. Tipos de datos', 
        '2.3. Estructuras de datos',
        '2.4. Tipos de estructuras de datos',
      '3. Estructuras dinámicas',
        '3.1. Listas',
        '3.2. Pilas', 
        '3.3. Colas',
        '3.4. Árboles',
          '3.4.1. Árboles binarios',
        '3.5. Grafos',
      '4. Conclusión',
      '5. Bibliografía'
    ]
  },
  {
    'nombre': 'Tema 27: Programación orientada a objetos. Objetos. Clases. Herencia. Polimorfismo. Lenguajes.',
    'indice':[
      '1. Introducción',
      '2. Programación orientada a objetos',
      '3. Objetos',
      '4. Clases',
        '4.1. Atributos',
        '4.2. Métodos',
        '4.3. Miembros',
      '5. Herencia',
        '5.1. Casos de uso',
        '5.2. Tipos de herencia',
      '6. Polimorfismo',
      '7. Interfaces',
      '8. Lenguajes',
      '9. Conclusión',
      '10. Bibliografía'
    ]
  },
  {
    'nombre': 'Tema 35: La definición de datos. Niveles de descripción. Lenguajes. Diccionario de datos.',
    'indice':[
      '1. Introducción',
      '2. Definición de datos',
      '3. Niveles de descripción*',
        '3.1. Nivel externo',
        '3.2. Nivel conceptual',
        '3.3. Nivel interno',
        '3.4. Correspondencia entre niveles',
      '4. Lenguajes*',
        '4.1. SQL',
      '5. Diccionario de datos',
      '6. Conclusión',
      '7. Bibliografía'
    ]
  },
  {
    'nombre': 'Tema 40: Diseño de bases de datos relacionales', 
    'indice':[
      '1. Introducción', 
      '2. Diseño conceptual. Modelo entidad relación*',
        '2.1. Elementos del modelo',
          '2.1.1. Entidades',
          '2.1.2. Atributos',
          '2.1.3. Relaciones',
        '2.2. El modelo E-R extendido*',
          '2.2.1. Cardinalidad',
          '2.2.2. Especialización y generalización',
      '3. Diseño lógico. El modelo relacional*',
        '3.1. Correspondencia entre el modelo E-R y el relacional',
        '3.2. Proceso de normalización',
      '4. Diseño físico',
      '5. Conclusión',
      '6. Bibliografía'
    ]
  }
]

const template = 
  {
    'nombre': '', 
    'indice': [

    ]
  }