
console.log("hej")

// Get iFrame
var iframe = document.getElementById('kplayer_ifp')

// Wait for iFrame to load
iframe.addEventListener("load", function() {
    var videos = iframe.contentWindow.document.getElementsByTagName('video')
    var controls = iframe.contentWindow.document.getElementsByClassName('controlsContainer')

    var myDiv = makeDiv()
    var num = makeNumber()
    var slider = makeSlider()
    myDiv.appendChild(num)
    myDiv.appendChild(slider)


    // Make scroll wheel change the playback rate
    slider.addEventListener('wheel', function(e) {
        if (e.deltaY < 0) {
            slider.valueAsNumber += 0.1
        } else {
            slider.value -= 0.1
        }
        e.preventDefault()
        e.stopPropagation()
    })

    // Bind slider to number
    slider.oninput = function() {
        updateNumber(num, slider, videos)
    }
    slider.onwheel = function() {
        updateNumber(num, slider, videos)
    }

    // Add div to controls
    controls[0].appendChild(myDiv)

    setPlaybackRate(videos, 1)
});


function updateNumber(num, slider, videos) {
    num.innerHTML = slider.value
    setPlaybackRate(videos, slider.value)
}

function setPlaybackRate(videos, rate) {
    for (let i = 0; i < videos.length; i++) {
        videos[i].playbackRate = rate
    }
}

function makeDiv() {
    var myDiv = document.createElement('div')
    myDiv.className = 'dropup comp closedCaptions pull-right display-high'
    myDiv.style.marginTop = '3px'
    myDiv.style.verticalAlign = 'middle'
    return myDiv
}

function makeNumber() {
    var num = document.createElement('span')
    num.innerHTML = '1'
    num.id = 'playbackRateNumber'
    num.style.marginRight = '5px'
    num.style.verticalAlign = 'middle'
    return num
}

function makeSlider() {
    var slider = document.createElement('input')
    slider.type = 'range'
    slider.id = 'playbackRateSlider'
    slider.min = 0.2
    slider.max = 3
    slider.step = 0.1
    slider.value = 1
    slider.style.accentColor = '#991100' // DTU red
    slider.style.width = '70px'
    slider.style.verticalAlign = 'middle'
    return slider
}