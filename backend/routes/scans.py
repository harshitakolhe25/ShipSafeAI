from fastapi import APIRouter, HTTPException
from models import ScanResult
from routes.analyze import scan_results_store

router = APIRouter()

@router.get("/", response_model=list[ScanResult])
def list_scans():
    from routes.analyze import mock_issues
    from datetime import datetime
    
    # Return all stored scans, sorted by newest first
    scans = list(scan_results_store.values())
    
    # If store is empty, return a default demo scan
    if not scans:
        return [
            ScanResult(
                id="demo-scan-123",
                project_name="Demo Project",
                timestamp=datetime.now().isoformat(),
                overall_risk_score=78,
                risk_status="Review Required",
                issues=mock_issues
            )
        ]
        
    return sorted(scans, key=lambda x: x.timestamp, reverse=True)

@router.get("/{scan_id}", response_model=ScanResult)
def get_scan(scan_id: str):
    if scan_id in scan_results_store:
        return scan_results_store[scan_id]
    
    # Fallback to mock data if not found (for old demo links)
    from routes.analyze import mock_issues
    from datetime import datetime
    
    return ScanResult(
        id=scan_id,
        project_name="Demo Project",
        timestamp=datetime.now().isoformat(),
        overall_risk_score=78,
        risk_status="Review Required",
        issues=mock_issues
    )
