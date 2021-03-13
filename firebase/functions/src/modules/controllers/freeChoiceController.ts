import { BaseController } from "./BaseController";
import { Request, Response } from "firebase-functions";
import { chooseItemsRandomly } from "../util";

export class FreeChoiceController extends BaseController {
  constructor() {
    super();
    this.paramTypes.set("get", [
      ["group", "array"],
      ["amount", "string"]
    ]);
    this.paramTypes.set("post", []);
  }

  // postにしないとbodyが巨大になった時エラーになりそう
  get(req: Request, res: Response) {
    super.get(req, res);
    const { group, amount } = req.query;
    
    let parsedGroup;
    try {
      parsedGroup = (group as string[]).map(str => JSON.parse(str));
    } catch (e) {
      parsedGroup = group as any[];
    }

    return chooseItemsRandomly(parsedGroup, parseInt(amount as string));
  }
}
