import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import Loadable from 'ui-component/Loadable';
import NavMotion from 'layout/NavMotion';
import GuestGuard from 'utils/route-guard/GuestGuard';
import AuthGuard from 'utils/route-guard/AuthGuard';
import { useSelector } from 'react-redux';
import AdminRoutes from './AdminRoutes';
import BranchHeadRoutes from './BranchHeadRoutes';
import BusinessRoutes from './BusinessRoutes';
import ManagerRoutes from './ManagerRoutes';
import ClusterLeadRoutes from './ClusterLeadRoutes';

const LoginPage = Loadable(lazy(() => import('views/pages/authentication/authentication1/Login1')));
// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const auth = useSelector((state) => state.admin);
    const { adminRole } = auth;
    const AuthRoutes = {
        items: (() => {
            switch (adminRole) {
                case 'Admin':
                    return AdminRoutes; // Assuming 'AdminDashboard' is an array
                case 'Cluster':
                    return BranchHeadRoutes;
                case 'Manager':
                    return ManagerRoutes;
                case 'ClusterLead':
                    return ClusterLeadRoutes;
                case 'Business':
                    return BusinessRoutes;
                default:
                    return MainRoutes;
            }
        })()
    };
    // console.log('🚀  AuthRoutes:', AuthRoutes);

    return useRoutes([
        {
            path: '/',
            element: (
                <NavMotion>
                    <AuthGuard>
                        <LoginPage />
                    </AuthGuard>
                </NavMotion>
            )
        },
        LoginRoutes,
        AuthRoutes.items
    ]);
}
