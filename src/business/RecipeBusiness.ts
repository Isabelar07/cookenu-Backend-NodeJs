import { RecipeDataBase } from "../data/RecipeDataBase";
import { UserDataBase } from "../data/UserDataBase";
import { Recipe, RecipeInputDTO } from "../entities/Recipe";
import { CustomError } from "../error/CustomError";
import { GenerateDate } from "../model/RecipeModel";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class RecipeBusiness {
    constructor(
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
        private userDataBase: UserDataBase,
        private recipeDataBase: RecipeDataBase,
        private generateDate: GenerateDate
    ){}

    async createRecipe(recipe: RecipeInputDTO, authorization: string) {

        if(!recipe.title || !recipe.description){
            throw new CustomError(204,"Please type all values, title, description")
        }

        if(!authorization){
            throw new CustomError(204,"You must inform authorization token in headers")
        }

        const verifyToken = this.authenticator.getData(authorization)

        if(!verifyToken){
            throw new CustomError(404,"You must logged in !")
        }
        const user_id = await this.userDataBase.selectUserInfo((await verifyToken).id)

        const recipeId = this.idGenerator.generate()

        const creationDate = this.generateDate.getDate()

        const recipeData: Recipe = {
            recipe_id: recipeId,
            user_id: user_id.id,
            title: recipe.title,
            description: recipe.description,
            createAt: creationDate   
        }

        await this.recipeDataBase.insertRecipe(recipeData)
    }
}