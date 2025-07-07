const pool = require('../db');


exports.getBlockContent = async (blockName) => {
	if (!blockName) throw new Error('Empty block name');;

	try {
		const blocksData = await pool.query(
			'SELECT data FROM page_blocks WHERE block_key=$1',
			[blockName]
		);

		if (!blocksData.rows.length) {
			throw new Error('No data');
		}

		return blocksData.rows[0].data;
	} catch (error) {
		console.error('Error in getBlockContent:', error.message);
		throw error;
	}
}


exports.getBlockContentAdmin = async (blockName) => {
	if (!blockName) throw new Error('Empty block name');;

	try {
		const blocksData = await pool.query(
			'SELECT * FROM page_blocks WHERE block_key=$1',
			[blockName]
		);

		if (!blocksData.rows.length) {
			throw new Error('No data');
		}

		return blocksData.rows;
	} catch (error) {
		console.error('Error in getBlockContent:', error.message);
		throw error;
	}
}

exports.setBlockContentAdmin = async (blockName, newBlockData) => {
	if (!blockName) throw new Error('Empty block name');
	if (!newBlockData) throw new Error('No new data provided');

	try {
		const updateResult = await pool.query(
			`UPDATE page_blocks
			 SET data = $1
			 WHERE block_key = $2
			 RETURNING *`,
			[newBlockData, blockName]
		);

		if (!updateResult.rows.length) {
			throw new Error('No block found to update');
		}

		return updateResult.rows[0];
	} catch (error) {
		console.error('Error in setBlockContentAdmin:', error.message);
		throw error;
	}
};
