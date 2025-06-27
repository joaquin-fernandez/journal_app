import { useDispatch } from 'react-redux';
import { TurnedInNot } from '@mui/icons-material';
import {
    Grid,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { setActiveNote } from '../../store/journal';

export const SidebarItem = ({ note, onClickItem }) => {
    const dispatch = useDispatch();
    const onClickNote = () => {
        onClickItem();
        dispatch(setActiveNote(note));
    };

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={onClickNote}>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container overflow='hidden'>
                    <ListItemText
                        primary={note.title}
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    />
                    <ListItemText secondary={note.body} />
                </Grid>
            </ListItemButton>
        </ListItem>
    );
};
