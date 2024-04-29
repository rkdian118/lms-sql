export function countKeysAndArraysLength(data) {
    let totalKeys = 0;
    let totalArrayLength = 0;

    Object.keys(data).forEach((key) => {
        totalKeys += 1;
        if (key !== '8th follow up') {
            if (Array.isArray(data[key])) {
                totalArrayLength += data[key].length;
            }
        }
    });

    return { totalKeys, totalArrayLength };
}

export const CommentRemarks = [
    { type: 2, label: 'Closure' },
    { type: 2, label: 'Proposal – your status' },
    { type: 2, label: 'Meeting done – Your status' },
    { type: 2, label: 'Response - (whatever response got from the client)' },
    { type: 2, label: 'Not a lead – Lead Returned/fake lead/repeat lead' },
    { type: 2, label: 'Not Found – not assign to me / not in my DSR' },
    { type: 2, label: 'No requirements – Not Interested/Budget issue' },
    { type: 1, label: 'No response after intro mail' },
    { type: 1, label: 'No response after 1 follow up' },
    { type: 1, label: 'No response after 2 follow ups' },
    { type: 1, label: 'No response after 3 follow ups' },
    { type: 1, label: 'No response after 4 follow ups' },
    { type: 1, label: 'No response after 5 follow ups' },
    { type: 1, label: 'No response after 6 follow ups' },
    { type: 1, label: 'No response after 7 follow ups' },
    { type: 1, label: 'No response after 8 follow ups' }
];
