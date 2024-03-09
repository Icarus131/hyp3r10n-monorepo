const axios = require('axios');

const testFastReq = async (req, res) => {
    try {
        console.log('got in Fast');
        const response = await axios.get('http://localhost:8080/');
        console.log('res from fastapi-->', response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('error:', error);
        res.status(500).json({ error: 'Internal Server Error', moreInfo: error.message });
    }
}

const sum = async(req, res) =>{
    try {
        const { x, y } = req.query;
        if (!x || !y) {
            return res.status(400).json({ error: 'Missing parameters' });
        }
        const response = await axios.get(`http://localhost:8080/sum?x=${x}&y=${y}`);
        console.log('res from fastapi-->', response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('error:', error);
        res.status(500).json({ error: 'Internal Server Error', moreInfo: error.message });
    }
}

module.exports = { testFastReq, sum };
