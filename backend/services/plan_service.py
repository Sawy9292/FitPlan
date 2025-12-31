from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import sys
import os
import uuid
from datetime import datetime
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from shared.database import get_db, init_db
from shared.models import ActivePlan
from shared.schemas import PlanResponse, ActivePlanRequest, ActivePlanResponse, FoodResponse
from shared.jwt_utils import get_current_user_id
from shared.data import get_all_plans, get_plan_by_id, get_all_foods, search_foods
app = FastAPI(title="Plan Service", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.on_event("startup")
def startup_event():
    init_db()
@app.get("/plans", response_model=list[PlanResponse])
def get_plans(type: str = None, goal: str = None, difficulty: str = None, duration: str = None, equipment: str = None, dietType: str = None):
    """Get all plans with optional filters"""
    plans = get_all_plans()
    if type:
        plans = [p for p in plans if p["type"] == type]
    if goal:
        plans = [p for p in plans if goal.lower() in [g.lower() for g in p["goals"]]]
    if difficulty:
        plans = [p for p in plans if p["difficulty"].lower() == difficulty.lower()]
    if duration:
        plans = [p for p in plans if p["duration"] == duration]
    if equipment:
        plans = [p for p in plans if p.get("equipment", "").lower() == equipment.lower()]
    if dietType:
        plans = [p for p in plans if p.get("dietType", "").lower() == dietType.lower()]
    return plans
@app.get("/plans/{plan_id}", response_model=PlanResponse)
def get_plan(plan_id: str):
    """Get plan by ID"""
    plan = get_plan_by_id(plan_id)
    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")
    return plan
@app.get("/users/{user_id}/active-plans")
def get_active_plans(user_id: str, current_user_id: str = Depends(get_current_user_id), db: Session = Depends(get_db)):
    """Get user's active plans"""
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Unauthorized")
    active_plans = db.query(ActivePlan).filter(ActivePlan.user_id == user_id).all()
    result = []
    for ap in active_plans:
        plan_data = get_plan_by_id(ap.plan_id)
        result.append({
            "id": ap.id,
            "userId": ap.user_id,
            "planId": ap.plan_id,
            "plan": plan_data,
            "startDate": ap.start_date.isoformat(),
            "status": ap.status
        })
    return {"activePlans": result}
@app.post("/users/{user_id}/active-plans")
def add_active_plan(user_id: str, request: ActivePlanRequest, current_user_id: str = Depends(get_current_user_id), db: Session = Depends(get_db)):
    """Add plan to active plans"""
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Unauthorized")
    plan_data = get_plan_by_id(request.planId)
    if not plan_data:
        raise HTTPException(status_code=404, detail="Plan not found")
    active_plan_id = f"active_{uuid.uuid4().hex[:12]}"
    active_plan = ActivePlan(
        id=active_plan_id,
        user_id=user_id,
        plan_id=request.planId,
        plan_data=plan_data,
        start_date=datetime.utcnow(),
        status="active",
        created_at=datetime.utcnow()
    )
    db.add(active_plan)
    db.commit()
    db.refresh(active_plan)
    return {
        "id": active_plan.id,
        "userId": active_plan.user_id,
        "planId": active_plan.plan_id,
        "plan": plan_data,
        "startDate": active_plan.start_date.isoformat(),
        "status": active_plan.status
    }
@app.delete("/users/{user_id}/active-plans/{plan_id}")
def remove_active_plan(user_id: str, plan_id: str, current_user_id: str = Depends(get_current_user_id), db: Session = Depends(get_db)):
    """Remove active plan"""
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Unauthorized")
    active_plan = db.query(ActivePlan).filter(
        ActivePlan.user_id == user_id,
        ActivePlan.plan_id == plan_id
    ).first()
    if active_plan:
        db.delete(active_plan)
        db.commit()
    return {"message": "Active plan removed"}
@app.get("/foods", response_model=list[FoodResponse])
def get_foods():
    """Get all foods"""
    return get_all_foods()
@app.get("/foods/search", response_model=list[FoodResponse])
def search_foods_endpoint(q: str):
    """Search foods by query"""
    return search_foods(q)
@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "plan-service"}
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8003)
