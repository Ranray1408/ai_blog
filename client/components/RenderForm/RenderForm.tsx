import React from 'react';
import { Controller, FieldValues, useForm, Path, PathValue } from 'react-hook-form';
import RenderField from './RenderField';
import { getPattern } from './Utils';
import { IRenderFormProps } from './RenderFormInterfaces';

/**
 * This component renders a dynamic form based on the fields configuration provided.
 * It accepts an array of fields and generates form inputs based on the specified configuration.
 * The form data is passed back to the `onSubmit` handler when submitted.
 *
 * Data passed to the component:
 * - fields: an array of form field definitions (see IFieldProps below).
 * - onSubmit: a function to handle the form submission.
 * - submitText (optional): text to display on the submit button (default is "Send").
 *
 * @param T - the shape of the form data (using TypeScript generics for type safety).
 */



const RenderForm = <T extends FieldValues>({ fields, onSubmit, submitText = 'Send' }: IRenderFormProps<T>) => {
	const { handleSubmit, control } = useForm<T>({
		mode: 'onChange',
	});

	const hasValidation = (type: string) => {
		return type !== 'select' && type !== 'checkbox' && type !== 'radio';
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{
				fields &&
				fields.map((fieldInboxSettigns, index) => {
					const { type, name, defaultValue, required } = fieldInboxSettigns;
					const fieldRules = hasValidation(type) ? {
						...(required && { required: 'This field is required.' }),
						pattern: {
							value: getPattern(name),
							message: 'Invalid field pattern.',
						},
					} : {
						...(required && { required: 'This field is required.' }),
					};

					return (
						<div key={`${name}-${index}`} className={`form-column form-column-${index + 1} ${name}`}>

							<Controller
								control={control}
								name={name as Path<T>}
								defaultValue={defaultValue as PathValue<T, Path<T>>}
								rules={fieldRules}
								render={(fieldsParams) => {
									return (
										<RenderField<T>
											fieldsParams={fieldsParams}
											fieldInboxSettigns={fieldInboxSettigns}
										/>
									)
								}}
							/>
						</div>
					)
				}
				)
			}
			<button className='submit-button' type='submit'>{submitText}</button>
		</form >
	);
};

export default RenderForm;
