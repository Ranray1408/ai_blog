'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { togglePopup } from '@/store/mainStatesSlice';
import Container from '../Container/Container';
import { AppDispatch, IRootState } from '@/interfaces';
import { fetchHeader } from '@/store/headerSlice';

const NavigationWrapper = styled.nav`
	display: flex;
	justify-content: center;
	align-items: center;

	&.opened-menu {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: ${props => props.theme.colors.black};
		z-index: 100;
		align-items: flex-start;
    	padding-top: 90px;
		overflow-y: auto;

		.navigation-inner {

			@media screen and (max-width: 1024px) {
				display: flex;
			}
		}

		.mobile-burger-menu {
			position: absolute;
			top: 30px;
			right: 30px;

			.burger {
				display: none;
			}
			.close {
				display: block;
			}
		}
	}

	.navigation-inner {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 37px;

		@media ${props => props.theme.adaptiveMedia.desktop} {
			gap: 24px;
		}

		@media ${props => props.theme.adaptiveMedia.tablet} {
			display: none;
			flex-direction: column;
			align-items: flex-start;
			gap: 20px;
		}

		@media screen and (min-width: 1024px) {
			padding-left: 0;
			padding-right: 0;
			width: auto;
		}
	}

	.menu-item {
		padding: 20px 24px;
		border-radius: 20px;
		border: 1px solid transparent;

		@media ${props => props.theme.adaptiveMedia.desktop} {
			padding: 10px 18px;
			border-radius: 6px;
			font-size: 14px;
		}

		&:hover,
		&.active {
			border-color: #333333;
			background-color: #141414;

			@media screen and (max-width: 1024px){
				border-radius: 0;
				border-color: transparent;
				border-bottom-color: ${props => props.theme.colors.yellow};
			}
		}

	}

	.mobile-burger-menu {
		display: none;
		border: none;
		background-color: transparent;

		* {
			pointer-events: none;
		}

		@media screen and (max-width: 1024px){
			display: flex;
		}

		svg path {
			transition: fill 0.3s;
		}

		&:active {
			svg path {
				fill: ${props => props.theme.colors.yellow}
			}
		}

		.burger {
			display: block;
		}
		.close {
			display: none;
		}
	}
`;

const Navigation = () => {
	const pathName = usePathname();
	const [isMenuOpened, SetIsMenuOpened] = useState(false);

	const dispatch = useDispatch<AppDispatch>();
	const {
		navigation,
		status } = useSelector((state: IRootState) => state.headerState);


	useEffect(() => {
		if (status !== 'succeeded') {
			dispatch(fetchHeader());
		}

	}, [dispatch, status]);

	useEffect(() => {
		dispatch(togglePopup(isMenuOpened));
	}, [isMenuOpened, dispatch])

	return (
		<NavigationWrapper className={`${isMenuOpened ? 'opened-menu' : ''}`}>
			<Container className="navigation-inner">
				{
					navigation &&
					navigation.map((item) => {
						const isActive = pathName === item.href ? 'active' : '';

						return (
							<Link onClick={() => SetIsMenuOpened(false)} className={`menu-item ${isActive}`} key={item.label} href={item.href}>
								{item.label}
							</Link>
						)
					})
				}
			</Container>
			<button
				onClick={() => {
					SetIsMenuOpened(!isMenuOpened)
				}}
				className={`mobile-burger-menu`}>
				<svg className='burger' width="34" height="35" viewBox="0 0 34 35" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path fillRule="evenodd" clipRule="evenodd" d="M4.25 10.0625C4.25 9.4757 4.7257 9 5.3125 9H28.6875C29.2743 9 29.75 9.4757 29.75 10.0625C29.75 10.6493 29.2743 11.125 28.6875 11.125H5.3125C4.7257 11.125 4.25 10.6493 4.25 10.0625ZM4.25 17.5C4.25 16.9132 4.7257 16.4375 5.3125 16.4375H28.6875C29.2743 16.4375 29.75 16.9132 29.75 17.5C29.75 18.0868 29.2743 18.5625 28.6875 18.5625H5.3125C4.7257 18.5625 4.25 18.0868 4.25 17.5ZM15.9375 24.9375C15.9375 24.3507 16.4132 23.875 17 23.875H28.6875C29.2743 23.875 29.75 24.3507 29.75 24.9375C29.75 25.5243 29.2743 26 28.6875 26H17C16.4132 26 15.9375 25.5243 15.9375 24.9375Z" fill="white" />
				</svg>
				<svg className='close' xmlns="http://www.w3.org/2000/svg" fill="white" height="35px" width="35px" version="1.1" id="Layer_1" viewBox="0 0 512 512">
					<polygon points="512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512     512,452.922 315.076,256   " />
				</svg>
			</button>
		</NavigationWrapper>
	);
};

export default Navigation;
