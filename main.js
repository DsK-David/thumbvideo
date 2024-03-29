function start(){
    var api_key = 'AIzaSyCuMJ41tg6qRq8QxGx4lXL58kvI9-1eJzo'
    let video_http = "https://www.googleapis.com/youtube/v3/videos?";
    let channel_http = "https://www.googleapis.com/youtube/v3/channels?";
    const videoCardContainer = document.getElementById('container');
    fetch(video_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: 50,
        regionCode: 'BR'
    }))
    .then(res => res.json())
    .then(data => {
        data.items.forEach(item => {
            getChannelIcon(item);
            console.log(item)
        })
    })
    .catch(err => console.log(err));
    const getChannelIcon = (video_data) => {
        fetch(channel_http + new URLSearchParams({
            key: api_key,
            part: 'snippet',
            id: video_data.snippet.channelId
        }))
        .then(res => res.json())
        .then(data => {
            video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
            makeVideoCard(video_data);
        })
        const makeVideoCard = (data) => {
            videoCardContainer.innerHTML += `
            <div class="video-info" onclick="location.href = 'https://www.youtube.com/embed/${data.id}'">
                <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
                <div class="text">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
                </div>
                <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            </div>
            `;
        }
    }
}
function search(){
    const searchInput = document.querySelector('.search');
    let searchLink = "https://www.youtube.com/results?search_query=";
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
}
