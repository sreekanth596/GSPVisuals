// Check if YouTube API is loaded
function checkYouTubeAPI() {
    console.log('Checking YouTube API...');
    if (window.YT && window.YT.Player) {
        console.log('YouTube API is loaded successfully!');
        return true;
    } else {
        console.warn('YouTube API is not loaded yet');
        return false;
    }
}

// Check when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    // Initial check
    const apiLoaded = checkYouTubeAPI();
    
    // Check again after a delay in case it's still loading
    if (!apiLoaded) {
        console.log('Will check again in 1 second...');
        setTimeout(checkYouTubeAPI, 1000);
    }
});
