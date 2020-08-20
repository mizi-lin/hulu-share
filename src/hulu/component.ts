import { HuluNode } from '../types/index';

class Component {
    children: HuluNode[];
    constructor() {
        this.children = [];
    }

    appendChild(child: HuluNode): void {
        this.children.push(child);
    }

    render(): HuluNode {
        return;
    }
}

export default Component;
