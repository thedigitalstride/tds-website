// Function to dynamically load a script
function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    script.onerror = () => console.error(`Error loading script: ${src}`);
    document.head.appendChild(script);
  }
  
  // Function to initialize libphonenumber-js
  function initializeLibphonenumber() {
    if (typeof window.libphonenumber === 'undefined') {
      console.error("libphonenumber-js is not loaded");
      return;
    }
  
    const { parsePhoneNumberFromString } = window.libphonenumber;
  
    document.addEventListener('input', (event) => {
      const element = event.target;
      if (element.tagName === 'INPUT' && /phone/i.test(element.name)) {
        const phoneNumber = element.value.replace(/\s/g, '');
        const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, 'GB');
        if (parsedPhoneNumber) {
          element.value = parsedPhoneNumber.formatInternational().replace(/\s/g, '');
        }
      }
    });
  }
  
  // Load libphonenumber-js dynamically
  loadScript('https://unpkg.com/libphonenumber-js/bundle/libphonenumber-js.min.js', initializeLibphonenumber);