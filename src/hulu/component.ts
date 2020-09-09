import { HuluNode, ComponentProps, RENDER_PROCESS } from '../types/index';
import { render, transform } from './render';

class Component<P = {}, S = {}> {
    readonly props: ComponentProps<P>;
    state: Readonly<S> | undefined;
    _owner!: HTMLElement;
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
        Object.assign(this.state, state);
        this.update();
    }

    /**
     * todo
     * render 方法之前调用
     */
    prevRender(process: RENDER_PROCESS) {
        // todo getDerivedStateFromProps
        if (RENDER_PROCESS.UPDATE === process) {
            // todo shouldComponentUpdate
        }
        return this.render();
    }

    /**
     * 渲染
     */
    render(): HuluNode {
        return;
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

    update() {
        let renderer = transform(this.prevRender(RENDER_PROCESS.UPDATE)) as HTMLElement;
        // todo getSnapshotBeforeUpdate
        this._owner?.parentNode?.replaceChild(renderer, this._owner);
        // todo componentDidUpdate
        this._owner = renderer;
    }
}

export default Component;
