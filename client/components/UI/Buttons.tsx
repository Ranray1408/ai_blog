import { inter } from '@/app/fonts';
import { IButton } from '@/interfaces';
import React from 'react';
import styled from '@emotion/styled';
import ArrowUp from '@/images/svg-icons/ArrowUp';
import Link from 'next/link';

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
const YellowLinkWrapper = YellowBtnWrapper.withComponent(Link);
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
			<YellowLinkWrapper href={hrefLink} className={`yellow-btn ${className} ${inter.className}`}>
				{text}
			</YellowLinkWrapper>
		) : (
			<YellowBtnWrapper {...props} className={`yellow-btn ${className} ${inter.className}`}>
				{text}
			</YellowBtnWrapper>
		)
};

const BtnWithArrowWrapper = styled.button`
		cursor: pointer;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 13px;
		font-size: 18px;
		font-weight: 400;
		padding: 18px 24px;
		border-radius: 12px;
		line-height: 1.5;
		letter-spacing: -0.42px;
		border: solid 1px ${props => props.theme.colors.borderColor};
		background-color: ${props => props.theme.colors.black};
		color: ${props => props.theme.colors.dark4};
        align-self: center;
		flex-shrink: 0;

		@media ${props => props.theme.adaptiveMedia.mobile} {
			padding: 14px 20px;
			font-size: 14px;
		}

		&:hover {
			background-color: ${props => props.theme.colors.yellow};
			color: ${props => props.theme.colors.white};

			svg path {
				fill: ${props => props.theme.colors.white};
			}
		}

		&.small {
			border-radius: 8px;
			padding: 10px 16px;
			gap: 10px;

			svg {
				width: 13px;
				height: 13px;
			}
		}
`;

const BtnWithArrowLinkWrapper = BtnWithArrowWrapper.withComponent(Link);
export const BtnWithArrow = ({
	text, className = '',
	isHyperlink = false,
	hrefLink = '#',
	type = 'button'
}: IButton) => {
	const typeClass = type === 'button' ? 'default' : '';

	return isHyperlink ? (
		<BtnWithArrowLinkWrapper href={hrefLink} className={`btn-with-arrow ${className} ${typeClass} ${inter.className}`}>
			{text}
			<svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
				<path fillRule="evenodd" clipRule="evenodd" d="M3.875 0.625L13.25 0.625C13.4158 0.625 13.5747 0.690848 13.6919 0.808058C13.8092 0.925269 13.875 1.08424 13.875 1.25V10.625C13.875 10.9702 13.5952 11.25 13.25 11.25C12.9048 11.25 12.625 10.9702 12.625 10.625V2.75888L1.19194 14.1919C0.947864 14.436 0.552136 14.436 0.308058 14.1919C0.0639806 13.9479 0.0639806 13.5521 0.308058 13.3081L11.7411 1.875L3.875 1.875C3.52982 1.875 3.25 1.59518 3.25 1.25C3.25 0.904822 3.52982 0.625 3.875 0.625Z" fill="#FFD11A" />
			</svg>
		</BtnWithArrowLinkWrapper>
	) : (
		<BtnWithArrowWrapper className={`btn-with-arrow ${className} ${inter.className}`}>
			{text}
			<svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
				<path fillRule="evenodd" clipRule="evenodd" d="M3.875 0.625L13.25 0.625C13.4158 0.625 13.5747 0.690848 13.6919 0.808058C13.8092 0.925269 13.875 1.08424 13.875 1.25V10.625C13.875 10.9702 13.5952 11.25 13.25 11.25C12.9048 11.25 12.625 10.9702 12.625 10.625V2.75888L1.19194 14.1919C0.947864 14.436 0.552136 14.436 0.308058 14.1919C0.0639806 13.9479 0.0639806 13.5521 0.308058 13.3081L11.7411 1.875L3.875 1.875C3.52982 1.875 3.25 1.59518 3.25 1.25C3.25 0.904822 3.52982 0.625 3.875 0.625Z" fill="#FFD11A" />
			</svg>
		</BtnWithArrowWrapper>
	);
};


