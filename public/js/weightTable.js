export class WeightTable {
    constructor(weightHistoryValues) {
        this.currentEditingRecordId = null;
        this.weightHistoryValues = weightHistoryValues;
        this.table = this.createTable();
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
        for (let i = 0; i < this.weightHistoryValues.length; i++) {
            const date_td = document.createElement("td");
            date_td.textContent = this.weightHistoryValues[i].date.toLocaleString();
            const weight_p = document.createElement("p");
            weight_p.textContent = this.weightHistoryValues[i].weight.toFixed(2);
            weight_p.classList.add("table-weight-p");
            const weight_td = document.createElement("td");
            weight_td.classList.add("table-weight-td");
            weight_td.appendChild(weight_p);
            const editBtn = this.createActionBtn("edit", i, () => this.startEditingRecord(i));
            const deleteBtn = this.createActionBtn("delete", i, () => this.deleteRecord(i));
            const btn_td = document.createElement("td");
            btn_td.id = "table-actions-td";
            btn_td.appendChild(editBtn);
            btn_td.appendChild(deleteBtn);
            const tr = document.createElement("tr");
            tr.id = `tr-${i.toFixed(0)}`;
            tr.appendChild(date_td);
            tr.appendChild(weight_td);
            tr.appendChild(btn_td);
            table.appendChild(tr);
        }
        return table;
    }
    createActionBtn(text, record_id, onClickfunc) {
        const btn = document.createElement("button");
        btn.textContent = text;
        btn.id = `${text}-action-btn-${record_id.toFixed(0)}`;
        btn.addEventListener("click", () => onClickfunc);
        return btn;
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
    deleteRecord(record_id) {
        const weightTable = document.getElementById("weightTable");
        const record_tr = weightTable === null || weightTable === void 0 ? void 0 : weightTable.querySelector(`#tr-${record_id.toFixed(0)}`);
        if (weightTable && record_tr) {
            weightTable.removeChild(record_tr);
        }
    }
    startEditingRecord(record_id) {
        const weightTable = document.getElementById("weightTable");
        const record_tr = weightTable === null || weightTable === void 0 ? void 0 : weightTable.querySelector(`#tr-${record_id.toFixed(0)}`);
        console.log(record_tr);
        if (record_tr) {
            let new_weight = record_tr === null || record_tr === void 0 ? void 0 : record_tr.querySelector(`p.table-weight-p`);
            let inc_btn = this.createActionBtn("+0.1", record_id, () => this.addToRecordWeight(record_id, 0.1));
            inc_btn.id = "edit-inc-btn";
            let dec_btn = this.createActionBtn("-0.1", record_id, () => this.addToRecordWeight(record_id, -0.1));
            dec_btn.id = "edit-dec-btn";
            let save_btn = this.createActionBtn("Save", record_id, () => this.setOriginalWeight(record_id, 0.1));
            save_btn.id = "edit-save-btn";
            let cancel_btn = this.createActionBtn("Cancel", record_id, () => this.hideTableWeightEdit(record_id));
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
}
