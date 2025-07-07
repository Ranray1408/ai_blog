import styled from '@emotion/styled';
import React from 'react';
import Container from '../Container/Container';
import Typography from '../Typography/Typography';
import Sunburst from '@/images/svg-icons/Sunburst';
import { ArrowBtn } from '../UI/Buttons';
import { ITitleLinksBlockAPI } from '@/interfaces';
import { useFetchData } from '@/Helpers/custom-hooks';
import { fetchTitleLinksBlock } from '@/store/titleLinksBlockSlice';

const TitleLinksBlockWrapper = styled.section`
	padding: 120px 0;
	background-color: ${props => props.theme.colors.dark};

	@media screen and (max-width: 1200px) {
		padding: 80px 0;
	}

	@media screen and (max-width: 991px) {
		padding: 40px 0;
	}

	.top-info-block-icon-wrapper {
		@media screen and (max-width: 991px) {
			display: flex;
			align-items: center;
			gap: 20px;
		}

		.sunburst {

			@media screen and (max-width: 1200px) {
				width: 120px;
				height: 120px;
			}

			@media screen and (max-width: 991px) {
				width: 60px;
				height: 60px;
			}
		}
	}

	.top-info-block {
		display: flex;
		gap: 80px;
		margin-bottom: 100px;

		@media screen and (max-width: 1200px) {
			margin-bottom: 50px;
			gap: 40px;
		}

		@media screen and (max-width: 991px) {
			margin-bottom: 40px;
			gap: 20px;
			flex-direction: column;
		}
	}

	.top-info-block-title {
		margin-bottom: 30px;

		@media screen and (max-width: 1200px) {
			margin-bottom: 20px;
		}

		@media screen and (max-width: 991px) {
			margin-bottom: 4px;
		}
	}

	.gray-text {
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
		margin-bottom: 22px;

		@media screen and (max-width: 1200px) {
			font-size: 16px;
			margin-bottom: 16px;
		}

		@media screen and (max-width: 991px) {
			margin-bottom: 10px;
			font-size: 14px;
			display: none;
		}

		&.mob {
			display: none;

			@media screen and (max-width: 991px) {
				display: flex;
			}
		}
	}

	.links-blocks-wrapper {
		display: grid;
		padding: 20px;
		gap: 20px;
		background-color: ${props => props.theme.colors.black};
		grid-template-columns: repeat(3, 1fr);
		border-radius: 12px;

		@media screen and (max-width: 1200px) {
			padding: 10px;
			gap: 10px;
			border-radius: 10px;
			grid-template-columns: repeat(2, 1fr);
		}

		@media screen and (max-width: 991px) {
			margin-bottom: 4px;
			grid-template-columns: repeat(1, 1fr);
		}
	}

	.link-block {
		padding: 40px;
		background-color: ${props => props.theme.colors.dark};
		border-radius: inherit;
		border: solid 1px ${props => props.theme.colors.borderColor};

		@media screen and (max-width: 1200px) {
			padding: 30px;
		}

		@media screen and (max-width: 768px) {
			padding: 24px;
		}
	}

	.link-block-title {
		font-size: 22px;
		font-weight: 600;
		line-height: 1.5;
		letter-spacing: -0.66px;
		color: ${props => props.theme.colors.white};

		@media screen and (max-width: 1200px) {
			font-size: 18px;
		}

		@media screen and (max-width: 768px) {
			font-size: 16px;
		}
	}

	.link-block-title-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;

		@media screen and (max-width: 768px) {
			margin-bottom: 10px;
		}
	}
`;

const TitleLinksBlock = () => {

	const titleLinksBlock = useFetchData<ITitleLinksBlockAPI>({
		reducer: 'titleLinksBlockState',
		fetchAction: fetchTitleLinksBlock
	});

	if (!titleLinksBlock) return null;

	const { title, grayText, links, text } = titleLinksBlock;

	return (
		<TitleLinksBlockWrapper>
			<Container>
				<div className="top-info-block">
					<div className="top-info-block-icon-wrapper">
						<Sunburst />
						<Typography type='p' className='gray-text mob'>
							{grayText}
						</Typography>
					</div>
					<div className="top-info-block-inner">
						<Typography type='p' className='gray-text'>
							{grayText}
						</Typography>
						<Typography className="top-info-block-title" type='h2'>
							{title}
						</Typography>
						<Typography className="top-info-block-text" type='p'>
							{text}
						</Typography>
					</div>
				</div>
				<div className="links-blocks-wrapper">
					{
						links &&
						links.map((link) =>
						(
							<div key={link.title} className="link-block">
								<div className="link-block-title-wrapper">
									<p className="link-block-title">{link.title}</p>
									<ArrowBtn isHyperlink={true} hrefLink={link.url} />
								</div>
								<p className="link-block-text">{link.text}</p>
							</div>
						))
					}
				</div>
			</Container>
		</TitleLinksBlockWrapper>
	);
};

export default TitleLinksBlock;
