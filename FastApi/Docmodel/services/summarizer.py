from google import genai
from google.genai import types

API_KEY = "AIzaSyBvfw6lNtwft3_NJmRGfM2QZR0WOaeaZ40"

def summarize_file(file_path, model="gemini-2.5-flash"):

    with open(file_path, "rb") as f:
        file_bytes = f.read()

    mime = "application/pdf" if file_path.lower().endswith(".pdf") else "text/plain"

    file_part = types.Part.from_bytes(
        data=file_bytes,
        mime_type=mime
    )

    prompt = "Please provide a clear and concise summary of the document."

    client = genai.Client(api_key=API_KEY)

    response = client.models.generate_content(
        model=model,
        contents=[file_part, prompt]
    )

    return response.text


