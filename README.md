## Moderated Twitter

This is a ultra minimalist front-end for a twitter-like application. The main functionality is moderation. A separate FastAPI endpoint serves a Phi3 SLM fine-tuned for classifying offensive text. Everytime a user posts, the content of the post is sent to the moderation endpoint. If the model identifies the content as offensive or hate speech, the post will not be saved. 

Demo:

https://github.com/user-attachments/assets/7e5e152f-81f5-4690-83c8-5a2dbe50d1fa

