import React from 'react';
import { FieldValues } from 'react-hook-form';
import { IRenderInput } from '../RenderFormInterfaces';

const RenderInput = <T extends FieldValues>({
	label = '',
	type,
	placeholder = '',
	fieldsParams: { field: { name, onBlur, onChange, ref, value, disabled }, fieldState }
}: IRenderInput<T>) => {
	return (
		<label>
			{label && <span className='label-text'>{label}</span>}
			<input
				name={name}
				value={value ?? ''}
				onChange={(e) => onChange(e.target.value)}
				onBlur={onBlur}
				disabled={disabled}
				ref={ref}
				placeholder={placeholder}
				type={type}
			/>
			{fieldState?.error && <p className='invalid-message' >{fieldState.error.message}</p>}
		</label>
	);
};

export default RenderInput;
