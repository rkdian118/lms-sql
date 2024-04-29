import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { openPopupModel } from 'store/slices/menu';
import { dispatch } from 'store';
import { useSelector } from 'react-redux';
import AddTeamLeadModels from './Models/AddTeamLeadModels';
import TeamLeadDetails from './Models/TeamLeadDetails';

import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

const TeamLeaderList = () => {
    const newmenu = useSelector((state) => state.menu);
    const { openItemKey, modalState } = newmenu;
    const onClickModel = (e) => {
        dispatch(openPopupModel({ openItemKey: 'addTeamLead', modalState: true }));
    };

    const onClickDetailsModel = (e) => {
        dispatch(openPopupModel({ openItemKey: 'TLDeatils', modalState: true }));
    };

    const LeadsArray = [
        {
            id: 1,
            leadName: 'Bd Name'
        },
        {
            id: 2,
            leadName: 'Bd Name'
        },
        {
            id: 3,
            leadName: 'Bd Name'
        },
        {
            id: 4,
            leadName: 'Bd Name'
        },
        {
            id: 5,
            leadName: 'Bd Name'
        },
        {
            id: 6,
            leadName: 'Bd Name'
        },
        {
            id: 7,
            leadName: 'Bd Name'
        },
        {
            id: 8,
            leadName: 'Bd Name'
        },
        {
            id: 9,
            leadName: 'Bd Name'
        },
        {
            id: 10,
            leadName: 'Bd Name'
        },
        {
            id: 11,
            leadName: 'Bd Name'
        },
        {
            id: 12,
            leadName: 'Bd Name'
        },
        {
            id: 13,
            leadName: 'Bd Name'
        },
        {
            id: 14,
            leadName: 'Bd Name'
        },
        {
            id: 15,
            leadName: 'Bd Name'
        },
        {
            id: 16,
            leadName: 'Bd Name'
        },
        {
            id: 17,
            leadName: 'Bd Name'
        },
        {
            id: 18,
            leadName: 'Bd Name'
        },
        {
            id: 19,
            leadName: 'Bd Name'
        },
        {
            id: 20,
            leadName: 'Bd Name'
        }
    ];
    return (
        <MainCard content={false} sx={{ border: '0px solid', padding: '10px' }}>
            <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                    <Typography
                        variant="h4"
                        align="center"
                        p="10px"
                        color="#b276a8"
                        sx={{
                            borderRadius: '4px',
                            color: '#4a873b',
                            background: '#cffea0'
                        }}
                    >
                        Team Leader Name <br /> (Game)
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography
                        variant="h4"
                        align="center"
                        p="10px"
                        color="#b276a8"
                        sx={{
                            borderRadius: '4px',
                            color: '#4968a2',
                            background: '#b5dbff'
                        }}
                    >
                        Business Development Name <br /> (Application)
                    </Typography>
                </Grid>{' '}
                <Grid item xs={12} md={6}>
                    <Typography
                        // variant="h4"
                        align="center"
                        p="10px"
                        color="#b276a8"
                        sx={{
                            borderRadius: '4px',
                            height: '835px',
                            color: '#4968a2',
                            background: '#cffea0'
                        }}
                    >
                        {' '}
                        <PerfectScrollbar
                            component="div"
                            style={{
                                scrollbarWidth: 'thin' /* For Firefox */,
                                scrollbarColor: '#ff0000 #f1f1f1'
                            }}
                        >
                            {LeadsArray.map((list, i) => (
                                <Grid
                                    container
                                    spacing={0}
                                    sx={{ backgroundColor: 'white', my: 1, padding: '5px 10px', borderRadius: '10px' }}
                                    key={i}
                                >
                                    <Grid item xs={8} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography variant="h5">{`${list.id}. ${list.leadName}`}</Typography>
                                    </Grid>
                                    <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '5px' }}>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                background: '#cffea0',
                                                color: '#000000',
                                                padding: '0px 25px',
                                                my: 1,
                                                borderRadius: '8px',
                                                '&:hover': {
                                                    background: '#9bf541',
                                                    color: '#000000'
                                                }
                                            }}
                                            onClick={(e) => onClickDetailsModel(e)}
                                        >
                                            View
                                        </Button>
                                    </Grid>
                                </Grid>
                            ))}
                        </PerfectScrollbar>
                    </Typography>
                    {/* <Grid item xs={12} md={4} sx={{ backgroundColor: '#f9e1b4', padding: '5px 10px' }}> */}
                </Grid>{' '}
                <Grid item xs={12} md={6}>
                    <Typography
                        // variant="h4"
                        align="center"
                        p="10px"
                        color="#b276a8"
                        sx={{
                            borderRadius: '4px',
                            height: '835px',
                            color: '#4968a2',
                            background: '#b5dbff'
                        }}
                    >
                        {' '}
                        <PerfectScrollbar
                            component="div"
                            style={{
                                scrollbarWidth: 'thin' /* For Firefox */,
                                scrollbarColor: '#ff0000 #f1f1f1'
                            }}
                        >
                            {LeadsArray.map((list, i) => (
                                <Grid
                                    container
                                    spacing={0}
                                    sx={{ backgroundColor: 'white', my: 1, padding: '5px 10px', borderRadius: '10px' }}
                                    key={i}
                                >
                                    <Grid item xs={8} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography variant="h5">{`${list.id}. ${list.leadName}`}</Typography>
                                    </Grid>
                                    <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '5px' }}>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                background: '#b5dbff',
                                                color: '#000000',
                                                padding: '0px 25px',
                                                my: 1,
                                                borderRadius: '8px',
                                                '&:hover': {
                                                    background: '#4d97f3',
                                                    color: '#000000'
                                                }
                                            }}
                                            onClick={(e) => onClickDetailsModel(e)}
                                        >
                                            View
                                        </Button>
                                    </Grid>
                                </Grid>
                            ))}
                        </PerfectScrollbar>
                    </Typography>
                    {/* <Grid item xs={12} md={4} sx={{ backgroundColor: '#f9e1b4', padding: '5px 10px' }}> */}
                </Grid>
                {/* <Grid
                    item
                    xs={12}
                    sx={{
                        ' &.MuiGrid-root': { pt: '5px', mx: '15px' }
                    }}
                >
                    <Box
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%'
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                border: '2px solid #3e7dc3',
                                // background: '#ffffff',
                                color: '#3e7dc3',
                                padding: '5px 25px',
                                my: 1,
                                borderRadius: '5px',
                                background: '#e0f4ff',
                                '&:hover': {
                                    background: '#3e7dc3',
                                    color: '#e0f4ff'
                                }
                            }}
                            onClick={(e) => onClickModel(e)}
                        >
                            Add Team Lead <AddCircleRoundedIcon sx={{ ml: 1 }} />
                        </Button>
                    </Box>
                </Grid> */}
            </Grid>
            {openItemKey === 'addTeamLead' && modalState && <AddTeamLeadModels open={modalState} />}
            {openItemKey === 'TLDeatils' && modalState && <TeamLeadDetails open={modalState} />}
        </MainCard>
    );
};

export default TeamLeaderList;
