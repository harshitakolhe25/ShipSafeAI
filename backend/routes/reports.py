from fastapi import APIRouter
from models import Report
from datetime import datetime

router = APIRouter()

@router.get("/{report_id}", response_model=Report)
def get_report(report_id: str):
    return Report(
        id=report_id,
        project_name="Demo Project",
        timestamp=datetime.now().isoformat(),
        overall_risk_score=78,
        recommendation="Review Required",
        summary_data={
            "issues_by_severity": {"Critical": 1, "High": 1, "Medium": 0, "Low": 0},
            "test_coverage": "85%",
            "failure_simulations_run": 2,
            "fixes_applied": 0
        }
    )
