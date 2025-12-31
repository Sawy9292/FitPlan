from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import sys
import os
import uuid
from datetime import datetime
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from shared.database import get_db, init_db
from shared.models import User, ProgressData
from shared.schemas import RegisterRequest, LoginRequest, AuthResponse, UserResponse
from shared.jwt_utils import hash_password, verify_password, create_access_token, get_current_user_id
app = FastAPI(title="Auth Service", version="1.0.0")
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
@app.post("/register", response_model=AuthResponse)
def register(request: RegisterRequest, db: Session = Depends(get_db)):
    """Register a new user"""
    existing_user = db.query(User).filter(User.email == request.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    user_id = f"user_{uuid.uuid4().hex[:12]}"
    new_user = User(
        id=user_id,
        first_name=request.firstName,
        last_name=request.lastName or "",
        email=request.email,
        password_hash=hash_password(request.password),
        height=request.height,
        current_weight=request.currentWeight,
        target_weight=request.targetWeight,
        activity_level=request.activityLevel,
        daily_caloric_goal=request.dailyCaloricGoal,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    db.add(new_user)
    progress_id = f"progress_{uuid.uuid4().hex[:12]}"
    progress_data = ProgressData(
        id=progress_id,
        user_id=user_id,
        weights=[{"date": datetime.utcnow().strftime("%Y-%m-%d"), "weight": request.currentWeight}],
        completed_workouts=[],
        streak=0,
        total_workouts_done=0
    )
    db.add(progress_data)
    db.commit()
    db.refresh(new_user)
    token = create_access_token(new_user.id, new_user.email)
    user_response = UserResponse(
        id=new_user.id,
        firstName=new_user.first_name,
        lastName=new_user.last_name,
        email=new_user.email,
        height=new_user.height,
        currentWeight=new_user.current_weight,
        targetWeight=new_user.target_weight,
        activityLevel=new_user.activity_level,
        dailyCaloricGoal=new_user.daily_caloric_goal,
        createdAt=new_user.created_at
    )
    return AuthResponse(user=user_response, token=token)
@app.post("/login", response_model=AuthResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    """Login user"""
    user = db.query(User).filter(User.email == request.email).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    if not verify_password(request.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token(user.id, user.email)
    user_response = UserResponse(
        id=user.id,
        firstName=user.first_name,
        lastName=user.last_name,
        email=user.email,
        height=user.height,
        currentWeight=user.current_weight,
        targetWeight=user.target_weight,
        activityLevel=user.activity_level,
        dailyCaloricGoal=user.daily_caloric_goal,
        createdAt=user.created_at
    )
    return AuthResponse(user=user_response, token=token)
@app.post("/logout")
def logout():
    """Logout user (client-side token removal)"""
    return {"message": "Logged out successfully"}
@app.get("/me", response_model=UserResponse)
def get_current_user(current_user_id: str = Depends(get_current_user_id), db: Session = Depends(get_db)):
    """Get current authenticated user"""
    user = db.query(User).filter(User.id == current_user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return UserResponse(
        id=user.id,
        firstName=user.first_name,
        lastName=user.last_name,
        email=user.email,
        height=user.height,
        currentWeight=user.current_weight,
        targetWeight=user.target_weight,
        activityLevel=user.activity_level,
        dailyCaloricGoal=user.daily_caloric_goal,
        createdAt=user.created_at
    )
@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "auth-service"}
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
