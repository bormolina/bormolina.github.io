if test $# -ne 2; then
  echo "El número de comando es incorrecto, deben de ser dos"
  exit -1
fi

cadena=$1
fichero=$2

#comprobamos que el fichero existe y que tenemos permisos de lectura
if test -f $fichero -a -r $fichero; then
  grep -c "$cadena" $fichero
fi