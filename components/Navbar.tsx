import Image from "next/image";
import logo from "../public/images/logo.png";
import NavbarItem from "./NavbarItem";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import { useCallback, useEffect, useState } from "react";

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackgroud, setShowBackground] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () =>{
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const toogleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toogleAccounMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={
          `
          px-4
          md:px-16
          py-6
          flex
          flex-row
          items-center
          transition
          duration-500          
          ${showBackgroud ? 'bg-zinc-900 bg-opacity-90' : ''}
          `
        }
      >
        <Image src={logo} alt="Logo" className="w-24 lg:w-30 " />
        <div
          className="
          flex-row
          ml-8
          gap-7
          hidden
          lg:flex
        "
        >
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by Language" />
        </div>
        <div
          onClick={toogleMobileMenu}
          className="
            lg:hidden 
            flex 
            flex-row 
            items-center 
            gap-2 ml-8 
            cursor-pointer 
            relative
            "
        >
          <p className=" text-white">Browse</p>
          <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
          <MobileMenu visible={showMobileMenu} />
        </div>

        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell />
          </div>
          <div onClick={toogleAccounMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
            <div className="w-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/default-blue.png" alt="User" />
            </div>
            <BsChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  )
};

export default Navbar;