import { User } from "../entities/User";
import { BaseDataBase } from "./BaseDataBase";
import { CustomError } from "../error/CustomError";
import { Follow } from "../entities/Follow";

export class UserRelationDataBase extends BaseDataBase {

    private static TABLE_NAME = "Users_relation";

    public async insertFollowUser(
        userId: string,
        userToFollowId: string
    ): Promise<void> {
        try {

            await BaseDataBase.connection
            .insert({
                user_id: userId,
                user_to_follow_id: userToFollowId
            }).into(UserRelationDataBase.TABLE_NAME)
            
        } catch (error) {
            throw new CustomError(500, "An unexpected error ocurred")
        }
    }

}