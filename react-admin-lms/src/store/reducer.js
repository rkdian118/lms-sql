// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project imports
import snackbarReducer from './slices/snackbar';
import userReducer from './slices/user';
import cartReducer from './slices/cart';
import menuReducer from './slices/menu';
import adminReducer from './slices/adminAuth';
import adminDataReducer from './slices/adminAction';
import clusterReducer from './slices/clusterAction';
import managerReducer from './slices/managerAction';
import businessReducer from './slices/businessAction';
import alertReducer from './alertReducer';
import masterReducer from './slices/masterAction';
import clusterLeadReducer from './slices/clusterLeadAction';
import commonRedcuers from './slices/commonAction';
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    admin: adminReducer,
    snackbar: snackbarReducer,
    alert: alertReducer,
    // kanban: kanbanReducer,
    // customer: customerReducer,
    // contact: contactReducer,
    // product: productReducer,
    // chat: chatReducer,
    // calendar: calendarReducer,
    adminAction: adminDataReducer,
    clusterAction: clusterReducer,
    managerAction: managerReducer,
    clusterLeadAction: clusterLeadReducer,
    businessAction: businessReducer,
    masterAction: masterReducer,
    commonAction: commonRedcuers,
    menu: menuReducer,
    cart: persistReducer(
        {
            key: 'cart',
            storage,
            keyPrefix: 'berry-'
        },
        cartReducer
    )
});

export default reducer;
