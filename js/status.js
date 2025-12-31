async function checkStatus() {
    try {
        const healthResponse = await fetch('http://localhost:8000/api/health');
        const healthData = await healthResponse.json();
        const backendStatus = document.getElementById('backend-status');
        if (healthData.gateway === 'healthy') {
            backendStatus.className = 'status-item status-ok';
            backendStatus.querySelector('span:last-child').textContent = '✅ Online';
        } else {
            backendStatus.className = 'status-item status-error';
            backendStatus.querySelector('span:last-child').textContent = '❌ Issues';
        }
        const apiStatus = document.getElementById('api-status');
        if (healthResponse.ok) {
            apiStatus.className = 'status-item status-ok';
            apiStatus.querySelector('span:last-child').textContent = '✅ Responding';
        } else {
            apiStatus.className = 'status-item status-error';
            apiStatus.querySelector('span:last-child').textContent = '❌ Down';
        }
        const plansResponse = await fetch('http://localhost:8000/api/plans');
        const plansData = await plansResponse.json();
        const dbStatus = document.getElementById('db-status');
        if (plansResponse.ok) {
            dbStatus.className = 'status-item status-ok';
            dbStatus.querySelector('span:last-child').textContent = '✅ Connected';
        } else {
            dbStatus.className = 'status-item status-error';
            dbStatus.querySelector('span:last-child').textContent = '❌ Error';
        }
        const plansStatus = document.getElementById('plans-status');
        if (Array.isArray(plansData) && plansData.length > 0) {
            plansStatus.className = 'status-item status-ok';
            plansStatus.querySelector('span:last-child').textContent = `✅ ${plansData.length} Plans`;
        } else {
            plansStatus.className = 'status-item status-error';
            plansStatus.querySelector('span:last-child').textContent = '❌ No Data';
        }
    } catch (error) {
        console.error('Status check error:', error);
        document.querySelectorAll('.status-item').forEach(item => {
            if (item.classList.contains('status-loading')) {
                item.className = 'status-item status-error';
                item.querySelector('span:last-child').textContent = '❌ Offline';
            }
        });
    }
}
checkStatus();
setInterval(checkStatus, 5000);
