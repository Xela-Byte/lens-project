import { usePathname } from "next/navigation";
import PropTypes from "prop-types";
import React, { useEffect } from "react";

const RouteMiddleware = ({
  component,
  title,
  ...rest
}: {
  component: JSX.Element;
  title: string;
}) => {
  const location = usePathname();

  useEffect(() => {
    window.gtag("event", "page_view", {
      page_title: title,
      page_path: location + location.search,
      page_location: window.location.href,
    });
  }, [location, title]);

  return <React.Fragment>{component}</React.Fragment>;
};

RouteMiddleware.propTypes = {
  component: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

export default RouteMiddleware;
