import os
from telethon import TelegramClient

api_id = int(os.environ.get("API_ID"))
api_hash = os.environ.get("API_HASH")

client = TelegramClient('bot', api_id, api_hash)
client.start()
print("البوت يعمل الآن في السحابة!")
client.run_until_disconnected()
