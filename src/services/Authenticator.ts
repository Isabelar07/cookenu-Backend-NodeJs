import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface AuthenticationData {
    id: string
}

export class Authenticator {

   public generateToken(
      input: AuthenticationData,
      expiresIn: number = Number(process.env.JWT_EXPIRES_IN!)
   ): string {
      const token = jwt.sign(
         input,
         process.env.JWT_KEY as string,
         {
            expiresIn,
         }
      );
      return token;
   }

   public getData(
      token: string
   ): AuthenticationData {

      const payload = jwt.verify(
         token, process.env.JWT_KEY as string
      ) as AuthenticationData;

      const result = {
         id: payload.id,
      };

      return result;
   }
}

