import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { CoverUpload } from './cover-upload';
import { detail } from '../../../utils/requests';
export interface DetailsBookModelProps {
	id: number;
	isOpen: boolean;
	isDetails: string;
	closeHandle: Function;
}

export interface DetailsBook {
	id: number;
	bookName: string;
	author: string;
	des: string;
	cover: string;
}

const layout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 18 }
};

const App = (props: DetailsBookModelProps) => {
	console.log('props.isDetails', props.isDetails);
	const [form] = useForm<DetailsBook>();

	const detailsData = async () => {
		if (!props.id) {
			return;
		}

		const res = await detail(props.id);
		console.log('details res', res);
		const { data } = res;
		if (res.status == 200 || res.status == 201) {
			form.setFieldValue('id', data.id);
			form.setFieldValue('author', data.author);
			form.setFieldValue('bookName', data.name);
			form.setFieldValue('des', data.description);
			form.setFieldValue('cover', data.cover);
			// 获取表单中的所有值
			const values = form.getFieldsValue();
			console.log('details values ', values);
		}
	};
	const handleOk = () => {};

	useEffect(() => {
		detailsData();
	}, [props.id]);
	return (
		<>
			<Modal
				title="详情"
				open={props.isOpen}
				onOk={handleOk}
				onCancel={() => props.closeHandle()}
				footer={null}
			>
				{/* <p>Some contents...</p>
				<p>Some contents...</p>
				<p>Some contents...</p> */}
				<Form
					name="validate_other"
					form={form}
					colon={false}
					{...layout}
					// onFinish={onFinish}
					// initialValues={{
					// 	'input-number': 3,
					// 	'checkbox-group': ['A', 'B'],
					// 	rate: 3.5,
					// 	'color-picker': null
					// }}
					style={{ maxWidth: 600 }}
				>
					<Form.Item
						name="bookName"
						label="图书名称"
						rules={[{ required: true, message: '请输入图书名称' }]}
					>
						<Input placeholder="Please input your name" />
					</Form.Item>
					<Form.Item
						name="author"
						label="作者"
						rules={[{ required: true, message: '请输入作者名称' }]}
					>
						<Input placeholder="Please input your name" />
					</Form.Item>
					<Form.Item
						name="des"
						label="描述"
						rules={[{ required: true, message: '请填写描述' }]}
					>
						<Input placeholder="Please input your name" />
					</Form.Item>
					<Form.Item
						name="cover"
						label="封面"
						rules={[{ required: true, message: '请上传封面' }]}
					>
						<CoverUpload isClickDetailsModel={props.isDetails}></CoverUpload>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default App;
