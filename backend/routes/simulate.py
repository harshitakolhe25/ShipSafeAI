from fastapi import APIRouter
from models import SimulationRequest, SimulationResult

router = APIRouter()

@router.post("/", response_model=SimulationResult)
def simulate_failure(request: SimulationRequest):
    return SimulationResult(
        scenario_id=request.scenario_id,
        timeline=[
            {"step": "Request Started", "status": "ok", "description": "User initiates payment."},
            {"step": "External Service Timeout", "status": "error", "description": "Payment gateway takes >30s."},
            {"step": "Retry Triggered", "status": "warning", "description": "System automatically retries."},
            {"step": "Duplicate Request Risk", "status": "critical", "description": "First request completes in background, retry causes double charge."}
        ],
        summary="Simulation shows high risk of duplicate charges under timeout conditions."
    )
