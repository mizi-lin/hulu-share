import { HuluNode } from '../types/index';

function render(huluNode: HuluNode, container: HTMLElement | null): void {
    let root = container ?? document.body;

    if (typeof huluNode === 'string') {
        let txt = document.createTextNode(huluNode);
        root.appendChild(txt);
        return;
    }

    // 对 children 生成的虚拟dom进行处理
    if (typeof huluNode === 'object' && huluNode instanceof Array) {
        huluNode.forEach((child: HuluNode) => {
            render(child, root);
        });
        return;
    }

    if (typeof huluNode.type === 'string') {
        let element = document.createElement(huluNode.type);

        huluNode.children.forEach((child: HuluNode) => {
            render(child, element);
        });

        root.appendChild(element);
    } else {
        let comp = new huluNode.type();
        huluNode.children.forEach((child: HuluNode) => {
            comp.appendChild(child);
        });
        render(comp.render(), root);
    }
}

export default render;
