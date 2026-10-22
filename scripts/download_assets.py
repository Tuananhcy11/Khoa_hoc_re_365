import os
import re
import json
import urllib.request
import urllib.parse
from bs4 import BeautifulSoup

base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
public_dir = os.path.join(base_dir, "public")
images_dir = os.path.join(public_dir, "images")
os.makedirs(images_dir, exist_ok=True)

# 1. Read rendered HTML
html_path = os.path.join(base_dir, "docs", "research", "rendered-index.html")
with open(html_path, "r", encoding="utf-8") as f:
    html_content = f.read()

soup = BeautifulSoup(html_content, "html.parser")

# 2. Extract all images to download
img_tags = soup.find_all("img")
download_map = {} # remote_url -> local_relative_path

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

print(f"Scanning {len(img_tags)} img tags...")

for img in img_tags:
    src = img.get("src") or img.get("data-src")
    if not src or "facebook.com/tr" in src or src.startswith("data:"):
        continue
    
    if src not in download_map:
        # Determine filename
        parsed = urllib.parse.urlparse(src)
        raw_name = os.path.basename(parsed.path)
        if not raw_name or "." not in raw_name:
            ext = ".png"
            raw_name = f"asset_{len(download_map)}{ext}"
        else:
            # sanitize filename
            raw_name = re.sub(r"[^a-zA-Z0-9_\-\.]", "_", raw_name)
            
        local_filename = f"{len(download_map)}_{raw_name}"
        local_path = os.path.join(images_dir, local_filename)
        
        # Download
        try:
            req = urllib.request.Request(src, headers=headers)
            with urllib.request.urlopen(req, timeout=20) as resp:
                content = resp.read()
                with open(local_path, "wb") as f_out:
                    f_out.write(content)
            download_map[src] = f"/images/{local_filename}"
            print(f"[{len(download_map)}] Downloaded: {local_filename} ({len(content)} bytes)")
        except Exception as e:
            print(f"Failed to download {src}: {e}")
            download_map[src] = src # fallback

# Save download mapping
map_path = os.path.join(base_dir, "docs", "research", "image_mapping.json")
with open(map_path, "w", encoding="utf-8") as f:
    json.dump(download_map, f, ensure_ascii=False, indent=2)

print(f"Downloaded {len(download_map)} images.")
