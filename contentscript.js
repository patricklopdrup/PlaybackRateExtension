
// Get iFrame
var iframe = document.getElementById('kplayer_ifp')

// Wait for iFrame to load
iframe.addEventListener("load", function() {
    chrome.storage.sync.get(['startRate', 'maxRate', 'minRate', 'stepRate'], (data) => {
        var startRate = data.startRate ?? defaultStartRate
        var maxRate = data.maxRate ?? defaultMaxRate
        var minRate = data.minRate ?? defaultMinRate
        var stepRate = data.stepRate ?? defaultStepRate

        console.log('startRate', startRate)

        var videos = iframe.contentWindow.document.getElementsByTagName('video')
        var controls = iframe.contentWindow.document.getElementsByClassName('controlsContainer')

        var myDiv = makeDiv()
        var num = makeNumber(startRate)
        var slider = makeSlider(minRate, maxRate, stepRate, startRate)
        myDiv.appendChild(num)
        myDiv.appendChild(slider)

        // Make scroll wheel change the playback rate
        slider.addEventListener('wheel', function(e) {
            stepRate = parseFloat(stepRate)
            if (e.deltaY < 0) {
                slider.valueAsNumber += stepRate
            } else {
                slider.value -= stepRate
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

        setPlaybackRate(videos, startRate)
    })
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

function makeNumber(startRate) {
    var num = document.createElement('span')
    num.innerHTML = startRate
    num.id = 'playbackRateNumber'
    num.style.marginRight = '5px'
    num.style.verticalAlign = 'middle'
    return num
}

function makeSlider(min, max, step, value) {
    var slider = document.createElement('input')
    slider.type = 'range'
    slider.id = 'playbackRateSlider'
    slider.min = min
    slider.max = max
    slider.step = step
    slider.value = value
    slider.style.accentColor = '#991100' // DTU red
    slider.style.width = '70px'
    slider.style.verticalAlign = 'middle'
    return slider
}
