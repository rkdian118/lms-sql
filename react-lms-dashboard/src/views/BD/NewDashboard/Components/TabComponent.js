import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// material-ui
import { Grid, Box, Chip, Tab, Tabs, Typography, LinearProgress, List, ListItem, ListItemText, Button } from '@mui/material';
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
import LeadDetailModel from './Models/LeadDetailModel';
import FollowUpsList from './FollowUpsList';
import ScheduledCalls from './ScheduledCalls';
import RfpRequest from './RfpRequest';
import { useSelector } from 'react-redux';
// import LeadDetailModel from './Models/LeadDetailModel';

// ==============================|| DEFAULT TabComponent ||============================== //
function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: '5px 10px' }}>
                    <Typography>{children}</Typography>
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
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const TabComponent = ({ startDate, endDate }) => {
    const theme = useTheme();
    const [isLoading, setLoading] = useState(true);
    const [openModelDetail, setOpenModelDetail] = useState(false);
    const [value, setValue] = useState(0);
    const { getFollowUpsListData, getCallsListData, getRfpListData } = useSelector((state) => state.businessAction);
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

    const getTabMainCardColor = (value) => {
        let backgroundColor;
        if (value === 0) {
            backgroundColor = '#f9e1b4';
        } else if (value === 1) {
            backgroundColor = '#cffea0';
        } else {
            backgroundColor = '#b5dbff';
        }
        return backgroundColor;
    };

    const getTabIndicatorColor = (value) => {
        let backgroundColor;
        if (value === 0) {
            backgroundColor = '#f5be57';
        } else if (value === 1) {
            backgroundColor = '#9bf541';
        } else {
            backgroundColor = '#2196f3';
        }
        return backgroundColor;
    };

    function countKeysAndArraysLength(data) {
        let totalKeys = 0;
        let totalArrayLength = 0;

        Object.keys(data).forEach((key) => {
            totalKeys += 1;

            if (Array.isArray(data[key])) {
                totalArrayLength += data[key].length;
            }
        });

        return { totalKeys, totalArrayLength };
    }

    // Example usage with your provided data
    const followUpCount = countKeysAndArraysLength(getFollowUpsListData);
    const callsCount = countKeysAndArraysLength(getCallsListData);
    const rfpCount = countKeysAndArraysLength(getRfpListData);
    return (
        <>
            <Tabs
                value={value}
                variant="scrollable"
                onChange={handleChange}
                // className="select-box-shadow"
                sx={{
                    mb: 3,
                    marginBottom: '10px',
                    '& .MuiTabs-flexContainer': {
                        borderBottom: 'none',
                        display: 'flex',
                        justifyContent: 'space-between'
                    },
                    '& a': {
                        borderRadius: '10px 10px 0 0',
                        boxShadow: '0px 12px 0px 0px rgba(248,225,180,1)',
                        // width: '190px', // tab size
                        minHeight: 'auto',
                        minWidth: 10,
                        padding: '15px 10px',
                        color: theme.palette.grey[600],
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
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
                    }
                }}
            >
                <Tab
                    component={Link}
                    to="#"
                    icon={<PersonOutlineTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                    // label="Follow-ups Pending"
                    {...a11yProps(0)}
                    sx={{
                        background: '#f9e1b4',
                        borderBottom: value === 0 ? 'none' : '1px solid',
                        borderColor: 'divider'
                    }}
                    label={
                        <>
                            Follow-ups Pending
                            <Chip
                                label={followUpCount.totalArrayLength ? followUpCount.totalArrayLength : 0}
                                size="small"
                                // sx={{ color: theme.palette.secondary.main, background: theme.palette.secondary.light, ml: 1.3 }}
                                sx={{ ml: 0.5 }}
                            />
                        </>
                    }
                />
                <Tab
                    component={Link}
                    to="#"
                    icon={<RecentActorsTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                    // label="Scheduled Calls"
                    {...a11yProps(1)}
                    sx={{
                        background: '#cffea0'
                    }}
                    label={
                        <>
                            Scheduled Calls
                            <Chip
                                label={callsCount.totalArrayLength ? callsCount.totalArrayLength : 0}
                                size="small"
                                // sx={{ color: theme.palette.secondary.main, background: theme.palette.secondary.light, ml: 1.3 }}
                                sx={{ ml: 0.5 }}
                            />
                        </>
                    }
                />
                <Tab
                    component={Link}
                    to="#"
                    icon={<PeopleAltTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                    // label="RFP"
                    sx={{
                        background: '#b5dbff'
                    }}
                    label={
                        <>
                            RFP
                            <Chip
                                label={rfpCount.totalArrayLength ? rfpCount.totalArrayLength : 0}
                                size="small"
                                // sx={{ color: theme.palette.secondary.main, background: theme.palette.secondary.light, ml: 1.3 }}
                                sx={{ ml: 0.5 }}
                            />
                        </>
                    }
                    {...a11yProps(2)}
                />
            </Tabs>
            <MainCard
                content={false}
                sx={{
                    background: getTabMainCardColor(value),
                    height: '790px',
                    overflow: 'auto'
                }}
            >
                <PerfectScrollbar
                    component="div"
                    style={{
                        scrollbarWidth: 'thin' /* For Firefox */,
                        scrollbarColor: '#b2b3b3 #f1f1f1'
                    }}
                >
                    <TabPanel value={value} index={0} sx={{ padding: '0px' }}>
                        <FollowUpsList startDate={startDate} endDate={endDate} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <ScheduledCalls startDate={startDate} endDate={endDate} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <RfpRequest startDate={startDate} endDate={endDate} />
                    </TabPanel>
                </PerfectScrollbar>
            </MainCard>
            {/* {openModelDetail && <LeadDetailModel open={openModelDetail} close={() => setOpenModelDetail(false)} />} */}
        </>
    );
};

export default TabComponent;
