'use client';
import BlogInfoBlock from '@/components/BlogInfoBlock/BlogInfoBlock';
import DownloadBlock from '@/components/DownloadBlock/DownloadBlock';
import Filter from '@/components/Filter/Filter';
import HeroBanner from '@/components/HeroBanner/HeroBanner';
import LinkBlocks from '@/components/LinkBlocks/LinkBlocks';
import MembersColumns from '@/components/MembersColumns/MembersColumns';
import TitleBlock from '@/components/TitleBlock/TitleBlock';
import TitleLinksBlock from '@/components/TitleLinksBlock/TitleLinksBlock';
import React from 'react';

const HomePage = () => {
	return (
		<>
			<HeroBanner />
			<LinkBlocks />
			<TitleBlock blockDataName={'titleBlock1'} />
			<BlogInfoBlock blockDataName={'blogInfoData1'} />
			<BlogInfoBlock blockDataName={'blogInfoData2'} />
			<TitleBlock blockDataName={'titleBlock2'} />
			<Filter />
			<TitleBlock blockDataName={'titleBlock3'} />
			<DownloadBlock blockDataName={'downloadBlock1'} />
			<DownloadBlock blockDataName={'downloadBlock2'} />
			<TitleBlock blockDataName={'titleBlock4'} />
			<MembersColumns />
			<TitleLinksBlock />
		</>
	);
};

export default HomePage;
