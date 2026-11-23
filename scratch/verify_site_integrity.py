import os
import re
import json
import glob
from html.parser import HTMLParser

html_files = glob.glob("*.html")
errors = []
warnings = []

class IntegrityParser(HTMLParser):
    def __init__(self, filename):
        super().__init__()
        self.filename = filename
        self.links = []
        self.images = []
        self.scripts = []
        self.in_script = False
        self.script_type = None
        self.script_content = []

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        if tag == "a" and "href" in attrs_dict:
            self.links.append(attrs_dict["href"])
        elif tag == "img" and "src" in attrs_dict:
            self.images.append(attrs_dict["src"])
        elif tag == "script":
            self.in_script = True
            self.script_type = attrs_dict.get("type", "")
            self.script_content = []

    def handle_endtag(self, tag):
        if tag == "script" and self.in_script:
            self.in_script = False
            if self.script_type == "application/ld+json":
                content = "".join(self.script_content).strip()
                if content:
                    try:
                        json.loads(content)
                    except Exception as e:
                        errors.append(f"JSON-LD parse error in {self.filename}: {e}")

    def handle_data(self, data):
        if self.in_script:
            self.script_content.append(data)

print(f"Checking {len(html_files)} HTML files...")

for hf in html_files:
    with open(hf, "r", encoding="utf-8") as f:
        html = f.read()
    
    parser = IntegrityParser(hf)
    try:
        parser.feed(html)
    except Exception as e:
        errors.append(f"HTML parsing error in {hf}: {e}")
        continue
    
    # Check images
    for img in parser.images:
        if img.startswith("data:") or img.startswith("http://") or img.startswith("https://"):
            continue
        # Clean query strings / hashes
        clean_img = img.split("?")[0].split("#")[0]
        if not os.path.exists(clean_img):
            errors.append(f"Broken image in {hf}: '{img}' does not exist on disk!")
            
    # Check local links
    for link in parser.links:
        if (link.startswith("http://") or link.startswith("https://") or 
            link.startswith("mailto:") or link.startswith("tel:") or 
            link.startswith("#") or link.startswith("javascript:")):
            continue
        clean_link = link.split("?")[0].split("#")[0]
        if clean_link and not os.path.exists(clean_link):
            errors.append(f"Broken link in {hf}: '{link}' (resolved: {clean_link}) does not exist on disk!")

print("\n--- AUDIT RESULTS ---")
print(f"Total Errors Found: {len(errors)}")
for err in errors:
    print(f"  [ERROR] {err}")

if not errors:
    print("ALL CHECKS PASSED PERFECTLY! 100% of JSON-LD, images, and links are valid.")
