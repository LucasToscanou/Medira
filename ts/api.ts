const SERVER_BASE_URL = "http://127.0.0.1:8000/weight/"

async function loadSampleWeights(): Promise<{ id: number, weight: number, date: Date }[]> {
    const response = await fetch('../js/data/sampleWeights.json');
    const data = await response.json();
    // Convert the date strings to Date objects
    return data.map((entry: { id: number, weight: number, date: string }) => ({
        ...entry,
        date: new Date(entry.date)
    }));
}

export async function fetchRecords(ordered?: number){
    const url = SERVER_BASE_URL + "get_all_ordered/dec/";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    } 
}

export async function addRecord(record: { weight: number, date: Date }) {
    console.log(`API: addRecord ${JSON.stringify(record)}`);
    const url = SERVER_BASE_URL + "add_record";

    try {
        const response = await fetch(url, {
            method: 'POST', // Use POST for adding a new record
            headers: {
                'Content-Type': 'application/json', // Specify JSON content
            },
            body: JSON.stringify(record), // Convert the record object to JSON
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Record added successfully:', data);
        return data;
    } catch (error) {
        console.error('Error adding record:', error);
        throw error;
    }
}

export async function dropRecord(record_id: number) {
    console.log(`API: dropRecord ${record_id}`);

    const url = SERVER_BASE_URL + "delete/" + record_id + "/";
    console.log(url);
    try {
        const response = await fetch(url, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        let data = null;
        if (response.headers.get('Content-Type')?.includes('application/json')) {
            data = await response.json();
        }
        console.log(`Record deleted successfully`, data);
        return data;
    } catch (error) {
        console.error('Error deleting  record:', error);
        throw error;
    }
}

export async function updateRecord(id: number, weight?: number, date?: Date) {
    if (!weight && !date) {
        console.error(`API error: updateRecord ${id} didn't get attributes to update`);
        throw new Error(`No attributes provided to update record with ID ${id}`);
    }

    console.log(`API: updateRecord ${id}`);

    const url = SERVER_BASE_URL + "update_record/" + id + "/";
    const body: { weight?: number; date?: string } = {};

    // Include weight and/or date in the request body if provided
    if (weight !== undefined) {
        body.weight = weight;
    }
    if (date !== undefined) {
        body.date = date.toISOString(); // Convert Date object to ISO string
    }

    try {
        const response = await fetch(url, {
            method: 'PUT', // Use PUT for updating a record
            headers: {
                'Content-Type': 'application/json', // Specify JSON content
            },
            body: JSON.stringify(body), // Convert the record object to JSON
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Record updated successfully:', data);
        return data;
    } catch (error) {
        console.error('Error updating record:', error);
        throw error;
    }
}

async function getData(url: string): Promise<any> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
