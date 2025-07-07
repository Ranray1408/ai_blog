import styled from '@emotion/styled';
import React from 'react';
import Container from '../Container/Container';
import { ArrowBtn } from '../UI/Buttons';
import { ILinkBlocksData } from '@/interfaces';
import { fetchLinkBlocks } from '@/store/linkBlocksSlice';
import { useFetchData } from '@/Helpers/custom-hooks';

const LinkBlocksWrapper = styled.section`
	border-bottom: 1px solid ${props => props.theme.colors.borderColor};

	.wrapper-inner {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;

		@media screen and (max-width: 1024px) {
			grid-template-columns: 1fr;
		}

		.link-block:first-child {
			padding: 50px 80px 50px 0;

			@media screen and (max-width: 1370px){
				padding: 30px 40px 30px 0;
			}

			@media screen and (max-width: 1024px) {
				padding: 30px 0;
			}
		}
		.link-block:last-child {
			padding: 50px 0 50px 80px;

			@media screen and (max-width: 1370px){
				padding: 30px 40px 30px;
			}

			@media screen and (max-width: 1024px) {
				padding: 30px 0;
			}
		}
	}

	.link-block {
		padding: 50px 80px 50px;

		@media screen and (max-width: 1370px){
			padding: 30px 40px 30px;
		}

		@media screen and (max-width: 1024px){
			padding: 30px 0;
		}

		&:not(:last-child) {
			border-right: 1px solid ${props => props.theme.colors.borderColor};

			@media screen and (max-width: 1024px) {
				border-right: none;
				border-bottom: 1px solid ${props => props.theme.colors.borderColor};
			}
		}
	}

	.link-block-svg {
		margin-bottom: 30px;
		width: 50px;
		height: 50px;

		svg {
			width: 100%;
			height: 100%;
		}

		@media screen and (max-width: 1200px) {
			width: 40px;
			height: 40px;
		}

		@media screen and (max-width: 470px) {
			margin-bottom: 20px;
			width: 30px;
			height: 30px;
		}
	}

	.link-block-titles-wrapper {
		display: flex;
		justify-content: space-between;
	}

	.link-block-title {
		font-size: 20px;
		color: ${props => props.theme.colors.white};
		margin-bottom: 8px;

		@media screen and (max-width: 1200px) {
			font-size: 18px;
		}

		@media screen and (max-width: 1024px) {
			font-size: 16px;
			margin-bottom: 2px;
		}
	}

	.link-block-suptitle {
		font-size: 18px;
		color: ${props => props.theme.colors.dark3};
		margin-bottom: 30px;

		@media screen and (max-width: 1200px) {
			font-size: 16px;
		}

		@media screen and (max-width: 1024px) {
			font-size: 14px;
			margin-bottom: 20px;
		}
	}

	.link-block-text {
		font-size: 20px;
		color: ${props => props.theme.colors.dark3};
		letter-spacing: -0.6px;

		@media screen and (max-width: 1200px) {
			font-size: 16px;
		}
	}
`;

const LinkBlocks = () => {

	const { linkBlocks } = useFetchData<ILinkBlocksData>({
		reducer: 'linkBlocksState',
		fetchAction: fetchLinkBlocks
	});

	return (
		<LinkBlocksWrapper>
			<Container>
				<div className="wrapper-inner">
					{
						linkBlocks &&
						linkBlocks.map((block) => (
							<div key={block.title} className="link-block">
								<div
									className="link-block-svg"
									dangerouslySetInnerHTML={{ __html: block.svg }}
								/>

								<div className="link-block-titles-wrapper">
									<div className="link-block-titles">
										<p className="link-block-title">{block.title}</p>
										<p className="link-block-suptitle">{block.suptitle}</p>
									</div>

									<ArrowBtn />
								</div>

								<p className="link-block-text">{block.text}</p>

							</div>
						))
					}
				</div>
			</Container>
		</LinkBlocksWrapper>
	);
};

export default LinkBlocks;
