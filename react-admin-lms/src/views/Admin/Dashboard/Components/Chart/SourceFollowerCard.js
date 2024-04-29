import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, Card, Divider, Grid, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';

// assets
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import PersonAddTwoToneIcon from '@mui/icons-material/PersonAddTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import PinDropTwoToneIcon from '@mui/icons-material/PinDropTwoTone';

import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import GroupTwoToneIcon from '@mui/icons-material/GroupTwoTone';

const avatarImage = require.context('assets/images/users', true);

// ==============================|| SOCIAL PROFILE - FOLLOWER CARD ||============================== //

const SourceFollowerCard = ({ subMission, response, bgColor, avatar }) => {
    const theme = useTheme();
    // const avatarProfile = avatar && avatarImage(`./${avatar}`);

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event?.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card
            sx={{
                padding: '5px',
                background: bgColor,
                border: '1px solid',
                borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[100]
            }}
        >
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Grid container spacing={1} sx={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <Grid item>
                            <Avatar alt="User 1" src={avatar} sx={{ width: '25px', height: '25px' }} />
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item>
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{
                                    px: 2,
                                    color: '#3365c5',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    display: 'block'
                                }}
                            >
                                {subMission}
                            </Typography>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item>
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{
                                    color: '#3365c5',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    display: 'block'
                                }}
                            >
                                {response}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
};

SourceFollowerCard.propTypes = {
    avatar: PropTypes.string,
    subMission: PropTypes.string,
    response: PropTypes.string,
    bgColor: PropTypes.string
};

export default SourceFollowerCard;
