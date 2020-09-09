import { transform } from './render';

class ElementWrapper {
    _owner: HTMLElement;
    constructor(tagName: string) {
        this._owner = document.createElement(tagName);
    }

    // appendChild(vchild) {
    //     this._owner.appendChild(transform(vchild)._owner);
    // }

    setAttribute(key: string, value: any) {
        if (/^on([A-Z])([\s\S]+)/.test(key)) {
            let eventName = RegExp.$1.toLowerCase() + RegExp.$2;
            this._owner.addEventListener(eventName, value);
            return;
        }

        this._owner.setAttribute(key, String(value));
    }

    mountTo(root: HTMLElement) {
        root.appendChild(this._owner);
    }
}

export default ElementWrapper;
