#!/usr/bin/env python3
"""Flat run in → vertical roller-coaster loop (center) → flat run out."""
from __future__ import annotations

import json
import math
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "js" / "home-bee-path.js"
VIEWBOX = "0 0 1000 180"
TRACK_Y = 90
LOOP_CX, LOOP_CY, LOOP_R = 550, 38, 52


def fmt(p: tuple[float, float]) -> str:
    return f"{p[0]:.1f} {p[1]:.1f}"


def cubic_arc_segment(a0: float, a1: float, cx: float, cy: float, r: float):
    k = 0.5522847498 * r
    p0 = (cx + r * math.cos(a0), cy + r * math.sin(a0))
    p3 = (cx + r * math.cos(a1), cy + r * math.sin(a1))
    t0 = (-math.sin(a0), math.cos(a0))
    t1 = (-math.sin(a1), math.cos(a1))
    p1 = (p0[0] + k * t0[0], p0[1] + k * t0[1])
    p2 = (p3[0] - k * t1[0], p3[1] - k * t1[1])
    return p0, p1, p2, p3


def build_path() -> str:
    a_bottom = math.pi / 2
    n = 8
    loop = " ".join(
        f"C {fmt(p1)}, {fmt(p2)}, {fmt(p3)}"
        for _, p1, p2, p3 in (
            cubic_arc_segment(
                a_bottom - i * 2 * math.pi / n,
                a_bottom - (i + 1) * 2 * math.pi / n,
                LOOP_CX,
                LOOP_CY,
                LOOP_R,
            )
            for i in range(n)
        )
    )
    return f"M 0 {TRACK_Y} L {LOOP_CX} {TRACK_Y} {loop} L 1000 {TRACK_Y}"


def main() -> None:
    path = build_path()
    OUT.write_text(
        f"""// Bee path: left → roller-coaster loop (center) → right. Regenerate: python3 scripts/generate-home-bee-path.py
const HOME_BEE_LOOP_PATH = {json.dumps(path)};
""",
        encoding="utf-8",
    )
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
