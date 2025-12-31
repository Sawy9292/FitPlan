from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
class RegisterRequest(BaseModel):
    email: str
    password: str
    firstName: str
    lastName: Optional[str] = ""
    height: float
    currentWeight: float
    targetWeight: float
    activityLevel: str
    dailyCaloricGoal: int
class LoginRequest(BaseModel):
    email: str
    password: str
class UserResponse(BaseModel):
    id: str
    firstName: str
    lastName: str
    email: str
    height: float
    currentWeight: float
    targetWeight: float
    activityLevel: str
    dailyCaloricGoal: int
    createdAt: datetime
    class Config:
        from_attributes = True
class AuthResponse(BaseModel):
    user: UserResponse
    token: str
class UpdateUserRequest(BaseModel):
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    height: Optional[float] = None
    currentWeight: Optional[float] = None
    targetWeight: Optional[float] = None
    activityLevel: Optional[str] = None
    dailyCaloricGoal: Optional[int] = None
class UpdateEmailRequest(BaseModel):
    email: str
class UpdatePasswordRequest(BaseModel):
    currentPassword: str
    newPassword: str
class FavoriteRequest(BaseModel):
    planId: str
class ActivityDTO(BaseModel):
    name: str
    duration: Optional[str] = None
    sets: Optional[str] = None
    reps: Optional[str] = None
    calories: Optional[str] = None
class DayScheduleDTO(BaseModel):
    day: str
    activities: List[ActivityDTO]
class VideoDTO(BaseModel):
    title: Optional[str] = None
    youtubeUrl: str
class NutritionDTO(BaseModel):
    calories: int
    protein: int
    carbs: int
    fat: int
class MealOptionDTO(BaseModel):
    name: str
    time: str
    calories: int
    ingredients: str
class PlanResponse(BaseModel):
    id: str
    name: str
    type: str
    description: str
    fullDescription: Optional[str] = None
    duration: str
    difficulty: str
    equipment: Optional[str] = None
    goals: List[str]
    includes: Optional[List[str]] = None
    pdfUrl: Optional[str] = None
    weeklySchedule: Optional[List[DayScheduleDTO]] = None
    videos: Optional[List[VideoDTO]] = None
    dietType: Optional[str] = None
    nutrition: Optional[NutritionDTO] = None
    mealOptions: Optional[List[MealOptionDTO]] = None
class ActivePlanRequest(BaseModel):
    planId: str
class ActivePlanResponse(BaseModel):
    id: str
    userId: str
    planId: str
    plan: PlanResponse
    startDate: datetime
    status: str
class WorkoutLogDTO(BaseModel):
    completed: bool
    activityIndex: Optional[int] = None
    activityName: Optional[str] = None
class MealLogDTO(BaseModel):
    name: str
    calories: int
    protein: int
    carbs: int
    fat: int
class DailyLogRequest(BaseModel):
    date: str
    workouts: List[WorkoutLogDTO]
    meals: List[MealLogDTO]
    water: int
    weight: Optional[float] = None
class DailyLogResponse(BaseModel):
    id: str
    userId: str
    date: str
    workouts: List[dict]
    meals: List[dict]
    water: int
    weight: Optional[float] = None
    createdAt: datetime
    updatedAt: datetime
class WeightEntryDTO(BaseModel):
    date: str
    weight: float
class ProgressDataRequest(BaseModel):
    weights: Optional[List[WeightEntryDTO]] = None
    completedWorkouts: Optional[List[dict]] = None
    streak: Optional[int] = None
    totalWorkoutsDone: Optional[int] = None
class ProgressDataResponse(BaseModel):
    id: str
    userId: str
    weights: List[dict]
    completedWorkouts: List[dict]
    streak: int
    totalWorkoutsDone: int
    updatedAt: datetime
class FoodResponse(BaseModel):
    id: int
    name: str
    calories: int
    protein: int
    carbs: int
    fat: int
    category: str
class PhotoResponse(BaseModel):
    id: str
    userId: str
    type: str
    url: str
    createdAt: datetime
