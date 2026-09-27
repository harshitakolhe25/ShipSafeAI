from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from enum import Enum

class SeverityEnum(str, Enum):
    CRITICAL = "Critical"
    HIGH = "High"
    MEDIUM = "Medium"
    LOW = "Low"

class IssueCategoryEnum(str, Enum):
    BUG = "Bug"
    SECURITY = "Security"
    DEPENDENCY = "Dependency"
    TEST_COVERAGE = "Test Coverage"
    CODE_QUALITY = "Code Quality"

class Issue(BaseModel):
    id: str
    title: str
    severity: SeverityEnum
    category: IssueCategoryEnum
    file_name: str
    line_number: int
    description: str
    potential_impact: str
    recommended_fix: str
    confidence_level: int
    verification_status: str
    code_snippet: str

class ScanRequest(BaseModel):
    code: str
    language: str
    file_name: Optional[str] = "uploaded_file"
    config: Dict[str, bool]

class ScanResult(BaseModel):
    id: str
    project_name: str
    timestamp: str
    overall_risk_score: int
    risk_status: str
    issues: List[Issue]

class SimulationRequest(BaseModel):
    scenario_id: str

class SimulationResult(BaseModel):
    scenario_id: str
    timeline: List[Dict[str, Any]]
    summary: str

class FixRequest(BaseModel):
    issue_id: str

class FixResult(BaseModel):
    issue_id: str
    original_code: str
    proposed_code: str
    explanation: str

class TestGenerateRequest(BaseModel):
    issue_id: str
    fix_id: Optional[str]

class TestCase(BaseModel):
    id: str
    name: str
    description: str
    input_values: Any
    expected_output: Any
    status: str
    code: str

class TestResult(BaseModel):
    tests: List[TestCase]

class Report(BaseModel):
    id: str
    project_name: str
    timestamp: str
    overall_risk_score: int
    recommendation: str
    summary_data: Dict[str, Any]
