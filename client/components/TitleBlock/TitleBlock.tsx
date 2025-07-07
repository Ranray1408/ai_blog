import React from 'react';
import Container from '../Container/Container';
import Typography from '../Typography/Typography';
import styled from '@emotion/styled';
import { BtnWithArrow } from '../UI/Buttons';
import { ITitleBlockProps } from '@/interfaces';
import { fetchTitleBlock } from '@/store/titleBlockSlice';
import { useFetchData } from '@/Helpers/custom-hooks';

const TitleBlockWrapper = styled.section`
	background-color: ${props => props.theme.colors.dark};
	padding: 80px 0;

	@media screen and (max-width: 768px) {
		padding: 40px 0;
	}

	.title-block-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
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
		}

		@media screen and (max-width: 768px) {
			margin-bottom: 10px;
			font-size: 14px;
		}
	}
`;

const TitleBlock = ({ blockDataName = null }: ITitleBlockProps) => {

	const { blocksData } = useFetchData({
		reducer: 'titleBlocksState',
		fetchAction: fetchTitleBlock
	});

	const dataObject = blockDataName ? blocksData?.[blockDataName] : null;

	return (
		<TitleBlockWrapper>
			<Container className='title-block-container'>
				<div className="title-block-inner">
					<Typography className='gray-text' type={'p'}>
						{dataObject && dataObject.uptitle}
					</Typography>
					<Typography type='h2'>
						{dataObject && dataObject.title}
					</Typography>
				</div>
				{
					dataObject && dataObject.linkHref &&
					<BtnWithArrow isHyperlink={true} hrefLink={dataObject.linkHref} text={dataObject.linkText} />
				}
			</Container>
		</TitleBlockWrapper>
	);
};

export default TitleBlock;
