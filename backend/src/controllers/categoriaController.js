import categoriaModel from "../models/categoriaModel.js";
 
 class CategoriaController{
    async getAllCategorias (req, res){
        const allCategorias = await categoriaModel.showCategorias();
        if(allCategorias.length === 0 ){
            return(
                res.json({
                    message: "Categoria não encontrada!"
                })
            )
        }
        return res.json(allCategorias);
    }
    async categoriaByname(req, res){
        const {categoria} = req.params;
 
        const [findcategoria] = await categoriaModel.getCategoriasByName(categoria);
 
        if(findcategoria?.categoria === categoria){
            return res.json({
                message: "Nome de categoria já cadastrada para o produto."
            });
        }
 
        return res.json(categoria);
    }
 
    async storeCategoria(req, res){
        const{categoria} = req.body;
 
        // if(!categoria){
        //     return res.json({
        //         message: "Campo obrigatorio!"
        //     });
        // }
 
        const findcategoria = await categoriaModel.getCategoriasByName(categoria);
 
            if(findcategoria.length > 0){
            return res.json({
                message: "Nome de categoria já existe!"
            });
        }
 
        const createCategoria = await categoriaModel.createCategorias(req.body);
 
        if(createCategoria.affectedRows === 0){
            return res.json({
                message: "Não foi possivel realizar cadastro!"
            });
        }
 
        return res.json({
            cadastro: "Cadastro realizado com sucesso"
        });
 
    }
    async updateCategoriaById(req, res){
        const id = Number(req.params.id);
        const {categoria} = req.body;
 
        if(!categoria){
            return res.json({
                message: "O campo é obrigatorio!"
            })
 
        }
 
        const [findcategoria] = await categoriaModel.getCategoriasByName(categoria);
 
        if(findcategoria?.categoria === categoria){
            return res.json({
                message: "Nome de categoria ja cadastrado!"
            });
        }
 
        const updateCategoria = await categoriaModel.updateCategoria(id, req.body);
 
            if(updateCategoria.affectedRows === 0){
                return res.json({
                    message: "Não foi possivel realizar a atualização!"
 
            });
        }
 
        return res.json({
          message: "Categoria atualizada com sucesso!"  
        });
 
       
    }
 
    async removeCategoria(req, res){
        const id = Number(req.params.id);
        const deleteCategoria = await categoriaModel.deleteCategoria(id);
 
        if(deleteCategoria.affectedRows ===0){
            return res.json({
                message: "Não foi possivel deletar a categoria!"
            });
        }
 
        return res.json({
            message: "Categoria deletada com sucesso!"
        });
    }
 
}
 
export default new CategoriaController();