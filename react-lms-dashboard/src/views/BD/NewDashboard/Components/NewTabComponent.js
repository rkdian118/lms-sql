import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Chip, Tab, Tabs } from '@mui/material';

// assets
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import RecentActorsTwoToneIcon from '@mui/icons-material/RecentActorsTwoTone';
import MainCard from 'ui-component/cards/MainCard';
import { useSelector } from 'react-redux';
import FollowUpsList from './FollowUpsList';
import ScheduledCalls from './ScheduledCalls';
import RfpRequest from './RfpRequest';
import PerfectScrollbar from 'react-perfect-scrollbar';

function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <>{children}</>}
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

// ================================|| UI TABS - COLOR ||================================ //

const NewTabComponent = ({ startDate, endDate }) => {
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const { getFollowUpsListData, getCallsListData, getRfpListData } = useSelector((state) => state.businessAction);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Tabs
                value={value}
                variant="scrollable"
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                sx={{
                    mb: 1,
                    '& a': {
                        minHeight: 'auto',
                        minWidth: 10,
                        py: 1.5,
                        px: 1,
                        mr: 2.2,
                        color: theme.palette.grey[600],
                        // color: '#b5dbff',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    },
                    '& a.Mui-selected': {
                        color: theme.palette.primary.main
                    },
                    '& a > svg': {
                        mb: '0px !important',
                        mr: 1.1
                    },
                    '& .MuiTabs-indicator': {
                        backgroundColor: theme.palette.primary.main
                    }
                }}
            >
                <Tab
                    component={Link}
                    to="#"
                    icon={<PersonOutlineTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                    label={
                        <>
                            Follow-ups Pending
                            <Chip
                                // label={followUpCount.totalArrayLength ? followUpCount.totalArrayLength : 0}
                                label={getFollowUpsListData?.totalDocs ? getFollowUpsListData.totalDocs : 0}
                                size="small"
                                // sx={{ color: theme.palette.secondary.main, background: theme.palette.secondary.light, ml: 1.3 }}
                                sx={{ ml: 0.5 }}
                            />
                        </>
                    }
                    {...a11yProps(0)}
                />
                <Tab
                    component={Link}
                    to="#"
                    icon={<RecentActorsTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                    label={
                        <>
                            Scheduled Calls
                            <Chip
                                // label={callsCount.totalArrayLength ? callsCount.totalArrayLength : 0}
                                label={getCallsListData?.totalDocs ? getCallsListData.totalDocs : 0}
                                size="small"
                                // sx={{ color: theme.palette.secondary.main, background: theme.palette.secondary.light, ml: 1.3 }}
                                sx={{ ml: 0.5 }}
                            />
                        </>
                    }
                    {...a11yProps(1)}
                />
                <Tab
                    component={Link}
                    to="#"
                    icon={<PeopleAltTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                    label={
                        <>
                            RFP
                            <Chip
                                // label={rfpCount.totalArrayLength ? rfpCount.totalArrayLength : 0}
                                label={getRfpListData?.totalDocs ? getRfpListData.totalDocs : 0}
                                size="small"
                                // sx={{ color: theme.palette.secondary.main, background: theme.palette.secondary.light, ml: 1.3 }}
                                sx={{ ml: 0.5 }}
                            />
                        </>
                    }
                    {...a11yProps(2)}
                />
            </Tabs>
            <MainCard content={false} sx={{ overflow: 'auto' }}>
                <PerfectScrollbar
                    component="div"
                    style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#b2b3b3 #f1f1f1'
                    }}
                >
                    <TabPanel value={value} index={0}>
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
        </>
    );
};

NewTabComponent.propTypes = {
    startDate: PropTypes.string,
    endDate: PropTypes.string
};

export default NewTabComponent;
