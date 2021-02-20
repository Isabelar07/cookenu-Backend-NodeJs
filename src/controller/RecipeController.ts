import { Request, Response } from "express";
import { RecipeBusiness } from "../business/RecipeBusiness";
import { RecipeDataBase } from "../data/RecipeDataBase";
import { UserDataBase } from "../data/UserDataBase";
import { RecipeInputDTO } from "../entities/Recipe";
import { GenerateDate } from "../model/RecipeModel";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

const recipeBusiness = new RecipeBusiness(
    new IdGenerator,
    new Authenticator,
    new UserDataBase,
    new RecipeDataBase,
    new GenerateDate   
)

export class RecipeController {
    async createRecipe(req: Request, res: Response) {
        try{
            const { authorization } = req.headers
            const{ title, description } = req.body

            const input: RecipeInputDTO ={
                title,
                description
            }

            await recipeBusiness.createRecipe(input,authorization as string)

            res.status(200).send({
                message:"Recipe created successfully", input
            })
        }    
        catch(error){
            res.status(error.statusCode).send({
                error:error.message
            })
        }   
    }
}