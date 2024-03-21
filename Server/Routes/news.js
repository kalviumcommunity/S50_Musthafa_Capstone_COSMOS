const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://spaceapi.p.rapidapi.com/news',
    headers: {
      'X-RapidAPI-Key': '4d57f80c3cmsh220894b8060dac0p183d06jsn2765d1228c85',
      'X-RapidAPI-Host': 'spaceapi.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;