// 导入必要的 React 核心模块
import React from 'react';
import ReactDOM from 'react-dom/client';
// 导入路由提供者组件
import { RouterProvider } from 'react-router-dom';
// 导入我们配置好的路由实例
import router from './router';

// 导出 css 布局初始化

import './App.css';

// 创建 React 根实例并渲染应用
ReactDOM.createRoot(document.getElementById('root')!).render(
	// 严格模式，用于突出显示应用程序中的潜在问题
	<React.StrictMode>
		{/* RouterProvider 接收路由配置并处理所有路由逻辑 */}
		<RouterProvider router={router} />
	</React.StrictMode>
);
