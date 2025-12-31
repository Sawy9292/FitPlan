from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import sys
import os
import uuid
from datetime import datetime
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from shared.database import get_db, init_db
from shared.models import DailyLog, ProgressData
from shared.schemas import DailyLogRequest, DailyLogResponse, ProgressDataRequest, ProgressDataResponse
from shared.jwt_utils import get_current_user_id
app = FastAPI(title="Tracking Service", version="1.0.0")
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
@app.get("/users/{user_id}/logs")
def get_daily_logs(user_id: str, date: str = None, current_user_id: str = Depends(get_current_user_id), db: Session = Depends(get_db)):
    """Get daily logs"""
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Unauthorized")
    query = db.query(DailyLog).filter(DailyLog.user_id == user_id)
    if date:
        log = query.filter(DailyLog.date == date).first()
        if not log:
            return {"log": None}
        return {
            "log": {
                "id": log.id,
                "userId": log.user_id,
                "date": log.date,
                "workouts": log.workouts or [],
                "meals": log.meals or [],
                "water": log.water,
                "weight": log.weight,
                "createdAt": log.created_at.isoformat(),
                "updatedAt": log.updated_at.isoformat()
            }
        }
    logs = query.all()
    return {
        "logs": [{
            "id": log.id,
            "userId": log.user_id,
            "date": log.date,
            "workouts": log.workouts or [],
            "meals": log.meals or [],
            "water": log.water,
            "weight": log.weight,
            "createdAt": log.created_at.isoformat(),
            "updatedAt": log.updated_at.isoformat()
        } for log in logs]
    }
@app.get("/users/{user_id}/logs/{date}")
def get_daily_log(user_id: str, date: str, current_user_id: str = Depends(get_current_user_id), db: Session = Depends(get_db)):
    """Get daily log by date"""
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Unauthorized")
    log = db.query(DailyLog).filter(DailyLog.user_id == user_id, DailyLog.date == date).first()
    if not log:
        return {"log": None}
    return {
        "log": {
            "id": log.id,
            "userId": log.user_id,
            "date": log.date,
            "workouts": log.workouts or [],
            "meals": log.meals or [],
            "water": log.water,
            "weight": log.weight,
            "createdAt": log.created_at.isoformat(),
            "updatedAt": log.updated_at.isoformat()
        }
    }
