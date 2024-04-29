import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { LeadSourceGetApi } from 'store/slices/masterAction';
import {
    Grid,
    Box,
    Chip,
    Tab,
    Tabs,
    Typography,
    LinearProgress,
    List,
    ListItem,
    ListItemText,
    Button,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import MuiTypography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import { CommonTableLoader } from 'ui-component/cards/Skeleton/TableLoader';
import MainCard from 'ui-component/cards/MainCard';
import { Stack } from '@mui/system';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useTheme, styled } from '@mui/material/styles';
import AddMasterStatus from '../Common/AddMasterStatus';
import EditMasterStatus from '../Common/EditMasterStatus';
import Avatar from 'ui-component/extended/Avatar';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import RectangleRoundedIcon from '@mui/icons-material/RectangleRounded';

const LeadSourceList = ({ LeadSourceGetApi }) => {
    const theme = useTheme();
    const { leadSourceList, leadSourceListLoading } = useSelector((state) => state.masterAction);
    const [openModel, setOpenModel] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [openEditModel, setOpenEditModel] = useState(false);
    const [color, setColor] = useState('');

    useEffect(() => {
        LeadSourceGetApi();
    }, []);

    const handleCloseModel = () => {
        setOpenModel(false);
        setOpenEditModel(false);
        setId('');
        setName('');
        LeadSourceGetApi();
    };

    const handleEditModel = (data) => {
        // console.log('🚀data:', data);
        setOpenEditModel(true);
        setId(data._id);
        setName(data.status_name);
        setColor(data.status_color);
    };
    return (
        <>
            <MainCard
                title="Lead Source"
                sx={{ height: '80vh', overflow: 'auto' }}
                content={false}
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
                                <AddCircleRoundedIcon sx={{ mr: 1 }} /> Add
                            </Button>
                        </AnimateButton>
                    </Stack>
                }
            >
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell component="th" scope="row" sx={{ pl: 3 }}>
                                    No.
                                </TableCell>
                                <TableCell component="th" scope="row" align="left">
                                    Name
                                </TableCell>
                                <TableCell component="th" scope="row" align="left">
                                    Color
                                </TableCell>
                                <TableCell component="th" scope="row" align="center">
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!leadSourceListLoading && leadSourceList.length > 0 ? (
                                leadSourceList.map((list, i) => (
                                    <TableRow hover key={i}>
                                        <TableCell sx={{ pl: 3 }} component="th" scope="row">
                                            {i + 1}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <Chip
                                                label={list.status_name}
                                                variant="outlined"
                                                color="secondary"
                                                sx={{
                                                    color: list?.status_color,
                                                    borderColor: list?.status_color
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <RectangleRoundedIcon
                                                sx={{ width: 30, height: 30, verticalAlign: 'sub', color: list?.status_color }}
                                            />
                                        </TableCell>
                                        <TableCell align="center" sx={{ p: 0 }}>
                                            <AnimateButton scale={{ hover: 1.1, tap: 0.9 }}>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => handleEditModel(list)}
                                                    sx={{
                                                        px: 2,
                                                        mb: 1,
                                                        // width: '25%',
                                                        boxShadow: theme.customShadows.secondary,
                                                        ':hover': {
                                                            boxShadow: 'none'
                                                        }
                                                    }}
                                                >
                                                    <EditIcon sx={{ mr: 1 }} /> Edit
                                                </Button>
                                            </AnimateButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <>
                                    {leadSourceListLoading === true ? (
                                        <CommonTableLoader rows={5} />
                                    ) : (
                                        <TableRow>
                                            <TableCell sx={{ pr: 3 }} align="center" colSpan={3}>
                                                No Lead Source Found
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                {openModel && (
                    <AddMasterStatus statusType="lead_source" name="Lead Source" open={openModel} close={() => handleCloseModel()} />
                )}
                {id && openEditModel && (
                    <EditMasterStatus
                        open={openEditModel}
                        close={() => handleCloseModel()}
                        statusType="lead_source"
                        color={color}
                        name="Lead Source"
                        id={id}
                        getName={name}
                    />
                )}
            </MainCard>
        </>
    );
};

export default connect(null, { LeadSourceGetApi })(LeadSourceList);
