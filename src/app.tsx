import Hulu from './hulu';
import { HuluNode } from './types/index';

const a = (
    <div>
        {true} {1} {null}
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
    children: HuluNode[];
}
function Def(props: DefProps) {
    return (
        <div>
            {props.aaa}
            <div> {props.children}</div>
        </div>
    );
}

interface AaaProps {
    title: string;
    author?: string;
}
interface AaaState {
    count: number;
    total: number;
}

class Aaa extends Hulu.Component<AaaProps, AaaState> {
    state: AaaState = {
        count: 0,
        total: 0
    };
    constructor(props: AbcProps) {
        super(props);
    }
    render() {
        return (
            <div
                onClick={() => {
                    this.setState({
                        count: this.state.count + 1
                    });
                }}>
                sub count: {this.state.count}
            </div>
        );
    }
}

// ---------

interface AbcProps {
    title: string;
    author?: string;
}
interface AbcState {
    count: number;
    total: number;
}

class Abc extends Hulu.Component<AbcProps, AbcState> {
    state: AbcState = {
        count: 110,
        total: 0
    };
    constructor(props: AbcProps) {
        super(props);
    }
    render() {
        return (
            <div data-abc={'asasas'}>
                <div tabIndex={1}>
                    {this.props.title} <cite>{this.props.author}</cite>
                </div>
                <div
                    class="abc"
                    onClick={() => {
                        this.setState({
                            count: this.state.count + 1
                        });
                    }}>
                    count: {this.state.count}
                </div>
                <Aaa></Aaa>
                {a} {this.props.children}
                <Def aaa="cccccccc">
                    <div>bbbbbbbbbbbb</div>
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
