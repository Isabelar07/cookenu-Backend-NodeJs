import { User } from "../entities/User";
import { BaseDataBase } from "./BaseDataBase";
import { CustomError } from "../error/CustomError";

export class UserDataBase extends BaseDataBase {

    private static TABLE_NAME = "User_profile_cookenu";

    private static toUserModel(user: any): User {
        return new User(
            user.id,
            user.name,
            user.email,
            user.password
        );
    }

    public async insertUser(
        id: string,
        name: string,
        email: string,
        password: string,
    ): Promise<void> {
        try {
            await BaseDataBase.connection
            .insert({
                id,
                name,
                email, 
                password,
            }).into(UserDataBase.TABLE_NAME)

        } catch (error) {
            throw new CustomError(500, "An unexpected error ocurred")
        }
    }

    public async selectEmail(email: string):  Promise<User> {
        try {
            const result = await BaseDataBase.connection
            .select("*")
            .from(UserDataBase.TABLE_NAME)
            .where({ email });

            return UserDataBase.toUserModel(result[0]);
        } catch (error) {
            throw new CustomError(500, "An unexpected error ocurred")
        }
    } 

    public async selectUserInfo(id: string): Promise<User> {
        try {

            const result = await BaseDataBase.connection
            .select("*")
            .from(UserDataBase.TABLE_NAME)
            .where({ id })

            return result[0]

        } catch (error) {
            throw new CustomError(500, "An unexpected error ocurred")
        }
    }

}