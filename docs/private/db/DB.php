<?php
class DB{
    private $conexion, $result;

    public function DB($server, $user, $pass){
        $this->conexion = new PDO($sever, $user, $pass, array(PDO::ATTR_EMULATE_PREPARES => false, 
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)) or die("Error en la conexion");
    }
    public function consultas($sql=''){
        try{
            $parametros = func_get_args();//obtener la lista de parametros o argumentos
            array_shift($parametros);//eliminar el primer elemento del array, que es el sql
            $this->preparado = $this->conexion->prepare($sql);
            $this->result = $this->preparado->execute($parametros);//ejecutar la consulta SQL
       }catch(PDOException $e){
           echo "Error: ".$e->getMessage();
       }
    }
    public function obtener_datos(){
        return $this->preparado->fetchAll(PDO::FETCH_ASSOC);//devuelve un array asociativo
    }
    public function obtener_respuesta(){
        return $this->result;//devuelve un booleano, True si se ejecuto correctamente, False si no
    }
    public function obtener_ultimo_id(){
        return $this->conexion->lastInsertId();//devuelve el ultimo id insertado
    }

}
?>