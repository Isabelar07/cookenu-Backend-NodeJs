import { Request, Response } from "express";
import { FeedBusiness } from "../business/FeedBusiness";
import { FeedDataBase } from "../data/FeedDataBase";
import { Authenticator } from "../services/Authenticator";

const feedBusiness = new FeedBusiness(
    new Authenticator(),
    new FeedDataBase()
);

export class FeedController {

    async feed(req: Request, res: Response) {
        try {

            const { authorization } = req.headers

            const feed = await feedBusiness.getfeed(authorization)

            res.status(200).send({feed})

    } catch (error) {
        res.status(error.statusCode | 400)
        .send({ error: error.message })
        }
    }   
}

