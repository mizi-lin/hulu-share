export type CElement = {
    type: string | any;
    props: Record<string, any>;
    children: HuluNode[];
};

export type HuluNode = CElement | any;
