import editoraModel from "../models/editoraModel.js";
 
class EditorasController{
    async getAllEditoras(req, res){
        const allEditoras = await editoraModel.showEditoras();
       
        if(allEditoras.length ===  0){
            return res.json({
                message: "Editora não encontrada!"
            });
 
        }
 
        return res.json(allEditoras);
    }
 
    async editoraByName(req, res){
       const {nome} = req.params;
       
       const [findNome] = await editoraModel.getEditorasByname(nome);
 
       if(findNome?.nome === nome){
        return res.json({
            message: "Nome já cadastrado para editora!"
        });
       }
 
       return res.json({nome});
 
    }
 
    async storeEditora(req, res){
        const {nome, email, telefone} = req.body;
 
        if (!nome || !email || !telefone){
            return res.json({
                message: "Todos os campos são obrigatorios!"
            });
        }
 
        const [findNome] = await editoraModel.getEditorasByname(nome);
 
       if(findNome?.nome === nome){
            return res.json({
                message:"Nome já cadastrado para editora"
            });
       }
 
       const createEditoras = await editoraModel.createEditoras(req.body);
 
       if (createEditoras.affectedRows === 0){
        return res.json({
            message: "Não foi possível realizar cadastro!"
        });
 
       }
 
       return res.json({
        message: "Cadastro realizado com sucesso! "
       });
    }
 
    async updateEditorasById(req , res){
        const id = Number(req.params.id);
        const {nome, email, telefone} = req.body;
 
        if(!nome || !email || !telefone){
            return res.json({
                message: "Todos os campos são obrigatorios"
            });
        }
 
        const [findNome] = await editoraModel.getEditorasByname(nome);
 
        if(findNome?.nome === nome){
            return res.json({
                message: "Nome da editora já cadastrado!"
            });
        }
 
        const updateeditora = await editoraModel.updateeditoras(id, req.body);
 
        if(updateeditora.affectedRows === 0){
            return res.json({
                message: "Nao foi possível realizar a atualização!"
            });
        }
 
        return res.json({
            message: "Editora Atualizada com sucesso!"
        });
    }
 
    async removeEditora (req, res){
        const id = Number(req.params.id);
 
        const deleteEditoras = await editoraModel.deleteEditoras(id);
 
        if(deleteEditoras.affectedRows === 0){
            return res.json({
                message: "Não foi possível deletar dados da editora"
            });
        }
 
        return res.json({
            message: "Editora deletada com sucesso!"
        });
    }
}
 
export default new EditorasController()