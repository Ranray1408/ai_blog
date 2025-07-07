import { IMember, IMembersDataAPI } from '@/interfaces';
import React from 'react';
import MemberNoPhotoIcon from '@/images/svg-icons/MemberNoPhotoIcon';
import { fetchMembers } from '@/store/membersStateSlice';
import { useFetchData } from '@/Helpers/custom-hooks';

const MembersContainer = () => {

	const { members } = useFetchData<IMembersDataAPI>({
		reducer: 'membersList',
		fetchAction: fetchMembers
	});

	const slicedArray = Array.isArray(members) ? members.slice(0, 4) : [];

	return (
		<div className='member-container'>
				{
					slicedArray &&
					slicedArray.map((member: IMember) => (
						<div key={member.id} className="member-photo-container">
							{member.photo !== '' ? member.photo : <MemberNoPhotoIcon /> }
						</div>
					))
				}
			</div>
	);
};

export default MembersContainer;
