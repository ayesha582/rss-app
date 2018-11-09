import React from 'react';
import { connect } from 'react-redux';
import AppRouter from './AppRoutes';
import { changeActiveIndex, saveStateToLocalStorage, initializeFromLocalStorage } from '../store/actions/actions-rss-data';
import './app.scss';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        if (window.performance) {
            if (performance.navigation.type == 1) {
                props.dispatch(saveStateToLocalStorage());
            }
        }
    }

    componentDidMount = () => {
        window.addEventListener('hashchange', this.listener);
        this.props.dispatch(initializeFromLocalStorage());
    }

    listener = (e) => {
        if (!e.newURL || e.newURL.indexOf('#') === -1) return;
        let hashUrl = e.newURL.substring(e.newURL.indexOf('#') + 1);
        this.props.dispatch(changeActiveIndex(hashUrl));
    }

    render() {
        return (
            <div className="container">
                <AppRouter />
            </div>
        )
    }
}

export default connect()(App);