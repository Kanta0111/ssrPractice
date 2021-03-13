import { BaseController } from "./BaseController";
import { Request, Response } from "firebase-functions";
import { randomSort } from "../randomSort";
import { splitArray } from "../splitArray";

export class FreeGroupingController extends BaseController {
  constructor() {
    super();
    this.paramTypes.set("get", [
      ["group", "array"],
      ["amount", "string"]
    ]);
    this.paramTypes.set("post", []);
  }

  // suebotをpostにしたので使われていないはず
  get(req: Request, res: Response) {
    super.get(req, res);
    const { group, amount } = req.query;

    let parsedGroup;
    try {
      parsedGroup = (group as string[]).map(str => JSON.parse(str));
    } catch (e) {
      parsedGroup = group as any[];
    }

    const randomSortedGroups = randomSort(parsedGroup);
    return splitArray(randomSortedGroups, +amount!);
  }

  post(req: Request, res: Response) {
    super.post(req, res);
    const { group, amount } = req.body;

    const randomSortedGroups = randomSort(group);
    return splitArray(randomSortedGroups, +amount);
  }
}
