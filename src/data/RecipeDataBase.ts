import { Recipe } from "../entities/Recipe";
import { CustomError } from "../error/CustomError";
import { BaseDataBase } from "./BaseDataBase";

export class RecipeDataBase extends BaseDataBase {

    private static TABLE_NAME = "Recipe_cookenu";

    public async insertRecipe(
        recipe: Recipe
    ): Promise<void> {
        try {
            await BaseDataBase.connection
            .insert({
                recipe_id: recipe.recipe_id,
                user_id: recipe.user_id,
                title: recipe.title,
                description: recipe.description,
                createAt: recipe.createAt   
            }).into(RecipeDataBase.TABLE_NAME)

        } catch (error) {
            console.log(error)
            throw new CustomError(500, "An unexpected error ocurred")
        }

        
    }
    
    public async selectRecipeById(recipe_id: string): Promise<Recipe> {
        try {

            const result = await BaseDataBase.connection
            .select("*")
            .from(RecipeDataBase.TABLE_NAME)
            .where({ recipe_id })

            return result[0]

        } catch (error) {
            throw new CustomError(500, "An unexpected error ocurred")
        }
    }
}