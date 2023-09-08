/// <reference types="react-scripts" />

// Declare the 'gtag' property on the 'Window' interface
interface Window {
  gtag: any;
}

// Access the 'gtag' property
window.gtag('event', 'example_event');