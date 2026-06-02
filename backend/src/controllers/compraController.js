import comprasModal from "../models/compraModel.js";
 
class CompraController{
    async getAllcompras(req, res){
        const allCompras = await comprasModal.showcompras();
        if(allCompras.length === 0){
            return res.json({
                message: "Compra não encontrada!"
            });
        }
 
        return res.json(allCompras)
    }
 
    async compraById(req, res){
        const {id} = req.params;
 
        const [findId] = await comprasModal.getComprasById(id);
 
        if(findId?.id_compra === id){
            return res.json({
                message: "Id ja cadastrado para compra"
            });
        }
 
        return res.json({id});
    }
 
    async storeCompra(req, res){
        const{quantidade, valor, desconto} = req.body;
 
        if(!quantidade || !valor || !desconto){
            return res.json({
                message: "Todos os compos são obrigatorios!"
            });
        }
 
       
        const createCompra = await comprasModal.createCompra(req.body);
 
        if(createCompra.affectedRows === 0){
            return res.json({
                message: "Não foi possivel realizar cadastro!"
            });
        }
 
        return res.json({
            message: "Cadastro realizado com sucesso!"
        })
    }
 
    async updateComprasById(req, res){
        const id = Number(req.params.id);
        const {quantidade, valor, desconto} = req.body;
 
        if(!quantidade || !valor || !desconto){
            return res.json({
                message: "Todos os campos são obrigatorios!"
            });
        }
 
        const [findId] = await comprasModal.getComprasById(id);
 
        if(!findId){
        return res.json({
        message: "Compra não encontrada!"
        });
        }
 
       
 
        const updateCompra = await comprasModal.updateCompras(id, req.body);
 
        if(updateCompra.affectedRows === 0 ){
            return res.json({
                message: "Não foi possivel realizar atualização!"
            });
        }
 
        return res.json({
            message: "Compra atualizada com sucesso!"
        });
 
    }
 
    async removeCompra(req, res){
        const id = Number(req.params.id);
 
        const deleteCompra = await comprasModal.deleteCompra(id);
 
        if(deleteCompra.affectedRows === 0){
            return res.json({
                message: "Nao foi possivel deletar a compra!"
            });
        }
        return res.json({
            message: "Compra deletada com sucesso!"
        });
    }
}
 
export default new CompraController();