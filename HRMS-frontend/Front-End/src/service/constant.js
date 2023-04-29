var service = {}
// Local
if (window.location.href.startsWith('http://localhost')) {
    service.API_URL = "http://localhost:3001";
} else {
    service.API_URL = "https://api-blivclub.pending.com/api"
}

export default service;
