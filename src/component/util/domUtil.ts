export const closertPar = (el:HTMLElement, parName:string):HTMLElement => {
    if (!el) {
        throw new Error("该元素不存在")
    }

    let parEl = el!

    while (parEl.tagName !== "BODY" && !parEl.classList.contains(parName)) {
        parEl = parEl.parentElement!
    }
    return parEl
}
