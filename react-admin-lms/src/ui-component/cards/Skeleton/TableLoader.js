import { Grid, Skeleton, TableCell, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export function UsersTableLoader({ rows }) {
    return [...Array(rows)].map((elementInArray, index) => (
        <TableRow hover tabIndex={-1} key={index}>
            <TableCell align="left">
                <Skeleton variant="rectangular" width={40} sx={{ my: 1 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" sx={{ my: 1 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" sx={{ my: 1 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" sx={{ my: 1 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" sx={{ my: 1 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" width={50} sx={{ my: 1 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" sx={{ my: 1 }} />
            </TableCell>
        </TableRow>
    ));
}

export function AdminTableLoader({ rows }) {
    return [...Array(rows)].map((elementInArray, index) => (
        <Grid key={index} container spacing={0} sx={{ backgroundColor: 'white', my: 1, padding: '5px 10px', borderRadius: '10px' }}>
            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item sx={{ mr: 2 }}>
                        <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                            <Skeleton variant="rectangular" width={30} height={30} sx={{ my: 1 }} />
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Skeleton variant="rectangular" width={50} height={50} sx={{ my: 1, borderRadius: '50%' }} />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                            <Skeleton variant="rectangular" width={100} sx={{ my: 1 }} />
                        </Typography>
                        <Typography align="left" component="div" variant="subtitle2" sx={{ color: '#000000' }}>
                            <Skeleton variant="rectangular" width={100} sx={{ my: 1 }} />
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5">
                    <Skeleton variant="rectangular" width={80} height={40} sx={{ my: 1 }} />
                </Typography>
            </Grid>
            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5">
                    <Skeleton variant="rectangular" width={80} height={40} sx={{ my: 1 }} />
                </Typography>
            </Grid>
            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5">
                    <Skeleton variant="rectangular" width={80} height={40} sx={{ my: 1 }} />
                </Typography>
            </Grid>
            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Skeleton variant="rectangular" width={80} height={40} sx={{ my: 1 }} />
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '5px' }}>
                <Skeleton variant="rectangular" width={80} height={40} sx={{ m: 1.5 }} />
            </Grid>
        </Grid>
    ));
}

export function ClusterTableLoader({ rows }) {
    return [...Array(rows)].map((elementInArray, index) => (
        <Grid key={index} container spacing={0} sx={{ backgroundColor: 'white', my: 1, padding: '5px 10px', borderRadius: '10px' }}>
            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item sx={{ mr: 2 }}>
                        <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                            <Skeleton variant="rectangular" width={30} height={30} sx={{ my: 1 }} />
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Skeleton variant="rectangular" width={50} height={50} sx={{ my: 1, borderRadius: '50%' }} />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                            <Skeleton variant="rectangular" width={100} sx={{ my: 1 }} />
                        </Typography>
                        <Typography align="left" component="div" variant="subtitle2" sx={{ color: '#000000' }}>
                            <Skeleton variant="rectangular" width={100} sx={{ my: 1 }} />
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5">
                    <Skeleton variant="rectangular" width={80} height={40} sx={{ my: 1 }} />
                </Typography>
            </Grid>
            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5">
                    <Skeleton variant="rectangular" width={80} height={40} sx={{ my: 1 }} />
                </Typography>
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5">
                    <Skeleton variant="rectangular" width={80} height={40} sx={{ my: 1 }} />
                </Typography>
            </Grid>
            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Skeleton variant="rectangular" width={80} height={40} sx={{ my: 1, ml: 1 }} />
            </Grid>
            <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '5px' }}>
                <Skeleton variant="rectangular" width={50} height={40} sx={{ m: 1.5 }} />
                <Skeleton variant="rectangular" width={50} height={40} sx={{ m: 1.5 }} />
                <Skeleton variant="rectangular" width={50} height={40} sx={{ m: 1.5 }} />
                <Skeleton variant="rectangular" width={50} height={40} sx={{ m: 1.5 }} />
            </Grid>
        </Grid>
    ));
}

export function BranchTableLoader({ rows }) {
    return [...Array(rows)].map((elementInArray, index) => (
        <Grid key={index} container spacing={0} sx={{ backgroundColor: 'white', my: 1, padding: '5px 10px', borderRadius: '10px' }}>
            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item sx={{ mr: 2 }}>
                        <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                            <Skeleton variant="rectangular" width={30} height={40} sx={{ my: 1 }} />
                        </Typography>
                    </Grid>

                    <Grid item sx={{ ml: 0 }}>
                        <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                            <Skeleton variant="rectangular" width={100} height={40} sx={{ my: 1 }} />
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5">
                    <Skeleton variant="rectangular" width={80} height={40} sx={{ my: 1 }} />
                </Typography>
            </Grid>
            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5">
                    <Skeleton variant="rectangular" width={80} height={40} sx={{ my: 1 }} />
                </Typography>
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5">
                    <Skeleton variant="rectangular" width={80} height={40} sx={{ my: 1 }} />
                </Typography>
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5">
                    <Skeleton variant="rectangular" width={80} height={40} sx={{ my: 1 }} />
                </Typography>
            </Grid>
            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5" sx={{ color: '#60b253' }}>
                    <Skeleton variant="rectangular" width={100} height={40} sx={{ my: 1 }} />
                </Typography>
            </Grid>
            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Skeleton variant="rectangular" width={100} height={40} sx={{ my: 1 }} />
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center', paddingRight: '5px' }}>
                <Skeleton variant="rectangular" width={100} height={40} sx={{ m: 1.5 }} />
            </Grid>
        </Grid>
    ));
}

export function BranchTargetTableLoader({ rows }) {
    return [...Array(rows)].map((elementInArray, index) => (
        <Grid key={index} container spacing={0} sx={{ backgroundColor: 'white', my: 1, padding: '5px 10px', borderRadius: '10px' }}>
            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item sx={{ mr: 2 }}>
                        <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                            <Skeleton variant="rectangular" width={30} height={40} sx={{ my: 1 }} />
                        </Typography>
                    </Grid>

                    <Grid item sx={{ ml: 0 }}>
                        <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                            <Skeleton variant="rectangular" width={100} height={40} sx={{ my: 1 }} />
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5">
                    <Skeleton variant="rectangular" width={80} height={40} sx={{ my: 1 }} />
                </Typography>
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5">
                    <Skeleton variant="rectangular" width={80} height={40} sx={{ my: 1 }} />
                </Typography>
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5">
                    <Skeleton variant="rectangular" width={80} height={40} sx={{ my: 1 }} />
                </Typography>
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5">
                    <Skeleton variant="rectangular" width={80} height={40} sx={{ my: 1 }} />
                </Typography>
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5" sx={{ color: '#60b253' }}>
                    <Skeleton variant="rectangular" width={80} height={40} sx={{ my: 1 }} />
                </Typography>
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5" sx={{ color: '#60b253' }}>
                    <Skeleton variant="rectangular" width={80} height={40} sx={{ my: 1 }} />
                </Typography>
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5" sx={{ color: '#60b253' }}>
                    <Skeleton variant="rectangular" width={80} height={40} sx={{ my: 1 }} />
                </Typography>
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5" sx={{ color: '#60b253' }}>
                    <Skeleton variant="rectangular" width={80} height={40} sx={{ my: 1 }} />
                </Typography>
            </Grid>
            {/* <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5" sx={{ color: '#60b253' }}>
                    <Skeleton variant="rectangular" width={80} height={40} sx={{ my: 1 }} />
                </Typography>
            </Grid> */}
            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', paddingRight: '5px' }}>
                <Skeleton variant="rectangular" width={100} height={40} sx={{ m: 1.5 }} />
            </Grid>
        </Grid>
    ));
}

export function DepartmentTableLoader({ rows }) {
    return [...Array(rows)].map((elementInArray, index) => (
        <TableRow hover tabIndex={-1} key={index}>
            <TableCell align="left">
                <Skeleton variant="rectangular" width={40} sx={{ my: 1 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" sx={{ my: 1 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" width={50} sx={{ my: 1 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" sx={{ my: 1 }} />
            </TableCell>
        </TableRow>
    ));
}

export function TeamLeadTableLoader({ rows }) {
    return [...Array(rows)].map((elementInArray, index) => (
        <Grid key={index} container spacing={0} sx={{ backgroundColor: 'white', my: 1, padding: '5px 10px', borderRadius: '10px' }}>
            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item sx={{ mr: 2 }}>
                        <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                            <Skeleton variant="rectangular" width={30} height={40} sx={{ my: 1 }} />
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Skeleton variant="rectangular" width={50} height={50} sx={{ my: 1, borderRadius: '50%' }} />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                            <Skeleton variant="rectangular" width={150} sx={{ my: 1 }} />
                        </Typography>
                        <Typography align="left" component="div" variant="subtitle2" sx={{ color: '#000000' }}>
                            <Skeleton variant="rectangular" width={150} sx={{ my: 1 }} />
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5">
                    <Skeleton variant="rectangular" width={100} height={40} sx={{ my: 1 }} />
                </Typography>
            </Grid>
            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5">
                    <Skeleton variant="rectangular" width={100} height={40} sx={{ my: 1 }} />
                </Typography>
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5">
                    <Skeleton variant="rectangular" width={100} height={40} sx={{ my: 1 }} />
                </Typography>
            </Grid>
            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Skeleton variant="rectangular" width={100} height={40} sx={{ my: 1, ml: 1 }} />
            </Grid>
            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '5px' }}>
                <Skeleton variant="rectangular" width={100} height={40} sx={{ m: 1.5 }} />
                <Skeleton variant="rectangular" width={100} height={40} sx={{ m: 1.5 }} />
            </Grid>
        </Grid>
    ));
}

export function BDTableLoader({ rows }) {
    return [...Array(rows)].map((elementInArray, index) => (
        <Grid key={index} container spacing={0} sx={{ backgroundColor: 'white', my: 1, padding: '5px 10px', borderRadius: '10px' }}>
            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item sx={{ mr: 2 }}>
                        <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                            <Skeleton variant="rectangular" width={30} height={40} sx={{ my: 1 }} />
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Skeleton variant="rectangular" width={50} height={50} sx={{ my: 1, borderRadius: '50%' }} />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                            <Skeleton variant="rectangular" width={150} sx={{ my: 1 }} />
                        </Typography>
                        <Typography align="left" component="div" variant="subtitle2" sx={{ color: '#000000' }}>
                            <Skeleton variant="rectangular" width={150} sx={{ my: 1 }} />
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Skeleton variant="rectangular" width={80} height={40} sx={{ my: 1 }} />
            </Grid>
            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Skeleton variant="rectangular" width={80} height={40} sx={{ my: 1 }} />
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Skeleton variant="rectangular" width={80} height={40} sx={{ my: 1 }} />
            </Grid>
            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Skeleton variant="rectangular" width={80} height={40} sx={{ my: 1, ml: 1 }} />
            </Grid>
            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '5px' }}>
                <Skeleton variant="rectangular" width={100} height={40} sx={{ m: 1.5 }} />
                <Skeleton variant="rectangular" width={100} height={40} sx={{ m: 1.5 }} />
            </Grid>
        </Grid>
    ));
}

export function BDETableTargetLoader({ rows }) {
    return [...Array(rows)].map((elementInArray, index) => (
        <Grid key={index} container spacing={0} sx={{ backgroundColor: 'white', my: 1, padding: '5px 10px', borderRadius: '10px' }}>
            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid md={1} item sx={{ mr: 2 }}>
                        <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                            <Skeleton variant="rectangular" width={30} height={40} sx={{ my: 1 }} />
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Skeleton variant="rectangular" width={50} height={50} sx={{ my: 1, borderRadius: '50%' }} />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                            <Skeleton variant="rectangular" width={100} sx={{ my: 1 }} />
                        </Typography>
                        <Typography align="left" component="div" variant="subtitle2" sx={{ color: '#000000' }}>
                            <Skeleton variant="rectangular" width={100} sx={{ my: 1 }} />
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Skeleton variant="rectangular" width={70} height={40} sx={{ my: 1 }} />
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Skeleton variant="rectangular" width={70} height={40} sx={{ my: 1 }} />
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Skeleton variant="rectangular" width={70} height={40} sx={{ my: 1 }} />
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Skeleton variant="rectangular" width={70} height={40} sx={{ my: 1 }} />
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Skeleton variant="rectangular" width={70} height={40} sx={{ my: 1 }} />
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Skeleton variant="rectangular" width={70} height={40} sx={{ my: 1 }} />
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Skeleton variant="rectangular" width={70} height={40} sx={{ my: 1 }} />
            </Grid>
            <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '5px' }}>
                <Skeleton variant="rectangular" width={100} height={40} sx={{ m: 1.5 }} />
                <Skeleton variant="rectangular" width={100} height={40} sx={{ m: 1.5 }} />
            </Grid>
        </Grid>
    ));
}

export function TargetTableLoader({ rows }) {
    return [...Array(rows)].map((elementInArray, index) => (
        <Grid key={index} container spacing={0} sx={{ backgroundColor: 'white', my: 1, padding: '5px 10px', borderRadius: '10px' }}>
            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid md={1} item sx={{ mr: 3 }}>
                        <Skeleton variant="rectangular" width={30} height={40} sx={{ my: 1 }} />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        <Skeleton variant="rectangular" width={180} height={40} sx={{ my: 1 }} />
                    </Grid>
                </Grid>
            </Grid>
            {/* <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Skeleton variant="rectangular" width={80} height={40} sx={{ my: 1 }} />
            </Grid> */}
            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Skeleton variant="rectangular" width={80} height={40} sx={{ my: 1 }} />
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Skeleton variant="rectangular" width={80} height={40} sx={{ my: 1 }} />
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Skeleton variant="rectangular" width={80} height={40} sx={{ my: 1 }} />
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Skeleton variant="rectangular" width={80} height={40} sx={{ my: 1, mx: 1 }} />
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Skeleton variant="rectangular" width={80} height={40} sx={{ my: 1, mx: 1 }} />
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Skeleton variant="rectangular" width={80} height={40} sx={{ my: 1, mx: 1 }} />
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Skeleton variant="rectangular" width={80} height={40} sx={{ my: 1, mx: 1 }} />
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Skeleton variant="rectangular" width={80} height={40} sx={{ my: 1, mx: 1 }} />
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '5px' }}>
                <Skeleton variant="rectangular" width={90} height={40} sx={{ m: 1.5 }} />
            </Grid>
        </Grid>
    ));
}

