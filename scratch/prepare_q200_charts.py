import os
from PIL import Image

os.makedirs("scratch", exist_ok=True)
os.makedirs("assets/charts", exist_ok=True)

# 1. Inspect and process AXTAL aging report
axtal_src = "1stFeedback/TimeCubic_Q200_Aging axtal report.jpg"
axtal_dst = "assets/charts/q200_aging_axtal_report.jpg"
if os.path.exists(axtal_src):
    img = Image.open(axtal_src)
    print(f"AXTAL report: size={img.size}, mode={img.mode}")
    img.save(axtal_dst, quality=92)
    print(f"Saved {axtal_dst}")

# 2. Inspect and process Calnex Sentinel photos
# Usually phone photos might have EXIF orientation or need rotation
for name, out_name in [("Q200 t1.jpg", "q200_calnex_tie_test_1.jpg"), ("Q200 t2.jpg", "q200_calnex_tie_test_2.jpg")]:
    src = os.path.join("1stFeedback", name)
    dst = os.path.join("assets/charts", out_name)
    if os.path.exists(src):
        img = Image.open(src)
        print(f"{name}: size={img.size}, mode={img.mode}")
        # Check orientation: if width < height (portrait), Calnex screen is sideways.
        # Calnex screens are horizontal aspect ratio (landscape).
        # If width < height, rotate 270 degrees (or 90 counter-clockwise) to landscape.
        w, h = img.size
        if h > w:
            # Let's rotate 270 degrees clockwise (90 counter-clockwise) or check EXIF
            rotated = img.rotate(270, expand=True)
            rotated.save(dst, quality=90)
            print(f"Rotated 270 deg and saved {dst} with size {rotated.size}")
        else:
            img.save(dst, quality=90)
            print(f"Saved {dst} with size {img.size}")
