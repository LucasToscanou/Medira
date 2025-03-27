export function generateFloatArray(size: number, min: number, max: number): { weight: number, date: Date }[] {
    return Array.from({ length: size }, () => ({
        weight: Math.random() * (max - min) + min,
        date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)) // Random date within the last ~115 days
    }));
};


export function addRecord(record: { weight: number, date: Date }) {
    console.log(`API: addRecord ${record}`);
}

export function dropRecord(record: { weight: number, date: Date }) {
    console.log(`API: dropRecord ${record}`);
}

export function updateRecord(id: number, weight?: number, date?: Date) {
    if (weight || date) {
        console.log(`API: updateRecord ${id.toFixed(0)}`);
    }
    else{
        console.log(`API error: updateRecord ${id.toFixed(0)} didn't get atributes to update`);
    }
}
