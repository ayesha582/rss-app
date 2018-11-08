import axios from 'axios';

//action types
import {
    ADD_RSS_DATA,
    DELETE_RSS_DATA,
    CHANGE_ACTIVE_INDEX
} from '../types';

function addRssData(data) {
    return { type: ADD_RSS_DATA, data: {items:data.items,url:data.feed.url} }
}

function deleteRssData(id) {
    return { type: DELETE_RSS_DATA, data: id }
}

export function changeActiveIndex(key){
    return { type: CHANGE_ACTIVE_INDEX, data: key }
}

export function deleteIndex(key){
    return { type: DELETE_RSS_DATA, data: key }
}

export function fetchRssData(url) {
    return (dispatch) => {
        try {
            axios({
                method: 'get',
                url: "https://api.rss2json.com/v1/api.json?rss_url=" + url.trim(),
                headers: { 'content-type': 'application/xml' }
            })
                .then(function (response) {
                    console.log(response.data);
                    dispatch(addRssData(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });
        } catch (e) {
            //handleerr
            alert('err!!');
        }
    }
}

