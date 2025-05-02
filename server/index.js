import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/auth/github', async (req, res) => {
	const { code } = req.body;

	try {
		const tokenRes = await axios.post(
			'https://github.com/login/oauth/access_token',
			{
				client_id: process.env.GITHUB_CLIENT_ID,
				client_secret: process.env.GITHUB_CLIENT_SECRET,
				code,
			},
			{
				headers: {
					Accept: 'application/json',
				},
			}
		);

		const access_token = tokenRes.data.access_token;
		res.json({ access_token });
	} catch (error) {
		console.error('OAuth error:', error.response?.data || error.message);
		res.status(500).json({ error: 'OAuth failed' });
	}
});

app.listen(PORT, () => {
	console.log(`OAuth backend running on http://localhost:${PORT}`);
});
