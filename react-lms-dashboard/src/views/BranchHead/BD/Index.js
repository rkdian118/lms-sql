/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    Chip,
    FormControlLabel,
    Grid,
    InputAdornment,
    OutlinedInput,
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
import { connect, useSelector } from 'react-redux';
// import AddTeamLeadModels from './Models/AddTeamLeadModels';
// import TeamLeadDetails from './Models/TeamLeadDetails';
import Avatar1 from 'assets/images/users/avatar-1.png';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
// import AddClusterModels from './AddClusterModels';
import { BDGetApi, BDGetDetailsApi, BdStatusChangeApi } from 'store/slices/clusterAction';
import { BASE_URL } from 'config';
import { BDTableLoader } from 'ui-component/cards/Skeleton/TableLoader';
// import EditClusterModels from './EditClusterModels';
import UserImage from 'assets/images/users/img-user.png';
import AddBdModels from './AddBdModels';
import EditBdModels from './EditBdModels';
import DeleteBdModels from './DeleteBdModels';
import { openSnackbar } from 'store/slices/snackbar';
import { Stack, shouldForwardProp } from '@mui/system';
import { useTheme, styled } from '@mui/material/styles';
import { BDETableLoader } from 'ui-component/cards/Skeleton/BranchLoader';
import MuiTooltip from '@mui/material/Tooltip';
import {
    IconUsers,
    IconDashboard,
    IconSearch,
    IconAdjustmentsHorizontal,
    IconBook2,
    IconDeviceAnalytics,
    IconPhonePlus,
    IconFileRss,
    IconFilePlus,
    IconX
} from '@tabler/icons';
import AnimateButton from 'ui-component/extended/AnimateButton';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
    },
    // hide last border
    '&:last-of-type td, &:last-of-type th': {
        border: 0
    }
}));
const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
    width: '250px',
    // marginLeft: 16,
    // paddingLeft: 16,
    // paddingRight: 16,
    // height: '45px',
    // padding: '27px 16px',
    '& input': {
        background: 'transparent !important',
        paddingLeft: '4px !important'
    },

    [theme.breakpoints.down('lg')]: {
        width: '250px'
    },
    [theme.breakpoints.down('md')]: {
        width: '250px',
        // marginLeft: 4,
        background: theme.palette.mode === 'dark' ? theme.palette.dark[800] : '#fff'
    }
}));

const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(({ theme }) => ({
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    // background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
    // color: '#ea7b26',
    background: 'transparent',
    color: '#3e7dc3',
    '&:hover': {
        color: 'black'
        // background: '#3e7dc3',
    }
}));
const Index = ({ BdStatusChangeApi }) => {
    const newmenu = useSelector((state) => state.clusterAction);
    const { businessList, businessLoading } = newmenu;
    const theme = useTheme();
    const [openModel, setOpenModel] = useState(false);
    const [openEditModel, setOpenEditModel] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageLength, setPageLength] = useState(10);
    const [id, setId] = useState('');
    const [openDeleteModel, setOpenDeleteModel] = useState(false);
    const [deleteData, setDeleteData] = useState({});
    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(BDGetApi(currentPage + 1, pageLength, search));
    }, [pageLength]);

    const onPaginationHandle = async (e, newPage) => {
        setCurrentPage(newPage);
        dispatch(BDGetApi(newPage, pageLength, search));
    };

    const onSearchLead = (e) => {
        if (e.target.value.length > 2) {
            dispatch(BDGetApi(currentPage + 1, pageLength, e.target.value));
        }
        if (e.target.value.length === 0) {
            dispatch(BDGetApi(currentPage + 1, pageLength, ''));
        }
        setSearch(e.target.value);
        // dispatch(GetAllLeadListApi(currentPage + 1, pageLength, '', leadStatus, bdeData, clusterLeadData, leadType, startDate, endDate));
    };

    const onSearchReset = () => {
        setSearch('');
        // console.log('Clear');
        dispatch(BDGetApi(currentPage + 1, pageLength, ''));
    };

    const onChangeStatus = (data) => {
        const newData = { bd_id: data._id, status: data.status === '1' ? '2' : '1' };
        BdStatusChangeApi(newData).then((res) => {
            if (res.succeeded === true) {
                dispatch(BDGetApi(currentPage + 1, pageLength, search));
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
        dispatch(BDGetApi(currentPage + 1, pageLength, search));
    };

    const handleEditModel = (data) => {
        setId(data._id);
        setOpenEditModel(true);
        dispatch(BDGetDetailsApi(data._id));
    };

    const handleChangePage = (event, newPage) => {
        // console.log('🚀 newPage:', newPage);
        setCurrentPage(newPage);
        dispatch(BDGetApi(newPage + 1, pageLength, search));
    };

    const handleChangeRowsPerPage = (event) => {
        dispatch(BDGetApi(currentPage + 1, event.target.value, search));
        setPageLength(parseInt(event?.target.value));
        // setCurrentPage(newPage);
    };
    const onDeleteStatus = (data) => {
        setOpenDeleteModel(true);
        setDeleteData(data);
    };

    let { page } = businessList;
    page -= 1;
    return (
        <>
            <MainCard
                content={false}
                title={
                    <Stack direction="row">
                        <IconUsers sx={{ mr: 2 }} /> &nbsp; Business Development Executive List
                    </Stack>
                }
                sx={{ border: '0px solid', padding: '5px' }}
                secondary={
                    <Stack direction="row" spacing={2} alignItems="center">
                        <OutlineInputStyle
                            id="input-search-header"
                            value={search}
                            placeholder="Search"
                            startAdornment={
                                <InputAdornment position="start" sx={{ color: '#3e7dc3', background: '#e0f4ff' }}>
                                    <IconSearch stroke={2} size="1.5rem" color="#3e7dc3" />
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <HeaderAvatarStyle variant="rounded">
                                        <IconX stroke={1.5} size="1.5rem" onClick={() => onSearchReset()} />
                                    </HeaderAvatarStyle>
                                </InputAdornment>
                            }
                            aria-describedby="search-helper-text"
                            inputProps={{ 'aria-label': 'weight' }}
                            onChange={(e) => onSearchLead(e)}
                            size="small"
                        />
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
                                Add BDE <AddCircleRoundedIcon sx={{ ml: 1 }} />
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
                                <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                    CL Name
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
                            {!businessLoading && businessList?.docs?.length > 0 ? (
                                businessList?.docs?.map((row, i) => (
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
                                            <TableCell sx={{ py: 0.5 }}>
                                                {row?.cluster_lead?.name ? (
                                                    <Typography variant="h5">{row?.cluster_lead?.name}</Typography>
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
                                    {businessLoading === true ? (
                                        <BDETableLoader rows={10} />
                                    ) : (
                                        <TableRow>
                                            <TableCell sx={{ pr: 3 }} align="center" colSpan={8}>
                                                No Bde Found
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
                    count={businessList.totalDocs}
                    rowsPerPage={pageLength}
                    page={currentPage}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </MainCard>
            {openDeleteModel && <DeleteBdModels open={openDeleteModel} close={() => setOpenDeleteModel(false)} deleteData={deleteData} />}
            {openModel && <AddBdModels open={openModel} close={() => handleCloseModel()} />}
            {id && openEditModel && <EditBdModels bdId={id} open={openEditModel} close={() => handleCloseModel()} />}
        </>
    );
};

export default connect(null, { BdStatusChangeApi })(Index);
