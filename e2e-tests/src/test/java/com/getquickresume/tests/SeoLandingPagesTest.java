package com.getquickresume.tests;

import com.getquickresume.pages.SeoLandingPages;
import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

/**
 * Test Case 3: SEO Landing Pages
 * 
 * Verify SEO-optimized landing pages load with correct content and meta tags.
 */
public class SeoLandingPagesTest extends BaseTest {
    
    private SeoLandingPages seoPages;
    
    @BeforeMethod
    public void initPage() {
        seoPages = new SeoLandingPages(driver);
    }
    
    // ========== ATS Resume Checker Page ==========
    
    @Test(groups = {"smoke", "seo"}, description = "Verify ATS Resume Checker page loads")
    public void testAtsCheckerPageLoads() {
        seoPages.openAtsResumeChecker();
        
        Assert.assertTrue(
            seoPages.isOnAtsCheckerPage(),
            "Should be on ATS Resume Checker page. Actual URL: " + seoPages.getCurrentUrl()
        );
    }
    
    @Test(groups = {"smoke", "seo"}, description = "Verify ATS Resume Checker has heading")
    public void testAtsCheckerHasHeading() {
        seoPages.openAtsResumeChecker();
        
        Assert.assertTrue(
            seoPages.isHeadingDisplayed(),
            "ATS Resume Checker page should have a heading"
        );
    }
    
    @Test(groups = {"seo"}, description = "Verify ATS Resume Checker has CTA")
    public void testAtsCheckerHasCta() {
        seoPages.openAtsResumeChecker();
        
        Assert.assertTrue(
            seoPages.isCtaVisible(),
            "ATS Resume Checker page should have a CTA button"
        );
    }
    
    @Test(groups = {"seo"}, description = "Verify ATS Resume Checker has meta tags")
    public void testAtsCheckerHasMetaTags() {
        seoPages.openAtsResumeChecker();
        
        Assert.assertTrue(
            seoPages.hasMetaTitle(),
            "ATS Resume Checker should have meta title"
        );
        
        Assert.assertTrue(
            seoPages.hasMetaDescription(),
            "ATS Resume Checker should have meta description"
        );
    }
    
    // ========== AI Resume Builder Page ==========
    
    @Test(groups = {"smoke", "seo"}, description = "Verify AI Resume Builder page loads")
    public void testAiBuilderPageLoads() {
        seoPages.openAiResumeBuilder();
        
        Assert.assertTrue(
            seoPages.isOnAiBuilderPage(),
            "Should be on AI Resume Builder page. Actual URL: " + seoPages.getCurrentUrl()
        );
    }
    
    @Test(groups = {"smoke", "seo"}, description = "Verify AI Resume Builder has heading")
    public void testAiBuilderHasHeading() {
        seoPages.openAiResumeBuilder();
        
        Assert.assertTrue(
            seoPages.isHeadingDisplayed(),
            "AI Resume Builder page should have a heading"
        );
    }
    
    @Test(groups = {"seo"}, description = "Verify AI Resume Builder has CTA")
    public void testAiBuilderHasCta() {
        seoPages.openAiResumeBuilder();
        
        Assert.assertTrue(
            seoPages.isCtaVisible(),
            "AI Resume Builder page should have a CTA button"
        );
    }
    
    @Test(groups = {"seo"}, description = "Verify AI Resume Builder has meta tags")
    public void testAiBuilderHasMetaTags() {
        seoPages.openAiResumeBuilder();
        
        Assert.assertTrue(
            seoPages.hasMetaTitle(),
            "AI Resume Builder should have meta title"
        );
        
        Assert.assertTrue(
            seoPages.hasMetaDescription(),
            "AI Resume Builder should have meta description"
        );
    }
    
    // ========== Resume Templates Page ==========
    
    @Test(groups = {"smoke", "seo"}, description = "Verify Resume Templates page loads")
    public void testTemplatesPageLoads() {
        seoPages.openResumeTemplates();
        
        Assert.assertTrue(
            seoPages.isOnTemplatesPage(),
            "Should be on Resume Templates page. Actual URL: " + seoPages.getCurrentUrl()
        );
    }
    
    @Test(groups = {"smoke", "seo"}, description = "Verify Resume Templates has heading")
    public void testTemplatesHasHeading() {
        seoPages.openResumeTemplates();
        
        Assert.assertTrue(
            seoPages.isHeadingDisplayed(),
            "Resume Templates page should have a heading"
        );
    }
    
    @Test(groups = {"seo"}, description = "Verify Resume Templates shows template cards")
    public void testTemplatesShowsCards() {
        seoPages.openResumeTemplates();
        
        Assert.assertTrue(
            seoPages.areTemplateCardsDisplayed() || seoPages.isContentVisible(),
            "Resume Templates page should show template cards or content"
        );
    }
    
    @Test(groups = {"seo"}, description = "Verify Resume Templates has meta tags")
    public void testTemplatesHasMetaTags() {
        seoPages.openResumeTemplates();
        
        Assert.assertTrue(
            seoPages.hasMetaTitle(),
            "Resume Templates should have meta title"
        );
        
        Assert.assertTrue(
            seoPages.hasMetaDescription(),
            "Resume Templates should have meta description"
        );
    }
    
    // ========== Resume Translator Page ==========
    
    @Test(groups = {"smoke", "seo"}, description = "Verify Resume Translator page loads")
    public void testTranslatorPageLoads() {
        seoPages.openResumeTranslator();
        
        Assert.assertTrue(
            seoPages.isOnTranslatorPage(),
            "Should be on Resume Translator page. Actual URL: " + seoPages.getCurrentUrl()
        );
    }
    
    @Test(groups = {"smoke", "seo"}, description = "Verify Resume Translator has heading")
    public void testTranslatorHasHeading() {
        seoPages.openResumeTranslator();
        
        Assert.assertTrue(
            seoPages.isHeadingDisplayed(),
            "Resume Translator page should have a heading"
        );
    }
    
    @Test(groups = {"seo"}, description = "Verify Resume Translator has content")
    public void testTranslatorHasContent() {
        seoPages.openResumeTranslator();
        
        Assert.assertTrue(
            seoPages.isContentVisible(),
            "Resume Translator page should have content"
        );
    }
    
    @Test(groups = {"seo"}, description = "Verify Resume Translator has meta tags")
    public void testTranslatorHasMetaTags() {
        seoPages.openResumeTranslator();
        
        Assert.assertTrue(
            seoPages.hasMetaTitle(),
            "Resume Translator should have meta title"
        );
        
        Assert.assertTrue(
            seoPages.hasMetaDescription(),
            "Resume Translator should have meta description"
        );
    }
}
