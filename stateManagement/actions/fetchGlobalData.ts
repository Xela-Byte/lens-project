import { fetchAPI } from "@/utils/fetch-api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { StateType, setGlobalData } from "../features/dataSlice";

async function getGlobal(): Promise<any> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

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
}

export const fetchGlobalData = createAsyncThunk(
  "fetchGlobalData",
  async (_, { dispatch }) => {
    const global = await getGlobal();
    dispatch(setGlobalData(global));
    return global as StateType["globalData"];
  }
);
