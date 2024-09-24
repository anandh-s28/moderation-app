## Moderated Twitter

This is a ultra minimalist front-end for a twitter-like application. The main functionality is moderation. A separate FastAPI endpoint serves a Phi3 SLM fine-tuned for classifying offensive text. Everytime a user posts, the content of the post is sent to the moderation endpoint. If the model identifies the content as offensive or hate speech, the post will not be saved. 
