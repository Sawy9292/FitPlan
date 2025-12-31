from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import StreamingResponse
import httpx
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
app = FastAPI(title="API Gateway", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
uploads_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "uploads")
app.mount("/uploads", StaticFiles(directory=uploads_path), name="uploads")
AUTH_SERVICE_URL = "http://localhost:8001"
USER_SERVICE_URL = "http://localhost:8002"
PLAN_SERVICE_URL = "http://localhost:8003"
TRACKING_SERVICE_URL = "http://localhost:8004"
async def forward_request(service_url: str, path: str, request: Request):
    """Forward request to microservice"""
    body = None
    if request.method in ["POST", "PUT", "PATCH"]:
        body = await request.body()
    async with httpx.AsyncClient() as client:
        try:
            response = await client.request(
                method=request.method,
                url=f"{service_url}{path}",
                params=request.query_params,
                headers={k: v for k, v in request.headers.items() if k.lower() not in ["host", "connection"]},
                content=body,
                timeout=30.0
            )
            return StreamingResponse(
                response.iter_bytes(),
                status_code=response.status_code,
                headers=dict(response.headers)
            )
        except httpx.RequestError as e:
            raise HTTPException(status_code=503, detail=f"Service unavailable: {str(e)}")
@app.post("/api/auth/register")
async def register(request: Request):
    """Register user"""
    return await forward_request(AUTH_SERVICE_URL, "/register", request)
@app.post("/api/auth/login")
async def login(request: Request):
    """Login user"""
    return await forward_request(AUTH_SERVICE_URL, "/login", request)
@app.post("/api/auth/logout")
async def logout(request: Request):
    """Logout user"""
    return await forward_request(AUTH_SERVICE_URL, "/logout", request)
@app.get("/api/auth/me")
async def get_me(request: Request):
    """Get current user"""
    return await forward_request(AUTH_SERVICE_URL, "/me", request)
@app.get("/api/users/{user_id}")
async def get_user(user_id: str, request: Request):
    """Get user"""
    return await forward_request(USER_SERVICE_URL, f"/users/{user_id}", request)
@app.put("/api/users/{user_id}")
async def update_user(user_id: str, request: Request):
    """Update user"""
    return await forward_request(USER_SERVICE_URL, f"/users/{user_id}", request)
@app.delete("/api/users/{user_id}")
async def delete_user(user_id: str, request: Request):
    """Delete user"""
    return await forward_request(USER_SERVICE_URL, f"/users/{user_id}", request)
@app.get("/api/users/{user_id}/favorites")
async def get_favorites(user_id: str, request: Request):
    """Get favorites"""
    return await forward_request(USER_SERVICE_URL, f"/users/{user_id}/favorites", request)
@app.post("/api/users/{user_id}/favorites")
async def add_favorite(user_id: str, request: Request):
    """Add favorite"""
    return await forward_request(USER_SERVICE_URL, f"/users/{user_id}/favorites", request)
@app.delete("/api/users/{user_id}/favorites/{plan_id}")
async def remove_favorite(user_id: str, plan_id: str, request: Request):
    """Remove favorite"""
    return await forward_request(USER_SERVICE_URL, f"/users/{user_id}/favorites/{plan_id}", request)
@app.post("/api/users/{user_id}/photos")
async def upload_photo(user_id: str, request: Request):
    """Upload photo"""
    return await forward_request(USER_SERVICE_URL, f"/users/{user_id}/photos", request)
@app.get("/api/users/{user_id}/photos")
async def get_photos(user_id: str, request: Request):
    """Get photos"""
    return await forward_request(USER_SERVICE_URL, f"/users/{user_id}/photos", request)
@app.delete("/api/users/{user_id}/photos/{photo_id}")
async def delete_photo(user_id: str, photo_id: str, request: Request):
    """Delete photo"""
    return await forward_request(USER_SERVICE_URL, f"/users/{user_id}/photos/{photo_id}", request)
@app.put("/api/users/{user_id}/email")
async def update_email(user_id: str, request: Request):
    """Update user email"""
    return await forward_request(USER_SERVICE_URL, f"/users/{user_id}/email", request)
@app.put("/api/users/{user_id}/password")
async def update_password(user_id: str, request: Request):
    """Update user password"""
    return await forward_request(USER_SERVICE_URL, f"/users/{user_id}/password", request)
@app.get("/api/plans")
async def get_plans(request: Request):
    """Get all plans"""
    return await forward_request(PLAN_SERVICE_URL, "/plans", request)
