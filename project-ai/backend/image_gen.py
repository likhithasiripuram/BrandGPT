from diffusers import StableDiffusionPipeline
import torch

# Load the pipeline (use CPU or GPU depending on availability)
pipe = StableDiffusionPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32
)
pipe = pipe.to("cuda" if torch.cuda.is_available() else "cpu")

def generate_logo(prompt: str, file_path: str = "logo.png"):
    image = pipe(prompt).images[0]
    image.save(file_path)
    return file_path
