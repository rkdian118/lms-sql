import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Chip, FormControlLabel, Grid, Pagination, Switch, Typography } from '@mui/material';
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
import { BDGetApi, BdStatusChangeApi } from 'store/slices/clusterAction';
import { BASE_URL } from 'config';
import { BDTableLoader } from 'ui-component/cards/Skeleton/TableLoader';
// import EditClusterModels from './EditClusterModels';
import UserImage from 'assets/images/users/img-user.png';
import AddBdModels from './AddBdModels';
import EditBdModels from './EditBdModels';
import DeleteBdModels from './DeleteBdModels';
import { openSnackbar } from 'store/slices/snackbar';

const BdList = ({ BdStatusChangeApi }) => {
    const newmenu = useSelector((state) => state.clusterAction);
    const { businessList, businessLoading } = newmenu;

    const [openModel, setOpenModel] = useState(false);
    const [openEditModel, setOpenEditModel] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLength, setPageLength] = useState(10);
    const [id, setId] = useState('');
    const [openDeleteModel, setOpenDeleteModel] = useState(false);
    const [deleteData, setDeleteData] = useState({});

    useEffect(() => {
        dispatch(BDGetApi(currentPage, pageLength));
    }, [pageLength]);

    const onPaginationHandle = async (e, newPage) => {
        setCurrentPage(newPage);
        dispatch(BDGetApi(newPage, pageLength));
    };

    const onChangeStatus = (data) => {
        const newData = { bd_id: data._id, status: data.status === '1' ? '2' : '1' };
        BdStatusChangeApi(newData).then((res) => {
            if (res.succeeded === true) {
                dispatch(BDGetApi(1, pageLength));
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
        dispatch(BDGetApi(currentPage, pageLength));
    };
    const handleEditModel = (data) => {
        setId(data._id);
        setOpenEditModel(true);
        // dispatch(BDGetApi(currentPage, pageLength));
    };

    const onDeleteStatus = (data) => {
        setOpenDeleteModel(true);
        setDeleteData(data);
    };

    let { page } = businessList;
    page -= 1;
    return (
        <MainCard content={false} sx={{ border: '0px solid', padding: '0px' }}>
            <Grid container spacing={1}>
                <Grid item xs={12} md={10}>
                    <Typography
                        variant="h4"
                        align="center"
                        // p="10px"
                        // color="#4a873b"
                        sx={{
                            p: '20px 10px',
                            borderRadius: '4px',
                            color: '#4a873b',
                            background: '#cffea0'
                        }}
                    >
                        Business Development Executive Management
                    </Typography>
                </Grid>
                <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                        variant="contained"
                        sx={{
                            border: '0px solid #4a873b',
                            borderRadius: '5px',
                            color: '#4a873b',
                            background: '#cffea0',
                            p: '6px 25px',
                            '&:hover': {
                                background: '#4a873b',
                                color: '#cffea0'
                            }
                        }}
                        onClick={(e) => setOpenModel(true)}
                    >
                        Add BDE <AddCircleRoundedIcon sx={{ ml: 1 }} />
                    </Button>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Typography
                        align="center"
                        p="10px"
                        color="#4a873b"
                        sx={{
                            borderRadius: '4px',
                            // height: '780px',
                            color: '#4968a2',
                            background: '#cffea0'
                        }}
                    >
                        <Grid container spacing={0} sx={{ backgroundColor: 'white', my: 1, padding: '20px 10px', borderRadius: '10px' }}>
                            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Grid container spacing={2}>
                                    <Grid md={1} item sx={{ mr: 1 }}>
                                        <Typography variant="h5">No. </Typography>
                                    </Grid>

                                    <Grid item xs zeroMinWidth>
                                        <Typography variant="h5" align="left">
                                            Name
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5">Username</Typography>
                            </Grid>
                            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5">CL Name</Typography>
                            </Grid>
                            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5">Secret Key</Typography>
                            </Grid>
                            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5">Status</Typography>
                            </Grid>
                            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', paddingRight: '5px' }}>
                                <Typography variant="h5" align="center">
                                    Action
                                </Typography>
                            </Grid>
                        </Grid>
                        {!businessLoading && businessList.docs.length > 0 ? (
                            businessList.docs.map((list, i) => (
                                <Grid
                                    container
                                    spacing={0}
                                    sx={{ backgroundColor: 'white', my: 1, padding: '5px 10px', borderRadius: '10px' }}
                                    key={i}
                                >
                                    <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid md={1} item sx={{ mr: 1 }}>
                                                <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                                                    {/* {i + 1} */}
                                                    {page * pageLength + (i + 1)}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Avatar alt="Preview" src={`${BASE_URL}${list.profile_pic}`} />
                                                {/* <img alt="Preview" src={`${BaseURL}${list.profile_pic}`} /> */}
                                            </Grid>
                                            <Grid item xs zeroMinWidth>
                                                <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                                                    {list.name}
                                                </Typography>
                                                <Typography align="left" component="div" variant="subtitle2" sx={{ color: '#000000' }}>
                                                    {list?.emp_id} ({list?.designation})
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h5">{list?.username}</Typography>
                                    </Grid>
                                    <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {list?.cluster_lead?.name ? (
                                            <Typography variant="h5">{list?.cluster_lead?.name}</Typography>
                                        ) : (
                                            <Typography variant="h5" sx={{ color: '#E94B4B' }}>
                                                Not Assigned
                                            </Typography>
                                        )}
                                    </Grid>
                                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h5">{list.secret_key}</Typography>
                                    </Grid>
                                    <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <FormControlLabel
                                            value="bottom"
                                            control={
                                                <Switch
                                                    checked={list.status === '1'}
                                                    color="primary"
                                                    onClick={() => onChangeStatus(list)}
                                                />
                                            }
                                            label={
                                                list.status === '1' ? (
                                                    <Chip label="Activated" variant="outlined" color="primary" sx={{ cursor: 'pointer' }} />
                                                ) : (
                                                    <>
                                                        {list.status === '2' ? (
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
                                    </Grid>
                                    <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '5px' }}>
                                        {/* <Button
                                            variant="contained"
                                            sx={{
                                                background: '#cffea0',
                                                color: '#000000',
                                                padding: '5px 15px',
                                                my: '15px',
                                                borderRadius: '8px',
                                                '&:hover': {
                                                    background: '#9bf541',
                                                    color: '#000000'
                                                }
                                            }}
                                            // onClick={() => handleEditModel(list)}
                                        >
                                            <VisibilityIcon sx={{ mr: 1 }} /> View
                                        </Button>{' '} */}
                                        <Button
                                            variant="contained"
                                            sx={{
                                                background: '#cffea0',
                                                color: '#000000',
                                                padding: '5px 15px',
                                                my: '15px',
                                                ml: 1,
                                                borderRadius: '8px',
                                                '&:hover': {
                                                    background: '#9bf541',
                                                    color: '#000000'
                                                }
                                            }}
                                            onClick={() => handleEditModel(list)}
                                        >
                                            <EditIcon sx={{ mr: 1 }} /> Edit
                                        </Button>{' '}
                                        <Button
                                            variant="contained"
                                            sx={{
                                                background: '#cffea0',
                                                color: '#000000',
                                                padding: '5px 15px',
                                                my: '15px',
                                                ml: 1,
                                                borderRadius: '8px',
                                                '&:hover': {
                                                    background: '#9bf541',
                                                    color: '#000000'
                                                }
                                            }}
                                            onClick={() => onDeleteStatus(list)}
                                        >
                                            <DeleteOutlineIcon sx={{ mr: 1 }} /> Delete
                                        </Button>
                                    </Grid>
                                </Grid>
                            ))
                        ) : (
                            <>
                                {businessLoading === true ? (
                                    <BDTableLoader rows={10} />
                                ) : (
                                    <Grid
                                        container
                                        spacing={0}
                                        sx={{ backgroundColor: 'white', my: 1, padding: '5px 10px', borderRadius: '10px' }}
                                    >
                                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <Typography
                                                align="center"
                                                component="div"
                                                variant="subtitle1"
                                                sx={{ color: '#000000', p: '10px' }}
                                            >
                                                No Business Development Executive Found
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                )}
                            </>
                        )}
                    </Typography>
                </Grid>
                {/* {!businessLoading && businessList.totalDocs > 10 ? ( */}
                <Grid item xs={12} md={12} sx={{ my: '10px' }}>
                    <Pagination
                        align="right"
                        sx={{ float: 'right', '& .Mui-selected': { borderRadius: '50%', backgroundColor: `#b5dbff` } }}
                        color="success"
                        shape="rounded"
                        count={businessList.totalPages}
                        page={currentPage}
                        onChange={onPaginationHandle}
                    />
                </Grid>
                {/* ) : (
                    ''
                )} */}
            </Grid>
            {openDeleteModel && <DeleteBdModels open={openDeleteModel} close={() => setOpenDeleteModel(false)} deleteData={deleteData} />}
            {openModel && <AddBdModels open={openModel} close={() => handleCloseModel()} />}
            {id && openEditModel && <EditBdModels bdId={id} open={openEditModel} close={() => handleCloseModel()} />}
        </MainCard>
    );
};

export default connect(null, { BdStatusChangeApi })(BdList);
