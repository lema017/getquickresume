package com.getquickresume.config;

/**
 * Configuration management for test execution.
 * Reads configuration from environment variables or system properties.
 */
public class TestConfig {
    
    private static final String DEFAULT_BASE_URL = "https://getquickresume.com";
    private static final String DEFAULT_REMOTE_URL = "http://localhost:4444/wd/hub";
    private static final int DEFAULT_TIMEOUT = 10;
    
    /**
     * Get the base URL for the application under test.
     */
    public static String getBaseUrl() {
        String envUrl = System.getenv("BASE_URL");
        String propUrl = System.getProperty("base.url");
        
        if (propUrl != null && !propUrl.isEmpty()) {
            return propUrl;
        }
        if (envUrl != null && !envUrl.isEmpty()) {
            return envUrl;
        }
        return DEFAULT_BASE_URL;
    }
    
    /**
     * Get the Selenium Remote WebDriver URL.
     */
    public static String getSeleniumRemoteUrl() {
        String envUrl = System.getenv("SELENIUM_REMOTE_URL");
        String propUrl = System.getProperty("selenium.remote.url");
        
        if (propUrl != null && !propUrl.isEmpty()) {
            return propUrl;
        }
        if (envUrl != null && !envUrl.isEmpty()) {
            return envUrl;
        }
        return DEFAULT_REMOTE_URL;
    }
    
    /**
     * Get the default timeout in seconds for explicit waits.
     */
    public static int getDefaultTimeout() {
        String timeout = System.getProperty("default.timeout");
        if (timeout != null && !timeout.isEmpty()) {
            try {
                return Integer.parseInt(timeout);
            } catch (NumberFormatException e) {
                return DEFAULT_TIMEOUT;
            }
        }
        return DEFAULT_TIMEOUT;
    }
    
    /**
     * Check if tests should run in headless mode.
     */
    public static boolean isHeadless() {
        String headless = System.getProperty("headless", "false");
        return Boolean.parseBoolean(headless);
    }
    
    /**
     * Check if running in Docker environment.
     */
    public static boolean isDockerEnvironment() {
        return System.getenv("SELENIUM_REMOTE_URL") != null;
    }
}
