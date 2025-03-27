export function createActionBtn(text: string, id: string, onClickfunc: () => void) : HTMLButtonElement{
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.id = id;
    btn.addEventListener("click", (e: Event) => onClickfunc());
    return btn;
}
