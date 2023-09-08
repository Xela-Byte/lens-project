"use client";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { FiSearch as SearchIcon } from "react-icons/fi";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectGlobalData } from "@/stateManagement/features/dataSlice";
import { getStrapiMedia } from "@/utils/api-helpers";

interface NavLinkType {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
}

function NavLink({ url, text }: NavLinkType) {
  const pathname = usePathname();

  return (
    <li className="flex">
      <Link
        href={url}
        className={`flex font-medium text-[14px] items-center mx-4 -mb-1 darok:border-transparent ${
          pathname === url &&
          "border-bottom-2 darok:text-violet-400 darok:border-violet-400"
        }}`}>
        {text}
      </Link>
    </li>
  );
}

type Props = {};

export default function Navbar({}: Props) {
  const global = useSelector(selectGlobalData);

  const { navbar } = global.data.attributes;

  const navbarLogoUrl = getStrapiMedia(
    navbar.navbarLogo.logoImg.data.attributes.url
  );

  const logoText = navbar.navbarLogo.logoText;

  const links = navbar.links;

  if (!global) {
    return;
  }

  return (
    <div className="bg-white sticky">
      <div className="2xl:max-w-[1720px] xl:max-w-[1240px] sm:max-w-full max-w-[358px] flex h-[62px] mx-auto px-0 sm:px-6 justify-between ">
        <Logo src={navbarLogoUrl} logoText={logoText} />
        <ul className=" items-stretch space-x-3 flex max-[770px]:hidden ">
          {links.map((item: NavLinkType) => (
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
            className="w-6 h-6 darok:text-gray-100">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
