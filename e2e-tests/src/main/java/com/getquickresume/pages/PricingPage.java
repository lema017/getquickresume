package com.getquickresume.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;

/**
 * Page Object for the Pricing Page.
 */
public class PricingPage extends BasePage {
    
    // Pricing cards locators
    private static final By PRICING_CARDS = By.cssSelector("[class*='pricing'] [class*='card'], [class*='plan'], [class*='tier']");
    private static final By PRICING_SECTION = By.cssSelector("[class*='pricing'], main");
    
    // Price elements
    private static final By PRICE_AMOUNTS = By.xpath("//*[contains(text(), '$') or contains(text(), 'Free')]");
    private static final By PLAN_TITLES = By.cssSelector("[class*='plan'] h2, [class*='plan'] h3, [class*='card'] h2, [class*='card'] h3");
    
    // CTA buttons
    private static final By PLAN_CTA_BUTTONS = By.cssSelector("[class*='pricing'] button, [class*='plan'] button, [class*='pricing'] a[class*='button']");
    
    // Feature lists
    private static final By FEATURE_LISTS = By.cssSelector("[class*='pricing'] ul, [class*='plan'] ul, [class*='feature'] ul");
    
    // Page heading
    private static final By PAGE_HEADING = By.cssSelector("h1");
    
    public PricingPage(WebDriver driver) {
        super(driver);
    }
    
    /**
     * Navigate to the pricing page.
     */
    public void open() {
        navigateTo("/pricing");
    }
    
    /**
     * Check if pricing section is visible.
     */
    public boolean isPricingSectionVisible() {
        return isDisplayed(PRICING_SECTION);
    }
    
    /**
     * Get the number of pricing cards displayed.
     */
    public int getPricingCardsCount() {
        try {
            List<WebElement> cards = waitForElements(PRICING_CARDS);
            return cards.size();
        } catch (Exception e) {
            return 0;
        }
    }
    
    /**
     * Check if pricing cards are displayed (at least 2 plans).
     */
    public boolean arePricingCardsDisplayed() {
        return getPricingCardsCount() >= 2;
    }
    
    /**
     * Check if price amounts are visible.
     */
    public boolean arePricesVisible() {
        try {
            List<WebElement> prices = driver.findElements(PRICE_AMOUNTS);
            return prices.size() > 0;
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Check if CTA buttons are visible on pricing cards.
     */
    public boolean areCtaButtonsVisible() {
        try {
            List<WebElement> buttons = driver.findElements(PLAN_CTA_BUTTONS);
            return buttons.size() > 0;
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Get the page heading text.
     */
    public String getPageHeading() {
        return getText(PAGE_HEADING);
    }
    
    /**
     * Check if feature lists are displayed.
     */
    public boolean areFeatureListsVisible() {
        try {
            List<WebElement> lists = driver.findElements(FEATURE_LISTS);
            return lists.size() > 0;
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Check if page URL is correct.
     */
    public boolean isOnPricingPage() {
        return getCurrentUrl().contains("/pricing");
    }
}
