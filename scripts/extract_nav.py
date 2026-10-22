import json
from bs4 import BeautifulSoup

with open("docs/research/rendered-index.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

nav = soup.find(class_="mobile-bottom-nav")
nav_data = []
if nav:
    for a in nav.find_all("a"):
        nav_data.append({
            "href": a.get("href"),
            "text": a.get_text(strip=True),
            "svg": str(a.find("svg")) if a.find("svg") else ""
        })

dock = soup.find(class_="support_dock")
dock_html = dock.prettify() if dock else ""

# Also check header navigation
header_nav = []
for a in soup.select("header a, nav a"):
    txt = a.get_text(strip=True)
    if txt and len(txt) < 30:
        header_nav.append({"text": txt, "href": a.get("href")})

with open("docs/research/nav_details.json", "w", encoding="utf-8") as f:
    json.dump({
        "mobile_bottom_nav": nav_data,
        "support_dock": dock_html,
        "header_nav": header_nav[:25]
    }, f, ensure_ascii=False, indent=2)

print("Saved to docs/research/nav_details.json")
