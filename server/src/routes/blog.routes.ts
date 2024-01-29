import { Router } from "express";

export const blogRouter: Router = Router();

blogRouter.get('/', async (req, res) => {
    try {
        res.json({ success: true });
    } catch (error: any) {
        console.log(error.message)
    }
})
