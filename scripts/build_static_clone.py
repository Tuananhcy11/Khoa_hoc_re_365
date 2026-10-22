import os
import re
import json
import shutil
from bs4 import BeautifulSoup

base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
static_clone_dir = os.path.join(os.path.dirname(base_dir), "khoahocgiahoi-clone-static")
os.makedirs(static_clone_dir, exist_ok=True)
static_css_dir = os.path.join(static_clone_dir, "css")
static_img_dir = os.path.join(static_clone_dir, "images")
os.makedirs(static_css_dir, exist_ok=True)
os.makedirs(static_img_dir, exist_ok=True)

# 1. Copy downloaded CSS files
src_css_dir = os.path.join(base_dir, "docs", "research", "css")
css_file_map = {}
for fname in os.listdir(src_css_dir):
    if fname.endswith(".css"):
        src_path = os.path.join(src_css_dir, fname)
        dest_path = os.path.join(static_css_dir, fname)
        shutil.copy2(src_path, dest_path)
        css_file_map[f"/_next/static/css/{fname}"] = f"css/{fname}"
print(f"Copied {len(css_file_map)} CSS files to static clone.")

# 2. Copy downloaded images
src_img_dir = os.path.join(base_dir, "public", "images")
img_mapping_path = os.path.join(base_dir, "docs", "research", "image_mapping.json")
with open(img_mapping_path, "r", encoding="utf-8") as f:
    img_map = json.load(f)

img_replace_map = {}
for remote_url, local_rel in img_map.items():
    if local_rel.startswith("/images/"):
        fname = os.path.basename(local_rel)
        src_file = os.path.join(src_img_dir, fname)
        dest_file = os.path.join(static_img_dir, fname)
        if os.path.exists(src_file):
            shutil.copy2(src_file, dest_file)
            img_replace_map[remote_url] = f"images/{fname}"

print(f"Copied {len(img_replace_map)} images to static clone.")

# 3. Process rendered-index.html
html_path = os.path.join(base_dir, "docs", "research", "rendered-index.html")
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# Replace CSS links
for remote_css, local_css in css_file_map.items():
    html = html.replace(remote_css, local_css)

# Replace image URLs
for remote_img, local_img in img_replace_map.items():
    html = html.replace(remote_img, local_img)

# Also ensure Be Vietnam Pro font is loaded from Google Fonts
font_link = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,330;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">'
if "</head>" in html:
    html = html.replace("</head>", f"{font_link}\n</head>")

# Remove external tracking scripts that cause console errors offline
html = re.sub(r'<script[^>]*facebook\.net[^>]*>.*?</script>', '', html, flags=re.DOTALL)
html = re.sub(r'<script[^>]*connect\.facebook\.net[^>]*></script>', '', html)

# Add custom inline JS for interactivity: FAQ accordion toggle, search filter, countdown timer
interactive_js = """
<script>
document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    document.querySelectorAll('.khgh-faq__item, details').forEach(item => {
        const title = item.querySelector('summary, h3, .khgh-faq__question, [class*="question"]');
        if (title) {
            title.style.cursor = 'pointer';
            title.addEventListener('click', function(e) {
                const answer = item.querySelector('.khgh-faq__answer, [class*="answer"], p');
                if (answer) {
                    const isVisible = answer.style.display !== 'none';
                    answer.style.display = isVisible ? 'none' : 'block';
                }
            });
        }
    });

    // Wishlist Toggle
    document.querySelectorAll('.khgh-course-card__wishlist, .wishlist_button').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const isPressed = this.getAttribute('aria-pressed') === 'true';
            this.setAttribute('aria-pressed', !isPressed);
            this.style.color = isPressed ? '' : '#ef4444';
        });
    });

    // Countdown Timer Simulation
    const timerEls = document.querySelectorAll('.khgh-countdown__clock, [class*="countdown"] span');
    let secondsLeft = 14 * 3600 + 35 * 60 + 22;
    setInterval(() => {
        if (secondsLeft > 0) secondsLeft--;
        const h = Math.floor(secondsLeft / 3600);
        const m = Math.floor((secondsLeft % 3600) / 60);
        const s = secondsLeft % 60;
        const pad = (n) => String(n).padStart(2, '0');
        const formatted = `${pad(h)}:${pad(m)}:${pad(s)}`;
        timerEls.forEach(el => {
            if (el.textContent.includes(':') && el.textContent.length <= 8) {
                el.textContent = formatted;
            }
        });
    }, 1000);

    // Search input
    const searchInputs = document.querySelectorAll('input[type="search"], input[placeholder*="Tìm"]');
    searchInputs.forEach(input => {
        input.addEventListener('keyup', function(e) {
            const val = this.value.toLowerCase().trim();
            if (e.key === 'Enter' && val) {
                const cards = document.querySelectorAll('.khgh-course-card');
                let found = 0;
                cards.forEach(card => {
                    const txt = card.textContent.toLowerCase();
                    if (txt.includes(val)) {
                        card.style.display = '';
                        found++;
                    } else {
                        card.style.display = 'none';
                    }
                });
            } else if (!val) {
                document.querySelectorAll('.khgh-course-card').forEach(card => card.style.display = '');
            }
        });
    });

    // Smooth scroll to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
</script>
"""

if "</body>" in html:
    html = html.replace("</body>", f"{interactive_js}\n</body>")

# Write to static clone
out_index = os.path.join(static_clone_dir, "index.html")
with open(out_index, "w", encoding="utf-8") as f:
    f.write(html)

print(f"Static clone created successfully at: {static_clone_dir}")
print(f"Index HTML size: {len(html)} bytes")
