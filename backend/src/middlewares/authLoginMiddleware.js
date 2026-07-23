import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticationToken = (req, res, next)=>{
    const getToken = req.headers.authorization;
    const bearerToken = getToken.split(" ")[1];

    if (!bearerToken) {
        return res.status(401).json({
            error: "Token não fornecido"
        });
    }

    if(!getToken){
        return res.status(401).json({
            error: "Token não fornecido"
        });
    }

    jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET, 
        (error, user) =>{
            if (error) {
                return res.status(403).json({
                    error: "Token invalido!"
                });
            }

            req.user = user;
            next();
        }
    );
};


// export const authenticationToken = (req, res, next) => {
//     // Pega o cabeçalho "authorization" da requisição
//     const authHeader = req.headers['authorization'];

//     // SE NÃO VIER NADA: o 'if' barra a requisição aqui com erro 401 e impede o .split() de quebrar o servidor
//     if (!authHeader) {
//         return res.status(401).json({ error: "Token de autenticação não fornecido." });
//     }

//     // Se passou pelo if, o authHeader existe! Agora o split funciona com segurança
//     const token = authHeader.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ error: "Formato do token inválido (esperado Bearer TOKEN)." });
//     }

//     // ... o resto do seu código que já estava aí (jwt.verify, etc) continua igual aqui embaixo
// };

export const adminRole = (...allowedRoles)=> {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                error: "Úsuario não autenticado"
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                error: "Você não tem permissão para realizar esta acão."
            });
            
        }

        next();
    }
}



