import BaseComponent from "./BaseComponent.js"
import MatchMedia from "./MatchMedia.js"

const rootSelector = `[data-js-select]`

class Select extends BaseComponent {
    selectors = {
        root: rootSelector,
        originalControl: `[data-js-select-original-control]`,
        button: `[data-js-select-button]`,
        dropdown: `[data-js-select-dropdown]`,
        option: `[data-js-select-option]`,
    }

    stateClasses = {
        isExpanded: 'is-expanded',
        isCurrent: 'is-current',
        isSelected: 'is-selected',
    }

    stateAttributes = {
        ariaExpanded: 'aria-expanded',
        ariaSelected: 'aria-selected',
        ariaActiveDescendant: 'aria-activedescendant',
    }

    initialState = {
        isExpanded: false,
        currentOptionIndex: null,
        selectedOptionElement: null,
    }


    constructor(rootElement) {
        super()
        this.rootElement = rootElement
        this.originalControlElement = this.rootElement.querySelector(this.selectors.originalControl)
        this.buttonElement = this.rootElement.querySelector(this.selectors.button)
        this.dropdownElement = this.rootElement.querySelector(this.selectors.dropdown)
        this.optionElement = this.rootElement.querySelectorAll(this.selectors.option)
        this.state = this.getProxyState({
            ...this.initialState,
            currentOptionIndex: this.originalControlElement.selectedIndex,
            selectedOptionElement: this.optionElement[this.originalControlElement.selectedIndex],
        })

        this.updateTabIndexes()
        this.bindEvents()
    }



    updateUI() {
        const {
            isExpanded,
            currentOptionIndex,
            selectedOptionElement,
        } = this.state

        if(!this.optionElement) return

        const newSelectedOptionValue = selectedOptionElement.textContent.trim()

        const updateOriginalControl = () => {
            this.originalControlElement.value = newSelectedOptionValue
        }

        const updateButton = () => {
            this.buttonElement.textContent = newSelectedOptionValue
            this.buttonElement.classList.toggle(this.stateClasses.isExpanded , isExpanded)
            this.buttonElement.setAttribute(this.stateAttributes.ariaExpanded , isExpanded)
            this.buttonElement.setAttribute(
                this.stateAttributes.ariaActiveDescendant , 
                this.optionElement[currentOptionIndex].id
            )
        }

        const updateDropDown = () => {
            this.dropdownElement.classList.toggle(this.stateClasses.isExpanded , isExpanded)
        }

        const updateOption = () => {
            this.optionElement.forEach((optionElement, index) => {
                const isCurrent = currentOptionIndex === index
                const isSelected = selectedOptionElement === optionElement

                optionElement.classList.toggle(this.stateClasses.isCurrent , isCurrent)
                optionElement.classList.toggle(this.stateClasses.isSelected, isSelected)
                optionElement.setAttribute(this.stateAttributes.ariaSelected, isSelected)
            })
        }

        updateOriginalControl()
        updateButton()
        updateDropDown()
        updateOption()
    }

    toggleExpandedState() {
        this.state.isExpanded = !this.state.isExpanded
    }

    expanded() {
        this.state.isExpanded = true
    }

    collapse() {
        this.state.isExpanded = false
    }

    updateTabIndexes(isMobileDevice = MatchMedia.mobile.matches) {
    
        this.originalControlElement.tabIndex = isMobileDevice ? 0 : -1
        this.buttonElement.tabIndex = isMobileDevice ? -1 : 0
      

    }
    get isNeedToExpand() {
        const isButtonFocused = document.activeElement === this.buttonElement

        return (!this.state.isExpanded && isButtonFocused)
    }

    selectCurrentOption() {
        this.state.selectedOptionElement = this.optionElement[this.state.currentOptionIndex]
    }

    onButtonClick = () => {
        this.toggleExpandedState()
    }

    onClick = (event) => {
        const { target } = event
        const isButtonClick = target === this.buttonElement
        const isOutsideDropdownClick = target.closest(this.selectors.dropdown) !== this.dropdownElement

        if(!isButtonClick && isOutsideDropdownClick) {
            this.collapse()
            return
        }

        const isOptionClick = target.matches(this.selectors.option)

        if(isOptionClick) {
            this.state.selectedOptionElement = target
            this.state.currentOptionIndex = [...this.optionElement]
            .findIndex((optionElement) => optionElement === target)
            this.collapse()
        }
    }

    onArrowUpKeyDown = () => {
        if(this.isNeedToExpand) {
            this.expanded()
            return
        }

        if(this.state.currentOptionIndex > 0) {
            this.state.currentOptionIndex--
        }
    }

    onArrowDownKeyDown = () => {
         if(this.isNeedToExpand) {
            this.expanded()
            return
        }

        if(this.state.currentOptionIndex < this.optionElement.length - 1) {
            this.state.currentOptionIndex++
        }
    }

    onSpaceKeyDown = () => {
        if(this.isNeedToExpand) {
            this.expand()
            return
        }

        this.selectCurrentOption()
        this.collapse()
    }

    onEnterKeyDown = () => {
        if(this.isNeedToExpand) {
            this.expand()
            return
        }

        this.selectCurrentOption()
        this.collapse()
    }
    onKeyDown = (event) => {
        const { code } = event

        const action = {
            ArrowUp: this.onArrowUpKeyDown,
            ArrowDown: this.onArrowDownKeyDown,
            Space: this.onSpaceKeyDown,
            Enter: this.onEnterKeyDown,
        }[code]

        if(action) {
            event.preventDefault()
            action()
        }
    }

    onMobileMatchMediaChange = (event) =>  {
        this.updateTabIndexes(event.matches)
    }

    originalContorlChange = () => {
        this.state.selectedOptionElement = this.optionElement[this.originalControlElement.selectedIndex]
    }

   
    bindEvents() {
        MatchMedia.mobile.addEventListener('change' , this.onMobileMatchMediaChange)
        this.buttonElement.addEventListener('click' , this.onButtonClick)
        document.addEventListener('click' , this.onClick)
        this.rootElement.addEventListener('keydown', this.onKeyDown)
        this.originalControlElement.addEventListener('change' , this.originalContorlChange)
    }
}

class SelectCollection {
       constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new Select(element)
        })
    }
}

export default SelectCollection