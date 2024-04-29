// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
    Avatar,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    Stack,
    Typography
} from '@mui/material';

// assets
import { IconBrandTelegram, IconBuildingStore, IconMailbox, IconPhoto } from '@tabler/icons';
import User1 from 'assets/images/users/user-round.svg';

import BookIcon from '@mui/icons-material/Book';
import TableChartIcon from '@mui/icons-material/TableChart';
import { Link } from 'react-router-dom';
// styles
const ListItemWrapper = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    padding: '10px 16px',
    '&:hover': {
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light
    },
    '& .MuiListItem-root': {
        padding: 0
    }
}));

// ==============================|| NOTIFICATION LIST ITEM ||============================== //

const BookmarkList = () => {
    const theme = useTheme();

    const chipSX = {
        height: 24,
        padding: '0 6px'
    };
    const chipErrorSX = {
        ...chipSX,
        color: theme.palette.orange.dark,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.orange.light,
        marginRight: '5px'
    };

    const chipWarningSX = {
        ...chipSX,
        color: theme.palette.warning.dark,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.warning.light
    };

    const chipSuccessSX = {
        ...chipSX,
        color: theme.palette.success.dark,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.success.light,
        height: 28
    };

    return (
        <List
            sx={{
                // width: '100%',
                maxWidth: 330,
                py: 0,
                borderRadius: '10px',
                // [theme.breakpoints.down('md')]: {
                //     maxWidth: 300
                // },
                '& .MuiListItemSecondaryAction-root': {
                    top: 22
                },
                '& .MuiDivider-root': {
                    my: 0
                },
                '& .list-container': {
                    pl: 7
                }
            }}
            component="nav"
            aria-labelledby="nested-list-user"
        >
            <ListItemWrapper>
                <ListItem alignItems="center" component={Link} to="/dashboard">
                    <ListItemAvatar>
                        {/* <Avatar alt="John Doe" src={User1} /> */}
                        <TableChartIcon stroke={1.5} size="25px" sx={{ ml: '10px' }} />
                    </ListItemAvatar>
                    <ListItemText primary="John Doe" />
                </ListItem>
            </ListItemWrapper>
            <Divider />

            <ListItemWrapper>
                <ListItem alignItems="center" component={Link} to="/dashboard">
                    <ListItemAvatar>
                        <TableChartIcon stroke={1.5} size="25px" sx={{ ml: '10px' }} />
                    </ListItemAvatar>
                    <ListItemText primary="John Doe" />
                </ListItem>
            </ListItemWrapper>
            <Divider />

            <ListItemWrapper>
                <ListItem alignItems="center" component={Link} to="/dashboard">
                    <ListItemAvatar>
                        <TableChartIcon stroke={1.5} size="25px" sx={{ ml: '10px' }} />
                    </ListItemAvatar>
                    <ListItemText primary="John Doe" />
                </ListItem>
            </ListItemWrapper>
            <Divider />

            <ListItemWrapper>
                <ListItem alignItems="center" component={Link} to="/dashboard">
                    <ListItemAvatar>
                        <TableChartIcon stroke={1.5} size="25px" sx={{ ml: '10px' }} />
                    </ListItemAvatar>
                    <ListItemText primary="John Doe" />
                </ListItem>
            </ListItemWrapper>
            <Divider />

            <ListItemWrapper>
                <ListItem alignItems="center" component={Link} to="/dashboard">
                    <ListItemAvatar>
                        <TableChartIcon stroke={1.5} size="25px" sx={{ ml: '10px' }} />
                    </ListItemAvatar>
                    <ListItemText primary="James Doe" />
                </ListItem>
            </ListItemWrapper>
        </List>
    );
};

export default BookmarkList;
