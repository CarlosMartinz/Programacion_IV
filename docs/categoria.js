Vue.component('categoria', {
    data:()=>{
        return {
            categorias: [],
            buscar: '',
            categoria: {
                accion: 'nuevo',
                msg : '',
                idCategoria: '',
                codigo: '',
                nombre: ''
            }
        }
    },
    methods: {
        buscarCategoria(){
            this.obtenerDatos(this.buscar);
        },
        guardarCategoria(){
            let store = abrirStore('categorias','readwrite');
            if(this.categoria.accion == 'nuevo'){
                this.categoria.idCategoria = idUnicoFecha();
            }
            let query = store.put(this.categoria);
            query.onsuccess=e=>{
                this.categoria.msg = 'Categoria procesado con exito';
                this.nuevoCategoria();
                this.obtenerDatos();
            };
            query.onerror=e=>{
                this.categoria.msg = `Error al procesar la categoria ${e.target.error}`;
            };
        },
        modificarCategoria(data){
            this.categoria = JSON.parse(JSON.stringify(data));
            this.categoria.accion = 'modificar';
        },
        eliminarCategoria(data){
            if( confirm(`¿Esta seguro de eliminar el categoria ${data.nombre}?`) ){
                let store = abrirStore('categorias','readwrite'),
                    query = store.delete(data.idCategoria);
                query.onsuccess=e=>{
                    this.categoria.msg = 'Categoria eliminado con exito';
                    this.nuevoCategoria();
                    this.obtenerDatos();
                };
                query.onerror=e=>{
                    this.categoria.msg = `Error al procesar la categoria ${e.target.error}`;
                };
            }
        },
        obtenerDatos(busqueda=''){
            let store = abrirStore('categorias', 'readonly'),
                data = store.getAll();
            data.onsuccess = resp=>{
                this.categorias = data.result.filter(categoria=>categoria.nombre.toLowerCase().indexOf(busqueda.toLowerCase())>-1);
            };
            data.onerror = e=>{
                this.categoria.msg = `Error al obtener los datos ${e.target.error}`;
            };
        },
        nuevoCategoria(){
            this.categoria.accion = 'nuevo';
            this.categoria.idCategoria = '';
            this.categoria.codigo = '';
            this.categoria.nombre = '';
            this.categoria.msg = '';
            console.log(this.categoria);
        }
    }, 
    created(){
        
    },
    template: `
        <div id='appCategoria'>
            <form @submit.prevent="guardarCategoria" @reset.prevent="nuevoCategoria" method="post" id="frmCategoria">
                <div class="card mb-3">
                    <div class="card-header text-white bg-dark">
                        Administracion de lecturas

                        <button type="button" class="btn-close bg-white" data-bs-dismiss="alert" data-bs-target="#frmCategoria" aria-label="Close"></button>
                    </div>
                    <div class="card-body">
                        <div class="row p-1">
                            <div class="col col-md-1">Cliente</div>
                            <div class="col col-md-2">
                                <select v-model="categoria.codigo" title="Codigo de categoria" class="form-control" type="text" placeholder="codigo">
                                    <option v-for="docente in docentes" :value="docente">{{categoria.codigo}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-1">Anterior</div>
                            <div class="col col-md-2">
                                <input v-model="categoria.nombre" placeholder="escribe tu nombre" pattern="[A-Za-zÑñáéíóú ]{3,75}" required title="Nombre de categoria" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-1">Actual</div>
                            <div class="col col-md-2">
                                <input v-model="categoria.nombre" placeholder="escribe tu nombre" pattern="[A-Za-zÑñáéíóú ]{3,75}" required title="Nombre de categoria" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-1">Pago</div>
                            <div class="col col-md-2">
                                <input v-model="categoria.nombre" placeholder="escribe tu nombre" pattern="[A-Za-zÑñáéíóú ]{3,75}" required title="Nombre de categoria" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-md-3 text-center">
                                <div class="alert alert-warning alert-dismissible fade show d-none" role="alert">
                                    {{ categoria.msg }}
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-md-3 text-center">
                                <button type="submit" class="btn btn-primary">Guardar</button>
                                <button type="reset" class="btn btn-warning">Nuevo</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div class="card mb-3" id="cardBuscarCategoria">
                <div class="card-header text-white bg-dark">
                    Busqueda de lecturas

                    <button type="button" class="btn-close bg-white" data-bs-dismiss="alert" data-bs-target="#cardBuscarCategoria" aria-label="Close"></button>
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <td colspan="6">
                                    Buscar: <input title="Introduzca el texto a buscar" @keyup="buscarCategoria" v-model="buscar" class="form-control" type="text">
                                </td>
                            </tr>
                            <tr>
                                <th>Codigo</th>
                                <th>Nombre</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in categorias" :key="item.idCategoria" @click="modificarCategoria(item)">
                                <td>{{item.codigo}}</td>
                                <td>{{item.nombre}}</td>
                                <td>
                                    <button type="button" class="btn btn-danger" @click="eliminarCategoria(item)">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div> 
    `
});