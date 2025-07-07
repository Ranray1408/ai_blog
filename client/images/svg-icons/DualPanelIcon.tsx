import { ISvgIcons } from '@/interfaces';
import React from 'react';

const DividedTarget = ({ additionalClass = '' }: ISvgIcons) => {
	return (
		<svg className={`dual-panel ${additionalClass}`} xmlns="http://www.w3.org/2000/svg" width="56" height="65" viewBox="0 0 56 65" fill="none" >
			<path d="M28 0.5V64.5L0 48.5V16.5L28 0.5Z" fill="#FFD11A" />
			<path d="M56 0.5V64.5L28 48.5V16.5L56 0.5Z" fill="#404040" />
		</svg>
	);
};

export default DividedTarget;
