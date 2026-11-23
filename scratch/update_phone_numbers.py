import os
import glob

files_to_update = []
for ext in ("*.html", "*.txt", "*.md"):
    files_to_update.extend(glob.glob(ext))

replacements = [
    ("+1 (781) 521-5862", "+1 (978) 406-7730"),
    ("+1-781-521-5862", "+1-978-406-7730"),
    ("+17815215862", "+19784067730"),
    ("781-521-5862", "978-406-7730"),
    ("+1-978-822-0888", "+1-978-406-7730"),
    ("978-822-0888", "978-406-7730"),
]

modified_count = 0
for fpath in files_to_update:
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()
    
    new_content = content
    for old, new in replacements:
        new_content = new_content.replace(old, new)
        
    if new_content != content:
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(new_content)
        modified_count += 1
        print(f"Updated phone numbers in: {fpath}")

print(f"Total files updated: {modified_count}")
