const Router = {
    currentRoute: 'login',
    routes: {},
    register: (path, component) => {
        Router.routes[path] = component;
    },
    navigate: (path) => {
        console.log('[ROUTER] navigate() called with path:', path);
        const [route, queryString] = path.split('?');
        Router.currentRoute = route;
        console.log('[ROUTER] Setting currentRoute to:', route);
        if (queryString) {
            const params = new URLSearchParams(queryString);
            sessionStorage.setItem('routeParams', queryString);
            if (params.get('id')) {
                sessionStorage.setItem('currentPlanId', params.get('id'));
            }
        }
        console.log('[ROUTER] Calling render()...');
        Router.render();
        window.scrollTo(0, 0);
        console.log('[ROUTER] navigate() completed');
    },
    render: async () => {
        console.log('[ROUTER] render() called for route:', Router.currentRoute);
        try {
            const user = Storage.getUser();
            const visitorAllowedRoutes = ['login', 'register', 'home', 'browse', 'planDetail'];
            if (!user && !visitorAllowedRoutes.includes(Router.currentRoute)) {
                Router.currentRoute = 'home';
            }
            if (user && (Router.currentRoute === 'login' || Router.currentRoute === 'register')) {
                Router.currentRoute = 'browse';
            }
            let component;
            if (Router.currentRoute === 'planDetail') {
                const planId = sessionStorage.getItem('currentPlanId');
                console.log('[DEBUG] Plan detail route - planId:', planId);
                document.getElementById('app').innerHTML = '<div class="container" style="margin-top: 4rem; text-align: center;"><div class="spinner" style="margin: 0 auto;"></div><p style="margin-top: 1rem; color: var(--gray-600);">Loading plan...</p></div>';
                const plan = await loadPlanDetail(planId);
                console.log('[DEBUG] Plan loaded:', plan);
                console.log('[DEBUG] Cache after load:', Data._plansCache);
                if (plan) {
                    component = () => getPlanDetailHTML(planId);
                } else {
                    console.error('[ERROR] Failed to load plan');
                    document.getElementById('app').innerHTML = `
                        <div class="container" style="margin-top: 4rem; text-align: center;">
                            <h2>Plan Not Found</h2>
                            <p style="color: var(--gray-600); margin: 1rem 0;">Unable to load plan details</p>
                            <button class="btn btn-primary" onclick="Router.navigate('browse')">Back to Browse</button>
                        </div>
                    `;
                    updateNavigation();
                    return;
                }
            } else {
                component = Router.routes[Router.currentRoute];
            }
            if (component) {
                const html = await component();
                document.getElementById('app').innerHTML = html;
                if (Router.currentRoute === 'login' || Router.currentRoute === 'register') {
                    attachFormHandlers();
                }
                if (Router.currentRoute === 'planDetail') {
                    const planId = sessionStorage.getItem('currentPlanId');
                    if (planId) {
                        setTimeout(() => updateFavoriteButton(planId), 100);
                    }
                }
                if (Router.currentRoute === 'browse') {
                    setTimeout(async () => {
                        await initializeBrowsePage();
                    }, 0);
                }
                if (Router.currentRoute === 'profile') {
                    setTimeout(async () => {
                        await initializeProfileCharts();
                    }, 100);
                }
            }
            await updateNavigation();
        } catch (error) {
            console.error('[FATAL ERROR] Router render failed:', error);
            document.getElementById('app').innerHTML = `
                <div class="container" style="margin-top: 4rem; text-align: center;">
                    <h2 style="color: var(--error);">Something Went Wrong</h2>
                    <p style="color: var(--gray-600); margin: 1rem 0;">${error.message}</p>
                    <pre style="text-align: left; background: var(--gray-100); padding: 1rem; margin: 1rem auto; max-width: 600px; overflow: auto; border-radius: var(--radius); font-size: 0.875rem;">${error.stack}</pre>
                    <button class="btn btn-primary" onclick="location.reload()">Reload Page</button>
                </div>
            `;
            await updateNavigation();
        }
    },
    go: (path) => {
        Router.navigate(path);
    },
    refreshNavigation: async () => {
        await updateNavigation();
    }
};
async function updateNavigation() {
    console.log('[ROUTER] updateNavigation() called');
    const user = Storage.getUser();
    console.log('[ROUTER] User:', user?.id);
    const navHtml = user ? await getNavigationHTML() : getHomeNavigationHTML();
    console.log('[ROUTER] Got navigation HTML, length:', navHtml?.length);
    const oldNav = document.querySelector('nav');
    if (oldNav) {
        console.log('[ROUTER] Removing old navbar');
        oldNav.remove();
    }
    if (navHtml) {
        const nav = document.createElement('nav');
        nav.className = 'navbar';
        nav.innerHTML = navHtml;
        document.body.insertBefore(nav, document.body.firstChild);
        console.log('[ROUTER] ✓ New navbar inserted');
        document.querySelectorAll('.navbar-menu a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const route = link.getAttribute('data-route');
                Router.navigate(route);
            });
        });
        const logoutBtn = document.querySelector('.logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                await Auth.logout();
                Router.navigate('home');
            });
        }
    }
}
function getHomeNavigationHTML() {
    const currentRoute = Router.currentRoute;
    return `
        <div class="navbar-content">
            <div class="navbar-brand" onclick="Router.navigate('home')" style="cursor: pointer;">
                <span class="icon">🏋️</span>
                <span>FitPlan</span>
            </div>
            <ul class="navbar-menu">
                <li><a href="#" data-route="home" class="${currentRoute === 'home' ? 'active' : ''}">Home</a></li>
                <li><a href="#" data-route="browse" class="${currentRoute === 'browse' ? 'active' : ''}">Browse Plans</a></li>
                <li><a href="#" data-route="login" class="${currentRoute === 'login' ? 'active' : ''}">Login</a></li>
                <li><a href="#" data-route="register" class="${currentRoute === 'register' ? 'active' : ''}">Sign Up</a></li>
            </ul>
        </div>
    `;
}
async function getNavigationHTML() {
    const user = Storage.getUser();
    const currentRoute = Router.currentRoute;
    console.log('[NAVBAR] getNavigationHTML called, user:', user?.id, 'route:', currentRoute);
    let profilePhotoUrl = null;
    if (user) {
        const cacheKey = `profile_photo_${user.id}`;
        const cachedPhotoUrl = sessionStorage.getItem(cacheKey);
        console.log('[NAVBAR] Cache key:', cacheKey, '| Cached value:', cachedPhotoUrl);
        if (cachedPhotoUrl && cachedPhotoUrl !== 'null' && cachedPhotoUrl !== 'undefined') {
            profilePhotoUrl = cachedPhotoUrl;
            console.log('[NAVBAR] ✓ Using cached photo');
        } else {
            console.log('[NAVBAR] Fetching from API...');
            try {
                const photos = await Storage.getPhotos(user.id);
                const profilePhoto = photos?.photos?.profile?.[0];
                profilePhotoUrl = profilePhoto?.url;
                console.log('[NAVBAR] API returned profile photo:', profilePhotoUrl);
                if (profilePhotoUrl) {
                    sessionStorage.setItem(cacheKey, profilePhotoUrl);
                    console.log('[NAVBAR] ✓ Cached:', profilePhotoUrl);
                }
            } catch (error) {
                console.error('[NAVBAR] API error:', error);
            }
        }
    }
    const initials = user?.firstName?.[0] || user?.email?.[0] || 'U';
    const avatarContent = profilePhotoUrl 
        ? `<div style="width: 100%; height: 100%; background-image: url('${profilePhotoUrl}'); background-size: cover; background-position: center; border-radius: 50%;"></div>`
        : initials;
    const avatarStyle = profilePhotoUrl 
        ? ''  // No background style needed, we have a div inside
        : 'background: linear-gradient(135deg, var(--primary), var(--primary-light)); color: white; font-weight: 600; font-size: 0.9rem;';
    return `
        <div class="navbar-content">
            <div class="navbar-brand" onclick="Router.navigate('browse')" style="cursor: pointer;">
                <span class="icon">🏋️</span>
                <span>FitPlan</span>
            </div>
            <ul class="navbar-menu">
                <li><a href="#" data-route="browse" class="${currentRoute === 'browse' ? 'active' : ''}">Browse</a></li>
                <li><a href="#" data-route="logging" class="${currentRoute === 'logging' ? 'active' : ''}">Daily Log</a></li>
            </ul>
            <div class="navbar-user">
                <div class="user-avatar" style="${avatarStyle} cursor: pointer; display: flex; align-items: center; justify-content: center; overflow: hidden;" onclick="Router.navigate('profile')" title="View Profile">
                    ${avatarContent}
                </div>
                <button class="btn btn-ghost btn-sm logout-btn">Logout</button>
            </div>
        </div>
    `;
}
