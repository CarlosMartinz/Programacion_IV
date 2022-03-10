var idUnicoFecha = ()=>{
    let fecha = new Date();
    return Math.floor(fecha.getTime()/1000).toString(16);
}, db;
var app = new Vue({
    el: '#appSistema',
    data: {
       forms:{
           'cliente':{ mostrar: false },
           'lectura':{ mostrar: false },
       }
    },
    methods: {
    },
    created(){
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