import styled from '@emotion/styled';
import React, { useState } from 'react';
import Container from '../Container/Container';
import Like from '@/images/svg-icons/Like';
import ChartIcon from '@/images/svg-icons/ChartIcon';
import MessageIcon from '@/images/svg-icons/MessageIcon';
import { BtnWithArrow } from '../UI/Buttons';
import { IFilteMemberItem, IMember, IMembersDataAPI } from '@/interfaces';
import MemberNoPhotoIcon from '@/images/svg-icons/MemberNoPhotoIcon';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { formatNumber } from '@/Helpers/single-func';
import { fetchMembers } from '@/store/membersStateSlice';
import { useFetchData } from '@/Helpers/custom-hooks';


const FilterStyledWrapper = styled.section`
	.filter-buttons-slider {
		padding: 50px 0;
		border-top: 1px solid ${props => props.theme.colors.borderColor};
		border-bottom: 1px solid ${props => props.theme.colors.borderColor};

		.swiper {
			.swiper-slide {
				height: auto;
			}
		}

		.filter-item {
			text-align: center;
			display: flex;
			border: 1px solid ${props => props.theme.colors.borderColor};
			font-family: ${props => props.theme.fonts.main};
			font-size: 18px;
			line-height: 1.5;
			letter-spacing: -0.54px;
			color: ${props => props.theme.colors.dark4};
			padding: 30px 24px;
			border-radius: 8px;
			background-color: transparent;
			display: flex;
			align-items: center;
			justify-content: center;

			@media screen and (max-width: 1470px) {
				padding: 18px 16px;
				font-size: 14px;
			}

			&:hover,
			&.active {
				background-color: ${props => props.theme.colors.dark};
			}
		}
	}

	.filter-items-container {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}
`;

const Filter = () => {

	const { members } = useFetchData<IMembersDataAPI>({
		reducer: 'membersList',
		fetchAction: fetchMembers
	});

	const [activeFilterItem, setActiveFilterItem] = useState('All');

	const filetrItems = [...new Set(members?.map((user) => user.position) ?? [])];
	filetrItems.unshift('All');

	const filetredMembers = members?.filter(member => activeFilterItem === 'All' || member.position === activeFilterItem)
	return (
		<FilterStyledWrapper>
			<div className="filter-buttons-slider">
				<Container>
					{filetrItems.length > 0 && (
						<Swiper
							slidesPerView={2.2}
							spaceBetween={14}
							breakpoints={{
								768: { slidesPerView: 3.5, spaceBetween: 14 },
								1470: { slidesPerView: 6.5, spaceBetween: 20 },
							}}
							>
							{filetrItems.map((filterItem) => (
								<SwiperSlide
									key={filterItem}
									data-value={filterItem}
									className={`filter-item ${filterItem === activeFilterItem ? 'active' : ''}`}
									onClick={() => setActiveFilterItem(filterItem)}
								>
									{filterItem}
								</SwiperSlide>
							))}
						</Swiper>
					)}
				</Container>
			</div>
			<div className="filter-items-container">
				<Pagination members={filetredMembers} />
			</div>
		</FilterStyledWrapper>
	);
};

const FilterItemStyledWrapper = styled.div`
	padding: 80px 0;
	display: flex;
	justify-content: center;

	@media screen and (max-width: 1024px) {
		padding: 60px 0;
	}

	@media screen and (max-width: 768px) {
		padding: 40px 0;
	}

	.filter-member-container {
		display: grid;
		grid-template-columns: 434px 1fr;

		@media screen and (max-width: 1024px) {
			grid-template-columns: 1fr;
		}
	}

	.btn-with-arrow {
		@media screen and (max-width: 1024px) {
			display: none;
		}

		&.mob {
			display: none;
			margin-left: auto;

			@media screen and (max-width: 1024px) {
				display: flex;
			}
		}
	}

	&:not(:last-child) {
		border-bottom: 1px solid ${props => props.theme.colors.borderColor};
	}

	.filter-member-left {
		padding-right: 50px;

		@media screen and (max-width: 1024px) {
			padding-right: 0;
		}
	}

	.member-photo-wrapper {
		display: flex;
		gap: 16px;

		@media screen and (max-width: 1024px) {
			margin-bottom: 30px;
		}

		.member-photo {
			width: 80px;
			height: 80px;
			border-radius: 50%;

			@media screen and (max-width: 1024px) {
				width: 60px;
				height: 60px;
			}
		}

		.member-photo-inner {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;
		}

		.member-fullname {
			flex-grow: 0;
			font-family: ${props => props.theme.fonts.main};
			font-size: 20px;
			font-weight: 600;
			line-height: 1.5;
			letter-spacing: -0.6px;
			color: ${props => props.theme.colors.white};

			@media screen and (max-width: 768px) {
				font-size: 18px;
			}
		}

		.member-position {
			font-family: ${props => props.theme.fonts.main};
			font-size: 18px;
			line-height: 1.5;
			letter-spacing: -0.54px;
			text-align: left;
			color: ${props => props.theme.colors.dark4};

			@media screen and (max-width: 768px) {
				font-size: 14px;
			}
		}
	}

	.filter-member-right {}

	.filter-member-info-container {
		margin-bottom: 30px;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;

		@media screen and (max-width: 1024px) {
			font-size: 24px;
		}

		@media screen and (max-width: 768px) {
			font-size: 20px;
		}
	}

	.member-last-update {
		font-size: 20px;
		font-weight: 600;
		line-height: 1.5;
		letter-spacing: -0.6px;
		text-align: left;
		color: ${props => props.theme.colors.dark4};
		margin-bottom: 30px;

		@media screen and (max-width: 1024px) {
			font-size: 18px;
			margin-bottom: 24px;
		}

		@media screen and (max-width: 768px) {
			font-size: 16px;
			margin-bottom: 20px;
		}
	}

	.member-title {
		font-size: 26px;
		font-weight: 600;
		line-height: 1.5;
		letter-spacing: -0.78px;
		text-align: left;
		color: ${props => props.theme.colors.white};
		margin-bottom: 10px;

		@media screen and (max-width: 1024px) {
			font-size: 22px;
		}

		@media screen and (max-width: 768px) {
			font-size: 18px;
		}
	}

	.member-short-description {
		letter-spacing: -0.54px;
	}

	.statistic-wrapper {
		display: flex;
		gap: 10px;
	}

	.statistic-item {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 4px;
		padding: 8px 16px;
		border-radius: 100px;
		border: solid 1px ${props => props.theme.colors.borderColor};
		background-color: ${props => props.theme.colors.dark};
		font-family: ${props => props.theme.fonts.second};
	}
`;


