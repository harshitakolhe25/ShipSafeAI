from fastapi import APIRouter
from models import FixRequest, FixResult

router = APIRouter()

@router.post("/", response_model=FixResult)
def generate_fix(request: FixRequest):
    return FixResult(
        issue_id=request.issue_id,
        original_code="const query = `SELECT * FROM users WHERE username = '${req.body.username}'`;",
        proposed_code="const query = 'SELECT * FROM users WHERE username = $1';\nawait db.query(query, [req.body.username]);",
        explanation="IBM Bob Simulation: Parameterized queries separate the SQL logic from user input, preventing attackers from injecting arbitrary SQL commands."
    )
