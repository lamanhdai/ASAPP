import asyncio
import base64
from flask import Flask, request, jsonify
from perchance import ImageGenerator

app = Flask(__name__)

async def generate_image(prompt: str):
    async with ImageGenerator() as gen:
        result = await gen.image(prompt)
        binary = await result.download()
        return base64.b64encode(binary.getvalue()).decode("utf-8")

@app.route("/", methods=["POST"])
def main():
    data = request.get_json(silent=True)

    if not data or "prompt" not in data:
        return jsonify({"error": "Missing prompt"}), 400

    image_base64 = asyncio.run(generate_image(data["prompt"]))

    return jsonify({
        "imageUrl": f"data:image/png;base64,{image_base64}"
    })