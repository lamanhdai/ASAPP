import asyncio
import base64
import sys
import io
from perchance import ImageGenerator

async def generate(prompt):
    try:
        async with ImageGenerator() as gen:
            # You can customize shape: 'portrait', 'landscape', or 'square'
            result = await gen.image(prompt)
            binary = await result.download()
            
            # Encode binary to base64
            base64_image = base64.b64encode(binary.getvalue()).decode('utf-8')
            print(base64_image)
    except Exception as e:
        print(f"ERROR: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python generate_image.py <prompt>")
        sys.exit(1)
    
    prompt = sys.argv[1]
    asyncio.run(generate(prompt))
