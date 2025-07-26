import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from PIL import Image
import torch
from diffusers import StableDiffusionPipeline

router = APIRouter()

# Load the model once when the app starts
pipe = StableDiffusionPipeline.from_pretrained(
    "CompVis/stable-diffusion-v1-4",
    torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32
)
pipe = pipe.to("cuda" if torch.cuda.is_available() else "cpu")

class LogoInput(BaseModel):
    prompt: str | None = None
    product_name: str | None = None
    target_audience: str | None = None


def generate_image_with_diffusers(prompt: str, outfile: str = "static/generated_logo.png") -> str:
    print("🟡 Generating image using local Stable Diffusion...")
    
    image: Image.Image = pipe(prompt).images[0]

    os.makedirs(os.path.dirname(outfile), exist_ok=True)
    image.save(outfile)
    
    print(f"🟢 Logo saved at {outfile}")
    return f"/{outfile}"


@router.post("/generate/logo")
async def generate_logo(payload: LogoInput):
    # Build prompt
    if payload.prompt:
        prompt = payload.prompt
    else:
        pname = payload.product_name or "Your Brand"
        audience = payload.target_audience or "general audience"
        prompt = (
            f"Minimal, modern, flat vector logo for a brand called '{pname}', "
            f"appealing to {audience}. White or transparent background. High contrast. Brandable design."
        )

    try:
        logo_path = generate_image_with_diffusers(prompt)
        return {"logo_url": logo_path}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image generation failed: {str(e)}")
