import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Tab, Tabs } from '@mui/material';

// project imports
// import Profile from './Profile';
// import Billing from './Billing';
// import Security from './Security';
// import Notifications from './Notifications';
import MainCard from 'ui-component/cards/MainCard';
import Profile from './Profile';
import ChangePassword from './ChangePassword';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';

// tabs
function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
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

// ==============================|| PROFILE 3 ||============================== //

const Profile3 = () => {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <MainCard title="Account Setting">
            <div>
                <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                    aria-label="simple tabs example"
                    variant="scrollable"
                    sx={{
                        mb: 3,
                        '& a': {
                            minHeight: 'auto',
                            minWidth: 10,
                            py: 1.5,
                            px: 1,
                            mr: 2.25,
                            color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        },
                        '& a.Mui-selected': {
                            color: theme.palette.primary.main
                        },
                        '& .MuiTabs-indicator': {
                            bottom: 2
                        },
                        '& a > svg': {
                            marginBottom: '0px !important',
                            mr: 1.25
                        }
                    }}
                >
                    <Tab
                        icon={<AccountCircleTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                        component={Link}
                        to="#"
                        label="Personal Details"
                        {...a11yProps(0)}
                    />
                    <Tab
                        icon={<LockTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                        component={Link}
                        to="#"
                        label="Change Password"
                        {...a11yProps(1)}
                    />
                    {/* <Tab component={Link} to="#" label="Security" {...a11yProps(2)} />
                    <Tab component={Link} to="#" label="Notifications" {...a11yProps(3)} /> */}
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Profile />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ChangePassword />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    {/* <Security /> */}
                </TabPanel>
                <TabPanel value={value} index={3}>
                    {/* <Notifications /> */}
                </TabPanel>
            </div>
        </MainCard>
    );
};

export default Profile3;
