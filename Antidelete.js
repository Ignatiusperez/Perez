async function setupAntiDelete(zk) {
    const antiDeleteSettings = await getAntiDeleteSettings();
    if (antiDeleteSettings.status !== 'on') return;

    zk.ev.on("messages.upsert", async (m) => {  
        const { messages } = m;  
        const ms = messages[0];  
        if (!ms.message) return;  

        const messageKey = ms.key;  
        const remoteJid = messageKey.remoteJid;  

        // Ignore status updates
        if (remoteJid === "status@broadcast") return;  

        // Initialize chat storage if it doesn't exist  
        if (!store2.chats[remoteJid]) {  
            store2.chats[remoteJid] = [];  
        }  

        // Save the received message to storage  
        store2.chats[remoteJid].push(ms);  

        // Handle deleted messages  
        if (ms.message.protocolMessage?.type === 0) {  
            const deletedKey = ms.message.protocolMessage.key;  
            const chatMessages = store2.chats[remoteJid];  
            const deletedMessage = chatMessages.find(msg => msg.key.id === deletedKey.id);  

            if (!deletedMessage) return;

            try {  
                const deleterJid = ms.key.participant || ms.key.remoteJid;
                const originalSenderJid = deletedMessage.key.participant || deletedMessage.key.remoteJid;
                const isGroup = remoteJid.endsWith('@g.us');
                
                // Get group info if message was from a group
                let groupInfo = '';
                if (isGroup) {
                    try {
                        const groupMetadata = await zk.groupMetadata(remoteJid);
                        groupInfo = `\n• Group: ${groupMetadata.subject}`;
                    } catch (e) {
                        console.error('Error fetching group metadata:', e);
                    }
                }

                const notification = `👿 *Anti-Delete Alert* 👿\n` +
                                    `• Deleted by: @${deleterJid.split("@")[0]}\n` +
                                    `• Original sender: @${originalSenderJid.split("@")[0]}\n` +
                                    `${groupInfo}\n` +
                                    `• Chat type: ${isGroup ? 'Group' : 'Private'}`;

                const contextInfo = getContextInfo('Deleted Message Alert', deleterJid);

                // Common message options
                const baseMessage = {
                    mentions: [deleterJid, originalSenderJid],
                    contextInfo: contextInfo
                };

                // Handle different message types
                if (deletedMessage.message.conversation) {
                    await zk.sendMessage(remoteJid, {
                        text: `${notification}\n\n📝 *Deleted Text:*\n${deletedMessage.message.conversation}`,
                        ...baseMessage
                    });
                } 
                else if (deletedMessage.message.extendedTextMessage) {
                    await zk.sendMessage(remoteJid, {
                        text: `${notification}\n\n📝 *Deleted Text:*\n${deletedMessage.message.extendedTextMessage.text}`,
                        ...baseMessage
                    });
                }
                else if (deletedMessage.message.imageMessage) {
                    const caption = deletedMessage.message.imageMessage.caption || '';
                    const imagePath = await zk.downloadAndSaveMediaMessage(deletedMessage.message.imageMessage);
                    await zk.sendMessage(remoteJid, {
                        image: { url: imagePath },
                        caption: `${notification}\n\n📷 *Image Caption:*\n${caption}`,
                        ...baseMessage
                    });
                }  
                else if (deletedMessage.message.videoMessage) {
                    const caption = deletedMessage.message.videoMessage.caption || '';
                    const videoPath = await zk.downloadAndSaveMediaMessage(deletedMessage.message.videoMessage);
                    await zk.sendMessage(remoteJid, {
                        video: { url: videoPath },
                        caption: `${notification}\n\n🎥 *Video Caption:*\n${caption}`,
                        ...baseMessage
                    });
                }  
                else if (deletedMessage.message.audioMessage) {
                    const audioPath = await zk.downloadAndSaveMediaMessage(deletedMessage.message.audioMessage);
                    await zk.sendMessage(remoteJid, {
                        audio: { url: audioPath },
                        ptt: true,
                        caption: `${notification}\n\n🎤 *Voice Message Deleted*`,
                        ...baseMessage
                    });
                }  
                else if (deletedMessage.message.stickerMessage) {
                    const stickerPath = await zk.downloadAndSaveMediaMessage(deletedMessage.message.stickerMessage);
                    await zk.sendMessage(remoteJid, {
                        sticker: { url: stickerPath },
                        caption: notification,
                        ...baseMessage
                    });
                }
                else {
                    // For other message types we don't specifically handle
                    await zk.sendMessage(remoteJid, {
                        text: `${notification}\n\n⚠️ *Unsupported message type was deleted*`,
                        ...baseMessage
                    });
                }
            } catch (error) {  
                console.error('Error handling deleted message:', error);  
            }  
        }  
    });
                      }
