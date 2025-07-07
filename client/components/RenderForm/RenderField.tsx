import React from 'react';
import { FieldValues, Path } from 'react-hook-form';
import RenderSelect from './FormFieldsComponets/RenderSelect';
import RenderRadio from './FormFieldsComponets/RenderRadio';
import RenderTextarea from './FormFieldsComponets/RenderTextarea';
import RenderInput from './FormFieldsComponets/RenderInput';
import { IRenderFieldProps } from './RenderFormInterfaces';
import RenderCheckbox from './FormFieldsComponets/RenderCheckbox';


const RenderField = <T extends FieldValues>
	({ fieldsParams, fieldInboxSettigns }: IRenderFieldProps<T>) => {

	const { type, label, options = [], placeholder } = fieldInboxSettigns;

	switch (type) {
		case 'select':
			return (
				<RenderSelect<T>
					label={label}
					options={options}
					fieldsParams={fieldsParams} />
			);
		case 'checkbox':
			return (
				<RenderCheckbox<T>
					label={label}
					fieldsParams={fieldsParams} />
			);
		case 'radio':
			return (
				<RenderRadio<T>
					label={label}
					fieldsParams={fieldsParams}
					options={options}
				/>
			)
		case 'textarea':
			return (
				<RenderTextarea<T>
					label={label}
					placeholder={placeholder}
					fieldsParams={fieldsParams}
				/>
			);
		default:
			return (
				<RenderInput
					label={label}
					placeholder={placeholder}
					fieldsParams={fieldsParams}
					type={type as Path<T>}
				/>
			);
	}
};

export default RenderField;
