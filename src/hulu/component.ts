import { HuluNode, ComponentProps, ComponentState } from '../types/index';
import render, { transform } from './render';

class Component<P = {}, S = {}> {
    readonly props: ComponentProps<P>;
    state: ComponentState<S>;
    _owner!: HTMLElement;
    constructor(props: ComponentProps<P>) {
        this.props = props ?? {};
        this.state = {} as ComponentState<S>;
    }

    appendChild(child: HuluNode): void {
        if (!this.props.children) {
            this.props.children = [];
        }
        this.props.children.push(child);
    }

    setState(state: Partial<S>) {
        let prevProps = JSON.parse(JSON.stringify(this.props));
        let prevState = JSON.parse(JSON.stringify(this.state));

        // todo 深拷贝
        Object.assign(this.state, state);
        this.update(prevProps, prevState);
    }

    applyDerivedStateFromProps<P, S>(props: P, state: S) {
        return null;
    }

    shouldComponentUpdate(): boolean {
        return true;
    }

    getSnapshotBeforeUpdate(): void {
        return void 0;
    }

    componentDidUpdate(prevProps: P, prevState: S, snapshot: any): void {
        return void 0;
    }

    componentDidMount(): void {
        return void 0;
    }

    componentWillUnmount(): void {
        return void 0;
    }

    mountTo(root: HTMLElement) {
        root.appendChild(this._owner);
        this.componentDidMount();
    }

    prender() {
        this.applyDerivedStateFromProps(this.props, this.state);
        return this.render();
    }

    render(): HuluNode {
        return;
    }

    /**
     * update
     */
    update(prevProps: P, prevState: S) {
        if (!this.shouldComponentUpdate()) {
            return void 0;
        }

        let entity = transform(this.prender())._owner;
        let snapshot = this.getSnapshotBeforeUpdate();
        this._owner?.parentNode?.replaceChild(entity, this._owner);
        this.componentDidUpdate(prevProps, prevState, snapshot);
        // this.componentWillUnmount();
        this._owner = entity;
    }
}

export default Component;