export function BDListTableLoader({ rows }) {
    return [...Array(rows)].map((elementInArray, index) => (
        <Grid key={index} container spacing={0} sx={{ backgroundColor: 'white', my: 1, padding: '5px 10px', borderRadius: '10px' }}>
            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item sx={{ mr: 0 }}>
                        <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                            <Skeleton variant="rectangular" width={30} height={40} sx={{ my: 1 }} />
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Skeleton variant="rectangular" width={50} height={50} sx={{ my: 1, borderRadius: '50%' }} />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                            <Skeleton variant="rectangular" width={150} sx={{ my: 1 }} />
                        </Typography>
                        <Typography align="left" component="div" variant="subtitle2" sx={{ color: '#000000' }}>
                            <Skeleton variant="rectangular" width={150} sx={{ my: 1 }} />
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Skeleton variant="rectangular" width={200} height={40} sx={{ my: 1 }} />
            </Grid>
            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Skeleton variant="rectangular" width={180} height={40} sx={{ my: 1 }} />
            </Grid>
            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Skeleton variant="rectangular" width={150} height={40} sx={{ my: 1 }} />
            </Grid>
        </Grid>
    ));
}

export function ProfileLoader() {
    return (
        <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'center', margin: '18px 0px' }}>
            <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Skeleton variant="rectangular" width={130} height={130} sx={{ my: 0.5, borderRadius: '50%' }} />
            </Grid>
            <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h3" component="div" sx={{ color: '#007DC3', fontSize: '23px', fontWeight: 600, cursor: 'pointer' }}>
                    <Skeleton variant="rectangular" width={180} sx={{ mb: 0.5 }} />
                </Typography>
            </Grid>
            <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Skeleton variant="rectangular" width={130} />
            </Grid>
        </Grid>
    );
}

export function HeaderLoader() {
    return (
        <Box sx={{ width: '100%', px: 3 }}>
            <Typography
                variant="h4"
                component="h4"
                sx={{ display: 'flex', justifyContent: 'center', pl: '10px', fontSize: '1.5rem', color: '#468ccc' }}
                align="center"
            >
                <Skeleton variant="rectangular" width={450} sx={{ mb: 0.5 }} />
            </Typography>
        </Box>
    );
}

export function CommonTableLoader({ rows }) {
    return [...Array(rows)].map((elementInArray, index) => (
        <Grid key={index} container spacing={0} sx={{ backgroundColor: 'white', my: 1, padding: '5px 10px', borderRadius: '10px' }}>
            <Grid item xs={8} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h5">
                    <Skeleton variant="rectangular" width={30} height={30} sx={{ my: 1 }} />
                </Typography>
                <Typography variant="h5" sx={{ ml: 2 }}>
                    <Skeleton variant="rectangular" width={250} height={30} sx={{ my: 1, ml: 2 }} />
                </Typography>
            </Grid>
            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '20px' }}>
                <Skeleton variant="rectangular" width={120} height={30} sx={{ m: 1.5 }} />
            </Grid>
        </Grid>
    ));
}
