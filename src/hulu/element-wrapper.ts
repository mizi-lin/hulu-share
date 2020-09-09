import { HuluNode } from '../types/index';
import render from './render';

class ElementWrapper {
    _owner: HTMLElement;
    constructor(tagName: string) {
        this._owner = document.createElement(tagName);
    }

    setAttribute(key: string, value: any) {
        if (/^on([A-Z])([\s\S]+)/.test(key)) {
            let eventName = RegExp.$1.toLowerCase() + RegExp.$2;
            this._owner.addEventListener(eventName, value);
            return;
        }

        this._owner.setAttribute(key, String(value));
    }

    appendChild(vchild: HuluNode) {
        render(vchild, this._owner);
    }

    mountTo(root: HTMLElement) {
        root.appendChild(this._owner);
    }
}

export default ElementWrapper;
