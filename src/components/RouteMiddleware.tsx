import React, { Component, useEffect } from 'react';
import PropTypes from 'prop-types'
import { Route, useLocation } from 'react-router-dom';

const RouteMiddleware = ({ component, title, ...rest }: { component: JSX.Element, title: string, }) => {
	const location = useLocation();

	useEffect(() => {
		window.gtag('event', 'page_view', {
			page_title: title,
			page_path: location.pathname + location.search,
			page_location: window.location.href
		})
	}, [location]);

	return <React.Fragment>{component}</React.Fragment>
}

RouteMiddleware.propTypes = {
	component: PropTypes.any.isRequired,
	title: PropTypes.string.isRequired,
	exact: PropTypes.bool
}

export default RouteMiddleware;