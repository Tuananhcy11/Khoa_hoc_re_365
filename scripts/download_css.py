import os
import urllib.request

css_urls = [
    "/_next/static/css/b63708fea0b97aa6.css",
    "/_next/static/css/0c1461d35d05be91.css",
    "/_next/static/css/1b26f373a62fb7aa.css",
    "/_next/static/css/f0fb66a2b3fed81e.css",
    "/_next/static/css/4c3f17415e29cd31.css",
    "/_next/static/css/d71a9ee484034e35.css"
]

out_dir = os.path.join(os.path.dirname(__file__), "..", "docs", "research", "css")
os.makedirs(out_dir, exist_ok=True)

for rel in css_urls:
    url = "https://khoahocgiahoi.com" + rel
    fname = os.path.basename(rel)
    dest = os.path.join(out_dir, fname)
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        data = urllib.request.urlopen(req, timeout=15).read()
        with open(dest, "wb") as f:
            f.write(data)
        print(f"Downloaded {fname} ({len(data)} bytes)")
    except Exception as e:
        print(f"Failed {url}: {e}")
