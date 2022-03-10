<!doctype html>
<html>
    <head>
    <link rel="shortcut icon" href="#" />
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    
    <!-- Bootstrap CSS -->    
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <!-- FontAwesom CSS -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">        
    <!--Sweet Alert 2 -->
    <link rel="stylesheet" href="plugins/sweetalert2/sweetalert2.min.css">        
    <!--CSS custom -->  
    <link rel="stylesheet" href="main.css">  
    </head>
    <body>
    <header>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Parcial-I</title>
        
        <h2 class="text-center text-dark"><span class="badge badge-success">PARCIAL - I</span></h2>
    </header>    
    
     <div id="appClientes">               
        <div class="container">                
            <div class="row">       
                <div class="col">        
                    <button @click="btnAlta" class="btn btn-success" title="Nuevo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-plus-square-fill mb-1" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
                    </svg> <span class="h5 ml-2 mt-4 font-weight-bold btn-success">   CLIENTES</span>
                </div>
                <div class="col text-right">                        
                    <h5>Total de clientes: <span class="badge badge-success">{{totalStock}}</span></h5>
                </div>    
            </div>
            <div class="row">
                <div class="col pt-4">        
                <button @click="btnAltaLecturas" class="btn btn-info" title="Nuevo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-plus-square-fill mb-1" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
                    </svg> <span class="h5 ml-2 mt-4 font-weight-bold btn-info">   LECTURAS</span>
                </div>
            </div>    
            <div class="row">
                <div class="col">
                    <h2 class="text-center mt-4 text-dark"><span class="badge badge-success">Clientes</span></h2>
                </div>
            </div>            
            <div class="row mt-2">
                <div class="col-lg-12">                    
                    <table class="table table-striped">
                        <thead>
                            <tr class="bg-primary text-light">
                                <th>Codigo</th>                                    
                                <th>Nombre</th>
                                <th>Direccion</th>
                                <th>Zona</th>    
                            </tr>    
                        </thead>
                        <tbody>
                            <tr v-for="(clientes,indice) of clientes">                                
                                <td>{{clientes.idCliente}}</td>                                
                                <td>{{clientes.nombre}}</td>
                                <td>{{clientes.direccion}}</td>
                                <td>{{clientes.zona}}</td>
                                <td>
                                <div class="btn-group" role="group">
                                    <button class="btn btn-danger" title="Eliminar" @click="btnBorrar(clientes.idCliente)"><i class="fas fa-trash-alt"></i></button>      
								</div>
                                </td>
                            </tr>    
                        </tbody>
                    </table>                    
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <h2 class="text-center mt-5 text-dark"><span class="badge badge-success">Lecturas</span></h2>
                </div>
            </div>            
            <div class="row mt-2">
                <div class="col-lg-12">                    
                    <table class="table table-striped">
                        <thead>
                            <tr class="bg-primary text-light">
                                <th>Codigo</th>                                    
                                <th>Cliente</th>
                                <th>Fecha</th>
                                <th>Anterior</th>  
                                <th>Actual</th>  
                                <th>Pago</th>    
                            </tr>    
                        </thead>
                        <tbody>
                            <tr v-for="(cliente,indice) of clientes">                                
                                <td>{{cliente.id}}</td>                                
                                <td>{{cliente.marca}}</td>
                                <td>{{cliente.modelo}}</td>
                                <td>
                                    <div class="col-md-8">
                                    <input type="number" v-model.number="cliente.stock" class="form-control text-right" disabled>      
                                    </div>    
                                </td>
                                <td>
                                <div class="btn-group" role="group">
                                    <button class="btn btn-secondary" title="Editar" @click="btnEditar(cliente.id, cliente.marca, cliente.modelo, cliente.stock)"><i class="fas fa-pencil-alt"></i></button>    
                                    <button class="btn btn-danger" title="Eliminar" @click="btnBorrar(cliente.id)"><i class="fas fa-trash-alt"></i></button>      
								</div>
                                </td>
                            </tr>    
                        </tbody>
                    </table>                    
                </div>
            </div>

        </div>        
    </div>        
    <!-- jQuery, Popper.js, Bootstrap JS -->
    <script src="jquery/jquery-3.3.1.min.js"></script>
    <script src="popper/popper.min.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>         
    <!--Vue.JS -->    
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>              
    <!--Axios -->      
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.15.2/axios.js"></script>    
    <!--Sweet Alert 2 -->        
    <script src="plugins/sweetalert2/sweetalert2.all.min.js"></script>      
    <!--Código custom -->          
    <script src="main.js"></script>         
    </body>
</html>