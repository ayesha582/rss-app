import {
    ADD_RSS_DATA,
    DELETE_RSS_DATA,
    CHANGE_ACTIVE_INDEX
} from '../types';

const INITIAL_STATE = {
    RssRenderData: {},
    activeIndex: null,
}

export default function rssDataReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ADD_RSS_DATA: {
            let { items, url } = action.data;
            let RssRenderData = {};
            RssRenderData[url] = items;
            RssRenderData[url]['timestamp'] = new Date();
            window.location.hash = url;
            return {
                ...state,
                RssRenderData: { ...RssRenderData,...state.RssRenderData },
                activeIndex: url
            }
        }
        case CHANGE_ACTIVE_INDEX: {
            window.location.hash = action.data;
            return {
                ...state,
                activeIndex: action.data
            }
        }
        case DELETE_RSS_DATA:
            let RssRenderData = {...state.RssRenderData};
            delete RssRenderData[action.data];
            return {
                ...state,
                RssRenderData
            }
        default:
            return state
    }
}