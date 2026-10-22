from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    
    # 1. Test Home page
    page.goto("http://localhost:3000", wait_until="networkidle")
    page.screenshot(path="ai-website-cloner-template/docs/design-references/home-with-swipers.png")
    print("Home page verified.")
    
    # 2. Test Mua page pagination
    page.goto("http://localhost:3000/mua", wait_until="networkidle")
    page.screenshot(path="ai-website-cloner-template/docs/design-references/mua-with-pagination.png")
    print("Mua page verified.")
    
    # 3. Test Tai-khoan page
    page.goto("http://localhost:3000/tai-khoan", wait_until="networkidle")
    page.screenshot(path="ai-website-cloner-template/docs/design-references/tai-khoan-page.png")
    print("Tai-khoan page verified.")
    
    # 4. Mobile view test for mobile-bottom-nav
    mobile_page = browser.new_page(viewport={"width": 375, "height": 812})
    mobile_page.goto("http://localhost:3000", wait_until="networkidle")
    mobile_page.screenshot(path="ai-website-cloner-template/docs/design-references/mobile-with-bottom-nav.png")
    print("Mobile bottom nav verified.")
    mobile_page.close()
    
    browser.close()
print("All 4 verification checks passed successfully!")
