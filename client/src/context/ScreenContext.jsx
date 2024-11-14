import { createContext, useContext, useEffect, useState } from "react";

const ScreenContext = createContext({});

export const ScreenProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 748);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    handleResize();
  }, []);

  return (
    <ScreenContext.Provider value={{ isMobile, sidebarOpen, toggleSidebar }}>
      {children}
    </ScreenContext.Provider>
  );
};

export const useScreen = () => useContext(ScreenContext);
