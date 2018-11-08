import React from 'react';
import UrlInput from './UrlInput';
import Content from './Content';
import Tabs from './Tabs';
import { connect } from 'react-redux';
import { changeActiveIndex } from '../store/actions/actions-rss-data';
import './app.scss';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { feedData: null, isMobView: true }
    }

    componentDidMount = () => {
        window.addEventListener('hashchange', this.listener);
    }

    listener = (e) => {
        if (!e.newURL || e.newURL.indexOf('#') === -1) return;
        let hashUrl = e.newURL.substring(e.newURL.indexOf('#') + 1);
        this.props.dispatch(changeActiveIndex(hashUrl));
    }

    setData = (data) => {
        this.setState({ feedData: data.items });
    }

    changeView = () =>{
        this.setState({isMobView: !this.state.isMobView});
    }

    render() {
        let {isMobView} = this.state;
        return (
            <div className="container">
                <div className={`side-bar ${!isMobView?'visible':''}`}>
                    <UrlInput />
                    <Tabs />
                    <div class="nav-cross" onClick={this.changeView}>
                        <i class="material-icons">
                            {isMobView ?'menu':'close'}
                        </i>
                    </div>
                </div>
                <Content feedData={this.state.feedData} />
            </div>
        )
    }
}

export default connect()(App);