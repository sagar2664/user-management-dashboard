import { Link } from "react-router-dom"

export const Appbar = () => {
    return <div className="bg-gray-100 flex justify-between px-10 py-2">
        <Link to={'/'} className="text-sky-800 text-2xl font-bold flex flex-col justify-center cursor-pointer">
            Ajackus
        </Link>
        <div className="text-gray-800 text-2xl font-bold flex flex-col justify-center">
            Users Details
        </div>
        <Link to={`/add`}>
            <button type="button" className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xl font-bold text-sky-700 ring-3 ring-sky-700/10 ring-inset">New</button>
        </Link>
    </div>
}