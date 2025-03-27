import { createActionBtn } from "./editBtns.js";
export class weightInput {
    constructor(latestWeighHistoryValue) {
        this.final_div = this.setup(latestWeighHistoryValue);
    }
    setup(default_weight) {
        const div = document.createElement("div");
        const input_field = document.createElement("input");
        const save_btn = createActionBtn("save", "weight-input-save", () => this.addNewWeight(input_field.value));
        const inc_btn = createActionBtn("+0.10", "weight-input-inc", () => this.incWeightInput(0.1));
        const dec_btn = createActionBtn("-0.10", "weight-input-dec", () => this.incWeightInput(-0.1));
        input_field.id = "weight-input";
        input_field.type = "number";
        input_field.min = "0";
        input_field.value = default_weight.weight.toFixed(2);
        div.appendChild(input_field);
        div.appendChild(inc_btn);
        div.appendChild(dec_btn);
        div.appendChild(save_btn);
        return div;
    }
    addNewWeight(weightValue) {
        const weight = parseFloat(weightValue);
        if (!isNaN(weight)) {
            const newRecord = { weight, date: new Date() };
            // Dispatch a custom event with the new weight record
            const event = new CustomEvent("newWeightAdded", { detail: newRecord });
            window.dispatchEvent(event);
            console.log(`Dispatched event for new weight: ${weight}`);
        }
        else {
            console.error("Invalid weight value");
        }
    }
    incWeightInput(delta) {
        const weight = document.getElementById("weight-input");
        if (weight) {
            const old_weight = Number(weight.value);
            weight.value = (old_weight + delta).toFixed(2);
        }
    }
}
