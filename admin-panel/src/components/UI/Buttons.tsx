import { IButton } from '@/interfaces';
import styled from '@emotion/styled';

// Only YellowBtn is used by the admin. Copied from client/components/UI/Buttons.tsx
// without next/link (plain <a>) and next/font (no font class).

const YellowBtnWrapper = styled.button`
		cursor: pointer;
		line-height: 1.5;
		padding: 14px 20px;
		font-size: 18px;
		color: ${props => props.theme.colors.black};
		border-radius: 10px;
		border:1px solid ${props => props.theme.colors.yellow};
		background-color: ${props => props.theme.colors.yellow};
		align-self: center;

		@media ${props => props.theme.adaptiveMedia.desktop} {
			padding: 10px 14px;
			border-radius: 6px;
			font-size: 14px;
		}

		&:hover {
			background-color: transparent;
			color: ${props => props.theme.colors.white};
		}
`;
const YellowLinkWrapper = YellowBtnWrapper.withComponent('a');

export const YellowBtn = (
	{
		text,
		className = '',
		isHyperlink = false,
		hrefLink = '/',
		...props
	}: IButton
) => {
	return isHyperlink ?
		(
			<YellowLinkWrapper href={hrefLink} className={`yellow-btn ${className}`}>
				{text}
			</YellowLinkWrapper>
		) : (
			<YellowBtnWrapper {...props} className={`yellow-btn ${className}`}>
				{text}
			</YellowBtnWrapper>
		)
};
