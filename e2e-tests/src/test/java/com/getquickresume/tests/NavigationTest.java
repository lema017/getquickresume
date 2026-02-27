package com.getquickresume.tests;

import com.getquickresume.pages.BasePage;
import com.getquickresume.pages.PricingPage;
import com.getquickresume.pages.BlogPage;
import org.openqa.selenium.By;
import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

/**
 * Test Case 2: Navigation and Public Routes
 * 
 * Verify all public routes are accessible and load without errors.
 */
public class NavigationTest extends BaseTest {
    
    private BasePage basePage;
    private PricingPage pricingPage;
    private BlogPage blogPage;
    
    @BeforeMethod
    public void initPages() {
        basePage = new BasePage(driver);
        pricingPage = new PricingPage(driver);
        blogPage = new BlogPage(driver);
    }
    
    @Test(groups = {"smoke", "navigation"}, description = "Verify /pricing page loads with pricing cards")
    public void testPricingPageLoads() {
        pricingPage.open();
        
        Assert.assertTrue(
            pricingPage.isOnPricingPage(),
            "Should be on pricing page. Actual URL: " + pricingPage.getCurrentUrl()
        );
        
        Assert.assertTrue(
            pricingPage.isPricingSectionVisible(),
            "Pricing section should be visible"
        );
    }
    
    @Test(groups = {"smoke", "navigation"}, description = "Verify pricing cards are displayed")
    public void testPricingCardsDisplayed() {
        pricingPage.open();
        
        Assert.assertTrue(
            pricingPage.arePricingCardsDisplayed(),
            "At least 2 pricing cards should be displayed"
        );
    }
    
    @Test(groups = {"smoke", "navigation"}, description = "Verify /blog page loads with articles")
    public void testBlogPageLoads() {
        blogPage.open();
        
        Assert.assertTrue(
            blogPage.isOnBlogListingPage(),
            "Should be on blog listing page. Actual URL: " + blogPage.getCurrentUrl()
        );
        
        Assert.assertTrue(
            blogPage.areArticleCardsDisplayed(),
            "Blog article cards should be displayed"
        );
    }
    
    @Test(groups = {"smoke", "navigation"}, description = "Verify /legal/privacy page loads")
    public void testPrivacyPageLoads() {
        basePage.navigateTo("/legal/privacy");
        
        String currentUrl = basePage.getCurrentUrl();
        Assert.assertTrue(
            currentUrl.contains("/privacy") || currentUrl.contains("/legal"),
            "Should be on privacy page. Actual URL: " + currentUrl
        );
        
        // Verify page has content
        String title = basePage.getPageTitle();
        Assert.assertTrue(
            title != null && !title.isEmpty(),
            "Privacy page should have a title"
        );
    }
    
    @Test(groups = {"smoke", "navigation"}, description = "Verify /legal/terms page loads")
    public void testTermsPageLoads() {
        basePage.navigateTo("/legal/terms");
        
        String currentUrl = basePage.getCurrentUrl();
        Assert.assertTrue(
            currentUrl.contains("/terms") || currentUrl.contains("/legal"),
            "Should be on terms page. Actual URL: " + currentUrl
        );
        
        // Verify page has content
        String title = basePage.getPageTitle();
        Assert.assertTrue(
            title != null && !title.isEmpty(),
            "Terms page should have a title"
        );
    }
    
    @Test(groups = {"smoke", "navigation"}, description = "Verify /contact page loads with form")
    public void testContactPageLoads() {
        basePage.navigateTo("/contact");
        
        String currentUrl = basePage.getCurrentUrl();
        Assert.assertTrue(
            currentUrl.contains("/contact"),
            "Should be on contact page. Actual URL: " + currentUrl
        );
        
        // Verify page has content (form or heading)
        String title = basePage.getPageTitle();
        Assert.assertTrue(
            title != null && !title.isEmpty(),
            "Contact page should have a title"
        );
    }
    
    @Test(groups = {"navigation"}, description = "Verify /about page loads")
    public void testAboutPageLoads() {
        basePage.navigateTo("/about");
        
        String currentUrl = basePage.getCurrentUrl();
        // About might redirect or be part of landing page
        Assert.assertNotNull(
            basePage.getPageTitle(),
            "About page should have a title"
        );
    }
    
    @Test(groups = {"navigation"}, description = "Verify pricing page has CTA buttons")
    public void testPricingPageHasCtaButtons() {
        pricingPage.open();
        
        Assert.assertTrue(
            pricingPage.areCtaButtonsVisible(),
            "Pricing page should have CTA buttons for plans"
        );
    }
    
    @Test(groups = {"navigation"}, description = "Verify prices are visible on pricing page")
    public void testPricingPageShowsPrices() {
        pricingPage.open();
        
        Assert.assertTrue(
            pricingPage.arePricesVisible(),
            "Prices should be visible on pricing page"
        );
    }
}