const BtnWithIconWrapper = styled.button`
		cursor: pointer;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 10px;
		font-size: 18px;
		font-weight: 400;
		padding: 18px 24px;
		border-radius: 12px;
		line-height: 1.5;
		letter-spacing: -0.42px;
		border: solid 1px ${props => props.theme.colors.borderColor};
		background-color: ${props => props.theme.colors.black};
		color: ${props => props.theme.colors.dark4};
        align-self: center;
		flex-shrink: 0;

		@media ${props => props.theme.adaptiveMedia.mobile} {
			padding: 14px 20px;
			font-size: 14px;
		}

		&:hover {
			background-color: ${props => props.theme.colors.yellow};
			color: ${props => props.theme.colors.white};

			svg path {
				stroke: ${props => props.theme.colors.white};
			}
		}
`;

const BtnWithIconLinkWrapper = BtnWithIconWrapper.withComponent(Link);
export const BtnWithIcon = ({ text, className = '', isHyperlink = false, hrefLink = '#', icon = null }: IButton) => {
	return isHyperlink ? (
		<BtnWithIconLinkWrapper href={hrefLink} className={`btn-with-icon ${className} ${inter.className}`}>
			{text}
			{icon ?? ''}
		</BtnWithIconLinkWrapper>
	) : (
		<BtnWithIconWrapper className={`btn-with-icon ${className} ${inter.className}`}>
			{text}
			{icon ?? ''}
		</BtnWithIconWrapper>
	);
};

const ArrowBtnWrapper = styled.button`
	cursor: pointer;
	width: 52px;
	height: 52px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	background-color: ${props => props.theme.colors.yellow};
	border:1px solid ${props => props.theme.colors.yellow};

	@media screen and (max-width: 1200px) {
		width: 44px;
		height: 44px;
	}

	@media screen and (max-width: 1024px) {
		width: 40px;
		height: 40px;
	}

	svg path {
		transition: fill 0.3s;
		fill: ${props => props.theme.colors.dark};
	}

	&:hover {
		background-color: transparent;

		svg path {
			fill: ${props => props.theme.colors.yellow};
		}
	}
`;

const ArrowBtnLinkWrapper = ArrowBtnWrapper.withComponent(Link);

export const ArrowBtn = ({ className = '', isHyperlink = false, hrefLink = '' }: IButton) => {
	return isHyperlink ? (
		<ArrowBtnLinkWrapper href={hrefLink} className={`arrow-btn ${className}`}>
			<ArrowUp />
		</ArrowBtnLinkWrapper>
	) : (
		<ArrowBtnWrapper className={`arrow-btn ${className}`}>
			<ArrowUp />
		</ArrowBtnWrapper>
	);
};

const GrayBtnWrapper = styled.button`
	cursor: pointer;
	font-family: ${props => props.theme.fonts.main};
	font-size: 20px;
	font-weight: 500;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.5;
	letter-spacing: -0.6px;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	border-radius: 4px;
	padding: 6px 10px;
	background-color: ${props => props.theme.colors.dark5};
	border: 1px solid ${props => props.theme.colors.dark5};
	color: ${props => props.theme.colors.white};

	@media screen and (max-width: 1024px) {
		font-size: 16px;
		padding: 4px 10px;
	}

	@media screen and (max-width: 768px) {
		font-size: 14px;
		padding: 4px 8px;
	}

	&:hover {
		background-color: ${props => props.theme.colors.yellow};
		color: ${props => props.theme.colors.dark};
	}
`;

const GrayBtnLinkWrapper = GrayBtnWrapper.withComponent(Link);
export const GrayBtn = ({ text, className = '', isHyperlink = false, hrefLink = '' }: IButton) => {
	return isHyperlink ? (
		<GrayBtnLinkWrapper href={hrefLink} className={`gray-btn ${className}`}>
			{text}
		</GrayBtnLinkWrapper>
	) : (
		<GrayBtnWrapper className={`gray-btn ${className}`}>
			{text}
		</GrayBtnWrapper>
	);
};


