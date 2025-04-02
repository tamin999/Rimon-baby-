const { GoatWrapper } = require('fca-liane-utils');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
	config: {
		name: "owner",
		aliases: ["info"],
		author: "Rimon",
		role: 0,
		shortDescription: "Show Owner Information",
		longDescription: "Displays detailed information about the bot owner.",
		category: "info",
		guide: "{pn}"
	},

	onStart: async function ({ api, event }) {
		try {
			const ownerInfo = {
				name: 'YoUr RiMOn❤️‍🩹',
				class: '𝑺𝑺𝑪 𝑪𝑨𝑵𝑫𝑰𝑫𝑨𝑻𝑬',
				group: '𝑺𝑪𝑰𝑬𝑵𝑪𝑬',
				gender: '𝑴𝑨𝑳𝑬',
				Birthday: '𝟐0-𝟎8-𝟐𝟎𝟎𝟖',
				religion: '𝑰𝑺𝑳𝑨𝑴',
				hobby: 'nothing',
				Fb: 'https://www.facebook.com/it.z.rimon.216225',
				Relationship: '𝑨𝑳𝑾𝑨𝒀𝑺 𝑩𝑬 𝑺𝑰𝑵𝑮𝑳𝑬',
				Height: '6'
			};

			const videoUrl = 'https://i.imgur.com/CNpkoYi.mp4';
			const tmpFolderPath = path.join(__dirname, 'tmp');

			if (!fs.existsSync(tmpFolderPath)) {
				fs.mkdirSync(tmpFolderPath);
			}

			const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
			const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

			fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

			const response = `
𓀬 𝐎𝐖𝐍𝐄𝐑 𝐈𝐍𝐅𝐎 𓀬 \n
 ~𝙉𝘼𝙈𝙀: ${ownerInfo.name}
 ~𝘾𝙇𝘼𝙎𝙎: ${ownerInfo.class}
 ~𝙂𝙍𝙊𝙐𝙋: ${ownerInfo.group}
 ~𝙂𝙀𝙉𝘿𝙀𝙍: ${ownerInfo.gender}
 ~𝘽𝙄𝙍𝙏𝙃𝘿𝘼𝙔: ${ownerInfo.Birthday}
 ~𝙍𝙀𝙇𝙄𝙂𝙄𝙊𝙉: ${ownerInfo.religion}
 ~𝙍𝙀𝙇𝘼𝙏𝙄𝙊𝙉𝙎𝙃𝙄𝙋: ${ownerInfo.Relationship}
 ~𝙃𝙊𝘽𝘽𝙔: ${ownerInfo.hobby}
 ~𝙃𝙀𝙄𝙂𝙃𝙏: ${ownerInfo.Height}
 ~𝙁𝘽: ${ownerInfo.Fb}
			`;

			await api.sendMessage({
				body: response,
				attachment: fs.createReadStream(videoPath)
			}, event.threadID, event.messageID);

			fs.unlinkSync(videoPath);

			api.setMessageReaction('💀', event.messageID, (err) => {}, true);
		} catch (error) {
			console.error('Error in ownerinfo command:', error);
			return api.sendMessage('⚠️ An error occurred while processing the command.', event.threadID);
		}
	}
};

// ✅ No Prefix Enabled
const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix();
