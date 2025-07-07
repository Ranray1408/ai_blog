import styled from '@emotion/styled';
import React from 'react';
import Container from '../Container/Container';
import Typography from '../Typography/Typography';
import { BtnWithArrow, BtnWithIcon } from '../UI/Buttons';
import MembersContainer from '../MembersContainer/MembersContainer';
import Image from 'next/image';
import EyeIcon from '@/images/svg-icons/EyeIcon';
import { useFetchData } from '@/Helpers/custom-hooks';
import { IDownloadBlock, IDownloadBlockParams, IDownloadBlocksAPI } from '@/interfaces';
import { fetchDownloadBlocks } from '@/store/downloadBlocksSlice';
import { SVG_COMPONENTS } from '@/Helpers/single-func';

const DownloadBlockWrapper = styled.section`
	.donwload-block-container {
		display: grid;
		grid-template-columns: 520px 1fr;

		@media screen and (max-width: 1470px) {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
		}
	}

	.left-wrapper {
		padding-top: 80px;
		padding-bottom: 80px;
		padding-right: 80px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		border-right: solid 1px ${props => props.theme.colors.borderColor};

		@media screen and (max-width: 1470px) {
			padding-right: 0;
			padding-bottom: 40px;
			padding-top: 60px;
			padding-bottom: 60px;
			max-width: 1024px;
			margin: 0 auto;
			width: 100%;
			border-bottom: solid 1px ${props => props.theme.colors.borderColor};
			border-left: none;
		}

		@media screen and (max-width: 1200px) {
			padding-right: 30px;
		}

		> svg {
			margin-bottom: 50px;

			@media screen and (max-width: 1470px) {
				width: 60px;
				height: 60px;
				margin-bottom: 30px;
			}

			@media screen and (max-width: 1470px) {
				width: 50px;
				height: 50px;
				margin-bottom: 24px;
			}
		}
	}

	.left-wrapper-title {
		font-weight: 600;
		margin-bottom: 16px;

		@media screen and (max-width: 1200px) {
			margin-bottom: 10px;
		}
	}

	.left-wrapper-text {
		margin-bottom: 50px;

		@media screen and (max-width: 1200px) {
			margin-bottom: 30px;
		}
	}

	.btn-with-arrow {
		width: 100%;
		justify-content: center;
		margin-bottom: 60px;

		@media screen and (max-width: 1470px) {
			width: auto;
			margin-right: auto;
			margin-bottom: 40px;
		}
	}
	.statistic-block {
		width: 433px;
		display: flex;
		align-items: center;
		gap: 50px;
		padding: 30px;
		border-radius: 13px;
		border: solid 1px ${props => props.theme.colors.borderColor};
		background-color: ${props => props.theme.colors.dark};

		@media screen and (max-width: 1200px) {
			padding: 20px;
			gap: 30px;
			width: 328px;
		}
	}

	.statistic-block-inner {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 4px;

		span {
			&:first-child {
				font-size: 18px;
				line-height: 1.5;
				letter-spacing: -0.54px;
				color: ${props => props.theme.colors.dark4};

				@media screen and (max-width: 1200px) {
					font-size: 14px;
				}
			}

			&:last-child {
				font-size: 24px;
				font-weight: 600;
				color: ${props => props.theme.colors.white};

				@media screen and (max-width: 1200px) {
					font-size: 20px;
				}

				@media screen and (max-width: 670px) {
					font-size: 18px;
				}
			}
		}
	}

	.member-container {
		height: 70px;
		flex-grow: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10px 25px 10px 10px;
		border-radius: 12px;
		background-color: ${props => props.theme.colors.black};

		.member-photo-container {
			position: relative;
			margin-right: -15px;
			z-index: 2;
			overflow: hidden;
			width: 50px;
			height: 50px;
			border-radius: 50%;
			border: 2px solid ${props => props.theme.colors.dark2};

			@media ${props => props.theme.adaptiveMedia.mobile} {
				width: 40px;
				height: 40px;
			}
		}
	}

	.right-wrapper {
		padding-left: 80px;
		padding-top: 80px;
		padding-bottom: 80px;

		@media screen and (max-width: 1470px) {
			padding-left: 0;
			padding-top: 40px;
			max-width: 1024px;
			width: 100%;
			margin: 0 auto;
			padding-top: 60px;
			padding-bottom: 60px;
		}
	}

	.right-top-info {
		display: grid;
		grid-template-columns: 240px 1fr;
		gap: 20px;
		margin-bottom: 30px;

		@media screen and (max-width: 1200px) {
			display: flex;
			flex-direction: column;
			gap: 10px;
		}
	}

	.right-top-info-title {
  		font-weight: 600;
		font-size: 24px;

		@media screen and (max-width: 670px) {
			font-size: 18px;
		}
	}

	.right-top-info-text {
		font-size: 18px;

		@media screen and (max-width: 670px) {
			font-size: 16px;
		}
	}

	.main-image {
		width: 100%;
		border-radius: 12px;
		margin-bottom: 30px;
		max-height: 332px;

		@media screen and (max-width: 1200px) {
			max-height: 275px;
		}

		@media screen and (max-width: 670px) {
			max-height: 200px;
			border-radius: 10px;
			margin-bottom: 24px;
		}
	}

	.right-bottom-info {
		display: grid;
		grid-template-columns: 260px 1fr;
		gap: 30px 20px;

		@media screen and (max-width: 1470px) {
			gap: 24px 16px;
		}

		@media screen and (max-width: 670px) {
			display: flex;
			flex-direction: column;
			gap: 16px;
		}
	}

	.right-bottom-block {
		padding: 30px;
		border-radius: 13px;
		border: solid 1px ${props => props.theme.colors.borderColor};
		background-color: ${props => props.theme.colors.dark};


		&:nth-child(2) {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		&:last-child {
			grid-column: 1 / 3
		}

		p {
			&:first-child {
				font-size: 18px;
				line-height: 1.5;
				letter-spacing: -0.54px;

				@media screen and (max-width: 1200px) {
					font-size: 16px;
				}

				@media screen and (max-width: 670px) {
					font-size: 14px;
				}
			}

			&:last-child {
				font-size: 20px;
				font-weight: 600;
				line-height: 1.5;
				letter-spacing: -0.6px;
				color: #fff;

				@media screen and (max-width: 1200px) {
					font-size: 18px;
				}

				@media screen and (max-width: 670px) {
					font-size: 16px;
				}
			}
		}
	}
`;

