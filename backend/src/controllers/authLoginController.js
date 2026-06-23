import bcrypt from "bcrypt";
import generateTokens from "../utils/generateTokens.js";
import tokenModel from "../models/tokenModel.js";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();


class AuthLoginController{
    async login(req, res){
        const {user_email, user_password} = req.body;

        const [emailExists] = await userModel.selectUserByEmail(user_email);

        if (!emailExists) {
            return res.status(400).json({
                error: "Email ou senha são invalidos!"
            });
        }

        const validdatePassword = await bcrypt.compare(user_password, emailExists.user_password)
    
        if (!validdatePassword) {
            return res.status(400).json({
                error: "Senha  invalidos!"
            });
        }

        const acccessToken = generateTokens.generateAccessToken(emailExists);
        const refreshToken = generateTokens.generateRefreshtoken(emailExists);

        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)//+7 dias

        const savedToken = await tokenModel.createToken({
            user_id: emailExists.user_id,
            token : refreshToken,
            expires_at: expiresAt
        });

        if (savedToken.affectedRows === 0) {
            return res.status(500).json({
                error: "Erro ao criar token!"
            });
        }
        res.cookie("refreshToken", refreshToken, {
            httpOnly : true,//
            secure: false,//quando true so envia se for HTTPS
            sameSite: "strict",//pelo proprio site
            maxAge: 604800000,//tempo de vida do token
        });

        return res.json({
            success: "Login realizado com sucesso!", 
            acccessToken,
        });
    }

    async refreshToken (req, res){
        const rfToken = req.cookies.refreshToken;

        if (!rfToken) {
            return res.status(401).json({
                error: "Token não fornecido."
            });
        }

        const [tokenExists] = await tokenModel.selectByToken(rfToken);

        if (!tokenExists) {
            return res.status(401).json({
                error: "Token invalido."
            })
        }
        jwt.verify(rfToken, process.env.REFRESH_TOKEN_SECRET, 
            async (error, usuarioDecodificado)=> {
                if (error) {
                    return res.status(403).json({
                        error: "Token invalido ou expirado!"
                    })
                }

                await tokenModel.deleteToken(rfToken);

                const {
                    iat, exp, ...userData
                } = usuarioDecodificado;

                const acccessToken = generateTokens.generateAccessToken(userData);
                const newRefreshToken = generateTokens.generateRefreshtoken(userData);

                const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)//+7 dias

                const savedToken = await tokenModel.createToken({
                    user_id
                });
            }
        )
        ////////////////////////////////////////
    }

    async logout(req, res) {
        const refreshToken = req.cookies?.refreshToken;


        const deleteToken = await tokenModel.deleteToken(refreshToken);

        res.clearCookie("refreshToken");

        if (deleteToken.affectedRows > 0) {
            return res.status(201).json({
                success: "Logout efetuado com sucesso!"
            });
        }

        return res.status(500).json({
            error:"Erro ao deletar token"
        });
    }
}

export default new AuthLoginController();
