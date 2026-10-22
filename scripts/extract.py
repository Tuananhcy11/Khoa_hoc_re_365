import os
import json
import urllib.request
import re
from playwright.sync_api import sync_playwright

output_dir = os.path.join(os.path.dirname(__file__), "..", "docs")
ref_dir = os.path.join(output_dir, "design-references")
res_dir = os.path.join(output_dir, "research")
img_dir = os.path.join(os.path.dirname(__file__), "..", "public", "images")
os.makedirs(ref_dir, exist_ok=True)
os.makedirs(res_dir, exist_ok=True)
os.makedirs(img_dir, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    print("Navigating to https://khoahocgiahoi.com/...")
    page.goto("https://khoahocgiahoi.com/", wait_until="networkidle", timeout=60000)
    
    # Save the complete rendered HTML for exact reference
    rendered_html = page.content()
    with open(os.path.join(res_dir, "rendered-index.html"), "w", encoding="utf-8") as f:
        f.write(rendered_html)
    print("Rendered HTML saved (size: ", len(rendered_html), "bytes)")

    # Extract page structure
    js_extract = """() => {
        const getText = (el) => (el ? (el.innerText || el.textContent || '') : '').trim();
        const bodyStyle = window.getComputedStyle(document.body);
        
        // Colors and fonts
        const elements = Array.from(document.querySelectorAll('*'));
        const colors = new Set();
        const bgColors = new Set();
        const fonts = new Set();
        
        elements.forEach(el => {
            const cs = window.getComputedStyle(el);
            if (cs.color) colors.add(cs.color);
            if (cs.backgroundColor && cs.backgroundColor !== 'rgba(0, 0, 0, 0)' && cs.backgroundColor !== 'transparent') bgColors.add(cs.backgroundColor);
            if (cs.fontFamily) fonts.add(cs.fontFamily);
        });
        
        // Top bar info
        const topbar = document.querySelector('#top-bar, .top-bar, .header-top');
        const topbarText = getText(topbar);
        
        // Header navigation links
        const navItems = [];
        document.querySelectorAll('header a, nav a, .header a, #mega-menu-wrap a').forEach(a => {
            const txt = getText(a);
            if (txt && txt.length < 60 && !txt.includes('\\n')) {
                navItems.push({ text: txt, href: a.href });
            }
        });
        
        // Banners and sliders
        const banners = [];
        document.querySelectorAll('.banner, .slider, .carousel, [class*=\"banner\"], [class*=\"slider\"], .swiper-slide, .owl-item, img[src*=\"banner\"]').forEach(el => {
            const img = el.tagName === 'IMG' ? el : el.querySelector('img');
            const link = el.tagName === 'A' ? el : el.querySelector('a');
            const imgUrl = img ? (img.currentSrc || img.src || img.getAttribute('data-src') || '') : '';
            if (imgUrl) {
                banners.push({
                    img: imgUrl,
                    alt: img ? (img.alt || '') : '',
                    href: link ? link.href : '',
                    text: getText(el).slice(0, 100)
                });
            }
        });
        
        // Categories
        const categories = [];
        document.querySelectorAll('.cat-item, [class*=\"category\"], .nav-pills li, .tab-title, .widget_categories li, .category-card, .shop-category').forEach(el => {
            const a = el.querySelector('a') || el;
            const txt = getText(el);
            const img = el.querySelector('img');
            if (txt && txt.length < 50) {
                categories.push({
                    text: txt,
                    href: a.href || '',
                    img: img ? (img.currentSrc || img.src || img.getAttribute('data-src') || '') : ''
                });
            }
        });
        
        // All courses / products
        const products = [];
        document.querySelectorAll('.product, .type-product, .course, .course-item, .box-image, .col-inner, .product-small, .product-item').forEach(el => {
            const titleEl = el.querySelector('h2, h3, h4, .title, [class*=\"title\"], .name, .product-title, .woocommerce-loop-product__title');
            const priceEl = el.querySelector('.price, [class*=\"price\"], .woocommerce-Price-amount');
            const delEl = el.querySelector('del .woocommerce-Price-amount, del');
            const insEl = el.querySelector('ins .woocommerce-Price-amount, ins');
            const badgeEl = el.querySelector('.badge, .badge-container, .onsale, .ribbon, .badge-circle');
            const imgEl = el.querySelector('img');
            const linkEl = el.querySelector('a');
            const ratingEl = el.querySelector('.star-rating, .rating');
            
            const title = getText(titleEl);
            if (!title) return;
            
            products.push({
                title: title,
                fullPriceText: getText(priceEl),
                salePrice: getText(insEl),
                regularPrice: getText(delEl),
                badge: getText(badgeEl),
                rating: ratingEl ? (ratingEl.getAttribute('aria-label') || getText(ratingEl)) : '',
                img: imgEl ? (imgEl.currentSrc || imgEl.src || imgEl.getAttribute('data-src') || '') : '',
                link: linkEl ? linkEl.href : ''
            });
        });
        
        // Deduplicate products by title
        const uniqueProducts = [];
        const seenTitles = new Set();
        products.forEach(p => {
            if (!seenTitles.has(p.title)) {
                seenTitles.add(p.title);
                uniqueProducts.push(p);
            }
        });
        
        // Footer info
        const footer = document.querySelector('footer, #footer');
        const footerText = getText(footer);
        const footerLinks = [];
        if (footer) {
            footer.querySelectorAll('a').forEach(a => {
                const txt = getText(a);
                if (txt && txt.length < 60) {
                    footerLinks.push({ text: txt, href: a.href });
                }
            });
        }
        
        // Logo
        const logo = document.querySelector('.logo img, header img, [class*=\"logo\"] img, #logo img');
        const logoSrc = logo ? (logo.currentSrc || logo.src || logo.getAttribute('data-src') || '') : '';
        
        return {
            title: document.title,
            bodyBg: bodyStyle.backgroundColor,
            bodyFont: bodyStyle.fontFamily,
            bodyColor: bodyStyle.color,
            logo: logoSrc,
            topbarText: topbarText.slice(0, 300),
            colors: Array.from(colors).slice(0, 30),
            bgColors: Array.from(bgColors).slice(0, 30),
            fonts: Array.from(fonts).slice(0, 10),
            navItems: navItems.slice(0, 50),
            banners: banners.slice(0, 20),
            categories: categories.slice(0, 40),
            products: uniqueProducts,
            footerText: footerText.slice(0, 1000),
            footerLinks: footerLinks.slice(0, 40)
        };
    }"""
    
    data = page.evaluate(js_extract)
    
    with open(os.path.join(res_dir, "site-analysis.json"), "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"Extracted site analysis successfully: {len(data['products'])} unique products found.")
    print("Title:", data["title"])
    print("Logo:", data["logo"])
    print("Body Font:", data["bodyFont"])
    print("Nav items count:", len(data["navItems"]))
    print("Banners count:", len(data["banners"]))
    
    browser.close()
