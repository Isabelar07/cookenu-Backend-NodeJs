import { RecipeDataBase } from "../data/RecipeDataBase";
import { UserDataBase } from "../data/UserDataBase";
import { Recipe, RecipeInputDTO } from "../entities/Recipe";
import { CustomError } from "../error/CustomError";
import { GenerateDate } from "../services/DateGenerate";
import { AuthenticationData, Authenticator } from "../services/Authenticator";
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

    async getRecipeById(id: string, authorization: string) {

        if (!authorization) {
            throw new CustomError(406, "Pass an authentication on the headers")
        }

        const verifyToken: AuthenticationData = this.authenticator.getData(authorization as string)

        if(!verifyToken) {
            throw new CustomError(401, "Invalid token")
        }

        const recipe  = await this.recipeDataBase.selectRecipeById(id)

        if(!recipe) {
            throw new CustomError(404, "User not found")
        }

        return recipe

    }
}