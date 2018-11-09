import {
    ADD_RSS_DATA,
    DELETE_RSS_DATA,
    CHANGE_ACTIVE_INDEX,
    SAVE_STATE_TO_LOCAL_STORAGE,
    INITIALIZE_FROM_LOCAL_STORAGE
} from '../types';
import { saveStateToLocalStorage } from '../actions/actions-rss-data';

const INITIAL_STATE = {
    RssRenderData: {},
    activeIndex: null,
}

function updateLocalStorage(state) {
    localStorage.setItem('reduxState', JSON.stringify(state));
}

export default function rssDataReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ADD_RSS_DATA: {
            let { items, url } = action.data, newState;
            let RssRenderData = {};
            RssRenderData[url] = items;
            RssRenderData[url]['timestamp'] = new Date();
            window.location.hash = url;
            newState = {
                ...state,
                RssRenderData: { ...RssRenderData, ...state.RssRenderData },
                activeIndex: url
            };
            updateLocalStorage(newState);
            return newState;
        }
        case CHANGE_ACTIVE_INDEX: {
            window.location.hash = action.data;
            let newState = {
                ...state,
                activeIndex: action.data
            };
            updateLocalStorage(newState);
            return newState;
        }
        case DELETE_RSS_DATA:
            let RssRenderData = { ...state.RssRenderData }, newState;
            delete RssRenderData[action.data];
            newState = {
                ...state,
                RssRenderData
            };
            updateLocalStorage(newState);
            return newState;
        case SAVE_STATE_TO_LOCAL_STORAGE: {
            if (JSON.stringify(state) !== JSON.stringify(INITIAL_STATE)) {
                saveStateToLocalStorage(state);
            }
        }
        case INITIALIZE_FROM_LOCAL_STORAGE: {
            let stateLocal = localStorage.getItem('reduxState');
            if (stateLocal) {
                return {
                    ...state,
                    ...JSON.parse(stateLocal)
                }
            } else {
                return {
                    ...state
                }
            }
        }
        default:
            return state
    }
}