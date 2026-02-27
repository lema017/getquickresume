package com.getquickresume.tests;

import com.getquickresume.pages.LandingPage;
import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

/**
 * Test Case 1: Landing Page Validation
 * 
 * Verify the landing page loads correctly with all key elements visible and functional.
 */
public class LandingPageTest extends BaseTest {
    
    private LandingPage landingPage;
    
    @BeforeMethod
    public void initPage() {
        landingPage = new LandingPage(driver);
    }
    
    @Test(groups = {"smoke", "landing"}, description = "Verify page loads and title contains GetQuickResume")
    public void testPageTitleContainsGetQuickResume() {
        landingPage.open();
        
        Assert.assertTrue(
            landingPage.pageTitleContains("getquickresume") || 
            landingPage.pageTitleContains("resume"),
            "Page title should contain 'GetQuickResume' or 'resume'. Actual: " + landingPage.getPageTitle()
        );
    }
    
    @Test(groups = {"smoke", "landing"}, description = "Verify hero section is visible with main heading")
    public void testHeroSectionIsVisible() {
        landingPage.open();
        
        Assert.assertTrue(
            landingPage.isHeroSectionVisible(),
            "Hero section should be visible on the landing page"
        );
    }
    
    @Test(groups = {"smoke", "landing"}, description = "Verify main CTA button is visible")
    public void testMainCtaButtonIsVisible() {
        landingPage.open();
        
        Assert.assertTrue(
            landingPage.isMainCtaVisible(),
            "Main CTA button (Get Started / Create Resume) should be visible"
        );
    }
    
    @Test(groups = {"smoke", "landing"}, description = "Verify navigation header is present")
    public void testNavigationIsVisible() {
        landingPage.open();
        
        Assert.assertTrue(
            landingPage.isNavigationVisible(),
            "Navigation header should be visible"
        );
    }
    
    @Test(groups = {"smoke", "landing"}, description = "Verify Pricing link is present in navigation")
    public void testPricingLinkIsVisible() {
        landingPage.open();
        
        Assert.assertTrue(
            landingPage.isPricingLinkVisible(),
            "Pricing link should be visible in navigation"
        );
    }
    
    @Test(groups = {"smoke", "landing"}, description = "Verify Blog link is present in navigation")
    public void testBlogLinkIsVisible() {
        landingPage.open();
        
        Assert.assertTrue(
            landingPage.isBlogLinkVisible(),
            "Blog link should be visible in navigation"
        );
    }
    
    @Test(groups = {"smoke", "landing"}, description = "Verify Login link is present in navigation")
    public void testLoginLinkIsVisible() {
        landingPage.open();
        
        Assert.assertTrue(
            landingPage.isLoginLinkVisible(),
            "Login link should be visible in navigation"
        );
    }
    
    @Test(groups = {"smoke", "landing"}, description = "Verify footer is visible")
    public void testFooterIsVisible() {
        landingPage.open();
        
        Assert.assertTrue(
            landingPage.isFooterVisible(),
            "Footer should be visible on the page"
        );
    }
    
    @Test(groups = {"smoke", "landing"}, description = "Verify CTA click navigates to login page")
    public void testCtaNavigatesToLogin() {
        landingPage.open();
        landingPage.clickGetStartedCta();
        
        String currentUrl = landingPage.getCurrentUrl();
        Assert.assertTrue(
            currentUrl.contains("/login") || currentUrl.contains("/wizard"),
            "Clicking CTA should navigate to login or wizard. Actual URL: " + currentUrl
        );
    }
    
    @Test(groups = {"smoke", "landing"}, description = "Verify logo is visible")
    public void testLogoIsVisible() {
        landingPage.open();
        
        Assert.assertTrue(
            landingPage.isLogoVisible(),
            "Logo should be visible in the header"
        );
    }
}
