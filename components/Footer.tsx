"use client";
import { selectGlobalData } from "@/stateManagement/features/dataSlice";
import { getStrapiMedia } from "@/utils/api-helpers";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillYoutube } from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";
import {
  FaDiscord,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import Logo from "./Logo";

interface FooterLinkType {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  social?: string;
}

// interface CategoryLink {
//   id: string;
//   attributes: {
//     name: string;
//     slug: string;
//   };
// }

function FooterLink({ url, text }: FooterLinkType) {
  const pathname = usePathname();
  return (
    <li className="flex pr-[10px]">
      <Link
        href={url}
        className={`hover:darok:text-violet-400 max-md:text-[14px] ${
          pathname === url && "darok:text-violet-400 darok:border-violet-400"
        }}`}>
        {text}
      </Link>
    </li>
  );
}

// function CategoryLink({ attributes }: CategoryLink) {
//   return (
//     <li className="flex">
//       <Link
//         to={`/blog/${attributes.slug}`}
//         className="hover:darok:text-violet-400">
//         {attributes.name}
//       </Link>
//     </li>
//   );
// }

function RenderSocialIcon({ social }: { social: string | undefined }) {
  switch (social) {
    case "WEBSITE":
      return <CgWebsite />;
    case "TWITTER":
      return <FaTwitter color="#02C8F4" />;
    case "YOUTUBE":
      return <AiFillYoutube color="#000" />;
    case "FACEBOOK":
      return <FaFacebookF color="#027EF4" />;
    case "LINKEDIN":
      return <FaLinkedinIn color="#008BD9" />;
    case "DISCORD":
      return <FaDiscord />;
    default:
      return null;
  }
}

type Props = {};

export default function Footer({}: Props) {
  const global = useSelector(selectGlobalData);

  const { footer } = global.data.attributes;
  const logoUrl = getStrapiMedia(footer.footerLogo.logoImg.data.attributes.url);
  const logoText = footer.footerLogo.logoText;
  const logoDescription = footer.footerLogo.logoDescription;
  const menuLinks = footer.menuLinks;
  const socialLinks = footer.socialLinks;
  return (
    <footer className="py-6 darok:bg-black darok:text-gray-50 bg-white mt-20">
      <div className="2xl:max-w-[1720px] xl:max-w-[1240px] sm:max-w-full max-w-[358px]  mx-auto space-y-6 divide-y divide-gray-400 md:space-y-6 divide-opacity-50">
        <div className="grid grid-cols-12 max-md:block">
          <div className="pb-6 col-span-full md:block flex justify-between md:pb-0 md:col-span-4 ">
            <Logo
              src={logoUrl}
              logoText={logoText}
              logoDescription={logoDescription}
            />
            <div className="flex justify-start pt-6 space-x-4 lg:pt-5 lg:col-end-13">
              {socialLinks.map((link: FooterLinkType) => {
                return (
                  <a
                    key={link.id}
                    rel="noopener noreferrer"
                    href={link.url}
                    title={link.text}
                    target={link.newTab ? "_blank" : "_self"}
                    className="flex items-center justify-center w-10 h-10 rounded-md darok:bg-violet-400 darok:text-gray-900 bg-[#FAFAFA]">
                    <RenderSocialIcon social={link.social} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="col-span-6 pl-1 text-left md:text-left md:col-span-3">
            <p className="pb-1 text-lg font-medium">Menu</p>
            <ul className="flex">
              {menuLinks.map((link: FooterLinkType) => (
                <FooterLink key={link.id} {...link} />
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full  border-none  gap-1">
          <div className="w-full flex  justify-center items-center gap-1">
            <p className="text-[#027EF4] text-[12px] leading-[20px] font-medium">
              Terms of Use
            </p>
            <div className="w-[1px] h-[24px] bg-[#D0E7FD]"></div>
            <p className="text-[#027EF4] text-[12px] leading-[20px] font-medium">
              Privacy Policy
            </p>
          </div>
          <div className="w-full flex justify-center items-center">
            <p className="text-[#717172] text-[12px] leading-[20px] font-normal">
              ©WallStreetLens, 2023
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
