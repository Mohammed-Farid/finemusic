const { getParams, getURL } = require('../URLGrabber');
const axios = require('axios');

const getTopSongs = async (type, method, model) => {

    const value = encodeURIComponent(model.name);

    let params = getParams(type, method, value);

    const URL = getURL(params, 3);

    const topSongsRequest = await axios(URL);

    try {
        const topSongs = topSongsRequest.data.toptracks.track;
        const topSongsArr = [];

        topSongs.forEach(song => {
            topSongsArr.push({
                name: song.name,
                url: song.url
            });
        });

        return topSongsArr;
    } catch (error) {
        return [];
    }

};

module.exports = {
    getTopSongs
}