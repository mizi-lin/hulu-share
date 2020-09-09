import { HuluNode, CElement, RENDER_PROCESS } from '../types/index';
import Component from './component';
import TextWrapper from './text-wrapper';
import ElementWrapper from './element-wrapper';

/**
 * 渲染组件
 * @param comp
 */
function renderComponent(comp: Component): HTMLElement {
    return transform(comp.wrapperRender())._owner;
}

/**
 * 对组件的属性进行处理
 * @param comp
 * @param cElement
 */
function setComponentProps(comp: Component, cElement: CElement) {
    let { type: Comp, props, children = [] } = cElement;
    children.forEach((vchild: HuluNode) => {
        comp.appendChild(vchild);
    });

    // 用组件使用静态方法 getDerivedStateFromProps
    if (Comp.getDerivedStateFromProps) {
        comp.applyDerivedStateFromProps = function (nextProps, prevState) {
            return Comp.getDerivedStateFromProps(nextProps, prevState) ?? {};
        };
    }

    comp._owner = renderComponent(comp);
}

/**
 * 组件
 * @param cElement
 */
function createComponent(cElement: CElement) {
    let { type: Comp, props, children = [] } = cElement;
    let comp;
    props = Object.assign(props, Comp.defaultProps ?? {});
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
function transform(huluNode: HuluNode) {
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
        return new TextWrapper(huluNode);
    }

    /**
     * 处理 huluNode.type 为组件的情况
     */
    if (typeof huluNode === 'object' && typeof huluNode.type !== 'string') {
        // 处理类组件
        return createComponent(huluNode);
    }

    /**
     * 处理 huluNode.type 为字符串的情况，
     * 即 HTML Tag
     */
    let elementWrapper = new ElementWrapper(huluNode.type);

    huluNode.children.forEach((vchild: HuluNode) => {
        transform(vchild).mountTo(elementWrapper._owner);
    });

    Object.entries(huluNode.props ?? {}).forEach(([key, value]) => {
        elementWrapper.setAttribute(key, value);
    });

    return elementWrapper;
}

/**
 * 将虚拟注入到实体dom
 * @param huluNode
 * @param container
 */
function render(huluNode: HuluNode, container: HTMLElement | null) {
    let root = container ?? document.body;
    let comp = transform(huluNode);
    comp.mountTo(root);
}

export { render, transform };
