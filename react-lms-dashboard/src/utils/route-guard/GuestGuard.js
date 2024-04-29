import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// project imports
import useAuth from 'hooks/useAuth';
import { DASHBOARD_PATH } from 'config';

// ==============================|| GUEST GUARD ||============================== //

const GuestGuard = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();

    // useEffect(() => {
    //     console.log('GuestGuard - Checking authentication status:', isAuthenticated);
    //     if (isAuthenticated === true && loading === false) {
    //         console.log('GuestGuard - Redirecting to dashboard.');
    //         navigate(DASHBOARD_PATH, { replace: true });
    //     }
    // }, [isAuthenticated, loading, navigate]);
    useEffect(() => {
        // console.log('GuestGuard - Checking authentication status:', isAuthenticated);
        if (isAuthenticated === true && loading === false) {
            // console.log('GuestGuard - Redirecting to dashboard.');
            navigate(DASHBOARD_PATH, { replace: true });
        } else {
            // console.log('GuestGuard - Allowing access.');
        }
    }, [isAuthenticated, loading, navigate]);

    return children;
};

GuestGuard.propTypes = {
    children: PropTypes.node
};

export default GuestGuard;

// import PropTypes from 'prop-types';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// // project imports
// import useAuth from 'hooks/useAuth';
// import { DASHBOARD_PATH } from 'config';

// // ==============================|| GUEST GUARD ||============================== //

// /**
//  * Guest guard for routes having no auth required
//  * @param {PropTypes.node} children children element/node
//  */

// const GuestGuard = ({ children }) => {
//     const { isAuthenticated, loading } = useAuth();
//     const navigate = useNavigate();

//     useEffect(() => {
//         console.log('load Out');
//         if (isAuthenticated === true && loading === false) {
//             navigate(DASHBOARD_PATH, { replace: true });
//             console.log('load In');
//         }
//     }, [isAuthenticated, loading, navigate]);

//     return children;
// };

// GuestGuard.propTypes = {
//     children: PropTypes.node
// };

// export default GuestGuard;
