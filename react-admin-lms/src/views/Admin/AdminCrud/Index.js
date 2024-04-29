import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Chip, Grid, Pagination, Switch, Typography } from '@mui/material';
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

const Index = () => {
    const newmenu = useSelector((state) => state.adminAction);
    const { adminList, adminLoading } = newmenu;
    const [openModel, setOpenModel] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLength, setPageLength] = useState(10);

    useEffect(() => {
        dispatch(AllAdminGetListApi(currentPage, pageLength));
    }, [currentPage, pageLength]);

    const handleCloseModel = () => {
        setOpenModel(false);
        dispatch(AllAdminGetListApi(currentPage, pageLength));
    };

    const onPaginationHandle = async (e, newPage) => {
        setCurrentPage(newPage);
        dispatch(AllAdminGetListApi(newPage, pageLength));
    };

    let { page } = adminList;
    page -= 1;
    return (
        <MainCard content={false} sx={{ border: '0px solid', padding: '10px' }}>
            <Grid container spacing={1}>
                <Grid item xs={12} md={10}>
                    <Typography
                        variant="h4"
                        align="center"
                        // p="10px"
                        color="#b276a8"
                        sx={{
                            p: '20px 10px',
                            borderRadius: '4px',
                            color: '#4968a2',
                            background: '#b5dbff'
                        }}
                    >
                        Admin Management
                    </Typography>
                </Grid>
                <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                        variant="contained"
                        sx={{
                            border: '1px solid #3e7dc3',
                            color: '#3e7dc3',
                            borderRadius: '5px',
                            background: '#e0f4ff',
                            p: '6px 25px',
                            '&:hover': {
                                background: '#3e7dc3',
                                color: '#e0f4ff'
                            }
                        }}
                        onClick={(e) => setOpenModel(true)}
                    >
                        Add Admin <AddCircleRoundedIcon sx={{ ml: 1 }} />
                    </Button>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography
                        align="center"
                        p="10px"
                        color="#b276a8"
                        sx={{
                            borderRadius: '4px',
                            color: '#4968a2',
                            background: '#b5dbff'
                        }}
                    >
                        <Grid container spacing={0} sx={{ backgroundColor: 'white', my: 1, padding: '20px 10px', borderRadius: '10px' }}>
                            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Grid container spacing={2}>
                                    <Grid md={1} item sx={{ mr: 2 }}>
                                        <Typography variant="h5" sx={{ color: '#000000' }}>
                                            No.
                                        </Typography>
                                    </Grid>

                                    <Grid item xs zeroMinWidth>
                                        <Typography variant="h5" align="left">
                                            Name
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5">Email</Typography>
                            </Grid>
                            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5">Username</Typography>
                            </Grid>
                            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5">Secret Key</Typography>
                            </Grid>
                            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5">Mobile Number</Typography>
                            </Grid>

                            {/* <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center', paddingRight: '5px' }}>
                                <Typography variant="h5" align="center">
                                    Action
                                </Typography>
                            </Grid> */}
                        </Grid>
                        {!adminLoading && adminList.docs.length > 0 ? (
                            adminList.docs.map((list, i) => (
                                <Grid
                                    container
                                    spacing={0}
                                    sx={{ backgroundColor: 'white', my: 1, padding: '5px 10px', borderRadius: '10px' }}
                                    key={i}
                                >
                                    <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid md={1} item sx={{ mr: 2 }}>
                                                <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                                                    {/* {i + 1} */}
                                                    {page * pageLength + (i + 1)}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Avatar alt="Preview" src={BASE_URL + list.profile_pic} />
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
                                        <Typography variant="h5">{list.email}</Typography>{' '}
                                    </Grid>
                                    <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h5">{list?.username}</Typography>
                                    </Grid>
                                    <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h5">{list.secret_key}</Typography>
                                    </Grid>
                                    <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h5">{list.mobile}</Typography>
                                        {/* <Switch
                                            // defaultChecked
                                            checked={list.status !== '1'}
                                            color="primary"
                                            // onClick={() => changeStatus(list)}
                                        /> */}
                                    </Grid>
                                    {/* <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '5px' }}>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                background: '#b5dbff',
                                                color: '#000000',
                                                padding: '5px 15px',
                                                my: 1,
                                                borderRadius: '8px',
                                                '&:hover': {
                                                    background: '#4d97f3',
                                                    color: '#ffffff'
                                                }
                                            }}
                                        >
                                            <EditIcon sx={{ mr: 1 }} /> Edit
                                        </Button>{' '}
                                    </Grid> */}
                                </Grid>
                            ))
                        ) : (
                            <>
                                {adminLoading === true ? (
                                    <AdminTableLoader rows={10} />
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
                                                No Admins Found
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                )}
                            </>
                        )}

                        {/* </PerfectScrollbar> */}
                    </Typography>
                </Grid>
                {/* {!adminLoading && adminList.totalDocs > 10 ? ( */}
                <Grid item xs={12} md={12} sx={{ my: '10px' }}>
                    <Pagination
                        align="right"
                        sx={{ float: 'right', '& .Mui-selected': { borderRadius: '50%', backgroundColor: `#b5dbff` } }}
                        color="primary"
                        shape="rounded"
                        count={adminList.totalPages}
                        page={currentPage}
                        onChange={onPaginationHandle}
                    />
                </Grid>
                {/* ) : (
                    ''
                )} */}
            </Grid>
            {openModel && <AddAdminModels open={openModel} close={() => handleCloseModel()} />}
        </MainCard>
    );
};

export default Index;
