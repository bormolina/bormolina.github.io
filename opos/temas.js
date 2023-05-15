const temas = [
  {
    'nombre': 'Tema 1: Representación y comunicación de la información',
    'indice':[
      '1. Introducción', 
      '2. Información',
      '3. Representación de la información*',
        '3.1. Texto',
        '3.2. Números',
          '3.2.1. Enteros',
          '3.2.2. Reales',
        '3.3. Instrucciones máquina',
        '3.4. Audio', 
        '3.5. Imágenes',
        '3.6. Video',
      '4. Comunicación de la información*',
        '4.1. Elementos de la comunicación',
        '4.2. Redes informáticas',
          '4.2.1. Tipos de redes informáticas',
        '4.3. Protocolos de comunicación',
        '4.4. Compresión de datos',
        '4.5. Detección y corrección de fallos',
      '5. Conclusión',
      '6. Bibliografía'
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
      '2.  Lógica de circuitos',
        '2.1. Variables y operadores lógicos',
        '2.1. Álgebra de Boole',
        '2.3. Funciones lógicas',
        '2.4. Mapas de Karnaugh',
      '3. Circuitos combinacionales*',
        '3.1. Sumador',
        '3.2. Codificador',
        '3.3. Decodificador',
        '3.4. Multiplexor',
        '3.5. Demultiplexor',
        '3.6. Memorias ROM',
      '4. Circuitos secuenciales*',
        '4.1. Biestables. Tipos SR, JK, D y T',
        '4.2. Registros',
        '4.3. Contadores',
      '5. Conclusion',
      '6. Bibliografía'
    ]
  },
  {
    'nombre': 'Tema 10: Representación interna de los datos', 
    'indice': [
      '1. Introducción',
      '2. Datos',
      '3. Representación interna de los datos',
      '4. Representación de caracteres alfanuméricos',
      '5. Representación de números',
        '5.1. Números enteros',
        '5.2. Números reales',
      '6. Conclusión',
      '7. Bibliografía'
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
    'nombre': 'Tema 15: Sistemas operativos. Componentes. Estructura. Funciones. Tipos',
    'indice':[
      '1. Introducción',
      '2. Sistemas operativos',
      '3. Componentes',
        '3.1. Kernel',
        '3.2. Interfaz con las apliacaciones: llamadas al sistema',
        '3.3. Controladores',
        '3.4. Interfaz de usuario',
        '3.5. Aplicaciones',
      '4. Estructura',
        '4.1. Sistemas monolíticos', 
        '4.2. Sistemas estructurados por capas',
        '4.3. Sitstemas cliente-servidor: microkernel',
        '4.4. Sistemas organizados mediante máquina virtuales',
      '5. Funciones', 
        '5.1. Ejecución de aplicaciones',
        '5.2. Gestión de recursos',
        '5.3. Interfaz con el usuario',
        '5.4. Seguridad',
        '5.5. Contabilidad',
      '6. Tipos',
      '7. SO actuales',
        '7.1. Para ordenadores personales',
          '7.1.1. Windows',
          '7.1.2. GNU/Linux',
          '7.1.3. MacOS',
        '7.2. Para servidores',
        '7.3. Para dispositivos móviles',
      '8. Conclusión',
      '9. Bibliografía'
    ]
  },
  {
    'nombre': 'Tema 24: Lenguajes de programación. Tipos. Características',
    'indice':[
      '1. Introducción', 
      '2. Lenguajes de programación*',
        '2.1. Elementos',
          '2.1.1. Símbolos',
          '2.1.2. Palabras reservadas',
          '2.1.3. Tipos de datos', 
          '2.1.4. Literales',
          '2.1.5. Variables y constantes', 
          '2.1.6. Expresiones y operadores',
          '2.1.7. Instrucciones',
          '2.1.8. Procedimientos',
          '2.1.9. Comentarios',
        '2.2. Traductores*',
          '2.2.1. Compilador', 
          '2.2.2. Intérprete',
      '3. Tipos de lenguajes de programación',
        '3.1. Según su cercania al lenguaje máquina. Lenguajes de bajo y alto nivel',
        '3.2. Según su propósito',
        '3.3. Según su paradigma',
        '3.4. Según su generación',
      '4. Características', 
      '5. Conclusión', 
      '6. Bibliografía'
    ]
  },
  {
    'nombre': 'Tema 25: Programación estructurada. Estructuras básicas. Funciones y procedimientos', 
    'indice': [
        '1. Introducción',
        '2. Programación estructurada',
        '3. Estructuras básicas',
          '3.1. Secuenciales',
          '3.2. Selectivas (condicionales)',
            '3.1.1. Condicional simple (if)',
            '3.1.2. Condicional doble (if-else)',
            '3.1.3. Condicional múltiple (switch y if-else if-else)',
          '3.3. Iterativas (bucles)',
            '3.3.1. Bucles while',
            '3.3.2. Bucles until',
            '3.3.3. Bucles for',
        '4. Funciones y procedimientos',
          '4.1. Funciones',
          '4.2. Procedimientos',
          '4.3. Paso de parámetros por valor y por correspondencia',
          '4.4. Ámbito de un identificador',
        '5. Conclusión',
        '6. Bibliografía'
    ]
  },
  {
    'nombre': 'Tema 27: Programación orientada a objetos. Objetos. Clases. Herencia. Polimorfismo. Lenguajes.',
    'indice':[
      '1. Introducción',
      '2. Programación orientada a objetos',
      '3. Objetos',
      '4. Clases*',
        '4.1. Constructores',
        '4.2. Setters y getters',
        '4.3. Miembros estáticos',
        '4.4. Implementación de una clase en Java',
      '5. Herencia*',
        '5.1. Tipos de herencia',
        '5.2. Clases abstractas',
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
      '4. Lenguajes. SQL*',
          '4.1. Tipos de datos en SQL',
          '4.2. Creación de tablas',
          '4.3. Modificación de tablas',
          '4.4. Borrado de tablas',
          '4.5. Creación de vistas',
          '4.6. Creación de índices',
      '5. Diccionario de datos',
      '6. Conclusión',
      '7. Bibliografía'
    ]
  },
  {
    'nombre': 'Tema 36: La manipulación de datos. Operaciones. Lenguajes. Optimización de consultas. ', 
    'indice': [
      '1. Introducción', 
      '2. Manipulación de datos',
      '3. Operaciones',
        '3.1. Álgebra relacional',
        '3.2. Cálculo relacional',
      '4. Lenguajes. SQL',
        '4.1. Consulta de datos',
        '4.2. Inserción de datos',
        '4.3. Modificación de datos',
        '4.4. Borrado de datos',
      '5. Optimización de consultas',
      '6. Conclusiones',
      '7. Bibliografías'
    ]
  },
  {
    'nombre': 'Tema 39: Lenguajes para la definición y manipulación de datos en sistemas de bases de datos relacionales. Tipos. Características. El lenguaje SQL', 
    'indice': [
      '1. Introducción',
      '2. Sistemas de bases de datos relacionales',
      '3. Lenguajes de definición de datos. Tipos y características',
      '4. Lenguajes de manipulación de datos. Tipos y características',
      '5. El lenguaje SQL*',
        '5.1. SLQ como DDL',
          '5.1.1. Tipos de datos',
          '5.1.2. Crear tablas',
          '5.1.3. Crear restricciones',
          '5.1.4. Modificar tablas',
          '5.1.5. Borrar tablas',
          '5.1.6. Crear vistas',
          '5.1.7. Crear índices',
        '5.2. SQL como DML', 
          '5.2.1. Consultas',
          '5.2.2. Inserción de datos',
          '5.2.3. Modificación de datos',
          '5.2.4. Borrado de datos',
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
  },
  {
    'nombre': 'Tema 61: Redes y servicios de comunicaciones',
    'indice' : [
      '1. Introducción',
      '2. Redes',
        '2.1. Comunicación de la información',
          '2.1.1. Elementos de la comunicación',
        '2.2. Redes de sistemas informáticos',
          '2.2.1. Tipos de redes',
      '3. Servicios de comunciación*',
        '3.1. Servicios para el usuario final',
          '3.1.1. World Wide Web (WWW)',
          '3.1.2. Correo electrónico',
          '3.1.3. Transferencia de archivos',
          '3.1.4. Control remoto',
        '3.2. Servicios de red',
          '3.2.1. Protocolo de configuración dinámica de dispositivos. DHCP',
          '3.2.2. Sistema de dominio de nombres. DNS',
          '3.2.3. Protocolo de gestión simple de red. SNMP',
        '4. Conclusión'
    ]
  },
  {
    'nombre': 'Tema 69: Integración de sistemas. Medios de interconexión. Estándares. Protocolos de acceso a redes de área extensa', 
    'indice': [
      '1. Introducción',
      '2. Integración de sistemas',
      '3. Medios de interconexión',
        '3.1. Repetidor',
        '3.2. Concentrador o hub',
        '3.3. Puente de enlace o bridge',
        '3.4. Conmutador o switch',
          '3.4.1 VLAN',
        '3.5. Enrutador o router', 
        '3.6. Pasarela o gateway',
      '4. Estándares*',
        '4.1. X.25',
        '4.2. IP',
      '5. Protocolos de acceso a redes de área extensa',
      '6. Conclusión',
      '7. Bibliografía'
    ]
  }
]

const template = 
  {
    'nombre': '', 
    'indice': [

    ]
  }

/*
create table jugador(
	id_jugador int AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT null,
    posicion ENUM('Portero', 'Defensa', 'Centrocampista', 'Delantero') not null,
    goles SMALLINT unsigned DEFAULT 0, 
    id_equipo int FOREIGN KEY
);
*/