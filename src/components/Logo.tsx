import React from "react";
import { Link } from "react-router-dom";

export default function Logo({
  src,
  logoText,
  logoDescription,
}: {
  src: string | null;
  logoText: string | null;
  logoDescription?: string | null;
}) {
  return (
    <div className="flex flex-col p-2 justify-center mr-10 ">
      <Link to="/" aria-label="Back to homepage" className="flex items-center">
        {src && <img src={src} alt="logo" width={24} height={24} />}
        <div className="ml-3">
          {logoText && <h2 className="md:text-[18px] text-[14px] font-bold">{logoText}</h2>}
        </div>
      </Link>
      {logoDescription && (
        <p className="md:text-md md:w-[60%] text-[11px]  mt-4">{logoDescription}</p>
      )}
    </div>
  );
}
