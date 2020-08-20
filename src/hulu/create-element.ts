import { CElement, HuluNode } from '../types/index';

function createElement(
    type: string,
    props: Record<string, any>,
    ...children: HuluNode[]
): CElement {
    console.debug(arguments);
    return {
        type,
        props,
        children
    };
}

export default createElement;
