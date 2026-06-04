const validateEditoras = (req, res, next) =>{
    const {nome, email, telefone}  = req.body;
    const errors = [];

    if(!nome || nome.trim()=== ""){
        errors.push("O campo nome é obrigatorio!")
    }else if(nome.trim().length > 100){
        errors.push("O campo nome deve conter no maximo 100 caracteres!")
    }

    if(!email || email.trim()=== ""){
        errors.push("O campo email é obrigatorio!")
    }else if(email.trim().length > 100){
        errors.push("O campo email deve conter no maximo 100 caracteres!")
    } 

    if(!telefone || telefone.trim()=== ""){
        errors.push("O campo telefone é obrigatorio!")
    }else if(telefone.trim().length > 100){
        errors.push("O campo telefone deve conter no maximo 100 caracteres!")
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    

    next();
}

export default validateEditoras;