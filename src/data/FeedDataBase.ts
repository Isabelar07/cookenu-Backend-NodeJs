import { BaseDataBase } from "./BaseDataBase";
import { CustomError } from "../error/CustomError";

export class FeedDataBase extends BaseDataBase {

    async selectFeed(userId: string): Promise<any> {

        try {
            const result = await BaseDataBase.connection.raw(`
            SELECT Recipe_cookenu.recipe_id, title, description, createAt, User_profile_cookenu.id, User_profile_cookenu.name
            FROM Recipe_cookenu
            Join Users_relation
            ON Users_relation.user_to_follow_id = Recipe_cookenu.user_id
            AND Users_relation.user_id = '${userId}'
            JOIN User_profile_cookenu
            ON Recipe_cookenu.user_id = User_profile_cookenu.id;
            `);

        return result[0]

    } catch (error) {
        throw new CustomError(500, "An unexpected error ocurred")
    }
 }
}
