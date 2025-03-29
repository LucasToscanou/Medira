var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function loadSampleWeights() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('../js/data/sampleWeights.json');
        const data = yield response.json();
        // Convert the date strings to Date objects
        return data.map((entry) => (Object.assign(Object.assign({}, entry), { date: new Date(entry.date) })));
    });
}
export function fetchRecords() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield loadSampleWeights();
        return data;
    });
}
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
