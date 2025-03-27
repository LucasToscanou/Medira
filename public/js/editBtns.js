export function createActionBtn(text, id, onClickfunc) {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.id = id;
    btn.addEventListener("click", (e) => onClickfunc());
    return btn;
}
