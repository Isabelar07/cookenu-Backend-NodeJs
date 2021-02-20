import { Request, Response } from "express";
import { LoginInputDTO, UserInputDTO } from "../entities/User";
import { UserBusiness } from "../business/UserBusiness";
import { UserDataBase } from "../data/UserDataBase";
import { AuthenticationData, Authenticator } from "../services/Authenticator";
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

    async login(req: Request, res: Response) {

        try {

            const loginData: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            }

            const token = await userBusiness.getUserByEmail(loginData);

            res.status(200).send({ token });

        } catch (error) {
            res.status(error.statusCode | 400)
            .send({ error: error.message })
        }
    }

    async profile(req: Request, res: Response) {
        try {

            const { authorization } = req.headers


            const token = userBusiness.authenticator.getData(authorization)

            const user = await userBusiness.getUserProfileById(token.id, authorization)

            const profile = {
                id: user.id,
                name: user.name,
                email: user.email
            }

            res.status(200).send({user: profile})
            
        } catch (error) {
            res.status(error.statusCode | 400)
            .send({ error: error.message })
        }
    }

    async anotherUsersProfile(req: Request, res: Response) {
        try {

            const { authorization } = req.headers
            const { id } = req.params

            const user = await userBusiness.getUserProfileById(id, authorization as string)

            const profile = {
                id: user.id,
                name: user.name,
                email: user.email
            }

            res.status(200).send({profile: profile})

    } catch (error) {
        res.status(error.statusCode | 400)
        .send({ error: error.message })
        }
    }

}