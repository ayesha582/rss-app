import React from 'react';
import UrlInput from './UrlInput';
import Content from './Content';
import Tabs from './Tabs';
import { connect } from 'react-redux';
import { changeActiveIndex,initializeFromLocalStorage } from '../store/actions/actions-rss-data';
import './app.scss';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isMobView: true };
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
                    <div className="nav-cross" onClick={this.changeView}>
                        <i className="material-icons">
                            {isMobView ?'menu':'close'}
                        </i>
                    </div>
                </div>
                <Content />
            </div>
        )
    }
}

export default connect()(Main);