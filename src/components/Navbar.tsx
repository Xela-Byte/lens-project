"use client";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import { FiSearch as SearchIcon } from "react-icons/fi";

interface NavLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
}

function NavLink({ url, text }: NavLink) {
  const location = useLocation();
  const { pathname } = location;

  return (
    <li className="flex">
      <Link
        to={url}
        className={`flex font-medium text-[14px] items-center mx-4 -mb-1 darok:border-transparent ${pathname === url &&
          "border-bottom-2 darok:text-violet-400 darok:border-violet-400"
          }}`}
      >
        {text}
      </Link>
    </li>
  );
}

export default function Navbar({
  links,
  logoUrl,
  logoText,
}: {
  links: Array<NavLink>;
  logoUrl: string | null;
  logoText: string | null;
}) {
  return (
    <div className="bg-white sticky">
      <div className="2xl:max-w-[1720px] xl:max-w-[1240px] sm:max-w-full max-w-[358px] flex h-[62px] mx-auto px-0 sm:px-6 justify-between ">
        <Logo src={logoUrl} logoText={logoText} />
        <ul className=" items-stretch space-x-3 flex max-[770px]:hidden ">
          {links.map((item: NavLink) => (
            <NavLink key={item.id} {...item} />
          ))}
        </ul>

        <div className="ml-auto w-[30%] items-center flex-shrink-0 hidden md:flex ">
          <div className="w-full h-[46px] relative border-[#D3D3D3] border rounded-lg">
            <input
              className="w-full h-full rounded-lg px-6 "
              placeholder="Search"
            />
            <SearchIcon
              className="absolute color-[#101011] top-[10px] right-[10px]"
              size={24}
            />
          </div>
        </div>

        <button className="p-4 md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 darok:text-gray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
