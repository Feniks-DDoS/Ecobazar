class BaseComponent {
        getProxyState(initalState) {
        return new Proxy(initalState, {
            get: (target, prop) => {
                return target[prop]
            },
            set: (target , prop , newValue) => {

                const oldValue = target[prop]

                target[prop] = newValue

                if(newValue !== oldValue) {
                    this.updateUI()
                }

                return true
            },
        })
    }

    updateUI() {
        throw new Error('Need write metod updateUI')
    }
}

export default BaseComponent