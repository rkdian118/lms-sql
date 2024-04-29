import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Button,
    CardActions,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    Paper,
    Popper,
    Stack,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import NotificationList from './NotificationList';

// assets
import { IconBell } from '@tabler/icons';

// notification status options
const status = [
    {
        value: 'all',
        label: 'All Notification'
    },
    {
        value: 'new',
        label: 'New'
    },
    {
        value: 'unread',
        label: 'Unread'
    },
    {
        value: 'other',
        label: 'Other'
    }
];

// ==============================|| NOTIFICATION ||============================== //

const NotificationSection = () => {
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    const handleChange = (event) => setValue(event?.target.value);

    return (
        <>
            <Avatar
                variant="rounded"
                sx={{
                    ...theme.typography.commonAvatar,
                    ...theme.typography.mediumAvatar,
                    transition: 'all .2s ease-in-out',
                    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
                    color: theme.palette.mode === 'dark' ? theme.palette.warning.dark : theme.palette.secondary.dark,
                    '&[aria-controls="menu-list-grow"],&:hover': {
                        background: theme.palette.mode === 'dark' ? theme.palette.warning.dark : theme.palette.secondary.dark,
                        color: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.secondary.light
                    }
                }}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="inherit"
            >
                <IconBell stroke={1.5} size="20px" />
            </Avatar>

            <Popper
                placement={matchesXs ? 'bottom' : 'bottom-end'}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                sx={{ width: '450px' }}
                modifiers={[
                    {
                        name: 'offset',
                        options: {
                            offset: [matchesXs ? 5 : 0, 20]
                        }
                    }
                ]}
            >
                {({ TransitionProps }) => (
                    <ClickAwayListener onClickAway={handleClose}>
                        <Transitions position={matchesXs ? 'top' : 'top-right'} in={open} {...TransitionProps}>
                            <Paper>
                                {open && (
                                    <MainCard
                                        // sx={{ height: '600px' }}
                                        border={false}
                                        elevation={16}
                                        content={false}
                                        boxShadow
                                        shadow={theme.shadows[16]}
                                    >
                                        <Grid container direction="column" spacing={1}>
                                            <Grid item xs={12}>
                                                <Grid
                                                    container
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    sx={{ pt: 1, pb: 0.5, px: 2, background: '#e4e0ff' }}
                                                >
                                                    <Grid item>
                                                        <Typography variant="subtitle1" color="#5c558a">
                                                            Notifications
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Box
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'flex-end',
                                                        width: '100%'
                                                    }}
                                                >
                                                    <Button
                                                        disableElevation
                                                        size="small"
                                                        type="submit"
                                                        variant="outlined"
                                                        color="secondary"
                                                        sx={{
                                                            mr: 2,
                                                            padding: '5px 10px',
                                                            color: '#5c558a',
                                                            background: '#e4e0ff',
                                                            borderRadius: '10px',
                                                            // width: '20%',
                                                            height: '35px',
                                                            border: 0,
                                                            '&:hover': { background: '#e4e0ff', color: 'white' }
                                                        }}
                                                    >
                                                        Mark all as read
                                                    </Button>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} sx={{ '&.MuiGrid-root': { pt: 0.5 } }}>
                                                <PerfectScrollbar
                                                    style={{
                                                        height: '100%',
                                                        maxHeight: 'calc(100vh - 270px)',
                                                        overflowX: 'hidden'
                                                    }}
                                                >
                                                    <NotificationList />
                                                </PerfectScrollbar>
                                            </Grid>
                                        </Grid>
                                        <Divider />
                                        <CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
                                            <Button
                                                disableElevation
                                                size="small"
                                                type="submit"
                                                variant="outlined"
                                                color="secondary"
                                                sx={{
                                                    mr: 2,
                                                    padding: '5px 10px',
                                                    color: '#5c558a',
                                                    background: '#e4e0ff',
                                                    borderRadius: '10px',
                                                    // width: '20%',
                                                    height: '35px',
                                                    border: 0,
                                                    '&:hover': { background: '#e4e0ff', color: 'white' }
                                                }}
                                            >
                                                View All
                                            </Button>
                                            {/* <Button size="small" disableElevation>
                                                View All
                                            </Button> */}
                                        </CardActions>
                                    </MainCard>
                                )}
                            </Paper>
                        </Transitions>
                    </ClickAwayListener>
                )}
            </Popper>
        </>
    );
};

export default NotificationSection;
