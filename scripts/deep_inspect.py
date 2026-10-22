import os
import json
import re
from bs4 import BeautifulSoup

html_path = os.path.join(os.path.dirname(__file__), "..", "docs", "research", "rendered-index.html")
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

soup = BeautifulSoup(html, "html.parser")

# 1. Title and meta
title = soup.title.get_text(strip=True) if soup.title else ""
meta_desc = soup.find("meta", {"name": "description"})
description = meta_desc.get("content", "") if meta_desc else ""

# 2. Stylesheets and CSS files
css_files = [link.get("href") for link in soup.find_all("link", rel="stylesheet") if link.get("href")]

# 3. Logo
logo_img = soup.find("img", alt=re.compile(r"logo", re.I)) or soup.find("img", src=re.compile(r"logo", re.I))
logo_src = logo_img.get("src") if logo_img else ""

# 4. Extract all banners
banners = []
for img in soup.find_all("img"):
    src = img.get("src", "")
    alt = img.get("alt", "")
    parent_a = img.find_parent("a")
    href = parent_a.get("href", "") if parent_a else ""
    if any(k in src.lower() or k in alt.lower() for k in ["banner", "599k", "affiliate", "introduce", "special-offer", "slide"]):
        banners.append({
            "src": src,
            "alt": alt,
            "href": href
        })

# 5. Extract course cards
courses = []
seen_hrefs = set()

# In Next.js Tailwind apps, courses often sit in cards with images and titles
for a in soup.find_all("a", href=re.compile(r"^/khoa-hoc/")):
    href = a.get("href")
    if href in seen_hrefs or href == "/khoa-hoc":
        continue
    
    # Try finding the card container
    card = a
    for _ in range(5):
        if card.parent and card.parent.name not in ["body", "html", "main"] and len(card.parent.find_all("a", href=re.compile(r"^/khoa-hoc/"))) <= 2:
            card = card.parent
        else:
            break
            
    # Extract details
    title_el = card.find(re.compile(r"h[1-6]")) or a.find(re.compile(r"h[1-6]"))
    title_text = title_el.get_text(strip=True) if title_el else a.get_text(strip=True)
    if not title_text or len(title_text) < 5:
        # Check text in card
        texts = [t.strip() for t in card.stripped_strings if len(t.strip()) > 5]
        title_text = texts[0] if texts else ""
        
    img_el = card.find("img")
    img_src = img_el.get("src") if img_el else ""
    
    # Find price
    # Vietnamese prices have đ or ₫ or k or vnđ
    prices = re.findall(r"(\d{1,3}(?:\.\d{3})+|\d+)\s*(?:[₫đĐ]|vnđ|k)", card.get_text())
    all_card_text = list(card.stripped_strings)
    
    # Rating
    stars = len(card.find_all("svg", class_=re.compile(r"star|yellow|gold", re.I)))
    rating_text = ""
    for txt in all_card_text:
        if re.search(r"^\d(?:\.\d)?$", txt):
            rating_text = txt
            break
            
    seen_hrefs.add(href)
    courses.append({
        "href": href,
        "title": title_text,
        "image": img_src,
        "prices": prices,
        "rating": rating_text or (str(stars) if stars > 0 else "5.0"),
        "raw_text": all_card_text
    })

# 6. Extract categories menu
categories = []
for a in soup.find_all("a", href=re.compile(r"/danh-muc/")):
    cat_text = a.get_text(strip=True)
    cat_href = a.get("href")
    if cat_text and not any(c["href"] == cat_href for c in categories):
        categories.append({
            "name": cat_text,
            "href": cat_href
        })

# 7. Extract stats or feature highlights
features = []
for item in soup.find_all(["div", "section"]):
    text = item.get_text(strip=True)
    if any(k in text for k in ["Truy cập trọn đời", "Hỗ trợ 24/7", "Cập nhật liên tục", "Hơn 2.000 khóa học", "Hoàn tiền"]):
        # Short feature block
        if len(text) < 150:
            features.append(text)

output = {
    "title": title,
    "description": description,
    "logo": logo_src,
    "css_files": css_files,
    "banners": banners,
    "categories": categories,
    "course_count": len(courses),
    "courses": courses,
    "features": list(set(features))
}

out_path = os.path.join(os.path.dirname(__file__), "..", "docs", "research", "extracted_data.json")
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print(f"Extraction complete! Found {len(courses)} courses, {len(categories)} categories, {len(banners)} banners.")
