import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const clientesSchema = Schema({
    nombre: String,
    apellido: String,
    empresa: String,
    email: Array,
    tipo: String,
    edad: Number,
    pedidos: Array
})


const usuariosSchema = Schema({
    usuario: String,
    password: String
});
const Usuarios = mongoose.model("usuarios", usuariosSchema);
const Clientes = mongoose.model("clientes", clientesSchema);
export { Clientes, Usuarios };