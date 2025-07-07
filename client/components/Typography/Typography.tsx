import { ITypography } from "@/interfaces";
import styled from '@emotion/styled';

/**
 * Typography component
 * @param type      | the selected html tag
 * @param children  | the node passed inside the Component
 * @param props     | the default attribute of the Component
 * @param className | additional className
 * @return {*}
 * @constructor
 */
const Typography = ({ type, children, className = '', ...props }: ITypography) => {

	// If the variant exists in variantsMapping, we use it.
	// Otherwise, use p tag instead.
	const Component = styled((type && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'].includes(type)) ? type : 'div')`
		${c_props => type === 'h1' && c_props.theme.h1}
		${c_props => type === 'h2' && c_props.theme.h2}
		${c_props => type === 'h3' && c_props.theme.h3}
		${c_props => type === 'h4' && c_props.theme.h4}
		${c_props => type === 'h5' && c_props.theme.h5}
		${c_props => type === 'h6' && c_props.theme.h6}
		${c_props => type === 'p' && c_props.theme.p}
	`;

	return (
		<Component
			className={`typography-${type} ${className}`}
			{...props}
		>
			{children}
		</Component>
	);
};

export default Typography;
