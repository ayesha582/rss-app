import React from 'react';
import { fetchRssData } from '../store/actions/actions-rss-data';
import { connect } from 'react-redux';


class UrlInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    getData = () => {
        let { dispatch } = this.props;
        let url = document.getElementById('rss-url');
        if (!url || !url.value) return;
        dispatch(fetchRssData(url.value));
        url.value = '';
    }


    render() {
        return (
            <div>
                <input placeholder="Enter Rss Url" id="rss-url" />
                <button onClick={this.getData} id="btn-import">
                    <i className="material-icons">
                        search
                    </i>
                </button>
            </div>
        )
    }
}

export default connect()(UrlInput);