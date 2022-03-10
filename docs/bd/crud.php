<?php
include_once 'conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$_POST = json_decode(file_get_contents("php://input"), true);
$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$id = (isset($_POST['id'])) ? $_POST['id'] : '';
$nombre = (isset($_POST['nombre'])) ? $_POST['nombre'] : '';
$dir = (isset($_POST['dir'])) ? $_POST['dir'] : '';
$zona = (isset($_POST['zona'])) ? $_POST['zona'] : '';

$idLectura = (isset($_POST['idLectura'])) ? $_POST['idLectura'] : '';
$idCliente = (isset($_POST['idCliente'])) ? $_POST['idCliente'] : '';
$fecha = (isset($_POST['fecha'])) ? $_POST['fecha'] : '';
$anterior = (isset($_POST['anterior'])) ? $_POST['anterior'] : '';
$actual = (isset($_POST['actual'])) ? $_POST['actual'] : '';
$pago = (isset($_POST['pago'])) ? $_POST['pago'] : '';

switch($opcion){
    case 1:
        $consulta = "INSERT INTO clientes (idCliente, nombre, direccion, zona) VALUES('$id', '$nombre', '$dir', '$zona') ";	
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                
        break;
    case 2:
        $consulta = "UPDATE clientes SET idCliente='$id', nombre='$nombre', dir='$dir', zona='$zona' WHERE id='$id' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;        
    case 3:
        $consulta = "DELETE FROM clientes WHERE idCliente='$id' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                           
        break;         
    case 4:
        $consulta = "SELECT idCliente, nombre, direccion, zona FROM clientes";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 5:
        $consulta = "INSERT INTO lecturas (	idLectura, idCliente, fecha, anterior, actual, pago) VALUES('$idLectura', '$idCliente', '$fecha', '$anterior', '$actual', '$pago') ";	
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                
        break;
    case 6:
        $consulta = "SELECT idLectura, clientes.nombre, fecha, anterior, actual, pago FROM lecturas,clientes";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 7:
        $consulta = "DELETE FROM clientes WHERE idCliente='$idCliente' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                           
        break; 
}
print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion = NULL;