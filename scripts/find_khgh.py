import os
from bs4 import BeautifulSoup
import re

html_path = os.path.join(os.path.dirname(__file__), "..", "docs", "research", "rendered-index.html")
with open(html_path, "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

card = soup.find("article", class_=re.compile(r"khgh-course-card"))
if card:
    with open("docs/research/sample_course_card.html", "w", encoding="utf-8") as out:
        out.write(card.prettify())
    print("Sample card written to docs/research/sample_course_card.html")

# Find all khgh components / sections
classes = set()
for el in soup.find_all(True):
    for c in el.get("class", []):
        if c.startswith("khgh-"):
            classes.add(c)

with open("docs/research/khgh_classes.txt", "w", encoding="utf-8") as out:
    for c in sorted(classes):
        out.write(c + "\n")
print(f"Total khgh classes found: {len(classes)}")
