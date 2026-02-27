package com.getquickresume.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Page Object for the Login Page.
 */
public class LoginPage extends BasePage {
    
    // OAuth button locators
    private static final By GOOGLE_LOGIN_BUTTON = By.xpath("//button[contains(text(), 'Google') or contains(@class, 'google')]");
    private static final By GOOGLE_LOGIN_ALT = By.cssSelector("[class*='google'], [aria-label*='Google'], button[id*='google']");
    
    // Page elements
    private static final By PAGE_HEADING = By.cssSelector("h1, h2");
    private static final By LOGIN_CONTAINER = By.cssSelector("[class*='login'], [class*='auth'], main");
    
    // Navigation elements
    private static final By BACK_TO_HOME_LINK = By.xpath("//a[contains(@href, '/') and (contains(text(), 'Home') or contains(text(), 'Back'))]");
    private static final By LOGO_LINK = By.cssSelector("header a[href='/'], [class*='logo'] a, a[class*='logo']");
    
    // Terms and privacy links
    private static final By TERMS_LINK = By.xpath("//a[contains(@href, 'terms') or contains(text(), 'Terms')]");
    private static final By PRIVACY_LINK = By.xpath("//a[contains(@href, 'privacy') or contains(text(), 'Privacy')]");
    
    public LoginPage(WebDriver driver) {
        super(driver);
    }
    
    /**
     * Navigate to the login page.
     */
    public void open() {
        navigateTo("/login");
    }
    
    /**
     * Check if Google OAuth button is visible.
     */
    public boolean isGoogleLoginButtonVisible() {
        return isDisplayed(GOOGLE_LOGIN_BUTTON) || isDisplayed(GOOGLE_LOGIN_ALT);
    }
    
    /**
     * Check if Google OAuth button is enabled.
     */
    public boolean isGoogleLoginButtonEnabled() {
        if (isDisplayed(GOOGLE_LOGIN_BUTTON)) {
            return isEnabled(GOOGLE_LOGIN_BUTTON);
        }
        return isEnabled(GOOGLE_LOGIN_ALT);
    }
    
    /**
     * Get the page heading text.
     */
    public String getPageHeading() {
        return getText(PAGE_HEADING);
    }
    
    /**
     * Check if login container/form is visible.
     */
    public boolean isLoginContainerVisible() {
        return isDisplayed(LOGIN_CONTAINER);
    }
    
    /**
     * Check if back to home link is visible.
     */
    public boolean isBackToHomeLinkVisible() {
        return isDisplayed(BACK_TO_HOME_LINK) || isDisplayed(LOGO_LINK);
    }
    
    /**
     * Click back to home or logo.
     */
    public void clickBackToHome() {
        if (isDisplayed(BACK_TO_HOME_LINK)) {
            click(BACK_TO_HOME_LINK);
        } else {
            click(LOGO_LINK);
        }
    }
    
    /**
     * Check if current URL is login page.
     */
    public boolean isOnLoginPage() {
        return getCurrentUrl().contains("/login");
    }
    
    /**
     * Check if terms link is visible.
     */
    public boolean isTermsLinkVisible() {
        return isDisplayed(TERMS_LINK);
    }
    
    /**
     * Check if privacy link is visible.
     */
    public boolean isPrivacyLinkVisible() {
        return isDisplayed(PRIVACY_LINK);
    }
    
    /**
     * Verify login page has all required elements for mobile viewport.
     */
    public boolean verifyMobileLayout() {
        setMobileViewport();
        waitForPageLoad();
        
        boolean hasContainer = isLoginContainerVisible();
        boolean hasGoogleButton = isGoogleLoginButtonVisible();
        
        // Reset to desktop
        setDesktopViewport();
        
        return hasContainer && hasGoogleButton;
    }
}
