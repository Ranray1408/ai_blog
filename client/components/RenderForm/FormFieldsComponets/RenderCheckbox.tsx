import React from 'react';
import { IRenderCheckbox } from '../RenderFormInterfaces';
import { FieldValues } from 'react-hook-form';

const RenderCheckbox = <T extends FieldValues>({
	label = '',
	fieldsParams: { field: { name, onBlur, onChange, ref, value, disabled }, fieldState }
}: IRenderCheckbox<T>) => {
	return (
		<label className={`checkbox`}>
			<div className={`checkbox-box ${value ? 'checked' : ''}`}></div>
			{label && <span className='label-text'>{label}</span>}
			<input
				name={name}
				onChange={() => onChange(!value)}
				onBlur={onBlur}
				ref={ref}
				disabled={disabled}
				type='checkbox'
				checked={!!value}
			/>
		{fieldState?.error && <p className='invalid-message' >{fieldState.error.message}</p>}
		</label>
	);
};

export default RenderCheckbox;
