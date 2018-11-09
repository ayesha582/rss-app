import React from 'react';
import { connect } from 'react-redux';


class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = { renderObj: [] }
    }

    renderFunc = () =>{
        let {activeIndex,RssRenderData} = this.props;
        let activeData = {};
        let {renderObj} = this.state;
        if(!(RssRenderData && Object.keys(RssRenderData).length > 0)){
            if(renderObj.length > 0)this.setState({renderObj: [],header:''});
            return;
        };
        if(!activeIndex || !RssRenderData[activeIndex]){
            activeIndex = Object.keys(RssRenderData)[0];
            activeData = RssRenderData[activeIndex];
            window.location.hash = activeIndex;
        }else{
            activeData = RssRenderData[activeIndex];
        }
        let Obj = activeData.map((k, index) =>
            <div key={index} className="content-wrapper">
                <div dangerouslySetInnerHTML={{ __html: k.title }}></div>
                <div dangerouslySetInnerHTML={{ __html: k.description }}></div>
                {/* <div dangerouslySetInnerHTML={{ __html: k.content }}></div> */}
                <a href={k.link} target="_blank">link</a>
                <div>{k.pubDate}</div>
            </div>
        );
        this.setState({ renderObj:Obj, header: activeIndex });
    }

    componentDidMount = () =>{
        this.renderFunc();
    }

    componentDidUpdate(prevProps) {
        let {activeIndex,RssRenderData} = this.props;
        if (JSON.stringify(prevProps.RssRenderData) !== JSON.stringify(RssRenderData)||prevProps.activeIndex !== activeIndex) {
            this.renderFunc();
        }
    }

    render() {
        return (
            <div className="content">
                <div className="content-header">{this.state.header}</div>
                {this.state.renderObj}
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

export default connect(mapStateToProps)(Content);
