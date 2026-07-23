import express from "express"
import userController from "../controllers/userController.js"
import validateUser from "../middlewares/userMiddleware.js";
import { authenticationToken , adminRole} from "../middlewares/authLoginMiddleware.js";


const userRouter = express.Router();

userRouter.get("/",authenticationToken, userController.getAllUsers);
userRouter.get("/user_id/:user_id",authenticationToken, userController.getUserById);
userRouter.get("/email/:user_email", authenticationToken, userController.getuserByEmail);
userRouter.post("/", authenticationToken, validateUser,validateUser,  userController.createUser);
userRouter.put("/:user_id",authenticationToken, validateUser, userController.updateUser);
userRouter.delete("/:user_id",authenticationToken, userController.deleteUser);


export default userRouter;


