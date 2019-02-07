import { Clientes, Usuarios } from './db';
import bcrypt from 'bcrypt-nodejs';
import jwt from '../services/jwt';
export const resolvers = {
    Query: {
        getCliente: (root, { id }) => {
            return new Promise((resolve, reject) => {
                Clientes.findById(id, (error, cliente) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(cliente)
                    }
                })
            })
        },
        getClientes: (root, { limit }) => {
            return Clientes.find().limit(limit)
        }
    },
    Mutation: {
        crearCliente: (root, { input }) => {
            const nuevoCliente = new Clientes({
                nombre: input.nombre,
                apellido: input.apellido,
                empresa: input.empresa,
                email: input.email,
                tipo: input.tipo,
                edad: input.edad,
                pedidos: input.pedidos,
            });
            nuevoCliente.id = nuevoCliente._id;
            return new Promise((resolve, reject) => {
                nuevoCliente.save((error) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(nuevoCliente)
                    }
                })
            })
        },
        actualizarCliente: (root, { input }) => {
            return new Promise((resolve, reject) => {
                Clientes.findOneAndUpdate({ _id: input.id },
                    input, { new: true }, (error, cliente) => {
                        if (error) {
                            reject(error)
                        } else {
                            resolve(cliente)
                        }
                    })
            })
        },
        eliminarCliente: (root, { id }) => {
            return new Promise((resolve, reject) => {
                Clientes.findOneAndRemove({ _id: id },
                    error => {
                        if (error) {
                            reject(error)
                        } else {
                            resolve("sucess")
                        }

                    }
                )
            })
        },
        crearUsuario: async(root, { usuario, password }) => {

            //VERIFICAR SI UN USUARIO CONTIENE ESTE PASSWORD
            const existeUsuario = await Usuarios.findOne({ usuario: usuario });
            if (existeUsuario) {
                throw new Error("El usuario ya existe")
            }
            const nuevoUsuario = await new Usuarios({
                "usuario": usuario,
                "password": bcrypt.hashSync(password),
            }).save();

            console.log(nuevoUsuario);
            return "Creado correctamente";
        },
        login: async(root, { usuario, password }, context, info) => {
            console.log(context);
            return new Promise(
                async(resolve, reject) => {
                    const existeUsuario = await Usuarios.findOne({ usuario: usuario });
                    if (!existeUsuario) {
                        reject("No tenemos a un usuario registrado con las credenciales ingresadas")
                    }
                    try {
                        bcrypt.compare(password, existeUsuario.password, async(err, check) => {
                            //SI TODO ES CORRECTO
                            if (check) {
                                //GENERO EL TOKEN
                                var tokenAuth = await jwt.createToken(existeUsuario)
                                resolve({
                                    token: tokenAuth
                                })

                            } else {
                                //CONTRASEÑA INCORRECTA
                                reject("La contraseña ingresada es incorrecta.");
                            }
                        })
                    } catch (error) {
                        console.log(error)
                    }
                }
            );
        }
    }
}