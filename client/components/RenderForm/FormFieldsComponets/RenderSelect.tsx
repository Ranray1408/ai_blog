import React from 'react';
import { FieldValues } from 'react-hook-form';
import { IRenderSelect } from '../RenderFormInterfaces';



const RenderSelect = <T extends FieldValues>({
	options = [],
	label = '',
	fieldsParams: { field: { name, onBlur, onChange, ref, value, disabled } }
}: IRenderSelect<T>) => {

	return (
		<label className='select'>
			{label && <span className='label-text'>{label}</span>}
			<select
				name={name}
				onChange={onChange}
				onBlur={onBlur}
				ref={ref}
				value={value ?? ''}
				disabled={disabled}
			>
				{options?.map(({ value, label }) => (
					<option
						key={value.toString()}
						value={value}
					>
						{label}
					</option>
				))}
			</select>
		</label>
	);
};

export default RenderSelect;
