const results = document.getElementById('results');
function addTest(name, status, message) {
    const div = document.createElement('div');
    div.className = `test ${status}`;
    div.innerHTML = `
        <div class="test-name">${status === 'pass' ? '✓' : status === 'fail' ? '✗' : '⏳'} ${name}</div>
        <div class="test-message">${message}</div>
    `;
    results.appendChild(div);
    return div;
}
function clearTests() {
    results.innerHTML = '';
}
async function runAllTests() {
    clearTests();
    const healthTest = addTest('Backend Health Check', 'pending', 'Checking...');
    try {
        const response = await fetch('http://localhost:8000/api/health');
        const data = await response.json();
        healthTest.className = 'test pass';
        healthTest.querySelector('.test-message').innerHTML = `✓ Backend is healthy: ${JSON.stringify(data)}`;
    } catch (err) {
        healthTest.className = 'test fail';
        healthTest.querySelector('.test-message').innerHTML = `<span class="error">✗ ${err.message}</span>`;
    }
    const plansTest = addTest('Plans API', 'pending', 'Loading plans...');
    try {
        const plans = await Data.getPlans();
        plansTest.className = 'test pass';
        plansTest.querySelector('.test-message').textContent = `✓ Loaded ${plans.length} plans from API`;
    } catch (err) {
        plansTest.className = 'test fail';
        plansTest.querySelector('.test-message').innerHTML = `<span class="error">✗ ${err.message}\n${err.stack}</span>`;
    }
    const foodsTest = addTest('Foods API', 'pending', 'Loading foods...');
    try {
        const foods = await Data.getFoodDatabase();
        foodsTest.className = 'test pass';
        foodsTest.querySelector('.test-message').textContent = `✓ Loaded ${foods.length} food items from API`;
    } catch (err) {
        foodsTest.className = 'test fail';
        foodsTest.querySelector('.test-message').innerHTML = `<span class="error">✗ ${err.message}\n${err.stack}</span>`;
    }
    const pageFunctions = ['getHomeHTML', 'getLoginHTML', 'getRegisterHTML', 'getBrowseHTML', 'getPlanDetailHTML', 'getLoggingHTML', 'getProfileHTML'];
    const pageTest = addTest('Page Functions', 'pending', 'Checking...');
    let allExist = true;
    const missing = [];
    for (const func of pageFunctions) {
        if (typeof window[func] === 'undefined') {
            allExist = false;
            missing.push(func);
        }
    }
    if (allExist) {
        pageTest.className = 'test pass';
        pageTest.querySelector('.test-message').textContent = `✓ All page functions exist`;
    } else {
        pageTest.className = 'test fail';
        pageTest.querySelector('.test-message').innerHTML = `<span class="error">✗ Missing: ${missing.join(', ')}</span>`;
    }
    const routerTest = addTest('Router Module', 'pending', 'Checking...');
    if (typeof Router !== 'undefined' && Router.navigate && Router.render) {
        routerTest.className = 'test pass';
        routerTest.querySelector('.test-message').textContent = `✓ Router is initialized`;
    } else {
        routerTest.className = 'test fail';
        routerTest.querySelector('.test-message').innerHTML = `<span class="error">✗ Router not properly initialized</span>`;
    }
    const authTest = addTest('Auth Module', 'pending', 'Checking...');
    if (typeof Auth !== 'undefined' && Auth.login && Auth.register && Auth.getCurrentUser) {
        authTest.className = 'test pass';
        authTest.querySelector('.test-message').textContent = `✓ Auth module is initialized`;
    } else {
        authTest.className = 'test fail';
        authTest.querySelector('.test-message').innerHTML = `<span class="error">✗ Auth module not properly initialized</span>`;
    }
    const storageTest = addTest('Storage Module', 'pending', 'Checking...');
    if (typeof Storage !== 'undefined' && Storage.getUser && Storage.setUser) {
        storageTest.className = 'test pass';
        storageTest.querySelector('.test-message').textContent = `✓ Storage module is initialized`;
    } else {
        storageTest.className = 'test fail';
        storageTest.querySelector('.test-message').innerHTML = `<span class="error">✗ Storage module not properly initialized</span>`;
    }
    const uiTest = addTest('UI Module', 'pending', 'Checking...');
    if (typeof UI !== 'undefined' && UI.showToast && UI.showLoading) {
        uiTest.className = 'test pass';
        uiTest.querySelector('.test-message').textContent = `✓ UI module is initialized`;
    } else {
        uiTest.className = 'test fail';
        uiTest.querySelector('.test-message').innerHTML = `<span class="error">✗ UI module not properly initialized</span>`;
    }
    const templatesTest = addTest('Templates', 'pending', 'Loading home template...');
    try {
        const html = await Templates.load('home');
        if (html && html.length > 0) {
            templatesTest.className = 'test pass';
            templatesTest.querySelector('.test-message').textContent = `✓ Templates loading correctly (${html.length} chars)`;
        } else {
            templatesTest.className = 'test fail';
            templatesTest.querySelector('.test-message').innerHTML = `<span class="error">✗ Template is empty</span>`;
        }
    } catch (err) {
        templatesTest.className = 'test fail';
        templatesTest.querySelector('.test-message').innerHTML = `<span class="error">✗ ${err.message}</span>`;
    }
    const renderTest = addTest('Render Home Page', 'pending', 'Rendering...');
    try {
        const html = await getHomeHTML();
        if (html && html.length > 0) {
            renderTest.className = 'test pass';
            renderTest.querySelector('.test-message').textContent = `✓ Home page renders (${html.length} chars)`;
        } else {
            renderTest.className = 'test fail';
            renderTest.querySelector('.test-message').innerHTML = `<span class="error">✗ Rendered HTML is empty</span>`;
        }
    } catch (err) {
        renderTest.className = 'test fail';
        renderTest.querySelector('.test-message').innerHTML = `<span class="error">✗ ${err.message}\n${err.stack}</span>`;
    }
}
async function testLogin() {
    clearTests();
    addTest('Login Test', 'pending', 'Attempting to register test user...');
    const testUser = {
        email: 'test@test.com',
        password: 'test123',
        firstName: 'Test',
        lastName: 'User',
        height: 175,
        currentWeight: 80,
        targetWeight: 75,
        activityLevel: 'moderate',
        dailyCaloricGoal: 2000
    };
    try {
        await Auth.register(testUser);
        addTest('Registration', 'pass', '✓ Test user registered successfully');
    } catch (err) {
        try {
            await Auth.login(testUser.email, testUser.password);
            addTest('Login', 'pass', '✓ Logged in with existing test user');
        } catch (loginErr) {
            addTest('Login', 'fail', `<span class="error">✗ ${loginErr.message}</span>`);
            return;
        }
    }
    const user = Storage.getUser();
    if (user) {
        addTest('User Session', 'pass', `✓ User logged in: ${user.email}`);
    } else {
        addTest('User Session', 'fail', '✗ User not found in storage');
    }
}
setTimeout(runAllTests, 100);
