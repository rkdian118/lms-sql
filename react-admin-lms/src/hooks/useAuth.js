// auth provider
import { useSelector } from 'react-redux';
// ==============================|| AUTH HOOKS ||============================== //

const useAuth = () => {
    const auth = useSelector((state) => state.admin);
    const { isAuthenticated, loading } = auth;

    return auth;
};

export default useAuth;
