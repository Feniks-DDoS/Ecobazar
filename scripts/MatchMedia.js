import PxToRem from "./utils/pxToRem.js"

const MatchMedia = {
    mobile: window.matchMedia(`(width <= ${PxToRem(767.98)}rem)`) 
}


export default MatchMedia