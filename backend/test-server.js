const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend server is running successfully! 🚀');
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working correctly!' });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`✅ Test Server is running on http://localhost:${PORT}`);
  console.log(`   Visit http://localhost:${PORT} to test it out!`);
});
