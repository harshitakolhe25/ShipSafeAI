from fastapi import APIRouter
from models import TestGenerateRequest, TestResult

router = APIRouter()

@router.post("/", response_model=TestResult)
def generate_tests(request: TestGenerateRequest):
    return TestResult(
        tests=[
            {
                "id": "t1",
                "name": "SQL Injection Resistance",
                "description": "Ensures that injecting SQL payloads into username does not alter query logic.",
                "input_values": {"username": "admin' OR '1'='1"},
                "expected_output": "0 rows returned or authentication error",
                "status": "Generated",
                "code": "test('SQL injection payload is treated as literal', async () => {\n  const res = await login(\"admin' OR '1'='1\");\n  expect(res.status).toBe(401);\n});"
            },
            {
                "id": "t2",
                "name": "Valid User Retrieval",
                "description": "Ensures valid usernames still work.",
                "input_values": {"username": "valid_user"},
                "expected_output": "1 row returned",
                "status": "Generated",
                "code": "test('Valid user can login', async () => {\n  const res = await login(\"valid_user\");\n  expect(res.status).toBe(200);\n});"
            }
        ]
    )
