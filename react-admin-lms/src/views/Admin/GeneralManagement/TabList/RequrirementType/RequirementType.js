import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { RequirementTypeGetApi } from 'store/slices/masterAction';
import { Grid, Box, Chip, Tab, Tabs, Typography, LinearProgress, List, ListItem, ListItemText, Button } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import MuiTypography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import { CommonTableLoader } from 'ui-component/cards/Skeleton/TableLoader';
import AddRequirementType from './AddRequirementType';
import EditRequirementType from './EditRequirementType';

const RequirementType = ({ RequirementTypeGetApi }) => {
    const { requirementTypeList, requirementTypeLoading } = useSelector((state) => state.masterAction);
    const [openModel, setOpenModel] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        RequirementTypeGetApi();
    }, []);

    const handleCloseModel = () => {
        setOpenModel(false);
        setId('');
        setName('');
        RequirementTypeGetApi();
    };
    const handleEditModel = (data) => {
        setOpenModel(true);
        setId(data._id);
        setName(data.status_name);
    };
    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} md={10}>
                    <Typography
                        variant="h3"
                        align="center"
                        // p="10px"
                        color="#b276a8"
                        sx={{
                            p: '20px 10px',
                            borderRadius: '4px',
                            color: '#000000',
                            background: '#b5dbff'
                        }}
                    >
                        Requirement Type
                    </Typography>
                </Grid>
                <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                        variant="contained"
                        sx={{
                            // border: '1px solid #3e7dc3',
                            borderRadius: '5px',
                            background: '#b5dbff',
                            color: '#000000',
                            p: '6px 25px',
                            '&:hover': {
                                pl: '40px',
                                background: '#4d97f3',
                                color: '#000000'
                            }
                        }}
                        onClick={(e) => setOpenModel(true)}
                    >
                        Add <AddCircleRoundedIcon sx={{ ml: 1 }} />
                    </Button>
                </Grid>
            </Grid>

            {!requirementTypeLoading && requirementTypeList.length > 0 ? (
                requirementTypeList.map((list, i) => (
                    <Grid container spacing={0} sx={{ backgroundColor: 'white', my: 1, padding: '5px 10px', borderRadius: '10px' }} key={i}>
                        <Grid item xs={8} sx={{ display: 'flex', alignItems: 'center' }}>
                            <MuiTypography variant="h5">{`${i + 1}.`}</MuiTypography>
                            <MuiTypography variant="h5" sx={{ ml: 2 }}>{`${list?.status_name}`}</MuiTypography>
                        </Grid>
                        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '20px' }}>
                            <Button
                                variant="contained"
                                sx={{
                                    background: '#b5dbff',
                                    color: '#000000',
                                    padding: '5px 25px',
                                    my: 0.5,
                                    '&:hover': {
                                        background: '#4d97f3',
                                        color: '#000000',
                                        px: '30px'
                                    }
                                }}
                                onClick={() => handleEditModel(list)}
                            >
                                <EditIcon sx={{ mr: 1 }} /> Edit
                            </Button>
                        </Grid>
                    </Grid>
                ))
            ) : (
                <>
                    {requirementTypeLoading === true ? (
                        <CommonTableLoader rows={5} />
                    ) : (
                        <Grid container spacing={0} sx={{ backgroundColor: 'white', my: 1, padding: '5px 10px', borderRadius: '10px' }}>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography align="center" component="div" variant="subtitle1" sx={{ color: '#000000', p: '10px' }}>
                                    No Requirement Type Found
                                </Typography>
                            </Grid>
                        </Grid>
                    )}
                </>
            )}
            {openModel && <AddRequirementType open={openModel} close={() => handleCloseModel()} />}
            {id && openModel && <EditRequirementType open={openModel} close={() => handleCloseModel()} id={id} getName={name} />}
        </>
    );
};

export default connect(null, { RequirementTypeGetApi })(RequirementType);
