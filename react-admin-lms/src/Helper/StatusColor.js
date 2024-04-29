export const getLeadStatusColor = (value) => {
    let backgroundColor;
    if (value === 'Active') {
        backgroundColor = '#00c853';
    } else if (value === 'Dead') {
        backgroundColor = '#f44336';
    } else if (value === 'Hot Prospect') {
        backgroundColor = '#ffab91';
    } else if (value === 'Hold') {
        backgroundColor = '#ffc107';
    } else if (value === 'Lead Return') {
        backgroundColor = '#7c4dff';
    } else if (value === 'Awarded') {
        backgroundColor = '#2196f3';
    } else if (value === 'In Discussion') {
        backgroundColor = '#c77e23';
    } else if (value === 'Proposal Submitted') {
        backgroundColor = '#1B4242';
    } else if (value === 'Negotiation') {
        backgroundColor = '#9BBEC8';
    } else {
        backgroundColor = '#b5dbff';
    }
    return backgroundColor;
};

export const getCallStatusColor = (value) => {
    let backgroundColor;
    if (value === 'Meeting Scheduled') {
        backgroundColor = '#00c853';
    } else if (value === 'Meeting Cancelled') {
        backgroundColor = '#f44336';
    } else if (value === 'Meeting Re-Scheduled') {
        backgroundColor = '#7c4dff';
    } else if (value === 'Meeting Done') {
        backgroundColor = '#2196f3';
    } else {
        backgroundColor = '#b5dbff';
    }
    return backgroundColor;
};

export const getRFPStatusColor = (value) => {
    let backgroundColor;
    if (value === 'Request For Proposal') {
        backgroundColor = '#7c4dff';
    } else if (value === 'RFP Pending') {
        backgroundColor = '#f44336';
    } else if (value === 'RFP Received') {
        backgroundColor = '#ffc107';
    } else if (value === 'Revised RFP') {
        backgroundColor = '#2196f3';
    } else if (value === 'RFP Approved') {
        backgroundColor = '#00c853';
    } else {
        backgroundColor = '#b5dbff';
    }
    return backgroundColor;
};
