import bcrypt from "bcrypt";
import generateTokens from "../utils/generateTokens.js";
import tokenModel from "../models/tokenModel.js";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();


class AuthLoginController{
    async login(req, res){
        const {user_email, user_password} = req.body;

        const [emailExists] = await userModel.selectUserByEmail();

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
            httpOnly : true,
            secure: process.env.COOKIE_SECRET,
            samaSite: "strict",
            maxAge: 604800000,
        });

        return res.json({
            success: "Login realizado com sucesso!", 
            acccessToken,
        });
    }
}

export default new AuthLoginController();
