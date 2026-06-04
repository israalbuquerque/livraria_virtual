import livrosModel from "../models/livroModel.js";
 
class LivrosController{
    async getAlllivros (req, res){
        const allLivros = await livrosModel.showLivros();
        if (allLivros.length == 0){
            return res.json({
                message:"Livro não encontrado!"
            });
        }
 
        return res.json(allLivros);
    }
 
    async livrosBytitle(req, res){
        const {titulo} = req.params;
 
        const[findTitulo] = await livrosModel.getlivrosBytitle(titulo);
       
        if(findTitulo?.titulo == titulo){
            return res.json({
                message: "Titulo já cadastrado para outro livro!"
            });
 
        }
 
        return res.json({titulo});
    }
 
    async storeLivros(req, res){
        const {titulo, autor, ano_publicacao, preco} = req.body;
 
        // if(!titulo || !autor || !ano_publicacao || !preco){
        //     return res.json({
        //         message:"Todos os campos são obrigatorios"
        //     });
        // }
 
        const [findTitulo] = await livrosModel.getlivrosBytitle(titulo);
 
        if(findTitulo?.titulo === titulo){
            return res.json({
                message: "Titulo já cadastrado para um livro!"
            });
 
        }
 
        const createLivro = await livrosModel.createLivro(req.body);
 
        if(createLivro.affectedRows === 0){
            return res.json({
                message: "Não foi possível realizar cadastro!"
            });
        }
 
        return res.json({
            message:"Cadadastro realizado com sucesso!"
        });
    }
 
    async updateLivrosById(req, res){
        const id = Number(req.params.id);
        const {titulo, autor, ano_publicacao, preco} = req.body;
 
        if(!titulo || !autor || !ano_publicacao || !preco){
            return res.json({
                message: "Todos os campos são obrigatorios"
            });
        }
 
        const [findTitulo] = await livrosModel.getlivrosBytitle(titulo);
        if(findTitulo?.titulo === titulo){
            return res.json({
                message: "Titulo já cadastrado"
            });
        }
 
        const updateLivros = await livrosModel.updateLivro(id, req.body);
 
        if(updateLivros.affectedRows === 0){
            return res.json({
                message: "Não foi possivel realizar a atualização!"
            });
        }
 
        return res.json({
            message: "Livro cadastrado com sucesso!"
        });
    }
 
    async removeLivro(req, res){
        const id = Number(req.params.id);
 
        const deleteLivro = await livrosModel.deleteLivro(id);
 
        if(deleteLivro.affectedRows === 0){
            return res.json({
                message: "Não foi possivel deletar os dados do livro!"
            });
 
        }
 
        return res.json({
            message: "livro deletado com sucesso!"
        });
    }
}
 
export default new LivrosController();