<?php
//importar la conexion a la BD
include('../../private/db/db.php');

//Estraccion de datos desde el front-end
extract($_REQUEST);


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
    }
}

?>