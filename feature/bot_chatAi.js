const axios = require('axios');
const { API_KEY_OPEN_AI } = require('../config/config.js');

const chatAI = async(text, message) => {

    const command = text.split('/');

    if(command.length < 2) {
        return message.reply('Format Salah. ketik *#ask/your question*')
    }

    message.reply('[⌛] Loading...');

    const question = command[1];
    const response = await chatGPT(question);

    if(!response.success) {
        return message.reply('Terjadi kesalahan.');
    }

    return message.reply(response.data);
}

const chatGPT = async(question) => {

    const result = {
        success: false,
        data: null,
        message: ""
    }

    return await axios({
        method: 'post',
        url: 'https://api.openai.com/v1/completions',
        data: {
            "model": "text-davinci-003",
            "prompt": question,
            "max_tokens": 1000,
            "temperature": 0
        },
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
            "Accept-Language": "in-ID",
            "Authorization": `Bearer ${API_KEY_OPEN_AI}`
        }
    }).
    then(res => {
        if(res.status === 200) {
            result.success = true;
            result.data = res?.data?.choices?.[0].text || 'Mohon maaf untuk saat ini kami belum tau';
        } else {
            result.message = 'Response Failed';
        }

        return result;
    }).
    catch(err => {
        res.message = `Error : ${err.message}`;
        return result
    }) ;
}

module.exports = {
    chatAI
}