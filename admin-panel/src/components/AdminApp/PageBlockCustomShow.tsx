import React, { useEffect, useState } from 'react';
import { useDataProvider, useNotify } from 'react-admin';
import { YellowBtn } from '../UI/Buttons';
import API_ENDPOINTS from '@/config/APIs';

type AnyType = string | number | boolean | null | AnyType[] | { [key: string]: AnyType };

interface BlockDataFromBD {
	id: number;
	block_key: string;
	data: AnyType;
	position?: number;
}

interface PageBlockCustomShowProps {
	apiUrl: string;
}

interface EditableBlockProps {
	blockData: BlockDataFromBD;
	apiUrl: string;
}

interface BlockDataFieldsProps {
	blockData: AnyType;
	onChange: (newData: AnyType) => void;
}

const PageBlockCustomShow: React.FC<PageBlockCustomShowProps> = ({ apiUrl }) => {
	const dataProvider = useDataProvider();
	const notify = useNotify();
	const [blockData, setBlockData] = useState<BlockDataFromBD>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		dataProvider
			.getList<BlockDataFromBD>(apiUrl, {
				pagination: { page: 1, perPage: 10 },
				sort: { field: 'id', order: 'ASC' },
				filter: {},
			})
			.then(({ data }) => {
				setBlockData(data[0]);
				setLoading(false);
			})
			.catch((err) => {
				console.error('❌ Error fetching block data:', err);
				notify('Error fetching data', { type: 'error' });
			});
	}, [dataProvider, notify, apiUrl]);

	if (loading) return <div>Loading...</div>;
	if (!blockData) return <div>No block data found.</div>;

	return <EditableBlock apiUrl={apiUrl} blockData={blockData} />;
};

const EditableBlock: React.FC<EditableBlockProps> = ({ blockData, apiUrl }) => {
	const [formData, setFormData] = useState<AnyType>(blockData.data);
	const [responseMsg, setResponseMsg] = useState<string | null>(null);
	const notify = useNotify();

	const handleFieldChange = (newData: AnyType) => {
		setFormData(newData);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const response = await fetch(`${API_ENDPOINTS.API_PATH}/${apiUrl}/adminData	`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					data: formData,
					block_key: blockData.block_key
				}),
			});

			if (!response.ok) throw new Error('Failed to update block');

			const result = await response.json();
			setResponseMsg(result.message);
			notify('Block updated successfully', { type: 'success' });

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.error('❌ Error while saving block:', error);
			setResponseMsg('Error occurred while saving');
			notify(error.message || 'Error updating block', { type: 'error' });
		}
	};

	return (
		<div style={{ maxWidth: '1600px', width: '100%', margin: '0 auto' }}>
			<div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', marginBottom: '40px' }}>
				<h3>Block key: {blockData.block_key}</h3>
				<h3>Block ID: {blockData.id}</h3>
				<h3>Block position: {blockData.position}</h3>
			</div>

			<form onSubmit={handleSubmit}>
				<BlockDataFields blockData={formData} onChange={handleFieldChange} />
				<YellowBtn style={{ margin: '20px 0', padding: '10px 30px' }} className="save-btn" text="Save" />
				{responseMsg && <p style={{ marginTop: '10px' }}>{responseMsg}</p>}
			</form>
		</div>
	);
};

const BlockDataFields: React.FC<BlockDataFieldsProps> = ({ blockData, onChange }) => {
	if (blockData === null || blockData === undefined) return null;

	const isObjectType = typeof blockData === 'object';

	if (Array.isArray(blockData)) {
		const handleItemChange = (index: number, newValue: AnyType) => {
			const updatedArray = [...blockData];
			updatedArray[index] = newValue;
			onChange(updatedArray);
		};

		return (
			<div style={generateStyle(blockData.length)}>
				{blockData.map((item, index) => (
					<div key={index}>
						<BlockDataFields
							blockData={item}
							onChange={(val) => handleItemChange(index, val)} />
					</div>
				))}
			</div>
		);
	}

	if (isObjectType) {
		const entries = Object.entries(blockData as Record<string, AnyType>);

		const handleObjectFieldChange = (key: string, newValue: AnyType) => {
			const updatedObject = { ...blockData as Record<string, AnyType>, [key]: newValue };
			onChange(updatedObject);
		};

		return (
			<div className="fields-container">
				{entries.map(([key, value]) => (
					<div className="field-item" key={key} style={{ marginBottom: '1rem' }}>
						<label style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>{key}:</label>
						<BlockDataFields blockData={value} onChange={(val) => handleObjectFieldChange(key, val)} />
					</div>
				))}
			</div>
		);
	}

	return (
		<input
			type="text"
			value={String(blockData ?? '')}
			style={{ width: '100%', marginTop: '4px' }}
			onChange={(e) => onChange(e.target.value)}
		/>
	);
};

const generateStyle = (count: number): React.CSSProperties => {
	const cols = Math.min(count, 4);
	return {
		display: 'grid',
		gridTemplateColumns: `repeat(${cols}, 1fr)`,
		gap: '1rem',
		justifyItems: 'stretch',
		alignItems: 'start',
		marginBottom: '1rem',
	};
};

export default PageBlockCustomShow;
