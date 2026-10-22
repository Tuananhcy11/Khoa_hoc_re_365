import json
from bs4 import BeautifulSoup
import re

with open("docs/research/rendered-index.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

# 1. Swipers and Sliders
swipers = []
for el in soup.find_all(class_=re.compile(r"swiper|slider|carousel|slide", re.I)):
    swipers.append({
        "tag": el.name,
        "classes": el.get("class", []),
        "parent_classes": el.parent.get("class", []) if el.parent else [],
        "text_sample": el.get_text(strip=True)[:80]
    })

# 2. Bottom Dock / Mobile Nav Bar
bottom_docks = []
for el in soup.find_all(["nav", "aside", "div"], class_=re.compile(r"dock|bottom|mobile-nav|tabbar|fixed", re.I)):
    bottom_docks.append({
        "tag": el.name,
        "classes": el.get("class", []),
        "text": el.get_text(separator=" | ", strip=True)[:200],
        "links": [{"text": a.get_text(strip=True), "href": a.get("href")} for a in el.find_all("a")]
    })

# 3. Interactive components
tabs = []
for el in soup.find_all(class_=re.compile(r"tab|filter|pill|nav", re.I)):
    if el.name in ["ul", "div", "nav"] and len(el.find_all(["button", "a", "li"])) > 2:
        items = [x.get_text(strip=True) for x in el.find_all(["button", "a", "li"]) if x.get_text(strip=True)]
        if 2 < len(items) < 15:
            tabs.append({
                "classes": el.get("class", []),
                "items": items
            })

# 4. Search dropdown or autocomplete
search_modal = soup.find_all(class_=re.compile(r"search|suggest|autocomplete", re.I))
search_info = [{"classes": s.get("class", []), "text": s.get_text(strip=True)[:100]} for s in search_modal if s.get_text(strip=True)]

output = {
    "total_swipers": len(swipers),
    "swipers": swipers[:10],
    "bottom_docks": bottom_docks,
    "tabs_sample": tabs[:10],
    "search_info": search_info[:5]
}

with open("docs/research/feature_audit.json", "w", encoding="utf-8") as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print("Feature audit saved to docs/research/feature_audit.json")
