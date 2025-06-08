const rootSelector = `[data-js-video-player]`

class VideoPlayer {

    selectors = {
        root: rootSelector,
        videoPlayer: `[data-js-video-player-video]`,
        videoPlayerControlButton: `[data-js-video-player-play-button]`,
        videoPlayerControlPanel: `[data-js-video-player-panel]`,
    }

    stateClasses = {
        isActive: 'is-active',
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.videoPlayerElement = this.rootElement.querySelector(this.selectors.videoPlayer)
        this.videoPlayerControlButtonElement = this.rootElement.querySelector(this.selectors.videoPlayerControlButton)
        this.videoPlayerControlPanelElement = this.rootElement.querySelector(this.selectors.videoPlayerControlPanel)

        this.bindEvents()
    }

    onPlayButtonClick = () => {
        this.videoPlayerElement.play()
        this.videoPlayerElement.controls = true
        this.videoPlayerControlPanelElement.classList.remove(this.stateClasses.isActive)
    }

    onPauseClick = () => {
        this.videoPlayerElement.controls = false
        this.videoPlayerControlPanelElement.classList.add(this.stateClasses.isActive)
    }

    bindEvents() {
        this.videoPlayerControlButtonElement.addEventListener('click' , this.onPlayButtonClick)
        this.videoPlayerElement.addEventListener('pause' , this.onPauseClick)
    }

}

class VideoPlayerCollection {
           constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new VideoPlayer(element)
        })
    }
}

export default VideoPlayerCollection