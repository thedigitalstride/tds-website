// Function to dynamically load a script
import { parsePhoneNumberFromString } from 'libphonenumber-js';

// Function to initialize libphonenumber-js
function initializeLibphonenumber() {
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

import { parsePhoneNumberFromString } from 'libphonenumber-js';

// Function to initialize libphonenumber-js
function initializeLibphonenumber() {
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

// Initialize libphonenumber-js
initializeLibphonenumber();