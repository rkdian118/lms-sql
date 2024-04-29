import { CardContent, Grid, Skeleton, TableCell, TableRow } from '@mui/material';
// import { Box } from '@mui/system';
import React from 'react';
// import MuiTypography from '@mui/material/Typography';
// import { Table } from 'rsuite';
import MainCard from '../MainCard';

export function GetCoutryLeadsTableLoader({ rows }) {
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
            <TableCell align="left">
                <Skeleton variant="rectangular" height={30} sx={{ my: 0 }} />
            </TableCell>
        </TableRow>
    ));
}
