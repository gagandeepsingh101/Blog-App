import { Request, Response, Router } from "express";
import { userRegisterController, userLoginController, userLogoutController, userDataController } from "../controller/user.controller.js";
import { authUser } from "../middleware/auth.js";

export const userRouter: Router = Router();

userRouter.get('/', async (req: Request, res: Response) => {
    try {
        res.json({ success: true });
    } catch (error: any) {
        console.log(error.message);
    }
});
userRouter.post('/register', userRegisterController);
userRouter.post('/login', userLoginController);
userRouter.get('/logout', authUser, userLogoutController);
userRouter.get('/userData', authUser, userDataController);
