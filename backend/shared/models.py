from sqlalchemy import Column, String, Float, Integer, DateTime, JSON, ForeignKey
from datetime import datetime
from shared.database import Base
class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=True)
    email = Column(String, unique=True, nullable=False, index=True)
    password_hash = Column(String, nullable=False)
    height = Column(Float, nullable=False)
    current_weight = Column(Float, nullable=False)
    target_weight = Column(Float, nullable=False)
    activity_level = Column(String, nullable=False)
    daily_caloric_goal = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
class ActivePlan(Base):
    __tablename__ = "active_plans"
    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    plan_id = Column(String, nullable=False)
    plan_data = Column(JSON, nullable=True)  # Store full plan object
    start_date = Column(DateTime, default=datetime.utcnow)
    status = Column(String, default="active")
    created_at = Column(DateTime, default=datetime.utcnow)
class Favorite(Base):
    __tablename__ = "favorites"
    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    plan_id = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
class DailyLog(Base):
    __tablename__ = "daily_logs"
    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    date = Column(String, nullable=False, index=True)  # YYYY-MM-DD
    workouts = Column(JSON, default=list)
    meals = Column(JSON, default=list)
    water = Column(Integer, default=0)
    weight = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
class ProgressData(Base):
    __tablename__ = "progress_data"
    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("users.id"), unique=True, nullable=False)
    weights = Column(JSON, default=list)
    completed_workouts = Column(JSON, default=list)
    streak = Column(Integer, default=0)
    total_workouts_done = Column(Integer, default=0)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
class Photo(Base):
    __tablename__ = "photos"
    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    type = Column(String, nullable=False)  # 'before' or 'after'
    filename = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
