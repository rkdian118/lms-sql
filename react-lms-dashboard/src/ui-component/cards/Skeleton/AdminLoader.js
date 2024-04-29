import { Card, CardContent, Grid, Skeleton, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import MuiTypography from '@mui/material/Typography';
import { Table } from 'rsuite';
import MainCard from '../MainCard';
import { useTheme, styled } from '@mui/material/styles';

export function AdminListTableLoader({ rows }) {
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
        </TableRow>
    ));
}

export function BranchListTableLoader({ rows }) {
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
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
        </TableRow>
    ));
}

export function CluisterHeadTableLoader({ rows }) {
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

export function CountryLeadTableLoader({ rows }) {
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
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
        </TableRow>
    ));
}

export function AdminLeadsTableLoader({ rows }) {
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

export function ViewTargetLoader({ rows }) {
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
