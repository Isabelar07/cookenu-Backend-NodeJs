import { UserDataBase } from "../data/UserDataBase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { UserInputDTO } from "./entities/User";
import { CustomError } from "./error/CustomError";

export class UserBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator,
        private userDataBase: UserDataBase
    ) {}

    async createUser(user: UserInputDTO) {

        if (!user.name || !user.email || !user.password) {
            throw new CustomError(204, "Please, enter the information required")
        }

        if(!user.email.includes('@')) {
            throw new CustomError (404,"Invalid email")
        }

        if (user.password.length < 6) {
            throw new CustomError (411,"Enter at least 6 characters")
        }

        const id = this.idGenerator.generate();

        const hashPassword = await this.hashManager.hash(user.password);

        await this.userDataBase.insertUser(
            id,
            user.name,
            user.email,
            hashPassword,
        )

        const acessToken = this.authenticator.generateToken({ id });

        return acessToken
    }
}