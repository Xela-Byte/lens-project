import { useState, useEffect } from "react";
import { fetchAPI } from "./fetch-api";

const getGlobal = async () => {
  const token = process.env.REACT_APP_PUBLIC_STRAPI_API_TOKEN;

  if (!token)
    throw new Error("The Strapi API Token environment variable is not set.");

  const path = `/global`;
  const options = { headers: { Authorization: `Bearer ${token}` } };

  const urlParamsObject = {
    populate: [
      "metadata.shareImage",
      "favicon",
      "notificationBanner.link",
      "navbar.links",
      "navbar.navbarLogo.logoImg",
      "footer.footerLogo.logoImg",
      "footer.menuLinks",
      "footer.legalLinks",
      "footer.socialLinks",
    ],
  };
  return await fetchAPI(path, urlParamsObject, options);
};

export function useGlobalData() {
  const [global, setGlobal] = useState(null);

  useEffect(() => {
    (async () => {
      const globalData = await getGlobal();
      setGlobal(globalData);
    })();
  }, []);

  return global;
}
