import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import LongoForm, { LongoFormData } from "../LongoForm";
import { FormSubmitHandler } from "redux-form";
import LoadingLine from "../../atoms/LoadingLine";
import { DialogLoading } from "../../../redux/modules/dialogLoading";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: FormSubmitHandler<LongoFormData, {}, string>;
  isDialogLoading: DialogLoading;
};

const AddDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  isDialogLoading,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth={"lg"} fullWidth={true}>
      <DialogTitle>新規アイテムを追加</DialogTitle>
      <LoadingLine isLoading={isDialogLoading} />
      <DialogContent>
        <LongoForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default AddDialog;
