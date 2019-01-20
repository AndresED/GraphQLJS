import { Clientes } from './db';
export const resolvers = {
    Query: {
        getCliente: ({ id }) => {
            return new Cliente(id, clientesDB[id]);
        },
        getClientes: () => {
            return Clientes.find()
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

    }
}