import { HuluNode, ComponentProps } from '../types/index';
import render, { transform } from './render';

class Component<P = {}, S = {}> {
    readonly props: ComponentProps<P>;
    state: Readonly<S> | undefined;
    _owner: HTMLElement | undefined;
    constructor(props: ComponentProps<P>) {
        this.props = props ?? {};
    }

    appendChild(child: HuluNode): void {
        if (!this.props.children) {
            this.props.children = [];
        }
        this.props.children.push(child);
    }

    setState(state: Partial<S>) {
        // todo 深拷贝
        Object.assign(this.state, state);

        this.update();
    }

    render(): HuluNode {
        return;
    }

    /**
     * update
     */
    update() {
        let element = transform(this.render()) as HTMLElement;
        this._owner?.parentNode?.replaceChild(element, this._owner);
        this._owner = element;
    }
}

export default Component;
