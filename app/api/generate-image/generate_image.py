import asyncio
import base64
import json
import sys
from perchance import ImageGenerator

async def generate_image(prompt: str):
    async with ImageGenerator() as gen:
        result = await gen.image(prompt)
        binary = await result.download()
        return base64.b64encode(binary.getvalue()).decode("utf-8")

def handler(request):
    try:
        if request.method != "POST":
            return {
                "statusCode": 405,
                "body": json.dumps({"error": "POST only"})
            }

        body = request.json()
        prompt = body.get("prompt")

        if not prompt:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "Missing prompt"})
            }

        image_base64 = asyncio.run(generate_image(prompt))

        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({
                "imageUrl": f"data:image/png;base64,{image_base64}"
            })
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }