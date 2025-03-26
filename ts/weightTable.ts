export class WeightTable {
    private currentEditingRecordId: number | null = null;
    private weightHistoryValues: { weight: number, date: Date }[];
    public table: HTMLTableElement;

    constructor(weightHistoryValues: { weight: number, date: Date }[] ){
        this.weightHistoryValues = weightHistoryValues;

        this.table = this.createTable();
    }

    private createTable() : HTMLTableElement{
        const header_tr = document.createElement("tr");
        header_tr.id = "table-tr" 
        const header_names = ["Date", "Weight", "Actions"];
        for(let i = 0; i < header_names.length; i++){
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

    private createActionBtn(text: string, record_id: number, onClickfunc: () => void) : HTMLButtonElement{
        const btn = document.createElement("button");
        btn.textContent = text;
        btn.id = `${text}-action-btn-${record_id.toFixed(0)}`;
        btn.addEventListener("click", () => onClickfunc);
        return btn;
    }

    public addToRecordWeight(record_id: number, delta: number) {
        const weightTable = <HTMLTableElement>document.getElementById("weightTable");
        const record_tr = weightTable?.querySelector(`#tr-${record_id.toFixed(0)}`);
        const weight = <HTMLTableCellElement>record_tr?.querySelector("p.table-weight-p");
        console.log(weight?.textContent);
        const old_weight = Number(weight?.textContent);
        if (weight) {
            weight.textContent = (old_weight + delta).toFixed(2);
        }
    }
    
    public deleteRecord(record_id: number): void {
        const weightTable = <HTMLTableElement>document.getElementById("weightTable");
        const record_tr = weightTable?.querySelector(`#tr-${record_id.toFixed(0)}`);

        if (weightTable && record_tr) {
            weightTable.removeChild(record_tr);
        }
    }

    startEditingRecord(record_id: number) {
        const weightTable = document.getElementById("weightTable") as HTMLTableElement;
        const record_tr = weightTable?.querySelector(`#tr-${record_id.toFixed(0)}`);

        console.log(record_tr);

        if (record_tr) {
            let new_weight = <HTMLParagraphElement>record_tr?.querySelector(`p.table-weight-p`);

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
        } else {
            console.log('Record not found');
        }
    }

    private editRecordWeight(record_id: number, new_weight: number) {
        console.log(`Changing weight of record_id ${record_id} to ${new_weight}`);
        this.hideTableWeightEdit(record_id);
    }

    private setOriginalWeight(record_id: number, new_weight: number) {
        console.log(`Set orignial weight of record_id ${record_id} to ${new_weight}`);
        this.hideTableWeightEdit(record_id);
    }

    public hideTableWeightEdit(record_id: number) {
        const weightTable = document.getElementById("weightTable") as HTMLTableElement;
        const record_tr = weightTable?.querySelector(`#tr-${record_id.toFixed(0)}`);

        const inc_btn = <HTMLButtonElement>record_tr?.querySelector(`#edit-inc-btn`);
        const dec_btn = <HTMLButtonElement>record_tr?.querySelector(`#edit-dec-btn`);
        const save_btn = <HTMLButtonElement>record_tr?.querySelector(`#edit-save-btn`);
        const cancel_btn = <HTMLButtonElement>record_tr?.querySelector(`#edit-cancel-btn`);
        const edit_btn = <HTMLButtonElement>record_tr?.querySelector(`#btn-edit`);
        const delete_btn = <HTMLButtonElement>record_tr?.querySelector(`#btn-delete`);

        inc_btn?.remove();
        dec_btn?.remove();
        save_btn?.remove();
        cancel_btn?.remove();

        edit_btn?.classList.remove("hidden");
        delete_btn?.classList.remove("hidden");

        this.currentEditingRecordId = null;
        console.log(`Hiding editing actions of record_id ${record_id}.`);
    }
}