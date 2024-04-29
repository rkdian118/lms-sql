/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';

// routing
import Routes from 'routes';

// project imports
import Locales from 'ui-component/Locales';
import NavigationScroll from 'layout/NavigationScroll';
import RTLLayout from 'ui-component/RTLLayout';
import Snackbar from 'ui-component/extended/Snackbar';
import Loader from 'ui-component/Loader';

import ThemeCustomization from 'themes';
import { dispatch } from 'store';
import { getMenu } from 'store/slices/menu';

// auth provider
import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
import { setAuthSession } from 'config';
import { AdminDetailApi } from 'store/slices/adminAuth';
import { connect, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openSnackbar } from 'store/slices/snackbar';
import 'rsuite/dist/rsuite.min.css';
// import { FirebaseProvider as AuthProvider } from 'contexts/FirebaseContext';
// import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';
// import { Auth0Provider as AuthProvider } from 'contexts/Auth0Context';

// ==============================|| APP ||============================== //

const App = ({ AdminDetailApi }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const newRole = localStorage.getItem('adminToken');
    const { adminToken, adminRole } = useSelector((state) => state.admin);

    useEffect(() => {
        setAuthSession(newRole);
        AdminDetailApi(adminToken, adminRole).then((res) => {
            // console.log('🚀  res:', res);
            if (res.ResponseCode === 207 && res.succeeded === false) {
                navigate('/');
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminRole');
                dispatch(
                    openSnackbar({
                        open: true,
                        message: res.ResponseMessage,
                        variant: 'alert',
                        alert: {
                            color: 'error'
                        },
                        transition: 'Fade',
                        anchorOrigin: { vertical: 'top', horizontal: 'right' }
                    })
                );
            }
            if (res.ResponseCode === 403 && res.succeeded === false) {
                navigate('/');
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminRole');
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Session Timeout',
                        // message: res.ResponseMessage,
                        variant: 'alert',
                        alert: {
                            color: 'error'
                        },
                        transition: 'Fade',
                        anchorOrigin: { vertical: 'top', horizontal: 'right' }
                    })
                );
            }
        });
    }, []);

    return (
        <ThemeCustomization>
            <RTLLayout>
                <Locales>
                    <NavigationScroll>
                        <AuthProvider>
                            <>
                                <Routes />
                                <Snackbar />
                            </>
                        </AuthProvider>
                    </NavigationScroll>
                </Locales>
            </RTLLayout>
        </ThemeCustomization>
    );
};

// export default App;
export default connect(null, { AdminDetailApi })(App);
