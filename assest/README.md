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
│   ├── product_q100_q101.png          # Q100 / Q101 Disciplined Oscillator hardware module
│   ├── product_q200.png               # Q200 Satellite Disciplined Oscillator hardware module
│   ├── product_a100.png               # A100 Ultra-Low Power Atomic Oscillator
│   ├── q050_datasheet_photo.jpg       # High-res photo from Q050 datasheet
│   ├── q052_datasheet_photo.jpg       # High-res photo from Q052 datasheet
│   ├── q100_datasheet_photo_rev_k.jpg # High-res photo from Q100 Rev K datasheet
│   ├── q100_datasheet_photo_rev_o.jpg # High-res photo from Q100 Rev O datasheet
│   ├── q101_datasheet_photo.jpg       # High-res photo from Q101 datasheet
│   └── q200_datasheet_photo.jpg       # High-res photo from Q200 datasheet
│
├── charts/
│   ├── products_comparison_overview.png # TimeCubic product family matrix & comparison table
│   ├── timing_solution_diagram.png    # High-level timing & synchronization solution architecture
│   ├── about_technology_diagram.png   # Proprietary thermal & signal processing technology overview
│   ├── q050_performance_curve.png     # Q050 frequency stability vs temperature & aging plot (950x697)
│   ├── q050_mechanical_outline.png    # Q050 dimension blueprint & pinout drawing (1249x349)
│   ├── q052_performance_curve.png     # Q052 performance curve (950x697)
│   ├── q101_performance_curve.png     # Q101 holdover / Allan deviation plot (1065x853)
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
│   ├── q050_datasheet_rev_b.pdf (also as q050.rev_b.pdf)
│   ├── q052_datasheet_rev_c.pdf (also as q052_rev._c.pdf)
│   ├── q100_datasheet_rev_k.pdf (also as q100.rev_k.pdf)
│   ├── q100_datasheet_rev_o.pdf (also as q100.rev_o.pdf)
│   ├── q101_datasheet_rev_c.pdf (also as q101rev_c.pdf)
│   └── q200_datasheet_rev_j.pdf (also as q200.rev_j.pdf)
│
└── raw/
    └── [Original unaltered files with their exact web server paths and names]
```

## Note for Frontend / Web Design
- Both relative path conventions `assest/...` and `assets/...` work interchangeably because `assets` is configured as a filesystem junction to `assest`.
- All product images have both web-ready cutouts and original high-resolution datasheet photos.