@app.post("/users/{user_id}/logs")
def create_daily_log(user_id: str, request: DailyLogRequest, current_user_id: str = Depends(get_current_user_id), db: Session = Depends(get_db)):
    """Create daily log"""
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Unauthorized")
    existing_log = db.query(DailyLog).filter(
        DailyLog.user_id == user_id,
        DailyLog.date == request.date
    ).first()
    if existing_log:
        existing_log.workouts = [w.dict() for w in request.workouts]
        existing_log.meals = [m.dict() for m in request.meals]
        existing_log.water = request.water
        if request.weight is not None:
            existing_log.weight = request.weight
        existing_log.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(existing_log)
        update_streak(user_id, db)
        return {
            "log": {
                "id": existing_log.id,
                "userId": existing_log.user_id,
                "date": existing_log.date,
                "workouts": existing_log.workouts or [],
                "meals": existing_log.meals or [],
                "water": existing_log.water,
                "weight": existing_log.weight,
                "createdAt": existing_log.created_at.isoformat(),
                "updatedAt": existing_log.updated_at.isoformat()
            }
        }
    log_id = f"log_{uuid.uuid4().hex[:12]}"
    daily_log = DailyLog(
        id=log_id,
        user_id=user_id,
        date=request.date,
        workouts=[w.dict() for w in request.workouts],
        meals=[m.dict() for m in request.meals],
        water=request.water,
        weight=request.weight,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    db.add(daily_log)
    db.commit()
    db.refresh(daily_log)
    update_streak(user_id, db)
    return {
        "log": {
            "id": daily_log.id,
            "userId": daily_log.user_id,
            "date": daily_log.date,
            "workouts": daily_log.workouts or [],
            "meals": daily_log.meals or [],
            "water": daily_log.water,
            "weight": daily_log.weight,
            "createdAt": daily_log.created_at.isoformat(),
            "updatedAt": daily_log.updated_at.isoformat()
        }
    }
@app.put("/users/{user_id}/logs/{date}")
def update_daily_log(user_id: str, date: str, request: DailyLogRequest, current_user_id: str = Depends(get_current_user_id), db: Session = Depends(get_db)):
    """Update daily log"""
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Unauthorized")
    log = db.query(DailyLog).filter(DailyLog.user_id == user_id, DailyLog.date == date).first()
    if not log:
        raise HTTPException(status_code=404, detail="Log not found")
    log.workouts = [w.dict() for w in request.workouts]
    log.meals = [m.dict() for m in request.meals]
    log.water = request.water
    if request.weight is not None:
        log.weight = request.weight
    log.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(log)
    return {
        "log": {
            "id": log.id,
            "userId": log.user_id,
            "date": log.date,
            "workouts": log.workouts or [],
            "meals": log.meals or [],
            "water": log.water,
            "weight": log.weight,
            "createdAt": log.created_at.isoformat(),
            "updatedAt": log.updated_at.isoformat()
        }
    }
@app.delete("/users/{user_id}/logs/{date}")
def delete_daily_log(user_id: str, date: str, current_user_id: str = Depends(get_current_user_id), db: Session = Depends(get_db)):
    """Delete daily log"""
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Unauthorized")
    log = db.query(DailyLog).filter(DailyLog.user_id == user_id, DailyLog.date == date).first()
    if log:
        db.delete(log)
        db.commit()
    return {"message": "Log deleted"}
@app.get("/users/{user_id}/progress")
def get_progress(user_id: str, current_user_id: str = Depends(get_current_user_id), db: Session = Depends(get_db)):
    """Get progress data"""
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Unauthorized")
    progress = db.query(ProgressData).filter(ProgressData.user_id == user_id).first()
    if not progress:
        return {"progress": None}
    return {
        "progress": {
            "id": progress.id,
            "userId": progress.user_id,
            "weights": progress.weights or [],
            "completedWorkouts": progress.completed_workouts or [],
            "streak": progress.streak,
            "totalWorkoutsDone": progress.total_workouts_done,
            "updatedAt": progress.updated_at.isoformat()
        }
    }
@app.put("/users/{user_id}/progress")
def update_progress(user_id: str, request: ProgressDataRequest, current_user_id: str = Depends(get_current_user_id), db: Session = Depends(get_db)):
    """Update progress data"""
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Unauthorized")
    progress = db.query(ProgressData).filter(ProgressData.user_id == user_id).first()
    if not progress:
        raise HTTPException(status_code=404, detail="Progress data not found")
    if request.weights is not None:
        progress.weights = [w.dict() for w in request.weights]
    if request.completedWorkouts is not None:
        progress.completed_workouts = request.completedWorkouts
    if request.streak is not None:
        progress.streak = request.streak
    if request.totalWorkoutsDone is not None:
        progress.total_workouts_done = request.totalWorkoutsDone
    progress.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(progress)
    return {
        "progress": {
            "id": progress.id,
            "userId": progress.user_id,
            "weights": progress.weights or [],
            "completedWorkouts": progress.completed_workouts or [],
            "streak": progress.streak,
            "totalWorkoutsDone": progress.total_workouts_done,
            "updatedAt": progress.updated_at.isoformat()
        }
    }
def update_streak(user_id: str, db: Session):
    """Update streak based on consecutive daily logs"""
    from datetime import timedelta
    logs = db.query(DailyLog).filter(DailyLog.user_id == user_id).order_by(DailyLog.date.desc()).all()
    if not logs:
        return
    streak = 1
    today = datetime.utcnow().date()
    last_log_date = datetime.strptime(logs[0].date, "%Y-%m-%d").date()
    if last_log_date == today or last_log_date == today - timedelta(days=1):
        for i in range(1, len(logs)):
            current_date = datetime.strptime(logs[i].date, "%Y-%m-%d").date()
            previous_date = datetime.strptime(logs[i-1].date, "%Y-%m-%d").date()
            if (previous_date - current_date).days == 1:
                streak += 1
            else:
                break
    else:
        streak = 0
    progress = db.query(ProgressData).filter(ProgressData.user_id == user_id).first()
    if progress:
        progress.streak = streak
        progress.updated_at = datetime.utcnow()
        db.commit()
@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "tracking-service"}
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8004)
