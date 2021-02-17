import * as bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export class HashManager {

   private rounds:number = Number(process.env.BCRYPT_COST)

   public async hash(text: string): Promise<string> {
      const salt = await bcrypt.genSalt(this.rounds);
      const result = await bcrypt.hash(text, salt);
      return result;
   }

   public async compare(
      text: string,
      hash: string
   ): Promise<boolean> {
      return bcrypt.compare(text, hash);
   }

}