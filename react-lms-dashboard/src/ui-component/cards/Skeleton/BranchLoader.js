import { Card, CardContent, Grid, Skeleton, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import MuiTypography from '@mui/material/Typography';
import { Table } from 'rsuite';
import MainCard from '../MainCard';
import { useTheme, styled } from '@mui/material/styles';

export function ClusterLeadTableLoader({ rows }) {
    return [...Array(rows)].map((elementInArray, index) => (
        <TableRow hover tabIndex={-1} key={index}>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Grid container spacing={2} alignItems="left">
                    <Grid item xs={3}>
                        <Skeleton variant="rectangular" height={40} width={40} sx={{ my: 0, borderRadius: '50%' }} />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                            <Skeleton variant="rectangular" height={20} sx={{ my: 0 }} />
                        </Typography>
                        <Typography align="left" component="div" variant="subtitle2" sx={{ color: '#000000' }}>
                            <Skeleton variant="rectangular" height={10} sx={{ my: 0.5 }} />
                        </Typography>
                    </Grid>
                </Grid>
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
        </TableRow>
    ));
}

export function BDETableLoader({ rows }) {
    return [...Array(rows)].map((elementInArray, index) => (
        <TableRow hover tabIndex={-1} key={index}>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Grid container spacing={2} alignItems="left">
                    <Grid item xs={3}>
                        <Skeleton variant="rectangular" height={40} width={40} sx={{ my: 0, borderRadius: '50%' }} />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                            <Skeleton variant="rectangular" height={20} sx={{ my: 0 }} />
                        </Typography>
                        <Typography align="left" component="div" variant="subtitle2" sx={{ color: '#000000' }}>
                            <Skeleton variant="rectangular" height={10} sx={{ my: 0.5 }} />
                        </Typography>
                    </Grid>
                </Grid>
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
        </TableRow>
    ));
}

export function BDTargetsTableLoader({ rows }) {
    return [...Array(rows)].map((elementInArray, index) => (
        <TableRow hover tabIndex={-1} key={index}>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Grid container spacing={2} alignItems="left">
                    <Grid item xs={4}>
                        <Skeleton variant="rectangular" height={40} width={40} sx={{ my: 0, borderRadius: '50%' }} />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                            <Skeleton variant="rectangular" height={20} sx={{ my: 0 }} />
                        </Typography>
                        <Typography align="left" component="div" variant="subtitle2" sx={{ color: '#000000' }}>
                            <Skeleton variant="rectangular" height={10} sx={{ my: 0.5 }} />
                        </Typography>
                    </Grid>
                </Grid>
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
        </TableRow>
    ));
}

export function GetTargetCardLoader({ rows }) {
    // const theme = useTheme();
    return [...Array(rows)].map((elementInArray, index) => (
        <Grid tabIndex={-1} item xs={6} md={4}>
            <Card sx={{ p: 2 }}>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ p: 0 }} component="th" scope="row">
                                    <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
                                </TableCell>
                                <TableCell align="center" sx={{ px: 0, py: 1 }}>
                                    <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
                                </TableCell>
                                <TableCell align="center" sx={{ px: 0, py: 1 }}>
                                    <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
                                </TableCell>
                                <TableCell align="center" sx={{ px: 0, py: 1 }}>
                                    <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell sx={{ p: 0 }} component="th" scope="row">
                                    <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
                                </TableCell>
                                <TableCell align="center" sx={{ px: 0, py: 1 }}>
                                    <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
                                </TableCell>
                                <TableCell align="center" sx={{ px: 0, py: 1 }}>
                                    <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
                                </TableCell>
                                <TableCell align="center" sx={{ px: 0, py: 1 }}>
                                    <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ p: 0 }} component="th" scope="row">
                                    <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
                                </TableCell>
                                <TableCell align="center" sx={{ px: 0, py: 1 }}>
                                    <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
                                </TableCell>
                                <TableCell align="center" sx={{ px: 0, py: 1 }}>
                                    <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
                                </TableCell>
                                <TableCell align="center" sx={{ px: 0, py: 1 }}>
                                    <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Grid>
    ));
}

export function GetRfpTableLoader({ rows }) {
    return [...Array(rows)].map((elementInArray, index) => (
        <TableRow hover tabIndex={-1} key={index}>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
        </TableRow>
    ));
}

export function GetProposalTableLoader({ rows }) {
    return [...Array(rows)].map((elementInArray, index) => (
        <TableRow hover tabIndex={-1} key={index}>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
        </TableRow>
    ));
}

export function BDSRTableLoader({ rows }) {
    return [...Array(rows)].map((elementInArray, index) => (
        <TableRow hover tabIndex={-1} key={index}>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
        </TableRow>
    ));
}

export function CLDSRTableLoader({ rows }) {
    return [...Array(rows)].map((elementInArray, index) => (
        <TableRow hover tabIndex={-1} key={index}>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
        </TableRow>
    ));
}

export function BHDSRTableLoader({ rows }) {
    return [...Array(rows)].map((elementInArray, index) => (
        <TableRow hover tabIndex={-1} key={index}>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
        </TableRow>
    ));
}

