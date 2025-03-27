export function generateFloatArray(size, min, max) {
    return Array.from({ length: size }, () => ({
        weight: Math.random() * (max - min) + min,
        date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)) // Random date within the last ~115 days
    }));
}
;
export function addRecord(record) {
    console.log(`API: addRecord ${record}`);
}
export function dropRecord(record) {
    console.log(`API: dropRecord ${record}`);
}
export function updateRecord(id, weight, date) {
    if (weight || date) {
        console.log(`API: updateRecord ${id.toFixed(0)}`);
    }
    else {
        console.log(`API error: updateRecord ${id.toFixed(0)} didn't get atributes to update`);
    }
}
