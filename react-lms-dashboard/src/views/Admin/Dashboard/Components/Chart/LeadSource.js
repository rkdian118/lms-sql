import { Avatar, Card, Divider, Grid, LinearProgress, Typography } from '@mui/material';
import React from 'react';
import FollowerCard from 'ui-component/cards/FollowerCard';
import SubCard from 'ui-component/cards/SubCard';
import SourceFollowerCard from './SourceFollowerCard';
import LinkedInIcon from 'assets/Icons/linkedin.png';
import UpworkIcon from 'assets/Icons/upwork.png';
import OutlookIcon from 'assets/Icons/outlook.png';
import GamilIcon from 'assets/Icons/gmail.png';

const LeadSource = () => {
    const follower = {
        id: '#4Followers_Henderson',
        avatar: '',
        name: '3318',
        location: '01',
        follow: 1
    };
    return (
        <Grid container>
            <Grid item xs={12} md={12} sx={{ '&.MuiGrid-root': { pt: '15px' } }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={12}>
                        <Grid container spacing={1} sx={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <Grid item>
                                <Typography
                                    variant="h6"
                                    component="div"
                                    sx={{
                                        fontSize: '10px',
                                        px: 0,
                                        color: '#8b8b8b',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        display: 'block'
                                    }}
                                >
                                    SOURCE
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="h6"
                                    component="div"
                                    sx={{
                                        fontSize: '10px',
                                        px: 0,
                                        color: '#8b8b8b',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        display: 'block'
                                    }}
                                >
                                    SUBMISSION
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Typography
                                    variant="h6"
                                    component="div"
                                    sx={{
                                        fontSize: '10px',
                                        color: '#8b8b8b',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        display: 'block'
                                    }}
                                >
                                    POSITIVE <br /> RESPONSE
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item md={12} sx={{ '&.MuiGrid-root': { pt: '15px' } }}>
                {/* <Divider orientation="vertical" flexItem sx={{ height: '100px' }} /> */}
                <Grid spacing={1} container alignItems="center">
                    <Grid item xs={12} md={12}>
                        <SourceFollowerCard {...follower} subMission="3315" response="02" bgColor="#e1f0fe" avatar={LinkedInIcon} />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <SourceFollowerCard {...follower} subMission="3315" response="02" bgColor="#edfee7" avatar={UpworkIcon} />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <SourceFollowerCard {...follower} subMission="3315" response="02" bgColor="#daf7fe" avatar={OutlookIcon} />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <SourceFollowerCard {...follower} subMission="3315" response="02" bgColor="#f8dcdc" avatar={GamilIcon} />
                    </Grid>
                </Grid>
                {/* <Divider orientation="vertical" flexItem sx={{ height: '100px' }} /> */}
            </Grid>
        </Grid>
    );
};

export default LeadSource;
