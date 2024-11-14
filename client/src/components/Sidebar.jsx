import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useScreen } from "../context/ScreenContext";

const Sidebar = () => {
    const { isMobile, sidebarOpen } = useScreen();
    
    const logoutHandler = () => {
        localStorage.clear();
        toast.success("Logout Successful.");
    }

    return (
        <div className={`${isMobile && !sidebarOpen ? "hidden": ""} ${isMobile && sidebarOpen ? "absolute lay w-5/12": ""} min-w-fit w-3/12 p-6 flex flex-col justify-between bg-blue-200`}>
            <div className="flex flex-col">
                <Link to='/' className="p-3">Profile</Link>
                <Link to='/my-cars' className="p-3">My Cars</Link>
                <Link to='/create-car' className="p-3">Create Car</Link>
                <button className="p-3 text-start" onClick={()=> window.open(`${import.meta.env.VITE_REACT_APP_DOCSURL}/api-docs`, '_blank') }>Documentation</button>
            </div>
            <Link to='/login' className="p-3 bg-red-500 rounded-lg border-black border-2" onClick={logoutHandler}>Logout</Link>
        </div>
    )
}

export default Sidebar;