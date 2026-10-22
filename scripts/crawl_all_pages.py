import os
import urllib.request
import re
from playwright.sync_api import sync_playwright

pages_to_crawl = [
    {"url": "https://khoahocgiahoi.com/mua", "slug": "mua"},
    {"url": "https://khoahocgiahoi.com/hoi-vien", "slug": "hoi-vien"},
    {"url": "https://khoahocgiahoi.com/cong-cu", "slug": "cong-cu"},
    {"url": "https://khoahocgiahoi.com/huong-dan-mua-hang", "slug": "huong-dan-mua-hang"},
    {"url": "https://khoahocgiahoi.com/cac-cau-hoi-thuong-gap", "slug": "cac-cau-hoi-thuong-gap"},
    {"url": "https://khoahocgiahoi.com/gioi-thieu", "slug": "gioi-thieu"},
    {"url": "https://khoahocgiahoi.com/danh-gia-khach-hang", "slug": "danh-gia-khach-hang"},
    {"url": "https://khoahocgiahoi.com/chinh-sach-affiliate", "slug": "chinh-sach-affiliate"},
    {"url": "https://khoahocgiahoi.com/khoa-hoc/tron-bo-khoa-hoc-tren-website-voi-quyen-truy-cap-vinh-vien-and-cap-nhat-lien-tuc", "slug": "khoa-hoc-599k"}
]

base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
res_dir = os.path.join(base_dir, "docs", "research", "pages")
static_dir = os.path.join(os.path.dirname(base_dir), "khoahocgiahoi-clone-static")
os.makedirs(res_dir, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    for pinfo in pages_to_crawl:
        url = pinfo["url"]
        slug = pinfo["slug"]
        print(f"Crawling {url}...")
        try:
            page = browser.new_page(viewport={"width": 1440, "height": 900})
            page.goto(url, wait_until="networkidle", timeout=30000)
            content = page.content()
            
            # Save raw HTML in docs/research/pages/
            out_raw = os.path.join(res_dir, f"{slug}.html")
            with open(out_raw, "w", encoding="utf-8") as f:
                f.write(content)
                
            # Also process for static-clone with local CSS and images
            static_content = content
            # Replace CSS
            static_content = re.sub(r'/_next/static/css/([a-zA-Z0-9_\-\.]+)\.css', r'css/\1.css', static_content)
            # Add Google Font
            font_link = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&display=swap" rel="stylesheet">'
            if "</head>" in static_content:
                static_content = static_content.replace("</head>", f"{font_link}\n</head>")
            
            out_static = os.path.join(static_dir, f"{slug}.html")
            with open(out_static, "w", encoding="utf-8") as f:
                f.write(static_content)
                
            print(f"  [OK] Saved {slug}.html ({len(content)} bytes)")
            page.close()
        except Exception as e:
            print(f"  [ERROR] Failed {url}: {e}")
            
    browser.close()
print("Done crawling all main pages!")
