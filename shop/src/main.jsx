import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Allprodct from './pages/Allprodct.jsx';
import NewProduct from './pages/NewProduct.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import NotFound from './pages/NotFound.jsx';
import Mycart from './pages/Mycart.jsx';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Allprodct/> },
      { path: '/products', element: <Allprodct /> },
      { path: '/products/new', element: <NewProduct /> }, // Fixed typo
      { path: '/products/:id', element: <ProductDetail /> },
      { path: '/carts', element: <Mycart/> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
