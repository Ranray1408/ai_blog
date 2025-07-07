'use client';
import ArrowUp from '@/images/svg-icons/ArrowUp';
import React from 'react';
import styled from '@emotion/styled';
import Container from '../Container/Container';
import Logo from '@/images/svg-icons/Logo';
import Navigation from './Navigation';
import { YellowBtn } from '../UI/Buttons';
import { IHeaderData } from '@/interfaces';
import { fetchHeader } from '@/store/headerSlice';
import { useFetchData } from '@/Helpers/custom-hooks';

const StyledHeader = styled.header`
		background-color: ${props => props.theme.colors.black};

		.menu-container {
			display: flex;
			justify-content: space-between;
		}

		.menu-section {
			background-color: ${props => props.theme.colors.dark};
			height: 103px;
			padding: 24px 0;

			@media ${props => props.theme.adaptiveMedia.tablet} {
				height: 81px;
				padding: 20px 0;
			}

			.logo-svg {
				@media ${props => props.theme.adaptiveMedia.tablet} {
					height: 48px;
					width: 143px;
				}

				@media ${props => props.theme.adaptiveMedia.mobile} {
					height: 35px;
					width: 125px;
				}
			}
		}

		.uptitle-section {
			text-align: center;
			padding: 20px 0;
			font-size: 18px;
			line-height: 1.5;
			letter-spacing: -0.54px;
			color: #98989a;

			@media ${props => props.theme.adaptiveMedia.tablet} {
				font-size: 14px;
			}

			@media ${props => props.theme.adaptiveMedia.x_small} {
				font-size: 12px;
			}

			.arrow-up-svg {
				@media ${props => props.theme.adaptiveMedia.tablet} {
					width: 20px;
					height: 20px;
				}
			}
		}

		.uptitle-container {
			gap: 12px;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.yellow-btn {
			@media screen and (max-width: 1024px) {
				display: none;
			}
		}

	`;

const Header = () => {
	const {
		headerText,
		contactButtonText} = useFetchData<IHeaderData>({
		reducer: 'headerState',
		fetchAction: fetchHeader
	});

	return (
		<StyledHeader>
			<div className="uptitle-section">
				<Container className='uptitle-container'>
					{headerText && <span>{headerText}</span>}
					<ArrowUp />
				</Container>
			</div>
			<div className="menu-section">
				<Container className='menu-container'>
					<Logo />
					<Navigation />
					<YellowBtn text={contactButtonText} />
				</Container>
			</div>
		</StyledHeader>
	);
};

export default Header;
