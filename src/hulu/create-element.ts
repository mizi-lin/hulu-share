import { CElement, HuluNode } from '../types/index';

function createElement(
    type: string,
    props: Record<string, any>,
    ...children: HuluNode[]
): CElement {
    return {
        type,
        props,
        children: children.flat()
    };
}

export default createElement;
