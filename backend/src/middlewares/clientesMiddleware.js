const validateCliente = (req, res, next) => {
  const { nome, email, telefone, estado } = req.body;
  const errors = [];

  if (!nome || nome.trim() === "") {
    errors.push("O campo nome é obrigatório.");
  } else if (nome.trim().length < 3 || nome.trim().length > 100) {
    errors.push("O campo nome deve ter no minimo 3 caracteres e no máximo 100 caracteres.");
  }

  if (!email || email.trim() === "") {
    errors.push("O campo email é obrigatório.");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("O email informado não é válido.");
    } else if (email.trim().length > 100) {
      errors.push("O campo email deve ter no máximo 100 caracteres.");
    }
  }

  if(telefone || telefone.trim() === ""){
    errors.push("O campo telefone é obrigatório.");
  }

  if (telefone && telefone.trim().length != 15) {
    errors.push("O campo telefone deve ter no máximo 20 caracteres.");
  }

  if (estado && estado.trim().length !== 2) {
    errors.push("O campo estado deve ter exatamente 2 caracteres (ex: SP, RJ).");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

export default validateCliente;