package com.getquickresume.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Page Object for the Landing Page (Home Page).
 */
public class LandingPage extends BasePage {
    
    // Hero section locators
    private static final By HERO_SECTION = By.cssSelector("[class*='hero'], main section:first-child");
    private static final By HERO_TITLE = By.cssSelector("h1");
    private static final By GET_STARTED_CTA = By.xpath("//a[contains(text(), 'Get Started') or contains(text(), 'Start') or contains(text(), 'Create')]");
    private static final By PRIMARY_CTA_BUTTON = By.cssSelector("a[href*='login'], a[href*='wizard'], button[class*='primary']");
    
    // Navigation locators
    private static final By NAV_HEADER = By.cssSelector("header, nav");
    private static final By NAV_PRICING_LINK = By.xpath("//a[contains(@href, '/pricing') or contains(text(), 'Pricing')]");
    private static final By NAV_BLOG_LINK = By.xpath("//a[contains(@href, '/blog') or contains(text(), 'Blog')]");
    private static final By NAV_LOGIN_LINK = By.xpath("//a[contains(@href, '/login') or contains(text(), 'Login') or contains(text(), 'Sign')]");
    private static final By LOGO = By.cssSelector("header a[href='/'], nav a[href='/'], [class*='logo']");
    
    // Footer locators
    private static final By FOOTER = By.cssSelector("footer");
    private static final By FOOTER_LINKS = By.cssSelector("footer a");
    
    // Feature sections
    private static final By FEATURES_SECTION = By.xpath("//*[contains(text(), 'Feature') or contains(text(), 'feature')]//ancestor::section");
    private static final By PRICING_SECTION = By.cssSelector("[id*='pricing'], [class*='pricing']");
    private static final By TESTIMONIALS_SECTION = By.xpath("//*[contains(text(), 'Testimonial') or contains(text(), 'testimonial') or contains(text(), 'review')]//ancestor::section");
    
    public LandingPage(WebDriver driver) {
        super(driver);
    }
    
    /**
     * Navigate to the landing page.
     */
    public void open() {
        navigateTo("/");
    }
    
    /**
     * Check if hero section is visible.
     */
    public boolean isHeroSectionVisible() {
        return isDisplayed(HERO_SECTION) || isDisplayed(HERO_TITLE);
    }
    
    /**
     * Get the hero title text.
     */
    public String getHeroTitle() {
        return getText(HERO_TITLE);
    }
    
    /**
     * Check if main CTA button is visible.
     */
    public boolean isMainCtaVisible() {
        return isDisplayed(GET_STARTED_CTA) || isDisplayed(PRIMARY_CTA_BUTTON);
    }
    
    /**
     * Click on the main CTA button.
     */
    public void clickGetStartedCta() {
        if (isDisplayed(GET_STARTED_CTA)) {
            click(GET_STARTED_CTA);
        } else {
            click(PRIMARY_CTA_BUTTON);
        }
    }
    
    /**
     * Check if navigation header is visible.
     */
    public boolean isNavigationVisible() {
        return isDisplayed(NAV_HEADER);
    }
    
    /**
     * Check if pricing link is present in navigation.
     */
    public boolean isPricingLinkVisible() {
        return isDisplayed(NAV_PRICING_LINK);
    }
    
    /**
     * Check if blog link is present in navigation.
     */
    public boolean isBlogLinkVisible() {
        return isDisplayed(NAV_BLOG_LINK);
    }
    
    /**
     * Check if login link is present in navigation.
     */
    public boolean isLoginLinkVisible() {
        return isDisplayed(NAV_LOGIN_LINK);
    }
    
    /**
     * Click on pricing link.
     */
    public void clickPricingLink() {
        click(NAV_PRICING_LINK);
    }
    
    /**
     * Click on blog link.
     */
    public void clickBlogLink() {
        click(NAV_BLOG_LINK);
    }
    
    /**
     * Click on login link.
     */
    public void clickLoginLink() {
        click(NAV_LOGIN_LINK);
    }
    
    /**
     * Check if footer is visible.
     */
    public boolean isFooterVisible() {
        scrollToElement(FOOTER);
        return isDisplayed(FOOTER);
    }
    
    /**
     * Check if logo is visible.
     */
    public boolean isLogoVisible() {
        return isDisplayed(LOGO);
    }
    
    /**
     * Click on logo to navigate home.
     */
    public void clickLogo() {
        click(LOGO);
    }
    
    /**
     * Check if page title contains expected text.
     */
    public boolean pageTitleContains(String text) {
        return getPageTitle().toLowerCase().contains(text.toLowerCase());
    }
}
