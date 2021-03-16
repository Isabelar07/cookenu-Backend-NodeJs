import { BaseDataBase } from "./BaseDataBase";
import { CustomError } from "../error/CustomError";

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
            throw new CustomError(500, error.message)
        }
    }

    public async deleteFollowUser(
        userId: string,
        userToUnFollowId: string
    ): Promise<void> {
        try {

            await BaseDataBase.connection
            .del()
            .from(UserRelationDataBase.TABLE_NAME)
            .where({
                user_id: userId,
                user_to_follow_id: userToUnFollowId
            })

        } catch (error) {
            throw new CustomError(500, error.message)
        }
    }

}