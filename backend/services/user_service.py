from fastapi import FastAPI, HTTPException, Depends, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
import sys
import os
import uuid
from datetime import datetime
import bcrypt
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from shared.database import get_db, init_db
from shared.models import User, Favorite, Photo
from shared.schemas import UserResponse, UpdateUserRequest, FavoriteRequest, PhotoResponse, UpdateEmailRequest, UpdatePasswordRequest
from shared.jwt_utils import get_current_user_id
app = FastAPI(title="User Service", version="1.0.0")
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
@app.get("/users/{user_id}", response_model=UserResponse)
def get_user(user_id: str, current_user_id: str = Depends(get_current_user_id), db: Session = Depends(get_db)):
    """Get user by ID"""
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Unauthorized")
    user = db.query(User).filter(User.id == user_id).first()
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
@app.put("/users/{user_id}", response_model=UserResponse)
def update_user(user_id: str, request: UpdateUserRequest, current_user_id: str = Depends(get_current_user_id), db: Session = Depends(get_db)):
    """Update user"""
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Unauthorized")
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if request.firstName is not None:
        user.first_name = request.firstName
    if request.lastName is not None:
        user.last_name = request.lastName
    if request.height is not None:
        user.height = request.height
    if request.currentWeight is not None:
        user.current_weight = request.currentWeight
    if request.targetWeight is not None:
        user.target_weight = request.targetWeight
    if request.activityLevel is not None:
        user.activity_level = request.activityLevel
    if request.dailyCaloricGoal is not None:
        user.daily_caloric_goal = request.dailyCaloricGoal
    user.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(user)
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
@app.delete("/users/{user_id}")
def delete_user(user_id: str, current_user_id: str = Depends(get_current_user_id), db: Session = Depends(get_db)):
    """Delete user"""
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Unauthorized")
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully"}
@app.get("/users/{user_id}/favorites")
def get_favorites(user_id: str, current_user_id: str = Depends(get_current_user_id), db: Session = Depends(get_db)):
    """Get user's favorite plans"""
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Unauthorized")
    favorites = db.query(Favorite).filter(Favorite.user_id == user_id).all()
    return {"favorites": [fav.plan_id for fav in favorites]}
@app.post("/users/{user_id}/favorites")
def add_favorite(user_id: str, request: FavoriteRequest, current_user_id: str = Depends(get_current_user_id), db: Session = Depends(get_db)):
    """Add plan to favorites"""
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Unauthorized")
    existing = db.query(Favorite).filter(
        Favorite.user_id == user_id,
        Favorite.plan_id == request.planId
    ).first()
    if existing:
        return {"favorites": [fav.plan_id for fav in db.query(Favorite).filter(Favorite.user_id == user_id).all()]}
    favorite_id = f"fav_{uuid.uuid4().hex[:12]}"
    favorite = Favorite(
        id=favorite_id,
        user_id=user_id,
        plan_id=request.planId,
        created_at=datetime.utcnow()
    )
    db.add(favorite)
    db.commit()
    favorites = db.query(Favorite).filter(Favorite.user_id == user_id).all()
    return {"favorites": [fav.plan_id for fav in favorites]}
@app.delete("/users/{user_id}/favorites/{plan_id}")
def remove_favorite(user_id: str, plan_id: str, current_user_id: str = Depends(get_current_user_id), db: Session = Depends(get_db)):
    """Remove plan from favorites"""
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Unauthorized")
    favorite = db.query(Favorite).filter(
        Favorite.user_id == user_id,
        Favorite.plan_id == plan_id
    ).first()
    if favorite:
        db.delete(favorite)
        db.commit()
    favorites = db.query(Favorite).filter(Favorite.user_id == user_id).all()
    return {"favorites": [fav.plan_id for fav in favorites]}
