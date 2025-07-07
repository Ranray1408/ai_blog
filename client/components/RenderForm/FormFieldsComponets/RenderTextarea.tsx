import React from 'react';
import { FieldValues } from 'react-hook-form';
import { IRenderTextarea } from '../RenderFormInterfaces';

const RenderTextarea = <T extends FieldValues>({
	label = '',
	placeholder = '',
	fieldsParams: { field: { name, onBlur, onChange, ref, value, disabled }, fieldState }
}: IRenderTextarea<T>) => {
	return (
		<label className={`textarea`}>
			{label && <span className='label-text'>{label}</span>}
			<textarea
				name={name}
				value={value ?? ''}
				placeholder={placeholder}
				onChange={(e) => onChange(e.target.value)}
				onBlur={onBlur}
				disabled={disabled}
				ref={ref}
			/>
			{fieldState?.error && <p className='invalid-message' >{fieldState.error.message}</p>}
		</label>
	);
};

export default RenderTextarea;
