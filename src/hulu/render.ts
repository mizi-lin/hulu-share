import { HuluNode, CElement } from '../types/index';
import Component from './component';

/**
 * 处理props转为 attribute 或 其他事件
 * @param element
 * @param key
 * @param value
 */
function setAttribute(element: HTMLElement, key: string, value: any) {
    // todo style
    // todo className

    if (/^on([A-Z])([\s\S]+)/.test(key)) {
        let eventName = RegExp.$1.toLowerCase() + RegExp.$2;
        element.addEventListener(eventName, value);
        return;
    }

    element.setAttribute(key, String(value));
}

/**
 * 渲染组件
 * @param comp
 */
function renderComponent(comp: Component): HTMLElement {
    return transform(comp.render()) as HTMLElement;
}

/**
 * 对组件的属性进行处理
 * @param comp
 * @param cElement
 */
function setComponentProps(comp: Component, cElement: CElement) {
    let { props, children = [] } = cElement;
    children.forEach((vchild: HuluNode) => {
        comp.appendChild(vchild);
    });

    comp._owner = renderComponent(comp);
}

/**
 * 组件
 * @param cElement
 */
function createComponent(cElement: CElement) {
    let { type: Comp, props, children = [] } = cElement;
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

    setComponentProps(comp, cElement);
    return comp;
}

/**
 * 将虚拟dom转为实体dom
 * @param huluNode
 */
function transform(huluNode: HuluNode): HTMLElement | Text {
    /**
     * 处理除了 string, CElement 其他类型的情况
     * 原则上转为字符串在页面上输出
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
     * 处理 huluNode.type 为组件的情况
     */
    if (typeof huluNode === 'object' && typeof huluNode.type !== 'string') {
        // 处理类组件
        let comp = createComponent(huluNode);
        return comp._owner;
    }

    /**
     * 处理 huluNode.type 为字符串的情况，
     * 即 HTML Tag
     */
    let element = document.createElement(huluNode.type);

    huluNode.children.forEach((vchild: HuluNode) => {
        render(vchild, element);
    });

    Object.entries(huluNode.props ?? {}).forEach(([key, value]) => {
        setAttribute(element, key, value);
    });

    return element;
}

/**
 * 将虚拟注入到实体dom
 * @param huluNode
 * @param container
 */
function render(huluNode: HuluNode, container: HTMLElement | null) {
    let root = container ?? document.body;
    let child = transform(huluNode);
    root.appendChild(child);
}

export { render, transform };
