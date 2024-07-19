console.log('global.js v4.0 loaded');

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

  initializeFormInputStorage();
}

// Function to log the current state of session storage
function logSessionStorage() {
  const sessionStorageData = {};
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    sessionStorageData[key] = sessionStorage.getItem(key);
  }
  console.log('Current session storage:', sessionStorageData);
}

function isSessionStorageAvailable() {
  try {
    const testKey = 'test';
    sessionStorage.setItem(testKey, 'testValue');
    sessionStorage.removeItem(testKey);
    return true;
  } catch (error) {
    console.error('SessionStorage is not available:', error);
    return false;
  }
}

// Wrapper function to set item in session storage and log the update
function setSessionStorageItem(key, value) {
  sessionStorage.setItem(key, value);
  logSessionStorage();
  updateDataLayerWithSessionStorage();
}

// Function to initialize form input storage
function initializeFormInputStorage() {

  const formFields = document.querySelectorAll('input, textarea, select');

  formFields.forEach(field => {
    if (field.type !== 'file') { // Exclude file inputs
      field.addEventListener('change', () => {
        setSessionStorageItem(field.name, field.value);
      });
    }
  });

  populateFormData(formFields);
  saveUrlParametersToSessionStorage();
}

// Function to populate form fields with stored data
function populateFormData(formFields) {
  if (!isSessionStorageAvailable()) {
    console.error('SessionStorage is not available in this environment.');
    return;
  }

  formFields.forEach(field => {
    if (field.type === 'file') {
      return; // Skip file inputs
    }

    const fieldName = field.name;
    let storedValue = sessionStorage.getItem(fieldName);

    console.log(`Populating field: ${fieldName}, storedValue: ${storedValue}`);

    if (storedValue !== null && storedValue !== 'undefined') {
      try {
        field.value = storedValue;
      } catch (error) {
        console.error(`Error setting value for field ${fieldName}:`, error);
      }
    }

    if (fieldName === 'name') {
      const firstName = sessionStorage.getItem('firstName');
      const lastName = sessionStorage.getItem('lastName');
      if ((firstName && firstName !== 'undefined') || (lastName && lastName !== 'undefined')) {
        try {
          field.value = `${firstName || ''} ${lastName || ''}`.trim();
        } catch (error) {
          console.error(`Error setting value for name field:`, error);
        }
      }
    }

    if (fieldName === 'pageUrl') {
      const pageUrl = sessionStorage.getItem('pageUrl');
      if (pageUrl && pageUrl !== 'undefined') {
        try {
          field.value = pageUrl;
        } catch (error) {
          console.error(`Error setting value for pageUrl field:`, error);
        }
      }
    }

    if (fieldName === 'referrerUrl') {
      const referrerUrl = sessionStorage.getItem('referrerUrl');
      if (referrerUrl && referrerUrl !== 'undefined') {
        try {
          field.value = referrerUrl;
        } catch (error) {
          console.error(`Error setting value for referrerUrl field:`, error);
        }
      }
    }
  });
}

// Function to get URL parameters
function getUrlParameters() {
  const params = {};
  const queryString = window.location.search.substring(1);
  const regex = /([^&=]+)=([^&]*)/g;
  let match;

  while (match = regex.exec(queryString)) {
    params[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
  }

  return params;
}

// Function to save URL parameters to session storage
function saveUrlParametersToSessionStorage() {
  console.log('Saving URL parameters to session storage');
  const urlParams = getUrlParameters();
  for (const key in urlParams) {
    if (urlParams.hasOwnProperty(key)) {
      setSessionStorageItem(key, urlParams[key]);
    }
  }
  console.log('URL parameters saved to session storage:', urlParams);
}

// Function to update the dataLayer with sessionStorage data
function updateDataLayerWithSessionStorage() {
  const sessionData = {};
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    sessionData[key] = sessionStorage.getItem(key);
  }
  console.log('Session data to be pushed to dataLayer:', sessionData); // Debugging log
  if (!window.dataLayer) {
    window.dataLayer = [];
  }
  window.dataLayer.push({
    event: 'sessionData',
    sessionData: sessionData
  });
  console.log('DataLayer updated with session storage data:', sessionData);
}

// Function to store the referrer URL in sessionStorage
function storeReferrerUrl() {
  const referrerKey = 'referrerUrl';
  const referrerUrl = document.referrer;
  if (referrerUrl && !sessionStorage.getItem(referrerKey)) {
    sessionStorage.setItem(referrerKey, referrerUrl);
    console.log(`Referrer URL stored: ${referrerUrl}`);
  } else {
    console.log('Referrer URL already stored or not available.');
  }
  updateDataLayerWithSessionStorage();
}

// Function to store the current page URL in sessionStorage
function storePageUrl() {
  const pageUrlKey = 'pageUrl';
  const pageUrl = window.location.href;
  sessionStorage.setItem(pageUrlKey, pageUrl); // Always update the page URL
  console.log(`Page URL stored: ${pageUrl}`);
  updateDataLayerWithSessionStorage();
}

// Load libphonenumber-js and initialize the functionality
loadScript(
  'https://cdnjs.cloudflare.com/ajax/libs/libphonenumber-js/1.11.4/libphonenumber-js.min.js',
  initializeLibphonenumber);

// Store the referrer URL in sessionStorage
storeReferrerUrl();

// Store the current page URL in sessionStorage
storePageUrl();
