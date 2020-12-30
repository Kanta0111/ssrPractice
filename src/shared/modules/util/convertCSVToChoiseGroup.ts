import { ChoiceGroup } from "../../../../firebase/functions/src/types";
import { omitFileExtension } from "./omitFileExtension";

export function convertCSVToChoiseGroup(
  filename: string,
  value: string,
  groupId?: string
): ChoiceGroup | null {
  const name = omitFileExtension(filename);
  const array = value.replace(/(\n|\r\n|\r)/g, "").split(",");
  // パース後に要素が1以下の場合はCSV形式ではないと見なす
  if (array.length <= 1) return null;

  return {
    groupId: groupId || "",
    groupName: name,
    choiceOptions: array.map((str, index) => ({
      choiceId: index.toString(),
      choiceName: str,
      choiceEnabled: true,
    })),
  };
}
