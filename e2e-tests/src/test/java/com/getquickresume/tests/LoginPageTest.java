package com.getquickresume.tests;

import com.getquickresume.pages.LoginPage;
import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

/**
 * Test Case 4: Login Page UI Validation
 * 
 * Verify login page displays correctly with all authentication options.
 */
public class LoginPageTest extends BaseTest {
    
    private LoginPage loginPage;
    
    @BeforeMethod
    public void initPage() {
        loginPage = new LoginPage(driver);
    }
    
    @Test(groups = {"smoke", "login"}, description = "Verify login page loads correctly")
    public void testLoginPageLoads() {
        loginPage.open();
        
        Assert.assertTrue(
            loginPage.isOnLoginPage(),
            "Should be on login page. Actual URL: " + loginPage.getCurrentUrl()
        );
    }
    
    @Test(groups = {"smoke", "login"}, description = "Verify Google OAuth button is visible")
    public void testGoogleLoginButtonIsVisible() {
        loginPage.open();
        
        Assert.assertTrue(
            loginPage.isGoogleLoginButtonVisible(),
            "Google OAuth login button should be visible"
        );
    }
    
    @Test(groups = {"smoke", "login"}, description = "Verify Google OAuth button is enabled")
    public void testGoogleLoginButtonIsEnabled() {
        loginPage.open();
        
        Assert.assertTrue(
            loginPage.isGoogleLoginButtonEnabled(),
            "Google OAuth login button should be enabled/clickable"
        );
    }
    
    @Test(groups = {"smoke", "login"}, description = "Verify login container is visible")
    public void testLoginContainerIsVisible() {
        loginPage.open();
        
        Assert.assertTrue(
            loginPage.isLoginContainerVisible(),
            "Login container/form should be visible"
        );
    }
    
    @Test(groups = {"login"}, description = "Verify page heading is present")
    public void testPageHeadingIsPresent() {
        loginPage.open();
        
        String heading = loginPage.getPageHeading();
        Assert.assertNotNull(
            heading,
            "Login page should have a heading"
        );
        Assert.assertFalse(
            heading.isEmpty(),
            "Login page heading should not be empty"
        );
    }
    
    @Test(groups = {"smoke", "login"}, description = "Verify back to home navigation is available")
    public void testBackToHomeLinkIsVisible() {
        loginPage.open();
        
        Assert.assertTrue(
            loginPage.isBackToHomeLinkVisible(),
            "Back to home link or logo should be visible"
        );
    }
    
    @Test(groups = {"login"}, description = "Verify clicking logo/back navigates to home")
    public void testBackToHomeNavigatesCorrectly() {
        loginPage.open();
        loginPage.clickBackToHome();
        
        String currentUrl = loginPage.getCurrentUrl();
        Assert.assertTrue(
            currentUrl.endsWith("/") || !currentUrl.contains("/login"),
            "Clicking back to home should navigate away from login. Actual URL: " + currentUrl
        );
    }
    
    @Test(groups = {"login", "responsive"}, description = "Verify login page works on mobile viewport")
    public void testMobileViewportLayout() {
        loginPage.open();
        
        Assert.assertTrue(
            loginPage.verifyMobileLayout(),
            "Login page should display correctly on mobile viewport"
        );
    }
    
    @Test(groups = {"login"}, description = "Verify page title is set")
    public void testPageTitleIsSet() {
        loginPage.open();
        
        String title = loginPage.getPageTitle();
        Assert.assertNotNull(
            title,
            "Login page should have a title"
        );
        Assert.assertFalse(
            title.isEmpty(),
            "Login page title should not be empty"
        );
    }
    
    @Test(groups = {"login"}, description = "Verify terms link is available (if present)")
    public void testTermsLinkVisibility() {
        loginPage.open();
        
        // Terms link is optional but good to have
        boolean hasTerms = loginPage.isTermsLinkVisible();
        // Just log the result, don't fail
        System.out.println("Terms link visible: " + hasTerms);
    }
    
    @Test(groups = {"login"}, description = "Verify privacy link is available (if present)")
    public void testPrivacyLinkVisibility() {
        loginPage.open();
        
        // Privacy link is optional but good to have
        boolean hasPrivacy = loginPage.isPrivacyLinkVisible();
        // Just log the result, don't fail
        System.out.println("Privacy link visible: " + hasPrivacy);
    }
}
