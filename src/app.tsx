import Hulu from './hulu';
import { HuluNode } from './types/index';

interface HuluDemoLoginProps {
    title: string;
}
interface HuluDemoLoginState {
    count: number;
    aaa: number;
    show?: string;
}

export default class HuluDemoLogin extends Hulu.Component<HuluDemoLoginProps, HuluDemoLoginState> {
    static defaultProps = {
        title: 'Increase'
    };

    static getDerivedStateFromProps(props, state) {
        console.debug('0/2 ::  getDerivedStateFromProps');
        return {
            show: state.count + ' time'
        };
    }

    state: HuluDemoLoginState = {
        count: 0,
        aaa: 1
    };

    componentDidMount() {
        console.debug('1 :: componentDidMount');
    }

    /**
     * update
     */

    shouldComponentUpdate(nextProps, nextState) {
        console.debug('3 :: shouldComponentUpdate');
        console.debug(nextState, this.state);
        return true;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.debug('4 :: getSnapshotBeforeUpdate');
        console.debug(document.querySelector('.abc').innerHTML);
        console.debug(prevState, this.state);
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.debug('5 :: componentDidUpdate');
        console.debug(document.querySelector('.abc').innerHTML);
        console.debug(prevState, this.state);
    }

    render() {
        return (
            <div style="padding: 50px">
                <div>{this.state.count}</div>
                <div class="abc">{this.state.show}</div>

                <button
                    onClick={() => {
                        this.setState({
                            count: this.state.count + 1
                        });
                    }}>
                    {this.props.title} +{' '}
                </button>
            </div>
        );
    }
}

Hulu.render(<HuluDemoLogin />, document.getElementById('root'));
