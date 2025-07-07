import React from 'react';
import { FieldValues } from 'react-hook-form';
import { IRenderRadio } from '../RenderFormInterfaces';

const RenderRadio = <T extends FieldValues>({
	label = '',
	options = [],
	fieldsParams: { field: { name, onBlur, onChange, ref, value, disabled } }
}: IRenderRadio<T>) => {
	return (
		<div className='radio-group'>
			{label && <span className='label-text'>{label}</span>}
			{options &&
				options?.map((option, index) => (
					<label key={String(option.value)}
						className={`radio ${value === option.value ? 'checked' : ''}`}>
						<input
							type='radio'
							name={name}
							value={option.value}
							checked={value === option.value}
							onChange={() => onChange(option.value)}
							onBlur={onBlur}
							disabled={disabled}
							ref={index === 0 ? ref : undefined}
						/>
						{option.label}
					</label>
				))}
		</div>
	);
};

export default RenderRadio;
