package com.getquickresume.pages;

import com.getquickresume.config.TestConfig;
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

/**
 * Base page class with common methods for all page objects.
 * Provides utility methods for element interaction and waiting.
 */
public class BasePage {
    
    protected WebDriver driver;
    protected WebDriverWait wait;
    protected String baseUrl;
    
    public BasePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(TestConfig.getDefaultTimeout()));
        this.baseUrl = TestConfig.getBaseUrl();
    }
    
    /**
     * Navigate to a specific path on the base URL.
     */
    public void navigateTo(String path) {
        String url = baseUrl + path;
        driver.get(url);
        waitForPageLoad();
    }
    
    /**
     * Wait for an element to be visible and return it.
     */
    protected WebElement waitForElement(By locator) {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }
    
    /**
     * Wait for an element to be clickable and return it.
     */
    protected WebElement waitForClickable(By locator) {
        return wait.until(ExpectedConditions.elementToBeClickable(locator));
    }
    
    /**
     * Wait for all elements matching the locator to be visible.
     */
    protected List<WebElement> waitForElements(By locator) {
        return wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(locator));
    }
    
    /**
     * Click on an element after waiting for it to be clickable.
     */
    protected void click(By locator) {
        waitForClickable(locator).click();
    }
    
    /**
     * Click on an element using JavaScript (for elements that are hard to click).
     */
    protected void jsClick(By locator) {
        WebElement element = waitForElement(locator);
        ((JavascriptExecutor) driver).executeScript("arguments[0].click();", element);
    }
    
    /**
     * Enter text into an input field.
     */
    protected void sendKeys(By locator, String text) {
        WebElement element = waitForElement(locator);
        element.clear();
        element.sendKeys(text);
    }
    
    /**
     * Get text from an element.
     */
    protected String getText(By locator) {
        return waitForElement(locator).getText();
    }
    
    /**
     * Check if an element is displayed.
     */
    protected boolean isDisplayed(By locator) {
        try {
            return waitForElement(locator).isDisplayed();
        } catch (TimeoutException | NoSuchElementException e) {
            return false;
        }
    }
    
    /**
     * Check if an element is present without waiting.
     */
    protected boolean isPresent(By locator) {
        try {
            driver.findElement(locator);
            return true;
        } catch (NoSuchElementException e) {
            return false;
        }
    }
    
    /**
     * Check if an element is enabled.
     */
    protected boolean isEnabled(By locator) {
        try {
            return waitForElement(locator).isEnabled();
        } catch (TimeoutException | NoSuchElementException e) {
            return false;
        }
    }
    
    /**
     * Get the page title.
     */
    public String getPageTitle() {
        return driver.getTitle();
    }
    
    /**
     * Get the current URL.
     */
    public String getCurrentUrl() {
        return driver.getCurrentUrl();
    }
    
    /**
     * Scroll to an element.
     */
    protected void scrollToElement(By locator) {
        WebElement element = driver.findElement(locator);
        ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", element);
    }
    
    /**
     * Wait for page to fully load.
     */
    protected void waitForPageLoad() {
        wait.until(webDriver -> ((JavascriptExecutor) webDriver)
            .executeScript("return document.readyState").equals("complete"));
    }
    
    /**
     * Get attribute value from an element.
     */
    protected String getAttribute(By locator, String attribute) {
        return waitForElement(locator).getAttribute(attribute);
    }
    
    /**
     * Get the meta tag content by name.
     */
    public String getMetaContent(String name) {
        By metaLocator = By.cssSelector("meta[name='" + name + "']");
        try {
            WebElement meta = driver.findElement(metaLocator);
            return meta.getAttribute("content");
        } catch (NoSuchElementException e) {
            return null;
        }
    }
    
    /**
     * Get the meta tag content by property (for Open Graph tags).
     */
    public String getMetaPropertyContent(String property) {
        By metaLocator = By.cssSelector("meta[property='" + property + "']");
        try {
            WebElement meta = driver.findElement(metaLocator);
            return meta.getAttribute("content");
        } catch (NoSuchElementException e) {
            return null;
        }
    }
    
    /**
     * Set viewport size for responsive testing.
     */
    public void setViewportSize(int width, int height) {
        driver.manage().window().setSize(new Dimension(width, height));
    }
    
    /**
     * Set mobile viewport.
     */
    public void setMobileViewport() {
        setViewportSize(375, 812); // iPhone X dimensions
    }
    
    /**
     * Set desktop viewport.
     */
    public void setDesktopViewport() {
        setViewportSize(1920, 1080);
    }
}
