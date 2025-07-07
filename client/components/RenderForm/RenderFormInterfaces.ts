import { ControllerFieldState, ControllerRenderProps, FieldValues, Path, RegisterOptions, SubmitHandler, UseFormStateReturn } from "react-hook-form";

// Inbox settigns for the single field
export interface IFieldProps {
	name: string;          // Name of the field (used to bind the input to form data).
	type: string;          // Type of the field (e.g., "text", "select", "checkbox", etc.).
	label?: string;        // Optional label for the field.
	defaultValue?: string | number | boolean;  // Optional default value for the field.
	rules?: RegisterOptions;  // Validation rules (optional).
	placeholder?: string;  // Placeholder for input fields (optional).
	options?: { label: string; value: string | number }[]; // Options for select, radio, or checkbox fields.
	required?: boolean; // Is field required
}

// Component props
export interface IRenderFormProps<T extends FieldValues> {
	fields: IFieldProps[];
	onSubmit: SubmitHandler<T>;
	submitText?: string;
}

// React hook form fields params
export interface IFieldsParams<T extends FieldValues> {
	field: ControllerRenderProps<T, Path<T>>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<T>;
}

// Props for RenderField component
export interface IRenderFieldProps<T extends FieldValues> {
	fieldsParams: IFieldsParams<T>;
	fieldInboxSettigns: IFieldProps;
}

// Fields interfaces ***************
export interface IRenderSelect<T extends FieldValues> {
	fieldsParams: IFieldsParams<T>;
	label?: string;
	options: { label: string; value: string | number }[];
}

export interface IRenderCheckbox<T extends FieldValues> {
	fieldsParams: IFieldsParams<T>;
	label?: string;
}

export interface IRenderRadio<T extends FieldValues> {
	fieldsParams: IFieldsParams<T>;
	label?: string;
	options: { label: string; value: string | number }[];
}

export interface IRenderTextarea<T extends FieldValues> {
	fieldsParams: IFieldsParams<T>;
	label?: string;
	placeholder?: string;
}

export interface IRenderInput<T extends FieldValues> {
	fieldsParams: IFieldsParams<T>;
	label?: string;
	placeholder?: string;
	type: React.HTMLInputTypeAttribute;
}
