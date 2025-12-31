console.log('[PAGES.JS] Loading pages.js file...');
async function getHomeHTML() {
    return `
        <div class="hero">
            <div class="container">
                <h1 class="hero-title">Transform Your Body & Mind</h1>
                <p class="hero-subtitle">Join thousands of users achieving their fitness goals with personalized workout and nutrition plans</p>
                <div class="hero-actions">
                    <button class="btn btn-secondary btn-lg" onclick="Router.navigate('register')">Get Started Free</button>
                    <button class="btn btn-outline btn-lg" style="color: white; border-color: white;" onclick="Router.navigate('browse')">Browse Plans</button>
                </div>
            </div>
        </div>
        <div class="container" style="margin-top: 4rem;">
            <h2 class="section-title text-center">Why Choose FitPlan?</h2>
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-value">500+</div>
                    <div class="stat-label">Workout Plans</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">300+</div>
                    <div class="stat-label">Meal Plans</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">50K+</div>
                    <div class="stat-label">Active Users</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">24/7</div>
                    <div class="stat-label">Support</div>
                </div>
            </div>
        </div>
    `;
}
async function getLoginHTML() {
    return `
        <div class="container container-sm" style="margin-top: 4rem;">
            <div class="card" style="max-width: 450px; margin: 0 auto;">
                <h2 class="card-title text-center" style="margin-bottom: 2rem;">Welcome Back</h2>
                <form id="login-form">
                    <div class="form-group">
                        <label class="form-label">Email</label>
                        <input type="email" id="email" class="form-input" placeholder="you@example.com" autocomplete="email" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Password</label>
                        <input type="password" id="password" class="form-input" placeholder="••••••••" autocomplete="current-password" required>
                    </div>
                    <div class="form-group" style="display: flex; align-items: center; margin-top: 0.75rem;">
                        <input type="checkbox" id="remember-me" style="width: auto; margin-right: 0.5rem; cursor: pointer;">
                        <label for="remember-me" style="margin: 0; cursor: pointer; user-select: none; color: var(--gray-700);">Remember me for 30 days</label>
                    </div>
                    <div id="error-message" class="form-error hidden"></div>
                    <button type="submit" class="btn btn-primary btn-lg" style="width: 100%; margin-top: 1rem;">Log In</button>
                </form>
                <p class="text-center" style="margin-top: 1.5rem; color: var(--gray-600);">
                    Don't have an account? <a href="#" onclick="Router.navigate('register'); return false;" style="color: var(--primary); font-weight: 600;">Sign up</a>
                </p>
            </div>
        </div>
    `;
}
async function getRegisterHTML() {
    return `
        <div class="container container-md" style="margin-top: 4rem;">
            <div class="card" style="max-width: 600px; margin: 0 auto;">
                <h2 class="card-title text-center" style="margin-bottom: 2rem;">Create Your Account</h2>
                <form id="register-form">
                    <div class="grid grid-cols-2" style="gap: 1rem;">
                        <div class="form-group">
                            <label class="form-label">Email</label>
                            <input type="email" id="reg-email" class="form-input" autocomplete="email" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Password</label>
                            <input type="password" id="reg-password" class="form-input" autocomplete="new-password" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Confirm Password</label>
                        <input type="password" id="reg-confirm" class="form-input" autocomplete="new-password" required>
                    </div>
                    <h3 style="margin: 2rem 0 1rem; font-size: 1.125rem; font-weight: 600;">Your Goals</h3>
                    <div class="grid grid-cols-2" style="gap: 1rem;">
                        <div class="form-group">
                            <label class="form-label">Height (cm)</label>
                            <input type="number" id="height" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Current Weight (kg)</label>
                            <input type="number" id="weight" class="form-input" step="0.1" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Target Weight (kg)</label>
                            <input type="number" id="target-weight" class="form-input" step="0.1" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Activity Level</label>
                            <select id="activity-level" class="form-select" required>
                                <option value="sedentary">Sedentary</option>
                                <option value="light">Light Activity</option>
                                <option value="moderate" selected>Moderate</option>
                                <option value="very">Very Active</option>
                                <option value="extra">Extra Active</option>
                            </select>
                        </div>
                    </div>
                    <div id="error-message" class="form-error hidden"></div>
                    <button type="submit" class="btn btn-primary btn-lg" style="width: 100%; margin-top: 2rem;">Create Account</button>
                </form>
                <p class="text-center" style="margin-top: 1.5rem; color: var(--gray-600);">
                    Already have an account? <a href="#" onclick="Router.navigate('login'); return false;" style="color: var(--primary); font-weight: 600;">Log in</a>
                </p>
            </div>
        </div>
    `;
}
async function getBrowseHTML() {
    const user = Storage.getUser();
    return `
        <div class="container" style="margin-top: 2rem;">
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h1 class="section-title" style="margin-bottom: 0.5rem;">Fitness & Meal Plans</h1>
                    <p class="section-subtitle" style="margin-bottom: 0;">Choose from our expert-crafted plans</p>
                </div>
            </div>
            <!-- Search Bar -->
            <div class="form-group" style="margin-bottom: 1.5rem;">
                <input type="text" id="plan-search" class="form-input" placeholder="🔍 Search plans by name..." onkeyup="handlePlanSearch()" style="font-size: 1rem; padding: 0.75rem 1rem;">
            </div>
            <!-- Filter Bar -->
            <div class="card" style="padding: 1.5rem; margin-bottom: 2rem;">
                <h3 style="font-weight: 600; margin-bottom: 1rem; font-size: 1rem; color: var(--gray-700);">Filter Plans</h3>
                <!-- Plan Type Filter -->
                <div style="margin-bottom: 1.5rem;">
                    <label class="form-label" style="margin-bottom: 0.5rem; display: block;">Plan Type</label>
                    <div class="flex gap-3" id="type-filter">
                        <button class="btn btn-primary btn-sm filter-btn active-filter" data-filter-type="type" data-value="all" onclick="applyFilters(this)">All Plans</button>
                        <button class="btn btn-outline btn-sm filter-btn" data-filter-type="type" data-value="workout" onclick="applyFilters(this)">💪 Workouts</button>
                        <button class="btn btn-outline btn-sm filter-btn" data-filter-type="type" data-value="meal" onclick="applyFilters(this)">🍽️ Meal Plans</button>
                    </div>
                </div>
                <!-- Difficulty Filter -->
                <div style="margin-bottom: 1.5rem;">
                    <label class="form-label" style="margin-bottom: 0.5rem; display: block;">Difficulty Level</label>
                    <div class="flex gap-3" id="difficulty-filter">
                        <button class="btn btn-primary btn-sm filter-btn active-filter" data-filter-type="difficulty" data-value="all" onclick="applyFilters(this)">All Levels</button>
                        <button class="btn btn-outline btn-sm filter-btn" data-filter-type="difficulty" data-value="Beginner" onclick="applyFilters(this)">Beginner</button>
                        <button class="btn btn-outline btn-sm filter-btn" data-filter-type="difficulty" data-value="Intermediate" onclick="applyFilters(this)">Intermediate</button>
                        <button class="btn btn-outline btn-sm filter-btn" data-filter-type="difficulty" data-value="Advanced" onclick="applyFilters(this)">Advanced</button>
                    </div>
                </div>
                <!-- Duration Filter -->
                <div style="margin-bottom: 1.5rem;">
                    <label class="form-label" style="margin-bottom: 0.5rem; display: block;">Duration</label>
                    <div class="flex gap-3" id="duration-filter">
                        <button class="btn btn-primary btn-sm filter-btn active-filter" data-filter-type="duration" data-value="all" onclick="applyFilters(this)">Any Duration</button>
                        <button class="btn btn-outline btn-sm filter-btn" data-filter-type="duration" data-value="4 weeks" onclick="applyFilters(this)">4 Weeks</button>
                        <button class="btn btn-outline btn-sm filter-btn" data-filter-type="duration" data-value="8 weeks" onclick="applyFilters(this)">8 Weeks</button>
                        <button class="btn btn-outline btn-sm filter-btn" data-filter-type="duration" data-value="12 weeks" onclick="applyFilters(this)">12 Weeks</button>
                    </div>
                </div>
                <!-- Goals Filter -->
                <div>
                    <label class="form-label" style="margin-bottom: 0.5rem; display: block;">Fitness Goals</label>
                    <div class="flex gap-2 flex-wrap" id="goals-filter">
                        <button class="btn btn-primary btn-sm filter-btn active-filter" data-filter-type="goal" data-value="all" onclick="applyFilters(this)">All Goals</button>
                        <button class="btn btn-outline btn-sm filter-btn" data-filter-type="goal" data-value="weight loss" onclick="applyFilters(this)">Weight Loss</button>
                        <button class="btn btn-outline btn-sm filter-btn" data-filter-type="goal" data-value="muscle gain" onclick="applyFilters(this)">Muscle Gain</button>
                        <button class="btn btn-outline btn-sm filter-btn" data-filter-type="goal" data-value="strength" onclick="applyFilters(this)">Strength</button>
                        <button class="btn btn-outline btn-sm filter-btn" data-filter-type="goal" data-value="endurance" onclick="applyFilters(this)">Endurance</button>
                        <button class="btn btn-outline btn-sm filter-btn" data-filter-type="goal" data-value="flexibility" onclick="applyFilters(this)">Flexibility</button>
                    </div>
                </div>
                <!-- Clear Filters Button -->
                <div style="margin-top: 1.5rem; text-align: right;">
                    <button class="btn btn-ghost btn-sm" onclick="clearAllFilters()">Clear All Filters</button>
                </div>
            </div>
            <!-- Results Count -->
            <div style="margin-bottom: 1rem;">
                <p id="results-count" style="color: var(--gray-600); font-size: 0.875rem;">Loading plans...</p>
            </div>
            <!-- Plans Grid -->
            <div class="grid grid-cols-3" id="plans-container">
                <div class="text-center" style="grid-column: 1 / -1; padding: 3rem;">
                    <div class="spinner" style="margin: 0 auto;"></div>
                    <p style="margin-top: 1rem; color: var(--gray-600);">Loading plans...</p>
                </div>
            </div>
        </div>
    `;
}
function getPlanDetailHTML(planId) {
    console.log('[DEBUG] getPlanDetailHTML called with planId:', planId);
    console.log('[DEBUG] Data._plansCache:', Data._plansCache);
    console.log('[DEBUG] Cache length:', Data._plansCache?.length);
    const plan = Data._plansCache?.find(p => p.id === planId);
    console.log('[DEBUG] Found plan:', plan);
    console.log('[DEBUG] Plan type:', plan?.type);
    console.log('[DEBUG] Has weeklySchedule:', !!plan?.weeklySchedule);
    console.log('[DEBUG] Has mealOptions:', !!plan?.mealOptions);
    console.log('[DEBUG] mealOptions data:', plan?.mealOptions);
    if (!plan) {
        console.error('[ERROR] Plan not found in cache for id:', planId);
        return `
            <div class="container" style="margin-top: 4rem; text-align: center;">
                <h2>Plan Not Found</h2>
                <p style="color: var(--gray-600); margin: 1rem 0;">The plan you're looking for doesn't exist or couldn't be loaded.</p>
                <button class="btn btn-primary mt-4" onclick="Router.navigate('browse')">Back to Browse</button>
            </div>
        `;
    }
    const user = Storage.getUser();
    const isWorkout = plan.type === 'workout';
    try {
        return `
            <div class="container" style="margin-top: 2rem;">
                <button class="btn btn-ghost mb-4" onclick="Router.navigate('browse')">← Back to Plans</button>
                <div class="card">
                    <div class="flex justify-between items-start">
                        <div style="flex: 1;">
                            <div class="flex items-center gap-4 mb-4">
                                <span class="badge ${isWorkout ? 'badge-primary' : 'badge-secondary'}">${plan.type}</span>
                                <span class="tag">⏱ ${plan.duration || 'N/A'}</span>
                                <span class="tag">📊 ${plan.difficulty || 'N/A'}</span>
                            </div>
                            <h1 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem;">${plan.name}</h1>
                            <p style="font-size: 1.125rem; color: var(--gray-600); margin-bottom: 2rem;">${plan.description || ''}</p>
                            <div class="flex gap-3">
                                ${user ? `
                                    <button class="btn btn-primary btn-lg" onclick="startPlan('${plan.id}')">Start This Plan</button>
                                    <button class="btn btn-outline" id="fav-btn-${plan.id}" onclick="toggleFavoritePlan('${plan.id}')">
                                        🤍 Save
                                    </button>
                                ` : `
                                    <button class="btn btn-primary btn-lg" onclick="Router.navigate('register')">Sign Up to Start</button>
                                `}
                            </div>
                        </div>
                        <div style="font-size: 6rem;">${isWorkout ? '💪' : '🍽️'}</div>
                    </div>
                </div>
                ${plan.weeklySchedule && Array.isArray(plan.weeklySchedule) && plan.weeklySchedule.length > 0 ? `
                    <div class="card mt-6">
                        <h2 class="card-title">Weekly Schedule</h2>
                        <div class="grid grid-cols-2 mt-4">
                            ${plan.weeklySchedule.map(day => `
                                <div class="card" style="box-shadow: none; border: 1px solid var(--gray-200);">
                                    <h3 style="font-weight: 600; margin-bottom: 1rem;">${day.day || 'Day'}</h3>
                                    ${day.activities && Array.isArray(day.activities) ? day.activities.map(activity => `
                                        <div style="padding: 0.75rem 0; border-bottom: 1px solid var(--gray-100);">
                                            <div style="font-weight: 500;">${activity.name || 'Exercise'}</div>
                                            <div style="font-size: 0.875rem; color: var(--gray-600); margin-top: 0.25rem;">
                                                ${activity.duration || ''} ${activity.sets && activity.reps ? `${activity.sets}x${activity.reps}` : ''}
                                            </div>
                                        </div>
                                    `).join('') : '<p style="color: var(--gray-600);">No activities scheduled</p>'}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                ${plan.mealOptions && Array.isArray(plan.mealOptions) && plan.mealOptions.length > 0 ? `
                    <div class="card mt-6">
                        <h2 class="card-title">Daily Meal Plan</h2>
                        <div style="margin-top: 1.5rem;">
                            ${plan.mealOptions.map((meal, idx) => {
                                const mealName = meal?.name || 'Meal';
                                const mealTime = meal?.time || '';
                                const mealIngredients = meal?.ingredients || '';
                                const mealCalories = meal?.calories || 0;
                                return `
                                    <div style="padding: 1.5rem; border-bottom: ${idx < plan.mealOptions.length - 1 ? '1px solid var(--gray-200)' : 'none'};">
                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                            <div style="flex: 1;">
                                                <div style="font-weight: 600; margin-bottom: 0.5rem; font-size: 1.125rem; color: var(--gray-900);">
                                                    ${mealTime ? `<span style="color: var(--primary);">${mealTime}</span> - ` : ''}${mealName}
                                                </div>
                                                ${mealIngredients ? `
                                                    <div style="color: var(--gray-600); font-size: 0.875rem; line-height: 1.5;">
                                                        ${mealIngredients}
                                                    </div>
                                                ` : ''}
                                            </div>
                                            <div class="badge badge-primary" style="margin-left: 1rem;">${mealCalories} cal</div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                ` : plan.type === 'meal' ? `
                    <div class="card mt-6">
                        <h2 class="card-title">Daily Meal Plan</h2>
                        <p style="color: var(--gray-600); margin-top: 1rem;">No meal details available for this plan.</p>
                    </div>
                ` : ''}
            </div>
        `;
    } catch (error) {
        console.error('[ERROR] Error rendering plan detail:', error);
        return `
            <div class="container" style="margin-top: 4rem; text-align: center;">
                <h2 style="color: var(--error);">Error Rendering Plan</h2>
                <p style="color: var(--gray-600); margin: 1rem 0;">${error.message}</p>
                <pre style="text-align: left; background: var(--gray-100); padding: 1rem; margin: 1rem auto; max-width: 600px; overflow: auto; border-radius: var(--radius); font-size: 0.875rem;">${error.stack}</pre>
                <button class="btn btn-primary" onclick="Router.navigate('browse')">Back to Browse</button>
            </div>
        `;
    }
}
async function getLoggingHTML() {
    const user = Storage.getUser();
    const today = new Date().toISOString().split('T')[0];
    try {
        const [log, activePlans] = await Promise.all([
            Storage.getDailyLog(user.id, today),
            Storage.getActivePlans(user.id).catch(err => {
                console.error('Error fetching active plans for daily log:', err);
                return [];
            })
        ]);
        console.log('[DEBUG] Daily log - activePlans:', activePlans);
        const dailyLog = {
            date: today,
            workouts: [],
            meals: [],
            water: 0,
            weight: null,
            ...(log || {})
        };
        const activePlanData = activePlans?.[0];
        const activePlan = activePlanData?.plan || activePlanData; // Handle both old and new format
        console.log('[DEBUG] Active plan data:', activePlanData);
        console.log('[DEBUG] Extracted plan:', activePlan);
        return `
            <div class="container" style="margin-top: 2rem;">
                <h1 class="section-title">Daily Log - ${new Date().toLocaleDateString()}</h1>
                <div class="grid grid-cols-2">
                    <!-- Workouts -->
                    <div class="card">
                        <h2 class="card-title">Today's Workout</h2>
                        ${activePlan ? `
                            <div class="badge badge-secondary mb-4">${activePlan.name}</div>
                            <div id="workouts-container">
                                ${activePlan.weeklySchedule && Array.isArray(activePlan.weeklySchedule) && activePlan.weeklySchedule.length > 0 ? (() => {
                                    const dayOfWeek = new Date().getDay();
                                    const daySchedule = activePlan.weeklySchedule[dayOfWeek] || activePlan.weeklySchedule[0];
                                    if (!daySchedule || !daySchedule.activities || daySchedule.activities.length === 0) {
                                        return '<p style="color: var(--gray-600);">No activities scheduled for today</p>';
                                    }
                                    return daySchedule.activities.map((activity, idx) => `
                                        <div style="padding: 1rem; border-bottom: 1px solid var(--gray-200);">
                                            <label style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer;">
                                                <input type="checkbox" data-idx="${idx}" onchange="handleWorkoutCheck(this, ${idx})" ${(dailyLog.workouts && dailyLog.workouts[idx] && dailyLog.workouts[idx].completed) ? 'checked' : ''} 
                                                    style="width: 20px; height: 20px; cursor: pointer;">
                                                <span style="font-weight: 500;">${activity.name}</span>
                                            </label>
                                        </div>
                                    `).join('');
                                })() : '<p style="color: var(--gray-600);">No schedule available for this plan</p>'}
                            </div>
                        ` : '<p style="color: var(--gray-600);">No active workout plan. <a href="#" onclick="Router.navigate(\'browse\'); return false;">Browse plans</a></p>'}
                    </div>
                    <!-- Nutrition & Stats -->
                    <div>
                        <div class="card mb-4">
                            <h2 class="card-title">Meals</h2>
                            <div class="form-group">
                                <input type="text" id="food-search" class="form-input" placeholder="Search foods..." onkeyup="handleFoodSearch()">
                                <div id="food-suggestions" class="hidden" style="margin-top: 0.5rem; background: white; border: 1px solid var(--gray-200); border-radius: var(--radius); max-height: 200px; overflow-y: auto;"></div>
                            </div>
                            <div id="meals-list" style="margin-top: 1rem;">
                                ${dailyLog.meals && dailyLog.meals.length > 0 ? 
                                    dailyLog.meals.map(meal => `
                                        <div style="padding: 0.75rem; border-bottom: 1px solid var(--gray-200);">
                                            <div style="font-weight: 500;">${meal.name}</div>
                                            <div style="font-size: 0.875rem; color: var(--gray-600);">${meal.calories} cal</div>
                                        </div>
                                    `).join('') 
                                    : '<p style="color: var(--gray-600);">No meals logged today</p>'
                                }
                            </div>
                        </div>
                        <div class="card mb-4">
                            <h2 class="card-title">Water Intake</h2>
                            <div style="display: flex; align-items: center; justify-content: center; gap: 2rem; margin-top: 1rem;">
                                <button class="btn btn-outline" onclick="updateWater(-1)" style="width: 50px; height: 50px; padding: 0; font-size: 1.5rem;">−</button>
                                <div style="text-align: center;">
                                    <div id="water-count" style="font-size: 2.5rem; font-weight: 700; color: var(--primary);">${dailyLog.water || 0}</div>
                                    <div style="color: var(--gray-600);">glasses</div>
                                </div>
                                <button class="btn btn-outline" onclick="updateWater(1)" style="width: 50px; height: 50px; padding: 0; font-size: 1.5rem;">+</button>
                            </div>
                        </div>
                        <div class="card">
                            <h2 class="card-title">Body Weight</h2>
                            <div class="form-group" style="margin-top: 1rem;">
                                <input type="number" id="weight-input" class="form-input" placeholder="Enter weight (kg)" step="0.1" value="${dailyLog.weight || ''}">
                            </div>
                        </div>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 2rem;">
                    <button class="btn btn-primary btn-lg" onclick="saveLog()">Save Today's Log</button>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error loading logging page:', error);
        return `
            <div class="container" style="margin-top: 4rem; text-center;">
                <h2>Error Loading Log</h2>
                <p style="color: var(--gray-600); margin: 1rem 0;">${error.message}</p>
                <button class="btn btn-primary" onclick="Router.navigate('logging')">Retry</button>
            </div>
        `;
    }
}
async function generateDashboardHTML(user) {
    try {
        const today = new Date().toISOString().split('T')[0];
        const [todayLog, recentLogs, progressData] = await Promise.all([
            Storage.getDailyLog(user.id, today).catch(() => null),
            Storage.getDailyLogs(user.id).catch(() => []),
            Storage.getProgressData(user.id).catch(() => ({ streak: 0, totalWorkoutsDone: 0 }))
        ]);
        let logs = Array.isArray(recentLogs) ? recentLogs : (recentLogs?.logs || []);
        const last7Days = logs
            .filter(log => {
                const logDate = new Date(log.date);
                const diffDays = (new Date() - logDate) / (1000 * 60 * 60 * 24);
                return diffDays <= 7;
            })
            .sort((a, b) => new Date(b.date) - new Date(a.date));
        const weeklyWorkouts = last7Days.reduce((sum, log) => 
            sum + (log.workouts?.filter(w => w.completed).length || 0), 0);
        const weeklyMeals = last7Days.reduce((sum, log) => 
            sum + (log.meals?.length || 0), 0);
        const weeklyCalories = last7Days.reduce((sum, log) => 
            sum + (log.meals?.reduce((s, m) => s + (m.calories || 0), 0) || 0), 0);
        const avgCaloriesPerDay = weeklyMeals > 0 ? Math.round(weeklyCalories / last7Days.length) : 0;
        const todayWorkouts = todayLog?.workouts?.filter(w => w.completed).length || 0;
        const todayWorkoutsTotal = todayLog?.workouts?.length || 0;
        const todayMeals = todayLog?.meals?.length || 0;
        const todayCalories = todayLog?.meals?.reduce((sum, m) => sum + (m.calories || 0), 0) || 0;
        const todayWater = todayLog?.water || 0;
        const todayWeight = todayLog?.weight || null;
        const calorieGoal = user.dailyCaloricGoal || 2000;
        const caloriePercent = Math.round((todayCalories / calorieGoal) * 100);
        const waterGoal = 8;
        const waterPercent = Math.round((todayWater / waterGoal) * 100);
        return `
            <!-- Dashboard Section -->
            <div class="card" style="background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%); color: white; box-shadow: var(--shadow-xl);">
                <h2 style="margin: 0 0 1.5rem 0; font-size: 1.5rem; font-weight: 700;">📊 Today's Dashboard</h2>
                <!-- Today's Quick Stats -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
                    <div style="background: rgba(255,255,255,0.15); padding: 1rem; border-radius: var(--radius-lg); backdrop-filter: blur(10px);">
                        <div style="font-size: 0.875rem; opacity: 0.9; margin-bottom: 0.25rem;">Workouts</div>
                        <div style="font-size: 1.75rem; font-weight: 700;">${todayWorkouts}/${todayWorkoutsTotal}</div>
                        <div style="font-size: 0.75rem; opacity: 0.8; margin-top: 0.25rem;">${todayWorkoutsTotal > 0 ? Math.round((todayWorkouts/todayWorkoutsTotal)*100) : 0}% Complete</div>
                    </div>
                    <div style="background: rgba(255,255,255,0.15); padding: 1rem; border-radius: var(--radius-lg); backdrop-filter: blur(10px);">
                        <div style="font-size: 0.875rem; opacity: 0.9; margin-bottom: 0.25rem;">Calories</div>
                        <div style="font-size: 1.75rem; font-weight: 700;">${todayCalories}</div>
                        <div style="font-size: 0.75rem; opacity: 0.8; margin-top: 0.25rem;">Goal: ${calorieGoal} (${caloriePercent}%)</div>
                    </div>
                    <div style="background: rgba(255,255,255,0.15); padding: 1rem; border-radius: var(--radius-lg); backdrop-filter: blur(10px);">
                        <div style="font-size: 0.875rem; opacity: 0.9; margin-bottom: 0.25rem;">Water</div>
                        <div style="font-size: 1.75rem; font-weight: 700;">${todayWater} 💧</div>
                        <div style="font-size: 0.75rem; opacity: 0.8; margin-top: 0.25rem;">Goal: ${waterGoal} (${waterPercent}%)</div>
                    </div>
                    <div style="background: rgba(255,255,255,0.15); padding: 1rem; border-radius: var(--radius-lg); backdrop-filter: blur(10px);">
                        <div style="font-size: 0.875rem; opacity: 0.9; margin-bottom: 0.25rem;">Meals Logged</div>
                        <div style="font-size: 1.75rem; font-weight: 700;">${todayMeals}</div>
                        <div style="font-size: 0.75rem; opacity: 0.8; margin-top: 0.25rem;">${todayWeight ? `Weight: ${todayWeight}kg` : 'No weight logged'}</div>
                    </div>
                </div>
                <!-- Week Summary -->
                <div style="background: rgba(255,255,255,0.1); padding: 1.25rem; border-radius: var(--radius-lg); backdrop-filter: blur(10px);">
                    <h3 style="margin: 0 0 1rem 0; font-size: 1.125rem; font-weight: 600;">📅 This Week Summary</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1rem;">
                        <div>
                            <div style="font-size: 0.75rem; opacity: 0.9; margin-bottom: 0.25rem;">Total Workouts</div>
                            <div style="font-size: 1.5rem; font-weight: 700;">${weeklyWorkouts}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.75rem; opacity: 0.9; margin-bottom: 0.25rem;">Meals Logged</div>
                            <div style="font-size: 1.5rem; font-weight: 700;">${weeklyMeals}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.75rem; opacity: 0.9; margin-bottom: 0.25rem;">Avg Calories/Day</div>
                            <div style="font-size: 1.5rem; font-weight: 700;">${avgCaloriesPerDay}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.75rem; opacity: 0.9; margin-bottom: 0.25rem;">Current Streak</div>
                            <div style="font-size: 1.5rem; font-weight: 700;">${progressData.streak || 0} 🔥</div>
                        </div>
                    </div>
                </div>
                <!-- Quick Actions -->
                <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem; flex-wrap: wrap;">
                    <button class="btn" style="background: white; color: var(--primary); flex: 1; min-width: 140px;" onclick="Router.navigate('logging')">
                        ➕ Log Today
                    </button>
                    <button class="btn" style="background: rgba(255,255,255,0.2); color: white; flex: 1; min-width: 140px; backdrop-filter: blur(10px);" onclick="scrollToProgressCharts()">
                        📈 View Progress
                    </button>
                    <button class="btn" style="background: rgba(255,255,255,0.2); color: white; flex: 1; min-width: 140px; backdrop-filter: blur(10px);" onclick="showAchievementsModal()">
                        🏆 Achievements
                    </button>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error generating dashboard:', error);
        return ''; // Return empty if dashboard fails
    }
}
function scrollToProgressCharts() {
    const progressSection = document.getElementById('progress-charts');
    if (progressSection) {
        progressSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        console.log('Progress charts section not found');
    }
}
async function getProfileHTML() {
    const user = Storage.getUser();
    console.log('[PROFILE] getProfileHTML called for user:', user?.id);
    const bustCache = window._photoCacheBust || false;
    if (window._photoCacheBust) {
        console.log('[PROFILE] Cache-busting enabled for this load');
        delete window._photoCacheBust;  // Clear flag after use
    }
    try {
        const [progress, favorites, activePlans, photos] = await Promise.all([
            Storage.getProgressData(user.id),
            Storage.getFavorites(user.id),
            Storage.getActivePlans(user.id).catch(err => {
                console.error('Error fetching active plans:', err);
                return [];
            }),
            Storage.getPhotos(user.id, bustCache).catch(err => {
                console.error('[PROFILE] ✗ Error fetching photos:', err);
                return { photos: { before: [], after: [], profile: [] } };
            })
        ]);
        console.log('[PROFILE] ✓ All data loaded');
        console.log('[PROFILE] Photos response:', JSON.stringify(photos, null, 2));
        console.log('[PROFILE] Profile photos count:', photos?.photos?.profile?.length || 0);
        console.log('[PROFILE] Before photos count:', photos?.photos?.before?.length || 0);
        console.log('[PROFILE] After photos count:', photos?.photos?.after?.length || 0);
        const stats = {
            currentWeight: progress?.weights?.[progress.weights.length - 1]?.weight || user.currentWeight || 0,
            targetWeight: user.targetWeight || 0,
            streak: progress?.streak || 0,
            workouts: progress?.totalWorkoutsDone || 0
        };
        const dashboardHTML = await generateDashboardHTML(user);
        const firstName = user.firstName || '';
        const lastName = user.lastName || '';
        const email = user.email || '';
        const initials = (firstName[0] || '') + (lastName[0] || email[0] || 'U');
        console.log('[DEBUG] User data:', { firstName, lastName, email, initials });
        const profilePhoto = photos?.photos?.profile?.[0];
        const hasPhoto = !!profilePhoto;
        console.log('[PROFILE] Profile photo for avatar:', profilePhoto);
        console.log('[PROFILE] Has photo:', hasPhoto);
        console.log('[PROFILE] Photo URL:', profilePhoto?.url);
        const basePhotoStyle = 'width: 120px; height: 120px; border-radius: 50%; box-shadow: var(--shadow-lg); position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center;';
        const photoStyle = hasPhoto 
            ? `${basePhotoStyle} background-image: url('${profilePhoto.url}'); background-size: cover; background-position: center; background-color: var(--gray-200);`
            : `${basePhotoStyle} background: linear-gradient(135deg, var(--primary), var(--primary-light)); font-size: 3rem; font-weight: 700; color: white;`;
        const allPhotos = [
            ...(photos?.photos?.before || []).map(p => ({ ...p, type: 'before' })),
            ...(photos?.photos?.after || []).map(p => ({ ...p, type: 'after' }))
        ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        console.log('[PROFILE] Gallery photos (before + after):', allPhotos.length);
        console.log('[PROFILE] Gallery photos detail:', allPhotos);
        return `
            <div class="container" style="margin-top: 2rem;">
                <div class="profile-layout">
                    <!-- Left Column: Profile Info -->
                    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                        <!-- Profile Header -->
                        <div class="card">
                            <div class="flex items-center" style="gap: 1.5rem;">
                                <div style="position: relative;">
                                    <div id="profile-photo-container" style="${photoStyle}">
                                        ${hasPhoto ? '' : initials}
                                    </div>
                                    <input type="file" id="profile-picture-input" accept="image/*" style="display: none;" onchange="handleProfilePictureChange(event)">
                                    <button class="btn btn-sm btn-outline" style="margin-top: 0.5rem; width: 100%;" onclick="document.getElementById('profile-picture-input').click()">
                                        Change Picture
                                    </button>
                                </div>
                                <div style="flex: 1;">
                                    <div id="name-display" style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem;">
                                        <h1 class="section-title" style="margin: 0;">${user.firstName} ${user.lastName}</h1>
                                        <button class="btn btn-sm btn-ghost" onclick="editName()" title="Edit name" style="padding: 0.25rem 0.5rem;">
                                            ✏️ Edit
                                        </button>
                                    </div>
                                    <div id="name-edit" style="display: none; margin-bottom: 0.5rem;">
                                        <div style="display: flex; gap: 0.5rem; align-items: center;">
                                            <input type="text" id="edit-first-name" class="form-input" value="${user.firstName}" placeholder="First Name" style="flex: 1;">
                                            <input type="text" id="edit-last-name" class="form-input" value="${user.lastName}" placeholder="Last Name" style="flex: 1;">
                                            <button class="btn btn-sm btn-primary" onclick="saveName()">Save</button>
                                            <button class="btn btn-sm btn-ghost" onclick="cancelNameEdit()">Cancel</button>
                                        </div>
                                    </div>
                                    <div id="email-display" style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.25rem;">
                                        <p style="color: var(--gray-600); font-size: 1rem; margin: 0;">${user.email}</p>
                                        <button class="btn btn-sm btn-ghost" onclick="editEmail()" title="Change email" style="padding: 0.25rem 0.5rem; font-size: 0.875rem;">
                                            Change Email
                                        </button>
                                    </div>
                                    <div id="email-edit" style="display: none; margin-bottom: 0.25rem;">
                                        <div style="display: flex; gap: 0.5rem; align-items: center;">
                                            <input type="email" id="edit-email" class="form-input" value="${user.email}" placeholder="New Email" style="flex: 1;">
                                            <button class="btn btn-sm btn-primary" onclick="saveEmail()">Save</button>
                                            <button class="btn btn-sm btn-ghost" onclick="cancelEmailEdit()">Cancel</button>
                                        </div>
                                    </div>
                                    <p style="color: var(--gray-500); font-size: 0.875rem; margin-top: 0.25rem;">Member since ${new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                                    <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem; flex-wrap: wrap;">
                                        <button class="btn btn-sm btn-outline" onclick="changePassword()">
                                            🔒 Change Password
                                        </button>
                                        <button class="btn btn-sm btn-outline" onclick="requestNotificationPermission()">
                                            🔔 Enable Notifications
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Dashboard -->
                        ${dashboardHTML}
                        <!-- Stats Overview -->
                        <div class="stats-grid">
                            <div class="stat-card">
                                <div class="stat-value">${stats.currentWeight}kg</div>
                                <div class="stat-label">Current Weight</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-value">${stats.targetWeight}kg</div>
                                <div class="stat-label">Target Weight</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-value">${stats.streak}</div>
                                <div class="stat-label">Day Streak</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-value">${stats.workouts}</div>
                                <div class="stat-label">Workouts Done</div>
                            </div>
                        </div>
                        <!-- Progress Charts -->
                        <div class="card">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; gap: 0.5rem; flex-wrap: wrap;">
                                <h2 class="card-title" style="margin: 0;">Progress Overview</h2>
                                <div style="display: flex; gap: 0.5rem;">
                                    <button class="btn btn-sm btn-outline" onclick="showAchievementsModal()">
                                        🏆 Achievements
                                    </button>
                                    <button class="btn btn-sm btn-primary" onclick="exportProgressPDF()">
                                        📄 Export PDF
                                    </button>
                                </div>
                            </div>
                            <div id="progress-charts" style="display: flex; flex-direction: column; gap: 2rem;">
                                <div class="progress-chart-container">
                                    <h3 style="font-size: 1rem; font-weight: 600; margin-bottom: 1rem; color: var(--dark);">Weight Progress</h3>
                                    <canvas id="weight-chart" style="max-height: 200px;"></canvas>
                                </div>
                                <div class="progress-chart-container">
                                    <h3 style="font-size: 1rem; font-weight: 600; margin-bottom: 1rem; color: var(--dark);">Workout Completion</h3>
                                    <canvas id="workout-chart" style="max-height: 200px;"></canvas>
                                </div>
                            </div>
                        </div>
                        <!-- Goals -->
                        <div class="card">
                            <h2 class="card-title">My Goals</h2>
                            <div class="form-group">
                                <label class="form-label">Height (cm)</label>
                                <input type="number" id="height-input" class="form-input" value="${user.height || 170}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Current Weight (kg)</label>
                                <input type="number" id="current-weight-input" class="form-input" value="${stats.currentWeight}" step="0.1">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Target Weight (kg)</label>
                                <input type="number" id="target-weight-input" class="form-input" value="${stats.targetWeight}" step="0.1">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Daily Calorie Goal</label>
                                <input type="number" id="calories-input" class="form-input" value="${user.dailyCaloricGoal || 2000}">
                            </div>
                            <button class="btn btn-primary" onclick="updateUserGoals()">Update Goals</button>
                        </div>
                        <!-- Active Plans -->
                        <div class="card">
                            <h2 class="card-title">Active Plans</h2>
                            ${activePlans && activePlans.length > 0 ? `
                                <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
                                    ${activePlans.map(activePlanItem => {
                                        const plan = activePlanItem.plan || activePlanItem;
                                        const planId = plan.id || activePlanItem.planId;
                                        return `
                                        <div class="card" style="box-shadow: none; border: 1px solid var(--gray-200);">
                                            <div class="flex justify-between items-center">
                                                <div style="flex: 1;">
                                                    <div style="font-weight: 600;">${plan.name || 'Unnamed Plan'}</div>
                                                    <div style="font-size: 0.875rem; color: var(--gray-600);">${plan.type || 'workout'} • ${plan.duration || 'N/A'}</div>
                                                </div>
                                                <div style="display: flex; gap: 0.5rem;">
                                                    <button class="btn btn-sm btn-outline" onclick="Router.navigate('planDetail?id=${planId}')">View</button>
                                                    <button class="btn btn-sm btn-ghost" style="color: var(--error);" onclick="removeActivePlan('${planId}')">Remove</button>
                                                </div>
                                            </div>
                                        </div>
                                    `}).join('')}
                                </div>
                            ` : '<p style="color: var(--gray-600); margin-top: 1rem;">No active plans. <a href="#" onclick="Router.navigate(\'browse\'); return false;">Browse plans</a></p>'}
                            <h3 style="font-weight: 600; margin-top: 2rem; margin-bottom: 1rem;">Saved Plans</h3>
                            ${favorites && favorites.length > 0 ? `
                                <div style="display: flex; flex-direction: column; gap: 1rem;">
                                    ${favorites.slice(0, 3).map(plan => `
                                        <div class="card" style="box-shadow: none; border: 1px solid var(--gray-200);">
                                            <div class="flex justify-between items-center">
                                                <div style="flex: 1;">
                                                    <div style="font-weight: 600;">${plan.name || 'Unnamed Plan'}</div>
                                                    <div style="font-size: 0.875rem; color: var(--gray-600);">${plan.type || 'workout'} • ${plan.duration || 'N/A'}</div>
                                                </div>
                                                <div style="display: flex; gap: 0.5rem;">
                                                    <button class="btn btn-sm btn-outline" onclick="Router.navigate('planDetail?id=${plan.id}')">View</button>
                                                    <button class="btn btn-sm btn-ghost" style="color: var(--error);" onclick="removeFavoriteFromProfile('${plan.id}')">Remove</button>
                                                </div>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : '<p style="color: var(--gray-600);">No saved plans yet</p>'}
                        </div>
                    </div>
                    <!-- Right Column: Photos -->
                    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                        <!-- Upload Photo Section -->
                        <div class="card">
                            <h2 class="card-title">Progress Photos</h2>
                            <p style="color: var(--gray-600); font-size: 0.875rem; margin-bottom: 1rem;">Track your transformation journey</p>
                            <button class="btn btn-primary" style="width: 100%;" onclick="openPhotoUploadModal()">
                                📷 Add Progress Photos
                            </button>
                        </div>
                        <!-- Photo Gallery -->
                        <div class="card">
                            <h3 class="card-title" style="font-size: 1rem; margin-bottom: 1rem;">Your Photos (${allPhotos.length})</h3>
                            ${allPhotos.length > 0 ? `
                                <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                                    ${(() => {
                                        const photosByDate = {};
                                        allPhotos.forEach(photo => {
                                            const dateKey = new Date(photo.createdAt).toLocaleDateString();
                                            if (!photosByDate[dateKey]) {
                                                photosByDate[dateKey] = { before: null, after: null };
                                            }
                                            photosByDate[dateKey][photo.type] = photo;
                                        });
                                        const sortedDates = Object.entries(photosByDate).sort((a, b) => {
                                            return new Date(b[0]) - new Date(a[0]);
                                        });
                                        return sortedDates.map(([date, photos]) => `
                                            <div class="photo-pair-container">
                                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                                                    <h4 style="font-size: 0.875rem; font-weight: 600; color: var(--gray-700);">📅 ${date}</h4>
                                                </div>
                                                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                                                    <!-- Before Photo -->
                                                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                                                        <div style="position: relative; aspect-ratio: 1; border-radius: var(--radius); overflow: hidden; background: var(--gray-100); ${!photos.before ? 'border: 2px dashed var(--gray-300);' : ''}">
                                                            ${photos.before ? `
                                                                <img src="${photos.before.url}" style="width: 100%; height: 100%; object-fit: cover; cursor: pointer;" alt="before photo" onclick="openPhotoModal('${photos.before.url}', 'before', '${photos.before.id}')">
                                                                <button 
                                                                    onclick="event.stopPropagation(); deletePhotoFromGallery('${photos.before.id}', 'before')" 
                                                                    style="position: absolute; top: 0.5rem; right: 0.5rem; background: rgba(220, 38, 38, 0.95); color: white; border: none; border-radius: 50%; width: 28px; height: 28px; cursor: pointer; font-size: 1rem; font-weight: bold; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.2); transition: all 0.2s ease;"
                                                                    onmouseover="this.style.background='rgba(220, 38, 38, 1)'; this.style.transform='scale(1.1)'"
                                                                    onmouseout="this.style.background='rgba(220, 38, 38, 0.95)'; this.style.transform='scale(1)'"
                                                                    title="Delete photo"
                                                                >×</button>
                                                            ` : `
                                                                <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: var(--gray-400);">
                                                                    <span style="font-size: 0.875rem;">No Before Photo</span>
                                                                </div>
                                                            `}
                                                        </div>
                                                        <div style="text-align: center; font-weight: 600; font-size: 0.875rem; color: var(--primary); background: var(--primary-light); padding: 0.375rem; border-radius: var(--radius);">
                                                            📸 BEFORE
                                                        </div>
                                                    </div>
                                                    <!-- After Photo -->
                                                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                                                        <div style="position: relative; aspect-ratio: 1; border-radius: var(--radius); overflow: hidden; background: var(--gray-100); ${!photos.after ? 'border: 2px dashed var(--gray-300);' : ''}">
                                                            ${photos.after ? `
                                                                <img src="${photos.after.url}" style="width: 100%; height: 100%; object-fit: cover; cursor: pointer;" alt="after photo" onclick="openPhotoModal('${photos.after.url}', 'after', '${photos.after.id}')">
                                                                <button 
                                                                    onclick="event.stopPropagation(); deletePhotoFromGallery('${photos.after.id}', 'after')" 
                                                                    style="position: absolute; top: 0.5rem; right: 0.5rem; background: rgba(220, 38, 38, 0.95); color: white; border: none; border-radius: 50%; width: 28px; height: 28px; cursor: pointer; font-size: 1rem; font-weight: bold; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.2); transition: all 0.2s ease;"
                                                                    onmouseover="this.style.background='rgba(220, 38, 38, 1)'; this.style.transform='scale(1.1)'"
                                                                    onmouseout="this.style.background='rgba(220, 38, 38, 0.95)'; this.style.transform='scale(1)'"
                                                                    title="Delete photo"
                                                                >×</button>
                                                            ` : `
                                                                <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: var(--gray-400);">
                                                                    <span style="font-size: 0.875rem;">No After Photo</span>
                                                                </div>
                                                            `}
                                                        </div>
                                                        <div style="text-align: center; font-weight: 600; font-size: 0.875rem; color: var(--success); background: rgba(34, 197, 94, 0.1); padding: 0.375rem; border-radius: var(--radius);">
                                                            ✨ AFTER
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        `).join('');
                                    })()}
                                </div>
                            ` : `
                                <div style="text-align: center; padding: 2rem; color: var(--gray-500);">
                                    <p style="font-size: 2rem; margin-bottom: 0.5rem;">📷</p>
                                    <p>No photos yet</p>
                                    <p style="font-size: 0.875rem;">Start tracking your progress!</p>
                                </div>
                            `}
                        </div>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error loading profile:', error);
        return `
            <div class="container" style="margin-top: 4rem; text-align: center;">
                <h2>Error Loading Profile</h2>
                <p style="color: var(--gray-600); margin: 1rem 0;">${error.message}</p>
                <button class="btn btn-primary" onclick="Router.navigate('profile')">Retry</button>
            </div>
        `;
    }
}
async function initializeProfileCharts() {
    console.log('[CHARTS] Initializing profile charts...');
    const user = Storage.getUser();
    if (!user) return;
    try {
        const logs = await Storage.getDailyLogs(user.id);
        console.log('[CHARTS] Fetched logs:', logs);
        renderWeightChart(logs);
        renderWorkoutChart(logs);
    } catch (error) {
        console.error('[CHARTS] Error initializing charts:', error);
    }
}
function renderWeightChart(logs) {
    const canvas = document.getElementById('weight-chart');
    if (!canvas) {
        console.warn('[CHARTS] Weight chart canvas not found');
        return;
    }
    const ctx = canvas.getContext('2d');
    const user = Storage.getUser();
    const weightData = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const log = logs.find(l => l.date === dateStr);
        if (log && log.weight) {
            weightData.push({
                date: dateStr,
                weight: log.weight,
                dayIndex: 29 - i
            });
        }
    }
    if (weightData.length === 0) {
        ctx.fillStyle = '#9CA3AF';
        ctx.font = '14px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('No weight data yet. Start logging your daily weight!', canvas.width / 2, canvas.height / 2);
        return;
    }
    canvas.width = canvas.offsetWidth;
    canvas.height = 200;
    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    const weights = weightData.map(d => d.weight);
    const minWeight = Math.min(...weights, user.targetWeight) - 2;
    const maxWeight = Math.max(...weights, user.currentWeight) + 2;
    const weightRange = maxWeight - minWeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
        const y = padding + (chartHeight / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);
        ctx.stroke();
        const weight = maxWeight - (weightRange / 4) * i;
        ctx.fillStyle = '#6B7280';
        ctx.font = '12px system-ui';
        ctx.textAlign = 'right';
        ctx.fillText(weight.toFixed(1) + 'kg', padding - 10, y + 4);
    }
    if (user.targetWeight) {
        const targetY = padding + ((maxWeight - user.targetWeight) / weightRange) * chartHeight;
        ctx.strokeStyle = '#10B981';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(padding, targetY);
        ctx.lineTo(canvas.width - padding, targetY);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#10B981';
        ctx.font = 'bold 11px system-ui';
        ctx.textAlign = 'left';
        ctx.fillText('Target', canvas.width - padding + 5, targetY + 4);
    }
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 3;
    ctx.beginPath();
    weightData.forEach((d, i) => {
        const x = padding + (d.dayIndex / 29) * chartWidth;
        const y = padding + ((maxWeight - d.weight) / weightRange) * chartHeight;
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
    weightData.forEach(d => {
        const x = padding + (d.dayIndex / 29) * chartWidth;
        const y = padding + ((maxWeight - d.weight) / weightRange) * chartHeight;
        ctx.fillStyle = '#3B82F6';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.fillStyle = '#6B7280';
    ctx.font = '11px system-ui';
    ctx.textAlign = 'center';
    if (weightData.length > 0) {
        const first = weightData[0];
        const last = weightData[weightData.length - 1];
        ctx.fillText(formatChartDate(first.date), padding, canvas.height - 10);
        ctx.fillText(formatChartDate(last.date), canvas.width - padding, canvas.height - 10);
    }
}
function renderWorkoutChart(logs) {
    const canvas = document.getElementById('workout-chart');
    if (!canvas) {
        console.warn('[CHARTS] Workout chart canvas not found');
        return;
    }
    const ctx = canvas.getContext('2d');
    const weekData = [];
    const today = new Date();
    for (let week = 3; week >= 0; week--) {
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - week * 7 - 6);
        const weekEnd = new Date(today);
        weekEnd.setDate(today.getDate() - week * 7);
        let workoutCount = 0;
        logs.forEach(log => {
            const logDate = new Date(log.date);
            if (logDate >= weekStart && logDate <= weekEnd && log.workouts && log.workouts.length > 0) {
                workoutCount += log.workouts.filter(w => w.completed).length;
            }
        });
        weekData.push({
            label: `Week ${4 - week}`,
            count: workoutCount
        });
    }
    canvas.width = canvas.offsetWidth;
    canvas.height = 200;
    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    const maxCount = Math.max(...weekData.map(d => d.count), 10);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
        const y = padding + (chartHeight / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);
        ctx.stroke();
        const count = Math.round(maxCount - (maxCount / 4) * i);
        ctx.fillStyle = '#6B7280';
        ctx.font = '12px system-ui';
        ctx.textAlign = 'right';
        ctx.fillText(count, padding - 10, y + 4);
    }
    const barWidth = chartWidth / weekData.length - 20;
    const barSpacing = (chartWidth - barWidth * weekData.length) / (weekData.length + 1);
    weekData.forEach((d, i) => {
        const x = padding + barSpacing + i * (barWidth + barSpacing);
        const barHeight = (d.count / maxCount) * chartHeight;
        const y = padding + chartHeight - barHeight;
        const gradient = ctx.createLinearGradient(x, y, x, padding + chartHeight);
        gradient.addColorStop(0, '#8B5CF6');
        gradient.addColorStop(1, '#6366F1');
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);
        if (d.count > 0) {
            ctx.fillStyle = '#1F2937';
            ctx.font = 'bold 12px system-ui';
            ctx.textAlign = 'center';
            ctx.fillText(d.count, x + barWidth / 2, y - 5);
        }
        ctx.fillStyle = '#6B7280';
        ctx.font = '11px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(d.label, x + barWidth / 2, canvas.height - 10);
    });
}
function formatChartDate(dateStr) {
    const date = new Date(dateStr);
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}`;
}
async function loadPlanDetail(planId) {
    console.log('[DEBUG] loadPlanDetail called with planId:', planId);
    try {
        if (Data._plansCache) {
            const cachedPlan = Data._plansCache.find(p => p.id === planId);
            if (cachedPlan) {
                console.log('[DEBUG] Plan found in cache:', cachedPlan);
                return cachedPlan;
            }
        }
        console.log('[DEBUG] Plan not in cache, fetching from API...');
        const plan = await Data.getPlanById(planId);
        console.log('[DEBUG] API returned plan:', plan);
        console.log('[DEBUG] Cache after fetch:', Data._plansCache);
        if (!plan) {
            console.error('[ERROR] Plan not found:', planId);
            return null;
        }
        return plan;
    } catch (error) {
        console.error('[ERROR] loadPlanDetail failed:', error);
        return null;
    }
}
async function initializeBrowsePage() {
    const container = document.getElementById('plans-container');
    const resultsCount = document.getElementById('results-count');
    if (!container) return;
    try {
        const plans = await Data.getPlans();
        console.log('[DEBUG] Loaded plans:', plans.length);
        displayPlans(plans, { type: 'all', difficulty: 'all', duration: 'all', goal: 'all' });
        if (resultsCount) {
            resultsCount.textContent = `Showing ${plans.length} plans`;
        }
    } catch (error) {
        console.error('Error loading plans:', error);
        container.innerHTML = '<div style="grid-column: 1 / -1; text-center; padding: 3rem;"><p style="color: var(--error);">Failed to load plans. Please try again.</p></div>';
    }
}
function displayPlans(plans, filters = {}) {
    const container = document.getElementById('plans-container');
    const resultsCount = document.getElementById('results-count');
    if (!container) return;
    let filteredPlans = plans;
    if (filters.type && filters.type !== 'all') {
        filteredPlans = filteredPlans.filter(p => p.type === filters.type);
    }
    if (filters.difficulty && filters.difficulty !== 'all') {
        filteredPlans = filteredPlans.filter(p => p.difficulty === filters.difficulty);
    }
    if (filters.duration && filters.duration !== 'all') {
        filteredPlans = filteredPlans.filter(p => p.duration === filters.duration);
    }
    if (filters.goal && filters.goal !== 'all') {
        filteredPlans = filteredPlans.filter(p => 
            p.goals && p.goals.some(g => g.toLowerCase().includes(filters.goal.toLowerCase()))
        );
    }
    if (filters.search) {
        filteredPlans = filteredPlans.filter(p => 
            p.name.toLowerCase().includes(filters.search) ||
            p.description.toLowerCase().includes(filters.search)
        );
    }
    if (resultsCount) {
        resultsCount.textContent = `Showing ${filteredPlans.length} of ${plans.length} plans`;
    }
    if (filteredPlans.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-center; padding: 3rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
                <p style="color: var(--gray-600); font-size: 1.125rem; margin-bottom: 0.5rem;">No plans found</p>
                <p style="color: var(--gray-500); font-size: 0.875rem;">Try adjusting your filters</p>
            </div>
        `;
        return;
    }
    container.innerHTML = filteredPlans.map(plan => `
        <div class="plan-card" onclick="Router.navigate('planDetail?id=${plan.id}')">
            <div class="plan-card-image" style="background: linear-gradient(135deg, ${plan.type === 'workout' ? 'var(--primary)' : 'var(--secondary)'} 0%, ${plan.type === 'workout' ? 'var(--primary-light)' : '#6ee7b7'} 100%);">
                <span style="font-size: 4rem;">${plan.type === 'workout' ? '💪' : '🍽️'}</span>
                <span class="badge ${plan.type === 'workout' ? 'badge-primary' : 'badge-secondary'} plan-card-badge">${plan.type}</span>
            </div>
            <div class="plan-card-content">
                <h3 class="plan-card-title">${plan.name}</h3>
                <p class="plan-card-description">${plan.description}</p>
                <div class="plan-card-meta">
                    <span>⏱ ${plan.duration}</span>
                    <span>📊 ${plan.difficulty}</span>
                </div>
                <div class="plan-card-tags">
                    ${plan.goals && plan.goals.length > 0 ? plan.goals.slice(0, 2).map(goal => `<span class="tag">${goal}</span>`).join('') : ''}
                </div>
            </div>
        </div>
    `).join('');
}
function handlePlanSearch() {
    const searchInput = document.getElementById('plan-search');
    if (!searchInput) return;
    const query = searchInput.value.toLowerCase().trim();
    const filters = {
        type: document.querySelector('[data-filter-type="type"].btn-primary')?.dataset.value || 'all',
        difficulty: document.querySelector('[data-filter-type="difficulty"].btn-primary')?.dataset.value || 'all',
        duration: document.querySelector('[data-filter-type="duration"].btn-primary')?.dataset.value || 'all',
        goal: document.querySelector('[data-filter-type="goal"].btn-primary')?.dataset.value || 'all',
        search: query
    };
    if (Data._plansCache) {
        displayPlans(Data._plansCache, filters);
    }
}
function applyFilters(clickedButton) {
    console.log('[DEBUG] applyFilters called');
    if (clickedButton) {
        const filterType = clickedButton.dataset.filterType;
        const filterValue = clickedButton.dataset.value;
        console.log('[DEBUG] Clicked button - type:', filterType, 'value:', filterValue);
        document.querySelectorAll(`[data-filter-type="${filterType}"]`).forEach(btn => {
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-outline');
        });
        clickedButton.classList.remove('btn-outline');
        clickedButton.classList.add('btn-primary');
    }
    const filters = {
        type: document.querySelector('[data-filter-type="type"].btn-primary')?.dataset.value || 'all',
        difficulty: document.querySelector('[data-filter-type="difficulty"].btn-primary')?.dataset.value || 'all',
        duration: document.querySelector('[data-filter-type="duration"].btn-primary')?.dataset.value || 'all',
        goal: document.querySelector('[data-filter-type="goal"].btn-primary')?.dataset.value || 'all'
    };
    console.log('[DEBUG] Active filters:', filters);
    if (Data._plansCache) {
        displayPlans(Data._plansCache, filters);
    }
}
function clearAllFilters() {
    console.log('[DEBUG] Clearing all filters');
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline');
        if (btn.dataset.value === 'all') {
            btn.classList.remove('btn-outline');
            btn.classList.add('btn-primary');
        }
    });
    if (Data._plansCache) {
        displayPlans(Data._plansCache, { type: 'all', difficulty: 'all', duration: 'all', goal: 'all' });
    }
}
function filterPlans(type) {
    const typeButton = document.querySelector(`[data-filter-type="type"][data-value="${type}"]`);
    if (typeButton) {
        document.querySelectorAll('[data-filter-type="type"]').forEach(btn => {
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-outline');
        });
        typeButton.classList.remove('btn-outline');
        typeButton.classList.add('btn-primary');
        applyFilters();
    }
}
async function startPlan(planId) {
    const user = Storage.getUser();
    if (!user) {
        Router.navigate('login');
        return;
    }
    try {
        UI.showLoading('Starting plan...');
        const existingPlans = await Storage.getActivePlans(user.id);
        console.log('[DEBUG] Existing active plans:', existingPlans);
        for (const existingPlan of existingPlans) {
            const planIdToRemove = existingPlan.planId || existingPlan.id;
            console.log('[DEBUG] Removing existing plan:', planIdToRemove);
            await Storage.removeActivePlan(user.id, planIdToRemove).catch(err => {
                console.warn('Failed to remove old plan:', err);
            });
        }
        await Storage.setActivePlan(user.id, planId);
        UI.hideLoading();
        UI.showToast('Plan started successfully!', 'success');
        setTimeout(() => Router.navigate('logging'), 1000);
    } catch (error) {
        UI.hideLoading();
        UI.showToast('Failed to start plan', 'error');
        console.error('Error starting plan:', error);
    }
}
function removeActivePlan(planId) {
    console.log('[REMOVE_PLAN] Function called, planId:', planId);
    const user = Storage.getUser();
    if (!user) {
        console.log('[REMOVE_PLAN] No user, redirecting to login');
        Router.navigate('login');
        return;
    }
    console.log('[REMOVE_PLAN] Showing custom confirm...');
    UI.showConfirm({
        title: 'Remove Active Plan',
        message: 'Are you sure you want to stop this plan? Your progress will be saved.',
        onConfirm: async () => {
            console.log('[REMOVE_PLAN] User confirmed');
            try {
                console.log('[REMOVE_PLAN] Removing plan...');
                UI.showLoading('Removing plan...');
                await Storage.removeActivePlan(user.id, planId);
                UI.hideLoading();
                UI.showToast('Plan removed successfully', 'success');
                console.log('[REMOVE_PLAN] ✓ Plan removed, refreshing page');
                Router.navigate('profile');
            } catch (error) {
                console.error('[REMOVE_PLAN] ✗ Error:', error);
                UI.hideLoading();
                UI.showToast('Failed to remove plan', 'error');
            }
        },
        onCancel: () => {
            console.log('[REMOVE_PLAN] User cancelled');
        }
    });
}
window.removeActivePlan = removeActivePlan;
async function removeFavoriteFromProfile(planId) {
    console.log('[REMOVE_FAV] Function called, planId:', planId);
    const user = Storage.getUser();
    if (!user) {
        console.log('[REMOVE_FAV] No user, redirecting to login');
        Router.navigate('login');
        return;
    }
    console.log('[REMOVE_FAV] Showing custom confirm...');
    UI.showConfirm({
        title: 'Remove Favorite',
        message: 'Remove this plan from your favorites?',
        onConfirm: async () => {
            console.log('[REMOVE_FAV] User confirmed');
            try {
                console.log('[REMOVE_FAV] Removing favorite...');
                UI.showLoading('Removing from favorites...');
                await Storage.removeFavorite(user.id, planId);
                UI.hideLoading();
                UI.showToast('Removed from favorites', 'success');
                console.log('[REMOVE_FAV] ✓ Favorite removed, refreshing page');
                Router.navigate('profile');
            } catch (error) {
                console.error('[REMOVE_FAV] ✗ Error:', error);
                UI.hideLoading();
                UI.showToast('Failed to remove favorite', 'error');
            }
        },
        onCancel: () => {
            console.log('[REMOVE_FAV] User cancelled');
        }
    });
}
async function toggleFavoritePlan(planId) {
    const user = Storage.getUser();
    if (!user) {
        Router.navigate('login');
        return;
    }
    const btn = document.getElementById(`fav-btn-${planId}`);
    try {
        const isFav = await Storage.isFavorite(user.id, planId);
        if (isFav) {
            await Storage.removeFavorite(user.id, planId);
            if (btn) btn.innerHTML = '🤍 Save';
            UI.showToast('Removed from favorites', 'info');
        } else {
            await Storage.saveFavorite(user.id, planId);
            if (btn) btn.innerHTML = '❤️ Saved';
            UI.showToast('Added to favorites!', 'success');
        }
    } catch (error) {
        UI.showToast('Failed to update favorite', 'error');
        console.error('Error toggling favorite:', error);
    }
}
async function updateFavoriteButton(planId) {
    const user = Storage.getUser();
    if (!user) return;
    const btn = document.getElementById(`fav-btn-${planId}`);
    if (!btn) return;
    try {
        const isFav = await Storage.isFavorite(user.id, planId);
        btn.innerHTML = isFav ? '❤️ Saved' : '🤍 Save';
    } catch (error) {
        console.error('Error checking favorite:', error);
    }
}
async function handleFoodSearch() {
    const query = document.getElementById('food-search').value;
    const suggestions = document.getElementById('food-suggestions');
    if (!query || query.length < 2) {
        suggestions.classList.add('hidden');
        return;
    }
    try {
        const foods = await Data.searchFood(query);
        if (foods.length > 0) {
            suggestions.innerHTML = foods.slice(0, 5).map(food => `
                <div style="padding: 0.75rem; border-bottom: 1px solid var(--gray-200); cursor: pointer;" 
                     onclick="addMeal('${food.name}', ${food.calories}, ${food.protein}, ${food.carbs}, ${food.fat})">
                    <div style="font-weight: 500;">${food.name}</div>
                    <div style="font-size: 0.8rem; color: var(--gray-600);">${food.calories} cal | P: ${food.protein}g C: ${food.carbs}g F: ${food.fat}g</div>
                </div>
            `).join('');
            suggestions.classList.remove('hidden');
        } else {
            suggestions.classList.add('hidden');
        }
    } catch (error) {
        console.error('Error searching foods:', error);
        suggestions.classList.add('hidden');
    }
}
function addMeal(name, calories, protein, carbs, fat) {
    const mealsList = document.getElementById('meals-list');
    if (!mealsList) return;
    if (mealsList.innerHTML.includes('No meals logged')) {
        mealsList.innerHTML = '';
    }
    const mealId = `meal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const mealHTML = `
        <div id="${mealId}" data-meal='${JSON.stringify({name, calories, protein, carbs, fat})}' style="padding: 0.75rem; border-bottom: 1px solid var(--gray-200); display: flex; justify-content: space-between; align-items: center;">
            <div>
                <div style="font-weight: 500;">${name}</div>
                <div style="font-size: 0.875rem; color: var(--gray-600);">${calories} cal | P: ${protein}g C: ${carbs}g F: ${fat}g</div>
            </div>
            <button class="btn btn-sm btn-ghost" style="color: var(--error); padding: 0.25rem 0.5rem;" onclick="removeMeal('${mealId}')">×</button>
        </div>
    `;
    mealsList.insertAdjacentHTML('beforeend', mealHTML);
    document.getElementById('food-search').value = '';
    document.getElementById('food-suggestions').classList.add('hidden');
    UI.showToast('Meal added!', 'success', 1500);
}
function removeMeal(mealId) {
    const mealElement = document.getElementById(mealId);
    if (mealElement) {
        mealElement.remove();
        UI.showToast('Meal removed', 'info', 1500);
        const mealsList = document.getElementById('meals-list');
        if (mealsList && mealsList.children.length === 0) {
            mealsList.innerHTML = '<p style="color: var(--gray-600);">No meals logged today</p>';
        }
    }
}
function updateWater(delta) {
    const waterCount = document.getElementById('water-count');
    if (!waterCount) return;
    let current = parseInt(waterCount.textContent) || 0;
    current = Math.max(0, current + delta);
    waterCount.textContent = current;
}
async function saveLog() {
    console.log('[SAVE_LOG] Starting...');
    const user = Storage.getUser();
    if (!user) {
        console.error('[SAVE_LOG] No user logged in');
        UI.showToast('Please log in first', 'error');
        return;
    }
    const today = new Date().toISOString().split('T')[0];
    const weight = document.getElementById('weight-input')?.value;
    const waterCount = document.getElementById('water-count')?.textContent;
    const log = {
        date: today,
        workouts: [],
        meals: [],
        water: parseInt(waterCount) || 0,
        weight: weight ? parseFloat(weight) : null
    };
    document.querySelectorAll('#workouts-container input[type="checkbox"]').forEach(checkbox => {
        if (checkbox.checked) {
            log.workouts.push({
                name: checkbox.nextElementSibling?.textContent || '',
                completed: true
            });
        }
    });
    document.querySelectorAll('#meals-list [data-meal]').forEach(mealElement => {
        const mealData = JSON.parse(mealElement.getAttribute('data-meal'));
        log.meals.push(mealData);
    });
    console.log('[SAVE_LOG] Log data:', log);
    console.log('[SAVE_LOG] Showing loading spinner...');
    try {
        UI.showLoading('Saving log...');
        const startTime = Date.now();
        console.log('[SAVE_LOG] Loading spinner shown, calling API...');
        await Storage.saveDailyLog(user.id, today, log);
        const elapsedTime = Date.now() - startTime;
        const minDisplayTime = 800;
        if (elapsedTime < minDisplayTime) {
            await new Promise(resolve => setTimeout(resolve, minDisplayTime - elapsedTime));
        }
        console.log('[SAVE_LOG] ✓ Log saved, hiding spinner...');
        UI.hideLoading();
        UI.showToast('Log saved successfully!', 'success');
        console.log('[SAVE_LOG] ✓ Complete!');
        setTimeout(() => {
            if (typeof checkAchievements === 'function') {
                checkAchievements();
            }
        }, 1000);
    } catch (error) {
        console.error('[SAVE_LOG] ✗ Error:', error);
        UI.hideLoading();
        UI.showToast('Failed to save log', 'error');
    }
}
async function updateUserGoals() {
    const user = Storage.getUser();
    const height = document.getElementById('height-input')?.value;
    const currentWeight = document.getElementById('current-weight-input')?.value;
    const targetWeight = document.getElementById('target-weight-input')?.value;
    const calories = document.getElementById('calories-input')?.value;
    try {
        UI.showLoading('Updating goals...');
        await Storage.updateUserProfile(user.id, {
            height: parseFloat(height),
            currentWeight: parseFloat(currentWeight),
            targetWeight: parseFloat(targetWeight),
            dailyCaloricGoal: parseInt(calories)
        });
        UI.hideLoading();
        UI.showToast('Goals updated successfully!', 'success');
    } catch (error) {
        UI.hideLoading();
        UI.showToast('Failed to update goals', 'error');
        console.error('Error updating goals:', error);
    }
}
function attachFormHandlers() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.onsubmit = async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('remember-me').checked;
            const errorMsg = document.getElementById('error-message');
            const btn = e.target.querySelector('button[type="submit"]');
            btn.disabled = true;
            btn.textContent = 'Logging in...';
            errorMsg.classList.add('hidden');
            try {
                await Auth.login(email, password, rememberMe);
                Router.navigate('browse');
            } catch (error) {
                errorMsg.textContent = error.message || 'Login failed';
                errorMsg.classList.remove('hidden');
                btn.disabled = false;
                btn.textContent = 'Log In';
            }
        };
    }
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.onsubmit = async (e) => {
            e.preventDefault();
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const confirm = document.getElementById('reg-confirm').value;
            const height = document.getElementById('height').value;
            const weight = document.getElementById('weight').value;
            const targetWeight = document.getElementById('target-weight').value;
            const activityLevel = document.getElementById('activity-level').value;
            const errorMsg = document.getElementById('error-message');
            const btn = e.target.querySelector('button[type="submit"]');
            if (password !== confirm) {
                errorMsg.textContent = 'Passwords do not match';
                errorMsg.classList.remove('hidden');
                return;
            }
            btn.disabled = true;
            btn.textContent = 'Creating account...';
            errorMsg.classList.add('hidden');
            const bmr = 10 * parseFloat(weight) + 6.25 * parseFloat(height) - 5 * 30 + 5;
            const activityMultipliers = { sedentary: 1.2, light: 1.375, moderate: 1.55, very: 1.725, extra: 1.9 };
            let dailyCaloricGoal = Math.round(bmr * (activityMultipliers[activityLevel] || 1.55));
            if (parseFloat(weight) > parseFloat(targetWeight)) {
                dailyCaloricGoal -= 500; // Weight loss
            } else if (parseFloat(weight) < parseFloat(targetWeight)) {
                dailyCaloricGoal += 300; // Weight gain
            }
            try {
                await Auth.register({
                    firstName: email.split('@')[0],
                    lastName: '',
                    email,
                    password,
                    height: parseFloat(height),
                    currentWeight: parseFloat(weight),
                    targetWeight: parseFloat(targetWeight),
                    activityLevel,
                    dailyCaloricGoal
                });
                Router.navigate('browse');
            } catch (error) {
                errorMsg.textContent = error.message || 'Registration failed';
                errorMsg.classList.remove('hidden');
                btn.disabled = false;
                btn.textContent = 'Create Account';
            }
        };
    }
}
async function handleProfilePictureChange(event) {
    const file = event.target.files[0];
    if (!file) return;
    console.log('[UPLOAD] Profile picture upload started, file:', file.name, file.size);
    if (!file.type.startsWith('image/')) {
        UI.showToast('Please select an image file', 'error');
        return;
    }
    if (file.size > 5 * 1024 * 1024) {
        UI.showToast('Image must be less than 5MB', 'error');
        return;
    }
    const user = Storage.getUser();
    if (!user) {
        UI.showToast('Please log in first', 'error');
        return;
    }
    console.log('[UPLOAD] User:', user.id);
    try {
        UI.showLoading('Updating profile picture...');
        const startTime = Date.now();
        const result = await Storage.savePhoto(user.id, 'profile', file);
        console.log('[UPLOAD] ✓ Profile picture uploaded, result:', result);
        const elapsedTime = Date.now() - startTime;
        const minDisplayTime = 800;
        if (elapsedTime < minDisplayTime) {
            await new Promise(resolve => setTimeout(resolve, minDisplayTime - elapsedTime));
        }
        UI.hideLoading();
        UI.showToast('Profile picture updated!', 'success');
        if (user && result.url) {
            const cacheKey = `profile_photo_${user.id}`;
            sessionStorage.removeItem(cacheKey);  // Clear old cache first
            sessionStorage.setItem(cacheKey, result.url);  // Set new cache
            console.log('[UPLOAD] ✓ Cache updated:', cacheKey, '=', result.url);
        }
        const photoContainer = document.getElementById('profile-photo-container');
        if (photoContainer && result.url) {
            photoContainer.innerHTML = '';
            photoContainer.style.background = 'none';
            photoContainer.style.backgroundImage = `url('${result.url}')`;
            photoContainer.style.backgroundSize = 'cover';
            photoContainer.style.backgroundPosition = 'center';
            photoContainer.style.backgroundColor = 'var(--gray-200)';
            console.log('[UPLOAD] ✓ Updated profile photo container');
        }
        console.log('[UPLOAD] Refreshing navbar...');
        await Router.refreshNavigation();
        console.log('[UPLOAD] ✓ Complete!');
    } catch (error) {
        UI.hideLoading();
        UI.showToast('Failed to update profile picture: ' + (error.message || 'Unknown error'), 'error');
        console.error('[UPLOAD] ✗ Error:', error);
    } finally {
        const input = document.getElementById('profile-picture-input');
        if (input) input.value = '';
    }
}
async function handleProgressPhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    const photoType = window.currentPhotoType || 'before';
    console.log('[UPLOAD] Progress photo upload started, type:', photoType, 'file:', file.name);
    if (!file.type.startsWith('image/')) {
        UI.showToast('Please select an image file', 'error');
        return;
    }
    if (file.size > 5 * 1024 * 1024) {
        UI.showToast('Image must be less than 5MB', 'error');
        return;
    }
    const user = Storage.getUser();
    if (!user) {
        UI.showToast('Please log in first', 'error');
        return;
    }
    console.log('[UPLOAD] User:', user.id);
    try {
        UI.showLoading(`Uploading ${photoType} photo...`);
        const result = await Storage.savePhoto(user.id, photoType, file);
        console.log('[UPLOAD] ✓ Progress photo uploaded, result:', result);
        UI.hideLoading();
        UI.showToast(`${photoType.charAt(0).toUpperCase() + photoType.slice(1)} photo uploaded!`, 'success');
        console.log('[UPLOAD] Setting cache-bust flag and navigating to profile...');
        window._photoCacheBust = true;
        Router.navigate('profile');
        console.log('[UPLOAD] Navigate completed');
    } catch (error) {
        UI.hideLoading();
        UI.showToast('Failed to upload photo: ' + (error.message || 'Unknown error'), 'error');
        console.error('Error uploading progress photo:', error);
    } finally {
        const input = document.getElementById('progress-photo-input');
        if (input) input.value = '';
    }
}
async function handleProfilePhotoUpload(event) {
    return handleProgressPhotoUpload(event);
}
async function deletePhotoFromGallery(photoId, photoType) {
    console.log('[DELETE] Function called with photoId:', photoId, 'photoType:', photoType);
    if (!photoId) {
        console.error('[DELETE] No photoId provided!');
        UI.showToast('Error: Invalid photo ID', 'error');
        return;
    }
    const user = Storage.getUser();
    if (!user) {
        console.error('[DELETE] No user logged in');
        UI.showToast('Please log in first', 'error');
        return;
    }
    console.log('[DELETE] Showing custom confirm...');
    UI.showConfirm({
        title: 'Delete Photo',
        message: 'Delete this photo? This action cannot be undone.',
        onConfirm: async () => {
            console.log('[DELETE] User confirmed, proceeding...');
            try {
                UI.showLoading('Deleting photo...');
                console.log('[DELETE] Calling Storage.deletePhoto...');
                await Storage.deletePhoto(user.id, photoId);
                console.log('[DELETE] ✓ Photo deleted from server');
                if (photoType === 'profile') {
                    console.log('[DELETE] Clearing profile photo cache');
                    const cacheKey = `profile_photo_${user.id}`;
                    sessionStorage.removeItem(cacheKey);
                    console.log('[DELETE] Refreshing navbar...');
                    await Router.refreshNavigation();
                }
                UI.hideLoading();
                UI.showToast('Photo deleted successfully', 'success');
                console.log('[DELETE] Refreshing profile page...');
                window._photoCacheBust = true;
                Router.navigate('profile');
                console.log('[DELETE] ✓ Complete!');
            } catch (error) {
                UI.hideLoading();
                UI.showToast('Failed to delete photo: ' + (error.message || 'Unknown error'), 'error');
                console.error('[DELETE] ✗ Error:', error);
            }
        },
        onCancel: () => {
            console.log('[DELETE] User cancelled');
        }
    });
}
function handleWorkoutCheck(checkbox, idx) {
    console.log('[DEBUG] Workout checkbox changed:', idx, 'checked:', checkbox.checked);
    UI.showToast(checkbox.checked ? 'Workout marked complete!' : 'Workout unmarked', 'info', 1500);
}
function editName() {
    document.getElementById('name-display').style.display = 'none';
    document.getElementById('name-edit').style.display = 'block';
    document.getElementById('edit-first-name').focus();
}
function cancelNameEdit() {
    document.getElementById('name-display').style.display = 'flex';
    document.getElementById('name-edit').style.display = 'none';
}
async function saveName() {
    const firstName = document.getElementById('edit-first-name').value.trim();
    const lastName = document.getElementById('edit-last-name').value.trim();
    if (!firstName) {
        UI.showToast('First name is required', 'error');
        return;
    }
    const user = Storage.getUser();
    if (!user) return;
    try {
        UI.showLoading('Updating name...');
        const updatedUser = await Storage.updateUserProfile(user.id, {
            firstName: firstName,
            lastName: lastName
        });
        UI.hideLoading();
        UI.showToast('Name updated successfully!', 'success');
        Storage.setUser(updatedUser);
        Router.navigate('profile');
    } catch (error) {
        UI.hideLoading();
        UI.showToast('Failed to update name: ' + error.message, 'error');
        console.error('Error updating name:', error);
    }
}
function editEmail() {
    document.getElementById('email-display').style.display = 'none';
    document.getElementById('email-edit').style.display = 'block';
    document.getElementById('edit-email').focus();
}
function cancelEmailEdit() {
    document.getElementById('email-display').style.display = 'flex';
    document.getElementById('email-edit').style.display = 'none';
}
async function saveEmail() {
    const newEmail = document.getElementById('edit-email').value.trim();
    if (!newEmail) {
        UI.showToast('Email is required', 'error');
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
        UI.showToast('Please enter a valid email address', 'error');
        return;
    }
    const user = Storage.getUser();
    if (!user) return;
    if (newEmail === user.email) {
        UI.showToast('This is already your current email', 'info');
        cancelEmailEdit();
        return;
    }
    UI.showConfirm({
        title: 'Change Email',
        message: `Are you sure you want to change your email to ${newEmail}? You will need to log in again.`,
        onConfirm: async () => {
            try {
                UI.showLoading('Updating email...');
                const response = await fetch(`${API_BASE}/users/${user.id}/email`, {
                    method: 'PUT',
                    headers: Storage.getAuthHeaders(),
                    body: JSON.stringify({ email: newEmail })
                });
                if (!response.ok) {
                    let errorMessage = 'Failed to update email';
                    try {
                        const contentType = response.headers.get('content-type');
                        if (contentType && contentType.includes('application/json')) {
                            const error = await response.json();
                            errorMessage = error.detail || error.message || errorMessage;
                        } else {
                            const text = await response.text();
                            errorMessage = text || response.statusText || errorMessage;
                        }
                    } catch (parseError) {
                        console.error('Error parsing response:', parseError);
                        errorMessage = response.statusText || errorMessage;
                    }
                    throw new Error(errorMessage);
                }
                UI.hideLoading();
                UI.showToast('Email updated! Please log in with your new email.', 'success');
                setTimeout(async () => {
                    await Auth.logout();
                    Router.navigate('login');
                }, 2000);
            } catch (error) {
                UI.hideLoading();
                UI.showToast('Failed to update email: ' + error.message, 'error');
                console.error('Error updating email:', error);
            }
        },
        onCancel: () => {
            console.log('Email change cancelled');
        }
    });
}
function changePassword() {
    let modalElement = null;
    const modalContent = `
        <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div class="form-group">
                <label class="form-label">Current Password</label>
                <input type="password" id="current-password" class="form-input" placeholder="Enter current password" autocomplete="current-password">
            </div>
            <div class="form-group">
                <label class="form-label">New Password</label>
                <input type="password" id="new-password" class="form-input" placeholder="Enter new password" autocomplete="new-password">
            </div>
            <div class="form-group">
                <label class="form-label">Confirm New Password</label>
                <input type="password" id="confirm-password" class="form-input" placeholder="Confirm new password" autocomplete="new-password">
            </div>
            <div id="password-error" class="form-error" style="display: none; color: #e53e3e; font-size: 0.875rem; margin-top: 0.5rem;"></div>
        </div>
    `;
    modalElement = document.createElement('div');
    modalElement.className = 'modal-overlay';
    modalElement.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-header">
                <h3>Change Password</h3>
                <button class="modal-close" id="modal-close-btn">×</button>
            </div>
            <div class="modal-body">
                ${modalContent}
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" id="modal-cancel-btn">Cancel</button>
                <button class="btn btn-primary" id="modal-save-btn">Change Password</button>
            </div>
        </div>
    `;
    document.body.appendChild(modalElement);
    document.body.style.overflow = 'hidden';
    setTimeout(() => modalElement.classList.add('show'), 10);
    const closeModal = () => {
        modalElement.classList.remove('show');
        setTimeout(() => {
            if (modalElement && modalElement.parentNode) {
                modalElement.remove();
            }
            document.body.style.overflow = '';
        }, 300);
    };
    const closeBtn = modalElement.querySelector('#modal-close-btn');
    closeBtn.addEventListener('click', closeModal);
    const cancelBtn = modalElement.querySelector('#modal-cancel-btn');
    cancelBtn.addEventListener('click', closeModal);
    modalElement.addEventListener('click', (e) => {
        if (e.target === modalElement) {
            closeModal();
        }
    });
    const saveBtn = modalElement.querySelector('#modal-save-btn');
    saveBtn.addEventListener('click', async () => {
        await savePassword(modalElement, closeModal);
    });
    setTimeout(() => {
        const firstInput = modalElement.querySelector('#current-password');
        if (firstInput) firstInput.focus();
    }, 100);
}
async function savePassword(modalElement, closeModal) {
    const currentPassword = modalElement.querySelector('#current-password').value;
    const newPassword = modalElement.querySelector('#new-password').value;
    const confirmPassword = modalElement.querySelector('#confirm-password').value;
    const errorDiv = modalElement.querySelector('#password-error');
    errorDiv.style.display = 'none';
    errorDiv.textContent = '';
    if (!currentPassword || !newPassword || !confirmPassword) {
        errorDiv.textContent = 'All fields are required';
        errorDiv.style.display = 'block';
        return;
    }
    if (newPassword.length < 6) {
        errorDiv.textContent = 'New password must be at least 6 characters';
        errorDiv.style.display = 'block';
        return;
    }
    if (newPassword !== confirmPassword) {
        errorDiv.textContent = 'New passwords do not match';
        errorDiv.style.display = 'block';
        return;
    }
    if (currentPassword === newPassword) {
        errorDiv.textContent = 'New password must be different from current password';
        errorDiv.style.display = 'block';
        return;
    }
    const user = Storage.getUser();
    if (!user) {
        errorDiv.textContent = 'Please log in first';
        errorDiv.style.display = 'block';
        return;
    }
    try {
        const saveBtn = modalElement.querySelector('#modal-save-btn');
        saveBtn.disabled = true;
        saveBtn.textContent = 'Changing...';
        const response = await fetch(`${API_BASE}/users/${user.id}/password`, {
            method: 'PUT',
            headers: Storage.getAuthHeaders(),
            body: JSON.stringify({
                currentPassword: currentPassword,
                newPassword: newPassword
            })
        });
        let errorMessage = 'Failed to change password';
        if (!response.ok) {
            try {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const error = await response.json();
                    errorMessage = error.detail || error.message || errorMessage;
                } else {
                    const text = await response.text();
                    errorMessage = text || response.statusText || errorMessage;
                }
            } catch (parseError) {
                console.error('Error parsing response:', parseError);
                errorMessage = response.statusText || errorMessage;
            }
            throw new Error(errorMessage);
        }
        closeModal();
        UI.showToast('Password changed successfully! Please log in again.', 'success');
        setTimeout(async () => {
            await Auth.logout();
            Router.navigate('login');
        }, 2000);
    } catch (error) {
        errorDiv.textContent = error.message || 'Failed to change password';
        errorDiv.style.display = 'block';
        const saveBtn = modalElement.querySelector('#modal-save-btn');
        if (saveBtn) {
            saveBtn.disabled = false;
            saveBtn.textContent = 'Change Password';
        }
        console.error('Error changing password:', error);
    }
}
function openPhotoModal(photoUrl, photoType, photoId) {
    console.log('[PHOTO_MODAL] Opening modal for:', photoUrl);
    const modal = document.createElement('div');
    modal.className = 'photo-modal-overlay';
    modal.innerHTML = `
        <div class="photo-modal-content">
            <button class="photo-modal-close" onclick="closePhotoModal()" title="Close">&times;</button>
            <div class="photo-modal-header">
                <h3 style="margin: 0; text-transform: capitalize; color: white;">${photoType} Photo</h3>
                <button class="btn btn-sm" onclick="event.stopPropagation(); deletePhotoFromModal('${photoId}', '${photoType}')" style="background: rgba(220, 38, 38, 0.9); color: white; border: none;">
                    🗑️ Delete Photo
                </button>
            </div>
            <div class="photo-modal-body">
                <img src="${photoUrl}" alt="${photoType} photo" class="photo-modal-img">
            </div>
            <div class="photo-modal-footer">
                <button class="btn btn-outline" onclick="closePhotoModal()" style="background: rgba(255, 255, 255, 0.1); color: white; border-color: rgba(255, 255, 255, 0.3);">Close</button>
                <a href="${photoUrl}" download class="btn btn-primary" style="background: var(--primary); text-decoration: none;">
                    ⬇️ Download
                </a>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closePhotoModal();
        }
    });
    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            closePhotoModal();
            document.removeEventListener('keydown', handleEsc);
        }
    };
    document.addEventListener('keydown', handleEsc);
}
function closePhotoModal() {
    const modal = document.querySelector('.photo-modal-overlay');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}
function deletePhotoFromModal(photoId, photoType) {
    UI.showConfirm({
        title: 'Delete Photo',
        message: `Are you sure you want to delete this ${photoType} photo? This action cannot be undone.`,
        onConfirm: async () => {
            closePhotoModal();
            await deletePhotoFromGallery(photoId, photoType);
        }
    });
}
function openPhotoUploadModal() {
    console.log('[PHOTO_UPLOAD] Opening upload modal');
    const today = new Date().toISOString().split('T')[0];
    const modal = document.createElement('div');
    modal.className = 'photo-modal-overlay';
    modal.innerHTML = `
        <div class="photo-modal-content" style="max-width: 600px;">
            <button class="photo-modal-close" onclick="closePhotoUploadModal()" title="Close">&times;</button>
            <div class="photo-modal-header" style="background: linear-gradient(135deg, var(--primary), var(--primary-light));">
                <h3 style="margin: 0; color: white;">📷 Add Progress Photos</h3>
            </div>
            <div class="photo-modal-body" style="padding: 2rem;">
                <form id="photo-upload-form" style="display: flex; flex-direction: column; gap: 1.5rem;">
                    <!-- Date Picker -->
                    <div class="form-group">
                        <label class="form-label" style="font-weight: 600; margin-bottom: 0.5rem; display: block;">
                            📅 Select Date
                        </label>
                        <input 
                            type="date" 
                            id="photo-date-input" 
                            class="form-input date-picker-input" 
                            value="${today}"
                            max="${today}"
                            required
                        >
                        <p style="font-size: 0.75rem; color: var(--gray-600); margin-top: 0.25rem;">
                            Choose the date for these progress photos
                        </p>
                    </div>
                    <!-- Before Photo Upload -->
                    <div class="form-group">
                        <label class="form-label" style="font-weight: 600; margin-bottom: 0.5rem; display: block;">
                            📸 Before Photo
                        </label>
                        <input 
                            type="file" 
                            id="before-photo-input" 
                            accept="image/*" 
                            style="display: none;"
                            onchange="handlePhotoPreview('before')"
                        >
                        <div 
                            id="before-photo-preview" 
                            onclick="document.getElementById('before-photo-input').click()"
                            style="
                                width: 100%; 
                                height: 200px; 
                                border: 2px dashed var(--gray-300); 
                                border-radius: var(--radius); 
                                display: flex; 
                                align-items: center; 
                                justify-content: center;
                                cursor: pointer;
                                background: var(--gray-50);
                                transition: all 0.3s ease;
                                overflow: hidden;
                                position: relative;
                            "
                            onmouseover="if(!this.dataset.hasImage) this.style.borderColor='var(--primary)'; if(!this.dataset.hasImage) this.style.background='rgba(99, 102, 241, 0.05)'"
                            onmouseout="if(!this.dataset.hasImage) this.style.borderColor='var(--gray-300)'; if(!this.dataset.hasImage) this.style.background='var(--gray-50)'"
                        >
                            <div style="text-align: center; color: var(--gray-500);">
                                <div style="font-size: 2rem; margin-bottom: 0.5rem;">📸</div>
                                <div style="font-size: 0.875rem;">Click to upload before photo</div>
                            </div>
                        </div>
                    </div>
                    <!-- After Photo Upload -->
                    <div class="form-group">
                        <label class="form-label" style="font-weight: 600; margin-bottom: 0.5rem; display: block;">
                            ✨ After Photo
                        </label>
                        <input 
                            type="file" 
                            id="after-photo-input" 
                            accept="image/*" 
                            style="display: none;"
                            onchange="handlePhotoPreview('after')"
                        >
                        <div 
                            id="after-photo-preview" 
                            onclick="document.getElementById('after-photo-input').click()"
                            style="
                                width: 100%; 
                                height: 200px; 
                                border: 2px dashed var(--gray-300); 
                                border-radius: var(--radius); 
                                display: flex; 
                                align-items: center; 
                                justify-content: center;
                                cursor: pointer;
                                background: var(--gray-50);
                                transition: all 0.3s ease;
                                overflow: hidden;
                                position: relative;
                            "
                            onmouseover="if(!this.dataset.hasImage) this.style.borderColor='var(--success)'; if(!this.dataset.hasImage) this.style.background='rgba(34, 197, 94, 0.05)'"
                            onmouseout="if(!this.dataset.hasImage) this.style.borderColor='var(--gray-300)'; if(!this.dataset.hasImage) this.style.background='var(--gray-50)'"
                        >
                            <div style="text-align: center; color: var(--gray-500);">
                                <div style="font-size: 2rem; margin-bottom: 0.5rem;">✨</div>
                                <div style="font-size: 0.875rem;">Click to upload after photo</div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="photo-modal-footer" style="border-top: 1px solid var(--gray-200); padding: 1.5rem; display: flex; gap: 0.75rem; justify-content: flex-end;">
                <button type="button" class="btn btn-outline" onclick="closePhotoUploadModal()">Cancel</button>
                <button type="button" class="btn btn-primary" onclick="uploadProgressPhotos()" id="upload-photos-btn">
                    📤 Upload Photos
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closePhotoUploadModal();
        }
    });
    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            closePhotoUploadModal();
            document.removeEventListener('keydown', handleEsc);
        }
    };
    document.addEventListener('keydown', handleEsc);
}
function closePhotoUploadModal() {
    const modal = document.querySelector('.photo-modal-overlay');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}
