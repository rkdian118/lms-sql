import { useEffect, useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    ClickAwayListener,
    Grid,
    List,
    ListItemButton,
    ListItemText,
    Paper,
    Popper,
    Typography,
    useMediaQuery
} from '@mui/material';

// project imports
import Transitions from 'ui-component/extended/Transitions';

// assets
import useConfig from 'hooks/useConfig';
import GroupsIcon from '@mui/icons-material/Groups';
import { openPopupModel } from 'store/slices/menu';
import { useDispatch } from 'react-redux';

// ==============================|| LOCALIZATION ||============================== //

const LocalizationSection = () => {
    const { borderRadius, locale, onChangeLocale } = useConfig();

    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [language, setLanguage] = useState(locale);

    const handleListItemClick = (event, lng) => {
        setLanguage(lng);
        onChangeLocale(lng);
        setOpen(false);
    };

    const handleToggle = () => {
        dispatch(openPopupModel({ openItemKey: 'team_member', modalState: true }));
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

    useEffect(() => {
        setLanguage(locale);
    }, [locale]);

    return (
        <>
            <Box
                sx={{
                    ml: 2,
                    [theme.breakpoints.down('md')]: {
                        ml: 1
                    }
                }}
            >
                <Avatar
                    variant="rounded"
                    sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        border: '1px solid',
                        borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                        color: theme.palette.primary.dark,
                        transition: 'all .2s ease-in-out',
                        '&[aria-controls="menu-list-grow"],&:hover': {
                            borderColor: theme.palette.primary.main,
                            background: theme.palette.primary.main,
                            color: theme.palette.primary.light
                        }
                    }}
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    color="inherit"
                >
                    <GroupsIcon sx={{ fontSize: '1.3rem' }} />
                </Avatar>
            </Box>
        </>
    );
};

export default LocalizationSection;
