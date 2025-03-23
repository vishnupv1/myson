import { Suspense, lazy } from 'react';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import Splash from 'components/loader/Splash';
import PageLoader from 'components/loader/PageLoader';
import paths, { rootPaths } from './paths';
import ProductList from 'components/sections/dashboard/product-list';
import AddProduct from 'components/sections/dashboard/products/AddProduct';
import AddCategory from 'components/sections/dashboard/categories/AddCategory';
import CategoryList from 'components/sections/dashboard/category-list';
import BrandList from 'components/sections/dashboard/brand-list';
import AddBrand from 'components/sections/dashboard/brands/AddBrand';
import UserApp from 'components/user/AppUser';
import ProductPage from 'components/user/ProductPage';
import BrandProducts from 'components/user/BrandProducts';

const App = lazy(() => import('App'));
const MainLayout = lazy(() => import('layouts/main-layout'));
const AuthLayout = lazy(() => import('layouts/auth-layout'));
const Dashboard = lazy(() => import('pages/dashboard'));
const SignIn = lazy(() => import('pages/authentication/SignIn'));
const SignUp = lazy(() => import('pages/authentication/SignUp'));
const ResetPassword = lazy(() => import('pages/authentication/ResetPassword'));
const Error404 = lazy(() => import('pages/errors/Error404'));

const userRoutes = [
  {
    children: [
      { path: '/', element: <UserApp /> },
      { path: '/product/:id', element: <ProductPage /> },
      { path: '/products/:name', element: <BrandProducts /> },
    ],
  },
];

const adminRoutes = [
  {
    path: '/admin',
    element: (
      <MainLayout>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </MainLayout>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'products', element: <ProductList /> },
      { path: 'product/add', element: <AddProduct /> },
      { path: 'categories', element: <CategoryList /> },
      { path: 'categories/add', element: <AddCategory /> },
      { path: 'brands', element: <BrandList /> },
      { path: 'brands/add', element: <AddBrand /> },
    ],
  },
];

const authRoutes = [
  {
    path: rootPaths.authRoot,
    element: (
      <Suspense fallback={<Splash />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: paths.signin,
        element: (
          <AuthLayout>
            <SignIn />
          </AuthLayout>
        ),
      },
      {
        path: paths.signup,
        element: (
          <AuthLayout>
            <SignUp />
          </AuthLayout>
        ),
      },
      { path: paths.resetPassword, element: <ResetPassword /> },
    ],
  },
];

const routes = [
  {
    element: (
      <Suspense fallback={<Splash />}>
        <App />
      </Suspense>
    ),
    children: [...userRoutes, ...adminRoutes, ...authRoutes, { path: '*', element: <Error404 /> }],
  },
];

const router = createBrowserRouter(routes, { basename: '/' });

export default router;