function handlePhotoPreview(type) {
    const input = document.getElementById(`${type}-photo-input`);
    const preview = document.getElementById(`${type}-photo-preview`);
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.innerHTML = `
                <img src="${e.target.result}" style="width: 100%; height: 100%; object-fit: cover;" alt="${type} preview">
                <div style="position: absolute; bottom: 0.5rem; left: 0.5rem; right: 0.5rem; background: rgba(0,0,0,0.7); color: white; padding: 0.5rem; border-radius: var(--radius); text-align: center; font-size: 0.875rem;">
                    ${type === 'before' ? '📸 Before' : '✨ After'} - Click to change
                </div>
            `;
            preview.dataset.hasImage = 'true';
            preview.style.border = '2px solid var(--success)';
            preview.style.background = 'transparent';
        };
        reader.readAsDataURL(input.files[0]);
    }
}
async function uploadProgressPhotos() {
    console.log('[PHOTO_UPLOAD] Upload button clicked');
    const dateInput = document.getElementById('photo-date-input');
    const beforeInput = document.getElementById('before-photo-input');
    const afterInput = document.getElementById('after-photo-input');
    const uploadBtn = document.getElementById('upload-photos-btn');
    console.log('[PHOTO_UPLOAD] Elements found:', {
        dateInput: !!dateInput,
        beforeInput: !!beforeInput,
        afterInput: !!afterInput,
        uploadBtn: !!uploadBtn
    });
    const selectedDate = dateInput.value;
    const beforeFile = beforeInput.files[0];
    const afterFile = afterInput.files[0];
    console.log('[PHOTO_UPLOAD] Form values:', {
        selectedDate,
        hasBeforeFile: !!beforeFile,
        hasAfterFile: !!afterFile
    });
    if (!selectedDate) {
        UI.showToast('Please select a date', 'error');
        return;
    }
    if (!beforeFile && !afterFile) {
        UI.showToast('Please select at least one photo to upload', 'error');
        return;
    }
    uploadBtn.disabled = true;
    uploadBtn.innerHTML = '⏳ Uploading...';
    try {
        const user = Storage.getUser();
        let uploadCount = 0;
        console.log('[PHOTO_UPLOAD] Starting upload for user:', user.id);
        if (beforeFile) {
            console.log('[PHOTO_UPLOAD] Uploading before photo...');
            await uploadSinglePhoto(user.id, beforeFile, 'before', selectedDate);
            uploadCount++;
            console.log('[PHOTO_UPLOAD] Before photo uploaded successfully');
        }
        if (afterFile) {
            console.log('[PHOTO_UPLOAD] Uploading after photo...');
            await uploadSinglePhoto(user.id, afterFile, 'after', selectedDate);
            uploadCount++;
            console.log('[PHOTO_UPLOAD] After photo uploaded successfully');
        }
        UI.showToast(`Successfully uploaded ${uploadCount} photo${uploadCount > 1 ? 's' : ''}!`, 'success');
        closePhotoUploadModal();
        console.log('[PHOTO_UPLOAD] Reloading profile page...');
        Router.navigate('profile');
    } catch (error) {
        console.error('[PHOTO_UPLOAD] Error uploading photos:', error);
        UI.showToast('Failed to upload photos. Please try again.', 'error');
        uploadBtn.disabled = false;
        uploadBtn.innerHTML = '📤 Upload Photos';
    }
}
async function uploadSinglePhoto(userId, file, type, date) {
    const formData = new FormData();
    formData.append('photo', file);  // Backend expects 'photo' field
    formData.append('type', type);
    formData.append('date', date); // Send the selected date
    const token = localStorage.getItem('fitplan_token');
    const response = await fetch(`http://localhost:8000/api/users/${userId}/photos`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to upload photo');
    }
    return await response.json();
}
async function exportProgressPDF() {
    console.log('[PDF] Starting PDF export...');
    const user = Storage.getUser();
    if (!user) return;
    try {
        UI.showLoading('Generating PDF...');
        let logs = await Storage.getDailyLogs(user.id);
        if (!Array.isArray(logs)) {
            logs = logs?.logs || [];
        }
        const activePlans = await Storage.getActivePlans(user.id);
        const progressData = await Storage.getProgressData(user.id);
        let pdfContent = `
FitPlan Progress Report
====================================
User: ${user.firstName} ${user.lastName}
Email: ${user.email}
Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
====================================
CURRENT STATS
====================================
Height: ${user.height} cm
Current Weight: ${user.currentWeight} kg
Target Weight: ${user.targetWeight} kg
Daily Calorie Goal: ${user.dailyCaloricGoal} kcal
Activity Level: ${user.activityLevel}
Day Streak: ${progressData.streak || 0} days
Total Workouts Completed: ${progressData.totalWorkoutsDone || 0}
====================================
WEIGHT PROGRESS (Last 30 Days)
====================================
`;
        const weightEntries = logs
            .filter(log => log.weight)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 30);
        if (weightEntries.length > 0) {
            weightEntries.forEach(log => {
                pdfContent += `${log.date}: ${log.weight} kg\n`;
            });
            const firstWeight = weightEntries[weightEntries.length - 1].weight;
            const lastWeight = weightEntries[0].weight;
            const change = lastWeight - firstWeight;
            const changeStr = change > 0 ? `+${change.toFixed(1)}` : change.toFixed(1);
            pdfContent += `\nChange: ${changeStr} kg\n`;
        } else {
            pdfContent += `No weight data recorded yet.\n`;
        }
        pdfContent += `
====================================
ACTIVE PLANS
====================================
`;
        if (activePlans && activePlans.length > 0) {
            activePlans.forEach(plan => {
                pdfContent += `- ${plan.name} (${plan.type})\n`;
                pdfContent += `  Duration: ${plan.duration}\n`;
                pdfContent += `  Difficulty: ${plan.difficulty}\n\n`;
            });
        } else {
            pdfContent += `No active plans.\n`;
        }
        pdfContent += `
====================================
RECENT ACTIVITY (Last 14 Days)
====================================
`;
        const recentLogs = logs
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 14);
        if (recentLogs.length > 0) {
            recentLogs.forEach(log => {
                pdfContent += `\n${log.date}:\n`;
                if (log.workouts && log.workouts.length > 0) {
                    const completed = log.workouts.filter(w => w.completed).length;
                    pdfContent += `  Workouts: ${completed}/${log.workouts.length} completed\n`;
                }
                if (log.meals && log.meals.length > 0) {
                    const totalCalories = log.meals.reduce((sum, m) => sum + (m.calories || 0), 0);
                    pdfContent += `  Meals: ${log.meals.length} (${totalCalories} kcal)\n`;
                }
                if (log.water) {
                    pdfContent += `  Water: ${log.water} glasses\n`;
                }
                if (log.weight) {
                    pdfContent += `  Weight: ${log.weight} kg\n`;
                }
            });
        } else {
            pdfContent += `No recent activity.\n`;
        }
        pdfContent += `
====================================
MEAL SUMMARY (Last 7 Days)
====================================
`;
        const last7Days = logs
            .filter(log => {
                const logDate = new Date(log.date);
                const today = new Date();
                const diffTime = today - logDate;
                const diffDays = diffTime / (1000 * 60 * 60 * 24);
                return diffDays <= 7;
            })
            .sort((a, b) => new Date(b.date) - new Date(a.date));
        if (last7Days.length > 0) {
            last7Days.forEach(log => {
                if (log.meals && log.meals.length > 0) {
                    pdfContent += `\n${log.date}:\n`;
                    log.meals.forEach(meal => {
                        pdfContent += `  - ${meal.food}: ${meal.calories} kcal`;
                        if (meal.protein) pdfContent += ` | P: ${meal.protein}g`;
                        if (meal.carbs) pdfContent += ` C: ${meal.carbs}g`;
                        if (meal.fats) pdfContent += ` F: ${meal.fats}g`;
                        pdfContent += `\n`;
                    });
                }
            });
        } else {
            pdfContent += `No meals logged in the last 7 days.\n`;
        }
        pdfContent += `
====================================
End of Report
====================================
Generated by FitPlan
Keep up the great work!
`;
        const blob = new Blob([pdfContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `FitPlan_Progress_${user.firstName}_${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        UI.hideLoading();
        UI.showToast('Progress report downloaded!', 'success');
    } catch (error) {
        UI.hideLoading();
        UI.showToast('Failed to generate report: ' + error.message, 'error');
        console.error('[PDF] Export error:', error);
    }
}
window.removeActivePlan = removeActivePlan;
window.removeFavoriteFromProfile = removeFavoriteFromProfile;
window.deletePhotoFromGallery = deletePhotoFromGallery;
window.addMeal = addMeal;
window.removeMeal = removeMeal;
window.updateWater = updateWater;
window.saveLog = saveLog;
window.updateUserGoals = updateUserGoals;
window.handleWorkoutCheck = handleWorkoutCheck;
window.toggleFavoritePlan = toggleFavoritePlan;
window.handleProfilePictureChange = handleProfilePictureChange;
window.handleProgressPhotoUpload = handleProgressPhotoUpload;
window.handleProfilePhotoUpload = handleProfilePhotoUpload;
window.editName = editName;
window.cancelNameEdit = cancelNameEdit;
window.saveName = saveName;
window.editEmail = editEmail;
window.cancelEmailEdit = cancelEmailEdit;
window.saveEmail = saveEmail;
window.changePassword = changePassword;
window.savePassword = savePassword;
window.openPhotoModal = openPhotoModal;
window.closePhotoModal = closePhotoModal;
window.deletePhotoFromModal = deletePhotoFromModal;
window.initializeProfileCharts = initializeProfileCharts;
window.exportProgressPDF = exportProgressPDF;
window.requestNotificationPermission = requestNotificationPermission;
window.showAchievementsModal = showAchievementsModal;
window.scrollToProgressCharts = scrollToProgressCharts;
window.checkAchievements = checkAchievements;
window.openPhotoUploadModal = openPhotoUploadModal;
window.closePhotoUploadModal = closePhotoUploadModal;
window.handlePhotoPreview = handlePhotoPreview;
window.uploadProgressPhotos = uploadProgressPhotos;
console.log('[PAGES] All functions exposed to global scope');
function requestNotificationPermission() {
    if (!('Notification' in window)) {
        console.log('[NOTIFICATIONS] Not supported in this browser');
        return;
    }
    if (Notification.permission === 'granted') {
        console.log('[NOTIFICATIONS] Already granted');
        return;
    }
    if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            console.log('[NOTIFICATIONS] Permission:', permission);
            if (permission === 'granted') {
                UI.showToast('Notifications enabled! You will receive workout reminders.', 'success');
                localStorage.setItem('notifications_enabled', 'true');
            }
        });
    }
}
function sendWorkoutNotification(message, options = {}) {
    if (!('Notification' in window)) return;
    if (Notification.permission === 'granted') {
        const notification = new Notification('FitPlan Workout Reminder', {
            body: message,
            icon: '/favicon.ico',
            badge: '/favicon.ico',
            tag: 'fitplan-workout',
            requireInteraction: false,
            ...options
        });
        notification.onclick = () => {
            window.focus();
            Router.navigate('logging');
            notification.close();
        };
        setTimeout(() => notification.close(), 10000);
    }
}
function checkAndSendWorkoutReminders() {
    const user = Storage.getUser();
    if (!user) return;
    const notificationsEnabled = localStorage.getItem('notifications_enabled') === 'true';
    if (!notificationsEnabled) return;
    const lastCheck = localStorage.getItem('last_notification_check');
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    if (lastCheck === today) return;
    Storage.getDailyLog(user.id, today).then(log => {
        if (!log || !log.workouts || log.workouts.length === 0) {
            const hour = now.getHours();
            if (hour >= 6 && hour <= 21) { // Between 6 AM and 9 PM
                sendWorkoutNotification(
                    "Don't forget to log your workout today! Keep your streak going! 💪",
                    { body: "Tap to open your daily log" }
                );
            }
        } else {
            const completedWorkouts = log.workouts.filter(w => w.completed).length;
            const totalWorkouts = log.workouts.length;
            if (completedWorkouts < totalWorkouts) {
                sendWorkoutNotification(
                    `You've completed ${completedWorkouts}/${totalWorkouts} workouts today. Finish strong! 🔥`
                );
            }
        }
        localStorage.setItem('last_notification_check', today);
    });
}
const ACHIEVEMENTS = [
    {
        id: 'first_workout',
        title: 'First Step',
        description: 'Complete your first workout',
        icon: '🎯',
        check: (data) => data.totalWorkouts >= 1
    },
    {
        id: 'week_streak',
        title: 'Week Warrior',
        description: 'Maintain a 7-day streak',
        icon: '🔥',
        check: (data) => data.streak >= 7
    },
    {
        id: 'month_streak',
        title: 'Monthly Champion',
        description: 'Maintain a 30-day streak',
        icon: '👑',
        check: (data) => data.streak >= 30
    },
    {
        id: 'ten_workouts',
        title: 'Getting Strong',
        description: 'Complete 10 workouts',
        icon: '💪',
        check: (data) => data.totalWorkouts >= 10
    },
    {
        id: 'fifty_workouts',
        title: 'Fitness Enthusiast',
        description: 'Complete 50 workouts',
        icon: '⭐',
        check: (data) => data.totalWorkouts >= 50
    },
    {
        id: 'hundred_workouts',
        title: 'Fitness Legend',
        description: 'Complete 100 workouts',
        icon: '🏆',
        check: (data) => data.totalWorkouts >= 100
    },
    {
        id: 'weight_loss_5',
        title: 'Making Progress',
        description: 'Lose 5kg from starting weight',
        icon: '📉',
        check: (data) => data.weightLoss >= 5
    },
    {
        id: 'weight_loss_10',
        title: 'Transformation',
        description: 'Lose 10kg from starting weight',
        icon: '🎉',
        check: (data) => data.weightLoss >= 10
    },
    {
        id: 'target_reached',
        title: 'Goal Achieved!',
        description: 'Reach your target weight',
        icon: '🎊',
        check: (data) => data.targetReached
    },
    {
        id: 'first_photo',
        title: 'Picture Perfect',
        description: 'Upload your first progress photo',
        icon: '📸',
        check: (data) => data.photoCount >= 1
    },
    {
        id: 'meal_logger',
        title: 'Nutrition Conscious',
        description: 'Log meals for 7 days',
        icon: '🍎',
        check: (data) => data.mealDays >= 7
    },
    {
        id: 'hydration_master',
        title: 'Hydration Master',
        description: 'Log 8+ glasses of water for 7 days',
        icon: '💧',
        check: (data) => data.hydrationDays >= 7
    }
];
async function checkAchievements() {
    const user = Storage.getUser();
    if (!user) return [];
    try {
        let logs = await Storage.getDailyLogs(user.id);
        if (!Array.isArray(logs)) {
            logs = logs?.logs || [];
        }
        const photos = await Storage.getPhotos(user.id);
        const progressData = await Storage.getProgressData(user.id);
        const totalWorkouts = progressData.totalWorkoutsDone || 0;
        const streak = progressData.streak || 0;
        const weightLogs = logs.filter(l => l.weight).sort((a, b) => new Date(a.date) - new Date(b.date));
        const firstWeight = weightLogs.length > 0 ? weightLogs[0].weight : user.currentWeight;
        const lastWeight = weightLogs.length > 0 ? weightLogs[weightLogs.length - 1].weight : user.currentWeight;
        const weightLoss = Math.max(0, firstWeight - lastWeight);
        const targetReached = lastWeight <= user.targetWeight;
        const photoCount = (photos.photos?.profile?.length || 0) + 
                          (photos.photos?.before?.length || 0) + 
                          (photos.photos?.after?.length || 0);
        const mealDays = logs.filter(l => l.meals && l.meals.length > 0).length;
        const hydrationDays = logs.filter(l => l.water && l.water >= 8).length;
        const data = {
            totalWorkouts,
            streak,
            weightLoss,
            targetReached,
            photoCount,
            mealDays,
            hydrationDays
        };
        const unlockedAchievements = localStorage.getItem('unlocked_achievements');
        const unlocked = unlockedAchievements ? JSON.parse(unlockedAchievements) : [];
        const newUnlocked = [];
        ACHIEVEMENTS.forEach(achievement => {
            if (!unlocked.includes(achievement.id) && achievement.check(data)) {
                newUnlocked.push(achievement);
                unlocked.push(achievement.id);
            }
        });
        localStorage.setItem('unlocked_achievements', JSON.stringify(unlocked));
        newUnlocked.forEach(achievement => {
            UI.showToast(
                `🎉 Achievement Unlocked: ${achievement.title}!`,
                'success',
                5000
            );
        });
        return {
            total: ACHIEVEMENTS.length,
            unlocked: unlocked.length,
            achievements: ACHIEVEMENTS.map(a => ({
                ...a,
                unlocked: unlocked.includes(a.id)
            }))
        };
    } catch (error) {
        console.error('[ACHIEVEMENTS] Error checking achievements:', error);
        return { total: ACHIEVEMENTS.length, unlocked: 0, achievements: [] };
    }
}
function showAchievementsModal() {
    checkAchievements().then(result => {
        const achievementsHTML = result.achievements.map(a => `
            <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: ${a.unlocked ? 'var(--success-light)' : 'var(--gray-100)'}; border-radius: var(--radius); margin-bottom: 0.75rem;">
                <div style="font-size: 2.5rem; opacity: ${a.unlocked ? '1' : '0.3'};">${a.icon}</div>
                <div style="flex: 1;">
                    <h4 style="margin: 0 0 0.25rem 0; font-size: 1rem; color: ${a.unlocked ? 'var(--dark)' : 'var(--gray-500)'};">${a.title}</h4>
                    <p style="margin: 0; font-size: 0.875rem; color: ${a.unlocked ? 'var(--gray-700)' : 'var(--gray-400)'};">${a.description}</p>
                </div>
                ${a.unlocked ? '<div style="color: var(--success); font-size: 1.5rem;">✓</div>' : ''}
            </div>
        `).join('');
        UI.showModal('Achievements', `
            <div style="margin-bottom: 1rem;">
                <div style="text-align: center; padding: 1.5rem; background: linear-gradient(135deg, var(--primary), var(--secondary)); border-radius: var(--radius); color: white; margin-bottom: 1.5rem;">
                    <div style="font-size: 3rem; margin-bottom: 0.5rem;">🏆</div>
                    <div style="font-size: 2rem; font-weight: bold;">${result.unlocked} / ${result.total}</div>
                    <div style="font-size: 0.875rem; opacity: 0.9;">Achievements Unlocked</div>
                </div>
                ${achievementsHTML}
            </div>
        `, [
            { text: 'Close', class: 'btn-primary' }
        ]);
    });
}
