import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { LeadRfpStatusGetApi } from 'store/slices/masterAction';
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

const LeadRfpStatusList = ({ LeadRfpStatusGetApi }) => {
    const theme = useTheme();
    const { leadRfpStatusList, leadRfpStatusLoading } = useSelector((state) => state.masterAction);
    const [openModel, setOpenModel] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        LeadRfpStatusGetApi();
    }, []);

    const handleCloseModel = () => {
        setOpenModel(false);
        setId('');
        setName('');
        LeadRfpStatusGetApi();
    };

    const handleEditModel = (data) => {
        // console.log('🚀data:', data);
        setOpenModel(true);
        setId(data._id);
        setName(data.status_name);
    };
    return (
        <>
            <MainCard
                title="Lead RFP Status"
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
                                <TableCell component="th" scope="row" align="center">
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!leadRfpStatusLoading && leadRfpStatusList.length > 0 ? (
                                leadRfpStatusList.map((list, i) => (
                                    <TableRow hover key={i}>
                                        <TableCell sx={{ pl: 3 }} component="th" scope="row">
                                            {i + 1}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {list.status_name}
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
                                    {leadRfpStatusLoading === true ? (
                                        <CommonTableLoader rows={5} />
                                    ) : (
                                        <TableRow>
                                            <TableCell sx={{ pr: 3 }} align="center" colSpan={3}>
                                                No Lead RFP Status Found
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                {openModel && (
                    <AddMasterStatus
                        statusType="lead_rfp_status"
                        name="Lead RFP Status"
                        open={openModel}
                        close={() => handleCloseModel()}
                    />
                )}
                {id && openModel && (
                    <EditMasterStatus
                        open={openModel}
                        close={() => handleCloseModel()}
                        statusType="lead_rfp_status"
                        name="Lead RFP Status"
                        id={id}
                        getName={name}
                    />
                )}
            </MainCard>
        </>
    );
};

export default connect(null, { LeadRfpStatusGetApi })(LeadRfpStatusList);
