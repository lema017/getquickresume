package com.getquickresume.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;

/**
 * Page Object for the Blog Page and Blog Articles.
 */
public class BlogPage extends BasePage {
    
    // Blog listing page locators
    private static final By BLOG_ARTICLE_CARDS = By.cssSelector("[class*='blog'] [class*='card'], article, [class*='article'] a, [class*='post']");
    private static final By ARTICLE_LINKS = By.cssSelector("a[href*='/blog/']");
    private static final By BLOG_HEADING = By.cssSelector("h1");
    
    // Article page locators
    private static final By ARTICLE_TITLE = By.cssSelector("article h1, [class*='article'] h1, main h1");
    private static final By ARTICLE_CONTENT = By.cssSelector("article, [class*='article'], [class*='content'], main");
    private static final By ARTICLE_CTA = By.cssSelector("article a[class*='button'], article button, [class*='cta']");
    
    // Navigation
    private static final By BACK_TO_BLOG_LINK = By.xpath("//a[contains(@href, '/blog') and not(contains(@href, '/blog/'))]");
    private static final By BREADCRUMB_BLOG = By.xpath("//a[contains(text(), 'Blog')]");
    
    // Article metadata
    private static final By ARTICLE_DATE = By.cssSelector("[class*='date'], time");
    private static final By ARTICLE_AUTHOR = By.cssSelector("[class*='author']");
    
    public BlogPage(WebDriver driver) {
        super(driver);
    }
    
    /**
     * Navigate to the blog listing page.
     */
    public void open() {
        navigateTo("/blog");
    }
    
    /**
     * Navigate to a specific blog article.
     */
    public void openArticle(String slug) {
        navigateTo("/blog/" + slug);
    }
    
    /**
     * Check if blog article cards are displayed.
     */
    public boolean areArticleCardsDisplayed() {
        try {
            List<WebElement> cards = driver.findElements(BLOG_ARTICLE_CARDS);
            if (cards.isEmpty()) {
                cards = driver.findElements(ARTICLE_LINKS);
            }
            return cards.size() > 0;
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Get the number of article cards.
     */
    public int getArticleCardsCount() {
        try {
            List<WebElement> cards = driver.findElements(BLOG_ARTICLE_CARDS);
            if (cards.isEmpty()) {
                cards = driver.findElements(ARTICLE_LINKS);
            }
            return cards.size();
        } catch (Exception e) {
            return 0;
        }
    }
    
    /**
     * Click on the first article card.
     */
    public void clickFirstArticle() {
        List<WebElement> cards = driver.findElements(ARTICLE_LINKS);
        if (!cards.isEmpty()) {
            cards.get(0).click();
            waitForPageLoad();
        }
    }
    
    /**
     * Check if article title is displayed.
     */
    public boolean isArticleTitleDisplayed() {
        return isDisplayed(ARTICLE_TITLE);
    }
    
    /**
     * Get the article title text.
     */
    public String getArticleTitle() {
        return getText(ARTICLE_TITLE);
    }
    
    /**
     * Check if article content is displayed.
     */
    public boolean isArticleContentDisplayed() {
        return isDisplayed(ARTICLE_CONTENT);
    }
    
    /**
     * Check if article has a CTA.
     */
    public boolean hasArticleCta() {
        try {
            List<WebElement> ctas = driver.findElements(ARTICLE_CTA);
            return ctas.size() > 0;
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Check if back to blog navigation is available.
     */
    public boolean isBackToBlogVisible() {
        return isDisplayed(BACK_TO_BLOG_LINK) || isDisplayed(BREADCRUMB_BLOG);
    }
    
    /**
     * Click back to blog.
     */
    public void clickBackToBlog() {
        if (isDisplayed(BACK_TO_BLOG_LINK)) {
            click(BACK_TO_BLOG_LINK);
        } else if (isDisplayed(BREADCRUMB_BLOG)) {
            click(BREADCRUMB_BLOG);
        } else {
            // Navigate directly
            open();
        }
        waitForPageLoad();
    }
    
    /**
     * Check if on blog listing page.
     */
    public boolean isOnBlogListingPage() {
        String url = getCurrentUrl();
        return url.endsWith("/blog") || url.endsWith("/blog/");
    }
    
    /**
     * Check if on article page.
     */
    public boolean isOnArticlePage() {
        String url = getCurrentUrl();
        return url.contains("/blog/") && !isOnBlogListingPage();
    }
    
    /**
     * Get the blog heading.
     */
    public String getBlogHeading() {
        return getText(BLOG_HEADING);
    }
}
