import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, HashRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "./components/Navbar";
import { getStrapiMedia, getStrapiURL } from "./utils/api-helpers";
import { fetchAPI } from "./utils/fetch-api";
import Footer from "./components/Footer";
import Home from "./components/Home";
import BlogPage from "./pages/blog";
import PostRoute from "./pages/blog/slug";
import CompanyPage from "./pages/company";
import RouteMiddleware from "./components/RouteMiddleware";

async function getGlobal(): Promise<any> {
  const token = process.env.REACT_APP_PUBLIC_STRAPI_API_TOKEN;
  console.log("token", token)

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

function App() {
  const [global, setGlobal] = useState<any>();
  useEffect(() => {
    (async () => {
      const global = await getGlobal();
      setGlobal(global);
    })();
  }, []);

  if (!global?.data) return null;
  console.log("global==>",global);

  const { navbar, footer, metadata, favicon } = global.data.attributes;


  const faviconUrl = getStrapiMedia(
    favicon.data.attributes.url
  );

  const navbarLogoUrl = getStrapiMedia(
    navbar.navbarLogo.logoImg.data.attributes.url
  );

  const footerLogoUrl = getStrapiMedia(
    footer.footerLogo.logoImg.data.attributes.url
  );

  return (
    <Router >
      {/* <Toaster /> */}
      <Helmet>
        <title>{metadata.metaTitle}</title>
        {faviconUrl && <link rel="icon" href={faviconUrl} />}
      </Helmet>
      <Navbar
        links={navbar.links}
        logoUrl={navbarLogoUrl}
        logoText={navbar.navbarLogo.logoText}
      />
      <Routes>
        <Route
          path="/"
          element={<RouteMiddleware title="home" component={<Home />} />}
        />
        <Route
          path="/:category/:slug"
          element={<RouteMiddleware title="post" component={<PostRoute />} />}
        />
        <Route
          path="/:slug"
          element={<RouteMiddleware title="company" component={<CompanyPage />} />}
        />
        <Route
          path="/:company/:slug"
          element={<RouteMiddleware title="company-post" component={<PostRoute />} />}
        />
      </Routes>

      <Footer
        logoUrl={footerLogoUrl}
        logoText={footer.footerLogo.logoText}
        logoDescription={footer.footerLogo.logoDescription}
        menuLinks={footer.menuLinks}
        legalLinks={footer.legalLinks}
        socialLinks={footer.socialLinks}
      />
    </Router>
  );
}

export default App;
