import pandas as pd
from sklearn.model_selection import train_test_split
import pyarrow.parquet as pq

df = pd.read_parquet("hf://datasets/tdavidson/hate_speech_offensive/data/train-00000-of-00001.parquet")

print(df.head())

# def create_prompt_completion(row):
#     text = f'<|user|> Classify this text into offensive (as 1), hate speech (as 3) or neither (as 2): {row["tweet"]} <|end|>\n<|assistant|>\n {row["class"]} <|end|>'
#     return {"text": text}

# df_formatted = df.apply(create_prompt_completion, axis=1)

# df_formatted = pd.DataFrame(df_formatted.tolist())

# train_data, temp_data = train_test_split(df_formatted, test_size=0.3, random_state=42)

# test_data, val_data = train_test_split(temp_data, test_size=0.5, random_state=42)

# import json

# def save_to_jsonl(data, filename):
#     with open(filename, 'w') as f:
#         for entry in data.to_dict(orient="records"):
#             f.write(json.dumps(entry) + '\n')

# save_to_jsonl(train_data, 'train.jsonl')
# save_to_jsonl(test_data, 'test.jsonl')
# save_to_jsonl(val_data, 'val.jsonl')
