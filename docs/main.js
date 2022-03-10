var url = "bd/crud.php";

var appClientes = new Vue({    
el: "#appClientes",   
data:{     
     clientes:[],          
     id:0,
     nombre:"",
     dir:"",
     zona:"",       
  },    
  methods:{  
      //BOTONES        
      btnAlta:async function(){                    
          const {value: formValues} = await Swal.fire({
          title: 'NUEVO',
          html:
          '<div class="row"><label class="col-sm-3 col-form-label">Codigo</label><div class="col-sm-7"><input id="id" type="number" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Nombre</label><div class="col-sm-7"><input id="nombre" type="text" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Direccion</label><div class="col-sm-7"><input id="dir" type="text" min="0" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Zona</label><div class="col-sm-7"><input id="zona" type="text" min="0" class="form-control"></div></div>',              
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: 'Guardar',          
          confirmButtonColor:'#1cc88a',          
          cancelButtonColor:'#3085d6',  
          preConfirm: () => {            
              return [
                this.id = document.getElementById('id').value,
                this.nombre = document.getElementById('nombre').value,
                this.dir = document.getElementById('dir').value,
                this.zona = document.getElementById('zona').value               
              ]
            }
          })        
          if(this.id == 0 || this.nombre == "" || this.dir == "" || this.zona == ""){
                  Swal.fire({
                    type: 'info',
                    title: 'Datos incompletos',                                    
                  }) 
          }       
          else{          
            this.altaClientes();          
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
              });
              Toast.fire({
                type: 'success',
                title: 'Cliente Agregado!'
              })                
          }
      },     
      
      btnAltaLecturas:async function(){                    
        const {value: formValues} = await Swal.fire({
        title: 'NUEVO',
        html:
        '<div class="row"><label class="col-sm-3 col-form-label">Codigo</label><div class="col-sm-7"><input id="id" type="number" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Nombre</label><div class="col-sm-7"><input id="nombre" type="text" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Direccion</label><div class="col-sm-7"><input id="dir" type="text" min="0" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Zona</label><div class="col-sm-7"><input id="zona" type="text" min="0" class="form-control"></div></div>',                
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Guardar',          
        confirmButtonColor:'#1cc88a',          
        cancelButtonColor:'#3085d6',  
        preConfirm: () => {            
            return [
              this.id = document.getElementById('id').value,
              this.nombre = document.getElementById('nombre').value,
              this.dir = document.getElementById('dir').value,
              this.zona = document.getElementById('zona').value               
            ]
          }
        })        
        if(this.id == 0 || this.nombre == "" || this.dir == "" || this.zona == ""){
                Swal.fire({
                  type: 'info',
                  title: 'Datos incompletos',                                    
                }) 
        }       
        else{          
          this.altaClientes();          
          const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000
            });
            Toast.fire({
              type: 'success',
              title: 'Cliente Agregado!'
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
              this.borrarMovil(id);             
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
      listarClientes:function(){
          axios.post(url, {opcion:4}).then(response =>{
            this.clientes = response.data;       
          });
      },    
      //Procedimiento CREAR.
      altaClientes:function(){
          axios.post(url, {opcion:1, id:this.id, nombre:this.nombre,dir:this.dir,zona:this.zona }).then(response =>{
              this.listarClientes();
          });        
            this.id = 0,
            this.nombre = "",
            this.dir = "",
            this.zona = ""
      },     
      //Procedimiento BORRAR.
      borrarMovil:function(id){
          axios.post(url, {opcion:3, id:id}).then(response =>{           
              this.listarClientes();
              });
      }             
  },      
  created: function(){            
    this.listarClientes();            
  },    
  computed:{
      totaldir(){
          this.total = 0;
          for(clientes of this.clientes){
              this.total = this.total + parseInt(clientes.dir);
          }
          return this.total;   
      }
  }    
});



var appLectura = new Vue({    
  el: "#appLectura",   
  data:{     
       clientes:[],          
       id:0,
       nombre:"",
       dir:"",
       zona:"",       
    },    
    methods:{  
        //BOTONES        
        btnAlta:async function(){                    
            const {value: formValues} = await Swal.fire({
            title: 'NUEVO',
            html:
            '<div class="row"><label class="col-sm-3 col-form-label">Codigo</label><div class="col-sm-7"><input id="id" type="number" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Nombre</label><div class="col-sm-7"><input id="nombre" type="text" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Direccion</label><div class="col-sm-7"><input id="dir" type="text" min="0" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Zona</label><div class="col-sm-7"><input id="zona" type="text" min="0" class="form-control"></div></div>',              
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Guardar',          
            confirmButtonColor:'#1cc88a',          
            cancelButtonColor:'#3085d6',  
            preConfirm: () => {            
                return [
                  this.id = document.getElementById('id').value,
                  this.nombre = document.getElementById('nombre').value,
                  this.dir = document.getElementById('dir').value,
                  this.zona = document.getElementById('zona').value               
                ]
              }
            })        
            if(this.id == 0 || this.nombre == "" || this.dir == "" || this.zona == ""){
                    Swal.fire({
                      type: 'info',
                      title: 'Datos incompletos',                                    
                    }) 
            }       
            else{          
              this.altaClientes();          
              const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000
                });
                Toast.fire({
                  type: 'success',
                  title: 'Cliente Agregado!'
                })                
            }
        },     
        
        btnAltaLecturas:async function(){                    
          const {value: formValues} = await Swal.fire({
          title: 'NUEVO',
          html:
          '<div class="row"><label class="col-sm-3 col-form-label">Codigo</label><div class="col-sm-7"><input id="id" type="number" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Nombre</label><div class="col-sm-7"><input id="nombre" type="text" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Direccion</label><div class="col-sm-7"><input id="dir" type="text" min="0" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Zona</label><div class="col-sm-7"><input id="zona" type="text" min="0" class="form-control"></div></div>',                
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: 'Guardar',          
          confirmButtonColor:'#1cc88a',          
          cancelButtonColor:'#3085d6',  
          preConfirm: () => {            
              return [
                this.id = document.getElementById('id').value,
                this.nombre = document.getElementById('nombre').value,
                this.dir = document.getElementById('dir').value,
                this.zona = document.getElementById('zona').value               
              ]
            }
          })        
          if(this.id == 0 || this.nombre == "" || this.dir == "" || this.zona == ""){
                  Swal.fire({
                    type: 'info',
                    title: 'Datos incompletos',                                    
                  }) 
          }       
          else{          
            this.altaClientes();          
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
              });
              Toast.fire({
                type: 'success',
                title: 'Cliente Agregado!'
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
                this.borrarMovil(id);             
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
        listarClientes:function(){
            axios.post(url, {opcion:4}).then(response =>{
              this.clientes = response.data;       
            });
        },    
        //Procedimiento CREAR.
        altaClientes:function(){
            axios.post(url, {opcion:1, id:this.id, nombre:this.nombre,dir:this.dir,zona:this.zona }).then(response =>{
                this.listarClientes();
            });        
              this.id = 0,
              this.nombre = "",
              this.dir = "",
              this.zona = ""
        },     
        //Procedimiento BORRAR.
        borrarMovil:function(id){
            axios.post(url, {opcion:3, id:id}).then(response =>{           
                this.listarClientes();
                });
        }             
    },      
    created: function(){            
      this.listarClientes();            
    },    
    computed:{
        totaldir(){
            this.total = 0;
            for(clientes of this.clientes){
                this.total = this.total + parseInt(clientes.dir);
            }
            return this.total;   
        }
    }    
  });