# TimeCubic Website Design Assets

All assets crawled and extracted from **[TimeCubic Inc.](https://www.timecubic.com)** for website redesign.

## Directory Structure Overview

```
assest/ (also mirrored via Windows junction to assets/)
├── brand/
│   ├── timecubic_logo.png             # Official TimeCubic logo (clean grayscale)
│   ├── hero_background_banner.png     # Full-width background header banner (1905x892)
│   └── contact_banner.png             # Contact page banner / graphic
│
├── products/
│   ├── product_q050_transparent.png   # Q50 Ultra-Low Power Oscillator (isolated/transparent background)
│   ├── product_q100_q101.png          # Q100 Disciplined Oscillator hardware module
│   ├── product_q200.png               # Q200 Satellite Disciplined Oscillator hardware module
│   ├── q40l_datasheet_photo.jpg       # High-res photo from Q40L datasheet
│   ├── q050_datasheet_photo.jpg       # High-res photo from Q50 datasheet
│   ├── q052_datasheet_photo.jpg       # High-res photo from Q52 datasheet
│   ├── q100_datasheet_photo_rev_k.jpg # High-res photo from Q100 Rev K datasheet
│   ├── q100_datasheet_photo_rev_o.jpg # High-res photo from Q100 Rev O datasheet
│   └── q200_datasheet_photo.jpg       # High-res photo from Q200 datasheet
│
├── charts/
│   ├── products_comparison_overview.png # TimeCubic product family matrix & comparison table
│   ├── timing_solution_diagram.png    # High-level timing & synchronization solution architecture
│   ├── about_technology_diagram.png   # Proprietary thermal & signal processing technology overview
│   ├── q050_performance_curve.png     # Q50 frequency stability vs temperature & aging plot (950x697)
│   ├── q050_mechanical_outline.png    # Q50 dimension blueprint & pinout drawing (1249x349)
│   ├── q052_performance_curve.png     # Q52 performance curve (950x697)
│   ├── q200_performance_curve_1.png   # Q200 phase noise / Allan deviation curve 1 (600x445)
│   ├── q200_performance_curve_2.png   # Q200 phase noise / Allan deviation curve 2 (725x457)
│   └── q200_performance_curve_3.png   # Q200 phase noise / Allan deviation curve 3 (642x417)
│
├── partners/
│   ├── partner_taitien.png            # Taitien Electronics logo
│   ├── partner_colorado_crystal.png   # Colorado Crystal Corporation logo
│   └── partner_micropt.png            # MicroPt logo
│
├── pdf/
│   ├── Q40L-100M-Rev_C.pdf            # Q40 series (Q40L-100 Low Power Oscillator, 12.5x12.5mm)
│   ├── q50_datasheet_rev_b.pdf (also as q050_datasheet_rev_b.pdf & q050.rev_b.pdf)
│   ├── q52_datasheet_rev_c.pdf (also as q052_datasheet_rev_c.pdf & q052_rev._c.pdf)
│   ├── Q52L-16M384_Rev_A.pdf (also as Q052L-16M384_Rev_A.pdf)
│   ├── Q69_Rev_c.pdf & Q69-100M-rev_C.pdf
│   ├── q100_datasheet_rev_k.pdf (also as q100.rev_k.pdf)
│   ├── q100_datasheet_rev_o.pdf (also as q100.rev_o.pdf)
│   └── q200_datasheet_rev_j.pdf (also as q200.rev_j.pdf)
│
└── raw/
    └── [Original unaltered files with their exact web server paths and names]
```

## Note for Frontend / Web Design
- Both relative path conventions `assest/...` and `assets/...` work interchangeably because `assets` is configured as a filesystem junction to `assest`.
- All product images have both web-ready cutouts and original high-resolution datasheet photos.
