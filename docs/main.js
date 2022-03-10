var idUnicoFecha = ()=>{
    let fecha = new Date();
    return Math.floor(fecha.getTime()/1000).toString(16);
}, db;
var app = new Vue({
    el: '#appSistema',
    data: {
       forms:{
           'cliente':{ mostrar: false },
           'categoria':{ mostrar: false },
           'producto':{ mostrar: false },
           'proveedor':{ mostrar: false },
       }
    },
    methods: {
        abrirBd(){
            /**
             * Mecanismo de almacenamiento local:
             * 1. WebSQL
             * 2. localStorage
             * 3. IndexedDB
             */
            let indexDb = indexedDB.open('db_sistema',1);
            indexDb.onupgradeneeded = (e)=>{
                let db = e.target.result,
                tblclientes = db.createObjectStore('clientes',{ keyPath: 'idCliente' }),
                tblcategorias = db.createObjectStore('categorias',{ keyPath: 'idCategoria' }),
                tblproductos = db.createObjectStore('productos',{ keyPath: 'idProducto' }),
                tblproveedores = db.createObjectStore('proveedores',{ keyPath: 'idProveedor' });

                tblproductos.createIndex('idProducto','idProducto',{ unique: true });
                tblproductos.createIndex('codigo','codigo',{ unique: false });
                tblproductos.createIndex('id','id',{ unique: false });

                tblcategorias.createIndex('idCategroia','idCategoria', { unique: true });
                tblcategorias.createIndex('codigo','codigo', { unique: false });

                tblclientes.createIndex('idCliente','idCliente', { unique: true });
                tblclientes.createIndex('codigo', 'codigo',{unique:false});

                tblproveedores.createIndex('idProdveedor','idProveedor', { unique: true });
                tblproveedores.createIndex('codigo','codigo', { unique: false });  
            };
            indexDb.onsuccess = (e)=>{
                db = e.target.result;
            };
            indexDb.onerror = (e)=>{
                console.log(e.target.error);
            };
        }
    },
    created(){
       this.abrirBd();
    }
});
document.addEventListener('DOMContentLoaded', event=>{
    let $element = document.querySelectorAll('.mostrar').forEach( (element,index)=>{
        element.addEventListener('click', e=>{
            app.forms[e.target.dataset.form].mostrar = true;
            app.$refs[e.target.dataset.form].obtenerDatos();
        });
    });
});

function abrirStore(store, modo){
    let tx = db.transaction(store, modo);
    return tx.objectStore(store);
}