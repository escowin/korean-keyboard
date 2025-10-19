/**
 * App version information
 * This file is automatically updated by the build process
 */

export const APP_VERSION = '1.0.1';
export const BUILD_TIMESTAMP = '2025-10-19T13:29:02.455Z';

// Helper function to get formatted version for display
export const getVersionDisplay = (): string => {
  return `v${APP_VERSION}`;
};

// Helper function to get full version info
export const getVersionInfo = () => {
  return {
    version: APP_VERSION,
    timestamp: BUILD_TIMESTAMP,
    display: getVersionDisplay()
  };
};
