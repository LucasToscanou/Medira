var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { WeightTable } from './weightTable.js';
import { weightInput } from './weightInput.js';
import { fetchRecords, addRecord } from "./api.js";
class Main {
    constructor() {
        this.body = document.getElementsByTagName("body")[0];
        const tableElement = document.getElementById('table-container');
        this.tableContainer = tableElement;
        this.initialize();
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getWeighHistoryData();
            this.createWeightInput();
            this.createWeightHistoryTable();
            this.setEventListeners();
        });
    }
    setEventListeners() {
        window.addEventListener("addWeightRecord", (event) => __awaiter(this, void 0, void 0, function* () {
            const customEvent = event;
            // API call
            addRecord(customEvent.detail);
            yield this.refreshTable();
            console.log(this.weightHistoryData);
        }));
        window.addEventListener("refreshTable", (event) => __awaiter(this, void 0, void 0, function* () {
            yield this.refreshTable();
        }));
    }
    createWeightInput() {
        const weightInputContainer = document.getElementById('weight-input-container');
        const weightInputInstance = new weightInput(this.weightHistoryData[0]);
        if (weightInputInstance) {
            if (this.body && weightInputContainer) {
                this.body.replaceChild(weightInputInstance.final_div, weightInputContainer);
            }
        }
    }
    createWeightHistoryTable() {
        var _a;
        const weightHistoryTable = new WeightTable(this.weightHistoryData);
        if (weightHistoryTable) {
            (_a = this.tableContainer) === null || _a === void 0 ? void 0 : _a.appendChild(weightHistoryTable.table);
        }
    }
    refreshTable() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            yield this.getWeighHistoryData();
            const new_weightHistoryTable = new WeightTable(this.weightHistoryData);
            if (((_a = this.tableContainer) === null || _a === void 0 ? void 0 : _a.firstChild) && new_weightHistoryTable) {
                this.tableContainer.replaceChild(new_weightHistoryTable.table, this.tableContainer.firstChild);
            }
        });
    }
    getWeighHistoryData() {
        return __awaiter(this, void 0, void 0, function* () {
            this.weightHistoryData = yield fetchRecords();
        });
    }
}
const main = new Main();
