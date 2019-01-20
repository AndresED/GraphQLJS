import { buildSchema } from 'graphql';
const schema = buildSchema(`
    """ Estructura para nuestro objeto Cliente"""
    type Cliente{
        id:ID
        nombre:String,
        apellido:String,
        empresa:String,
        email:[Email],
        edad:Int,
        tipo:TipoCliente,
        pedidos:[Pedido]
    }
    """ Estructura para nuestro tipo de dato enums para nuestro objeto Cliente"""
    enum TipoCliente{
        Basico,
        Premium
    }
    """ Estructura para nuestro objeto Email"""
    type Email{
        email:String
    }
    """ Estructura para nuestro objeto Pedido"""
    type Pedido{
        id:ID,
        producto:String,
        precio:Int
    }
    """ función permite obtener la lista de clientes"""
    type Query{
        getCliente(id:ID):Cliente
    }
    """ Input que estructura los valores permitidos para el registro de un pedido"""
    input PedidoInput{
        producto:String,
        precio:Int
    }
    """ Input que estructura los valores permitidos para el registro de un Email"""
    input EmailInput{
        email:String,
    }
    """ Input que estructura los valores permitidos para el registro de un cliente"""
    input ClienteInput{
        nombre:String!
        apellido:String!
        empresa:String!
        email:[EmailInput]
        edad:Int!
        tipo:TipoCliente!
        pedidos:[PedidoInput]
    }
    """ Mutation para el registro de un cliente """
    type Mutation{
        # nombre de la funcion , parametros valor de retorno
        # En este caso el nombre de la funcion es crearCliente
        # los parametros son input del tipo ClienteInput
        # el valore de retorno es un objeto del tipo cliente
        """ Funcion que nos permite crear un nuevo cliente """
        crearCliente(input:ClienteInput):Cliente
    }
`);
export default schema;