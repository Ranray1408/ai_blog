import React from 'react';
import styled from '@emotion/styled';
import Container from '../Container/Container';
import Typography from '../Typography/Typography';
import AbstractThing from '@/images/svg-icons/AbstractThing';
import { BtnWithArrow } from '../UI/Buttons';
import MembersContainer from '../MembersContainer/MembersContainer';
import { IHeroBannerData } from '@/interfaces';
import { fetchHeroBanner } from '@/store/heroBannerSlice';
import { useFetchData } from '@/Helpers/custom-hooks';

const StyledWrapper = styled.div`
	background-color: ${props => props.theme.colors.block};

	@media screen and (max-width: 1370px) {
		border-bottom: 1px solid ${props => props.theme.colors.borderColor};
	}

	.banner-container {
		display: grid;
		grid-template-columns: 1fr 1fr;

		@media ${props => props.theme.adaptiveMedia.tablet} {
			grid-template-columns: 1fr;
			padding-left: 0;
			padding-right: 0;
			max-width: 100%;
		}
	}

	.title-container {
		border-right: solid 1px ${props => props.theme.colors.borderColor};

		@media ${props => props.theme.adaptiveMedia.tablet} {
			border-right: none;
		}
	}

	.title-inner {
		padding-top: 150px;
		padding-bottom: 100px;
		padding-right: 20px;

		@media ${props => props.theme.adaptiveMedia.desktop} {
			padding-top: 100px;
			padding-right: 16px;
			padding-left: 16px;
		}

		@media ${props => props.theme.adaptiveMedia.tablet} {
			padding-top: 40px;
			padding-bottom: 30px;
		}
	}

	.uptitle {
		font-family: ${props => props.theme.fonts.second};
		font-size: 30px;
		font-weight: 500;
		line-height: 1.2;
		letter-spacing: -0.9px;
		color: ${props => props.theme.colors.dark2};
		margin-bottom: 30px;

		@media ${props => props.theme.adaptiveMedia.desktop} {
			font-size: 22px;
			margin-bottom: 20px;
		}

		@media ${props => props.theme.adaptiveMedia.tablet} {
			font-size: 18px;
			margin-bottom: 14px;
		}
	}

	.title {
		margin-bottom: 20px;

		@media ${props => props.theme.adaptiveMedia.desktop} {
			margin-bottom: 14px;
		}

		@media ${props => props.theme.adaptiveMedia.tablet} {
			margin-bottom: 10px;
		}
	}

	.suptitle {
		font-family: ${props => props.theme.fonts.main};
		color: ${props => props.theme.colors.dark3};
		font-weight: normal;
		font-stretch: normal;
		font-style: normal;
		line-height: 1.5;
		letter-spacing: -0.54px;
		text-align: left;
	}

	.statistics-block {
		border-top: solid 1px ${props => props.theme.colors.borderColor};
		border-bottom: solid 1px ${props => props.theme.colors.borderColor};
		display: flex;

		@media screen and (max-width: 1370px) {
			border-bottom: none;
		}
	}

	.statistics {
		&-item {
			padding: 50px;

			@media ${props => props.theme.adaptiveMedia.desktop} {
				padding: 20px 16px;
				flex: 1;
			}

			&:nth-child(1) {
				padding-left: 0;
				position: relative;

				@media ${props => props.theme.adaptiveMedia.desktop} {
					padding: 20px 16px;
				}

				&:before {
					content: '';
					display: block;
					position: absolute;
					top: -1px;
					left: -100%;
					height: 100%;
					width: 100%;
					border-top: solid 1px ${props => props.theme.colors.borderColor};
					border-bottom: solid 1px ${props => props.theme.colors.borderColor};

					@media ${props => props.theme.adaptiveMedia.desktop} {
						display: none;
					}
				}
			}

			&:nth-child(2) {
				border-left: solid 1px ${props => props.theme.colors.borderColor};
				border-right: solid 1px ${props => props.theme.colors.borderColor};
			}
		}

		&-value {
			color: ${props => props.theme.colors.white};
			font-size: 40px;
			font-weight: 600;
			font-stretch: normal;
			font-style: normal;
			line-height: 1.5;
			margin-bottom: 10px;

			@media ${props => props.theme.adaptiveMedia.tablet} {
				font-size: 30px;
				margin-bottom: 0;
			}

			@media ${props => props.theme.adaptiveMedia.mobile} {
				font-size: 30px;
			}

			span {
				color: ${props => props.theme.colors.yellow};
			}
		}

		&-title {
			color: ${props => props.theme.colors.dark4};
			font-size: 18px;
			font-weight: normal;
			font-stretch: normal;
			font-style: normal;
			line-height: 1.5;
			letter-spacing: -0.54px;

			@media ${props => props.theme.adaptiveMedia.tablet} {
				font-size: 14px;
				letter-spacing: -0.42px;
			}
		}
	}

	.info-container {
		overflow: hidden;
		position: relative;
		padding: 80px;
		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
		border-bottom: solid 1px ${props => props.theme.colors.borderColor};

		@media screen and (max-width: 1370px) {
			border-bottom: none;
		}

		@media ${props => props.theme.adaptiveMedia.tablet} {
			padding: 50px;
		}

		@media ${props => props.theme.adaptiveMedia.mobile} {
			padding: 40px;
		}

		&-bg {
			position: absolute;
			top: 0;
			left: 0;
			opacity: 0.3;

			@media ${props => props.theme.adaptiveMedia.tablet} {
				width: 100%;
    			height: auto;
			}
		}
	}

	.member-container {
		display: inline-flex;
		border: solid 1px #262626;
		background-color: #1a1a1a;
		padding: 10px 25px 10px 10px;
		border-radius: 100px;
		margin-bottom: 30px;
	}

	@media ${props => props.theme.adaptiveMedia.tablet} {
		padding: 8px 23px 8px 8px;
		margin-bottom: 20px;
	}

	.member-photo-container {
		position: relative;
		margin-right: -15px;
		z-index: 2;
		overflow: hidden;
		width: 60px;
		height: 60px;
		border-radius: 50%;
		border: 2px solid ${props => props.theme.colors.dark2};

		@media ${props => props.theme.adaptiveMedia.tablet} {
			width: 50px;
			height: 50px;
		}

		@media ${props => props.theme.adaptiveMedia.mobile} {
			width: 40px;
			height: 40px;
		}
	}

	.info-inner {
		position: relative;
		z-index: 1;

		.btn-with-arrow {
			@media ${props => props.theme.adaptiveMedia.x_small} {
				width: 100%;
				display: flex;
				justify-content: center;
			}
		}
	}

	.info-title {
		margin-bottom: 14px;
		font-size: 24px;
		color: ${props => props.theme.colors.white};
		font-weight: 500;

		@media ${props => props.theme.adaptiveMedia.tablet} {
			font-size: 20px;
			margin-bottom: 6px;
		}

		@media ${props => props.theme.adaptiveMedia.mobile} {
			font-size: 18px;
			margin-bottom: 4px;
		}
	}
	.info-text {
		margin-bottom: 30px;

		@media ${props => props.theme.adaptiveMedia.tablet} {
			margin-bottom: 20px;
		}
	}
`;

