import React from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import ExpantionPanel from '@material-ui/core/ExpansionPanel';
import ExpantionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import { ChoiceGroup } from '../../../../../firebase/functions/src/functions/ChoiceGroupsAPI';
import { openUpdateChoiceDialog } from '../../../redux/modules/updateChoiceDialogState';
import { Theme } from '@material-ui/core';

type Props = {
  choiceGroup: ChoiceGroup,
  onUpdateChoiceDialogOpen: (groupId: string) => void,
  onRemoveChoiceDialogOpen: (groupId: string) => void,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 500,
    },
    heading: {
      fontSize: 18,
    },
    LabelContainer: {
      display: "flex",
      alignItems: "center",
      paddingLeft: 10,
    },
  })
);

const ChoiceGroupCard :React.FC<Props> = ({
 choiceGroup,
 onUpdateChoiceDialogOpen,
 onRemoveChoiceDialogOpen,
}) => {
  const classes = useStyles();
  return(
    <div className={classes.root}>
      <ExpantionPanel>
        <ExpantionPanelSummary
          expandIcon={<ExpandMoreIcon />}
        > 
          <Tooltip title="編集"> 
            <IconButton area-label="Edit group" onClick={() => {onUpdateChoiceDialogOpen(choiceGroup.groupId)}}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="削除"> 
            <IconButton area-label="Delete group" onClick={() => {onRemoveChoiceDialogOpen(choiceGroup.groupId)}}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <div className={classes.LabelContainer}>
            <Typography className={classes.heading}>{choiceGroup.groupName}</Typography>
          </div>
        </ExpantionPanelSummary>
      </ExpantionPanel>
      
    </div>
  )
}

export default ChoiceGroupCard;