@app.get("/api/plans/{plan_id}")
async def get_plan(plan_id: str, request: Request):
    """Get plan by ID"""
    return await forward_request(PLAN_SERVICE_URL, f"/plans/{plan_id}", request)
@app.get("/api/users/{user_id}/active-plans")
async def get_active_plans(user_id: str, request: Request):
    """Get active plans"""
    return await forward_request(PLAN_SERVICE_URL, f"/users/{user_id}/active-plans", request)
@app.post("/api/users/{user_id}/active-plans")
async def add_active_plan(user_id: str, request: Request):
    """Add active plan"""
    return await forward_request(PLAN_SERVICE_URL, f"/users/{user_id}/active-plans", request)
@app.delete("/api/users/{user_id}/active-plans/{plan_id}")
async def remove_active_plan(user_id: str, plan_id: str, request: Request):
    """Remove active plan"""
    return await forward_request(PLAN_SERVICE_URL, f"/users/{user_id}/active-plans/{plan_id}", request)
@app.get("/api/foods")
async def get_foods(request: Request):
    """Get all foods"""
    return await forward_request(PLAN_SERVICE_URL, "/foods", request)
@app.get("/api/foods/search")
async def search_foods(request: Request):
    """Search foods"""
    return await forward_request(PLAN_SERVICE_URL, "/foods/search", request)
@app.get("/api/users/{user_id}/logs")
async def get_logs(user_id: str, request: Request):
    """Get daily logs"""
    return await forward_request(TRACKING_SERVICE_URL, f"/users/{user_id}/logs", request)
@app.get("/api/users/{user_id}/logs/{date}")
async def get_log(user_id: str, date: str, request: Request):
    """Get daily log by date"""
    return await forward_request(TRACKING_SERVICE_URL, f"/users/{user_id}/logs/{date}", request)
@app.post("/api/users/{user_id}/logs")
async def create_log(user_id: str, request: Request):
    """Create daily log"""
    return await forward_request(TRACKING_SERVICE_URL, f"/users/{user_id}/logs", request)
@app.put("/api/users/{user_id}/logs/{date}")
async def update_log(user_id: str, date: str, request: Request):
    """Update daily log"""
    return await forward_request(TRACKING_SERVICE_URL, f"/users/{user_id}/logs/{date}", request)
@app.delete("/api/users/{user_id}/logs/{date}")
async def delete_log(user_id: str, date: str, request: Request):
    """Delete daily log"""
    return await forward_request(TRACKING_SERVICE_URL, f"/users/{user_id}/logs/{date}", request)
@app.get("/api/users/{user_id}/progress")
async def get_progress(user_id: str, request: Request):
    """Get progress data"""
    return await forward_request(TRACKING_SERVICE_URL, f"/users/{user_id}/progress", request)
@app.put("/api/users/{user_id}/progress")
async def update_progress(user_id: str, request: Request):
    """Update progress data"""
    return await forward_request(TRACKING_SERVICE_URL, f"/users/{user_id}/progress", request)
@app.get("/api/health")
async def health_check():
    """API Gateway health check"""
    services_status = {
        "gateway": "healthy",
        "auth_service": "unknown",
        "user_service": "unknown",
        "plan_service": "unknown",
        "tracking_service": "unknown"
    }
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(f"{AUTH_SERVICE_URL}/health", timeout=2.0)
            services_status["auth_service"] = "healthy" if response.status_code == 200 else "unhealthy"
        except:
            services_status["auth_service"] = "unhealthy"
        try:
            response = await client.get(f"{USER_SERVICE_URL}/health", timeout=2.0)
            services_status["user_service"] = "healthy" if response.status_code == 200 else "unhealthy"
        except:
            services_status["user_service"] = "unhealthy"
        try:
            response = await client.get(f"{PLAN_SERVICE_URL}/health", timeout=2.0)
            services_status["plan_service"] = "healthy" if response.status_code == 200 else "unhealthy"
        except:
            services_status["plan_service"] = "unhealthy"
        try:
            response = await client.get(f"{TRACKING_SERVICE_URL}/health", timeout=2.0)
            services_status["tracking_service"] = "healthy" if response.status_code == 200 else "unhealthy"
        except:
            services_status["tracking_service"] = "unhealthy"
    return services_status
@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "FitPlan API Gateway",
        "version": "1.0.0",
        "services": {
            "auth": f"{AUTH_SERVICE_URL}",
            "user": f"{USER_SERVICE_URL}",
            "plan": f"{PLAN_SERVICE_URL}",
            "tracking": f"{TRACKING_SERVICE_URL}"
        }
    }
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