export function PerformerLoader({ rows }) {
    return [...Array(rows)].map((elementInArray, index) => (
        <Grid item xs={12} tabIndex={-1} key={index}>
            {/* <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} /> */}
            <Grid container spacing={2}>
                <Grid item>
                    <Box sx={{ position: 'relative' }}>
                        <Skeleton variant="rectangular" width={40} height={40} sx={{ my: 0, borderRadius: '50%' }} />
                    </Box>
                </Grid>
                <Grid item xs zeroMinWidth>
                    <Typography align="left" component="div" variant="subtitle1">
                        <Skeleton variant="rectangular" height={20} sx={{ my: 0.5 }} />
                    </Typography>
                    <Typography align="left" component="div" variant="subtitle2">
                        <Skeleton variant="rectangular" height={10} sx={{ my: 0.5 }} />
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    ));
}
export function PieGraphLoader({ rows }) {
    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Typography align="left" component="div" variant="subtitle2" sx={{ height: '315px' }}>
                <Skeleton variant="rectangular" height="!00%" sx={{ my: 0.5 }} />
            </Typography>
        </Box>
    );
}

export function ViewBranchTargetLoader({ rows }) {
    return [...Array(rows)].map((elementInArray, index) => (
        <TableBody tabIndex={-1} key={index}>
            <TableRow>
                <TableCell>
                    <Skeleton variant="rectangular" height={30} sx={{ mx: 2 }} />
                </TableCell>
                <TableCell colSpan={5} align="center">
                    <Skeleton variant="rectangular" height={30} sx={{ mx: 0 }} />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>
                    <Skeleton variant="rectangular" height={30} sx={{ mx: 2 }} />
                </TableCell>
                <TableCell align="center" sx={{ px: 0, py: 1 }}>
                    <Skeleton variant="rectangular" height={30} sx={{ mx: 2 }} />
                </TableCell>
                <TableCell align="center" sx={{ px: 0, py: 1 }}>
                    <Skeleton variant="rectangular" height={30} sx={{ mx: 2 }} />
                </TableCell>
                <TableCell align="center" sx={{ px: 0, py: 1 }}>
                    <Skeleton variant="rectangular" height={30} sx={{ mx: 2 }} />
                </TableCell>
                <TableCell align="center" sx={{ px: 0, py: 1 }}>
                    <Skeleton variant="rectangular" height={30} sx={{ mx: 2 }} />
                </TableCell>
                <TableCell align="center" sx={{ px: 0, py: 1 }}>
                    <Skeleton variant="rectangular" height={30} sx={{ mx: 2 }} />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell component="th" scope="row">
                    <Skeleton variant="rectangular" height={30} sx={{ mx: 2 }} />
                </TableCell>
                <TableCell align="center" sx={{ px: 0, py: 1 }}>
                    <Skeleton variant="rectangular" height={30} sx={{ mx: 2 }} />
                </TableCell>
                <TableCell align="center" sx={{ px: 0, py: 1 }}>
                    <Skeleton variant="rectangular" height={30} sx={{ mx: 2 }} />
                </TableCell>
                <TableCell align="center" sx={{ px: 0, py: 1 }}>
                    <Skeleton variant="rectangular" height={30} sx={{ mx: 2 }} />
                </TableCell>
                <TableCell align="center" sx={{ px: 0, py: 1 }}>
                    <Skeleton variant="rectangular" height={30} sx={{ mx: 2 }} />
                </TableCell>
                <TableCell align="center" sx={{ px: 0, py: 1 }}>
                    <Skeleton variant="rectangular" height={30} sx={{ mx: 2 }} />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell component="th" scope="row">
                    <Skeleton variant="rectangular" height={30} sx={{ mx: 2 }} />
                </TableCell>
                <TableCell align="center" sx={{ px: 0, py: 1 }}>
                    <Skeleton variant="rectangular" height={30} sx={{ mx: 2 }} />
                </TableCell>
                <TableCell align="center" sx={{ px: 0, py: 1 }}>
                    <Skeleton variant="rectangular" height={30} sx={{ mx: 2 }} />
                </TableCell>
                <TableCell align="center" sx={{ px: 0, py: 1 }}>
                    <Skeleton variant="rectangular" height={30} sx={{ mx: 2 }} />
                </TableCell>
                <TableCell align="center" sx={{ px: 0, py: 1 }}>
                    <Skeleton variant="rectangular" height={30} sx={{ mx: 2 }} />
                </TableCell>
                <TableCell align="center" sx={{ px: 0, py: 1 }}>
                    <Skeleton variant="rectangular" height={30} sx={{ mx: 2 }} />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell component="th" scope="row">
                    <Skeleton variant="rectangular" height={30} sx={{ mx: 2 }} />
                </TableCell>
                <TableCell align="center" sx={{ px: 0, py: 1 }}>
                    <Skeleton variant="rectangular" height={30} sx={{ mx: 2 }} />
                </TableCell>
                <TableCell align="center" sx={{ px: 0, py: 1 }}>
                    <Skeleton variant="rectangular" height={30} sx={{ mx: 2 }} />
                </TableCell>
                <TableCell align="center" sx={{ px: 0, py: 1 }}>
                    <Skeleton variant="rectangular" height={30} sx={{ mx: 2 }} />
                </TableCell>
                <TableCell align="center" sx={{ px: 0, py: 1 }}>
                    <Skeleton variant="rectangular" height={30} sx={{ mx: 2 }} />
                </TableCell>
                <TableCell align="center" sx={{ px: 0, py: 1 }}>
                    <Skeleton variant="rectangular" height={30} sx={{ mx: 2 }} />
                </TableCell>
            </TableRow>
        </TableBody>
    ));
}
