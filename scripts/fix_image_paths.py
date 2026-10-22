import json
import os

path = os.path.join(os.path.dirname(__file__), "..", "public", "data", "siteData.json")
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

for c in data["courses"]:
    img = c.get("image", "")
    if img and not img.startswith("/") and not img.startswith("http"):
        c["image"] = "/" + img

for t in data["tools"]:
    img = t.get("image", "")
    if img and not img.startswith("/") and not img.startswith("http"):
        t["image"] = "/" + img

for tm in data["testimonials"]:
    img = tm.get("avatar", "")
    if img and not img.startswith("/") and not img.startswith("http"):
        tm["avatar"] = "/" + img

for k, v in data["siteInfo"].items():
    if isinstance(v, str) and (v.startswith("images/") or v.endswith(".png") or v.endswith(".webp") or v.endswith(".jpg")):
        if not v.startswith("/") and not v.startswith("http"):
            data["siteInfo"][k] = "/" + v

with open(path, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Fixed all image paths to include leading slash.")
