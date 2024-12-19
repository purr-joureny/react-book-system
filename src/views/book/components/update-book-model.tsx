import { Button, Form, Input, Modal, message } from 'antd';
// import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
// import {
// 	Checkbox,
// 	Col,
// 	ColorPicker,
// 	InputNumber,
// 	Radio,
// 	Rate,
// 	Row,
// 	Select,
// 	Slider,
// 	Space,
// 	Switch,
// 	Upload
// } from 'antd';

import { useForm } from 'antd/es/form/Form';
// import TextArea from 'antd/es/input/TextArea';
import { CoverUpload } from './cover-upload';
import { detail, update } from '../../../utils/requests';
import { useEffect } from 'react';

interface UpdateBookModalProps {
	id: number;
	isOpen: boolean;
	handleClose: Function;
}

const layout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 18 }
};

export interface UpdateBook {
	id: number;
	bookName: string;
	author: string;
	des: string;
	cover: string;
}

// const { Option } = Select;

// const formItemLayout = {
// 	labelCol: { span: 6 },
// 	wrapperCol: { span: 14 }
// };

// const normFile = (e: any) => {
// 	console.log('Upload event:', e);
// 	if (Array.isArray(e)) {
// 		return e;
// 	}
// 	return e?.fileList;
// };

// const onFinish = (values: any) => {
// 	console.log('Received values of form: ', values);
// };
function UpdateBookModel(props: UpdateBookModalProps) {
	const [form] = useForm<UpdateBook>();

	const handleOK = async function () {
		// 验证所有表单字段
		await form.validateFields();

		// 获取表单中的所有值
		const values = form.getFieldsValue();

		try {
			console.log('props.id', props.id);
			const res = await update({ ...values, id: props.id });
			console.log('update res', res);
			if (res.status == 200 || res.status == 201) {
				message.success('更新成功');
				props.handleClose();
			}
		} catch (e: any) {
			message.error(e.response.data.message);
		}
	};

	async function query() {
		if (!props.id) {
			return;
		}
		try {
			const res = await detail(props.id);
			const { data } = res;
			console.log('res ', res);
			if (res.status === 200 || res.status === 201) {
				form.setFieldValue('id', data.id);
				form.setFieldValue('bookName', data.name);
				form.setFieldValue('author', data.author);
				form.setFieldValue('des', data.description);
				form.setFieldValue('cover', data.cover);
			}
		} catch (e: any) {
			message.error(e.response.data.message);
		}
	}
	useEffect(() => {
		query();
	}, [props.id]);
	return (
		<Modal
			title="编辑"
			open={props.isOpen}
			onOk={handleOK}
			onCancel={() => props.handleClose()}
			cancelText={'取消'}
			okText={'编辑'}
		>
			<Form
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
					<CoverUpload></CoverUpload>
				</Form.Item>
			</Form>
		</Modal>
	);
}

export default UpdateBookModel;
