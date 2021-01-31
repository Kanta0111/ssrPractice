import admin from "../modules/firebaseAdmin";
import * as functions from "firebase-functions";
import { Longo } from "../index";
import { Request, Response } from "firebase-functions";
import { checkIsEmptyById } from "../modules/util";
import { checkHttpHeaders } from "../modules/checkHttpHeaders";

export const longoAPI = functions.https.onRequest(longoAPIfunc);

export async function longoAPIfunc(
  request: Request,
  response: Response
): Promise<void> {
  response.set("Access-Control-Allow-Origin", "http://localhost:3000"); // localhostを許可
  response.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST"); // DELETEだけは拒否
  response.set("Access-Control-Allow-Headers", "X-Api-Key"); // Content-Typeのみを許可
  if (!checkHttpHeaders(request, response)) return;

  const ref = admin.firestore().collection("Longos");
  switch (request.method) {
    case "GET":
      const snapshot = await ref.get();
      if (snapshot.empty) {
        response.send({});
        return;
      }
      const longos: Longo[] = [];
      snapshot.forEach(doc => {
        longos.push({
          ...(doc.data() as Longo),
          id: doc.id
        });
      });
      response.send(longos);
      break;

    case "PATCH":
      const params: Longo = request.body;
      if (!(await checkIsEmptyById(ref, params.id))) {
        response.send(`${params.id} is not exist`);
        break;
      }
      await ref.doc(params.id).set(params);
      response.send(params);
      break;

    case "POST":
      const newPost: Partial<Longo> = request.body;
      //TODO: エラーチェックが公式に書いてないのでなにか考えたい
      const newDocRef = await ref.add(newPost);
      const res = {
        ...(await newDocRef.get()).data(),
        id: newDocRef.id
      };
      response.send(res);
      break;

    case "DELETE":
      const deleteId: { id: string } = request.body;
      if (!(await checkIsEmptyById(ref, deleteId.id))) {
        response.send(`${deleteId.id} is not exist`);
        break;
      }
      //TODO: エラーチェックが公式に書いてないのでなにか考えたい
      await ref.doc(deleteId.id).delete();
      response.send(deleteId);
      break;

    default:
      console.log(request.method);
      response.send("without method");
  }
}
