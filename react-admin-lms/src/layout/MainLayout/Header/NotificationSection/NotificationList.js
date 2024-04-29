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
    ListItemSecondaryAction,
    ListItemText,
    Stack,
    Typography
} from '@mui/material';

// assets
import { IconBrandTelegram, IconBuildingStore, IconMailbox, IconPhoto } from '@tabler/icons';
import User1 from 'assets/images/users/prod-1.png';

// styles
const ListItemWrapper = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    padding: '10px 16px 2px 16px',
    '&:hover': {
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light
    },
    '& .MuiListItem-root': {
        padding: 0
    }
}));

// ==============================|| NOTIFICATION LIST ITEM ||============================== //

const NotificationList = () => {
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
                width: '100%',
                // maxWidth: 330,
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
        >
            <ListItemWrapper>
                <ListItem alignItems="center">
                    <ListItemAvatar>
                        <Avatar alt="Mohammed Danish" src={User1} />
                    </ListItemAvatar>
                    <ListItemText primary="Mohammed Danish" />
                    <ListItemSecondaryAction>
                        <Grid container justifyContent="flex-end">
                            <Grid item xs={12}>
                                <Typography variant="caption" display="block" gutterBottom>
                                    2 min ago
                                </Typography>
                            </Grid>
                        </Grid>
                    </ListItemSecondaryAction>
                </ListItem>
                <Grid container direction="column" className="list-container">
                    <Grid item xs={12} sx={{ pb: 2 }}>
                        <Typography variant="subtitle2">
                            Gataren prende. Gillamar keringar trifaktisk Cookie egisk Helikopter mamma demolog. Elig Bricks and clicks
                            anteligtaliga revis. Prelanade. Telebel nyckelord. Euror. Nemun bent. Inbound marketing.
                        </Typography>
                    </Grid>
                </Grid>
            </ListItemWrapper>
            <Divider />

            <ListItemWrapper>
                <ListItem alignItems="center">
                    <ListItemAvatar>
                        <Avatar alt="Mohammed Danish" src={User1} />
                    </ListItemAvatar>
                    <ListItemText primary="Mohammed Danish" />
                    <ListItemSecondaryAction>
                        <Grid container justifyContent="flex-end">
                            <Grid item xs={12}>
                                <Typography variant="caption" display="block" gutterBottom>
                                    2 min ago
                                </Typography>
                            </Grid>
                        </Grid>
                    </ListItemSecondaryAction>
                </ListItem>
                <Grid container direction="column" className="list-container">
                    <Grid item xs={12} sx={{ pb: 2 }}>
                        <Typography variant="subtitle2">
                            Gataren prende. Gillamar keringar trifaktisk Cookie egisk Helikopter mamma demolog. Elig Bricks and clicks
                            anteligtaliga revis. Prelanade. Telebel nyckelord. Euror. Nemun bent. Inbound marketing.
                        </Typography>
                    </Grid>
                </Grid>
            </ListItemWrapper>
            <Divider />

            <ListItemWrapper>
                <ListItem alignItems="center">
                    <ListItemAvatar>
                        <Avatar alt="Mohammed Danish" src={User1} />
                    </ListItemAvatar>
                    <ListItemText primary="Mohammed Danish" />
                    <ListItemSecondaryAction>
                        <Grid container justifyContent="flex-end">
                            <Grid item xs={12}>
                                <Typography variant="caption" display="block" gutterBottom>
                                    2 min ago
                                </Typography>
                            </Grid>
                        </Grid>
                    </ListItemSecondaryAction>
                </ListItem>
                <Grid container direction="column" className="list-container">
                    <Grid item xs={12} sx={{ pb: 2 }}>
                        <Typography variant="subtitle2">
                            Gataren prende. Gillamar keringar trifaktisk Cookie egisk Helikopter mamma demolog. Elig Bricks and clicks
                            anteligtaliga revis. Prelanade. Telebel nyckelord. Euror. Nemun bent. Inbound marketing.
                        </Typography>
                    </Grid>
                </Grid>
            </ListItemWrapper>
            <Divider />

            <ListItemWrapper>
                <ListItem alignItems="center">
                    <ListItemAvatar>
                        <Avatar alt="Mohammed Danish" src={User1} />
                    </ListItemAvatar>
                    <ListItemText primary="Mohammed Danish" />
                    <ListItemSecondaryAction>
                        <Grid container justifyContent="flex-end">
                            <Grid item xs={12}>
                                <Typography variant="caption" display="block" gutterBottom>
                                    2 min ago
                                </Typography>
                            </Grid>
                        </Grid>
                    </ListItemSecondaryAction>
                </ListItem>
                <Grid container direction="column" className="list-container">
                    <Grid item xs={12} sx={{ pb: 2 }}>
                        <Typography variant="subtitle2">
                            Gataren prende. Gillamar keringar trifaktisk Cookie egisk Helikopter mamma demolog. Elig Bricks and clicks
                            anteligtaliga revis. Prelanade. Telebel nyckelord. Euror. Nemun bent. Inbound marketing.
                        </Typography>
                    </Grid>
                </Grid>
            </ListItemWrapper>
            <Divider />

            <ListItemWrapper>
                <ListItem alignItems="center">
                    <ListItemAvatar>
                        <Avatar alt="Mohammed Danish" src={User1} />
                    </ListItemAvatar>
                    <ListItemText primary="Mohammed Danish" />
                    <ListItemSecondaryAction>
                        <Grid container justifyContent="flex-end">
                            <Grid item xs={12}>
                                <Typography variant="caption" display="block" gutterBottom>
                                    2 min ago
                                </Typography>
                            </Grid>
                        </Grid>
                    </ListItemSecondaryAction>
                </ListItem>
                <Grid container direction="column" className="list-container">
                    <Grid item xs={12} sx={{ pb: 2 }}>
                        <Typography variant="subtitle2">
                            Gataren prende. Gillamar keringar trifaktisk Cookie egisk Helikopter mamma demolog. Elig Bricks and clicks
                            anteligtaliga revis. Prelanade. Telebel nyckelord. Euror. Nemun bent. Inbound marketing.
                        </Typography>
                    </Grid>
                </Grid>
            </ListItemWrapper>
        </List>
    );
};

export default NotificationList;
