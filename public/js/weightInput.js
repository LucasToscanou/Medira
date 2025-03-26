export class weightInput {
    constructor(firstWeighHistoryValue) {
        // this.setInputDefault(firstWeighHistoryValue.weight);
        this.final_div = this.setup();
    }
    setup() {
        const div = document.createElement("div");
        const weight_input = document.createElement("input");
        const save_btn = this.createButton("save", () => this.addNewWeight(weight_input.value));
        const inc_btn = this.createButton("+0.10", () => this.incNewWeightInput(0.1));
        const dec_btn = this.createButton("-0.10", () => this.incNewWeightInput(-0.1));
        weight_input.id = "weigth-input";
        weight_input.type = "number";
        weight_input.min = "0";
        div.appendChild(weight_input);
        div.appendChild(save_btn);
        div.appendChild(inc_btn);
        div.appendChild(dec_btn);
        return div;
    }
    createButton(text, onClickfunc) {
        const btn = document.createElement("button");
        btn.id = `weight-input-${text}-btn`;
        btn.textContent = text;
        btn.onclick = onClickfunc;
        return btn;
    }
    addNewWeight(id) {
        const new_weight = document.getElementById("weight_input");
        if (new_weight) {
            console.log(new_weight.value.toString());
        }
    }
    setInputDefault(initial_weight) {
        const weight = document.getElementById("weight_input");
        if (weight) {
            weight.value = initial_weight.toFixed(2);
        }
    }
    incNewWeightInput(delta) {
        const weight = document.getElementById("weight_input");
        if (weight) {
            const old_weight = Number(weight.value);
            weight.value = (old_weight + delta).toFixed(2);
        }
    }
}
