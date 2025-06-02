const rootSelector = `[data-js-countdown]`

class CountDown {

    selectors = {
        root: rootSelector,
        second: `[data-js-countdown-second]`,
        minutes: `[data-js-countdown-minutes]`,
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.secondElement = this.rootElement.querySelectorAll(this.selectors.second)
        this.minutsElement = this.rootElement.querySelectorAll(this.selectors.minutes)

        this.totalSecond = 18 * 60

        this.startTimer()
    }


    startTimer() {
        this.updateDisplay()

        this.timerInterval = setInterval(() => {
            this.totalSecond--

            if(this.totalSecond <= 0) {
                clearInterval(this.timerInterval)
                return
            }

            this.updateDisplay()
        }, 1000)
     
    }

    updateDisplay() {
        const minutes = Math.floor(this.totalSecond / 60)
        const second = this.totalSecond % 60

        const formattedMinutes = String(minutes).padStart(2 , '0')
        const formattedSecond = String(second).padStart(2, '0')

        this.minutsElement.forEach(element => element.textContent = formattedMinutes)
        this.secondElement.forEach(element => element.textContent = formattedSecond)
    }
}

class CountDownCollection {
      constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new CountDown(element)
        })
    }
}

export default CountDownCollection