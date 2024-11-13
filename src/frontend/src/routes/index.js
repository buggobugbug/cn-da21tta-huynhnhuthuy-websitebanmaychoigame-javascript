import Homepage from '../pages/Homepage/Homepage';
import ProductPage from '../pages/ProductPage/ProductPage';
import Oderpage from '../pages/OderPage/Oderpage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
const routes = [
    {
        path: '/',
        page: Homepage,
        isShowHeader: true
    },
    {
        path: '/muahang',
        page: Oderpage,
        isShowHeader: true
    },
    {
        path: '/sanpham',
        page: ProductPage,
        isShowHeader: true
    },
    {
        path: '*',
        page: NotFoundPage
    }
];

export default routes;
