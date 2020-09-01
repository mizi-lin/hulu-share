export type CElement = {
    type: string | any;
    props: Record<string, any>;
    children: HuluNode[];
};

export type HuluNode = CElement | undefined | null | string | number | boolean;
export type ComponentProps<P> = Readonly<P> & { children?: HuluNode[] };
