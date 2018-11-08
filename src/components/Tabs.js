import React from 'react';
import { connect } from 'react-redux';
import { changeActiveIndex,deleteIndex } from '../store/actions/actions-rss-data';


class Tabs extends React.Component {

    constructor(props) {
        super(props);
        this.state = { tabs: [] }
    }

    renderFunc = () =>{
        let { dispatch, RssRenderData } = this.props;
        let {tabs} = this.state;
        if(!(RssRenderData && Object.keys(RssRenderData).length > 0)){
            if(tabs.length >0)this.setState({tabs: []});
            return;
        };
        let tabsData = Object.keys(RssRenderData).map((k, index) =>
                <div key={index} className="tab" onClick={() => dispatch(changeActiveIndex(k))}>
                    <i className="material-icons" onClick={()=>dispatch(deleteIndex(k))}>
                        clear
                    </i>
                    <div>{k}</div>
                </div>
            );
            this.setState({ tabs: tabsData });
    }

    componentDidMount = () =>{
        this.renderFunc();
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.RssRenderData) !== JSON.stringify(this.props.RssRenderData)) {
            this.renderFunc();
        }
    }

    render() {
        return (
            <div>
                {this.state.tabs}
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    let {
        rssDataReducer: {
            RssRenderData,
            activeIndex,
        }
    } = reduxState;
    return {
        RssRenderData,
        activeIndex,
    }
}

export default connect(mapStateToProps)(Tabs);
