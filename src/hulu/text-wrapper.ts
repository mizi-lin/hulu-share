class TextWrapper {
    _owner: Text;
    constructor(text: string) {
        this._owner = document.createTextNode(text);
    }

    mountTo(root: HTMLElement) {
        root.appendChild(this._owner);
    }
}

export default TextWrapper;
