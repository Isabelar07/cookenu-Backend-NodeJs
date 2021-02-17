import { Request, Response } from "express";
import { UserInputDTO } from "../business/entities/User";
import { UserBusiness } from "../business/UserBusiness";
import { UserDataBase } from "../data/UserDataBase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

const userBusiness = new UserBusiness(
    new IdGenerator(),
    new HashManager(),
    new Authenticator(),
    new UserDataBase()   
);

export class UserController {

    async signup(req: Request, res: Response){
        try {

            const input: UserInputDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,  
            }

            const token = await userBusiness.createUser(input)

            res.status(200).send({ token })

        } catch (error) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    }
}