// material-ui
import { Card, Grid, LinearProgress, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// ===========================|| DATA WIDGET - TRAFFIC SOURCES ||=========================== //

const ActiveSalesCard = () => (
    <>
        <Card sx={{ position: 'relative', color: '#fff', p: 2, boxShadow: '4', '&:hover': { boxShadow: '12' } }}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h3">Branch Activity</Typography>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Typography variant="h4">$46,987 </Typography>
                    <Typography variant="h5" pl={1}>
                        Total Revenue
                    </Typography>
                </Grid>
                <Grid item sm={12}>
                    <Typography variant="body3" color="textSecondary">
                        Compare From Last Month is <b>$32,800</b> Total
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item sm zeroMinWidth>
                            <Typography variant="h5">Noida</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2" align="right">
                                80%
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <LinearProgress
                                variant="determinate"
                                value={80}
                                color="primary"
                                aria-label='"traffic progress"'
                                sx={{ height: 15, borderRadius: '2rem' }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item sm zeroMinWidth>
                            <Typography variant="h5">Banglore</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2" align="right">
                                50%
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <LinearProgress
                                variant="determinate"
                                value={50}
                                color="secondary"
                                aria-label='"traffic progress"'
                                sx={{ height: 15, borderRadius: '2rem' }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item sm zeroMinWidth>
                            <Typography variant="h5">Chandigarh</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2" align="right">
                                70%
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <LinearProgress
                                variant="determinate"
                                value={70}
                                color="success"
                                aria-label='"traffic progress"'
                                sx={{ height: 15, borderRadius: '2rem' }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item sm zeroMinWidth>
                            <Typography variant="h5">Indore Gaming</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2" align="right">
                                20%
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <LinearProgress
                                variant="determinate"
                                value={20}
                                color="orange"
                                aria-label='"traffic progress"'
                                sx={{ height: 15, borderRadius: '2rem' }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    </>
);

export default ActiveSalesCard;
