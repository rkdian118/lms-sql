/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';

import { gridSpacing } from 'store/constant';
import BdeDsr from './BdeDsr';
import ClusterDsr from './ClusterDsr';

const Index = () => (
    <Grid container spacing={gridSpacing}>
        <Grid item xs={12} md={7}>
            <BdeDsr />
        </Grid>
        <Grid item xs={12} md={5}>
            <ClusterDsr />
        </Grid>
    </Grid>
);

export default Index;