const DownloadBlock = ({ blockDataName = null }: IDownloadBlockParams) => {

	const downloadBlocks = useFetchData<IDownloadBlocksAPI>({
		reducer: 'downloadBlocksState',
		fetchAction: fetchDownloadBlocks
	});

	const downloadBlock: IDownloadBlock | null = blockDataName ? (downloadBlocks?.[blockDataName] as IDownloadBlock) : null;

	if (!downloadBlock) return null;

	const {
		title, text, blockStatistic, imageUrl,
		rightTitle, rightDescription, svg,
		buttonText1, buttonText2, innersBlocks } = downloadBlock;

	const SvgComponent = SVG_COMPONENTS[svg] || (() => null);

	return (
		<DownloadBlockWrapper>
			<Container className='donwload-block-container'>
				<div className="left-wrapper">
					<SvgComponent />
					<Typography className='left-wrapper-title' type='h3'>
						{title}
					</Typography>
					<Typography className='left-wrapper-text' type='p'>
						{text}
					</Typography>
					<BtnWithArrow text={buttonText1} />
					<div className="statistic-block">
						<div className="statistic-block-inner">
							{blockStatistic && <span>{blockStatistic.text}</span>}
							{blockStatistic && <span>{blockStatistic.downloadUsersCount}{blockStatistic.text2}</span>}
						</div>
						<MembersContainer />
					</div>
				</div>
				<div className="right-wrapper">
					<div className="right-top-info">
						<Typography className='right-top-info-title' type='h5'>
							{rightTitle}
						</Typography>
						<Typography type='p'>
							{rightDescription}
						</Typography>
					</div>
					{
						imageUrl &&
						<Image className='main-image' src={imageUrl} width={910} height={332} alt={'block image'} />
					}
					<div className="right-bottom-info">
						{
							innersBlocks &&
							innersBlocks.map((block, index) => (
								<div key={block.innerTitle} className="right-bottom-block">
									<Typography type='p'>{block.innerTitle}</Typography>
									<Typography type='p'>{block.innerText}</Typography>
									{
										index === 1 &&
										<BtnWithIcon text={buttonText2} icon={<EyeIcon />} />
									}
								</div>
							))
						}
					</div>
				</div>
			</Container>
		</DownloadBlockWrapper>
	);
};

export default DownloadBlock;
