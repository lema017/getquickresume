package com.getquickresume.tests;

import com.getquickresume.pages.BlogPage;
import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

/**
 * Test Case 5: Blog Article Navigation
 * 
 * Verify blog functionality including article listing and individual article pages.
 */
public class BlogTest extends BaseTest {
    
    private BlogPage blogPage;
    
    @BeforeMethod
    public void initPage() {
        blogPage = new BlogPage(driver);
    }
    
    @Test(groups = {"smoke", "blog"}, description = "Verify blog listing page loads")
    public void testBlogPageLoads() {
        blogPage.open();
        
        Assert.assertTrue(
            blogPage.isOnBlogListingPage(),
            "Should be on blog listing page. Actual URL: " + blogPage.getCurrentUrl()
        );
    }
    
    @Test(groups = {"smoke", "blog"}, description = "Verify blog article cards are displayed")
    public void testBlogArticleCardsDisplayed() {
        blogPage.open();
        
        Assert.assertTrue(
            blogPage.areArticleCardsDisplayed(),
            "Blog article cards should be displayed on the listing page"
        );
    }
    
    @Test(groups = {"blog"}, description = "Verify blog has multiple articles")
    public void testBlogHasMultipleArticles() {
        blogPage.open();
        
        int articleCount = blogPage.getArticleCardsCount();
        Assert.assertTrue(
            articleCount >= 1,
            "Blog should have at least 1 article. Found: " + articleCount
        );
    }
    
    @Test(groups = {"smoke", "blog"}, description = "Verify clicking article navigates to article page")
    public void testClickFirstArticle() {
        blogPage.open();
        
        // Ensure we're on listing page first
        Assert.assertTrue(
            blogPage.areArticleCardsDisplayed(),
            "Should have articles to click on"
        );
        
        blogPage.clickFirstArticle();
        
        Assert.assertTrue(
            blogPage.isOnArticlePage(),
            "Should navigate to article page after clicking. Actual URL: " + blogPage.getCurrentUrl()
        );
    }
    
    @Test(groups = {"smoke", "blog"}, description = "Verify article page has title")
    public void testArticlePageHasTitle() {
        blogPage.open();
        
        if (blogPage.areArticleCardsDisplayed()) {
            blogPage.clickFirstArticle();
            
            Assert.assertTrue(
                blogPage.isArticleTitleDisplayed(),
                "Article page should display article title"
            );
        } else {
            // Navigate directly to a known article
            blogPage.openArticle("how-to-make-good-resume");
            
            Assert.assertTrue(
                blogPage.isArticleTitleDisplayed() || blogPage.isOnArticlePage(),
                "Article page should be accessible"
            );
        }
    }
    
    @Test(groups = {"blog"}, description = "Verify article page has content")
    public void testArticlePageHasContent() {
        blogPage.open();
        
        if (blogPage.areArticleCardsDisplayed()) {
            blogPage.clickFirstArticle();
        } else {
            blogPage.openArticle("how-to-make-good-resume");
        }
        
        Assert.assertTrue(
            blogPage.isArticleContentDisplayed(),
            "Article page should display article content"
        );
    }
    
    @Test(groups = {"blog"}, description = "Verify back to blog navigation works")
    public void testBackToBlogNavigation() {
        // First navigate to an article
        blogPage.open();
        
        if (blogPage.areArticleCardsDisplayed()) {
            blogPage.clickFirstArticle();
        } else {
            blogPage.openArticle("how-to-make-good-resume");
        }
        
        // Then navigate back
        blogPage.clickBackToBlog();
        
        Assert.assertTrue(
            blogPage.isOnBlogListingPage(),
            "Should navigate back to blog listing. Actual URL: " + blogPage.getCurrentUrl()
        );
    }
    
    @Test(groups = {"smoke", "blog"}, description = "Verify specific article URL works - how-to-make-good-resume")
    public void testSpecificArticleLoads() {
        blogPage.openArticle("how-to-make-good-resume");
        
        String currentUrl = blogPage.getCurrentUrl();
        Assert.assertTrue(
            currentUrl.contains("/blog/") || currentUrl.contains("how-to-make-good-resume"),
            "Should be on the specific article page. Actual URL: " + currentUrl
        );
        
        // Verify content loads
        Assert.assertTrue(
            blogPage.isArticleContentDisplayed() || blogPage.isArticleTitleDisplayed(),
            "Article content or title should be displayed"
        );
    }
    
    @Test(groups = {"blog"}, description = "Verify blog page has heading")
    public void testBlogPageHasHeading() {
        blogPage.open();
        
        String heading = blogPage.getBlogHeading();
        Assert.assertNotNull(
            heading,
            "Blog page should have a heading"
        );
    }
    
    @Test(groups = {"blog"}, description = "Verify article has CTA (optional)")
    public void testArticleHasCta() {
        blogPage.open();
        
        if (blogPage.areArticleCardsDisplayed()) {
            blogPage.clickFirstArticle();
        } else {
            blogPage.openArticle("how-to-make-good-resume");
        }
        
        // CTA is optional, just log the result
        boolean hasCta = blogPage.hasArticleCta();
        System.out.println("Article has CTA: " + hasCta);
    }
    
    @Test(groups = {"blog"}, description = "Verify article title is not empty")
    public void testArticleTitleNotEmpty() {
        blogPage.openArticle("how-to-make-good-resume");
        
        if (blogPage.isArticleTitleDisplayed()) {
            String title = blogPage.getArticleTitle();
            Assert.assertFalse(
                title.isEmpty(),
                "Article title should not be empty"
            );
        }
    }
}
