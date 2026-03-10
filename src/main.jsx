import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import HeadSegment from './HeadSegment.jsx';
import './index.css'; // Import Tailwind styles and base styles
import './i18n';

/**
 * Main entry point for the React application.
 * Mounts the 'App' component inside the <div id="root"> element in index.html.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  // React.StrictMode is useful for detecting problems and warnings during development.
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

/**
 * Secondary entry point for the Head Segment.
 * Mounts the 'HeadSegment' component inside the <script id="head-segment"> element in index.html.
 */
const headSegmentRoot = document.getElementById('head-segment');
if (headSegmentRoot) {
  ReactDOM.createRoot(headSegmentRoot).render(
    <React.StrictMode>
      <HeadSegment />
    </React.StrictMode>,
  );
}