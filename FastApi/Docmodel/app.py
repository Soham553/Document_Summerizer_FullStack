import os
import tempfile
from fastapi import FastAPI, UploadFile, File
from services.file_utils import extract_paragraphs
from services.summarizer import summarize_file
from services.embeddings import map_summary_to_paragraphs
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500", "http://localhost:5500"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    # Save temp file
    suffix = os.path.splitext(file.filename)[-1]
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name

    # Extract paragraphs
    paragraphs = extract_paragraphs(tmp_path)

    # Run summarization
    summary = summarize_file(tmp_path)

    # Split summary into sentences
    summary_sentences = [s.strip() for s in summary.split(".") if s.strip()]

    # Citation mapping
    citation_map = map_summary_to_paragraphs(paragraphs, summary_sentences)

    return {
        "paragraphs": paragraphs,
        "summary": summary,
        "citation_map": citation_map
    }
