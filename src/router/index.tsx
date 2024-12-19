// 导入必要的 React 和 Router 依赖
import ReactDOM from 'react-dom/client';
import {
	RouteObject,
	RouterProvider,
	createBrowserRouter
} from 'react-router-dom';

// 导入页面组件
import Login from '../views/login';
import Register from '../views/register';
import Book from '../views/book';

// 定义路由配置数组
const routes: RouteObject[] = [
	{
		path: '/login', // 登录页面路由
		element: <Login />
	},
	{
		path: '/register', // 注册页面路由
		element: <Register />
	},
	{
		path: '/', // 首页（图书页面）路由
		element: <Book />
	}
];

// 创建路由实例
const router = createBrowserRouter(routes);

// 导出路由配置
export default router;
