const videosCollection = document.getElementsByTagName('video');
const videosArr = Array.from(videosCollection);

videosArr.forEach((item, index) => {
    const video = videojs(item.id);

    video.on('progress', () => {
        console.log(`The user agent is fetching media data (video ${item.src})`)
    })

    video.on('error', () => {
        console.log(`error occured while fetching (video ${item.src})`)
    })

    video.on('loadeddata', () => {
        console.log(`video loaded and can be played (video ${item.src})`)
    })

    video.on('playing', () => {
        console.log(`video playing (video ${item.src})`)
    })

    video.on('seeked', () => {
    console.log(`seeked from time ${video.controlBar.progressControl.seekBar.currentTime_} to ${video.currentTime()} (video ${item.src})`)
    })

    video.on('seeking', () => {
        console.log(`video seeking ${video.controlBar.progressControl.seekBar.currentTime_} (video ${item.src})`)
    })

    video.on('ended', () => {
        console.log(`the video has been ended (video ${item.src})`)
    })

    video.on('pause', () => {
        console.log(`the video ${index} has been paused at ${video.controlBar.progressControl.seekBar.currentTime_} `)
    })

    video.on('play', () => {
        console.log(`the video ${index} has been played from ${video.controlBar.progressControl.seekBar.currentTime_}`)
    })

    video.on('volumechange', () => {
        console.log(`volume has changed muted: ${video.muted()} volume: ${video.volume()} (video ${item.src})`)
    })

})

