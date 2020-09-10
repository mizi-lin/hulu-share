import { HuluNode, ComponentProps } from '../types/index';
import render, { transform } from './render';

class Component<P = {}, S = {}> {
    readonly props: ComponentProps<P>;
    state!: Readonly<S>;
    _owner!: HTMLElement;
    constructor(props: ComponentProps<P>) {
        this.props = props ?? {};
        this.state = {} as S;
    }

    appendChild(child: HuluNode): void {
        if (!this.props.children) {
            this.props.children = [];
        }
        this.props.children.push(child);
    }

    setState(state: Partial<S>) {
        // todo 深拷贝

        // todo deepClone
        let nextState = {
            ...this.state,
            ...state,
            ...this.applyDerivedStateFromProps(this.props, {
                ...this.state,
                ...state
            })
        };

        // console.log(this.state, nextState, this.applyDerivedStateFromProps(this.props, this.state));

        // let nextState = { ...derivedState, ...state };

        this.prevUpdate(nextState);
    }

    prevRender() {
        // todo getDerivedStateFromProps
        Object.assign(this.state, this.applyDerivedStateFromProps(this.props, this.state));
        return this.render();
    }

    render(): HuluNode {
        return;
    }

    mountTo(root: HTMLElement) {
        // todo componentWillMount
        root.appendChild(this._owner);
        this.componentDidMount();
    }

    prevUpdate(nextState: S) {
        // shouldComponentUpdate

        if (!this.shouldComponentUpdate(this.props, nextState)) {
            this.state = nextState;
            return;
        }

        // todo deepClone
        let prevState = { ...this.state };

        this.state = nextState;

        this.update(this.props, prevState);
    }

    /**
     * update
     */
    update(prevProps: P, prevState: S) {
        let element = transform(this.render())._owner;
        // getSnapshotBeforeUpdate
        let snapshot = this.getSnapshotBeforeUpdate(prevProps, prevState);
        this._owner?.parentNode?.replaceChild(element, this._owner);
        this._owner = element;
        this.componentDidUpdate(prevProps, prevState, snapshot);
    }

    private componentDidMount() {}

    private applyDerivedStateFromProps(props: P, state: S): any {
        return null;
    }

    private shouldComponentUpdate(nextProps: P, nextState: S): boolean {
        return true;
    }

    private getSnapshotBeforeUpdate(prevProps: P, prevState: S): any {
        return null;
    }

    private componentDidUpdate(prevProps: P, prevState: S, snapshot: any): void {}
}

export default Component;
