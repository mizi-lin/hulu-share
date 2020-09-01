import { HuluNode, CElement } from '../types/index';
import Component from './component';

/**
 * 处理html 属性标签
 * @param element
 * @param key
 * @param value
 */
function setAttribute(element: any, key: string, value: any) {
    // todo style
    // todo className
    // todo __html

    if (/^on([A-Z])([\s\S]+)/.test(key)) {
        let eventName = RegExp.$1.toLowerCase() + RegExp.$2;
        element.addEventListener(eventName, value);
        return;
    }

    element.setAttribute(key, String(value));
}

function setComponentProps(comp: any, huluNode: CElement) {
    let { type: Comp, children } = huluNode;
    children.forEach((child: HuluNode) => {
        comp.appendChild(child);
    });

    // 获取组件自己的element
    comp._owner = transform(comp.render());
}

/**
 * 创建组件
 * @param huluNode
 */
function createComponent(huluNode: CElement) {
    let { type: Comp, props } = huluNode;
    let comp;

    if (Comp?.prototype?.render) {
        comp = new Comp(props);
    } else {
        comp = new Component(props);
        comp.constructor = Comp;
        comp.render = function () {
            return this.constructor(props);
        };
    }

    setComponentProps(comp, huluNode);

    return comp;
}

/**
 * 将虚拟的DOM转为实体DOM
 * @param huluNode
 */
export function transform(huluNode: HuluNode): HTMLElement | Text {
    /**
     * 处理HuluNode中除了组件和HTML TAG 之外的情况
     */
    if (huluNode === void 0 || huluNode === null || typeof huluNode === 'boolean') {
        huluNode = '';
    }

    if (typeof huluNode === 'number') {
        huluNode = String(huluNode);
    }

    if (typeof huluNode === 'string') {
        return document.createTextNode(huluNode);
    }

    /**
     * 处理组件
     */
    if (typeof huluNode.type !== 'string') {
        // todo 处理类组件
        let comp = createComponent(huluNode as CElement);
        return comp._owner;
    }

    /**
     * 处理HTML TAG
     */
    let element = document.createElement(huluNode.type);

    huluNode.children.forEach((child: HuluNode) => {
        render(child, element);
    });

    Object.entries(huluNode.props ?? {}).forEach(([key, value]) => {
        setAttribute(element, key, value);
    });

    return element;
}

/**
 * 将虚拟的DOM注入实体的父级元素
 * @param huluNode
 * @param container
 */
function render(huluNode: HuluNode, container: HTMLElement | null) {
    let root = container ?? document.body;
    let renderer = transform(huluNode);
    root.appendChild(renderer);
}

export default render;
