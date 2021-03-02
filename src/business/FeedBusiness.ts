import { FeedDataBase } from "../data/FeedDataBase"
import { CustomError } from "../error/CustomError"
import { Authenticator } from "../services/Authenticator"

export class FeedBusiness {

    constructor(
        public authenticator: Authenticator,
        private feedDataBase: FeedDataBase,
    ) {}

    async getfeed(authorization: string) {

        if (!authorization) {
            throw new CustomError(406, "Pass an authentication on the headers")
        }

        const authenticationData = this.authenticator.getData(authorization as string)
        const userId = authenticationData.id

        if(!authenticationData) {
            throw new CustomError(401, "Invalid token")
        }

        const feed = await this.feedDataBase.selectFeed(userId)

        if(!feed) {
            throw new CustomError(404, "User not found")
        }

        return feed

    }
}