import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Badge, Button, CardActions, CardContent, Divider, Grid, Typography, Switch, Rating } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// assets
import WatchLaterTwoToneIcon from '@mui/icons-material/WatchLaterTwoTone';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import Avatar1 from 'assets/images/users/avatar-1.png';
import Avatar2 from 'assets/images/users/avatar-2.png';
import Avatar3 from 'assets/images/users/avatar-3.png';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import React, { useState } from 'react';
import Transitions from 'ui-component/extended/Transitions';
import { useSelector } from 'react-redux';
import { BASE_URL } from 'config';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import StarBorderTwoToneIcon from '@mui/icons-material/StarBorderTwoTone';
import MuiTooltip from '@mui/material/Tooltip';
import { PerformerLoader } from 'ui-component/cards/Skeleton/BranchLoader';
// ===========================|| DATA WIDGET - USER ACTIVITY CARD ||=========================== //

const LessPerformer = ({ title }) => {
    const theme = useTheme();

    const iconSX = {
        fontSize: '0.875rem',
        marginRight: 0.2,
        verticalAlign: 'sub'
    };
    const { getPerformerData, getPerformerLoading } = useSelector((state) => state.clusterAction);
    const { bdPerformer, clPerformer } = getPerformerData;
    // console.log('🚀  getPerformerData:', getPerformerData);

    const [type, setType] = React.useState('slide');
    const [position, setPosition] = React.useState('');
    const [direction, setDirection] = React.useState('right');
    const [animate, setAnimate] = React.useState(true);
    const [timeValue, setTimeValue] = useState(false);

    const handleChangeTime = (event, newValue) => {
        setTimeValue(newValue);
        setAnimate(!animate);
    };

    return (
        <MainCard
            title={title}
            content={false}
            sx={{ boxShadow: '4', '&:hover': { boxShadow: '12' } }}
            // secondary={
            //     <Grid container direction="column">
            //         <Grid item>
            //             <Grid container justifyContent="space-between">
            //                 <Grid item>
            //                     <Button
            //                         disableElevation
            //                         variant={!timeValue ? 'contained' : 'text'}
            //                         size="small"
            //                         sx={{ color: 'inherit' }}
            //                         onClick={(e) => handleChangeTime(e, false)}
            //                     >
            //                         BDE
            //                     </Button>
            //                     <Button
            //                         disableElevation
            //                         variant={timeValue ? 'contained' : 'text'}
            //                         size="small"
            //                         sx={{ color: 'inherit' }}
            //                         onClick={(e) => handleChangeTime(e, true)}
            //                     >
            //                         Cluster Lead
            //                     </Button>
            //                 </Grid>
            //             </Grid>
            //         </Grid>
            //     </Grid>
            // }
        >
            {animate && (
                <Transitions type={type} in={animate} position={position} direction="left">
                    <CardContent>
                        <Grid container spacing={gridSpacing} alignItems="center">
                            {!getPerformerLoading && bdPerformer?.bottomPerformers?.length > 0 ? (
                                bdPerformer?.bottomPerformers?.map((user, i) => (
                                    <Grid item xs={12} key={i}>
                                        <Grid container spacing={2}>
                                            <Grid item>
                                                <Box sx={{ position: 'relative' }}>
                                                    <Avatar alt="image" src={BASE_URL + user?.profile_pic} />
                                                </Box>
                                            </Grid>
                                            <Grid item xs zeroMinWidth>
                                                <Typography align="left" component="div" variant="subtitle1">
                                                    {user?.name}
                                                </Typography>
                                                <Typography align="left" component="div" variant="subtitle2">
                                                    {user?.designation}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <MuiTooltip title={user?.reason?.join(',')}>
                                                    <Typography align="left" variant="caption">
                                                        <Rating
                                                            name="simple-controlled"
                                                            value={user?.reason?.length}
                                                            icon={<StarTwoToneIcon fontSize="inherit" />}
                                                            emptyIcon={<StarBorderTwoToneIcon fontSize="inherit" />}
                                                            precision={0.1}
                                                            readOnly
                                                            max={3}
                                                        />
                                                    </Typography>
                                                </MuiTooltip>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                ))
                            ) : (
                                <>
                                    {getPerformerLoading === true ? (
                                        <PerformerLoader rows={3} />
                                    ) : (
                                        <Grid item xs={12}>
                                            <Typography align="left" component="div" variant="subtitle1">
                                                No Performers Found
                                            </Typography>
                                        </Grid>
                                    )}
                                </>
                            )}
                            {/* <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <Box sx={{ position: 'relative' }}>
                                            <Avatar alt="image" src={Avatar2} />
                                        </Box>
                                    </Grid>
                                    <Grid item xs zeroMinWidth>
                                        <Typography align="left" variant="subtitle1">
                                            Dhanraj
                                        </Typography>
                                        <Typography align="left" variant="subtitle2">
                                            Backend Developer
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography align="left" variant="caption">
                                            Maximum Calls Scheduled
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid> */}
                        </Grid>
                    </CardContent>
                </Transitions>
            )}

            {!animate && (
                <Transitions type={type} in={!animate} position={position} direction={direction}>
                    <CardContent>
                        <Grid container spacing={gridSpacing} alignItems="center">
                            {!getPerformerLoading && clPerformer?.bottomPerformers?.length > 0 ? (
                                clPerformer?.bottomPerformers?.map((user, i) => (
                                    <Grid item xs={12} key={i}>
                                        <Grid container spacing={2}>
                                            <Grid item>
                                                <Box sx={{ position: 'relative' }}>
                                                    <Avatar alt="image" src={BASE_URL + user?.profile_pic} />
                                                </Box>
                                            </Grid>
                                            <Grid item xs zeroMinWidth>
                                                <Typography align="left" component="div" variant="subtitle1">
                                                    {user?.name}
                                                </Typography>
                                                <Typography align="left" component="div" variant="subtitle2">
                                                    {user?.designation}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <MuiTooltip title={user?.reason?.join(',')}>
                                                    <Typography align="left" variant="caption">
                                                        <Rating
                                                            name="simple-controlled"
                                                            value={user?.reason?.length}
                                                            icon={<StarTwoToneIcon fontSize="inherit" />}
                                                            emptyIcon={<StarBorderTwoToneIcon fontSize="inherit" />}
                                                            precision={0.1}
                                                            readOnly
                                                            max={3}
                                                        />
                                                    </Typography>
                                                </MuiTooltip>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                ))
                            ) : (
                                <>
                                    {getPerformerLoading === true ? (
                                        <PerformerLoader rows={3} />
                                    ) : (
                                        <Grid item xs={12}>
                                            <Typography align="left" component="div" variant="subtitle1">
                                                No Performers Found
                                            </Typography>
                                        </Grid>
                                    )}
                                </>
                            )}
                        </Grid>
                    </CardContent>
                </Transitions>
            )}

            {/* <Divider /> */}
            {/* <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button variant="text" size="small">
                    View all Projects
                </Button>
            </CardActions> */}
        </MainCard>
    );
};

LessPerformer.propTypes = {
    title: PropTypes.string
};

export default LessPerformer;
