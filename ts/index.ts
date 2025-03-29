import { WeightTable } from './weightTable.js'
import { weightInput } from './weightInput.js'
import { fetchRecords, addRecord, dropRecord, updateRecord } from "./api.js";

class Main {
    private weightHistoryData!: { id: number, weight: number, date: Date }[];
    private body: HTMLBodyElement;
    private tableContainer!: HTMLDivElement;
    
    constructor() {
        this.body = document.getElementsByTagName("body")[0];
        const tableElement = <HTMLDivElement>document.getElementById('table-container');
        this.tableContainer = tableElement;
        
        this.initialize();
    }
    
    private async initialize() {
        await this.getWeighHistoryData();
        this.createWeightInput();
        this.createWeightHistoryTable();
        this.setEventListeners();
    }

    private setEventListeners() {
        window.addEventListener("addWeightRecord", async (event: Event) => {
            const customEvent = event as CustomEvent;
            
            // API call
            addRecord(customEvent.detail);
            await this.refreshTable();
            console.log(this.weightHistoryData);
        });

        window.addEventListener("refreshTable", async (event: Event) => {
            await this.refreshTable();
        });
    }

    private createWeightInput() {
        const weightInputContainer = document.getElementById('weight-input-container');
        const weightInputInstance = new weightInput(this.weightHistoryData[0]);
        if (weightInputInstance) {
            if (this.body && weightInputContainer) {
                this.body.replaceChild(weightInputInstance.final_div, weightInputContainer);
            }
        }
    }

    private createWeightHistoryTable() {
        const weightHistoryTable = new WeightTable(this.weightHistoryData);
        if (weightHistoryTable) {
            this.tableContainer?.appendChild(weightHistoryTable.table);
        }
    }


    private async refreshTable(){
        await this.getWeighHistoryData();
        
        const new_weightHistoryTable = new WeightTable(this.weightHistoryData);
        if(this.tableContainer?.firstChild && new_weightHistoryTable){
            this.tableContainer.replaceChild(new_weightHistoryTable.table, this.tableContainer.firstChild);
        }
    }


    private async getWeighHistoryData() {
        this.weightHistoryData = await fetchRecords();
    }

}



const main = new Main();