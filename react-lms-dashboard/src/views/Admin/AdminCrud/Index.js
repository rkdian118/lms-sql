/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    Chip,
    FormControlLabel,
    Grid,
    Pagination,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { openPopupModel } from 'store/slices/menu';
import { dispatch } from 'store';
import { useSelector } from 'react-redux';
// import AddTeamLeadModels from './Models/AddTeamLeadModels';
// import TeamLeadDetails from './Models/TeamLeadDetails';
import Avatar1 from 'assets/images/users/avatar-1.png';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddAdminModels from './AddAdminModels';
import { AllAdminGetListApi } from 'store/slices/adminAction';
import { AdminTableLoader } from 'ui-component/cards/Skeleton/TableLoader';
import { BASE_URL } from 'config';
import { Stack } from '@mui/system';
import { IconBuildingArch } from '@tabler/icons';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useTheme, styled } from '@mui/material/styles';
import MuiTooltip from '@mui/material/Tooltip';
import { AdminListTableLoader } from 'ui-component/cards/Skeleton/AdminLoader';

const Index = () => {
    const theme = useTheme();
    const { adminList, adminLoading } = useSelector((state) => state.adminAction);
    const [openModel, setOpenModel] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageLength, setPageLength] = useState(10);

    useEffect(() => {
        dispatch(AllAdminGetListApi(currentPage + 1, pageLength));
    }, [currentPage, pageLength]);

    const handleCloseModel = () => {
        setOpenModel(false);
        dispatch(AllAdminGetListApi(currentPage + 1, pageLength));
    };

    const onPaginationHandle = async (e, newPage) => {
        setCurrentPage(newPage);
        dispatch(AllAdminGetListApi(newPage, pageLength));
    };
    const handleChangePage = (event, newPage) => {
        // console.log('🚀 newPage:', newPage);
        setCurrentPage(newPage);
        dispatch(AllAdminGetListApi(newPage + 1, pageLength));
        // dispatch(BDGetApi(newPage + 1, pageLength, search));
    };

    const handleChangeRowsPerPage = (event) => {
        // dispatch(BDGetApi(currentPage + 1, event.target.value, search));
        dispatch(AllAdminGetListApi(currentPage + 1, event.target.value));
        setPageLength(parseInt(event?.target.value));
        // setCurrentPage(newPage);
    };

    let { page } = adminList;
    page -= 1;
    return (
        <MainCard
            content={false}
            title={
                <Stack direction="row">
                    <IconBuildingArch sx={{ mr: 2 }} /> &nbsp; Admin Management
                </Stack>
            }
            secondary={
                <Stack direction="row" spacing={2} alignItems="center">
                    <AnimateButton scale={{ hover: 1.1, tap: 0.9 }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => setOpenModel(true)}
                            sx={{
                                px: 3,
                                mb: 1,
                                width: '100%',
                                boxShadow: theme.customShadows.secondary,
                                ':hover': {
                                    boxShadow: 'none'
                                }
                            }}
                        >
                            Add Admin <AddCircleRoundedIcon sx={{ ml: 1 }} />
                        </Button>
                    </AnimateButton>
                </Stack>
            }
        >
            <TableContainer>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                No
                            </TableCell>
                            <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                Name
                            </TableCell>
                            <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                Username
                            </TableCell>
                            <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                Secret Key
                            </TableCell>
                            <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                Email
                            </TableCell>
                            <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                Mobile
                            </TableCell>
                            {/* <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                Action
                            </TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!adminLoading && adminList?.docs?.length > 0 ? (
                            adminList?.docs?.map((row, i) => (
                                <>
                                    <TableRow hover key={i} unmountOnExit>
                                        <TableCell sx={{ py: 2 }}>{page * pageLength + (i + 1)}</TableCell>
                                        <TableCell sx={{ py: 2 }}>
                                            <Grid container spacing={2} alignItems="left">
                                                <Grid item>
                                                    <Avatar alt={row.name} src={`${BASE_URL}${row.profile_pic}`} />
                                                </Grid>
                                                <Grid item xs zeroMinWidth>
                                                    <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                                                        {row.name}
                                                    </Typography>
                                                    <Typography align="left" component="div" variant="subtitle2" sx={{ color: '#000000' }}>
                                                        {row?.emp_id} ({row?.designation})
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell sx={{ py: 2 }}>{row?.username}</TableCell>
                                        <TableCell sx={{ py: 2 }}>{row?.secret_key}</TableCell>
                                        <TableCell sx={{ py: 2 }}>{row?.email}</TableCell>
                                        <TableCell sx={{ py: 2 }}>{row?.mobile}</TableCell>
                                        {/* <TableCell align="left" sx={{ py: 2 }}>
                                            <MuiTooltip title="Update" arrow>
                                                <EditIcon
                                                    sx={{
                                                        color: '#00c853',
                                                        cursor: 'pointer',
                                                        '&:hover': {
                                                            color: '#b5dbff'
                                                        }
                                                    }}
                                                />
                                            </MuiTooltip>
                                            <MuiTooltip title="Delete" arrow>
                                                    <DeleteOutlineIcon
                                                        onClick={() => onDeleteStatus(row)}
                                                        sx={{
                                                            color: 'red',
                                                            cursor: 'pointer',
                                                            '&:hover': {
                                                                color: '#b5dbff'
                                                            }
                                                        }}
                                                    />
                                                </MuiTooltip>
                                        </TableCell> */}
                                    </TableRow>
                                </>
                            ))
                        ) : (
                            <>
                                {adminLoading === true ? (
                                    <AdminListTableLoader rows={10} />
                                ) : (
                                    <TableRow>
                                        <TableCell sx={{ pr: 3 }} align="center" colSpan={6}>
                                            No Admin Found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                // rows={rows}
                count={adminList.totalDocs}
                rowsPerPage={pageLength}
                page={currentPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {openModel && <AddAdminModels open={openModel} close={() => handleCloseModel()} />}
        </MainCard>
    );
};

export default Index;
