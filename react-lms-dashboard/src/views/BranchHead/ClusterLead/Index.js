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
    Stack,
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
import { connect, useSelector } from 'react-redux';
// import AddTeamLeadModels from './Models/AddTeamLeadModels';
// import TeamLeadDetails from './Models/TeamLeadDetails';
import Avatar1 from 'assets/images/users/avatar-1.png';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
// import AddClusterModels from './AddClusterModels';
import { ClusterLeadGetApi, ClusterLeadGetDetailsApi, ClusterLeadStatusChangeApi } from 'store/slices/clusterAction';
import { BASE_URL } from 'config';
import { TeamLeadTableLoader } from 'ui-component/cards/Skeleton/TableLoader';
// import EditClusterModels from './EditClusterModels';
import UserImage from 'assets/images/users/avatar-2.png';
import AddTeamLeadModels from './AddClusterLeadModels';
import EditTeamLeadModels from './EditClusterLeadModels';
import { openSnackbar } from 'store/slices/snackbar';
import DeleteTeamLeadModels from './DeleteClusterLeadModels';
import MuiTooltip from '@mui/material/Tooltip';
import { IconBrandAsana, IconReportAnalytics } from '@tabler/icons';
import { ClDSRTableLoader } from 'ui-component/cards/Skeleton/MuiTableLoader';
import moment from 'moment';
import { RoomTwoTone } from '@mui/icons-material';
import { useTheme, styled } from '@mui/material/styles';
import { ClusterLeadTableLoader } from 'ui-component/cards/Skeleton/BranchLoader';
import AnimateButton from 'ui-component/extended/AnimateButton';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // '&:nth-of-type(odd)': {
    //     backgroundColor: theme.palette.action.hover
    // },
    // hide last border
    '&:last-of-type td, &:last-of-type th': {
        border: 0
    }
}));

