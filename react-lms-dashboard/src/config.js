import LAYOUT_CONST from 'constant';
import axios from 'utils/axios';
// basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
// like '/berry-material-react/react/default'

export const DEV_TOOLS = true; // dev=true Live=false
export const BASE_PATH = '/LmsAdmin'; // dev= /LmsAdmin Live=/
export const BASE_URL = process.env.REACT_APP_API_URL;

/* Dev Server Path */
// export const BASE_PATH = '/LmsAdmin';
// export const BASE_URL = 'http://52.22.241.165:10003/';

/* For Live Project */
// export const BASE_PATH = '/';
// export const BASE_URL = 'https://newlms.webmobril.com:10003/';

export const DEV_CUSTOMIZE = true; // dev=true Live=false
export const DASHBOARD_PATH = '/dashboard';
export const LOGIN_PATH = '/';
export const HORIZONTAL_MAX_ITEM = 6;

export const setAuthSession = (serviceToken) => {
    const auth = localStorage.getItem('adminToken');
    if (serviceToken) {
        axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
    } else {
        axios.defaults.headers.common.Authorization = `Bearer ${auth}`;
        // localStorage.removeItem('serviceToken');
        // delete axios.defaults.headers.common.Authorization;
    }
};

const config = {
    layout: LAYOUT_CONST.VERTICAL_LAYOUT, // vertical, horizontal
    drawerType: LAYOUT_CONST.DEFAULT_DRAWER, // default, mini-drawer
    fontFamily: `'Poppins', sans-serif`,
    borderRadius: 10,
    outlinedFilled: true,
    navType: 'light', // light, dark
    presetColor: 'default', // default, theme1, theme2, theme3, theme4, theme5, theme6
    locale: 'en', // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
    rtlLayout: false,
    container: false
};

// const config = {
//     layout: LAYOUT_CONST.VERTICAL_LAYOUT, // vertical, horizontal
//     drawerType: LAYOUT_CONST.DEFAULT_DRAWER, // default, mini-drawer
//     fontFamily: `'Roboto', sans-serif`,
//     borderRadius: 8,
//     outlinedFilled: true,
//     navType: 'light', // light, dark
//     presetColor: 'default', // default, theme1, theme2, theme3, theme4, theme5, theme6
//     locale: 'en', // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
//     rtlLayout: false,
//     container: false
// };
export default config;
