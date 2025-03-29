import { createActionBtn } from "./editBtns.js";
import { updateRecord } from "./api.js";
export class WeightTable {
    constructor(weightHistoryValues) {
        this.currentEditingRecordId = null;
        this.rowsData = weightHistoryValues;
        this.max_row_id = -1;
        this.table = this.createTable();
        this.populateTable();
    }
    // 
    createTable() {
        const header_tr = document.createElement("tr");
        header_tr.id = "table-tr";
        const header_names = ["Date", "Weight", "Actions"];
        for (let i = 0; i < header_names.length; i++) {
            let h = document.createElement("td");
            h.textContent = header_names[i];
            header_tr.appendChild(h);
        }
        const table = document.createElement("table");
        table.id = "weight-table";
        table.appendChild(header_tr);
        return table;
    }
    populateTable() {
        for (let i = 0; i < this.rowsData.length; i++) {
            this.addRow(this.rowsData[i]);
        }
    }
    addRow(record, reverse) {
        this.max_row_id++;
        const row_id = this.max_row_id;
        const date_td = document.createElement("td");
        date_td.textContent = record.date.toLocaleString();
        const weight_p = document.createElement("p");
        weight_p.textContent = record.weight.toFixed(2);
        weight_p.classList.add("table-weight-p");
        const weight_td = document.createElement("td");
        weight_td.classList.add("table-weight-td");
        weight_td.appendChild(weight_p);
        const editBtn = createActionBtn("edit", "edit-action-btn", () => this.startEditingRecord(row_id));
        const deleteBtn = createActionBtn("delete", "delete-action-btn", () => this.deleteRecord(row_id));
        const btn_td = document.createElement("td");
        btn_td.id = "table-actions-td";
        btn_td.appendChild(editBtn);
        btn_td.appendChild(deleteBtn);
        const tr = document.createElement("tr");
        tr.id = `tr-${row_id.toFixed(0)}`;
        tr.appendChild(date_td);
        tr.appendChild(weight_td);
        tr.appendChild(btn_td);
        if (reverse) {
            const headerRow = this.table.querySelector("tr:first-child");
            if (headerRow === null || headerRow === void 0 ? void 0 : headerRow.nextSibling) {
                this.table.insertBefore(tr, headerRow.nextSibling);
            }
        }
        else {
            this.table.appendChild(tr);
        }
    }
    // Creates the editing workspace
    startEditingRecord(row_id) {
        const weightTable = document.getElementById("weight-table");
        const record_tr = weightTable === null || weightTable === void 0 ? void 0 : weightTable.querySelector(`#tr-${row_id.toFixed(0)}`);
        if (record_tr) {
            const input_field = document.createElement("input");
            input_field.classList.add("input-editing");
            const inc_btn = createActionBtn("+0.1", "inc-action-btn-editing", () => this.incrementRowWeight(row_id, 0.1));
            const dec_btn = createActionBtn("-0.1", "dec-action-btn-editing", () => this.incrementRowWeight(row_id, -0.1));
            const save_btn = createActionBtn("Save", "save-action-btn-editing", () => this.saveEditedWeight(row_id));
            const cancel_btn = createActionBtn("Cancel", "cancel-action-btn-editing", () => this.stopEditingRecord(row_id));
            const weight_td = record_tr.querySelector("td.table-weight-td");
            const weight_p = record_tr.querySelector("p.table-weight-p");
            if (weight_p) {
                input_field.value = weight_p.textContent || "";
            }
            const actionsField = record_tr.querySelector("#table-actions-td");
            const edit_btn = record_tr.querySelector("#edit-action-btn");
            const delete_btn = record_tr.querySelector("#delete-action-btn");
            if (weight_td && weight_p && actionsField && edit_btn && delete_btn) {
                weight_p.classList.add("hidden");
                weight_td.appendChild(input_field);
                actionsField.appendChild(inc_btn);
                actionsField.appendChild(dec_btn);
                actionsField.appendChild(save_btn);
                actionsField.appendChild(cancel_btn);
                edit_btn.classList.add("hidden");
                delete_btn.classList.add("hidden");
                if (this.currentEditingRecordId) {
                    this.stopEditingRecord(this.currentEditingRecordId);
                }
                this.currentEditingRecordId = row_id;
            }
        }
        else {
            console.log('Record not found');
        }
    }
    // Removes the editing workspace
    stopEditingRecord(row_id) {
        const weightTable = document.getElementById("weight-table");
        const record_tr = weightTable === null || weightTable === void 0 ? void 0 : weightTable.querySelector(`#tr-${row_id.toFixed(0)}`);
        const weight_p = record_tr === null || record_tr === void 0 ? void 0 : record_tr.querySelector("p.table-weight-p");
        if (weight_p) {
            weight_p.classList.remove("hidden");
        }
        const input_field = record_tr === null || record_tr === void 0 ? void 0 : record_tr.querySelector("input.input-editing");
        input_field === null || input_field === void 0 ? void 0 : input_field.remove();
        const inc_btn = record_tr === null || record_tr === void 0 ? void 0 : record_tr.querySelector("#inc-action-btn-editing");
        const dec_btn = record_tr === null || record_tr === void 0 ? void 0 : record_tr.querySelector("#dec-action-btn-editing");
        const save_btn = record_tr === null || record_tr === void 0 ? void 0 : record_tr.querySelector("#save-action-btn-editing");
        const cancel_btn = record_tr === null || record_tr === void 0 ? void 0 : record_tr.querySelector("#cancel-action-btn-editing");
        const edit_btn = record_tr === null || record_tr === void 0 ? void 0 : record_tr.querySelector("#edit-action-btn");
        const delete_btn = record_tr === null || record_tr === void 0 ? void 0 : record_tr.querySelector("#delete-action-btn");
        inc_btn === null || inc_btn === void 0 ? void 0 : inc_btn.remove();
        dec_btn === null || dec_btn === void 0 ? void 0 : dec_btn.remove();
        save_btn === null || save_btn === void 0 ? void 0 : save_btn.remove();
        cancel_btn === null || cancel_btn === void 0 ? void 0 : cancel_btn.remove();
        edit_btn === null || edit_btn === void 0 ? void 0 : edit_btn.classList.remove("hidden");
        delete_btn === null || delete_btn === void 0 ? void 0 : delete_btn.classList.remove("hidden");
        this.currentEditingRecordId = null;
        console.log(`Hiding editing actions of row_id ${row_id}.`);
    }
    // Sums 'delta' to the weight value on the table row (there is no api call)
    incrementRowWeight(row_id, delta) {
        const weightTable = document.getElementById("weight-table");
        const input_field = weightTable === null || weightTable === void 0 ? void 0 : weightTable.querySelector(`input.input-editing`);
        const old_weight = Number(input_field === null || input_field === void 0 ? void 0 : input_field.value);
        if (input_field) {
            input_field.value = (old_weight + delta).toFixed(2);
        }
    }
    // API call to update the record weight
    saveEditedWeight(row_id) {
        const weightTable = document.getElementById("weight-table");
        const record_tr = weightTable === null || weightTable === void 0 ? void 0 : weightTable.querySelector(`#tr-${row_id.toFixed(0)}`);
        const input_field = record_tr === null || record_tr === void 0 ? void 0 : record_tr.querySelector("input.input-editing");
        const new_weight = parseFloat(input_field.value);
        console.log(`Save edited weight of row_id ${row_id} - ${new_weight}`);
        updateRecord(row_id, new_weight);
        const detail = { "id": this.rowsData[row_id].id, "new_weight": new_weight };
        const event = new CustomEvent("updateWeightRecord", { detail: detail });
        window.dispatchEvent(event);
        this.stopEditingRecord(row_id);
    }
    deleteRecord(index) {
        const event = new CustomEvent("deleteWeightRecord", { detail: this.rowsData[index].id });
        window.dispatchEvent(event);
    }
}
