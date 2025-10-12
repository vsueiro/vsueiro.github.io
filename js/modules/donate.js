// Define Ko-Fi script tag
const script = document.createElement("script");
script.src = "https://storage.ko-fi.com/cdn/scripts/overlay-widget.js";

// Define callback
script.onload = function () {
  window.kofiWidgetOverlay.draw('vsueiro', {
    'type': 'floating-chat',
    'floating-chat.donateButton.text': 'Donate',
    'floating-chat.donateButton.background-color': '#5cb85c',
    'floating-chat.donateButton.text-color': '#fff'
  });
};

// Load script
document.head.append(script);