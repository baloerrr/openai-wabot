const stickerBot = async(whatsapp, message) => {
    if(message.hasMedia) {
        if(message.type == "image") {
            whatsapp.sendMessage(message.from, '[⌛]Loading...')
            try {
                const media = await message.downloadMedia();
                whatsapp.sendMessage(message.from, media, {
                    sendMediaAsSticker: true
                }).
                then(() => {
                    whatsapp.sendMessage(message.from, '[✔] Successfully');
                })
            } catch (error) {
                console.log(error.message);
                whatsapp.sendMessage(message.from, '[✖] Failed')
            }
        }
    }
}

module.exports = {
    stickerBot
}