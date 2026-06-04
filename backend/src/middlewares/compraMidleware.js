const validateCompras = (req, res, next) => {
    const {qtde, valor, desconto, id_livro, id_cliente} = req.body;
    const errors = [];

    if(!qtde || qtde.trim() ===""){
        errors.push("O campo quantidade é obrigatorio!")
    }else if(qtde.trim().length > 100){
        errors.push("O campo quantidade deve ter no maximo 100 caracteres.")
    }

    if(!valor || valor.trim() === ""){
        errors.push("O campo valor é obrigatorio!")
    }else if(valor.trim().length > 1000000){
        errors.push("O campo valor pode ter o maximo 1000000 caracteres")
    }

    if(!desconto || desconto.trim() === ""){
        errors.push("O campo desconto é obrigatorio!")
    }else if(desconto.trim().length > 1000000){
        errors.push("O campo desconto pode ter o maximo 1000000 caracteres")
    }

    if(!id_livro || id_livro.trim() === ""){
        errors.push("O campo valor é obrigatorio!")
    }else if(id_livro.trim().length > 1000000){
        errors.push("O campo id_livro pode ter o maximo 1000000 caracteres")
    }

    if(!id_cliente || id_cliente.trim() === ""){
        errors.push("O campo valor é obrigatorio!")
    }else if(id_cliente.trim().length > 1000000){
        errors.push("O campo id_cliente pode ter o maximo 1000000 caracteres")
    }

    if (errors.length > 0 ){
        return res.status(400).json({errors});
    }

    next();

}

export default validateCompras;