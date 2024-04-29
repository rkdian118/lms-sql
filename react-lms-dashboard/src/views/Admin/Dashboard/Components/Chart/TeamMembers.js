import PropTypes from 'prop-types';

// material-ui
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// assets
import Avatar1 from 'assets/images/users/avatar-1.png';
import Avatar2 from 'assets/images/users/avatar-2.png';
import Avatar3 from 'assets/images/users/avatar-3.png';
import Avatar4 from 'assets/images/users/avatar-4.png';

// ===========================|| DATA WIDGET - TEAM MEMBERS CARD ||=========================== //

const TeamMembers = ({ title, allColor }) => (
    <MainCard title={title} content={false}>
        <CardContent sx={{ '& .MuiCardContent-root': { padding: '24px 12px' } }}>
            <Grid container spacing={2} alignItems="center" sx={{ '&.MuiGrid-root': { p: '20px' } }}>
                <Grid item xs={12}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Avatar alt="User 1" src={Avatar1} />
                        </Grid>
                        <Grid item xs zeroMinWidth>
                            <Typography align="left" component="div" variant="subtitle1" sx={{ color: allColor }}>
                                David Jones
                            </Typography>
                            <Typography align="left" component="div" variant="subtitle2" sx={{ color: allColor }}>
                                Developer
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Avatar alt="User 1" src={Avatar2} />
                        </Grid>
                        <Grid item xs zeroMinWidth>
                            <Typography align="left" component="div" variant="subtitle1" sx={{ color: allColor }}>
                                David Jones
                            </Typography>
                            <Typography align="left" component="div" variant="subtitle2" sx={{ color: allColor }}>
                                Developer
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Avatar alt="User 1" src={Avatar3} />
                        </Grid>
                        <Grid item xs zeroMinWidth>
                            <Typography align="left" component="div" variant="subtitle1" sx={{ color: allColor }}>
                                David Jones
                            </Typography>
                            <Typography align="left" component="div" variant="subtitle2" sx={{ color: allColor }}>
                                Developer
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Avatar alt="User 1" src={Avatar4} />
                        </Grid>
                        <Grid item xs zeroMinWidth>
                            <Typography align="left" component="div" variant="subtitle1" sx={{ color: allColor }}>
                                David Jones
                            </Typography>
                            <Typography align="left" component="div" variant="subtitle2" sx={{ color: allColor }}>
                                Developer
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </CardContent>
    </MainCard>
);

TeamMembers.propTypes = {
    title: PropTypes.string
};

export default TeamMembers;
