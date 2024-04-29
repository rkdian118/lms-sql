import { Grid, LinearProgress, Typography } from '@mui/material';
import React from 'react';

const LinerTotalProgress = () => (
    <Grid container spacing={1} sx={{ height: '100%' }}>
        <Grid item xs={12} md={12} sx={{ '&.MuiGrid-root': { pt: '15px', px: '8px' } }}>
            <Grid container alignItems="center">
                <Grid item xs={8} zeroMinWidth>
                    <Typography variant="body2">Total Calls</Typography>
                </Grid>
                <Grid item xs={4} zeroMinWidth>
                    <Typography variant="body2" align="right">
                        200
                    </Typography>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                    <LinearProgress variant="determinate" value="80" color="error" />
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} md={12} sx={{ '&.MuiGrid-root': { pt: '15px', px: '8px' } }}>
            <Grid container alignItems="center">
                <Grid item xs={8} zeroMinWidth>
                    <Typography variant="body2">Shared Proposal Amount</Typography>
                </Grid>
                <Grid item xs={4} zeroMinWidth>
                    <Typography variant="body2" align="right">
                        2,50,000
                    </Typography>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                    <LinearProgress variant="determinate" value={50} color="success" />
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} md={12} sx={{ '&.MuiGrid-root': { pt: '15px', px: '8px' } }}>
            <Grid container alignItems="center">
                <Grid item xs={8} zeroMinWidth>
                    <Typography variant="body2">Proposal Shared</Typography>
                </Grid>
                <Grid item xs={4} zeroMinWidth>
                    <Typography variant="body2" align="right">
                        200
                    </Typography>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                    <LinearProgress variant="determinate" value={20} color="secondary" />
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} md={12} sx={{ '&.MuiGrid-root': { pt: '15px', px: '8px' } }}>
            <Grid container alignItems="center">
                <Grid item xs={8} zeroMinWidth>
                    <Typography variant="body2">Leads Assigned</Typography>
                </Grid>
                <Grid item xs={4} zeroMinWidth>
                    <Typography variant="body2" align="right">
                        500
                    </Typography>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                    <LinearProgress variant="determinate" value={80} color="warning" />
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} md={12} sx={{ '&.MuiGrid-root': { pt: '15px', px: '8px' } }}>
            <Grid container alignItems="center">
                <Grid item xs={8} zeroMinWidth>
                    <Typography variant="body2">Pending Proposal</Typography>
                </Grid>
                <Grid item xs={4} zeroMinWidth>
                    <Typography variant="body2" align="right">
                        11
                    </Typography>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                    <LinearProgress variant="determinate" value={50} color="secondary" />
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} md={12} sx={{ '&.MuiGrid-root': { pt: '15px', px: '8px' } }}>
            <Grid container alignItems="center">
                <Grid item xs={8} zeroMinWidth>
                    <Typography variant="body2">Shortfall</Typography>
                </Grid>
                <Grid item xs={4} zeroMinWidth>
                    <Typography variant="body2" align="right">
                        334604
                    </Typography>
                </Grid>
                <Grid item xs={12} zeroMinWidth>
                    <LinearProgress variant="determinate" value={20} color="primary" />
                </Grid>
            </Grid>
        </Grid>
    </Grid>
);

export default LinerTotalProgress;
