const validateLivro = (req, res, next) => {
    const {titulo, autor, ano_publicacao, preco, id_editora, id_categoria}  = req.body;
    const errors = [];

    if (!titulo || titulo.trim() === ""){
        errors.push("O campo titulo e obrigatorio!");
    }else if(titulo.trim().length > 20){
        errors.push("O campo titulo deve ter no maximo 20 caracteres")
    }

    if (!autor || autor.trim() === ""){
        errors.push("O campo titulo e obrigatorio!");
    }else if(autor.trim().length > 20){
        errors.push("O campo autor deve ter no maximo 20 caracteres")
    }

    if (ano_publicacao !== undefined && ano_publicacao !== ""){
        const ano = Number(ano_publicacao);
        const anoAtual = new Date().getFullYear();
    if(!Number.isInteger(ano) || ano < 100 || ano > anoAtual){
        errors.push(`O campo ano_publicacao deve ser um ano válido entre 1000 e ${anoAtual}`)
    }
}

    // if (!preco || preco.trim() === ""){
    //     errors.push("O campo titulo e obrigatorio!");
    // }else if(preco.trim().length > 20){
    //     errors.push("O campo titulo deve ter no maximo 20 caracteres")
    // }

    // if (!id_editora || id_editora.trim() === ""){
    //     errors.push("O campo titulo e obrigatorio!");
    // }else if(id_editora.trim().length > 20){
    //     errors.push("O campo titulo deve ter no maximo 20 caracteres")
    // }

    // if (!id_categoria || id_categoria.trim() === ""){
    //     errors.push("O campo titulo e obrigatorio!");
    // }else if(id_categoria.trim().length > 20){
    //     errors.push("O campo titulo deve ter no maximo 20 caracteres")
    // }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

    next();

}

export default validateLivro;

