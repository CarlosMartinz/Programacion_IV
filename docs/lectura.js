Vue.component('lectura', {
    data:()=>{
        return {
            lecturas: [],
            clientes: [],
            buscar: '',
            lectura: {
                accion: 'nuevo',
                msg : '',
                idLectura: '',
                idCliente: '',
                meses: 0,
                fecha: '',
                anterior: '',
                actual: '',
                pago: 0,
            }
        }
    },
    methods: {
        buscarLectura(){
            this.obtenerDatos(this.buscar);
        },
        guardarLectura(){
            this.obtenerDatos();
            let lecturas = this.lecturas || [];
            if( this.lectura.accion == 'nuevo' ){
                this.lectura.idLectura = idUnicoFecha();
                lecturas.push(this.lectura);
            }else if( this.lectura.accion == 'modificar' ){
                let index = lecturas.findIndex(lectura=>lectura.idLectura==this.lectura.idLectura);
                lecturas[index] = this.lectura;
            }else if( this.lectura.accion == 'eliminar' ){
                let index = lecturas.findIndex(lectura=>lectura.idLectura==this.lectura.idLectura);
                lecturas.splice(index,1);
            }
            localStorage.setItem('lecturas', JSON.stringify(lecturas));
            this.lectura.msg = 'Lectura procesado';
            this.nuevoLectura();
            this.obtenerDatos();
        },
        modificarLectura(data){
            this.lectura = JSON.parse(JSON.stringify(data));
            this.lectura.accion = 'modificar';
        },
        eliminarLectura(data){
            if( confirm(`¿Esta seguro de eliminar el lectura ${data.nombre}?`) ){
                this.lectura.idLectura = data.idLectura;
                this.lectura.accion = 'eliminar';
                this.guardarLectura();
            }
        },
        obtenerDatos(busqueda=''){
            this.lecturas = [];
            if( localStorage.getItem('lecturas')!=null ){
                for(let i=0; i<JSON.parse(localStorage.getItem('lecturas')).length; i++){
                    let data = JSON.parse(localStorage.getItem('lecturas'))[i];
                    if( this.buscar.length>0 ){
                        if( data.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>-1 ||
                        data.codigo.toLowerCase().indexOf(this.buscar.toLowerCase())>-1 ||
                        data.zona.toLowerCase().indexOf(this.buscar.toLowerCase())>-1){
                            this.lecturas.push(data);
                        }
                    }else{
                        this.lecturas.push(data);
                    }
                }
            }
        },
        obtenerDatosCliente(){
            this.clientes = [];
            if( localStorage.getItem('clientes')!=null ){
                for(let i=0; i<JSON.parse(localStorage.getItem('clientes')).length; i++){
                    let data = JSON.parse(localStorage.getItem('clientes'))[i];
                    this.clientes.push(data);
                }
            }
        },
        calcularPago(){
            if( this.lectura.meses>0 && this.lectura.meses <= 17){
                this.lectura.pago = 6;
            }else if( this.lectura.meses >= 18 && this.lectura.meses <= 29){
                this.lectura.pago = (this.lectura.meses-18)*0.45 + 6;
            }else if( this.lectura.meses >= 30){
                this.lectura.pago = (10) * 0.45 + 6 + (this.lectura.meses-28)*0.65;
            }
        },
        nuevoLectura(){
            this.lectura.accion = 'nuevo';
            this.lectura.idLectura = '';
            this.lectura.idCliente = '';
            this.lectura.meses = 0;
            this.lectura.fecha = '';
            this.lectura.anterior = '';
            this.lectura.actual = '';
            this.lectura.pago = 0;
            this.lectura.msg = '';
        }
    }, 
    created(){
        this.obtenerDatosCliente();
        //this.obtenerDatos();
    },
    template: `
        <div id='appLectura' class="bg-light">
            <form @submit.prevent="guardarLectura" @reset.prevent="nuevoLectura" method="post" id="frmLectura">
                <div class="card mb-3 bg-light">
                    <div class="card-header bg-light text-white bg-dark">
                        Administracion de Lecturas
                        <button type="button" class="btn-close bg-light bg-white" data-bs-dismiss="alert" data-bs-target="#frmLectura" aria-label="Close"></button>
                    </div>
                    <div class="card-bodybg-light">
                        <div class="row p-1 bg-light">
                            <div class="col col-md-1 bg-light">Lectura</div>
                            <div class="col col-md-2 bg-light">
                                <input type="number" placeholder="meses" class="form-control bg-light" min="1" v-model="lectura.meses" @change="calcularPago">
                            </div>
                        </div>
                        <div class="row p-1 bg-light">
                            <div class="col col-md-1 bg-light">Cliente</div>
                            <div class="col col-md-2 bg-light">
                                <select v-model="lectura.idCliente" class="form-control bg-light">
                                    <option value="">Seleccione un cliente</option>
                                    <option v-for="cliente in clientes" :value="cliente.idCliente">{{ cliente.nombre }}</option>
                                </select>
                            </div>
                            <div class="col bg-light col-md-2">
                                <button type="button" class="btn btn-info" @click="obtenerDatosCliente">Actualizar</button>
                            </div>
                        </div>
                        <div class="row p-1 bg-light">
                            <div class="col col-md-1 bg-light">Fecha</div>
                            <div class="col col-md-2 bg-light">
                                <input v-model="lectura.fecha" placeholder="fecha de lectura" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" required title="Fecha de lectura" class="form-control" type="date">
                            </div>
                        </div>
                        <div class="row p-1 bg-light">
                            <div class="col col-md-1 bg-light">Anterior</div>
                            <div class="col col-md-2 bg-light">
                                <input v-model="lectura.anterior" placeholder="lectura anterior" pattern="[0-9]{1,}" required title="Lectura anterior" class="form-control" type="number">
                            </div>
                        </div>
                        <div class="row p-1 bg-light">
                            <div class="col col-md-1 bg-light">Actual</div>
                            <div class="col col-md-2 bg-light">
                                <input v-model="lectura.actual" placeholder="lectura actual" pattern="[0-9]{1,}" required title="Lectura actual" class="form-control" type="number">
                            </div>
                        </div>
                        <div class="row p-1 bg-light">
                            <div class="col col-md-1 bg-light">Pago</div>
                            <div class="col col-md-2 bg-light">
                                <input v-model="lectura.pago" placeholder="pago" pattern="[0-9]{1,}" disabled title="Pago" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row bg-light">
                            <div class="col col-md-3 bg-light text-center">
                                <div class="alert alert-warning alert-dismissible fade show d-none" role="alert">
                                    {{ lectura.msg }}
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>
                        </div>
                        <div class="row bg-light">
                            <div class="col col-md-3 bg-light mt-2 text-center">
                                <button type="submit" class="btn btn-info">Guardar</button>
                                <button type="reset" class="btn btn-warning">Nuevo</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div class="card mb-3 bg-light" id="cardBuscarLectura">
                <div class="card-header text-white bg-dark">
                    Busqueda de Lecturas
                    <button type="button" class="btn-close bg-white" data-bs-dismiss="alert" data-bs-target="#cardBuscarLectura" aria-label="Close"></button>
                </div>
                <div class="card-body bg-light">
                    <table class="table bg-light">
                        <thead class="bg-light">
                            <tr>
                                <td colspan="6"  class="bg-light">
                                    Buscar: <input title="Introduzca el texto a buscar" @keyup="buscarLectura" v-model="buscar" class="form-control" type="text">
                                </td>
                            </tr>
                            <tr class="bg-light">
                                <th>idCliente</th>
                                <th>Lectura</th>
                                <th>Fecha</th>
                                <th>Lectura anterior</th>
                                <th>Lectura actual</th>
                                <th>Pago</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in lecturas" :key="item.id" @click="modificarLectura(item)">
                                <td>{{ item.idCliente }}</td>
                                <td>{{ item.meses }}</td>
                                <td>{{ item.fecha }}</td>
                                <td>{{ item.anterior }}</td>
                                <td>{{ item.actual }}</td>
                                <td>{{ item.pago }}</td>
                                <td>
                                    <button type="button" class="btn btn-danger" @click="eliminarLectura(item)">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div> 
    `
});