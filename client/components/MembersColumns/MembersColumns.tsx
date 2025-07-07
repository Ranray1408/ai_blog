import React from 'react';
import styled from '@emotion/styled';
import Container from '../Container/Container';
import { IMember, IMembersDataAPI } from '@/interfaces';
import MemberNoPhotoIcon from '@/images/svg-icons/MemberNoPhotoIcon';
import { useFetchData } from '@/Helpers/custom-hooks';
import { fetchMembers } from '@/store/membersStateSlice';


const MembersColumnsWrapper = styled.section`
	.member-container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);

		@media screen and (max-width: 1200px) {
			grid-template-columns: repeat(2, 1fr);
		}

		@media screen and (max-width: 991px) {
			grid-template-columns: repeat(1, 1fr);
		}
	}

	.member-block {
		border-right: 1px solid ${props => props.theme.colors.borderColor};
		border-bottom: 1px solid ${props => props.theme.colors.borderColor};
		padding: 80px 50px;

		@media screen and (min-width: 1200px) {
			padding: 60px 40px;

			&:last-child ,
			&:nth-child(3n) {
				padding-right: 0;
				border-right: none;
			}

			&:nth-child(3n + 1),
			&:first-child {
				padding-left: 0;
			}
		}

		@media screen and (min-width: 991px) and (max-width: 1199px) {
			&:nth-child(2n) {
				padding-right: 0;
				border-right: none;
			}

			&:nth-child(2n + 1),
			&:first-child {
				padding-left: 0;
			}
		}

		@media screen and (max-width: 991px) {
			padding: 80px 50px 80px 50px;
			border-right: none;
		}

		@media screen and (max-width: 768px) {
			padding: 40px 0;
		}
	}

	.member-top-wrapper {
		display: flex;
		justify-content: center;
		gap: 12px;
		align-items: center;
		margin-bottom: 60px;

		@media screen and (max-width: 1200px) {
			margin-bottom: 50px;
		}
	}

	.member-photo {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		overflow: hidden;

		.businessman-svg {
			width: 100%;
			height: 100%;
		}
	}

	.member-name {
		font-family: ${props => props.theme.fonts.main};
		font-size: 20px;
		font-weight: 500;
		line-height: 1.5;
		color: #fff;
	}

	.member-location {
		font-family: ${props => props.theme.fonts.main};
		font-size: 18px;
		line-height: 1.5;
		color: ${props => props.theme.colors.dark2};
	}

	.member-text {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: flex-start;
		gap: 10px;
		padding: 50px 30px 30px;
		border-radius: 12px;
		border: solid 1px ${props => props.theme.colors.borderColor};
		background-color: ${props => props.theme.colors.dark};

		@media screen and (max-width: 1200px) {
			padding: 40px 24px 24px;
		}

		@media screen and (max-width: 768px) {
			padding: 30px 20px 20px;
		}

		p {
			color: ${props => props.theme.colors.white};
			text-align: center;
			line-height: 1.5;
		}

		.star-rating-container {
			position: absolute;
			top: 0;
			left: 50%;
			transform: translate(-50%, -50%);
			display: flex;
			justify-content: flex-start;
			align-items: flex-start;
			gap: 7px;
			padding: 10px 16px;
			border-radius: 100px;
			border: solid 1px ${props => props.theme.colors.borderColor};
			background-color: ${props => props.theme.colors.black};

			@media screen and (max-width: 1200px) {
				padding: 8px 12px;
			}
		}
	}
`;

const StarRating = ({ rateCount = 0 }) => {

	const validRateCount = Math.max(1, Math.min(rateCount, 5));

	const star = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M7.94128 1.9429C8.71397 0.62493 10.6193 0.624932 11.392 1.9429L13.1178 4.88664C13.3998 5.36761 13.8697 5.70904 14.4143 5.8286L17.7473 6.5603C19.2395 6.8879 19.8283 8.69996 18.8136 9.8421L16.5472 12.3931C16.177 12.8099 15.9975 13.3624 16.052 13.9173L16.3861 17.3132C16.5357 18.8337 14.9942 19.9536 13.5944 19.3415L10.4679 17.9744C9.95707 17.751 9.37618 17.751 8.86535 17.9744L5.73883 19.3415C4.33903 19.9536 2.7976 18.8337 2.94716 17.3132L3.28122 13.9173C3.3358 13.3624 3.15629 12.8099 2.786 12.3931L0.519648 9.8421C-0.495038 8.69995 0.0937374 6.8879 1.58597 6.5603L4.91895 5.8286C5.46352 5.70904 5.93346 5.36761 6.21544 4.88664L7.94128 1.9429Z" fill="#FFCE22"/>
	</svg>`;

	const starsArray = Array.from({ length: validRateCount }, (_, index) => (
		<span key={index} dangerouslySetInnerHTML={{ __html: star }} />
	));

	return (
		<div className='star-rating-container'>
			{starsArray}
		</div>
	)
}

const MembersColumns = () => {
	const { members } = useFetchData<IMembersDataAPI>({
		reducer: 'membersList',
		fetchAction: fetchMembers
	});
	const slicedArray = members?.slice(0, 6) ?? [];

	return (
		<MembersColumnsWrapper>
			<Container className='member-container'>
				{
					slicedArray &&
					slicedArray.map((member: IMember) =>
						<div key={member.id} className="member-block">
							<div className="member-top-wrapper">
								<div className="member-photo">
									{member.photo !== '' ? member.photo : <MemberNoPhotoIcon />}
								</div>
								<div className="member-inner">
									<div className="member-name">{member.fullName}</div>
									<div className="member-location">{member.position}</div>
								</div>
							</div>

							<div className="member-text">
								<StarRating rateCount={5} />
								<p>{member.shortDescription}</p>
							</div>
						</div>
					)
				}
			</Container>
		</MembersColumnsWrapper>
	);
};

export default MembersColumns;
