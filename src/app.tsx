import Hulu from './hulu';
import { HuluNode } from './types/index';

class Abc extends Hulu.Component {
    constructor(props) {
        super(props);
    }

    // static getDerivedStateFromProps(props, state) {
    //     console.debug('abc getDerivedStateFromProps');
    //     return null;
    // }

    // componentWillUnmount() {
    //     console.debug(111111111);
    // }

    componentDidUpdate(prevProps, prevState) {
        console.debug('abc componentDidUpdate', prevProps, this.props);
    }

    render() {
        return <div>{this.props.count}</div>;
    }
}

interface HuluDemoLoginProps {}
interface HuluDemoLoginState {
    count: number;
    aaa: number;
    show?: string;
}

export default class HuluDemoLogin extends Hulu.Component<HuluDemoLoginProps, HuluDemoLoginState> {
    state: HuluDemoLoginState = {
        count: 0,
        aaa: 1
    };

    static getDerivedStateFromProps(props, state) {
        return {
            show: state.count + ' time'
        };
    }

    // componentDidMount() {
    //     console.debug('HuluDemoLogin did mount');
    // }

    componentDidUpdate(prevProps, prevState) {
        console.debug('HuluDemoLogin did update', prevProps, this.props, prevState, this.state);
    }

    render() {
        return (
            <div style={{ padding: 50 }}>
                {this.state.show}

                <Abc count={this.state.count}></Abc>

                <button
                    onClick={() => {
                        this.setState({
                            count: this.state.count + 1
                        });
                    }}>
                    {this.state.aaa} +
                </button>
            </div>
        );
    }
}

Hulu.render(<HuluDemoLogin />, document.getElementById('root'));
