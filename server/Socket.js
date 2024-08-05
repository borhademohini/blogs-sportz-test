const socket = require("socket.io").Server;
let io = null;

class Socket{

    #server;

    setServer(server){
        this.#server = server; //storing server details as class property
    }

    createConnection(){
        io = new socket(this.#server,{cors:true}); // setting up socket connection
        

        io.on("connection", (socket) => {

            socket.on("disconnect", (reason) => {
                // any custom code when socket gets disconnected;
             
              });
        });

    }

    getIo(){
        return io;
    }
}

module.exports.socket = new Socket();