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
    Checkbox,
    Avatar
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
import { gridSpacing } from 'store/constant';
import Avatar1 from 'assets/images/users/avatar-1.png';
import Avatar2 from 'assets/images/users/avatar-2.png';
import Avatar3 from 'assets/images/users/avatar-3.png';
import Avatar4 from 'assets/images/users/avatar-4.png';
import Avatar5 from 'assets/images/users/avatar-5.png';
import Avatar6 from 'assets/images/users/avatar-6.png';
import Avatar7 from 'assets/images/users/avatar-7.png';
import BDDetailsModels from './Models/BDDetailsModels';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
// ==============================|| DEFAULT TeamMember ||============================== //
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

const LeadsArray = [
    {
        id: 1,
        leadName: 'Lead ID XXXX',
        profile_pic: Avatar1
    },
    {
        id: 2,
        leadName: 'Lead ID XXXX',
        profile_pic: Avatar2
    },
    {
        id: 3,
        leadName: 'Lead ID XXXX',
        profile_pic: Avatar3
    },
    {
        id: 4,
        leadName: 'Lead ID XXXX',
        profile_pic: Avatar4
    },
    {
        id: 5,
        leadName: 'Lead ID XXXX',
        profile_pic: Avatar5
    },
    {
        id: 6,
        leadName: 'Lead ID XXXX',
        profile_pic: Avatar6
    },
    {
        id: 7,
        leadName: 'Lead ID XXXX',
        profile_pic: Avatar7
    },
    {
        id: 8,
        leadName: 'Lead ID XXXX',
        profile_pic: Avatar1
    },
    {
        id: 9,
        leadName: 'Lead ID XXXX',
        profile_pic: Avatar2
    },
    {
        id: 10,
        leadName: 'Lead ID XXXX',
        profile_pic: Avatar3
    },
    {
        id: 11,
        leadName: 'Lead ID XXXX',
        profile_pic: Avatar1
    },
    {
        id: 12,
        leadName: 'Lead ID XXXX',
        profile_pic: Avatar2
    },
    {
        id: 13,
        leadName: 'Lead ID XXXX',
        profile_pic: Avatar3
    },
    {
        id: 14,
        leadName: 'Lead ID XXXX',
        profile_pic: Avatar1
    },
    {
        id: 15,
        leadName: 'Lead ID XXXX',
        profile_pic: Avatar2
    },
    {
        id: 16,
        leadName: 'Lead ID XXXX',
        profile_pic: Avatar3
    },
    {
        id: 17,
        leadName: 'Lead ID XXXX',
        profile_pic: Avatar1
    },
    {
        id: 18,
        leadName: 'Lead ID XXXX',
        profile_pic: Avatar2
    },
    {
        id: 19,
        leadName: 'Lead ID XXXX',
        profile_pic: Avatar3
    },
    {
        id: 20,
        leadName: 'Lead ID XXXX',
        profile_pic: Avatar1
    }
];

const TeamMember = () => {
    const theme = useTheme();
    const [isLoading, setLoading] = useState(true);
    const [openModelDetail, setOpenModelDetail] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [selectedAll, setSelectedAll] = useState(false);

    // Function to handle individual listing checkbox click
    const handleCheckboxClick = (event, id) => {
        if (event.target.checked) {
            setSelectedIds((prevSelectedIds) => [...prevSelectedIds, id]);
        } else {
            setSelectedIds((prevSelectedIds) => prevSelectedIds.filter((item) => item !== id));
            setSelectedAll(false); // Uncheck "Select All" if any individual checkbox is unchecked
        }
    };

    // Function to handle "Select All" checkbox click
    const handleSelectAll = (event) => {
        setSelectedAll(event.target.checked);
        if (event.target.checked) {
            const allIds = LeadsArray.map((item) => item.id);
            setSelectedIds(allIds);
        } else {
            setSelectedIds([]);
        }
    };

    const onClickModel = (e) => {
        setOpenModelDetail(true);
    };

    // console.log('🚀 selectedIds:', selectedIds);

    return (
        <>
            <MainCard
                content={false}
                sx={{
                    height: '910px',
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
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container sx={{ background: '#f9e2de' }}>
                                <Grid item xs={9}>
                                    <Typography
                                        variant="h3"
                                        align="center"
                                        p="10px"
                                        color="#b276a8"
                                        sx={{
                                            borderRadius: '10px',
                                            color: '#d76a6a',
                                            paddingLeft: '130px'
                                            // background: '#f9e2de'
                                        }}
                                    >
                                        Team Member
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography
                                        variant="h5"
                                        align="center"
                                        // p="10px"
                                        color="#b276a8"
                                        sx={{
                                            borderRadius: '10px',
                                            color: '#d76a6a'
                                            // background: '#f9e2de'
                                        }}
                                    >
                                        <Checkbox
                                            // color="#d76a6a"
                                            checked={selectedAll}
                                            onChange={handleSelectAll}
                                            sx={{
                                                color: '#d76a6a',
                                                '&.Mui-checked': { color: '#d76a6a' }
                                            }}
                                        />
                                        Select All
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                ' &.MuiGrid-root': { pt: '5px', mx: '15px' }
                            }}
                        >
                            {LeadsArray.map((list, i) => (
                                <Grid
                                    container
                                    spacing={0}
                                    sx={{ backgroundColor: '#f9e2de', my: 1.5, padding: '5px 10px', borderRadius: '5px' }}
                                    key={i}
                                >
                                    <Grid item xs={8} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Checkbox
                                            // color="#d76a6a"
                                            checked={selectedIds.includes(list.id)}
                                            onChange={(e) => handleCheckboxClick(e, list.id)}
                                            sx={{
                                                color: '#d76a6a',
                                                '&.Mui-checked': { color: '#d76a6a' }
                                            }}
                                        />
                                        {/* <MuiTypography variant="h5">{`${list.id}. ${list.leadName}`}</MuiTypography> */}
                                        <Grid item>
                                            <Avatar alt="User 1" src={list.profile_pic} sx={{ margin: '0 12px' }} />
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <Typography align="left" component="div" variant="subtitle1">
                                                David Jones
                                            </Typography>
                                            <Typography align="left" component="div" variant="subtitle2">
                                                Developer
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '20px' }}>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                background: '#d76a6a',
                                                color: '#ffffff',
                                                padding: '0px 25px',
                                                my: 1,
                                                borderRadius: '5px',
                                                '&:hover': {
                                                    background: '#f2be56',
                                                    color: '#000000'
                                                }
                                            }}
                                            onClick={(e) => onClickModel()}
                                        >
                                            View
                                        </Button>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                ' &.MuiGrid-root': { pt: '5px', mx: '15px' }
                            }}
                        >
                            <Box
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    width: '100%'
                                }}
                            >
                                <Button
                                    variant="contained"
                                    sx={{
                                        border: '2px solid #d76a6a',
                                        background: '#ffffff',
                                        color: '#d76a6a',
                                        padding: '5px 25px',
                                        my: 1,
                                        borderRadius: '5px',
                                        '&:hover': {
                                            background: '#d76a6a',
                                            color: '#ffffff'
                                        }
                                    }}
                                >
                                    Add New BD <AddCircleRoundedIcon sx={{ ml: 1 }} />
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </PerfectScrollbar>
            </MainCard>
            {openModelDetail && <BDDetailsModels open={openModelDetail} close={() => setOpenModelDetail(false)} />}
        </>
    );
};

export default TeamMember;
