import { createActionBtn } from "./editBtns.js";
import { updateRecord } from "./api.js";
export class WeightTable {
    constructor(weightHistoryValues) {
        this.currentEditingRecordId = null;
        this.weightHistoryValues = weightHistoryValues;
        this.top_id = this.weightHistoryValues.length;
        this.table = this.createTable();
        this.populateTable();
        // Listen for the custom event
        window.addEventListener("newWeightAdded", (event) => {
            const customEvent = event;
            this.addRecord(customEvent.detail);
        });
    }
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
        for (let i = 0; i < this.weightHistoryValues.length; i++) {
            this.addRow(this.weightHistoryValues[i], i);
        }
    }
    addRow(record, id) {
        const date_td = document.createElement("td");
        date_td.textContent = record.date.toLocaleString();
        const weight_p = document.createElement("p");
        weight_p.textContent = record.weight.toFixed(2);
        weight_p.classList.add("table-weight-p");
        const weight_td = document.createElement("td");
        weight_td.classList.add("table-weight-td");
        weight_td.appendChild(weight_p);
        const editBtn = createActionBtn("edit", `edit-action-btn-${id.toFixed(0)}`, () => this.startEditingRecord(id));
        const deleteBtn = createActionBtn("delete", `delete-action-btn-${id.toFixed(0)}`, () => this.deleteRecord(id));
        const btn_td = document.createElement("td");
        btn_td.id = "table-actions-td";
        btn_td.appendChild(editBtn);
        btn_td.appendChild(deleteBtn);
        const tr = document.createElement("tr");
        tr.id = `tr-${id.toFixed(0)}`;
        tr.appendChild(date_td);
        tr.appendChild(weight_td);
        tr.appendChild(btn_td);
        this.table.appendChild(tr);
    }
    addToRecordWeight(record_id, delta) {
        const weightTable = document.getElementById("weightTable");
        const record_tr = weightTable === null || weightTable === void 0 ? void 0 : weightTable.querySelector(`#tr-${record_id.toFixed(0)}`);
        const weight = record_tr === null || record_tr === void 0 ? void 0 : record_tr.querySelector("p.table-weight-p");
        console.log(weight === null || weight === void 0 ? void 0 : weight.textContent);
        const old_weight = Number(weight === null || weight === void 0 ? void 0 : weight.textContent);
        if (weight) {
            weight.textContent = (old_weight + delta).toFixed(2);
        }
    }
    startEditingRecord(record_id) {
        const weightTable = document.getElementById("weightTable");
        const record_tr = weightTable === null || weightTable === void 0 ? void 0 : weightTable.querySelector(`#tr-${record_id.toFixed(0)}`);
        console.log(record_tr);
        if (record_tr) {
            let new_weight = record_tr === null || record_tr === void 0 ? void 0 : record_tr.querySelector(`p.table-weight-p`);
            let inc_btn = createActionBtn("+0.1", `inc-action-btn-editing${record_id.toFixed(0)}`, () => this.addToRecordWeight(record_id, 0.1));
            inc_btn.id = "edit-inc-btn";
            let dec_btn = createActionBtn("-0.1", `dec-action-btn-editing-${record_id.toFixed(0)}`, () => this.addToRecordWeight(record_id, -0.1));
            dec_btn.id = "edit-dec-btn";
            let save_btn = createActionBtn("Save", `save-action-btn-editing-${record_id.toFixed(0)}`, () => this.setOriginalWeight(record_id, 0.1));
            save_btn.id = "edit-save-btn";
            let cancel_btn = createActionBtn("Cancel", `cancel-action-btn-editing-${record_id.toFixed(0)}`, () => this.hideTableWeightEdit(record_id));
            cancel_btn.id = "edit-cancel-btn";
            const actionsField = record_tr.querySelector("#table-actions-td");
            const edit_btn = record_tr.querySelector("#btn-edit");
            const delete_btn = record_tr.querySelector("#btn-delete");
            console.log(actionsField);
            if (actionsField && edit_btn && delete_btn) {
                actionsField.appendChild(inc_btn);
                actionsField.appendChild(dec_btn);
                actionsField.appendChild(save_btn);
                actionsField.appendChild(cancel_btn);
                edit_btn.classList.add("hidden");
                delete_btn.classList.add("hidden");
                if (this.currentEditingRecordId) {
                    this.hideTableWeightEdit(this.currentEditingRecordId);
                }
                this.currentEditingRecordId = record_id;
            }
        }
        else {
            console.log('Record not found');
        }
    }
    editRecordWeight(record_id, new_weight) {
        console.log(`Changing weight of record_id ${record_id} to ${new_weight}`);
        updateRecord(record_id, new_weight);
        this.hideTableWeightEdit(record_id);
    }
    setOriginalWeight(record_id, new_weight) {
        console.log(`Set orignial weight of record_id ${record_id} to ${new_weight}`);
        this.hideTableWeightEdit(record_id);
    }
    hideTableWeightEdit(record_id) {
        const weightTable = document.getElementById("weightTable");
        const record_tr = weightTable === null || weightTable === void 0 ? void 0 : weightTable.querySelector(`#tr-${record_id.toFixed(0)}`);
        const inc_btn = record_tr === null || record_tr === void 0 ? void 0 : record_tr.querySelector(`#edit-inc-btn`);
        const dec_btn = record_tr === null || record_tr === void 0 ? void 0 : record_tr.querySelector(`#edit-dec-btn`);
        const save_btn = record_tr === null || record_tr === void 0 ? void 0 : record_tr.querySelector(`#edit-save-btn`);
        const cancel_btn = record_tr === null || record_tr === void 0 ? void 0 : record_tr.querySelector(`#edit-cancel-btn`);
        const edit_btn = record_tr === null || record_tr === void 0 ? void 0 : record_tr.querySelector(`#btn-edit`);
        const delete_btn = record_tr === null || record_tr === void 0 ? void 0 : record_tr.querySelector(`#btn-delete`);
        inc_btn === null || inc_btn === void 0 ? void 0 : inc_btn.remove();
        dec_btn === null || dec_btn === void 0 ? void 0 : dec_btn.remove();
        save_btn === null || save_btn === void 0 ? void 0 : save_btn.remove();
        cancel_btn === null || cancel_btn === void 0 ? void 0 : cancel_btn.remove();
        edit_btn === null || edit_btn === void 0 ? void 0 : edit_btn.classList.remove("hidden");
        delete_btn === null || delete_btn === void 0 ? void 0 : delete_btn.classList.remove("hidden");
        this.currentEditingRecordId = null;
        console.log(`Hiding editing actions of record_id ${record_id}.`);
    }
    addRecord(record) {
        this.weightHistoryValues.unshift(record);
        // this.addRow(record, this.top_id + 1);
        this.refreshTable();
    }
    deleteRecord(index) {
        this.weightHistoryValues.splice(index, 1);
        this.table.deleteRow(index + 1); // +1 to account for the header row
    }
    refreshTable() {
        const parent = this.table.parentElement; // Get the parent of the table
        if (parent) {
            const newTable = this.createTable(); // Create a new table
            this.populateTable(); // Populate the new table
            parent.replaceChild(newTable, this.table); // Replace the old table with the new one
            this.table = newTable; // Update the reference to the new table
        }
    }
}
