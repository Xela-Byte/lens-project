import Home from './components/Home';
import PostRoute from './pages/blog/slug';
import CompanyPage from './pages/company';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/:category/:slug',
    component: PostRoute,
  },
  {
    path: '/:slug',
    component: CompanyPage,
  },
  {
    path: '/:company/:slug',
    component: PostRoute,
  },
];
export default routes;