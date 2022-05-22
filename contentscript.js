
console.log("hej")

// Get iFrame
var iframe = document.getElementById('kplayer_ifp')

// Wait for iFrame to load
iframe.addEventListener("load", function() {
    var videos = iframe.contentWindow.document.getElementsByTagName('video')
    var controls = iframe.contentWindow.document.getElementsByClassName('controlsContainer')

    

    console.log(controls)

    setPlaybackRate(videos, 1.5)
});


function setPlaybackRate(videos, rate) {
    for (let i = 0; i < videos.length; i++) {
        videos[i].playbackRate = rate
    }
}