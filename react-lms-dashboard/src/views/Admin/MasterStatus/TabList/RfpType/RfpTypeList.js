import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { RfpTypeGetApi } from 'store/slices/masterAction';
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
import RectangleRoundedIcon from '@mui/icons-material/RectangleRounded';

const RfpTypeList = ({ RfpTypeGetApi }) => {
    const theme = useTheme();
    const { rfpTypeList, rfpTypeLoading } = useSelector((state) => state.masterAction);
    const [openModel, setOpenModel] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [openEditModel, setOpenEditModel] = useState(false);
    const [color, setColor] = useState('');

    useEffect(() => {
        RfpTypeGetApi();
    }, []);

    const handleCloseModel = () => {
        setOpenModel(false);
        setId('');
        setName('');
        RfpTypeGetApi();
    };

    const handleEditModel = (data) => {
        setOpenEditModel(true);
        setId(data._id);
        setName(data.status_name);
        setColor(data.status_color);
    };

    return (
        <>
            <MainCard
                title="RFP Type"
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
                            {!rfpTypeLoading && rfpTypeList.length > 0 ? (
                                rfpTypeList.map((list, i) => (
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
                                    {rfpTypeLoading === true ? (
                                        <CommonTableLoader rows={5} />
                                    ) : (
                                        <TableRow>
                                            <TableCell sx={{ pr: 3 }} align="center" colSpan={3}>
                                                No RFP Type Found
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                {openModel && <AddMasterStatus statusType="rfp_type" name="RFP Type" open={openModel} close={() => handleCloseModel()} />}
                {id && openEditModel && (
                    <EditMasterStatus
                        open={openEditModel}
                        close={() => handleCloseModel()}
                        color={color}
                        statusType="rfp_type"
                        name="RFP Type"
                        id={id}
                        getName={name}
                    />
                )}
            </MainCard>
        </>
    );
};

export default connect(null, { RfpTypeGetApi })(RfpTypeList);
