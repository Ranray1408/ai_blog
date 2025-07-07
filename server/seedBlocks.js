const fs = require('fs');
const path = require('path');
const pool = require('./db');

const blocksDir = path.join(__dirname, '/data');

const toSnakeCase = (str) =>
	str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

async function seedBlocks() {
	try {
		const files = fs.readdirSync(blocksDir).filter(file => file.endsWith('.json'));

		for (let i = 0; i < files.length; i++) {
			const fileName = files[i];
			if (fileName === 'customers.json') continue;

			const fileNameWithoutExt = path.basename(fileName, '.json');
			const snakeName = toSnakeCase(fileNameWithoutExt);

			const filePath = path.join(blocksDir, fileName);
			const rawData = fs.readFileSync(filePath, 'utf-8');
			const jsonData = JSON.parse(rawData);

			await pool.query(
				'INSERT INTO page_blocks (block_key, position, data) VALUES ($1, $2, $3)',
				[snakeName, i + 1, JSON.stringify(jsonData)]
			);

			console.log(`✅ Inserted block: ${snakeName}`);
		}

		console.log('\n🎉 Усі блоки успішно додано!');
		process.exit();
	} catch (err) {
		console.error('❌ Помилка під час вставки блоків:', err);
		process.exit(1);
	}
}

seedBlocks();
