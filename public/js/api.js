var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const SERVER_BASE_URL = "http://127.0.0.1:8000/weight/";
function loadSampleWeights() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('../js/data/sampleWeights.json');
        const data = yield response.json();
        // Convert the date strings to Date objects
        return data.map((entry) => (Object.assign(Object.assign({}, entry), { date: new Date(entry.date) })));
    });
}
export function fetchRecords(ordered) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = SERVER_BASE_URL + "get_all_ordered/dec/";
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            console.log(data);
            return data;
        }
        catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    });
}
export function addRecord(record) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`API: addRecord ${JSON.stringify(record)}`);
        const url = SERVER_BASE_URL + "add_record";
        try {
            const response = yield fetch(url, {
                method: 'POST', // Use POST for adding a new record
                headers: {
                    'Content-Type': 'application/json', // Specify JSON content
                },
                body: JSON.stringify(record), // Convert the record object to JSON
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            console.log('Record added successfully:', data);
            return data;
        }
        catch (error) {
            console.error('Error adding record:', error);
            throw error;
        }
    });
}
export function dropRecord(record_id) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        console.log(`API: dropRecord ${record_id}`);
        const url = SERVER_BASE_URL + "delete/" + record_id + "/";
        console.log(url);
        try {
            const response = yield fetch(url, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            let data = null;
            if ((_a = response.headers.get('Content-Type')) === null || _a === void 0 ? void 0 : _a.includes('application/json')) {
                data = yield response.json();
            }
            console.log(`Record deleted successfully`, data);
            return data;
        }
        catch (error) {
            console.error('Error deleting  record:', error);
            throw error;
        }
    });
}
export function updateRecord(id, weight, date) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!weight && !date) {
            console.error(`API error: updateRecord ${id} didn't get attributes to update`);
            throw new Error(`No attributes provided to update record with ID ${id}`);
        }
        console.log(`API: updateRecord ${id}`);
        const url = SERVER_BASE_URL + "update_record/" + id + "/";
        const body = {};
        // Include weight and/or date in the request body if provided
        if (weight !== undefined) {
            body.weight = weight;
        }
        if (date !== undefined) {
            body.date = date.toISOString(); // Convert Date object to ISO string
        }
        try {
            const response = yield fetch(url, {
                method: 'PUT', // Use PUT for updating a record
                headers: {
                    'Content-Type': 'application/json', // Specify JSON content
                },
                body: JSON.stringify(body), // Convert the record object to JSON
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            console.log('Record updated successfully:', data);
            return data;
        }
        catch (error) {
            console.error('Error updating record:', error);
            throw error;
        }
    });
}
function getData(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            return data;
        }
        catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    });
}
