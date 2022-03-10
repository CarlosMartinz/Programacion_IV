var url = "bd/crud.php";

var appLecturas = new Vue({    
el: "#appLecturas",   
data:{     
     lecturas:[],          
     idLectura:0,
     idCliente:0,
     fecha:"",
     anterior:"",
     actual:"",
     pago:""       
  },    
  methods:{  
      //BOTONES        
      btnAltaLecturas:async function(){                    
          const {value: formValues} = await Swal.fire({
          title: 'NUEVO',
          html:
          '<div class="row"><label class="col-sm-3 col-form-label">Codigo de lectura</label><div class="col-sm-7"><input id="idLectura" type="number" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Codigo de cliente</label><div class="col-sm-7"><input id="idCliente" type="number" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Fecha</label><div class="col-sm-7"><input id="fecha" type="text" min="0" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Anterior</label><div class="col-sm-7"><input id="anterior" type="text" min="0" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Actual</label><div class="col-sm-7"><input id="actual" type="text" min="0" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Pago</label><div class="col-sm-7"><input id="pago" type="text" min="0" class="form-control"></div></div>',              
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: 'Guardar',          
          confirmButtonColor:'#1cc88a',          
          cancelButtonColor:'#3085d6',  
          preConfirm: () => {            
              return [
                this.idLectura = document.getElementById('idLectura').value,
                this.idCliente = document.getElementById('idCliente').value,
                this.fecha = document.getElementById('fecha').value,
                this.anterior = document.getElementById('anterior').value,
                this.actual = document.getElementById('actual').value,
                this.pago = document.getElementById('pago').value               
              ]
            }
          })        
          if(this.idLectura == 0 || this.idCliente == 0 || this.fecha == "" || this.anterior == "" || this.actual == "" || this.pago == ""){
                  Swal.fire({
                    type: 'info',
                    title: 'Datos incompletos',                                    
                  }) 
          }       
          else{          
            this.altaLecturas();          
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
              });
              Toast.fire({
                type: 'success',
                title: 'Lectura Agregado!'
              })                
          }
      },       
          
      btnBorrar:function(id){        
          Swal.fire({
            title: '¿Está seguro de borrar el registro: '+id+" ?",         
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor:'#d33',
            cancelButtonColor:'#3085d6',
            confirmButtonText: 'Borrar'
          }).then((result) => {
            if (result.value) {            
              this.borrarLectura(id);             
              //y mostramos un msj sobre la eliminación  
              Swal.fire(
                '¡Eliminado!',
                'El registro ha sido borrado.',
                'success'
              )
            }
          })                
      },       
      
      //PROCEDIMIENTOS para el CRUD     
      listarLectura:function(){
          axios.post(url, {opcion:6}).then(response =>{
            this.lecturas = response.data;       
          });
      },    
      //Procedimiento CREAR.
      altaLecturas:function(){
          axios.post(url, {opcion:5, idLectura:this.idLectura, idCliente:this.idCliente, fecha:this.fecha, anterior:this.anterior, actual:this.actual, pago:this.pago }).then(response =>{
              this.listarLectura();
          });        
            this.idLectura = 0,
            this.idCliente = 0,
            this.fecha = "",
            this.anterior = "",
            this.actual = "",
            this.pago = ""
      },     
      //Procedimiento BORRAR.
      borrarLectura:function(id){
          axios.post(url, {opcion:7, id:id}).then(response =>{           
              this.listarLectura();
              });
      }             
  },      
  created: function(){            
    this.listarLectura();            
  },    
  computed:{
      totaldir(){
          this.total = 0;
          for(lecturas of this.lecturas){
              this.total = this.total + parseInt(lecturas.dir);
          }
          return this.total;   
      }
  }    
});

