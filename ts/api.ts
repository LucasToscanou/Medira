async function loadSampleWeights(): Promise<{ id: number, weight: number, date: Date }[]> {
    const response = await fetch('../js/data/sampleWeights.json');
    const data = await response.json();
    // Convert the date strings to Date objects
    return data.map((entry: { id: number, weight: number, date: string }) => ({
        ...entry,
        date: new Date(entry.date)
    }));
}

export async function fetchRecords(){
    const data = await loadSampleWeights();

    return data; 
}

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
