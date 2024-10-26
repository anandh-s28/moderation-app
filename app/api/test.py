import requests
import json
import pandas as pd
from sklearn.metrics import confusion_matrix, classification_report

API_URL = "http://127.0.0.1:8000/classify-text/"
TEST_DATA = "../data/test.jsonl"

test_data = []
with open(TEST_DATA, 'r') as f:
    print("Loaded test data")
    for line in f:
        test_data.append(json.loads(line))

results = []

NUM_ROWS_TO_TEST = 250

for i, row in enumerate(test_data[:NUM_ROWS_TO_TEST]):
    text = row['text']
    original_classification = text.split("<|assistant|>\n ")[
        1].split(" <|end|>")[0].strip()

    cleaned_text = text.split("<|assistant|>\n")[0] + "<|assistant|>"

    # Prepare the payload
    payload = {
        "text": cleaned_text
    }

    response = requests.post(API_URL, json=payload)
    if response.status_code == 200:
        classification = response.json().get("classification")
        print(f"Row {i + 1}: Predicted classification: {classification}, Original classification: {original_classification}")
        results.append({"row_number": i + 1, "predicted_classification": classification,
                       "original_classification": original_classification})
    else:
        print(f"Error with row {i + 1}: {response.json()}")

df = pd.DataFrame(results)
df['predicted_classification'] = df['predicted_classification'].astype(int)
df['original_classification'] = df['original_classification'].astype(int)

df.to_csv("classification_results.csv", index=False)

y_true = df['original_classification']
y_pred = df['predicted_classification']

conf_matrix = confusion_matrix(y_true, y_pred, labels=[0, 1, 2])
print("Confusion Matrix:")
print(conf_matrix)

report = classification_report(y_true, y_pred, labels=[0, 1, 2], target_names=[
                               'Hate Speech', 'Offensive', 'Neither'])
print("Classification Report:")
print(report)
