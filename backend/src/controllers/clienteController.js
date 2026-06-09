//clientesCobtrollers

import clientesModel from "../models/clienteModel.js";

class ClientesController {
  async getAllClientes(req, res) {
    const allClientes = await clientesModel.showClientes();
    if (allClientes.length === 0) {
      return (
        res.json({
          message: "Usuario nao encontrado",
        })
      );
    }
    return res.json(allClientes);
  }
  async getClientesByEmail(req, res) {
    const { email } = req.params;

    const [findEmail] = await clientesModel.getClientesByEmail(email);

    if (findEmail?.email === email) {
      return res.json({
        message: "E-mail já cadastrado com outro cliente!",
      });
    }
    
      return res.json({email});
  }

  async storeCliente(req, res) {
    const { nome, email, telefone, cidade, estado } = req.body;

    // if (nome === "" || !email || !telefone || !cidade || !estado) {
    //   return res.json({ message: "Todos os campos são obrigatorios" });
    // }



    //try{
    const [findEmail]  = await clientesModel.getClientesByEmail(req.body.email);

    if (findEmail) {
      return res.json({
        message: "E-mail já cadastrado com outro cliente!",
      });
    }

    const createCliente = await clientesModel.createCliente(req.body);

    if (createCliente.affectedRows > 0) {
      return res.json({
        message: " Cadastro realizado com sucesso!",
      });
    }

    return res.json({
      message: "Não foi possível realizar o cadastro! ",
    });

    // // cat (error){
    // //   return res.status(500).json({message: "Erro ao cadastrar cliente"})
    // }
  }

  async updateClienteById(req, res) {

    
    const id = Number(req.params.id); //req.params para pegar os dados da rota
    const { nome, email, telefone, cidade, estado } = req.body;

    if (nome === "" || !email || !telefone || !cidade || !estado) {
      return res.json({ message: "Todos os campos são obrigatorios" });
    }

    const [findEmail] = await clientesModel.getClientesByEmail(req.body.email);

    if (findEmail) {
      return res.status(409).json({
        message: "E-mail já cadastrado!",
      });
    }

    const updateCliente = await clientesModel.updateCliente(id, req.body);

    if (updateCliente.affectedRows > 0) {
      return res.json({
        message: "Cliente atualizado com sucesso!",
      });
    }

    return res.json({
      message: " Não foi possível realizar a atualização!",
    });
  }

  async removeCliente(req, res) {
    const id = Number(req.params.id);

    const deleteCliente = await clientesModel.deleteCliente(id);

    if (deleteCliente.affectedRows === 0) {
      return res.json({
        message: "Não foi possível deletar dados do cliente!",
      });
    }

    return res.json({
      message: "Cliente deletado com sucesso!",
    });
  }
}
export default new ClientesController();
