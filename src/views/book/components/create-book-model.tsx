import { Button, Form, Input, Modal, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { create } from '../../../utils/requests';
import { CoverUpload } from './cover-upload';
import TextArea from 'antd/es/input/TextArea';

interface CreateBookModalProps {
	isOpen: boolean;
	handleClose: Function;
}
const layout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 18 }
};

export interface CreateBook {
	name: string;
	author: string;
	description: string;
	cover: string;
}

export function CreateBookModal(props: CreateBookModalProps) {
	// 使用 antd 的 Form.useForm 创建表单实例
	const [form] = useForm<CreateBook>();

	if (props.isOpen) {
		form.resetFields();
	}
	// 处理表单提交的异步函数
	const handleOk = async function () {
		// 验证所有表单字段
		await form.validateFields();

		// 获取表单中的所有值
		const values = form.getFieldsValue();

		try {
			// 调用创建接口发送请求
			const res = await create(values);

			// 如果请求成功（状态码为 200 或 201）
			if (res.status === 201 || res.status === 200) {
				// 显示成功提示
				message.success('创建成功');
				// 重置表单字段
				form.resetFields();
				// 调用父组件传入的关闭函数
				props.handleClose();
			}
		} catch (e: any) {
			// 如果请求失败，显示错误信息
			message.error(e.response.data.message);
		}
	};

	return (
		<Modal
			title="新增图书"
			open={props.isOpen}
			onOk={handleOk}
			onCancel={() => props.handleClose()}
			okText={'创建'}
		>
			<Form form={form} colon={false} {...layout}>
				<Form.Item
					label="图书名称"
					name="name"
					rules={[{ required: true, message: '请输入图书名称!' }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="作者"
					name="author"
					rules={[{ required: true, message: '请输入图书作者!' }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="描述"
					name="description"
					rules={[{ required: true, message: '请输入图书描述!' }]}
				>
					<TextArea />
				</Form.Item>
				<Form.Item
					label="封面"
					name="cover"
					rules={[{ required: true, message: '请上传图书封面!' }]}
				>
					{/* <Input /> */}
					<CoverUpload></CoverUpload>
				</Form.Item>
			</Form>
		</Modal>
	);
}
