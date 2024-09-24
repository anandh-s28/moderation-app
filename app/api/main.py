import re
from fastapi import FastAPI, Request
import subprocess

app = FastAPI()

MODEL = "microsoft/Phi-3-mini-4k-instruct"
ADAPTER_PATH = "../adapters"
MAX_TOKENS = 10


def extract_classification(output: str) -> str:
    match = re.search(r"<\|assistant\|>\s*(\d+)\s*<\|end\|>", output)
    if match:
        return match.group(1)
    return "No classification found"


@app.post("/classify-text/")
async def classify_text(request: Request):
    data = await request.json()
    user_input = data.get("text")

    if not user_input:
        return {"error": "No text provided."}

    prompt = f"<|user|> Classify this text into offensive (as 1), hate speech (as 0) or neither (as 2):\n{user_input} <|end|>\n<|assistant|>"

    result = subprocess.run(
        ["python3", "-m", "mlx_lm.generate", "--model", MODEL, "--adapter-path",
            ADAPTER_PATH, "--max-token", str(MAX_TOKENS), "--prompt", prompt],
        capture_output=True,
        text=True
    )

    if result.returncode != 0:
        return {"error": "Error running the model.", "details": result.stderr}

    output = result.stdout

    # Extract only the classification (1, 0, or 2)
    classification = extract_classification(output)

    return {"classification": classification}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8080, reload=True)
