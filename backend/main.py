from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import analyze, simulate, fixes, tests, reports, scans

app = FastAPI(title="ShipSafe AI Backend", description="AI-powered release safety engineer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For demo purposes
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze.router, prefix="/api/analyze", tags=["analyze"])
app.include_router(scans.router, prefix="/api/scans", tags=["scans"])
app.include_router(simulate.router, prefix="/api/simulate", tags=["simulate"])
app.include_router(fixes.router, prefix="/api/fixes", tags=["fixes"])
app.include_router(tests.router, prefix="/api/tests", tags=["tests"])
app.include_router(reports.router, prefix="/api/reports", tags=["reports"])

@app.get("/")
def read_root():
    return {"message": "Welcome to ShipSafe AI Backend"}
