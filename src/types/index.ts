export type CElement = {
    type: string | any;
    props: Record<string, any>;
    children: HuluNode[];
};

export type HuluNode = CElement | undefined | null | string | number | boolean;
export type ComponentProps<P> = Readonly<P> & { children?: HuluNode[] };
// 渲染流程
export enum RENDER_PROCESS {
    // 初始化加载
    INIT = '__init__',
    // 更新
    UPDATE = '__update__',
    // 阻止
    PREVENT = '__prevent__'
}
