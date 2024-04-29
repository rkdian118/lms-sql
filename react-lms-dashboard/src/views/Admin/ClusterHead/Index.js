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
import VisibilityIcon from '@mui/icons-material/Visibility';
// import AddClusterModels from './AddClusterModels';
import { ClusterLeadStatusChangeApi } from 'store/slices/clusterAction';
import { ClusterGetApi, ClusterStatusChangeApi, SwitchClusterBranchApi } from 'store/slices/adminAction';
import { BASE_URL } from 'config';
import { TeamLeadTableLoader } from 'ui-component/cards/Skeleton/TableLoader';
// import EditClusterModels from './EditClusterModels';
import UserImage from 'assets/images/users/avatar-2.png';
// import AddTeamLeadModels from './AddClusterLeadModels';
// import EditTeamLeadModels from './EditClusterLeadModels';
// import DeleteTeamLeadModels from './DeleteClusterLeadModels';
import { openSnackbar } from 'store/slices/snackbar';
import MuiTooltip from '@mui/material/Tooltip';
import { IconBrandAsana, IconReportAnalytics } from '@tabler/icons';
import { ClDSRTableLoader } from 'ui-component/cards/Skeleton/MuiTableLoader';
import moment from 'moment';
import { RoomTwoTone } from '@mui/icons-material';
import { useTheme, styled } from '@mui/material/styles';
import AnimateButton from 'ui-component/extended/AnimateButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import SwitchBranchModels from './SwitchBranchModels';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import GppBadIcon from '@mui/icons-material/GppBad';
import DeleteClusterModels from './DeleteClusterModels';
import AddClusterModels from './AddClusterModels';
import EditClusterModels from './EditClusterModels';
import { CluisterHeadTableLoader } from 'ui-component/cards/Skeleton/AdminLoader';
// import AddBranchModels from './AddBranchModels';
// import EditBranchModels from './EditBranchModels';

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
    const theme = useTheme();
    const { clusterList, clusterLoading } = useSelector((state) => state.adminAction);
    const [openModel, setOpenModel] = useState(false);
    const [openEditModel, setOpenEditModel] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageLength, setPageLength] = useState(10);
    const [id, setId] = useState('');
    const [openDeleteModel, setOpenDeleteModel] = useState(false);
    const [deleteData, setDeleteData] = useState({});
    const [openSwitchModel, setOpenSwticheModel] = useState(false);
    const [removeStatus, setRemoveStatus] = useState(true);

    useEffect(() => {
        dispatch(ClusterGetApi(currentPage + 1, pageLength));
    }, [currentPage, pageLength]);

    const onChangeStatus = (data) => {
        const newData = { cluster_id: data._id, status: data.status === '1' ? '2' : '1' };
        ClusterStatusChangeApi(newData).then((res) => {
            if (res.succeeded === true) {
                dispatch(ClusterGetApi(currentPage, pageLength));
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

    // const handleCloseModel = () => {
    //     setOpenModel(false);
    //     setId('');
    //     dispatch(ClusterGetApi(currentPage + 1, pageLength));
    // };

    // const handleEditModel = (data) => {
    //     setId(data._id);
    //     setOpenEditModel(true);
    //     dispatch(ClusterGetApi(currentPage + 1, pageLength));
    // };

    const handleChangePage = (event, newPage) => {
        // console.log('🚀 newPage:', newPage);
        setCurrentPage(newPage);
        dispatch(ClusterGetApi(newPage + 1, pageLength));
    };

    const handleChangeRowsPerPage = (event) => {
        dispatch(ClusterGetApi(currentPage + 1, event.target.value));
        setPageLength(parseInt(event?.target.value));
        // setCurrentPage(newPage);
    };
    const onDeleteStatus = (data) => {
        setOpenDeleteModel(true);
        setDeleteData(data);
    };

    const handleCloseModel = (type) => {
        setOpenModel(false);
        setId('');
        dispatch(ClusterGetApi(currentPage, pageLength));
    };

    const handleCloseSwitchModel = () => {
        setOpenSwticheModel(false);
        setId('');
        dispatch(ClusterGetApi(currentPage, pageLength));
    };

    const handleEditModel = (data) => {
        setId(data._id);
        setOpenEditModel(true);
        setOpenSwticheModel(false);
    };

    const handleSwitchModel = (data) => {
        setId(data._id);
        setOpenEditModel(false);
        setOpenSwticheModel(true);
    };
    const onRemoveBranch = (data) => {
        // console.log('🚀 data:', data);
        setRemoveStatus(false);

        const formData = {
            cluster_id: data?._id,
            current_branch_id: data?.branch_id?._id ? data?.branch_id?._id : '',
            new_branch_id: ''
        };
        if (!data?.branch_id?._id) {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Branch already removed',
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    transition: 'Fade',
                    anchorOrigin: { vertical: 'top', horizontal: 'right' }
                })
            );
            setRemoveStatus(true);
        } else {
            SwitchClusterBranchApi(formData).then((res) => {
                if (res.succeeded === true) {
                    setRemoveStatus(true);
                    dispatch(ClusterGetApi(currentPage, pageLength));
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: 'Branch removed successfully.',
                            // message: res.ResponseMessage,
                            variant: 'alert',
                            alert: {
                                color: 'success'
                            },
                            transition: 'Fade',
                            anchorOrigin: { vertical: 'top', horizontal: 'right' }
                        })
                    );
                } else {
                    setRemoveStatus(true);
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
        }
    };
    let { page } = clusterList;
    page -= 1;
    return (
        <>
            <MainCard
                content={false}
                title={
                    <Stack direction="row">
                        <IconBrandAsana sx={{ mr: 2 }} /> &nbsp; Cluster Head Management
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
                                Add Cluster Head <AddCircleRoundedIcon sx={{ ml: 1 }} />
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
                                    Username
                                </TableCell>
                                <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                    Secret Key
                                </TableCell>
                                <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                    Branch Name
                                </TableCell>
                                <TableCell sx={{ pr: 3, py: 2 }} align="center">
                                    Status
                                </TableCell>
                                <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                    Created By
                                </TableCell>
                                <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!clusterLoading && clusterList?.docs?.length > 0 ? (
                                clusterList?.docs?.map((row, i) => (
                                    <>
                                        <TableRow hover key={i} unmountOnExit>
                                            <TableCell sx={{ py: 0.5 }}>{page * pageLength + (i + 1)}</TableCell>
                                            <TableCell sx={{ py: 0.5 }}>
                                                <Grid container spacing={2} alignItems="left">
                                                    <Grid item>
                                                        <Avatar alt={row.branch_name} src={`${BASE_URL}${row.profile_pic}`} />
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
                                            <TableCell sx={{ py: 0.5 }}>{row?.username}</TableCell>
                                            <TableCell sx={{ py: 0.5 }}>{row?.secret_key}</TableCell>
                                            <TableCell sx={{ py: 0.5 }}>
                                                {row?.branch_id?.branch_name ? (
                                                    <Typography variant="h5"> {row?.branch_id?.branch_name}</Typography>
                                                ) : (
                                                    <Typography variant="h5" sx={{ color: '#E94B4B' }}>
                                                        Not Assigned
                                                    </Typography>
                                                )}
                                            </TableCell>
                                            <TableCell sx={{ py: 0.5 }} align="center">
                                                <FormControlLabel
                                                    value="bottom"
                                                    control={
                                                        <Switch
                                                            checked={row?.status === '1'}
                                                            color="primary"
                                                            onClick={() => onChangeStatus(row)}
                                                        />
                                                    }
                                                    label={
                                                        row?.status === '1' ? (
                                                            <Chip
                                                                label="Activated"
                                                                variant="outlined"
                                                                color="primary"
                                                                sx={{ cursor: 'pointer' }}
                                                            />
                                                        ) : (
                                                            <>
                                                                {row?.status === '2' ? (
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
                                            <TableCell sx={{ py: 0.5 }}>
                                                <Typography variant="h5" sx={{ color: '#60b253' }}>
                                                    {row?.admin_id?.name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="left" sx={{ py: 0.5 }}>
                                                <Box sx={{ display: 'flex' }}>
                                                    <AnimateButton scale={{ hover: 1.1, tap: 0.9 }}>
                                                        <MuiTooltip title="Switch Branch" arrow>
                                                            <SyncAltIcon
                                                                color="primary"
                                                                sx={{
                                                                    mx: 1,
                                                                    borderRadius: '10px',
                                                                    // width: '100%',
                                                                    boxShadow: theme.customShadows.primary,
                                                                    ':hover': {
                                                                        boxShadow: 'none'
                                                                    }
                                                                }}
                                                                onClick={() => handleSwitchModel(row)}
                                                            />
                                                        </MuiTooltip>
                                                    </AnimateButton>
                                                    <AnimateButton scale={{ hover: 1.1, tap: 0.9 }}>
                                                        <MuiTooltip title="Remove Branch" arrow>
                                                            <GppBadIcon
                                                                color="secondary"
                                                                sx={{
                                                                    mx: 1,
                                                                    borderRadius: '10px',
                                                                    // width: '100%',
                                                                    boxShadow: theme.customShadows.secondary,
                                                                    ':hover': {
                                                                        boxShadow: 'none'
                                                                    }
                                                                }}
                                                                onClick={() => onRemoveBranch(row)}
                                                                disabled={!removeStatus}
                                                            />
                                                        </MuiTooltip>
                                                    </AnimateButton>

                                                    <AnimateButton scale={{ hover: 1.1, tap: 0.9 }}>
                                                        <MuiTooltip title="Update Branch" arrow>
                                                            <EditIcon
                                                                color="success"
                                                                sx={{
                                                                    mx: 1,
                                                                    borderRadius: '10px',
                                                                    // width: '100%',
                                                                    boxShadow: theme.customShadows.success,
                                                                    ':hover': {
                                                                        boxShadow: 'none'
                                                                    }
                                                                }}
                                                                onClick={() => handleEditModel(row)}
                                                            />
                                                        </MuiTooltip>
                                                    </AnimateButton>
                                                    <AnimateButton scale={{ hover: 1.1, tap: 0.9 }}>
                                                        <MuiTooltip title="Delete Branch" arrow>
                                                            <DeleteOutlineIcon
                                                                color="error"
                                                                sx={{
                                                                    mx: 1,
                                                                    borderRadius: '10px',
                                                                    // width: '100%',
                                                                    background: 'transparent',
                                                                    boxShadow: theme.customShadows.error,
                                                                    ':hover': {
                                                                        boxShadow: 'none'
                                                                    }
                                                                }}
                                                                onClick={() => onDeleteStatus(row)}
                                                            />
                                                        </MuiTooltip>
                                                    </AnimateButton>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                ))
                            ) : (
                                <>
                                    {clusterLoading === true ? (
                                        <CluisterHeadTableLoader rows={10} />
                                    ) : (
                                        <TableRow>
                                            <TableCell sx={{ pr: 3 }} align="center" colSpan={7}>
                                                No Cluster Head Found
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
                    count={clusterList.totalDocs}
                    rowsPerPage={pageLength}
                    page={currentPage}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </MainCard>
            {openDeleteModel && (
                <DeleteClusterModels open={openDeleteModel} close={() => setOpenDeleteModel(false)} deleteData={deleteData} />
            )}
            {openModel && <AddClusterModels open={openModel} close={() => handleCloseModel()} />}
            {id && openEditModel && <EditClusterModels clusterId={id} open={openEditModel} close={() => handleCloseModel()} />}
            {id && openSwitchModel && <SwitchBranchModels clusterId={id} open={openSwitchModel} close={() => handleCloseSwitchModel()} />}
        </>
    );
};

export default connect(null, { ClusterGetApi, ClusterStatusChangeApi, SwitchClusterBranchApi })(Index);