@app.post("/users/{user_id}/photos", response_model=PhotoResponse)
async def upload_photo(
    user_id: str,
    type: str = Form(...),
    photo: UploadFile = File(...),
    date: str = Form(None),  # Optional custom date
    current_user_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    """Upload progress photo"""
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Unauthorized")
    content = await photo.read()
    if len(content) > 5 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File size exceeds 5MB")
    upload_dir = os.path.join("uploads", "photos", user_id)
    os.makedirs(upload_dir, exist_ok=True)
    photo_id = uuid.uuid4().hex[:12]
    extension = photo.filename.split(".")[-1] if "." in photo.filename else "jpg"
    filename = f"{photo_id}.{extension}"
    file_path = os.path.join(upload_dir, filename)
    with open(file_path, "wb") as f:
        f.write(content)
    if date:
        try:
            from datetime import datetime as dt
            parsed_date = dt.strptime(date, "%Y-%m-%d")
            created_at = parsed_date.replace(hour=12, minute=0, second=0, microsecond=0)
        except ValueError:
            created_at = datetime.utcnow()
    else:
        created_at = datetime.utcnow()
    db_photo = Photo(
        id=f"photo_{photo_id}",
        user_id=user_id,
        type=type,
        filename=filename,
        file_path=file_path,
        created_at=created_at
    )
    db.add(db_photo)
    db.commit()
    db.refresh(db_photo)
    return PhotoResponse(
        id=db_photo.id,
        userId=db_photo.user_id,
        type=db_photo.type,
        url=f"http://localhost:8000/uploads/photos/{user_id}/{filename}",
        createdAt=db_photo.created_at
    )
@app.get("/users/{user_id}/photos")
def get_photos(user_id: str, type: str = None, current_user_id: str = Depends(get_current_user_id), db: Session = Depends(get_db)):
    """Get user's photos"""
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Unauthorized")
    query = db.query(Photo).filter(Photo.user_id == user_id)
    if type:
        query = query.filter(Photo.type == type)
    photos = query.order_by(Photo.created_at.desc()).all()
    result = {"before": [], "after": [], "profile": []}
    for photo in photos:
        photo_data = {
            "id": photo.id,
            "url": f"http://localhost:8000/uploads/photos/{user_id}/{photo.filename}",
            "createdAt": photo.created_at.isoformat()
        }
        if photo.type in result:
            result[photo.type].append(photo_data)
        else:
            result[photo.type] = [photo_data]
    return {"photos": result}
@app.delete("/users/{user_id}/photos/{photo_id}")
def delete_photo(user_id: str, photo_id: str, current_user_id: str = Depends(get_current_user_id), db: Session = Depends(get_db)):
    """Delete user's photo"""
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Unauthorized")
    photo = db.query(Photo).filter(Photo.id == photo_id, Photo.user_id == user_id).first()
    if not photo:
        raise HTTPException(status_code=404, detail="Photo not found")
    try:
        if os.path.exists(photo.file_path):
            os.remove(photo.file_path)
    except Exception as e:
        print(f"Warning: Could not delete file {photo.file_path}: {e}")
    db.delete(photo)
    db.commit()
    return {"message": "Photo deleted successfully"}
@app.put("/users/{user_id}/email")
def update_email(user_id: str, request: UpdateEmailRequest, current_user_id: str = Depends(get_current_user_id), db: Session = Depends(get_db)):
    """Update user email"""
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Unauthorized")
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    new_email = request.email
    existing = db.query(User).filter(User.email == new_email, User.id != user_id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already in use")
    user.email = new_email
    user.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(user)
    return {"message": "Email updated successfully", "email": user.email}
@app.put("/users/{user_id}/password")
def update_password(user_id: str, request: UpdatePasswordRequest, current_user_id: str = Depends(get_current_user_id), db: Session = Depends(get_db)):
    """Update user password"""
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Unauthorized")
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    current_password = request.currentPassword
    new_password = request.newPassword
    if len(new_password) > 72:
        raise HTTPException(status_code=400, detail="New password is too long (max 72 characters)")
    try:
        password_bytes = current_password.encode('utf-8')
        hash_bytes = user.password_hash.encode('utf-8')
        if not bcrypt.checkpw(password_bytes, hash_bytes):
            raise HTTPException(status_code=400, detail="Current password is incorrect")
        new_password_bytes = new_password.encode('utf-8')
        new_hash = bcrypt.hashpw(new_password_bytes, bcrypt.gensalt())
        user.password_hash = new_hash.decode('utf-8')
        user.updated_at = datetime.utcnow()
        db.commit()
        return {"message": "Password updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        print(f"Password change error: {e}")
        raise HTTPException(status_code=500, detail="Failed to change password")
@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "user-service"}
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)
