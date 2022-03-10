<?php
include('../../private/db/config.php');

extract($_REQUEST);

$class_cliente = new cliente($conexion);
$cliente = isset($cliente) ? $cliente : '[]';
print_r($class_cliente->$accion($cliente));
class cliente{
    private $datos=[], $db;

    public $respuesta = ['msg'=>'correcto'];
    public function cliente($db=''){
        $this->db = $db;
    }
    public function recibir_datos($cliente=''){
        $this->datos = json_decode($cliente, true);
    }
    private function validar_datos(){
        if(empty(trim($this->datos['codigo'])) ){
            $this->respuesta['msg'] = 'Por favor ingrese el codigo';
        }
        if(empty(trim($this->datos['nombre'])) ){
            $this->respuesta['msg'] = 'Por favor ingrese el nombre';
        }
        return $this->almacenar_datos();
    }
    private function almacenar_datos(){
        if( $this->respuesta['msg']=='correcto' ){
            if( $this->datos['accion']=='nuevo' ){
                $this->db->consultas('INSERT INTO lectura_agua.lecturas(nombre, direccion, zona) 
                    VALUES(?, ?, ?)', 
                    [$this->datos['nombre'], $this->datos['direccion'], $this->datos['zona']]);
                    return $this->db->obtener_ultimo_id();
            }else if( $this->datos['accion']=='modificar' ){
                $this->db->consultas('UPDATE lectura_agua.lecturas SET nombre=?, direccion=?, zona=? 
                    WHERE idCliente=?', 
                    [$this->datos['nombre'], $this->datos['direccion'], $this->datos['zona'], $this->datos['idCliente']]);
                    return $this->db->obtener_respuesta();
            }else if( $this->datos['accion']=='eliminar' ){
                $this->db->consultas('DELETE FROM lectura_agua.lecturas WHERE idCliente=?', 
                    [$this->datos['idCliente']]);
                    return $this->db->obtener_respuesta();
            }
        }else{
            return $this->respuesta['msg'];
        }
    }
}

?>