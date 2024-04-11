const http = require("http");
const {createReadStream, stat} = require("fs");
const {join} = require("path");

/*
// Crear servidor HTTP (escucha en el puerto 4000)
http.createServer((peticion,respuesta) => {
    respuesta.writeHead(418,{ "Content-type" : "text/html"});
    
    // Lee el fichero html de la carpeta
    fs.readFile("./404.html", (error,contenido) => {
        respuesta.write(contenido);
        respuesta.end();
    });
}).listen(4000);
*/


// Funcion para detectar que tipo de extension utiliza el documento que lee el programa 
//y te da la interfaz de visualizacion indicada
function tipo(extension){
    if(extension == "html") return "text/html";
    if(extension == "css") return "text/css";
    if(extension == "js") return "text/javascript";
    if(extension == "json") return "text/json";
    if(extension == "jpg") return "text/jpeg";
    if(extension == "png") return "text/png";
    return "text/plain";
}


// Funcion para leer los archivos
function servirFichero(respuesta,ruta,tipo,status){
    let fichero = createReadStream(ruta);

    respuesta.writeHead(status,{"Content-type" : tipo});

    fichero.pipe(respuesta);

    fichero.on("end", () => respuesta.end());
}


// __dirname te da la ruta completa
const directorioEstatico = join(__dirname,"publica");


// Creacion del servidor
http.createServer((peticion,respuesta) => {

    if(peticion.url == "/"){
        return servirFichero(respuesta,join(directorioEstatico,"index.html"),tipo("html"),200);
    }

    let ruta = join(directorioEstatico,peticion.url);

    stat(ruta, (error, estadisticas) => {
        if(!error && estadisticas.isFile()){
            return servirFichero(respuesta,ruta,tipo(ruta.split(".").pop()),200);
        }

        servirFichero(respuesta,join(__dirname,"404.html"),tipo("html"),404);
    });

}).listen(process.env.PORT || 4000);



