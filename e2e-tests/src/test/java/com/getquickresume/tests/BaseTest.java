package com.getquickresume.tests;

import com.getquickresume.config.TestConfig;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;

/**
 * Base test class with WebDriver setup and teardown.
 * All test classes should extend this class.
 */
public class BaseTest {
    
    protected WebDriver driver;
    
    @BeforeMethod
    public void setUp() {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--disable-gpu");
        options.addArguments("--window-size=1920,1080");
        options.addArguments("--disable-extensions");
        options.addArguments("--disable-infobars");
        
        // Accept insecure certificates
        options.setAcceptInsecureCerts(true);
        
        String remoteUrl = TestConfig.getSeleniumRemoteUrl();
        
        try {
            driver = new RemoteWebDriver(new URL(remoteUrl), options);
            driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));
            driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(30));
            driver.manage().window().maximize();
        } catch (MalformedURLException e) {
            throw new RuntimeException("Invalid Selenium Remote URL: " + remoteUrl, e);
        }
    }
    
    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
    
    /**
     * Get the current WebDriver instance.
     */
    protected WebDriver getDriver() {
        return driver;
    }
}
