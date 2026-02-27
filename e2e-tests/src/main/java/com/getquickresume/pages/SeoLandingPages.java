package com.getquickresume.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Page Object for SEO Landing Pages.
 * Handles /ats-resume-checker, /ai-resume-builder, /resume-templates, /resume-translator
 */
public class SeoLandingPages extends BasePage {
    
    // Common page elements
    private static final By PAGE_HEADING = By.cssSelector("h1");
    private static final By PAGE_CONTENT = By.cssSelector("main, [class*='content'], article");
    private static final By CTA_BUTTON = By.cssSelector("a[href*='login'], a[href*='wizard'], button[class*='primary'], a[class*='cta'], a[class*='button']");
    
    // Templates page specific
    private static final By TEMPLATE_CARDS = By.cssSelector("[class*='template'], [class*='card']");
    
    // Features/benefits section
    private static final By FEATURES_SECTION = By.cssSelector("[class*='feature'], [class*='benefit'], section");
    
    public SeoLandingPages(WebDriver driver) {
        super(driver);
    }
    
    /**
     * Navigate to ATS Resume Checker page.
     */
    public void openAtsResumeChecker() {
        navigateTo("/ats-resume-checker");
    }
    
    /**
     * Navigate to AI Resume Builder page.
     */
    public void openAiResumeBuilder() {
        navigateTo("/ai-resume-builder");
    }
    
    /**
     * Navigate to Resume Templates page.
     */
    public void openResumeTemplates() {
        navigateTo("/resume-templates");
    }
    
    /**
     * Navigate to Resume Translator page.
     */
    public void openResumeTranslator() {
        navigateTo("/resume-translator");
    }
    
    /**
     * Check if page heading is displayed.
     */
    public boolean isHeadingDisplayed() {
        return isDisplayed(PAGE_HEADING);
    }
    
    /**
     * Get the page heading text.
     */
    public String getHeadingText() {
        return getText(PAGE_HEADING);
    }
    
    /**
     * Check if page content is visible.
     */
    public boolean isContentVisible() {
        return isDisplayed(PAGE_CONTENT);
    }
    
    /**
     * Check if CTA button is visible.
     */
    public boolean isCtaVisible() {
        return isDisplayed(CTA_BUTTON);
    }
    
    /**
     * Click the main CTA button.
     */
    public void clickCta() {
        click(CTA_BUTTON);
    }
    
    /**
     * Check if template cards are displayed (for templates page).
     */
    public boolean areTemplateCardsDisplayed() {
        try {
            return driver.findElements(TEMPLATE_CARDS).size() > 0;
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Check if features section is visible.
     */
    public boolean isFeaturesVisible() {
        try {
            return driver.findElements(FEATURES_SECTION).size() > 0;
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Check if on ATS Resume Checker page.
     */
    public boolean isOnAtsCheckerPage() {
        return getCurrentUrl().contains("/ats-resume-checker");
    }
    
    /**
     * Check if on AI Resume Builder page.
     */
    public boolean isOnAiBuilderPage() {
        return getCurrentUrl().contains("/ai-resume-builder");
    }
    
    /**
     * Check if on Resume Templates page.
     */
    public boolean isOnTemplatesPage() {
        return getCurrentUrl().contains("/resume-templates");
    }
    
    /**
     * Check if on Resume Translator page.
     */
    public boolean isOnTranslatorPage() {
        return getCurrentUrl().contains("/resume-translator");
    }
    
    /**
     * Verify meta title is set.
     */
    public boolean hasMetaTitle() {
        String title = getPageTitle();
        return title != null && !title.isEmpty();
    }
    
    /**
     * Verify meta description is set.
     */
    public boolean hasMetaDescription() {
        String description = getMetaContent("description");
        return description != null && !description.isEmpty();
    }
}
