// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconMenu, IconBoxMultiple, IconCircleOff, IconCircle, IconBrandGravatar, IconShape } from '@tabler/icons';

// constant
const icons = {
    IconMenu,
    IconBoxMultiple,
    IconCircleOff,
    IconCircle,
    IconBrandGravatar,
    IconShape
};

// ==============================|| SUPPORT MENU ITEMS ||============================== //

const RFP = {
    id: 'RFP',
    // title: <FormattedMessage id="others" />,
    type: 'group',
    children: [
        {
            id: 'proposal-shared',
            title: <FormattedMessage id="proposal-shared" />,
            type: 'item',
            url: '#',
            icon: IconCircle,
            color: '#5974ff',
            chip: {
                label: '450',
                color: 'primary'
            }
        },
        {
            id: 'pending-proposal',
            title: <FormattedMessage id="pending-proposal" />,
            type: 'item',
            url: '#',
            icon: IconCircleOff,
            color: '#6cd7fd',
            chip: {
                label: '500',
                color: 'success'
            }
        },
        {
            id: 'total-amount',
            title: <FormattedMessage id="total-amount" />,
            type: 'item',
            url: '#',
            color: '#ee9b9b',
            icon: IconShape,
            chip: {
                label: '900',
                color: 'error'
            }
        }
    ]
};

export default RFP;
