import React, { useEffect, useState, useMemo } from 'react';
import {
	Button,
	Card,
	Form,
	Input,
	message,
	Divider,
	notification,
	Space,
	Popconfirm
} from 'antd';
import type { NotificationArgsProps, PopconfirmProps } from 'antd';
import { list } from '../../utils/requests';
import { CreateBookModal } from './components/create-book-model';
import UpdateBookModel from './components/update-book-model';
import { detail, del } from '../../utils/requests';
import DetailsBookModel from './components/details-book-model';

import './index.scss';

interface Book {
	id: number;
	name: string;
	author: string;
	description: string;
	cover: string;
}

const App = () => {
	const [bookList, setBookList] = React.useState<Array<Book>>([]);

	const [isCreateBookModelOpen, setIsCreateBookModelOpen] = useState(false);
	const [isUpdateBookModelOpen, setIsUpdateBookModelOpen] = useState(false);
	const [isDetailsBookModelOpen, setIsDetailsBookModelOpen] = useState(false);
	const [isClickDetails, setIsClickDetails] = useState('');
	const [updateId, setUpdateId] = useState(0);
	const [dateilsId, setDateilsId] = useState(0);

	const [searchName, setSearchName] = useState('');
	async function fetchData() {
		try {
			const res = await list(searchName);
			if (res.status == 201 || res.status == 200) {
				setBookList(res.data);
			}
		} catch (e: any) {
			message.error(e.response.data.message);
		}
	}

	async function searchBook(values: { name: string }) {
		console.log('values', values);
		setSearchName(values.name);
	}

	async function editBook(id: number) {
		setUpdateId(id);
		setIsUpdateBookModelOpen(true);
	}
	async function detailsBook(id: number, details: string) {
		console.log('details', details);
		setDateilsId(id);
		setIsClickDetails(details);
		setIsDetailsBookModelOpen(true);
	}
	const [api, contextHolder] = notification.useNotification();
	async function deleteBook(id: number) {
		try {
			const res = await del(id);
			console.log(res);
			if (res.status == 200 || res.status == 201) {
				// message.success('删除成功');
				api.success({
					message: '删除成功',
					placement: 'topRight'
				});
				setNum(Math.random());
			}
		} catch (e: any) {
			message.error(e.response.data.message);
		}
	}

	const confirm: PopconfirmProps['onConfirm'] = (e) => {
		console.log(e);
		message.success('Click on Yes');
	};

	const cancel: PopconfirmProps['onCancel'] = (e) => {
		console.log(e);
		message.error('Click on No');
	};

	const [num, setNum] = useState(0);
	useEffect(() => {
		fetchData();
	}, [searchName, num]);
	return (
		<div id="bookManage">
			{contextHolder}
			<CreateBookModal
				isOpen={isCreateBookModelOpen}
				handleClose={() => {
					setIsCreateBookModelOpen(false);
					// setName('');
					setNum(Math.random());
				}}
			></CreateBookModal>
			<UpdateBookModel
				id={updateId}
				isOpen={isUpdateBookModelOpen}
				handleClose={() => {
					setIsUpdateBookModelOpen(false);
					// setName('');
					setNum(Math.random());
				}}
			></UpdateBookModel>
			<DetailsBookModel
				isOpen={isDetailsBookModelOpen}
				closeHandle={() => {
					setIsDetailsBookModelOpen(false);
				}}
				isDetails={isClickDetails}
				id={dateilsId}
			></DetailsBookModel>
			<h1>图书管理系统</h1>
			<div className="content">
				<div className="book-search">
					<Form
						name="search"
						layout="inline"
						colon={false}
						onFinish={searchBook}
					>
						<Form.Item label="图书名称" name="name">
							<Input />
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit">
								搜索图书
							</Button>
							<Button
								type="primary"
								htmlType="submit"
								style={{ background: 'green' }}
								onClick={() => {
									setIsCreateBookModelOpen(true);
								}}
							>
								添加图书
							</Button>
						</Form.Item>
					</Form>
				</div>
				<div className="book-list">
					{bookList.map((item) => {
						return (
							<Card
								key={item.id}
								className="card"
								hoverable
								style={{ width: 400 }}
								cover={
									<img
										style={{
											width: '200px',
											height: '200px'
										}}
										alt="example"
										src={`http://localhost:3000/${item.cover}`}
									/>
								}
							>
								<h2>{item.name}</h2>
								<div>{item.author}</div>
								<div style={{ height: '200px' }}>{item.description}</div>
								<div className="links">
									<a onClick={() => detailsBook(item.id, '详情')}>详情</a>
									<a onClick={() => editBook(item.id)}>编辑</a>
									<Popconfirm
										title="删除"
										description="确认删除这个图书吗?"
										onConfirm={() => deleteBook(item.id)}
										onCancel={cancel}
										okText="确认"
										cancelText="取消"
									>
										<a>删除</a>
									</Popconfirm>
								</div>
							</Card>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default App;
