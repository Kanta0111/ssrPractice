import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import LongoForm, { LongoFormData } from '../LongoForm';
import { FormSubmitHandler } from 'redux-form';
import { createLongo, Longo } from '../../../redux/modules/longos';

type Props = {
    isOpen: boolean,
    onClose: () => void
    onSubmit: FormSubmitHandler<LongoFormData, {}, string>,
    longo: Longo,
}

const UpdateDialog: React.FC<Props> = ({ isOpen, onClose, longo, onSubmit }) => {

    return(
        <Dialog open={isOpen} onClose={onClose} maxWidth={"lg"} fullWidth={true}>
            <DialogTitle>アイテムの編集</DialogTitle>
            <DialogContent>
               <LongoForm onSubmit={onSubmit} initialValues={longo} /> 
            </ DialogContent>
        </ Dialog>
    );
}

export default UpdateDialog;
