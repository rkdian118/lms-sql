import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// material-ui
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
    CardContent,
    useMediaQuery,
    Stack
} from '@mui/material';
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
import useConfig from 'hooks/useConfig';
import ProjectionStatusList from './TabList/ProjectionStatus/ProjectionStatusList';
import { IconDeviceAnalytics } from '@tabler/icons';
// ==============================|| DEFAULT TabComponent ||============================== //
function TabPanel({ children, value, index, ...other }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box
                    sx={{
                        p: 0
                    }}
                >
                    {children}
                </Box>
            )}
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
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`
    };
}

const Index = () => {
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
    console.log('🚀matchDownMD:', matchDownMD);
    const [value, setValue] = useState(0);
    const { borderRadius } = useConfig();
    useEffect(() => {
        // setLoading(false);
        // setOpenNewModel(modalState);
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <MainCard
            title={
                <Stack direction="row">
                    <IconDeviceAnalytics sx={{ mr: 2 }} /> &nbsp; Master Status
                </Stack>
            }
            content={false}
            sx={{ borderbottom: '1px solid' }}
        >
            <Grid container spacing={gridSpacing} sx={{ '&.MuiGrid-root': { p: '10px 5px' } }}>
                <Grid item xs={12} sx={{ '&.MuiGrid-root': { pt: '10px' } }}>
                    {/* <MainCard title="Account Settings" content={false}> */}
                    <Grid container spacing={gridSpacing}>
                        <Grid item md={matchDownMD ? 12 : 3} lg={3}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                orientation={!matchDownMD ? 'vertical' : 'horizontal'}
                                variant="scrollable"
                                sx={{
                                    '& .MuiTabs-flexContainer': {
                                        borderBottom: 'none'
                                    },
                                    '& button': {
                                        borderRadius: `${borderRadius}px`,
                                        color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
                                        minHeight: 'auto',
                                        // minWidth: '100%',
                                        py: 1.5,
                                        px: 2,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        // alignItems: 'flex-start',
                                        alignItems: 'center',
                                        textAlign: 'left',
                                        justifyContent: 'flex-start',
                                        borderBottom: '1px solid',
                                        borderColor: theme.palette.grey[100]
                                    },
                                    '& button.Mui-selected': {
                                        color: theme.palette.primary.main,
                                        // background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50]
                                        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light
                                    },
                                    '& button > svg': {
                                        marginBottom: '0px !important',
                                        marginRight: 1.25,
                                        // marginTop: 1.25,
                                        height: 20,
                                        width: 20
                                    }
                                    // '& button > div > span': {
                                    //     display: 'block'
                                    // },
                                    // '& > div > span': {
                                    //     display: 'none'
                                    // }
                                }}
                            >
                                <Tab
                                    icon={<PersonOutlineTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                                    label="Lead Source"
                                    {...a11yProps(0)}
                                />
                                <Tab icon={<RecentActorsTwoToneIcon sx={{ fontSize: '1.3rem' }} />} label="Lead Type" {...a11yProps(1)} />
                                <Tab icon={<PeopleAltTwoToneIcon sx={{ fontSize: '1.3rem' }} />} label="Lead Status" {...a11yProps(2)} />
                                <Tab
                                    icon={<PeopleAltTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                                    label="Lead Follow Ups"
                                    {...a11yProps(3)}
                                />
                                <Tab
                                    icon={<PeopleAltTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                                    label="Requirement Type"
                                    {...a11yProps(4)}
                                />
                                <Tab icon={<PeopleAltTwoToneIcon sx={{ fontSize: '1.3rem' }} />} label="Call Mode" {...a11yProps(5)} />
                                <Tab icon={<PersonOutlineTwoToneIcon sx={{ fontSize: '1.3rem' }} />} label="Call Type" {...a11yProps(6)} />
                                <Tab icon={<PeopleAltTwoToneIcon sx={{ fontSize: '1.3rem' }} />} label="Call Status" {...a11yProps(7)} />
                                <Tab icon={<PeopleAltTwoToneIcon sx={{ fontSize: '1.3rem' }} />} label="RFP Type" {...a11yProps(8)} />
                                <Tab icon={<PeopleAltTwoToneIcon sx={{ fontSize: '1.3rem' }} />} label="RFP Status" {...a11yProps(9)} />
                                <Tab
                                    icon={<RecentActorsTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                                    label="Proposal Type"
                                    {...a11yProps(10)}
                                />
                                <Tab
                                    icon={<RecentActorsTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                                    label="Projection Status"
                                    {...a11yProps(11)}
                                />
                                {/* <Tab
                                    icon={<PeopleAltTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                                    label="Pre Define Notes"
                                    {...a11yProps(11)}
                                />
                                <Tab
                                    icon={<PeopleAltTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                                    label="Lead RFP Status"
                                    {...a11yProps(12)}
                                />
                                <Tab
                                    icon={<PeopleAltTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                                    label="Proposal Status"
                                    {...a11yProps(13)}
                                />
                                <Tab
                                    icon={<PeopleAltTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                                    label="Lead Proposal Status"
                                    {...a11yProps(14)}
                                /> */}
                            </Tabs>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={9}
                            lg={9}
                            sx={{
                                '&.MuiGrid-root': {
                                    mt: '30px',
                                    p: '0px 10px',
                                    borderLeft: '1px solid',
                                    borderColor: theme.palette.grey[100]
                                }
                            }}
                        >
                            <MainCard content={false} sx={{ height: '80vh', overflow: 'auto' }}>
                                <PerfectScrollbar
                                    component="div"
                                    style={{
                                        scrollbarWidth: 'thin' /* For Firefox */,
                                        scrollbarColor: '#b2b3b3 #f1f1f1'
                                    }}
                                >
                                    <TabPanel value={value} index={0}>
                                        <LeadSourceList />
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                        <LeadTypeList />
                                    </TabPanel>
                                    <TabPanel value={value} index={2}>
                                        <LeadStatusList />
                                    </TabPanel>
                                    <TabPanel value={value} index={3}>
                                        <LeadFollowUps />
                                    </TabPanel>
                                    <TabPanel value={value} index={4}>
                                        <RequirementType />
                                    </TabPanel>
                                    <TabPanel value={value} index={5}>
                                        <CallModeList />
                                    </TabPanel>
                                    <TabPanel value={value} index={6}>
                                        <CallTypeList />
                                    </TabPanel>
                                    <TabPanel value={value} index={7}>
                                        <CallStatusList />
                                    </TabPanel>
                                    <TabPanel value={value} index={8}>
                                        <RfpTypeList />
                                    </TabPanel>
                                    <TabPanel value={value} index={9}>
                                        <RfpStatusList />
                                    </TabPanel>
                                    <TabPanel value={value} index={10}>
                                        <ProposalList />
                                    </TabPanel>
                                    <TabPanel value={value} index={11}>
                                        <ProjectionStatusList />
                                    </TabPanel>
                                    <TabPanel value={value} index={12}>
                                        <PreDefineNotesList />
                                    </TabPanel>
                                    <TabPanel value={value} index={13}>
                                        <LeadRfpStatusList />
                                    </TabPanel>
                                    <TabPanel value={value} index={14}>
                                        <LeadProposalStatusList />
                                    </TabPanel>
                                </PerfectScrollbar>
                            </MainCard>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Index;
