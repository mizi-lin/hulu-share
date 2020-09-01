import Hulu from './hulu';
import { HuluNode } from './types/index';

const a = (
    <div>
        {true} {1}
        a
        <br />b 江山如此多娇
        <ol>
            <li tabIndex={1}>1</li>
            <li tabIndex={2}>2</li>
            <li>3</li>
            <li>4</li>
        </ol>
    </div>
);

// ---------
interface DefProps {
    aaa: string;
    children: HuluNode;
}
function Def(props: DefProps) {
    return (
        <div>
            <div>{props.aaa}</div>
            <div>{props.children}</div>
        </div>
    );
}

// ---------

interface AbcProps {
    title: string;
}

interface AbcState {
    count: number;
}

class Abc extends Hulu.Component<AbcProps> {
    state: AbcState = {
        count: 0
    };
    constructor(props: AbcProps) {
        super(props);
    }
    render() {
        return (
            <div>
                <header tabIndex={1}>{this.props.title}</header>
                <div
                    onClick={() => {
                        this.setState({
                            count: this.state.count + 1
                        });
                    }}>
                    count: {this.state.count}
                </div>
                {a} {this.props.children}
                <Def aaa="AAAAAAAAAAA">
                    <div>BBBBBBBB</div>
                </Def>
            </div>
        );
    }
}

Hulu.render(
    <Abc title="沁园春.雪">
        <div>引无数英雄竞折腰</div>
    </Abc>,
    document.getElementById('root')
);
