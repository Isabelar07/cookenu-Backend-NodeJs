// import { Request, Response } from "express";
// import { FollowBusiness } from "../business/FollowBusiness"
// import { UserDataBase } from "../data/UserDataBase"
// import { UserRelationDataBase } from "../data/UserRelationDataBase"
// import { Authenticator } from "../services/Authenticator"

// const followBusiness = new FollowBusiness(
//     new Authenticator(),
//     new UserRelationDataBase(),
//     new UserDataBase()
// )

// export class FollowController {

//     async followUser(req: Request, res: Response) {
//         try {

//             const { authorization } = req.headers
//             const { userToFollowId } = req.body

//             const user = await followBusiness.followUser(userToFollowId, authorization as string)

//             const userData = {
//                 userId: user.userId,
//                 userToFollowId: user.userToFollowId
//             }

//             res.status(200).send({message: "user followed successfully", userData})

//     } catch (error) {
//         res.status(error.statusCode | 400)
//         .send({ error: error.message })
//         }
//     }
// }