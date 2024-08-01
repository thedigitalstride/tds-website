function loadScript(url, callback) {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    script.onload = function() {
        if (callback) {
            callback();
        }
    };

    script.onerror = function() {
        console.error('Error loading script:', url);
    };

    document.head.appendChild(script);
}

// Usage example:
loadScript('http://127.0.0.1:5500/tds-website/app.js', function() {
    // Code to execute after the script has loaded
});