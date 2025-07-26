from fastapi import FastAPI, Request, Body, HTTPException
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import requests
import json
from fastapi.responses import FileResponse
from image_gen import generate_logo
from routes import logo_generator
app = FastAPI()

# Enable CORS for frontend (React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")

# Include logo router
app.include_router(logo_generator.router)

# Input schema
class BrandRequest(BaseModel):
    product_name: str
    target_audience: str

# Route 1: Basic Info Generation
@app.post("/generate/basic-info")
async def generate_basic_info(data: BrandRequest):
    prompt = (
        f"Generate a brand name, mission statement, and tagline for a product called '{data.product_name}' "
        f"targeted at '{data.target_audience}'. Respond strictly in JSON with keys: brand_name, mission, tagline."
    )

    try:
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={"model": "llama2", "prompt": prompt, "stream": False}
        )
        output = response.json().get("response", "")
        result = json.loads(output)
    except Exception as e:
        result = {"raw": output if 'output' in locals() else str(e)}

    print(result)
    return result

# Route 2: Social Media Strategy Generation
@app.post("/generate/social-media-strategy")
async def generate_social_media_strategy(request: Request):
    data = await request.json()
    product_name = data.get("product_name")
    target_audience = data.get("target_audience")

    prompt = (
        f"Create a social media strategy for a product named '{product_name}', targeting '{target_audience}'. "
        "Include:\n"
        "- Platforms to focus on (like Instagram, LinkedIn, etc.)\n"
        "- Content ideas (reels, carousels, memes, etc.)\n"
        "- Posting frequency\n"
        "- Tone and branding suggestions\n"
        "Respond in JSON format with keys:\n"
        "{\n"
        '  "platforms": ["Instagram", "Twitter", "LinkedIn"],\n'
        '  "content_ideas": [\n'
        '    {"type": "reel", "title": "Behind-the-scenes..."},\n'
        '    {"type": "carousel", "title": "Educational carousel"}\n'
        '  ],\n'
        '  "posting_frequency": "3 posts per week",\n'
        '  "tone_and_branding": {\n'
        '    "tone": "Friendly, youthful",\n'
        '    "branding": "Bold colors and playful graphics"\n'
        '  }\n'
        '}'
    )

    try:
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={"model": "llama2", "prompt": prompt, "stream": False}
        )
        output = response.json().get("response", "")
        result = json.loads(output)
    except Exception as e:
        result = {"raw": output if 'output' in locals() else str(e)}

    print(result)
    return result


