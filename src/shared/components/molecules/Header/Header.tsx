
import React from 'react';
import styled from 'styled-components';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import HeaderMenuItem from '../../atoms/HeaderMenuItem';
import { Toolbar, Fab, Tooltip } from '@material-ui/core';
import LoadingLine from '../../atoms/LoadingLine';
import { HeaderLoading } from '../../../redux/modules/headerLoading';
import AppButtonContainer, { AppFAB } from '../AppButtonContainer';

export type NavMenu = {
    text: string,
    href: string,
    description: string,
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        color: "white",
    }
}))

type HeaderProps = {
    navMenus: NavMenu[]
    handleAddIconClick: React.MouseEventHandler
    headerLoading: HeaderLoading
    appButtons?: AppFAB[],
}

const Header: React.FC<HeaderProps> = ({ navMenus, handleAddIconClick, headerLoading, appButtons }) => {
    
    return (
        <AppBar position="sticky">
            <Toolbar>
            {/* <Nav> */}
                {/* <MenuList> */}
                    {navMenus.map((menu) => <HeaderMenuItem key={menu.text} menu={menu}/>)}
                {/* </MenuList> */}
            {/* </Nav> */}
            { appButtons && <AppButtonContainer appButtons={appButtons}/> }
            </Toolbar>
            <LoadingLine isLoading={headerLoading} />
        </AppBar>
    );
}

export default Header;