const FilteMemberItem = ({ member }: IFilteMemberItem) => {
	const { fullName,
		position,
		photo,
		title,
		shortDescription,
		likesCount,
		commentsCount,
		messagesCount, } = member;


	return (
		<FilterItemStyledWrapper className="filter-member">
			<Container className='filter-member-container'>
				<div className="filter-member-left">
					<div className="member-photo-wrapper">
					{photo !== '' ? photo : <MemberNoPhotoIcon additionalClass="member-photo" /> }

						<div className="member-photo-inner">
							<p className="member-fullname">{fullName}</p>
							<p className="member-position">{position}</p>
						</div>

						<BtnWithArrow className='mob' text='View Blog' isHyperlink={true} hrefLink={'/'} />
					</div>
				</div>
				<div className="filter-member-right">
					<div className="filter-member-info-container">
						<div className="member-info-inner">
							<p className="member-last-update">November 5, 2023</p>
							<p className="member-title">{title}</p>
							<p className="member-short-description">{shortDescription}</p>
						</div>

						<BtnWithArrow text='View Blog' isHyperlink={true} hrefLink={'/'} />
					</div>
					<div className="statistic-wrapper">
						<div className="statistic-item">
							<Like />
							<span>{formatNumber(likesCount)}</span>
						</div>
						<div className="statistic-item">
							<ChartIcon />
							<span>{formatNumber(commentsCount)}</span>
						</div>
						<div className="statistic-item">
							<MessageIcon />
							<span>{formatNumber(messagesCount)}</span>
						</div>
					</div>
				</div>
			</Container>
		</FilterItemStyledWrapper>
	)
}

const PaginationWrapper = styled.div`
	display: inline-flex;
	margin: 0 auto;
	gap: 20px;
	justify-content: center;
	align-items: center;
	padding: 20px;

	.next-btn,
	.prev-btn {
		font-style: 18px;
		padding: 10px 20px;
		border-radius: 20px;

		&:hover {
			background-color: ${props => props.theme.colors.yellow};
			color: ${props => props.theme.colors.black};
		}

		&:disabled {
			pointer-events: none;
		}
	}

	.pages-conuter {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		.current-page {
			color: ${props => props.theme.colors.yellow};
		}
	}
`;


const Pagination = ({ members = [] }: { members: IMember[] }) => {

	const [currentPage, setCurrentPage] = useState(1);

	const itemsPerPage = 3;
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = members.slice(indexOfFirstItem, indexOfLastItem);

	const nextPage = () => {
		if (currentPage < Math.ceil(members.length / itemsPerPage)) {
			setCurrentPage(currentPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	return (
		<>
			{
				currentItems &&
				currentItems.map((member: IMember) => <FilteMemberItem key={member.id} member={member} />)
			}
			<PaginationWrapper>
				<button className='next-btn' onClick={prevPage} disabled={currentPage === 1}>
					Back
				</button>

				<span className='pages-conuter' >
					<span>Page</span>
					<span className='current-page'>{currentPage}</span>
					<span>of</span>
					<span>{Math.ceil(members.length / itemsPerPage)}</span>
				</span>

				<button className='prev-btn' onClick={nextPage} disabled={currentPage === Math.ceil(members.length / itemsPerPage)}>
					Next
				</button>
			</PaginationWrapper>
		</>
	)
}

export default Filter;
