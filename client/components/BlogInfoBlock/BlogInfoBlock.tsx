import styled from '@emotion/styled';
import React from 'react';
import Container from '../Container/Container';
import Typography from '../Typography/Typography';
import { BlogInfoBlockParams, IBlockInfoBlockAPI, IBlogInfoData } from '@/interfaces';
import { fetchBlogInfoBlock } from '@/store/blogInfoBlockSlice';
import { useFetchData } from '@/Helpers/custom-hooks';
import { SVG_COMPONENTS } from '@/Helpers/single-func';

const BlogInfoBlockWrapper = styled.section`
	border-top: solid 1px ${props => props.theme.colors.borderColor};

	.blog-block-container {
		display: grid;
		grid-template-columns: 600px 1fr;

		@media screen and (max-width: 1200px) {
			grid-template-columns: 1fr;
		}
	}

	.info-block {
		padding: 155px 0;

		@media screen and (max-width: 1370px) {
			padding: 122px 0;
		}

		@media screen and (max-width: 1200px) {
			padding: 50px 0;
		}

		.title {
			margin-bottom: 16px;

			@media screen and (max-width: 1200px) {
				margin-bottom: 6px;
			}
		}

		.circle-quarter-svg {
			margin-bottom: 50px;

			@media screen and (max-width: 1200px) {
				margin-bottom: 20px;
			}

			@media screen and (max-width: 470px) {
				width: 50px;
				height: 50px;
			}
		}
	}

	.info-block-inner {
		max-width: 520px;
	}

	.columns-blocks {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 30px;
		padding: 80px 0 80px 80px;
		border-left: solid 1px ${props => props.theme.colors.borderColor};

		@media screen and (max-width: 1370px) {
			border-left: none;
			border-top: solid 1px ${props => props.theme.colors.borderColor};
			grid-template-columns: 1fr;
			gap: 20px;
			padding: 60px 0 60px 60px;
		}

		@media screen and (max-width: 1200px) {
			grid-template-columns: 1fr 1fr;
			padding: 60px;
		}

		@media screen and (max-width: 768px) {
			padding: 30px 16px;
			gap: 10px;
			grid-template-columns: 1fr;
		}
	}

	.columns-block {
		padding: 40px;
		border-radius: 12px;
		border: solid 1px ${props => props.theme.colors.borderColor};
		background-color: ${props => props.theme.colors.dark};

		@media screen and (max-width: 1200px) {
			padding: 24px;
		}
	}

	.columns-block-title {
		font-family: ${props => props.theme.fonts.main};
		font-size: 24px;
		font-weight: 500;
		line-height: 1.5;
		letter-spacing: -0.72px;
		margin-bottom: 20px;
		color: ${props => props.theme.colors.white};

		@media screen and (max-width: 1024px){
			font-size: 20px;
		}

		@media screen and (max-width: 768px){
			font-size: 18px;
		}
	}
`

const BlogInfoBlock = ({ blockDataName = null }: BlogInfoBlockParams) => {
	const { blogInfoBlocksData } = useFetchData<IBlockInfoBlockAPI>({
		reducer: 'blogInfoBlockState',
		fetchAction: fetchBlogInfoBlock
	});

	const singleBlogInfo: IBlogInfoData | null = blockDataName ? blogInfoBlocksData?.[blockDataName] : null;

	if (!singleBlogInfo) return null;

	const SvgComponent = singleBlogInfo.svg ? SVG_COMPONENTS[singleBlogInfo.svg] : null;

	return (
		<BlogInfoBlockWrapper>
			<Container className='blog-block-container'>
				<div className="info-block">
					<div className="info-block-inner">
						{SvgComponent && <SvgComponent />}
						<Typography className='title' type='h3'>
							{singleBlogInfo && singleBlogInfo.title}
						</Typography>
						<Typography className='description' type='p'>
							{singleBlogInfo && singleBlogInfo.description}
						</Typography>
					</div>
				</div>
				<div className="columns-blocks">
					{
						singleBlogInfo?.columns &&
						singleBlogInfo.columns.map(({ columnTitle, columnText }) => (
							<div key={columnTitle} className="columns-block">
								<p className="columns-block-title">
									{columnTitle}
								</p>
								<p className="columns-block-text">
									{columnText}
								</p>
							</div>
						))
					}
				</div>
			</Container>
		</BlogInfoBlockWrapper>
	);
};

export default BlogInfoBlock;