const HeroBanner = () => {
	const {
		statistics,
		uptitle,
		title,
		suptitle,
		infoTitle,
		buttonText,
		infotText,
		} = useFetchData<IHeroBannerData>({
			reducer: 'heroBannerState',
			fetchAction: fetchHeroBanner
		})


	return (
		<StyledWrapper>
			<Container className='banner-container'>
				<div className="title-container">
					<div className="title-inner">
						<Typography className={`uptitle`} type='p'>{uptitle}</Typography>
						<Typography className={`title`} type='h1'>{title}</Typography>
						<Typography className={`suptitle`} type='p'>{suptitle}</Typography>
					</div>
					<div className="statistics-block">
						{
							statistics &&
							statistics.map((item) =>
								<div key={item.value} className="statistics-item">
									<Typography className={`statistics-value`} type='p'>
										{item.value}
										<span>+</span>
									</Typography>
									<Typography className={`statistics-title`} type='p'>
										{item.title}
									</Typography>
								</div>
							)
						}
					</div>
				</div>
				<div className="info-container">
					<AbstractThing additionalClass={'info-container-bg'} />

					<div className="info-inner">
						<MembersContainer />
						<Typography type='p' className="info-title">
							{infoTitle}
						</Typography>
						<Typography type='p' className="info-text">
							{infotText}
						</Typography>
						<BtnWithArrow text={buttonText} />
					</div>
				</div>
			</Container>
		</StyledWrapper>
	);
};

export default HeroBanner;
