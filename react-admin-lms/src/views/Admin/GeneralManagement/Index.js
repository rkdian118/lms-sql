import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// material-ui
import { Grid, Box, Chip, Tab, Tabs, Typography, LinearProgress, List, ListItem, ListItemText, Button, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
// project imports
import { useTheme, styled } from '@mui/material/styles';

// assets
import MuiTypography from '@mui/material/Typography';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import PanoramaTwoToneIcon from '@mui/icons-material/PanoramaTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import RecentActorsTwoToneIcon from '@mui/icons-material/RecentActorsTwoTone';
import MainCard from 'ui-component/cards/MainCard';
import PerfectScrollbar from 'react-perfect-scrollbar';
// import LeadDetailModel from './Models/LeadDetailModel';
// import LeadDetailModel from './Models/LeadDetailModel';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import LeadSourceList from './TabList/LeadSource/LeadSourceList';
import LeadTypeList from './TabList/LeadType/LeadTypeList';
import CallModeList from './TabList/CallMode/CallModeList';
import CallTypeList from './TabList/CallType/CallTypeList';
import ProposalList from './TabList/ProposalType/ProposalList';
import RequirementType from './TabList/RequrirementType/RequirementType';
import PreDefineNotesList from './TabList/PreDefineNotes/PreDefineNotesList';
import { gridSpacing } from 'store/constant';
import LeadStatusList from './TabList/LeadStatus/LeadStatusList';
import LeadFollowUps from './TabList/LeadFollowUps/LeadFollowUps';
import CallStatusList from './TabList/CallStatus/CallStatusList';
import RfpTypeList from './TabList/RfpType/RfpTypeList';
import RfpStatusList from './TabList/RfpStatus/RfpStatusList';
import LeadRfpStatusList from './TabList/LeadRfpStatus/LeadRfpStatusList';
import ProposalStatusList from './TabList/ProposalStatus/ProposalStatusList';
import LeadProposalStatusList from './TabList/LeadProposalStatus/LeadProposalStatusList';
// ==============================|| DEFAULT TabComponent ||============================== //
function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <div>{children}</div>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const Index = () => {
    const theme = useTheme();
    const [isLoading, setLoading] = useState(true);
    const [openModelDetail, setOpenModelDetail] = useState(false);
    const [value, setValue] = useState(0);

    useEffect(() => {
        // setLoading(false);
        // setOpenNewModel(modalState);
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const onClickModel = (e) => {
        setOpenModelDetail(true);
    };
    // console.log('🚀value:', value);

    const getTabMainCardColor = (value) => {
        let backgroundColor;
        if (value === 0) {
            backgroundColor = '#f9e1b4';
        } else if (value === 1) {
            backgroundColor = '#cffea0';
        } else if (value === 2) {
            backgroundColor = '#b5dbff';
        } else if (value === 3) {
            backgroundColor = '#f9e1b4';
        } else if (value === 4) {
            backgroundColor = '#cffea0';
        } else if (value === 5) {
            backgroundColor = '#b5dbff';
        } else if (value === 6) {
            backgroundColor = '#f9e1b4';
        } else if (value === 7) {
            backgroundColor = '#cffea0';
        } else if (value === 8) {
            backgroundColor = '#b5dbff';
        } else if (value === 9) {
            backgroundColor = '#f9e1b4';
        } else if (value === 10) {
            backgroundColor = '#cffea0';
        } else if (value === 11) {
            backgroundColor = '#b5dbff';
        } else if (value === 12) {
            backgroundColor = '#f9e1b4';
        } else if (value === 13) {
            backgroundColor = '#cffea0';
        } else if (value === 14) {
            backgroundColor = '#b5dbff';
        } else if (value === 15) {
            backgroundColor = '#f9e1b4';
        } else {
            backgroundColor = '#b5dbff';
        }
        return backgroundColor;
    };
    console.log('🚀 getTabMainCardColor:', getTabMainCardColor);

    const getTabIndicatorColor = (value) => {
        let backgroundColor;
        if (value === 0) {
            backgroundColor = '#f5be57';
        } else if (value === 1) {
            backgroundColor = '#9bf541';
        } else if (value === 2) {
            backgroundColor = '#2196f3';
        } else if (value === 3) {
            backgroundColor = '#f5be57';
        } else if (value === 4) {
            backgroundColor = '#9bf541';
        } else if (value === 5) {
            backgroundColor = '#2196f3';
        } else if (value === 6) {
            backgroundColor = '#f5be57';
        } else if (value === 7) {
            backgroundColor = '#9bf541';
        } else if (value === 8) {
            backgroundColor = '#2196f3';
        } else if (value === 9) {
            backgroundColor = '#f5be57';
        } else if (value === 10) {
            backgroundColor = '#9bf541';
        } else if (value === 11) {
            backgroundColor = '#2196f3';
        } else if (value === 12) {
            backgroundColor = '#f5be57';
        } else if (value === 13) {
            backgroundColor = '#9bf541';
        } else if (value === 14) {
            backgroundColor = '#2196f3';
        } else if (value === 15) {
            backgroundColor = '#f5be57';
        } else {
            backgroundColor = '#2196f3';
        }
        return backgroundColor;
    };

    return (
        <MainCard content={false} sx={{ border: '0px solid', padding: '10px' }}>
            <Grid container spacing={gridSpacing} sx={{ '&.MuiGrid-root': { p: '10px' } }}>
                <Grid item xs={12} sx={{ '&.MuiGrid-root': { pt: '10px' } }}>
                    {/* <MainCard title="Account Settings" content={false}> */}
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} lg={3}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                orientation="vertical"
                                variant="scrollable"
                                sx={{
                                    // mb: 3,
                                    marginBottom: '10px',
                                    '& .MuiTabs-flexContainer': {
                                        borderBottom: 'none',
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    },
                                    '& a': {
                                        margin: '4px 0',
                                        borderRadius: '10px 10px',
                                        // boxShadow: '0px 12px 0px 0px rgba(248,225,180,1)',
                                        // width: '190px',
                                        minHeight: 'auto',
                                        minWidth: 10,
                                        padding: '15px 15px',
                                        color: theme.palette.grey[600],
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start'
                                    },
                                    '& a.Mui-selected': {
                                        color: 'black'
                                    },
                                    '& .MuiTabs-indicator': {
                                        height: '3px',
                                        backgroundColor: getTabIndicatorColor(value)
                                    },
                                    '& a > svg': {
                                        mb: '0px !important',
                                        mr: 1.1
                                    },
                                    '& button > svg': {
                                        marginBottom: '0px !important',
                                        marginRight: 1.25,
                                        marginTop: 1.25,
                                        height: 20,
                                        width: 20
                                    },
                                    '& button > div > span': {
                                        display: 'block'
                                    },
                                    '& > div > span': {
                                        display: 'none'
                                    }
                                }}
                            >
                                <Tab
                                    component={Link}
                                    to="#"
                                    icon={<PersonOutlineTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                                    label="Lead Sources"
                                    {...a11yProps(0)}
                                    sx={{
                                        background: '#f9e1b4',
                                        borderBottom: value === 0 ? 'none' : '1px solid',
                                        borderColor: 'divider'
                                    }}
                                />
                                <Tab
                                    component={Link}
                                    to="#"
                                    icon={<RecentActorsTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                                    label="Lead Type"
                                    {...a11yProps(1)}
                                    sx={{
                                        background: '#cffea0'
                                    }}
                                />
                                <Tab
                                    component={Link}
                                    to="#"
                                    icon={<PeopleAltTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                                    label="Call Mode"
                                    sx={{
                                        background: '#b5dbff'
                                    }}
                                    {...a11yProps(2)}
                                />{' '}
                                <Tab
                                    component={Link}
                                    to="#"
                                    icon={<PersonOutlineTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                                    label="Call Type"
                                    {...a11yProps(3)}
                                    sx={{
                                        background: '#f9e1b4'
                                    }}
                                />
                                <Tab
                                    component={Link}
                                    to="#"
                                    icon={<RecentActorsTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                                    label="Proposal Type"
                                    {...a11yProps(4)}
                                    sx={{
                                        background: '#cffea0'
                                    }}
                                />
                                <Tab
                                    component={Link}
                                    to="#"
                                    icon={<PeopleAltTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                                    label="Requirement Type"
                                    sx={{
                                        background: '#b5dbff'
                                    }}
                                    {...a11yProps(5)}
                                />
                                <Tab
                                    component={Link}
                                    to="#"
                                    icon={<PeopleAltTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                                    label="Pre Define Notes"
                                    sx={{
                                        background: '#f9e1b4'
                                    }}
                                    {...a11yProps(6)}
                                />
                                <Tab
                                    component={Link}
                                    to="#"
                                    icon={<PeopleAltTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                                    label="Lead Status"
                                    sx={{
                                        background: '#cffea0'
                                    }}
                                    {...a11yProps(7)}
                                />
                                <Tab
                                    component={Link}
                                    to="#"
                                    icon={<PeopleAltTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                                    label="Lead Follow Ups"
                                    sx={{
                                        background: '#b5dbff'
                                    }}
                                    {...a11yProps(8)}
                                />
                                <Tab
                                    component={Link}
                                    to="#"
                                    icon={<PeopleAltTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                                    label="Call Status"
                                    sx={{
                                        background: '#f9e1b4'
                                    }}
                                    {...a11yProps(9)}
                                />
                                <Tab
                                    component={Link}
                                    to="#"
                                    icon={<PeopleAltTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                                    label="RFP Type"
                                    sx={{
                                        background: '#cffea0'
                                    }}
                                    {...a11yProps(10)}
                                />
                                <Tab
                                    component={Link}
                                    to="#"
                                    icon={<PeopleAltTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                                    label="RFP Status"
                                    sx={{
                                        background: '#b5dbff'
                                    }}
                                    {...a11yProps(11)}
                                />
                                <Tab
                                    component={Link}
                                    to="#"
                                    icon={<PeopleAltTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                                    label="Lead RFP Status"
                                    sx={{
                                        background: '#f9e1b4'
                                    }}
                                    {...a11yProps(12)}
                                />
                                <Tab
                                    component={Link}
                                    to="#"
                                    icon={<PeopleAltTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                                    label="Proposal Status"
                                    sx={{
                                        background: '#cffea0'
                                    }}
                                    {...a11yProps(13)}
                                />
                                <Tab
                                    component={Link}
                                    to="#"
                                    icon={<PeopleAltTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                                    label="Lead Proposal Status"
                                    sx={{
                                        background: '#b5dbff'
                                    }}
                                    {...a11yProps(14)}
                                />
                            </Tabs>
                        </Grid>
                        <Grid item xs={12} lg={9} sx={{ '&.MuiGrid-root': { mt: '25px', p: '0px 10px' } }}>
                            <MainCard
                                content={false}
                                sx={{
                                    background: getTabMainCardColor(value),
                                    height: 'auto',
                                    overflow: 'auto',
                                    p: '10px'
                                }}
                            >
                                <PerfectScrollbar
                                    component="div"
                                    style={{
                                        scrollbarWidth: 'thin' /* For Firefox */,
                                        scrollbarColor: '#ff0000 #f1f1f1'
                                    }}
                                >
                                    <TabPanel value={value} index={0} sx={{ padding: '0px' }}>
                                        <LeadSourceList />
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                        <LeadTypeList />
                                    </TabPanel>
                                    <TabPanel value={value} index={2}>
                                        <CallModeList />
                                    </TabPanel>
                                    <TabPanel value={value} index={3} sx={{ padding: '0px' }}>
                                        <CallTypeList />
                                    </TabPanel>
                                    <TabPanel value={value} index={4}>
                                        <ProposalList />
                                    </TabPanel>
                                    <TabPanel value={value} index={5}>
                                        <RequirementType />
                                    </TabPanel>
                                    <TabPanel value={value} index={6} sx={{ padding: '0px' }}>
                                        <PreDefineNotesList />
                                    </TabPanel>
                                    <TabPanel value={value} index={7} sx={{ padding: '0px' }}>
                                        <LeadStatusList />
                                    </TabPanel>
                                    <TabPanel value={value} index={8}>
                                        <LeadFollowUps />
                                    </TabPanel>
                                    <TabPanel value={value} index={9}>
                                        <CallStatusList />
                                    </TabPanel>
                                    <TabPanel value={value} index={10} sx={{ padding: '0px' }}>
                                        <RfpTypeList />
                                    </TabPanel>
                                    <TabPanel value={value} index={11}>
                                        <RfpStatusList />
                                    </TabPanel>
                                    <TabPanel value={value} index={12}>
                                        <LeadRfpStatusList />
                                    </TabPanel>
                                    <TabPanel value={value} index={13} sx={{ padding: '0px' }}>
                                        <ProposalStatusList />
                                    </TabPanel>
                                    <TabPanel value={value} index={14} sx={{ padding: '0px' }}>
                                        <LeadProposalStatusList />
                                    </TabPanel>
                                </PerfectScrollbar>
                            </MainCard>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {/* <MainCard
                content={false}
                sx={{
                    background: getTabMainCardColor(value),
                    height: 'auto',
                    overflow: 'auto'
                }}
            >
                <PerfectScrollbar
                    component="div"
                    style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#ff0000 #f1f1f1'
                    }}
                >
                    <TabPanel value={value} index={0} sx={{ padding: '0px' }}>
                        <LeadSourceList />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <LeadTypeList />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <CallModeList />
                    </TabPanel>
                    <TabPanel value={value} index={3} sx={{ padding: '0px' }}>
                        <CallTypeList />
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <ProposalList />
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                        <RequirementType />
                    </TabPanel>
                    <TabPanel value={value} index={6} sx={{ padding: '0px' }}>
                        <PreDefineNotesList />
                    </TabPanel>
                </PerfectScrollbar>
            </MainCard> */}
            {/* {openModelDetail && <LeadDetailModel open={openModelDetail} close={() => setOpenModelDetail(false)} />} */}
        </MainCard>
    );
};

export default Index;
