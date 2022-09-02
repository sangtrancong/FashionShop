import React from 'react'

const DashboardPage = React.lazy(() => import('./pages/DashboardPage'))

const AccountListPage = React.lazy(() => import('./containers/account/AccountList'))
const AccountFormPage = React.lazy(() => import('./containers/account/AccountForm'))

const ShipperListPage = React.lazy(() => import('./containers/shipper/ShipperList'))
const ShipperFormPage = React.lazy(() => import('./containers/shipper/ShipperForm'))

const DeliveryListPage = React.lazy(() => import('./containers/delivery/DeliveryList'))
const DeliveryFormPage = React.lazy(() => import('./containers/delivery/DeliveryForm'))

const ProductListPage = React.lazy(() => import('./containers/product/ProductList'))
const ProductFormPage = React.lazy(() => import('./containers/product/ProductForm'))

const CategoryListPage = React.lazy(() => import('./containers/category/CategoryList'))
const CategoryFormPage = React.lazy(() => import('./containers/category/CategoryForm'))

const BrandListPage = React.lazy(() => import('./containers/brand/BrandList'))
const BrandFormPage = React.lazy(() => import('./containers/brand/BrandForm'))

const PromotionListPage = React.lazy(() => import('./containers/promotion/PromotionList'))
const PromotionFormPage = React.lazy(() => import('./containers/promotion/PromotionForm'))

const CommentListPage = React.lazy(() => import('./containers/comment/CommentList'))
const CommentFormPage = React.lazy(() => import('./containers/comment/CommentForm'))

const RatingListPage = React.lazy(() => import('./containers/rating/RatingList'))
const RatingFormPage = React.lazy(() => import('./containers/rating/RatingForm'))

const OrderListPage = React.lazy(() => import('./containers/order/OrderList'))
const OrderFormPage = React.lazy(() => import('./containers/order/OrderForm'))

const ReportListPage = React.lazy(() => import('./containers/report/ReportList'))

const routes = [
  { path: '/dashboard', exact: true, name: 'Dashboard Page', element: DashboardPage },
  { path: '/webadmin/account', exact: true, name: 'Account Page', element: AccountListPage },
  { path: '/webadmin/account/form', exact: true, name: 'Account Form', element: AccountFormPage },
  { path: '/webadmin/account/form/:id', exact: true, name: 'Account Form', element: AccountFormPage },
  { path: '/webadmin/account/shipper', exact: true, name: 'Shipper Page', element: ShipperListPage },
  { path: '/webadmin/account/shipper/form', exact: true, name: 'Shipper Form', element: ShipperFormPage },
  { path: '/webadmin/account/shipper/form/:id', exact: true, name: 'Shipper Form', element: ShipperFormPage },
  { path: '/webadmin/account/delivery/:id', exact: true, name: 'Delivery Page', element: DeliveryListPage },
  { path: '/webadmin/account/delivery/form', exact: true, name: 'Delivery Form', element: DeliveryFormPage },
  { path: '/webadmin/account/delivery/form/:id', exact: true, name: 'Delivery Form', element: DeliveryFormPage },
  { path: '/webadmin/product', exact: true, name: 'Product List', element: ProductListPage },
  { path: '/webadmin/product/form', exact: true, name: 'Product Form', element: ProductFormPage },
  { path: '/webadmin/product/form/:id', exact: true, name: 'Product Form', element: ProductFormPage },
  { path: '/webadmin/category', exact: true, name: 'Category List', element: CategoryListPage },
  { path: '/webadmin/category/form', exact: true, name: 'Category Form', element: CategoryFormPage },
  { path: '/webadmin/category/form/:id', exact: true, name: 'Category Form', element: CategoryFormPage },
  { path: '/webadmin/brand', exact: true, name: 'Brand List', element: BrandListPage },
  { path: '/webadmin/brand/form', exact: true, name: 'Brand Form', element: BrandFormPage },
  { path: '/webadmin/brand/form/:id', exact: true, name: 'Brand Form', element: BrandFormPage },
  { path: '/webadmin/promotion', exact: true, name: 'Promotion List', element: PromotionListPage },
  { path: '/webadmin/promotion/form', exact: true, name: 'Promotion Form', element: PromotionFormPage },
  { path: '/webadmin/promotion/form/:id', exact: true, name: 'Promotion Form', element: PromotionFormPage },
  { path: '/webadmin/comment', exact: true, name: 'Comment List', element: CommentListPage },
  { path: '/webadmin/comment/form/:id', exact: true, name: 'Comment Form', element: CommentFormPage },
  { path: '/webadmin/rating', exact: true, name: 'Rating List', element: RatingListPage },
  { path: '/webadmin/rating/form/:id', exact: true, name: 'Rating Form', element: RatingFormPage },
  { path: '/webadmin/order', exact: true, name: 'OrderList List', element: OrderListPage },
  { path: '/webadmin/order/form/:id', exact: true, name: 'Order Form', element: OrderFormPage },
  { path: '/webadmin/order/details/:id', exact: true, name: 'OrderDetails List', element: OrderFormPage },
  { path: '/webadmin/report/order', exact: true, name: 'ReportList List', element: ReportListPage },
]

export default routes;
