import Hulu from './hulu';
import { HuluNode } from './types/index';

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

    static getDerivedStateFromProps(props, nextState) {
        console.debug('getDerivedStateFromProps', nextState);
        return {
            show: nextState.count + ' time'
        };
    }

    componentDidMount() {
        console.debug('did mount');
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.debug(nextState, this.state);
        return true;
    }

    // componentDidUpdate(prevProps, prevState) {
    //     console.debug('did update', prevProps, prevState)
    // }

    render() {
        return (
            <div style="padding: 50px">
                <div>{this.state.count}</div>
                <div>{this.state.show}</div>

                <button
                    onClick={() => {
                        this.setState({
                            count: this.state.count + 1
                        });
                    }}>
                    {' '}
                    {this.state.aaa} +{' '}
                </button>
            </div>
        );
    }
}

Hulu.render(<HuluDemoLogin />, document.getElementById('root'));
