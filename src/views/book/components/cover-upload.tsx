import { InboxOutlined } from '@ant-design/icons';
import { message } from 'antd';
import Dragger, { DraggerProps } from 'antd/es/upload/Dragger';

interface CoverUploadProps {
	value?: string;
	onChange?: Function;
	isClickDetailsModel?: string;
}

export function CoverUpload({
	value,
	onChange,
	isClickDetailsModel
}: CoverUploadProps) {
	console.log('isClickDetailsModel', isClickDetailsModel);
	console.log('value', value);
	const uploadProps: DraggerProps = {
		name: 'file',
		action: 'http://localhost:3000/book/upload',
		method: 'post',
		onChange(info) {
			const { status } = info.file;
			if (status === 'done') {
				onChange?.(info.file.response);
				message.success(`${info.file.name} 文件上传成功`, 1);
			} else if (status === 'error') {
				message.error(`${info.file.name} 文件上传失败`);
			}
		}
	};

	const dragger = (
		<Dragger {...uploadProps}>
			<p className="ant-upload-drag-icon">
				<InboxOutlined />
			</p>
			<p className="ant-upload-text">点击或拖拽文件到这个区域来上传</p>
		</Dragger>
	);

	const img = (
		<img
			src={'http://localhost:3000/' + value}
			alt="封面"
			width="100"
			height="100"
		/>
	);
	return value ? (
		isClickDetailsModel == '详情' ? (
			<div>{img}</div>
		) : (
			<div>
				{img}
				{dragger}
			</div>
		)
	) : (
		<div>{dragger}</div>
	);
}