const Index = ({ ClusterLeadStatusChangeApi }) => {
    const newmenu = useSelector((state) => state.clusterAction);
    const { clusterLeadList, clusterLeadLoading } = newmenu;
    const theme = useTheme();
    const [openModel, setOpenModel] = useState(false);
    const [openEditModel, setOpenEditModel] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageLength, setPageLength] = useState(10);
    const [id, setId] = useState('');
    const [openDeleteModel, setOpenDeleteModel] = useState(false);
    const [deleteData, setDeleteData] = useState({});

    useEffect(() => {
        dispatch(ClusterLeadGetApi(currentPage + 1, pageLength));
    }, [currentPage, pageLength]);

    const onChangeStatus = (data) => {
        const newData = { cluster_lead_id: data._id, status: data.status === '1' ? '2' : '1' };
        ClusterLeadStatusChangeApi(newData).then((res) => {
            if (res.succeeded === true) {
                dispatch(ClusterLeadGetApi(currentPage + 1, pageLength));
                dispatch(
                    openSnackbar({
                        open: true,
                        message: res.ResponseMessage,
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        },
                        transition: 'Fade',
                        anchorOrigin: { vertical: 'top', horizontal: 'right' }
                    })
                );
            } else {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: res.ResponseMessage,
                        variant: 'alert',
                        alert: {
                            color: 'error'
                        },
                        transition: 'Fade',
                        anchorOrigin: { vertical: 'top', horizontal: 'right' }
                    })
                );
            }
        });
    };

    const handleCloseModel = () => {
        setOpenModel(false);
        setId('');
        dispatch(ClusterLeadGetApi(currentPage + 1, pageLength));
    };

    const handleEditModel = (data) => {
        setId(data._id);
        setOpenEditModel(true);
        // dispatch(ClusterLeadGetApi(currentPage + 1, pageLength));
        dispatch(ClusterLeadGetDetailsApi(data._id));
    };

    const onDeleteStatus = (data) => {
        setOpenDeleteModel(true);
        setDeleteData(data);
    };
    const handleChangePage = (event, newPage) => {
        // console.log('🚀 newPage:', newPage);
        setCurrentPage(newPage);
        dispatch(ClusterLeadGetApi(newPage + 1, pageLength));
    };

    const handleChangeRowsPerPage = (event) => {
        dispatch(ClusterLeadGetApi(currentPage + 1, event.target.value));
        setPageLength(parseInt(event?.target.value));
        // setCurrentPage(newPage);
    };

    let { page } = clusterLeadList;
    page -= 1;
    return (
        <>
            <MainCard
                content={false}
                title={
                    <Stack direction="row">
                        <IconBrandAsana sx={{ mr: 2 }} /> &nbsp; Cluster Lead
                    </Stack>
                }
                sx={{ border: '0px solid', padding: '5px' }}
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
                                Add Cluster Lead <AddCircleRoundedIcon sx={{ ml: 1 }} />
                            </Button>
                        </AnimateButton>
                    </Stack>
                }
            >
                {/* table */}
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
                                    Mobile
                                </TableCell>
                                <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                    Username
                                </TableCell>
                                <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                    Secret Key
                                </TableCell>
                                <TableCell sx={{ pr: 3, py: 2 }} align="center">
                                    Status
                                </TableCell>
                                <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!clusterLeadLoading && clusterLeadList?.docs?.length > 0 ? (
                                clusterLeadList?.docs?.map((row, i) => (
                                    <>
                                        <TableRow hover key={i} unmountOnExit>
                                            <TableCell sx={{ py: 0.5 }}>{page * pageLength + (i + 1)}</TableCell>
                                            <TableCell sx={{ py: 0.5 }}>
                                                <Grid container spacing={2} alignItems="left">
                                                    <Grid item>
                                                        <Avatar alt={row.name} src={`${BASE_URL}${row.profile_pic}`} />
                                                    </Grid>
                                                    <Grid item xs zeroMinWidth>
                                                        <Typography
                                                            align="left"
                                                            component="div"
                                                            variant="subtitle1"
                                                            sx={{ color: '#000000' }}
                                                        >
                                                            {row.name}
                                                        </Typography>
                                                        <Typography
                                                            align="left"
                                                            component="div"
                                                            variant="subtitle2"
                                                            sx={{ color: '#000000' }}
                                                        >
                                                            {row?.emp_id} ({row?.designation})
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                            <TableCell sx={{ py: 0.5 }}>{row?.mobile}</TableCell>
                                            <TableCell sx={{ py: 0.5 }}>{row?.username}</TableCell>
                                            <TableCell sx={{ py: 0.5 }}>{row?.secret_key}</TableCell>
                                            <TableCell sx={{ py: 0.5 }} align="center">
                                                <FormControlLabel
                                                    value="bottom"
                                                    control={
                                                        <Switch
                                                            checked={row.status === '1'}
                                                            color="primary"
                                                            onClick={() => onChangeStatus(row)}
                                                        />
                                                    }
                                                    label={
                                                        row.status === '1' ? (
                                                            <Chip
                                                                label="Activated"
                                                                variant="outlined"
                                                                color="primary"
                                                                sx={{ cursor: 'pointer' }}
                                                            />
                                                        ) : (
                                                            <>
                                                                {row.status === '2' ? (
                                                                    <Chip
                                                                        label="Deactivated"
                                                                        variant="outlined"
                                                                        color="secondary"
                                                                        sx={{ cursor: 'pointer' }}
                                                                    />
                                                                ) : (
                                                                    <Chip
                                                                        label="Deleted"
                                                                        variant="outlined"
                                                                        color="error"
                                                                        sx={{ cursor: 'pointer' }}
                                                                    />
                                                                )}
                                                            </>
                                                        )
                                                    }
                                                    labelPlacement="bottom"
                                                />
                                            </TableCell>
                                            <TableCell align="left" sx={{ py: 0.5 }}>
                                                <MuiTooltip title="Update" arrow>
                                                    <EditIcon
                                                        onClick={() => handleEditModel(row)}
                                                        sx={{
                                                            color: '#00c853',
                                                            cursor: 'pointer',
                                                            '&:hover': {
                                                                color: '#b5dbff'
                                                            }
                                                        }}
                                                    />
                                                </MuiTooltip>
                                                {/* <MuiTooltip title="Delete" arrow>
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
                                                </MuiTooltip> */}
                                            </TableCell>
                                        </TableRow>
                                    </>
                                ))
                            ) : (
                                <>
                                    {clusterLeadLoading === true ? (
                                        <ClusterLeadTableLoader rows={10} />
                                    ) : (
                                        <TableRow>
                                            <TableCell sx={{ pr: 3 }} align="center" colSpan={7}>
                                                No Cluster Lead Found
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
                    count={clusterLeadList.totalDocs}
                    rowsPerPage={pageLength}
                    page={currentPage}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </MainCard>

            {openDeleteModel && (
                <DeleteTeamLeadModels open={openDeleteModel} close={() => setOpenDeleteModel(false)} deleteData={deleteData} />
            )}
            {openModel && <AddTeamLeadModels open={openModel} close={() => handleCloseModel()} />}
            {id && openEditModel && <EditTeamLeadModels teamLeadId={id} open={openEditModel} close={() => handleCloseModel()} />}
        </>
    );
};

export default connect(null, { ClusterLeadGetApi, ClusterLeadStatusChangeApi })(Index);
