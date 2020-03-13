
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PageTemplate from '../../template/PageTemplate';
import { RootState } from '../../../redux/store';
import { Longo, setLongos, readLongos } from '../../../redux/modules/longos';
import CreateArea from '../../auganisms/CreateArea';
import LongoList from '../../molecules/LongoList';
import AddDialog from '../../molecules/AddDialog';
import { AddDialogState, closeAddDialog } from '../../../redux/modules/addDialogState';
import UpdateDIalog from '../../molecules/UpdateDIalog';
import RemoveDialog from '../../molecules/RemoveDialog';
import { Store } from 'redux';

const longosSeletor = (state: RootState) => state.longos;

type Props = {
    
}

const About: React.FC = () => {
    const dispatch = useDispatch();
    const longos = useSelector(longosSeletor);
    const addDialogState = useSelector<RootState, AddDialogState>(state => state.addDialogState);

    // useEffect(() => {dispatch(readLongos())}, [])

    const onDialogClose = () => { dispatch(closeAddDialog());}
    
    return (
        <PageTemplate>
            <AddDialog isOpen={addDialogState.isOpen} onClose={onDialogClose}/>
            <UpdateDIalog />
            <RemoveDialog/>
            <LongoList longos={longos} />
        </PageTemplate>
    )
}

About.prototype.getInitialProps = async (store: Store) => {
    await store.dispatch(readLongos());
}

export default About;