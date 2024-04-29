import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Chip, Tab, Tabs, Typography } from '@mui/material';

// assets
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import PanoramaTwoToneIcon from '@mui/icons-material/PanoramaTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import RecentActorsTwoToneIcon from '@mui/icons-material/RecentActorsTwoTone';
import MainCard from 'ui-component/cards/MainCard';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import Groups3Icon from '@mui/icons-material/Groups3';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import BdeDsr from './BDE/BdeDSR';
import ClusterDSR from './ClusterLead/ClusterDSR';
import BranchHeadDSR from './BranchHead/BranchHeadDSR';
// import BdList from './BdList';
// import BdTargets from './BdTargets';
// import ViewTargets from './ViewTargets';
// import BdTargetList from './BdTargetList';
// import BranchList from './BranchList';
// import BranchTargets from './BranchTargets';
// tab content customize
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

const Index = () => {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <MainCard content={false} sx={{ border: '0px solid', padding: '0 10px', mb: 1 }}>
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
                            color: '#4a873b'
                        },
                        '& a > svg': {
                            mb: '0px !important',
                            mr: 1.1
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: '#4a873b'
                        }
                    }}
                >
                    <Tab
                        component={Link}
                        to="#"
                        icon={<TrackChangesIcon sx={{ fontSize: '1.3rem' }} />}
                        label="Branch Head DSR"
                        {...a11yProps(0)}
                    />
                    <Tab
                        component={Link}
                        to="#"
                        icon={<TrackChangesIcon sx={{ fontSize: '1.3rem' }} />}
                        label="Cluster Lead DSR"
                        {...a11yProps(1)}
                    />
                    <Tab
                        component={Link}
                        to="#"
                        icon={<TrackChangesIcon sx={{ fontSize: '1.3rem' }} />}
                        label="BDE DSR"
                        {...a11yProps(2)}
                    />
                </Tabs>
            </MainCard>
            <TabPanel value={value} index={2}>
                <BdeDsr />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ClusterDSR />
            </TabPanel>
            <TabPanel value={value} index={0}>
                <BranchHeadDSR />
            </TabPanel>
        </>
    );
};
export default Index;
