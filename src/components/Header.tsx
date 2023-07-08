import { HeaderProps } from "../utils/app.types"

function Header(props: HeaderProps) {
  return (
    <div className="flex flex-col">
        <div className="flex gap-6">
            <span>Author: </span>
            <span>{props.author}</span>
        </div>
        <div className="flex gap-6">
            <span>Profile: </span>
            <span>{props.link}</span>
        </div>
    </div>
  )
}

export default Header