import {Component} from 'react';

export class PageContainer extends Component {

    render() {

        return (<>
            <header>This is header</header>
            <div>{this.props.children}</div>
            <footer>This is footer</footer>
        </>);
    }
}