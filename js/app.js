document.addEventListener('DOMContentLoaded', async () => {
    const rememberExpiry = localStorage.getItem('fitplan_remember_expiry');
    if (rememberExpiry) {
        const expiryDate = new Date(rememberExpiry);
        const now = new Date();
        if (now > expiryDate) {
            console.log('[APP] Remember me period expired, logging out...');
            await Auth.logout();
        } else {
            console.log('[APP] Remember me active until:', expiryDate.toLocaleDateString());
        }
    }
    Router.register('home', renderHomePage);
    Router.register('login', renderLoginPage);
    Router.register('register', renderRegisterPage);
    Router.register('browse', renderBrowsePage);
    Router.register('planDetail', renderPlanDetailPage);
    Router.register('logging', renderLoggingPage);
    Router.register('profile', renderProfilePage);
    const user = await Auth.getCurrentUser();
    Router.currentRoute = user ? 'browse' : 'home';
    Router.render();
    if (user) {
        setTimeout(() => {
            if (typeof checkAndSendWorkoutReminders === 'function') {
                checkAndSendWorkoutReminders();
            }
        }, 2000);
        setTimeout(() => {
            if (typeof checkAchievements === 'function') {
                checkAchievements();
            }
        }, 3000);
    }
});
async function renderHomePage() {
    return await getHomeHTML();
}
async function renderLoginPage() {
    return await getLoginHTML();
}
async function renderRegisterPage() {
    return await getRegisterHTML();
}
async function renderBrowsePage() {
    return await getBrowseHTML();
}
async function renderPlanDetailPage() {
    const planId = sessionStorage.getItem('currentPlanId');
    return await getPlanDetailHTML(planId);
}
async function renderLoggingPage() {
    return await getLoggingHTML();
}
async function renderProfilePage() {
    return await getProfileHTML();
}
