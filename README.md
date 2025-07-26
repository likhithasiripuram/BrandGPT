
# **BrandGPT – AI-Powered Branding Assistant**

Create your brand identity in minutes with AI.

BrandGPT is a full-stack AI application that helps startups and creators generate **brand names, mission statements, taglines, social media strategies, and logo designs** using **Generative AI models** like LLaMA2 and Stable Diffusion.

---

## **Features**

* AI-generated Brand Name, Mission, Tagline
* Social Media Strategy (platforms, content ideas, tone)
* Logo Design using Hugging Face (Stable Diffusion)
* Firebase Authentication for secure access
* Full-stack React + FastAPI architecture
* Future Scope: Posters, Brochures, Brand Kit (PDF)

---

## **Tech Stack**

* **Frontend:** React, React Router, CSS
* **Backend:** FastAPI, Pydantic, CORS
* **AI Models:**

  * Text: LLaMA2 (via Ollama)
  * Images: Stable Diffusion (via Hugging Face API)
* **Auth:** Firebase Authentication

---

## **Project Structure**

```
BrandGPT/
│
├── backend/
│   ├── main.py               # FastAPI main app
│   ├── routes/
│   │   ├── logo_generator.py # Hugging Face logo generation
│   │   ├── text_generator.py # Ollama LLaMA2 endpoints
│   ├── static/               # Stores generated images
│   └── .env                  # Hugging Face API Token
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx # Main dashboard
│   │   │   ├── Results.jsx   # Results page
│   │   └── App.js
│   └── package.json
│
└── README.md
```

---

## **Setup Instructions**

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/BrandGPT.git
cd BrandGPT
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a **.env** file:

```
HUGGINGFACE_TOKEN=your_hf_token_here
```

Run the FastAPI server:

```bash
uvicorn main:app --reload
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## **Usage**

1. Sign up/login using Firebase Authentication.
2. Enter **Product Name** and **Target Audience**.
3. Click:

   * Generate Basic Info → Brand name, tagline, mission.
   * Social Media Strategy → Platforms, content ideas.
   * Logo Design → AI-generated logo.
4. View results on the Results Page and download assets.

---

## **Future Scope**

* Poster and Brochure Design
* Full Brand Kit in PDF
* AI-powered Ad Copies

