import { useScreen } from "../context/ScreenContext";
import { BiMenu } from "react-icons/bi";
import { ImCross } from "react-icons/im";

const Header = () => {
  const { isMobile, toggleSidebar, sidebarOpen } = useScreen();
  
  return (
    <div className="bg-blue-400 font-bold w-[100vw] flex flex-row items-center justify-between p-4">
      {isMobile ? (
        <div>
          {sidebarOpen ? <ImCross className="text-2xl text-white pl-2 cursor-pointer" onClick={toggleSidebar} /> : <BiMenu className="text-3xl text-white cursor-pointer" onClick={toggleSidebar} />}
        </div>
      ) : null}
      <div>
        <h1 className="text-center text-3xl ">Carkare</h1>
      </div>
      {isMobile ? <div></div> : null}
    </div>
  )
}

export default Header