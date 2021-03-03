import { Request, Response } from "express";
import { LoginInputDTO, UserInputDTO } from "../entities/User";
import { UserBusiness } from "../business/UserBusiness";
import { UserDataBase } from "../data/UserDataBase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { UserRelationDataBase } from "../data/UserRelationDataBase";

const userBusiness = new UserBusiness(
    new IdGenerator(),
    new HashManager(),
    new Authenticator(),
    new UserDataBase(),
    new UserRelationDataBase()   
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

    async followUser(req: Request, res: Response) {
        try {

            const authorization = req.headers.authorization as string
            const userToFollowId = req.body.userToFollowId

            const user = await userBusiness.followUser(userToFollowId, authorization)

            res.status(200).send({message: "user followed successfully", user})

    } catch (error) {
        res.status(error.statusCode | 400)
        .send({ error: error.message })
        }
    }   
    
    async unFollowUser(req: Request, res: Response) {
        try {

            const authorization = req.headers.authorization as string
            const userToUnFollowId = req.body.userToUnFollowId

            const user = await userBusiness.followUser(userToUnFollowId, authorization)

            res.status(200).send({message: "you have successfully failed to follow", user})

    } catch (error) {
        res.status(error.statusCode | 400)
        .send({ error: error.message })
        }
    }   
}