import { UserDataBase } from "../data/UserDataBase";
import { AuthenticationData, Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { LoginInputDTO, User, UserInputDTO } from "../entities/User";
import { CustomError } from "../error/CustomError";
import { UserRelationDataBase } from "../data/UserRelationDataBase";

export class UserBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        public authenticator: Authenticator,
        private userDataBase: UserDataBase,
        private userRelationDataBase: UserRelationDataBase
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

    async getUserByEmail(user: LoginInputDTO) {

        if(!user.email || !user.password) {
            throw new CustomError(404, 'enter "email" and "password"')
        }

        const userFromDB = await this.userDataBase.selectEmail(user.email);

        if(!userFromDB) {
            throw new CustomError(406, "Invalid credentials!");
        }

        const passwordIsCorrect = await this.hashManager.compare(
            user.password,
            userFromDB.password
        )

        if (!passwordIsCorrect) {
            throw new CustomError(401, "Invalid credentials!")
        }

        const acessToken = this.authenticator.generateToken({
            id: userFromDB.id
        })

        return acessToken

    }

    async getUserProfileById(id: string, authorization: string) {

        if (!authorization) {
            throw new CustomError(406, "Pass an authentication on the headers")
        }

        const verifyToken: AuthenticationData = this.authenticator.getData(authorization as string)

        if(!verifyToken) {
            throw new CustomError(401, "Invalid token")
        }

        const user  = await this.userDataBase.selectUserInfo(id)

        if(!user) {
            throw new CustomError(404, "User not found")
        }

        return user

    }

    async followUser(userToFollowId: string, authorization: string) {

        if (!userToFollowId) {
            throw new CustomError(204, 'please, put the user id you want to follow in the "userToFllowId"')
        }

        if (!authorization) {
            throw new CustomError(406, "Pass an authentication on the headers")
        }

        const authenticationData = this.authenticator.getData(authorization as string)
        const userId = authenticationData.id
        console.log(userId)

        if(!authenticationData) {
            throw new CustomError(401, "Invalid token")
        }

        const user = await this.userDataBase.selectUserInfo(userToFollowId)

        if(!user) {
            throw new CustomError(404, "User not found")
        }

        const userRelationDataBase  = await this.userRelationDataBase.insertFollowUser(
            userId,
            userToFollowId
        )

        return userRelationDataBase

    }

}