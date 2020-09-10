class ElementWrapper {
    _owner: HTMLElement;

    constructor(tagName: string) {
        this._owner = document.createElement(tagName);
    }

    mountTo(root: HTMLElement) {
        root.appendChild(this._owner);
    }
}

export default ElementWrapper;
