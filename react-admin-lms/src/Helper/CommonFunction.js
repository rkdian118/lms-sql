export function countKeysAndArraysLength(data) {
    let totalKeys = 0;
    let totalArrayLength = 0;

    Object.keys(data).forEach((key) => {
        totalKeys += 1;
        // console.log('🚀  key:', key);
        if (key !== '8th follow up') {
            if (Array.isArray(data[key])) {
                totalArrayLength += data[key].length;
            }
        }
    });

    return { totalKeys, totalArrayLength };
}
