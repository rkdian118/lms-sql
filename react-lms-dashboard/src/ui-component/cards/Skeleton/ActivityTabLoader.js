import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import { connect, useSelector } from 'react-redux';
// material-ui
import {
    IconButton,
    Typography,
    Slide,
    Dialog,
    DialogContent,
    DialogTitle,
    CircularProgress,
    FormControl,
    FormHelperText,
    TextField,
    Grid,
    Button,
    Box,
    Alert,
    DialogActions,
    InputLabel,
    OutlinedInput,
    Divider,
    Select,
    MenuItem,
    Autocomplete,
    CardActions,
    CardContent,
    Tab,
    Tabs,
    Skeleton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
// import { excelDataImport } from './../../../store/slices/restroCatAction';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { styled, useTheme } from '@mui/material/styles';
import { openPopupModel } from 'store/slices/menu';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { countries } from 'Helper/CountriesData';

// project imports
// import UserProfile from './UserProfile';
// import Billing from './Billing';
// import Payment from './Payment';
// import ChangePassword from './ChangePassword';
import useConfig from 'hooks/useConfig';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';

// assets
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import CreditCardTwoToneIcon from '@mui/icons-material/CreditCardTwoTone';
import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
import { LeadsTableLoader } from 'ui-component/cards/Skeleton/MuiTableLoader';

// tabs
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

// tabs option
function countryToFlag(isoCode) {
    return typeof String.fromCodePoint !== 'undefined'
        ? isoCode.toUpperCase().replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
        : isoCode;
}

export const ActivityTabLoader = ({ rows, tabRows }) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // console.log('🚀formik:', formik.values);

    return (
        <>
            {[...Array(rows)].map((elementInArray, index) => (
                <Tab
                    key={index}
                    // icon={tab.icon}
                    label={
                        <Grid container direction="column">
                            <Typography variant="subtitle1" color="inherit">
                                <Skeleton variant="rectangular" height={30} sx={{ my: 0.5 }} />
                            </Typography>
                            <Typography component="div" variant="caption" sx={{ textTransform: 'capitalize' }}>
                                <Skeleton variant="rectangular" height={10} sx={{ my: 0.5 }} />
                            </Typography>
                        </Grid>
                    }
                    {...a11yProps(index)}
                />
            ))}
        </>
    );
};

export const ActivityTabContentLoader = ({ rows, tabRows }) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            {[...Array(tabRows)].map((elementInArray, index) => (
                <TabPanel value={value} index={0} key={index}>
                    <Grid container direction="column">
                        <Typography variant="subtitle1" color="inherit">
                            <Skeleton variant="rectangular" height={30} sx={{ my: 1 }} />
                        </Typography>
                        <Typography component="div" variant="caption" sx={{ textTransform: 'capitalize' }}>
                            <Skeleton variant="rectangular" height={30} sx={{ my: 1 }} />
                        </Typography>
                    </Grid>
                </TabPanel>
            ))}
        </>
    );
};
