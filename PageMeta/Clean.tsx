import { PRERENDERED_HEAD_ATTRIBUTE } from "./Constants"

// A cleaning code for PageMeta tag.
// Call it before mounting the client tree to remove prerendered PageMeta tags.
const cleanPrerenderedHead = () => {
    document.head.querySelectorAll(`[${PRERENDERED_HEAD_ATTRIBUTE}]`).forEach(tag => tag.remove())
}

export default cleanPrerenderedHead
