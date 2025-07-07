const { getBlockContent, getBlockContentAdmin, setBlockContentAdmin } = require("../services/blocksData.services")

exports.getBlockData = async (req, res, blockKey) => {
	try {
		const data = await getBlockContent(blockKey);

		res.json(data);
	} catch (error) {
		console.error('Error while parsing or reading file:', error);
		res.status(500).json({ error: 'No data' });
	}
};

exports.getBlockDataAdmin = async (req, res, blockKey) => {
	try {
		const dataRow = await getBlockContentAdmin(blockKey);
		const total = dataRow.length;

		res
			.set('Content-Range', `customers 0-${total - 1}/${total}`)
			.set('Access-Control-Expose-Headers', 'Content-Range')
			.status(200).json(dataRow);
	} catch (error) {
		console.error('Error while parsing or reading file:', error);
		res.status(500).json({ error: 'No data' });
	}
};

exports.setBlockDataAdmin = async (req, res) => {
	try {
		const blockKey = req.body.block_key;
		const newBlockData = req.body.data;

		if (!blockKey || !newBlockData) {
			return res.status(400).json({ success: false, message: 'Missing blockKey or data' });
		}

		await setBlockContentAdmin(blockKey, newBlockData);

		return res.status(200).json({ success: true, message: 'Block data updated successfully' });
	} catch (error) {
		console.error('Error in setBlockDataAdmin controller:', error.message);
		return res.status(500).json({ success: false, message: 'Failed to update block data' });
	}
};
