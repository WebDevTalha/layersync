import "./mini.css"
import "./small.css"
export function LoaderMini() {
    return <div className="spinner-mini"></div>
}
export function LoaderSmall() {
    return <div className="spinner-small"></div>
}

export default { LoaderMini, LoaderSmall }
