import styled from '@emotion/styled';
import React from 'react';
import Container from '../Container/Container';
import Link from 'next/link';
import { BtnWithArrow } from '../UI/Buttons';
import { IFooterDataAPI } from '@/interfaces';
import { useFetchData } from '@/Helpers/custom-hooks';
import { fetchFooter } from '@/store/footerSlice';
import { SVG_COMPONENTS } from '@/Helpers/single-func';

const FooterWrapper = styled.footer`
	.footer-menu-container {
		padding-top: 80px;
		padding-bottom: 80px;

		@media screen and (max-width: 1200px) {
			padding-top: 60px;
			padding-bottom: 60px;
		}

		@media screen and (max-width: 768px) {
			padding-top: 40px;
			padding-bottom: 40px;
		}
	}

	.footer-menu-container {
		display: grid;
		grid-template-columns: repeat(5, 1fr);

		@media screen and (max-width: 1200px) {
			gap: 40px;
			grid-template-columns: repeat(3, 1fr);
		}

		@media screen and (max-width: 768px) {
			gap: 20px;
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.menu-column {
		display: flex;
		flex-direction: column;
		align-items: flex-start;

		&:last-child {
			@media screen and (max-width: 991px) {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				grid-column: span 2;
				gap: 12px;
			}

			.menu-column-name {
				@media screen and (max-width: 991px) {
					width: 100%;
				}
			}

			.menu-item {
				@media screen and (max-width: 768px) {
					margin-bottom: 0;
				}
			}
		}
	}

	.menu-column-name {
		margin-bottom: 36px;
		font-size: 20px;
		font-weight: 500;
		line-height: 1.3;
		letter-spacing: -0.6px;
		color: ${props => props.theme.colors.white};

		@media screen and (max-width: 768px) {
			font-size: 16px;
			margin-bottom: 16px;
		}
	}

	.menu-item:not(.btn-with-arrow) {
		position: relative;
		margin-bottom: 16px;
		line-height: 1.3;
		letter-spacing: -0.54px;
		color: ${props => props.theme.colors.dark2};

		@media screen and (max-width: 768px) {
			margin-bottom: 10px;
		}

		&:last-child {
			margin-bottom: 0;
		}

		&:hover {
			color: ${props => props.theme.colors.yellow};
		}

		.new-item {
			width: 58px;
			height: 32px;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			right: -70px;
			flex-grow: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 4px 12px;
			border-radius: 6px;
			background: linear-gradient(to right, #262626 61%, #ffd119 216%);

			@media screen and (max-width: 768px) {
				font-size: 12px;
				padding: 2px 10px;
				width: 46px;
				height: 22px;
				border-radius: 4px;
				right: -55px;
			}

			span {
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				content: '';
				display: flex;
				justify-content: center;
				border-radius: inherit;
				align-items: center;
				position: absolute;
				width: calc(100% - 1px);
				height: calc(100% - 1px);
				z-index: -1;
				background: ${props => props.theme.colors.black};
			}
		}
	}

	.footer-bottom-container {
		border-top: 1px solid ${props => props.theme.colors.borderColor};
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 40px;
		padding-bottom: 40px;

		@media screen and (max-width: 768px) {
			padding-top: 24px;
			padding-bottom: 24px;
			flex-direction: column;
			gap: 20px;
		}

	}

	.footer-privacy {
		display: flex;

		@media screen and (max-width: 768px) {
			order: 2;
		}

		.menu-item {
			font-size: 18px;
			margin-bottom: 0;
			padding: 0 10px;
			border-right: 1px solid ${props => props.theme.colors.borderColor};

			@media screen and (max-width: 768px) {
				font-size: 16px;
			}

			@media screen and (max-width: 670px) {
				font-size: 14px;
			}

			&:last-child {
				border-right: none;
			}
		}

	}

	.footer-socials {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 20px;

		@media screen and (max-width: 768px) {
			order: 1;
		}

		a {
			display: flex;
			justify-content: center;
			align-items: center;

			&:hover {
				transform: scale(1.1, 1.1);
			}
		}
	}

	.footer-ps {
		font-weight: normal;
		font-stretch: normal;
		font-style: normal;
		line-height: 1.3;
		letter-spacing: -0.54px;
		color: ${props => props.theme.colors.dark2};

		@media screen and (max-width: 768px) {
			order: 3;
		}
	}

	.btn-with-arrow {
		margin-right: auto;
		margin-bottom: 16px;

		&:last-child {
			margin-bottom: 0;
		}
	}
`;

const Footer = () => {

	const { footerMenus, footerBottomInfo } = useFetchData<IFooterDataAPI>({
		reducer: 'footerState',
		fetchAction: fetchFooter
	});


	return (
		<FooterWrapper>
			<Container className='footer-container'>
				<div className="footer-menu-container">
					{
						footerMenus &&
						footerMenus.map((menu) => (
							<div key={menu.menuName} className="menu-column">
								<p className="menu-column-name">{menu.menuName}</p>

								{
									menu.menuItems &&
									menu.menuItems.map((item, itemIndex) => {
										const uniqueKey = `${item.itemName}-${itemIndex}`;

										if (menu.menuName === 'Resources') {
											return (
												<BtnWithArrow
													key={uniqueKey}
													className='menu-item'
													hrefLink={item.itemUrl}
													isHyperlink={true}
													text={item.itemName}
												/>
											)
										} else {
											return (
												<Link
													key={uniqueKey}
													className='menu-item'
													href={item.itemUrl}>
													{item.isNew &&
														<span className='new-item'>
															<span>New</span>
														</span>}
													{item.itemName}
												</Link>
											)
										}
									})
								}
							</div>
						))
					}
				</div>
				<div className="footer-bottom-container">
					<div className="footer-privacy">
						{
							footerBottomInfo?.policy &&
							footerBottomInfo.policy.map((item) => (
								<Link key={item.itemName} className='menu-item' href={item.itemUrl}>
									{item.itemName}
								</Link>
							))
						}
					</div>
					<div className="footer-socials">
						{
							footerBottomInfo?.socials &&
							footerBottomInfo.socials.map(({ socialIcon, socialId, socialUrl }) => {
								const IconComponent = SVG_COMPONENTS[socialIcon];
								return (
									<Link key={socialId} href={socialUrl}>
										{IconComponent ? <IconComponent /> : null}
									</Link>
								)
							}
							)
						}
					</div>
					{
						footerBottomInfo?.ps &&
						<p className="footer-ps">{footerBottomInfo.ps}</p>
					}
				</div>
			</Container>
		</FooterWrapper>
	);
};

export default Footer;
