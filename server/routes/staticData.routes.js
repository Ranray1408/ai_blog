const express = require('express');
const controllerGetBlockData = require('../controllers/blocksData.controller');

const router = express.Router();

const getApisData = [
	{ apiName: '/header', blockKey: 'header_data' },
	{ apiName: '/heroBanner', blockKey: 'hero_banner' },
	{ apiName: '/linkBlocks', blockKey: 'link_blocks' },
	{ apiName: '/titleBlock', blockKey: 'title_blocks_data' },
	{ apiName: '/blogInfoBlock', blockKey: 'blog_info_block' },
	{ apiName: '/membersList', blockKey: 'members_list' },
	{ apiName: '/downloadBlocks', blockKey: 'download_blocks' },
	{ apiName: '/titleLinksBlock', blockKey: 'title_links_block' },
	{ apiName: '/footer', blockKey: 'footer_data' },
	{ apiName: '/contactsPage', blockKey: 'contacts_page_data' },
	{ apiName: '/ctaCustomers', blockKey: 'cta_customers' },
];

getApisData.forEach(({ apiName, blockKey }) => {
	router.get(apiName, (req, res) => {
		controllerGetBlockData.getBlockData(req, res, blockKey);
	});

	const adminPath = `${apiName}`;

	router.get(adminPath, (req, res) => {
		controllerGetBlockData.getBlockDataAdmin(req, res, blockKey);
	});

	router.post(adminPath, (req, res) => {
		controllerGetBlockData.setBlockDataAdmin(req, res, blockKey);
	});
});

module.exports = router;
