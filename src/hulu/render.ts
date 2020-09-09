import { HuluNode, CElement } from '../types/index';
import Component from './component';
import TextWrapper from './text-wrapper';
import ElementWrapper from './element-wrapper';

function setComponentProps(comp: any, huluNode: CElement) {
    let { type: Comp, children } = huluNode;
    children.forEach((child: HuluNode) => {
        comp.appendChild(child);
    });

    if (Comp.getDerivedStateFromProps) {
        comp.applyDerivedStateFromProps = (props: any, state: any) => {
            Object.assign(state, Comp.getDerivedStateFromProps(props, state) ?? {});
        };
    }

    // 获取组件自己的element
    comp._owner = transform(comp.prender())._owner;
}

/**
 * 创建组件
 * @param huluNode
 */
function createComponent(huluNode: CElement) {
    let { type: Comp, props } = huluNode;
    let comp;

    if (Comp?.prototype?.render) {
        if (Comp?.defaultProps) {
            Object.assign(props, Comp.defaultProps);
        }
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
export function transform(huluNode: HuluNode) {
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
        return new TextWrapper(huluNode);
    }

    /**
     * 处理组件
     */
    if (typeof huluNode.type !== 'string') {
        // todo 处理类组件
        let comp = createComponent(huluNode as CElement);
        return comp;
    }

    /**
     * 处理HTML TAG
     */
    let elementWrapper = new ElementWrapper(huluNode.type);

    huluNode.children.forEach((vchild: HuluNode) => {
        elementWrapper.appendChild(vchild);
    });

    //
    Object.entries(huluNode.props ?? {}).forEach(([key, value]) => {
        elementWrapper.setAttribute(key, value);
    });

    return elementWrapper;
}

/**
 * 将虚拟的DOM注入实体的父级元素
 * @param huluNode
 * @param container
 */
function render(huluNode: HuluNode, container: HTMLElement | null) {
    let root = container ?? document.body;
    let renderer = transform(huluNode);
    if (renderer?.mountTo) {
        renderer?.mountTo(root);
    } else {
        root.appendChild(renderer);
    }
}

export default render;
