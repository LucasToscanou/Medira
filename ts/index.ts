import { generateFloatArray } from './api.js';
import { WeightTable } from './weightTable.js'
import { weightInput } from './weightInput.js'


function main(){
    const sampleWeights: { weight: number, date: Date }[] = generateFloatArray(10, 90, 115);
    const body = document.getElementsByTagName("body")[0];
    const weightInputContainer = document.getElementById('weight-input-container');
    const tableContainer = document.getElementById('table-container');
    
    const weightInputInstance = new weightInput(sampleWeights[0]);
    console.log(weightInputInstance);
    if (weightInputInstance) {
        if (body && weightInputContainer) {
            body.replaceChild(weightInputInstance.final_div, weightInputContainer);
        }
    }

    const weightHistoryTable = new WeightTable(sampleWeights);
    if (weightHistoryTable) {
        tableContainer?.appendChild(weightHistoryTable.table);
    }
}

main();