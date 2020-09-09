import { HuluNode, ComponentProps, RENDER_PROCESS } from '../types/index';
import { render, transform } from './render';
import { deepClone } from './utils';

class Component<P = {}, S = {}> {
    readonly props: ComponentProps<P>;
    state: Readonly<S>;
    _owner!: HTMLElement;
    constructor(props: ComponentProps<P>) {
        this.props = props ?? {};
        this.state = {} as Readonly<S>;
    }

    appendChild(child: HuluNode): void {
        if (!this.props.children) {
            this.props.children = [];
        }
        this.props.children.push(child);
    }

    applyDerivedStateFromProps(nextProps: P, prevState: S): Partial<S> {
        return {};
    }

    /**
     * 渲染
     */
    render(): HuluNode {
        return;
    }

    shouldComponentUpdate(nextProps: P, nextState: S): boolean {
        return true;
    }

    getSnapshotBeforeUpdate(prevProps: P, prevState: S): any {
        return null;
    }

    componentDidUpdate(prevProps: P, prevState: S, snapshot: any) {
        return null;
    }

    setState(state: Partial<S>) {
        let currentState = deepClone(this.state);
        let nextState = Object.assign({}, this.state, state);

        nextState = Object.assign(
            nextState,
            this.applyDerivedStateFromProps(this.props, nextState)
        );

        let prevent = !this.shouldComponentUpdate(this.props, nextState);

        this.state = nextState;

        if (prevent) {
            return void 0;
        }

        this.update(this.props, currentState);
    }

    /**
     * todo
     * render 方法之前调用
     */
    wrapperRender() {
        // do getDerivedStateFromProps
        let partialState = this.applyDerivedStateFromProps(this.props, this.state);
        Object.assign(this.state, partialState);
        return this.render();
    }

    /**
     * todo
     * 挂载
     */
    mount(root: HTMLElement) {
        // 将组件DOM挂载在root
        root.appendChild(this._owner);
        // todo componentDidMount
    }

    update(prevProps: P, prevState: S) {
        // do getSnapshotBeforeUpdate
        const snapshot = this.getSnapshotBeforeUpdate(prevProps, prevState);
        const renderer = transform(this.render()) as HTMLElement;
        this._owner?.parentNode?.replaceChild(renderer, this._owner);
        // do componentDidUpdate
        this.componentDidUpdate(prevProps, prevState, snapshot);
        // todo componentWillUnmount
        this._owner = renderer;
    }
}

export default Component;
