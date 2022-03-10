Vue.component('cliente', {
    data:()=>{
        return {
            clientes: [],
            buscar: '',
            cliente: {
                accion: 'nuevo',
                msg : '',
                idCliente: '',
                nombre: '',
                direccion: '',
                zona: ''
            }
        }
    },
    methods: {
        buscarCliente(){
            this.obtenerDatos(this.buscar);
        },
        guardarCliente(){
            this.obtenerDatos();
            let clientes = this.clientes || [];
            if( this.cliente.accion == 'nuevo' ){
                this.cliente.idCliente = idUnicoFecha();
                clientes.push(this.cliente);
                // Guardar en mySQL tambien
                fetch(`modules/cliente/cliente.php?cliente=${JSON.stringify(this.cliente)}&accion=nuevo`,
                    {credentials: 'same-origin'})
                    .then(response=>response.json())
                    .then(data=>{
                        console.log(data);
                    })
                    .catch(error=>{
                        console.log(error);
                    });

            }else if( this.cliente.accion == 'modificar' ){
                let index = clientes.findIndex(cliente=>cliente.idCliente==this.cliente.idCliente);
                clientes[index] = this.cliente;
            }else if( this.cliente.accion == 'eliminar' ){
                let index = clientes.findIndex(cliente=>cliente.idCliente==this.cliente.idCliente);
                clientes.splice(index,1);
            }
            localStorage.setItem('clientes', JSON.stringify(clientes));
            this.cliente.msg = 'Cliente procesado';
            this.nuevoCliente();
            this.obtenerDatos();
        },
        modificarCliente(data){
            this.cliente = JSON.parse(JSON.stringify(data));
            this.cliente.accion = 'modificar';
        },
        eliminarCliente(data){
            if( confirm(`¿Esta seguro de eliminar el cliente ${data.nombre}?`) ){
                this.cliente.idCliente = data.idCliente;
                this.cliente.accion = 'eliminar';
                this.guardarCliente();
            }
        },
        obtenerDatos(busqueda=''){
            this.clientes = [];
            if( localStorage.getItem('clientes')!=null ){
                for(let i=0; i<JSON.parse(localStorage.getItem('clientes')).length; i++){
                    let data = JSON.parse(localStorage.getItem('clientes'))[i];
                    if( this.buscar.length>0 ){
                        if( data.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>-1 ||
                        data.codigo.toLowerCase().indexOf(this.buscar.toLowerCase())>-1 ||
                        data.zona.toLowerCase().indexOf(this.buscar.toLowerCase())>-1){
                            this.clientes.push(data);
                        }
                    }else{
                        this.clientes.push(data);
                    }
                }
            }
        },
        nuevoCliente(){
            this.cliente.accion = 'nuevo';
            this.cliente.idCliente = '';
            this.cliente.nombre = '';
            this.cliente.direccion = '';
            this.cliente.zona = '';
            this.cliente.msg = '';
        }
    }, 
    created(){
        //this.obtenerDatos();
    },
    template: `
        <div id='appCliente'>
            <form @submit.prevent="guardarCliente" @reset.prevent="nuevoCliente" method="post" class="bg-light" id="frmCliente">
                <div class="card mb-3 bg-light">
                    <div class="card-header text-white bg-dark">
                        Administracion de Clientes
                        <button type="button" class="btn-close bg-white" data-bs-dismiss="alert" data-bs-target="#frmCliente" aria-label="Close"></button>
                    </div>
                    <div class="card-body bg-light">
                        <div class="row p-1 bg-light">
                            <div class="col col-md-1 bg-light">Nombre</div>
                            <div class="col col-md-2 bg-light">
                                <input v-model="cliente.nombre" placeholder="escribe tu nombre" pattern="[A-Za-zÑñáéíóú ]{3,75}" required title="Nombre de cliente" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row p-1 bg-light">
                            <div class="col col-md-1 bg-light">Direccion</div>
                            <div class="col col-md-2 bg-light">
                                <input v-model="cliente.direccion" placeholder="donde vives" pattern="[A-Za-z0-9Ññáéíóú ]{3,100}" required title="Direccion de cliente" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row p-1 bg-light">
                            <div class="col col-md-1 bg-light">Zona</div>
                            <div class="col col-md-2 bg-light">
                                <input v-model="cliente.zona" placeholder="zona de entrega" pattern="[A-Za-z0-9Ññáéíóú ]{3,100}" required title="Zona de entrega" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row bg-light">
                            <div class="col col-md-3 text-center bg-light">
                                <div class="alert alert-warning bg-light alert-dismissible fade show d-none" role="alert">
                                    {{ cliente.msg }}
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>
                        </div>
                        <div class="row bg-light">
                            <div class="col col-md-3 mt-2 bg-light text-center">
                                <button type="submit" class="btn btn-info">Guardar</button>
                                <button type="reset" class="btn btn-warning">Nuevo</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div class="card bg-light mb-3" id="cardBuscarCliente">
                <div class="card-header bg-light text-white bg-dark">
                    Busqueda de Clientes
                    <button type="button" class="btn-close bg-white" data-bs-dismiss="alert" data-bs-target="#cardBuscarCliente" aria-label="Close"></button>
                </div>
                <div class="card-body bg-light">
                    <table class="table bg-light">
                        <thead class="bg-light">
                            <tr class="bg-light">
                                <td colspan="6" class="bg-light">
                                    Buscar: <input title="Introduzca el texto a buscar" @keyup="buscarCliente" v-model="buscar" class="form-control" type="text">
                                </td>
                            </tr>
                            <tr class="bg-light">
                                <th>Nombre</th>
                                <th>Direccion</th>
                                <th>Zona</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in clientes" :key="item.id" @click="modificarCliente(item)">
                                <td>{{ item.nombre }}</td>
                                <td>{{ item.direccion }}</td>
                                <td>{{ item.zona }}</td>
                                <td>
                                    <button type="button" class="btn btn-danger" @click="eliminarCliente(item)">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div> 
    `
});