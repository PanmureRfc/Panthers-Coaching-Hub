const {
  useState,
  useEffect
} = React;

// ── PANTHERS PALETTE ──────────────────────────────────────────
const C = {
  black: "#000000",
  panel: "#0B0B0B",
  panel2: "#060606",
  line: "#241f1c",
  gold: "#C67E12",
  // burnt gold — rings, script, secondary headings
  goldL: "#E09A22",
  goldDim: "#6b450a",
  maroon: "#54000C",
  // brush stroke
  maroonL: "#7A0A18",
  white: "#FCFCFC",
  // display type
  text: "#EDE8E0",
  muted: "#7d7268",
  green: "#57B85F",
  red: "#7A0A18",
  redL: "#A8121F",
  tan: "#BFB29C",
  grey: "#4a4a4a"
};
const ECOLOR = {
  high: C.red,
  medium: C.gold,
  low: C.green
};
const CATS = ["All", "Warm-Up", "Handling", "Tackle", "Core Game", "Game"];

// ── PANTHERS ARCS (brand signature) ───────────────────────────
function Brush({
  w = 260,
  h = 26,
  color = C.maroon,
  style
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: w,
    height: h,
    viewBox: "0 0 260 26",
    preserveAspectRatio: "none",
    "aria-hidden": "true",
    style: {
      display: "block",
      ...style
    }
  }, /*#__PURE__*/React.createElement("path", {
    fill: color,
    d: "M3 14 C22 7 41 12 62 9 C84 6 100 13 124 10 C150 7 168 14 192 11 C214 8 232 13 257 8 L256 18 C232 23 213 17 191 20 C167 23 149 17 123 20 C99 23 83 16 61 19 C40 22 21 18 4 21 Z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: color,
    opacity: 0.75,
    d: "M14 22 C46 25 78 21 112 23 L110 25 C76 24 46 26 15 24 Z"
  }), /*#__PURE__*/React.createElement("circle", {
    fill: color,
    cx: 244,
    cy: 22,
    r: 1.6
  }), /*#__PURE__*/React.createElement("circle", {
    fill: color,
    cx: 251,
    cy: 17,
    r: 1.1
  }), /*#__PURE__*/React.createElement("circle", {
    fill: color,
    cx: 9,
    cy: 7,
    r: 1.3
  }));
}
function Wordmark() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "inline-block"
    }
  }, /*#__PURE__*/React.createElement(Brush, {
    w: 200,
    h: 20,
    color: C.maroon,
    style: {
      position: "absolute",
      left: -6,
      top: 14,
      opacity: 0.9
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: S.eyebrow
  }, "Panmure"), /*#__PURE__*/React.createElement("div", {
    style: S.wordmark
  }, "PANTHERS")));
}

// ── SVG DIAGRAMS ──────────────────────────────────────────────
function PitchDiagram({
  type
}) {
  // Two scales, both stated on the diagram so distances mean something.
  const FULL = 7; // px per metre — whole 40x30 pitch
  const ZOOM = 15; // px per metre — close-ups

  const P = (x, y, label, fill, stroke, txt, r = 9) => /*#__PURE__*/React.createElement("g", {
    key: `${x}-${y}-${label}`
  }, /*#__PURE__*/React.createElement("circle", {
    cx: x,
    cy: y,
    r: r,
    fill: fill,
    stroke: stroke,
    strokeWidth: 2
  }), /*#__PURE__*/React.createElement("text", {
    x: x,
    y: y + 3.5,
    textAnchor: "middle",
    fill: txt,
    fontSize: 9.5,
    fontWeight: "bold"
  }, label));
  const A = (x, y, l = "A", r) => P(x, y, l, C.black, C.gold, C.gold, r);
  const D = (x, y, l = "D", r) => P(x, y, l, "#180b0b", C.red, C.redL, r);
  const Cone = (x, y, col = C.gold) => /*#__PURE__*/React.createElement("polygon", {
    key: `c${x}${y}`,
    points: `${x},${y - 6} ${x - 4},${y + 3} ${x + 4},${y + 3}`,
    fill: col
  });
  const Ball = (x, y) => /*#__PURE__*/React.createElement("ellipse", {
    key: `b${x}${y}`,
    cx: x,
    cy: y,
    rx: 6,
    ry: 4,
    fill: C.tan,
    stroke: "#000"
  });
  const Scale = (x, y, m, px, label) => /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("line", {
    x1: x,
    y1: y,
    x2: x + m * px,
    y2: y,
    stroke: C.tan,
    strokeWidth: 1.5
  }), /*#__PURE__*/React.createElement("line", {
    x1: x,
    y1: y - 3,
    x2: x,
    y2: y + 3,
    stroke: C.tan,
    strokeWidth: 1.5
  }), /*#__PURE__*/React.createElement("line", {
    x1: x + m * px,
    y1: y - 3,
    x2: x + m * px,
    y2: y + 3,
    stroke: C.tan,
    strokeWidth: 1.5
  }), /*#__PURE__*/React.createElement("text", {
    x: x + m * px / 2,
    y: y - 6,
    textAnchor: "middle",
    fill: C.tan,
    fontSize: 8
  }, label));
  const Cap = (t1, t2, y = 246) => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("text", {
    x: 170,
    y: y,
    textAnchor: "middle",
    fill: "rgba(237,232,224,0.65)",
    fontSize: 9.5
  }, t1), /*#__PURE__*/React.createElement("text", {
    x: 170,
    y: y + 12,
    textAnchor: "middle",
    fill: C.gold,
    fontSize: 9.5
  }, t2));
  const arrow = (id, col) => /*#__PURE__*/React.createElement("marker", {
    id: id,
    key: id,
    markerWidth: "6",
    markerHeight: "6",
    refX: "3",
    refY: "3",
    orient: "auto"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0,0 L0,6 L6,3 z",
    fill: col
  }));
  const svg = children => /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 340 262",
    style: {
      width: "100%",
      borderRadius: 4,
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("defs", null, [arrow("ag", C.gold), arrow("ar", C.red), arrow("at", C.tan)]), children);

  // Full pitch: 40m x 30m at 7px/m = 280 x 210
  const PX = 30,
    PY = 12,
    PW = 280,
    PH = 210;
  const fullPitch = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: PX,
    y: PY,
    width: PW,
    height: PH,
    fill: "#123d1a",
    rx: 3
  }), /*#__PURE__*/React.createElement("rect", {
    x: PX,
    y: PY,
    width: 5 * FULL,
    height: PH,
    fill: "#0e3315"
  }), /*#__PURE__*/React.createElement("rect", {
    x: PX + PW - 5 * FULL,
    y: PY,
    width: 5 * FULL,
    height: PH,
    fill: "#0e3315"
  }), /*#__PURE__*/React.createElement("rect", {
    x: PX,
    y: PY,
    width: PW,
    height: PH,
    fill: "none",
    stroke: "rgba(252,252,252,0.8)",
    strokeWidth: 1.4,
    rx: 3
  }), /*#__PURE__*/React.createElement("line", {
    x1: PX + 5 * FULL,
    y1: PY,
    x2: PX + 5 * FULL,
    y2: PY + PH,
    stroke: "rgba(252,252,252,0.5)"
  }), /*#__PURE__*/React.createElement("line", {
    x1: PX + PW - 5 * FULL,
    y1: PY,
    x2: PX + PW - 5 * FULL,
    y2: PY + PH,
    stroke: "rgba(252,252,252,0.5)"
  }), /*#__PURE__*/React.createElement("line", {
    x1: PX + PW / 2,
    y1: PY,
    x2: PX + PW / 2,
    y2: PY + PH,
    stroke: "rgba(252,252,252,0.22)",
    strokeDasharray: "4,4"
  }), /*#__PURE__*/React.createElement("text", {
    x: PX + PW / 2,
    y: PY - 3,
    textAnchor: "middle",
    fill: C.tan,
    fontSize: 8
  }, "40m long · 30m wide"));

  // ── 6v6 SHAPE (full pitch) ──
  if (type === "shape") return svg(/*#__PURE__*/React.createElement(React.Fragment, null, fullPitch, [[80, 40], [80, 105], [80, 175], [120, 70], [120, 145], [155, 108]].map(([x, y]) => A(x, y)), [[215, 40], [215, 105], [215, 175], [250, 70], [250, 145], [280, 108]].map(([x, y]) => D(x, y)), Ball(80, 26), Scale(PX, PY + PH + 14, 10, FULL, "10m"), Cap("Six a side across the full 30m width", "Spread out · Don't all chase the ball")));

  // ── DEFENSIVE LINE (full pitch, 6v6) ──
  if (type === "defence") return svg(/*#__PURE__*/React.createElement(React.Fragment, null, fullPitch, /*#__PURE__*/React.createElement("line", {
    x1: 190,
    y1: PY + 8,
    x2: 190,
    y2: PY + PH - 8,
    stroke: "rgba(176,24,24,0.45)",
    strokeWidth: 1.5,
    strokeDasharray: "4,3"
  }), [35, 70, 105, 140, 175, 205].map(y => /*#__PURE__*/React.createElement("g", {
    key: y
  }, D(190, y), /*#__PURE__*/React.createElement("line", {
    x1: 179,
    y1: y,
    x2: 158,
    y2: y,
    stroke: C.red,
    strokeWidth: 1.8,
    markerEnd: "url(#ar)"
  }))), [35, 70, 105, 140, 175, 205].map(y => A(105, y)), Ball(105, 22), /*#__PURE__*/React.createElement("text", {
    x: 250,
    y: PY + PH - 6,
    textAnchor: "middle",
    fill: C.tan,
    fontSize: 8
  }, "all move up together"), Scale(PX, PY + PH + 14, 10, FULL, "10m"), Cap("Six defenders across 30m — roughly 5m each", "Arm's length plus · Call your player · Move up as one")));

  // ── RESTART / FREE PASS (full pitch) ──
  if (type === "restart") return svg(/*#__PURE__*/React.createElement(React.Fragment, null, fullPitch, A(170, 108, "FP"), /*#__PURE__*/React.createElement("circle", {
    cx: 170,
    cy: 108,
    r: 14,
    fill: "none",
    stroke: C.gold,
    strokeDasharray: "3,3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: 170 + 3 * FULL,
    y1: PY + 8,
    x2: 170 + 3 * FULL,
    y2: PY + PH - 8,
    stroke: "rgba(176,24,24,0.6)",
    strokeWidth: 1.5,
    strokeDasharray: "4,3"
  }), /*#__PURE__*/React.createElement("text", {
    x: 170 + 3 * FULL + 4,
    y: PY + 20,
    fill: C.redL,
    fontSize: 8
  }, "3m"), [45, 85, 125, 165, 200].map(y => D(170 + 3 * FULL + 16, y)), /*#__PURE__*/React.createElement("line", {
    x1: 180,
    y1: 104,
    x2: 195,
    y2: 80,
    stroke: C.gold,
    strokeWidth: 1.8,
    markerEnd: "url(#ag)"
  }), A(200, 74), [[125, 60], [125, 150], [95, 108]].map(([x, y]) => A(x, y)), Scale(PX, PY + PH + 14, 3, FULL, "3m"), Cap("After a try: free pass at the centre to the team that conceded", "Defence 3m back · Up when the first receiver touches it")));

  // ── BALL OUT OF PLAY (full pitch) ──
  if (type === "touchline") return svg(/*#__PURE__*/React.createElement(React.Fragment, null, fullPitch, /*#__PURE__*/React.createElement("line", {
    x1: PX,
    y1: PY,
    x2: PX + PW,
    y2: PY,
    stroke: C.gold,
    strokeWidth: 3
  }), /*#__PURE__*/React.createElement("text", {
    x: PX + PW / 2,
    y: PY - 3,
    textAnchor: "middle",
    fill: C.gold,
    fontSize: 8
  }, "touchline — ball went out here"), A(150, 26, "A"), D(150 + 14, 26, "D"), /*#__PURE__*/React.createElement("text", {
    x: 188,
    y: 30,
    fill: C.redL,
    fontSize: 8
  }, "one defender beside the thrower"), /*#__PURE__*/React.createElement("line", {
    x1: 150,
    y1: PY + 3 * FULL,
    x2: PX + PW - 6,
    y2: PY + 3 * FULL,
    stroke: "rgba(176,24,24,0.6)",
    strokeWidth: 1.5,
    strokeDasharray: "4,3"
  }), /*#__PURE__*/React.createElement("text", {
    x: PX + 6,
    y: PY + 3 * FULL + 10,
    fill: C.redL,
    fontSize: 8
  }, "3m back"), [[195, 60], [235, 60], [275, 60], [235, 100]].map(([x, y]) => D(x, y)), [[110, 70], [90, 120], [130, 155]].map(([x, y]) => A(x, y)), Scale(PX, PY + PH + 14, 3, FULL, "3m"), Cap("Free pass to the team that did NOT touch it last", "One defender beside the thrower · Everyone else 3m back")));

  // ── TACKLE HOLD (close-up, matches SRU layout) ──
  if (type === "tackle") return svg(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: 20,
    y: 12,
    width: 300,
    height: 200,
    fill: "#123d1a",
    rx: 3,
    stroke: "rgba(252,252,252,0.5)",
    strokeWidth: 1.2
  }), /*#__PURE__*/React.createElement("text", {
    x: 170,
    y: 9,
    textAnchor: "middle",
    fill: C.tan,
    fontSize: 8
  }, "close-up · about 20m across"), [60, 115, 225, 280].map(x => D(x, 70)), /*#__PURE__*/React.createElement("line", {
    x1: 40,
    y1: 92,
    x2: 300,
    y2: 92,
    stroke: C.gold,
    strokeWidth: 1.8,
    strokeDasharray: "7,4"
  }), /*#__PURE__*/React.createElement("text", {
    x: 44,
    y: 88,
    fill: C.gold,
    fontSize: 8
  }, "offside line — 1m back"), /*#__PURE__*/React.createElement("line", {
    x1: 170,
    y1: 107,
    x2: 170,
    y2: 78,
    stroke: C.tan,
    strokeWidth: 1,
    markerEnd: "url(#at)"
  }), /*#__PURE__*/React.createElement("text", {
    x: 176,
    y: 100,
    fill: C.tan,
    fontSize: 7.5
  }, "1m"), D(170, 107, "T"), A(170, 128, "B", 11), /*#__PURE__*/React.createElement("circle", {
    cx: 170,
    cy: 122,
    r: 22,
    fill: "none",
    stroke: C.red,
    strokeWidth: 1.5,
    strokeDasharray: "4,3"
  }), /*#__PURE__*/React.createElement("text", {
    x: 170,
    y: 155,
    textAnchor: "middle",
    fill: C.redL,
    fontSize: 8
  }, "held up — ref calls \"Tackle Complete\""), [[110, 175], [230, 175], [70, 200], [275, 200]].map(([x, y]) => A(x, y)), /*#__PURE__*/React.createElement("line", {
    x1: 182,
    y1: 132,
    x2: 218,
    y2: 166,
    stroke: C.gold,
    strokeWidth: 1.8,
    markerEnd: "url(#ag)"
  }), Scale(30, 205, 1, ZOOM * 2, "2m"), Cap("Carrier stops and passes to the nearest player", "Tackler releases · Defenders back 1m · Up on first touch", 232)));

  // ── POST TACKLE, NO BREAKDOWN (close-up, matches SRU layout) ──
  if (type === "post") return svg(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: 20,
    y: 12,
    width: 300,
    height: 200,
    fill: "#123d1a",
    rx: 3,
    stroke: "rgba(252,252,252,0.5)",
    strokeWidth: 1.2
  }), /*#__PURE__*/React.createElement("text", {
    x: 170,
    y: 9,
    textAnchor: "middle",
    fill: C.tan,
    fontSize: 8
  }, "close-up · about 20m across"), [60, 115, 225, 280].map(x => D(x, 70)), P(170, 70, "R", "#0d2a14", C.tan, C.tan), /*#__PURE__*/React.createElement("line", {
    x1: 40,
    y1: 92,
    x2: 300,
    y2: 92,
    stroke: C.gold,
    strokeWidth: 1.8,
    strokeDasharray: "7,4"
  }), /*#__PURE__*/React.createElement("text", {
    x: 44,
    y: 88,
    fill: C.gold,
    fontSize: 8
  }, "offside line — 1m from hindmost foot"), D(140, 110, "T"), /*#__PURE__*/React.createElement("ellipse", {
    cx: 172,
    cy: 125,
    rx: 18,
    ry: 11,
    fill: "#22160f",
    stroke: C.gold,
    strokeWidth: 1.5
  }), /*#__PURE__*/React.createElement("text", {
    x: 172,
    y: 128,
    textAnchor: "middle",
    fill: C.gold,
    fontSize: 8
  }, "B down"), A(210, 132, "9"), /*#__PURE__*/React.createElement("line", {
    x1: 186,
    y1: 128,
    x2: 198,
    y2: 131,
    stroke: C.gold,
    strokeWidth: 1.8,
    markerEnd: "url(#ag)"
  }), /*#__PURE__*/React.createElement("text", {
    x: 210,
    y: 152,
    textAnchor: "middle",
    fill: C.gold,
    fontSize: 7.5
  }, "must pass it"), [[95, 180], [160, 195], [250, 178], [295, 198]].map(([x, y]) => A(x, y)), /*#__PURE__*/React.createElement("line", {
    x1: 222,
    y1: 137,
    x2: 244,
    y2: 166,
    stroke: C.gold,
    strokeWidth: 1.8,
    markerEnd: "url(#ag)"
  }), Scale(30, 205, 1, ZOOM * 2, "2m"), Cap("Present it (arriving player must pass) or offload from the floor", "Nobody competes for the ball — no rucking at U10", 232)));

  // ── FIRST THERE IS 9 (close-up) ──
  if (type === "nine") return svg(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: 20,
    y: 12,
    width: 300,
    height: 200,
    fill: "#123d1a",
    rx: 3,
    stroke: "rgba(252,252,252,0.5)",
    strokeWidth: 1.2
  }), /*#__PURE__*/React.createElement("text", {
    x: 170,
    y: 9,
    textAnchor: "middle",
    fill: C.tan,
    fontSize: 8
  }, "close-up · about 20m across"), /*#__PURE__*/React.createElement("ellipse", {
    cx: 80,
    cy: 95,
    rx: 19,
    ry: 12,
    fill: "#22160f",
    stroke: C.gold,
    strokeWidth: 1.5
  }), /*#__PURE__*/React.createElement("text", {
    x: 80,
    y: 98,
    textAnchor: "middle",
    fill: C.gold,
    fontSize: 8
  }, "tackled"), A(118, 95, "9", 11), /*#__PURE__*/React.createElement("text", {
    x: 118,
    y: 118,
    textAnchor: "middle",
    fill: C.gold,
    fontSize: 7.5
  }, "first player there"), /*#__PURE__*/React.createElement("line", {
    x1: 130,
    y1: 92,
    x2: 158,
    y2: 82,
    stroke: C.gold,
    strokeWidth: 2,
    markerEnd: "url(#ag)"
  }), A(172, 76), [[218, 50], [262, 68], [232, 128], [290, 100]].map(([x, y]) => A(x, y)), /*#__PURE__*/React.createElement("line", {
    x1: 150,
    y1: 152,
    x2: 300,
    y2: 152,
    stroke: "rgba(198,126,18,0.35)",
    strokeWidth: 1,
    strokeDasharray: "4,3"
  }), /*#__PURE__*/React.createElement("text", {
    x: 228,
    y: 168,
    textAnchor: "middle",
    fill: C.gold,
    fontSize: 9
  }, "everyone else spreads wide"), /*#__PURE__*/React.createElement("text", {
    x: 228,
    y: 182,
    textAnchor: "middle",
    fill: C.tan,
    fontSize: 8
  }, "nobody else goes near the ball"), Scale(30, 205, 1, ZOOM * 2, "2m"), Cap("First player to the tackle is our 9 — they pass it away", "Everyone else gets width · Don't swarm it", 232)));

  // ── 4 CORNERS (drill) ──
  if (type === "corners") return svg(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: 20,
    y: 12,
    width: 300,
    height: 200,
    fill: "#123d1a",
    rx: 3,
    stroke: "rgba(252,252,252,0.5)",
    strokeWidth: 1.2
  }), /*#__PURE__*/React.createElement("text", {
    x: 170,
    y: 9,
    textAnchor: "middle",
    fill: C.tan,
    fontSize: 8
  }, "15–20m square"), [[80, 60], [260, 60], [260, 165], [80, 165]].map(([x, y]) => Cone(x, y)), [[62, 46], [50, 36]].map(([x, y]) => A(x, y, "", 7)), [[278, 46], [290, 36]].map(([x, y]) => A(x, y, "", 7)), [[278, 180], [290, 190]].map(([x, y]) => A(x, y, "", 7)), [[62, 180], [50, 190]].map(([x, y]) => A(x, y, "", 7)), /*#__PURE__*/React.createElement("line", {
    x1: 95,
    y1: 58,
    x2: 240,
    y2: 58,
    stroke: C.gold,
    strokeWidth: 2,
    markerEnd: "url(#ag)",
    strokeDasharray: "5,3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: 262,
    y1: 76,
    x2: 262,
    y2: 148,
    stroke: C.gold,
    strokeWidth: 2,
    markerEnd: "url(#ag)",
    strokeDasharray: "5,3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: 245,
    y1: 167,
    x2: 100,
    y2: 167,
    stroke: C.gold,
    strokeWidth: 2,
    markerEnd: "url(#ag)",
    strokeDasharray: "5,3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: 78,
    y1: 148,
    x2: 78,
    y2: 78,
    stroke: C.gold,
    strokeWidth: 2,
    markerEnd: "url(#ag)",
    strokeDasharray: "5,3"
  }), ["pass", "pass", "pass", "pass"].map((t, i) => {
    const pos = [[168, 50], [278, 115], [172, 182], [62, 115]][i];
    return /*#__PURE__*/React.createElement("text", {
      key: i,
      x: pos[0],
      y: pos[1],
      textAnchor: "middle",
      fill: C.gold,
      fontSize: 8
    }, t);
  }), Ball(80, 46), /*#__PURE__*/React.createElement("text", {
    x: 170,
    y: 120,
    textAnchor: "middle",
    fill: C.tan,
    fontSize: 9
  }, "run out, pass on, join the next corner"), /*#__PURE__*/React.createElement("text", {
    x: 170,
    y: 134,
    textAnchor: "middle",
    fill: C.gold,
    fontSize: 9,
    fontWeight: "bold"
  }, "then swap direction"), Cap("Equal players behind each cone — it flows round the square", "Two hands · Hands up early · Pass in front of them", 232)));

  // ── TWO-LINE PASSING (drill) ──
  if (type === "passing") return svg(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: 20,
    y: 12,
    width: 300,
    height: 200,
    fill: "#123d1a",
    rx: 3,
    stroke: "rgba(252,252,252,0.5)",
    strokeWidth: 1.2
  }), /*#__PURE__*/React.createElement("text", {
    x: 170,
    y: 9,
    textAnchor: "middle",
    fill: C.tan,
    fontSize: 8
  }, "about 40m across · 4 cones each side"), /*#__PURE__*/React.createElement("line", {
    x1: 170,
    y1: 20,
    x2: 170,
    y2: 204,
    stroke: "rgba(252,252,252,0.3)",
    strokeDasharray: "4,4"
  }), /*#__PURE__*/React.createElement("text", {
    x: 170,
    y: 200,
    textAnchor: "middle",
    fill: C.tan,
    fontSize: 8
  }, "halfway"), [45, 80, 115, 150].map(y => Cone(52, y)), [45, 80, 115, 150].map(y => Cone(288, y)), [45, 80, 115, 150].map((y, i) => A(66, y, String(i + 1), 8)), [45, 80, 115, 150].map((y, i) => A(274, y, String(i + 1), 8)), /*#__PURE__*/React.createElement("line", {
    x1: 78,
    y1: 45,
    x2: 160,
    y2: 45,
    stroke: C.gold,
    strokeWidth: 2,
    markerEnd: "url(#ag)"
  }), /*#__PURE__*/React.createElement("text", {
    x: 118,
    y: 38,
    textAnchor: "middle",
    fill: C.gold,
    fontSize: 8
  }, "carry to halfway first"), /*#__PURE__*/React.createElement("line", {
    x1: 166,
    y1: 50,
    x2: 150,
    y2: 74,
    stroke: C.gold,
    strokeWidth: 1.8,
    markerEnd: "url(#ag)",
    strokeDasharray: "4,3"
  }), /*#__PURE__*/React.createElement("text", {
    x: 128,
    y: 80,
    fill: C.gold,
    fontSize: 8
  }, "then pass"), /*#__PURE__*/React.createElement("line", {
    x1: 262,
    y1: 115,
    x2: 185,
    y2: 115,
    stroke: C.tan,
    strokeWidth: 1.8,
    markerEnd: "url(#at)",
    opacity: 0.7
  }), /*#__PURE__*/React.createElement("text", {
    x: 225,
    y: 108,
    textAnchor: "middle",
    fill: C.tan,
    fontSize: 8
  }, "other side runs too"), /*#__PURE__*/React.createElement("text", {
    x: 170,
    y: 176,
    textAnchor: "middle",
    fill: C.tan,
    fontSize: 9
  }, "one side first — then both at once"), Cap("The halfway carry is what gives everyone behind their depth", "Run onto it, don't wait for it · Two hands · Eyes up", 232)));
  return null;
}
const DIAGRAMS = [{
  id: "nine",
  label: "First There Is 9",
  icon: "9️⃣",
  desc: "First player to the tackle is our 9 — they pass it away, everyone else spreads"
}, {
  id: "tackle",
  label: "Tackle Hold",
  icon: "🤝",
  desc: "Held up, 'Tackle Complete' called — carrier stops and passes, defenders back 1m"
}, {
  id: "post",
  label: "Post Tackle",
  icon: "⬇️",
  desc: "On the ground: present it (arriving player must pass) or offload from the floor"
}, {
  id: "defence",
  label: "Defensive Line",
  icon: "🛡️",
  desc: "Six defenders across 30m — spread out and move up together"
}, {
  id: "shape",
  label: "6v6 Shape",
  icon: "📍",
  desc: "How six a side should look on the full 40x30 pitch"
}, {
  id: "corners",
  label: "4 Corners",
  icon: "🔄",
  desc: "Round the square, then swap direction"
}, {
  id: "passing",
  label: "Two-Line Passing",
  icon: "🏉",
  desc: "First carrier goes to halfway — that's what builds the depth"
}, {
  id: "restart",
  label: "Restart / Free Pass",
  icon: "▶️",
  desc: "After a try or an offence — free pass, defence 3m back"
}, {
  id: "touchline",
  label: "Ball Out of Play",
  icon: "↩️",
  desc: "New this season — one defender beside the thrower, rest 3m back"
}];

// ── AGE GROUPS & LAWS ────────────────────────────────────────
const AGES = [{
  id: "u10",
  label: "U10",
  full: "U10 / P5",
  strapline: "Refine the Core Skills",
  tiles: [{
    title: "Players",
    value: "6 v 6 mixed (max 3 subs)",
    icon: "👥"
  }, {
    title: "Pitch",
    value: "40m × 30m",
    icon: "📐"
  }, {
    title: "Ball",
    value: "Size 3",
    icon: "🏉"
  }, {
    title: "Game length",
    value: "Max 10 min per game",
    icon: "⏱️"
  }, {
    title: "Festival",
    value: "Max 60 min playing time",
    icon: "🏆"
  }, {
    title: "Scoring",
    value: "3-2-1 (per player)",
    icon: "🔢"
  }, {
    title: "Tackle",
    value: "Waist & below + Tackle Hold",
    icon: "🤝"
  }, {
    title: "Breakdown",
    value: "None — offload or pass",
    icon: "❌"
  }, {
    title: "Knock on",
    value: "Play on if two hands",
    icon: "✅"
  }, {
    title: "Hand off",
    value: "Not allowed",
    icon: "🚫"
  }, {
    title: "Kicking",
    value: "None in open play",
    icon: "🚫"
  }, {
    title: "Scrum & lineout",
    value: "Free pass instead",
    icon: "📋"
  }],
  cards: [{
    title: "3-2-1 Scoring",
    icon: "🔢",
    body: "Per player, not per team. Each player's 1st try is 3 points, 2nd is 2, every one after is 1. Three tries by three different players beats three by one player, 9–6. Coach it live: get it to someone who hasn't scored."
  }, {
    title: "Knock On, Play On",
    icon: "✅",
    body: "Two-handed attempt at the catch and it goes down — play continues. One-handed attempt — free pass to the other team. SRU want us sympathetic while they learn to handle under pressure. Praise the attempt."
  }, {
    title: "Tackle Hold",
    icon: "🤝",
    body: "Rewards a tackler who stops or significantly slows the carrier but can't get them down. Referee waits about 2 seconds for an offload then calls 'Tackle Complete'. Carrier stops and passes to the nearest player. Defenders retire 1m."
  }, {
    title: "Post Tackle — No Breakdown",
    icon: "❌",
    body: "On the ground the carrier presents (arriving player must pass) or offloads from the floor (receiver can run or pass). Tackler releases and retires 1m from the hindmost point. Nobody competes for the ball."
  }, {
    title: "Tackle Height",
    icon: "🎯",
    body: "On or below the waist. Above that is a free pass. No swing tackles — the tackler is responsible for bringing the carrier down safely. Referees may play advantage if height creeps up but the carrier can still pass."
  }, {
    title: "Restarts",
    icon: "🔄",
    body: "Start: any kick from the centre, must travel 5m, receivers 5m back. After a try: free pass at centre to the team that CONCEDED, defence 3m back. After an offence: free pass where it happened, defence 3m back."
  }, {
    title: "Ball Out of Play",
    icon: "↩️",
    body: "Free pass to the team that did not touch it last. One defender stands next to the attacker throwing in, the rest are 3m back from where it went out."
  }, {
    title: "Half Game Policy",
    icon: "👥",
    body: "Every player gets equal game time. Not affected by ability. With 10-minute games and a 60-minute festival cap, work the rotation out before you arrive rather than on the touchline."
  }]
}, {
  id: "u12",
  label: "U12",
  full: "U12 / P7",
  strapline: "Ready for the Big Game",
  tiles: [{
    title: "Players",
    value: "10 v 10 mixed (max 5 subs)",
    icon: "👥"
  }, {
    title: "Pitch",
    value: "60m × 40m (5m in-goals)",
    icon: "📐"
  }, {
    title: "Ball",
    value: "Size 3 or 4",
    icon: "🏉"
  }, {
    title: "Game length",
    value: "Max 40 min per game",
    icon: "⏱️"
  }, {
    title: "Festival",
    value: "Max 60 min playing time",
    icon: "🏆"
  }, {
    title: "Scoring",
    value: "3-2-1 or 1 point per try",
    icon: "🔢"
  }, {
    title: "Tackle",
    value: "Waist & below",
    icon: "🤝"
  }, {
    title: "Breakdown",
    value: "Up to 2 supporting players",
    icon: "⚔️"
  }, {
    title: "Hand off",
    value: "Allowed — not head or neck",
    icon: "✋"
  }, {
    title: "Kicking",
    value: "From hand, yes",
    icon: "🦶"
  }, {
    title: "Scrum",
    value: "5v5, contested hook",
    icon: "🐏"
  }, {
    title: "Lineout",
    value: "Hooker + 4, uncontested",
    icon: "🙌"
  }],
  cards: [{
    title: "The Breakdown",
    icon: "⚔️",
    body: "Up to 2 supporting players per team — a 2v2 contest. The tackler may release, get to their feet and be first in, and the defence can still add 2. Arriving players must support their own body weight when jackaling and come through the gate. Offside line is the hindmost point; defence can't move until the ball is played. Sanction is a free kick, defence 5m back."
  }, {
    title: "Scrum",
    icon: "🐏",
    body: "5 nearest players from each team. Both hookers may strike for the ball. No pushing — a resisted lean, with feet back and knees dropped towards the floor. Attacking scrum half must pass immediately. Defending scrum half stays at the mid-point until the ball is passed. Crouch, Bind, Set: ear to ear with heads left, props bind high and long."
  }, {
    title: "Lineout",
    icon: "🙌",
    body: "5 nearest players — hooker plus 4. Uncontested: the throwing team wins it. The catcher must pass immediately to the scrum half. The attacking 9 must pass or run beyond the back of the lineout, never through it. Defending hooker and 9 stand 2m from the middle. Everyone else 5m back until the ball crosses the rear."
  }, {
    title: "Hand Offs",
    icon: "✋",
    body: "Allowed now, but no contact to the head or neck of the tackler — free kick if it happens. Encourage two hands on the ball as the default, and evasive footwork to beat the defender before reaching for a hand off."
  }, {
    title: "Kicking",
    icon: "🦶",
    body: "Attacking kicks from hand are permitted — chips and grubbers are the ones to encourage. A ball on the ground cannot be kicked; they must pick it up. Free kick to the other team if they do."
  }, {
    title: "Restarts",
    icon: "🔄",
    body: "Careful — this reverses from U10. The game starts with a drop kick at the centre, at least 5m, receivers 5m back. After a try the team that SCORES restarts with a drop kick. After an offence it's a tapped free kick where it happened, defence 5m back."
  }, {
    title: "Tackle Height",
    icon: "🎯",
    body: "Still on or below the waist — free kick above it. No swing tackles; the tackler brings the carrier down safely. Referees may play advantage if a tackle drifts just above the green zone (never head or neck) and the carrier can still pass."
  }, {
    title: "In-goal & Dead Ball",
    icon: "🥅",
    body: "If an attacking kick goes over the dead ball line, or into the in-goal and is touched down by a defender, play restarts with a tap and pass on the 15m line to the defending team, with defenders 5m back."
  }, {
    title: "Scoring",
    icon: "🔢",
    body: "Either 3-2-1 or a straight point per try. Under 3-2-1 a player's first try is 3, second is 2, and every one after is 1 — so three different scorers beat one player scoring three."
  }, {
    title: "Half Game Policy",
    icon: "👥",
    body: "Every player gets equal game time, regardless of ability. Max 40 minutes per game, 60 minutes of playing time across a festival."
  }]
}, {
  id: "u14",
  label: "U14",
  full: "U14 / S2",
  strapline: "Best space, speed, low tackle, set piece",
  tiles: [{
    title: "Players",
    value: "15 v 15",
    icon: "👥"
  }, {
    title: "Pitch",
    value: "Full pitch",
    icon: "📐"
  }, {
    title: "Ball",
    value: "Size 4",
    icon: "🏉"
  }, {
    title: "Game length",
    value: "Max 60 min",
    icon: "⏱️"
  }, {
    title: "Scoring",
    value: "Try 5 · Con 2 · Pen 3",
    icon: "🔢"
  }, {
    title: "Tackle",
    value: "Waist & below",
    icon: "🤝"
  }, {
    title: "Breakdown",
    value: "Full World Rugby laws",
    icon: "⚔️"
  }, {
    title: "Hand off",
    value: "Allowed — not head or neck",
    icon: "✋"
  }, {
    title: "Scrum",
    value: "8v8, contested hook, 1m push",
    icon: "🐏"
  }, {
    title: "Lineout",
    value: "Min hooker + 4, uncontested",
    icon: "🙌"
  }, {
    title: "Kicking",
    value: "Full options, 50:22 included",
    icon: "🦶"
  }, {
    title: "Game time",
    value: "Half Game Policy applies",
    icon: "⚖️"
  }],
  cards: [{
    title: "Focus for this stage",
    icon: "🎯",
    body: "SRU's Blueprint priorities at U14: find the best space in attack using run, pass or kick; play with speed and keep the ball alive; develop effective low tackle technique; develop set piece skills."
  }, {
    title: "Scrum",
    icon: "🐏",
    body: "8 v 8 — three front row, two second row, two flankers and a number 8. Both hookers may strike. Maximum push of 1m, with the referee calling 'Stop Pushing' at 0.5m. The 8 can pick and pass to the scrum half. The attacking 9 may pass or run. The defending 9 cannot pass the mid-point until the ball is out — penalty if they do. Early push, or pushing more than 1m, is a free kick."
  }, {
    title: "Lineout",
    icon: "🙌",
    body: "Minimum of hooker plus 4 from each team, uncontested — the throwing team wins it. The catcher must pass immediately to the scrum half. The attacking 9 must pass or run beyond the back, never through it. Defending hooker and 9 stand 2m from the middle. Everyone else stays back until the ball crosses the rear. Any lineout offence is a free kick."
  }, {
    title: "The Breakdown",
    icon: "⚔️",
    body: "Full World Rugby laws now — no cap on numbers. Tackler releases and rolls away as soon as the tackle is complete. Arriving players support their own body weight when jackaling and come through the gate. Offside line is the hindmost point; defence can't move until the ball is played. Keep encouraging them to keep the ball alive."
  }, {
    title: "Tackle Height",
    icon: "🎯",
    body: "Still waist and below, and no targeting the ball. No swing tackles — the tackler brings the carrier down safely. Sanction steps up to a penalty now rather than a free kick. Referees may play advantage if height creeps just above the green zone and the carrier can still pass."
  }, {
    title: "Kicking",
    icon: "🦶",
    body: "All open play kicks permitted, including 50:22s. Goal line and 22m drop-outs follow World Rugby Law 12 — the ball must travel 5m, chasers behind the kicker, defenders behind the 5m line."
  }, {
    title: "Conversions",
    icon: "🥅",
    body: "If a try is scored in the wide channels — between the touchline and the 15m line — the kicker may bring the ball anywhere along the 15m line to take the conversion."
  }, {
    title: "Restarts",
    icon: "🔄",
    body: "Drop kick from the centre, must travel 10m, receiving team 10m back. After a try the team that SCORES restarts. Chasers in front of the kicker: scrum to the other team. Ball short of 10m: retake, or scrum to the other team."
  }, {
    title: "Scoring",
    icon: "🔢",
    body: "Full scoring arrives — 5 for a try, 2 for a conversion, 3 for a penalty."
  }]
}];
const findAge = id => AGES.find(a => a.id === id) || AGES[0];

// ── DRILLS ───────────────────────────────────────────────────
const DRILLS = [{
  id: 1,
  name: "Chicken, Hero, Duck",
  cat: "Warm-Up",
  ages: ["u10", "u12", "u14"],
  dur: 12,
  energy: "high",
  players: "8+",
  equip: "Cones",
  desc: "Catcher picks a player who chooses: Chicken (everyone goes), Hero (they go alone), Duck (they pick a partner). Caught players join the catching team.",
  points: ["Head up — where's the space?", "Change of pace, not just direction", "Duck: stay close enough to pass"],
  tip: "Run the first rounds as touch, then tackle hold, then full tackle once they're warm. Same game, and it doubles as a tackle progression."
}, {
  id: 2,
  name: "Toilet Tig",
  cat: "Warm-Up",
  ages: ["u10", "u12", "u14"],
  dur: 10,
  energy: "high",
  players: "8+",
  equip: "Cones, 3–4 balls",
  desc: "Taggers carry a ball and bump it off others to freeze them. Frozen players hold an arm out; a teammate flushes it down to free them.",
  points: ["Taggers: two hands on the ball", "Head up — who needs a flush?", "Don't all rescue the same person"],
  tip: "The two-hands rule turns this from a tig game into a ball security game. Same cue we use all season."
}, {
  id: 3,
  name: "Relay Circuit",
  cat: "Warm-Up",
  ages: ["u10", "u12", "u14"],
  dur: 12,
  energy: "high",
  players: "8+",
  equip: "Hurdles, ladders, cones, tackle bag",
  desc: "Teams race through hurdles, a cone triangle (sprint out, side shuffle, run backwards), ladders, then hit and lift the tackle bag before tagging the next player.",
  points: ["Low through the turns", "Quick feet, don't look down", "Bag: waist and below — the race doesn't change the height"],
  tip: "Run three or four short teams rather than two long ones, or half of them are queuing. If height creeps up at the bag, make that station non-competitive."
}, {
  id: 4,
  name: "Two-Line Passing",
  cat: "Handling",
  ages: ["u10", "u12", "u14"],
  dur: 15,
  energy: "medium",
  players: "8+",
  equip: "8 cones, 2 balls",
  desc: "Four cones each side, players spread across them. The first carrier takes it to halfway before the first pass, which gives everyone behind time to get depth.",
  points: ["Carry it to halfway — don't rush the pass", "Run onto it, don't wait for it", "Two hands"],
  tip: "Start one side at a time, then both sides at once so they have to keep their eyes up for traffic."
}, {
  id: 17,
  name: "4 Corners",
  cat: "Handling",
  ages: ["u10", "u12", "u14"],
  dur: 15,
  energy: "medium",
  players: "8+",
  equip: "4 cones, 1–2 balls",
  desc: "Four cones in a square, players behind each. First player runs out and passes left; the receiver runs out and passes to the next corner, flowing round the square. Then swap direction.",
  points: ["Two hands", "Hands up early — give them a target", "Pass in front of them, not at them"],
  tip: "Always swap direction. Most kids this age can only pass one way, and if you never swap, nobody finds out until a festival. Variations on the same square: diagonal running, pass before you get across, gut pass into the belly, high pass they jump for, pop pass, meet in the middle."
}, {
  id: 5,
  name: "5 Pass",
  cat: "Handling",
  ages: ["u10", "u12", "u14"],
  dur: 12,
  energy: "medium",
  players: "8+",
  equip: "Cones, bibs, 1 ball",
  desc: "Two teams, multi-directional. Complete five passes for a point. No try line, so they have to look everywhere.",
  points: ["Hands up before the pass comes", "Don't stand still after you pass", "Who's behind you?"],
  tip: "Level 1: two-hand drop plays on, one-hand drop is a turnover. Level 2: one touch turnover. Level 3: players set their own rules."
}, {
  id: 6,
  name: "Money Ball",
  cat: "Handling",
  ages: ["u10", "u12", "u14"],
  dur: 12,
  energy: "medium",
  players: "8+",
  equip: "Cones, bibs, 1 ball",
  desc: "Every completed pass is a point, but points only count once a player touches the ball on the floor and shouts BANK. Lose it first and the points go too.",
  points: ["How many are you risking?", "Two hands on the floor when you bank", "Talk — when are we banking?"],
  tip: "Banking is the same body position as presenting the ball after a tackle. They rehearse it dozens of times without being told they're practising."
}, {
  id: 7,
  name: "5 Pass Breakout",
  cat: "Handling",
  ages: ["u10", "u12", "u14"],
  dur: 12,
  energy: "high",
  players: "8+",
  equip: "Cones in 4 colours, bibs, 1 ball",
  desc: "Four coloured sides. Make five passes, then the coach calls a colour and they score over that line.",
  points: ["Head up while you pass — you don't know which way yet", "Nearest player to that side, call for it"],
  tip: "Call the colour on the third or fourth pass rather than the fifth. Keeps their heads up and stops them counting instead of playing."
}, {
  id: 8,
  name: "Hawick Ball",
  cat: "Core Game",
  ages: ["u10", "u12", "u14"],
  dur: 12,
  energy: "high",
  players: "10+",
  equip: "Cones, bibs, 1 ball",
  desc: "Multi-directional. Run, pass or kick, score in a zone or box at either end.",
  points: ["Which end is easier right now?", "Scan — where's the space and who's free?", "Defence: look for the interception"],
  tip: "SRU Core Game. At U10 skip the kicking version — it isn't in our game. Turn and burn (keep the ball after scoring, attack the other way) is the one worth reaching."
}, {
  id: 9,
  name: "Disco Touch",
  cat: "Handling",
  ages: ["u10", "u12", "u14"],
  dur: 15,
  energy: "high",
  players: "8+",
  equip: "Cones, bibs, headbands, 1 ball",
  desc: "Game of touch. Every player who scores gets a headband. First team with everyone in a headband wins.",
  points: ["Who hasn't got a headband yet?", "Put them into the space", "You've scored — now set someone else up"],
  tip: "This is the 3-2-1 scoring system as a game. Say it out loud: three different scorers beats one player scoring three. No headbands? Spare bibs in waistbands."
}, {
  id: 10,
  name: "Tackle 1 — Ground Confidence",
  cat: "Tackle",
  ages: ["u10", "u12", "u14"],
  dur: 12,
  energy: "medium",
  players: "6+",
  equip: "Mats if available",
  desc: "No tackling at all. Rolling, falling onto the side not the front, getting back up fast. Races and games on the floor.",
  points: ["Land on your side", "Get up quick", "The ground isn't scary"],
  tip: "Kids who pull shirts are usually kids who don't want to end up on the floor. Fix that first and the whole progression gets easier."
}, {
  id: 11,
  name: "Tackle 2 — Kneeling",
  cat: "Tackle",
  ages: ["u10", "u12", "u14"],
  dur: 15,
  energy: "medium",
  players: "6+",
  equip: "Bibs, mats if available",
  desc: "Both players kneeling. Carrier shuffles past, tackler wraps low and squeezes. Nobody goes to ground. Repetition on both shoulders.",
  points: ["Cheek to cheek", "Squeeze and hold", "Eyes open"],
  tip: "Kneeling removes all the fear. Get the grip right here and the standing versions are the same thing with legs."
}, {
  id: 12,
  name: "Tackle 3 — Walking, From the Side",
  cat: "Tackle",
  ages: ["u10", "u12", "u14"],
  dur: 15,
  energy: "medium",
  players: "6+",
  equip: "Bibs, cones",
  desc: "Carrier walks a straight line, tackler comes from the side and takes them down safely. Tackler lands on top, never underneath.",
  points: ["Foot close", "Eyes open, chin off your chest", "No swing tackles"],
  tip: "Pair a nervous child with a coach as the carrier. Walking pace means nobody gets hurt and confidence builds fast."
}, {
  id: 13,
  name: "Tackle 4 — Moving, From the Front",
  cat: "Tackle",
  ages: ["u10", "u12", "u14"],
  dur: 15,
  energy: "high",
  players: "6+",
  equip: "Bibs, cones",
  desc: "Carrier jogs at the tackler. Foot close, head to the side, wrap and go down together. Build the speed up gradually.",
  points: ["Foot close", "Head to the side — never the front", "Squeeze and hold"],
  tip: "Only raise the speed when the technique holds. If height starts creeping up, drop the speed back rather than shouting about it."
}, {
  id: 14,
  name: "Tackle 5 — The Tackle Hold",
  cat: "Tackle",
  ages: ["u10"],
  dur: 15,
  energy: "high",
  players: "6+",
  equip: "Bibs, cones",
  desc: "Carrier drives forward, tackler wraps low and stops them without going to ground. Coach calls 'Tackle Complete'. Carrier stops and passes to the nearest player, defenders retire 1m.",
  points: ["Stop them and hold on — you don't have to put them down", "Held up? Stop and pass", "Tacklers: release and get back 1m"],
  tip: "Referees will call 'Tackle Complete' at festivals. If that's the first time your players hear it, they'll freeze. Rehearse the actual words."
}, {
  id: 15,
  name: "Tackle 6 — Live 1v1 and 2v2",
  cat: "Tackle",
  ages: ["u10", "u12", "u14"],
  dur: 15,
  energy: "high",
  players: "8+",
  equip: "Bibs, cones",
  desc: "Small channel, everything from the block at game speed. 1v1 first, then 2v2 with a support player.",
  points: ["Foot close, squeeze and hold", "First there is 9", "Get up and get back 1m"],
  tip: "Name the low wrap loudly when you see it. Say nothing when a tackle comes off a shirt grab — what you praise is what you get."
}, {
  id: 20,
  name: "Barbarians",
  cat: "Core Game",
  ages: ["u10", "u12", "u14"],
  dur: 12,
  energy: "high",
  players: "8+",
  equip: "Cones, bibs, 1 ball",
  desc: "First touch on the ball must be a pass or offload. Second touch triggers a condition — a turnover, or the carrier goes to floor.",
  points: ["Get close enough to offload", "Stay connected — nobody isolated", "Defence: don't drift apart"],
  tip: "SRU Core Game. Mild: first touch must pass. Hot: second touch is a turnover. Spicy: second touch and the carrier goes to ground."
}, {
  id: 21,
  name: "Bannockburn",
  cat: "Core Game",
  ages: ["u10", "u12", "u14"],
  dur: 12,
  energy: "high",
  players: "10+",
  equip: "Cones, bibs, 1 ball",
  desc: "After each phase or touch, one defender drops back to their own try line. The defence gets thinner as the attack keeps going.",
  points: ["Where's the space now?", "Defence: who do we leave?", "Attack fast before they reorganise"],
  tip: "SRU Core Game. Brilliant for teaching attackers to look for the overlap, because it appears in front of them within two phases."
}, {
  id: 22,
  name: "Highlanders",
  cat: "Core Game",
  ages: ["u10", "u12", "u14"],
  dur: 12,
  energy: "high",
  players: "8+",
  equip: "Cones, bibs, 1 ball",
  desc: "The carrier must offload within one second of contact. If they can't, they pop it or hold on.",
  points: ["Two hands into contact", "Support arrives before the tackle, not after", "Defence: time your tackle to slow them"],
  tip: "SRU Core Game. The one-second rule forces support players to arrive early rather than jogging in afterwards."
}, {
  id: 23,
  name: "Caley Ball",
  cat: "Core Game",
  ages: ["u10", "u12", "u14"],
  dur: 12,
  energy: "high",
  players: "10+",
  equip: "Cones, bibs, 1 ball",
  desc: "The attack gets 3 touches to get out of their own half, then 6 touches to score.",
  points: ["Go forward first, sideways second", "Which space gets us furthest?", "Defence: stop the go forward"],
  tip: "SRU Core Game. Rewards straight running — teams that pass sideways run out of touches before they reach halfway."
}, {
  id: 24,
  name: "Wallace Ball",
  cat: "Core Game",
  ages: ["u10", "u12", "u14"],
  dur: 12,
  energy: "high",
  players: "10+",
  equip: "Cones, bibs, 1 ball",
  desc: "On a turnover, the team winning the ball has one phase to score.",
  points: ["Heads up the moment it turns over", "Attack the space they've left", "Defence: stay connected after you win it"],
  tip: "SRU Core Game. Teaches both sides that a turnover is the most dangerous moment in the game, in either direction."
}, {
  id: 25,
  name: "Muckabout",
  cat: "Warm-Up",
  ages: ["u10", "u12", "u14"],
  dur: 8,
  energy: "high",
  players: "6+",
  equip: "A few balls",
  desc: "Free play. No coaching, no conditions. Players express themselves while the physical prep happens around it.",
  points: ["Say nothing", "Let them play", "Watch — you'll learn more than you expect"],
  tip: "Straight from the Blueprint. The hardest thing here is a coach keeping quiet. Use it while stragglers arrive."
}, {
  id: 18,
  name: "10v10 Game",
  cat: "Game",
  ages: ["u12"],
  dur: 20,
  energy: "high",
  players: "20+",
  equip: "Cones, bibs, 1 ball",
  desc: "Full game on 60x40 applying whatever the session worked on. Scrums, lineouts and a 2v2 breakdown all live.",
  points: ["Apply what we practised", "Two supporting players at the breakdown, no more", "Through the gate, on your feet"],
  tip: "Referee the breakdown numbers strictly early on. If four arrive it stops being a contest and becomes a pile."
}, {
  id: 16,
  name: "6v6 Game",
  cat: "Game",
  ages: ["u10"],
  dur: 15,
  energy: "high",
  players: "12+",
  equip: "Cones, bibs, 1 ball",
  desc: "Full game on 40x30 applying whatever the session worked on. Referee it properly — free passes, tackle height, 'Tackle Complete'.",
  points: ["Apply what we practised", "Everyone touches the ball", "Praise the attempt, name the skill"],
  tip: "Condition it to the session: only the first arriving player may touch the ball on the ground, or the carrier must have someone within 3m."
}];
let ALL_DRILLS = DRILLS; // replaced at runtime with built-ins + custom
const setAllDrills = list => {
  ALL_DRILLS = list;
};
const findDrill = id => ALL_DRILLS.find(d => String(d.id) === String(id));
const APP_VERSION = "v15";

// ── BLOCK 1 ──────────────────────────────────────────────────
const BLOCKS = {
  u10: [{
    n: 1,
    theme: "Two hands · Getting comfortable on the ground",
    points: ["Two hands on the ball, every time", "Head up — where's the space?", "The ground isn't scary"],
    drills: [2, 4, 5, 10, 1],
    why: "The knock-on law is the change they'll notice first. Embed 'two hands' in week one and it does the work all season. No tackling today — ground confidence comes first."
  }, {
    n: 2,
    theme: "Support · Kneeling tackles",
    points: ["Stay close enough to pass", "Cheek to cheek", "Squeeze and hold"],
    drills: [1, 17, 5, 11, 16],
    why: "Duck is the same picture as the post-tackle law — carrier plus one close support player. Say that to them."
  }, {
    n: 3,
    theme: "Staying in your space · Walking tackles",
    points: ["Spread out — arm's length plus", "Foot close", "Eyes open, chin off your chest"],
    drills: [3, 7, 8, 12, 16],
    why: "The 40x30 pitch is the biggest practical change this season. Kids who defended fine at P4 get beaten outside until they learn to spread and move up together."
  }, {
    n: 4,
    theme: "First there is 9 · Tackling from the front",
    points: ["First there is 9, second is 10, everyone else spreads", "Foot close, eyes open", "Get up and get back 1m"],
    drills: [2, 6, 13, 16],
    why: "Condition the game so only the first arriving player may touch the ball on the ground. They stop swarming because swarming stops working, not because they've been told off."
  }, {
    n: 5,
    theme: "The Tackle Hold",
    points: ["Stop them and hold on", "Held up? Stop and pass to the nearest player", "Tacklers — release and get back 1m"],
    drills: [1, 4, 9, 14, 16],
    why: "Referees call 'Tackle Complete' at festivals. Rehearse the phrase so nobody stands still when they hear it for real."
  }, {
    n: 6,
    theme: "Putting it together · 3-2-1",
    points: ["Who hasn't scored yet?", "First there is 9, everyone else spreads", "Foot close, squeeze and hold"],
    drills: [2, 9, 8, 15, 16],
    why: "Under 3-2-1, three different scorers beat one player scoring three. Playing it out loud teaches unselfishness without anyone being told off for being greedy."
  }],
  u12: [],
  u14: []
};
const SESSION_TYPES = {
  sunday: {
    label: "Sunday",
    start: "10:00",
    duration: 90
  },
  wednesday: {
    label: "Wednesday",
    start: "18:00",
    duration: 60
  }
};
const SHAPE = [["Warm-up game", false], ["Handling drill", false], ["Game using that skill", false], ["Water", true], ["Tackling drill", false], ["Water", true], ["Contact game", false], ["Huddle", true]];

// The next few Sundays / Wednesdays, so nobody has to go and check a calendar
function upcoming(weekday, count) {
  const out = [];
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  while (out.length < count) {
    if (d.getDay() === weekday) out.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return out;
}
const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const shortLabel = (d, i) => (i === 0 ? "This " : "") + d.toLocaleDateString("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short"
});
const blankPlan = (age = "u10") => ({
  id: Date.now(),
  age,
  date: "",
  type: "sunday",
  theme: "",
  points: ["", "", ""],
  notes: "",
  drills: []
});

// ── WHATSAPP TEXT ────────────────────────────────────────────
function buildMessage(plan, dn = d => d.name) {
  const t = SESSION_TYPES[plan.type];
  const [h0, m0] = t.start.split(":").map(Number);
  let mins = h0 * 60 + m0;
  const clock = m => `${String(Math.floor(m / 60) % 24).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
  const when = plan.date ? new Date(plan.date + "T12:00").toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long"
  }) : t.label;
  const lines = [`🐆 *PANTHERS ${(plan.age || "u10").toUpperCase()}* — ${when}`, ""];
  if (plan.theme) lines.push(`*${plan.theme}*`, "");
  const pts = plan.points.filter(p => p);
  if (pts.length) {
    lines.push("*Coaching points*");
    pts.forEach((p, i) => lines.push(`${i + 1}. ${p}`));
    lines.push("");
  }
  if (plan.drills.length) {
    lines.push("*Plan*");
    plan.drills.forEach(d => {
      lines.push(`${clock(mins)}  ${dn(d)} (${d.dur}m)`);
      mins += d.dur;
    });
    lines.push(`${clock(mins)}  Huddle`, "");
    const kit = [...new Set(plan.drills.flatMap(d => d.equip.split(",").map(s => s.trim())))];
    lines.push(`*Kit:* ${kit.join(", ")}`, "");
  }
  if (plan.notes) lines.push(`*Notes:* ${plan.notes}`, "");
  lines.push("Splitting: same drill in parallel groups if we're short of coaches, or stations rotating every 10-12 min if numbers are big.");
  return lines.join("\n");
}

// ── SMALL COMPONENTS ─────────────────────────────────────────
function Card({
  title,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...S.card,
      ...style
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: S.cardHd
  }, title), children);
}
function DrillBody({
  d,
  custom,
  note
}) {
  const mine = (custom || []).filter(c => String(c.drillId) === String(d.id));
  const own = d.items && d.items.length ? [{
    id: "own" + d.id,
    name: "",
    bg: d.bg,
    items: d.items
  }] : [];
  const pics = own.concat(mine);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      margin: "4px 0 8px"
    }
  }, d.cat, " · ", d.players, " · ", d.equip), pics.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.id,
    style: {
      margin: "0 0 10px"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 340 250",
    style: {
      width: "100%",
      borderRadius: 4,
      display: "block"
    }
  }, /*#__PURE__*/React.createElement(Markers, null), /*#__PURE__*/React.createElement(PitchBg, {
    bg: c.bg,
    age: c.age,
    view: c.view
  }), c.items.map(drawItem)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: C.muted,
      textAlign: "center",
      marginTop: 3
    }
  }, c.name))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: C.tan,
      lineHeight: 1.6,
      marginBottom: 10
    }
  }, d.desc), note && /*#__PURE__*/React.createElement("div", {
    style: S.noteBox
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...S.microHd,
      color: C.white,
      marginBottom: 4
    }
  }, "How we run it here"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: C.white,
      lineHeight: 1.6
    }
  }, note)), /*#__PURE__*/React.createElement("div", {
    style: S.microHd
  }, "What to say"), d.points.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      fontSize: 12,
      color: C.green,
      marginBottom: 3
    }
  }, "✓ ", p)), /*#__PURE__*/React.createElement("div", {
    style: S.tipPill
  }, "⚡ ", d.tip));
}
function ShareSheet({
  text,
  onClose,
  onCopy,
  copied
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: S.overlay,
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    style: S.sheet,
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...S.cardHd,
      marginBottom: 0
    }
  }, "Send to the coaches"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: S.xBtn,
    "aria-label": "Close"
  }, "✕")), /*#__PURE__*/React.createElement("textarea", {
    readOnly: true,
    value: text,
    style: S.shareBox,
    onFocus: e => e.target.select()
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: `https://wa.me/?text=${encodeURIComponent(text)}`,
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      ...S.btnPrimary,
      textDecoration: "none",
      display: "inline-block"
    }
  }, "Open WhatsApp"), /*#__PURE__*/React.createElement("button", {
    onClick: onCopy,
    style: S.btnGhost
  }, copied ? "Copied" : "Copy text")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      marginTop: 10,
      lineHeight: 1.6
    }
  }, "If the WhatsApp button doesn't open, copy the text and paste it into the group.")));
}

// ── TABS ─────────────────────────────────────────────────────
function BlockTab({
  loadBlock,
  dn,
  age
}) {
  const block = BLOCKS[age] || [];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Block 1 — six Sundays"
  }, block.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: S.empty
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 30,
      marginBottom: 10
    }
  }, "🐆"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.muted,
      lineHeight: 1.6,
      maxWidth: 380,
      margin: "0 auto"
    }
  }, "No ready-made sessions for ", findAge(age).full, " yet. Build one in the Planner, or add drills in the Draw tab and they'll show up here for everyone.")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.muted,
      fontSize: 13,
      marginBottom: 14,
      lineHeight: 1.6
    }
  }, "Run them in order — the tackle work builds week on week. If a session goes badly, repeat it rather than moving on."), /*#__PURE__*/React.createElement("div", {
    style: S.tipPill
  }, "⚡ One cue, all season, all coaches: ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: C.goldL
    }
  }, "Foot close · Eyes open · Cheek to cheek · Squeeze and hold")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))",
      gap: 14,
      marginTop: 16
    }
  }, block.map(b => /*#__PURE__*/React.createElement("div", {
    key: b.n,
    style: S.libCard
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(Brush, {
    w: 120,
    h: 22,
    color: C.maroon,
    style: {
      position: "absolute",
      left: -4,
      top: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...S.badge,
      position: "relative",
      background: "transparent",
      paddingLeft: 8
    }
  }, "Session ", b.n)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      color: C.gold,
      fontSize: 14,
      marginBottom: 10,
      lineHeight: 1.4
    }
  }, b.theme), /*#__PURE__*/React.createElement("div", {
    style: S.microHd
  }, "Three coaching points"), b.points.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      fontSize: 12,
      color: C.green,
      marginBottom: 2
    }
  }, i + 1, ". ", p)), /*#__PURE__*/React.createElement("div", {
    style: {
      ...S.microHd,
      marginTop: 10
    }
  }, "Drills"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 5
    }
  }, b.drills.map(id => /*#__PURE__*/React.createElement("span", {
    key: id,
    style: S.ptPill
  }, dn(findDrill(id))))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...S.tipPill,
      marginTop: 10
    }
  }, b.why), /*#__PURE__*/React.createElement("button", {
    onClick: () => loadBlock(b),
    style: {
      ...S.btnPrimary,
      marginTop: 12,
      width: "100%"
    }
  }, "Use this session")))))));
}
function PlannerTab(props) {
  const {
    plan,
    setPlan,
    savePlan,
    cat,
    setCat,
    addDrill,
    remDrill,
    move,
    loadBlock,
    openShare,
    dn,
    custom,
    noteOf
  } = props;
  const info = SESSION_TYPES[plan.type];
  const total = plan.drills.reduce((s, d) => s + d.dur, 0);
  const left = info.duration - total;
  const list = cat === "All" ? ALL_DRILLS : ALL_DRILLS.filter(d => d.cat === cat);
  return /*#__PURE__*/React.createElement("div", {
    style: S.cols
  }, /*#__PURE__*/React.createElement("div", {
    style: S.colNarrow
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Session setup"
  }, /*#__PURE__*/React.createElement("div", {
    style: S.label
  }, "Type"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, Object.entries(SESSION_TYPES).map(([k, v]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setPlan(p => ({
      ...p,
      type: k
    })),
    style: {
      ...S.typBtn,
      background: plan.type === k ? C.gold : "#1c1917",
      color: plan.type === k ? C.black : C.muted,
      border: `2px solid ${plan.type === k ? C.gold : C.line}`
    }
  }, v.label))), /*#__PURE__*/React.createElement("div", {
    style: S.label
  }, "Date"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      marginBottom: 7
    }
  }, upcoming(plan.type === "wednesday" ? 3 : 0, 4).map((d, i) => {
    const v = iso(d);
    const on = plan.date === v;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      onClick: () => setPlan(p => ({
        ...p,
        date: v
      })),
      style: {
        ...S.catBtn,
        padding: "7px 11px",
        fontSize: 11.5,
        background: on ? C.gold : C.panel2,
        color: on ? "#000" : C.text,
        border: `1px solid ${on ? C.gold : C.line}`,
        fontWeight: on ? 800 : 600
      }
    }, shortLabel(d, i));
  })), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: plan.date,
    onChange: e => setPlan(p => ({
      ...p,
      date: e.target.value
    })),
    style: S.input
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      color: C.muted,
      marginTop: 4
    }
  }, "Or pick any other date above."), /*#__PURE__*/React.createElement("div", {
    style: S.label
  }, "Theme"), /*#__PURE__*/React.createElement("input", {
    placeholder: "e.g. First there is 9",
    value: plan.theme,
    onChange: e => setPlan(p => ({
      ...p,
      theme: e.target.value
    })),
    style: S.input
  }), /*#__PURE__*/React.createElement("div", {
    style: S.label
  }, "Three coaching points"), [0, 1, 2].map(i => /*#__PURE__*/React.createElement("input", {
    key: i,
    placeholder: `${i + 1}.`,
    value: plan.points[i] || "",
    onChange: e => setPlan(p => {
      const pts = [...p.points];
      pts[i] = e.target.value;
      return {
        ...p,
        points: pts
      };
    }),
    style: {
      ...S.input,
      marginBottom: 5
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: S.label
  }, "Notes"), /*#__PURE__*/React.createElement("textarea", {
    placeholder: "Who's bringing the bibs, pitch conditions...",
    value: plan.notes,
    onChange: e => setPlan(p => ({
      ...p,
      notes: e.target.value
    })),
    style: {
      ...S.input,
      height: 60,
      resize: "vertical"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: S.timerBox
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 12,
      marginBottom: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.muted
    }
  }, "Time used"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: left < 0 ? C.redL : left < 10 ? C.gold : C.green,
      fontWeight: "bold"
    }
  }, total, " / ", info.duration, " min")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#1a1713",
      borderRadius: 4,
      height: 8,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      borderRadius: 4,
      width: `${Math.min(100, total / info.duration * 100)}%`,
      background: left < 0 ? C.red : C.gold,
      transition: "width .3s"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      marginTop: 5
    }
  }, left >= 0 ? `${left} min left` : `${Math.abs(left)} min over`)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: openShare,
    style: {
      ...S.btnPrimary,
      flex: 1
    }
  }, "Send to WhatsApp")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: savePlan,
    style: {
      ...S.btnGhost,
      flex: 1
    }
  }, "Save"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setPlan(blankPlan(plan.age)),
    style: {
      ...S.btnGhost,
      flex: 1
    }
  }, "Start new"))), /*#__PURE__*/React.createElement(Card, {
    title: "The session shape"
  }, SHAPE.map(([b, quiet], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      fontSize: 12.5,
      padding: "4px 0",
      color: quiet ? C.muted : C.text
    }
  }, quiet ? "·" : "▸", " ", b)), /*#__PURE__*/React.createElement("div", {
    style: {
      ...S.tipPill,
      marginTop: 10
    }
  }, "⚡ ", /*#__PURE__*/React.createElement("b", null, "Fewer coaches:"), " same drill, 2–3 parallel groups. Nothing to time.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("b", null, "Big numbers:"), " different drills at stations, rotate every 10–12 min.", /*#__PURE__*/React.createElement("br", null), "Either way — one theme, three coaching points."))), /*#__PURE__*/React.createElement("div", {
    style: S.colWide
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 8,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...S.cardHd,
      marginBottom: 0
    }
  }, plan.theme || "Untitled session", plan.date && /*#__PURE__*/React.createElement("span", {
    style: S.datePill
  }, new Date(plan.date + "T12:00").toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short"
  }))), /*#__PURE__*/React.createElement("span", {
    style: S.badge
  }, info.label, " · ", info.start)), plan.points.some(p => p) && /*#__PURE__*/React.createElement("div", {
    style: S.pointsBox
  }, plan.points.filter(p => p).map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      fontSize: 12.5,
      color: C.goldL,
      marginBottom: 3
    }
  }, i + 1, ". ", p))), plan.drills.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: S.empty
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 32,
      marginBottom: 10
    }
  }, "🐆"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.muted,
      marginBottom: 14
    }
  }, "Add drills from the list, or load a ready-made session."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      justifyContent: "center"
    }
  }, (BLOCKS[plan.age] || []).map(b => /*#__PURE__*/React.createElement("button", {
    key: b.n,
    onClick: () => loadBlock(b),
    style: S.blockBtn
  }, "Session ", b.n)))) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, plan.drills.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: d.id,
    style: S.drillRow
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 4,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => move(i, i - 1),
    disabled: i === 0,
    style: {
      ...S.moveBtn,
      opacity: i === 0 ? 0.25 : 1
    },
    "aria-label": "Move up"
  }, "▲"), /*#__PURE__*/React.createElement("div", {
    style: S.drillNum
  }, i + 1), /*#__PURE__*/React.createElement("button", {
    onClick: () => move(i, i + 1),
    disabled: i === plan.drills.length - 1,
    style: {
      ...S.moveBtn,
      opacity: i === plan.drills.length - 1 ? 0.25 : 1
    },
    "aria-label": "Move down"
  }, "▼")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: "bold",
      color: C.text,
      fontSize: 14
    }
  }, dn(d)), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: ECOLOR[d.energy]
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: S.catPill
  }, d.cat)), /*#__PURE__*/React.createElement(DrillBody, {
    d: d,
    custom: custom,
    note: noteOf(d)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: 6,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: S.durPill
  }, d.dur, "m"), /*#__PURE__*/React.createElement("button", {
    onClick: () => remDrill(d.id),
    style: S.xBtn,
    "aria-label": `Remove ${dn(d)}`
  }, "✕"))))))), /*#__PURE__*/React.createElement("div", {
    style: S.colNarrow
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Add drills"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 5,
      flexWrap: "wrap",
      marginBottom: 10
    }
  }, CATS.map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    onClick: () => setCat(c),
    style: {
      ...S.catBtn,
      ...(cat === c ? S.catBtnOn : {})
    }
  }, c))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 7,
      maxHeight: 440,
      overflowY: "auto"
    }
  }, list.map(d => {
    const added = !!plan.drills.find(x => x.id === d.id);
    return /*#__PURE__*/React.createElement("div", {
      key: d.id,
      onClick: () => !added && addDrill(d),
      style: {
        ...S.pickCard,
        opacity: added ? 0.4 : 1,
        cursor: added ? "default" : "pointer"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: "bold",
        fontSize: 13,
        flex: 1,
        color: C.text
      }
    }, dn(d)), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: ECOLOR[d.energy]
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: S.durPill
    }, d.dur, "m")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: C.muted,
        marginTop: 2
      }
    }, d.equip));
  })))));
}
function VisualsTab({
  sel,
  setSel,
  custom,
  hidden,
  hide,
  unhide,
  drawOwn,
  deleteDiagram,
  age
}) {
  const mine = (custom || []).filter(c => c.kind !== "setup" && !c.drillId);
  const visible = (age === "u10" ? DIAGRAMS : []).filter(x => !(hidden || []).includes(x.id));
  const hiddenOnes = (age === "u10" ? DIAGRAMS : []).filter(x => (hidden || []).includes(x.id));
  const cd = mine.find(c => "c" + c.id === sel);
  const d = cd ? {
    id: "c" + cd.id,
    label: cd.name,
    icon: "✏️",
    desc: "Drawn by a coach"
  } : visible.find(x => x.id === sel) || visible[0] || null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Show the kids",
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.muted,
      fontSize: 13,
      marginBottom: 14
    }
  }, "Hold the phone up and point at it. Faster than explaining, and they remember pictures."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      marginBottom: 16
    }
  }, visible.map(x => /*#__PURE__*/React.createElement("button", {
    key: x.id,
    onClick: () => setSel(x.id),
    style: {
      ...S.diagBtn,
      ...(sel === x.id ? S.diagBtnOn : {})
    }
  }, x.icon, " ", x.label)), mine.map(x => /*#__PURE__*/React.createElement("button", {
    key: x.id,
    onClick: () => setSel("c" + x.id),
    style: {
      ...S.diagBtn,
      ...(sel === "c" + x.id ? S.diagBtnOn : {})
    }
  }, "★ ", x.name))), !d ? /*#__PURE__*/React.createElement("div", {
    style: S.empty
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 30,
      marginBottom: 10
    }
  }, "✏️"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.muted,
      lineHeight: 1.6,
      maxWidth: 400,
      margin: "0 auto"
    }
  }, "Nothing here for ", findAge(age).full, " yet. Draw one in the Draw tab — the pitch there is already the right size for this age group — and it'll appear here for every coach.")) : /*#__PURE__*/React.createElement("div", {
    style: S.diagCard
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 10,
      flexWrap: "wrap",
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: "bold",
      color: C.gold,
      fontSize: 16
    }
  }, d.icon, " ", d.label), /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.muted,
      fontSize: 13,
      marginTop: 3
    }
  }, d.desc)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap"
    }
  }, cd ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    onClick: () => drawOwn({
      ...cd
    }),
    style: {
      ...S.btnGhost,
      fontSize: 11,
      padding: "6px 10px"
    }
  }, "Edit"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      deleteDiagram(cd.id);
      setSel(visible[0] ? visible[0].id : "");
    },
    style: {
      ...S.btnGhost,
      fontSize: 11,
      padding: "6px 10px",
      color: C.redL
    }
  }, "Delete")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    onClick: () => drawOwn({
      name: d.label,
      bg: "pitch",
      items: [],
      kind: "drill",
      drillId: ""
    }),
    style: {
      ...S.btnGhost,
      fontSize: 11,
      padding: "6px 10px"
    }
  }, "Draw my own"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      hide(d.id);
      const nxt = visible.find(x => x.id !== d.id);
      setSel(nxt ? nxt.id : "");
    },
    style: {
      ...S.btnGhost,
      fontSize: 11,
      padding: "6px 10px",
      color: C.redL
    }
  }, "Hide this")))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 520,
      margin: "0 auto"
    }
  }, cd ? /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 340 250",
    style: {
      width: "100%",
      borderRadius: 4,
      display: "block"
    }
  }, /*#__PURE__*/React.createElement(Markers, null), /*#__PURE__*/React.createElement(PitchBg, {
    bg: cd.bg,
    age: age,
    view: cd.view
  }), cd.items.map(drawItem)) : /*#__PURE__*/React.createElement(PitchDiagram, {
    type: d.id
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: 16,
      marginTop: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: C.muted
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: C.gold,
      marginRight: 4
    }
  }), "Panthers"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: C.muted
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: C.red,
      marginRight: 4
    }
  }), "Defenders")))), hiddenOnes.length > 0 && /*#__PURE__*/React.createElement(Card, {
    title: "Hidden",
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: C.muted,
      marginBottom: 10
    }
  }, "These are switched off. Bring one back if you want it."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, hiddenOnes.map(x => /*#__PURE__*/React.createElement("button", {
    key: x.id,
    onClick: () => unhide(x.id),
    style: {
      ...S.diagBtn,
      opacity: 0.7
    }
  }, x.label, " — restore")))), /*#__PURE__*/React.createElement(Card, {
    title: "All diagrams"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))",
      gap: 14,
      marginTop: 8
    }
  }, visible.map(x => /*#__PURE__*/React.createElement("div", {
    key: x.id,
    style: {
      background: C.panel2,
      border: `1px solid ${C.line}`,
      borderRadius: 8,
      padding: 12,
      cursor: "pointer"
    },
    onClick: () => setSel(x.id)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: "bold",
      color: C.gold,
      marginBottom: 6,
      fontSize: 13
    }
  }, x.icon, " ", x.label), /*#__PURE__*/React.createElement(PitchDiagram, {
    type: x.id
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      marginTop: 8
    }
  }, x.desc))))));
}
function LibraryTab({
  cat,
  setCat,
  addDrill,
  goPlanner,
  dn,
  rename,
  custom,
  drills,
  others,
  deleteDrill,
  age,
  agesOf,
  addToAge,
  removeFromAge,
  noteOf,
  setNote
}) {
  const [showOthers, setShowOthers] = useState(false);
  const [noteFor, setNoteFor] = useState(null);
  const [noteDraft, setNoteDraft] = useState("");
  const otherList = cat === "All" ? others || [] : (others || []).filter(d => d.cat === cat);
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState("");
  const list = cat === "All" ? drills : drills.filter(d => d.cat === cat);
  const start = d => {
    setEditing(d.id);
    setDraft(dn(d));
  };
  const commit = d => {
    rename(d.id, draft.trim() === d.name ? null : draft.trim());
    setEditing(null);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Drill library"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      marginBottom: 16
    }
  }, CATS.map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    onClick: () => setCat(c),
    style: {
      ...S.catBtn,
      ...(cat === c ? S.catBtnOn : {})
    }
  }, c))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))",
      gap: 14
    }
  }, list.map(d => /*#__PURE__*/React.createElement("div", {
    key: d.id,
    style: S.libCard
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 8
    }
  }, editing === d.id ? /*#__PURE__*/React.createElement("input", {
    value: draft,
    onChange: e => setDraft(e.target.value),
    autoFocus: true,
    onKeyDown: e => {
      if (e.key === "Enter") commit(d);
      if (e.key === "Escape") setEditing(null);
    },
    style: {
      ...S.input,
      fontSize: 14,
      fontWeight: 700
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: "bold",
      fontSize: 15,
      color: C.text
    }
  }, dn(d)), /*#__PURE__*/React.createElement("span", {
    style: S.durPill
  }, d.dur, "m")), editing === d.id ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      marginTop: 8,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => commit(d),
    style: {
      ...S.btnPrimary,
      fontSize: 11,
      padding: "7px 11px"
    }
  }, "Save name"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setEditing(null),
    style: {
      ...S.btnGhost,
      fontSize: 11,
      padding: "7px 11px"
    }
  }, "Cancel"), dn(d) !== d.name && /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      rename(d.id, null);
      setEditing(null);
    },
    style: {
      ...S.btnGhost,
      fontSize: 11,
      padding: "7px 11px"
    }
  }, "Reset")) : /*#__PURE__*/React.createElement("button", {
    onClick: () => start(d),
    style: {
      ...S.btnGhost,
      fontSize: 10.5,
      padding: "5px 10px",
      marginTop: 6
    }
  }, "Rename"), dn(d) !== d.name && editing !== d.id && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      color: C.muted,
      marginTop: 5
    }
  }, "Originally: ", d.name), editing !== d.id && /*#__PURE__*/React.createElement("button", {
    onClick: () => removeFromAge(d),
    style: {
      ...S.btnGhost,
      fontSize: 10.5,
      padding: "5px 10px",
      marginTop: 6,
      marginLeft: 6
    }
  }, "Not for ", findAge(age).label), d.mine && editing !== d.id && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      ...S.badge,
      marginLeft: 6,
      fontSize: 9
    }
  }, "Ours"), /*#__PURE__*/React.createElement("button", {
    onClick: () => deleteDrill(d.id),
    style: {
      ...S.btnGhost,
      fontSize: 10.5,
      padding: "5px 10px",
      marginTop: 6,
      marginLeft: 6,
      color: C.redL
    }
  }, "Delete drill")), /*#__PURE__*/React.createElement(DrillBody, {
    d: d,
    custom: custom,
    note: noteOf(d)
  }), noteFor === d.id ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: S.microHd
  }, "How we run it at ", findAge(age).label), /*#__PURE__*/React.createElement("textarea", {
    value: noteDraft,
    onChange: e => setNoteDraft(e.target.value),
    autoFocus: true,
    placeholder: "Bigger pitch, add a defender, two balls…",
    style: {
      ...S.input,
      height: 70,
      resize: "vertical"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      color: C.muted,
      margin: "5px 0 8px",
      lineHeight: 1.5
    }
  }, "Change the Space, Task, Equipment or People — same drill, right level."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setNote(d, noteDraft.trim());
      setNoteFor(null);
    },
    style: {
      ...S.btnPrimary,
      fontSize: 11,
      padding: "7px 11px"
    }
  }, "Save"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setNoteFor(null),
    style: {
      ...S.btnGhost,
      fontSize: 11,
      padding: "7px 11px"
    }
  }, "Cancel"))) : /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setNoteFor(d.id);
      setNoteDraft(noteOf(d));
    },
    style: {
      ...S.btnGhost,
      fontSize: 10.5,
      padding: "5px 10px",
      marginTop: 8
    }
  }, noteOf(d) ? `Edit the ${findAge(age).label} version` : `Add a ${findAge(age).label} version`), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      addDrill(d);
      goPlanner();
    },
    style: {
      ...S.btnGhost,
      marginTop: 12,
      width: "100%"
    }
  }, "Add to plan")))), (others || []).length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      borderTop: `1px solid ${C.line}`,
      paddingTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      ...S.cardHd,
      marginBottom: 2
    }
  }, "Other age groups"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted
    }
  }, (others || []).length, " drill", (others || []).length === 1 ? "" : "s", " the other groups use. Add any of them to ", findAge(age).label, ".")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowOthers(!showOthers),
    style: S.btnGhost
  }, showOthers ? "Hide" : "Show")), showOthers && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
      gap: 12,
      marginTop: 14
    }
  }, otherList.map(d => /*#__PURE__*/React.createElement("div", {
    key: d.id,
    style: {
      ...S.libCard,
      opacity: 0.9
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: 8,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 14,
      color: C.text
    }
  }, dn(d)), /*#__PURE__*/React.createElement("span", {
    style: S.durPill
  }, d.dur, "m")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: C.gold,
      marginTop: 4,
      textTransform: "uppercase",
      letterSpacing: 1
    }
  }, d.cat, " · used by ", agesOf(d).map(a => findAge(a).label).join(", ") || "nobody"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: C.tan,
      lineHeight: 1.6,
      margin: "8px 0"
    }
  }, d.desc), /*#__PURE__*/React.createElement("button", {
    onClick: () => addToAge(d),
    style: {
      ...S.btnPrimary,
      width: "100%",
      fontSize: 11.5
    }
  }, "Add to ", findAge(age).label))), otherList.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: C.muted
    }
  }, "Nothing in this category from the other groups.")))));
}
function SavedTab({
  plans,
  loadPlan,
  newPlan,
  deletePlan,
  loading,
  share,
  dn
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 8,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...S.cardHd,
      marginBottom: 0
    }
  }, "Saved sessions"), /*#__PURE__*/React.createElement("button", {
    onClick: newPlan,
    style: S.btnPrimary
  }, "New session")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      marginBottom: 16
    }
  }, "Shared with everyone using this app — all coaches can see and edit these."), loading ? /*#__PURE__*/React.createElement("div", {
    style: S.empty
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.muted
    }
  }, "Loading…")) : plans.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: S.empty
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 32,
      marginBottom: 10
    }
  }, "📋"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.muted
    }
  }, "Nothing saved yet. Build one in the planner and everyone will see it here.")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
      gap: 14
    }
  }, [...plans].sort((a, b) => a.date > b.date ? -1 : 1).map(p => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    style: S.libCard
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: 8,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: "bold",
      fontSize: 14.5,
      color: C.text
    }
  }, p.theme || "Untitled session"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...S.badge,
      flexShrink: 0
    }
  }, SESSION_TYPES[p.type].label)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginBottom: 10
    }
  }, p.date ? new Date(p.date + "T12:00").toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long"
  }) : "No date set"), p.points?.filter(x => x).map((x, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      fontSize: 12,
      color: C.green,
      marginBottom: 2
    }
  }, i + 1, ". ", x)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 5,
      margin: "8px 0"
    }
  }, p.drills.map(d => /*#__PURE__*/React.createElement("span", {
    key: d.id,
    style: S.ptPill
  }, dn(d)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      marginTop: 10,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => share(p),
    style: {
      ...S.btnPrimary,
      fontSize: 12,
      padding: "7px 12px"
    }
  }, "WhatsApp"), /*#__PURE__*/React.createElement("button", {
    onClick: () => loadPlan(p),
    style: {
      ...S.btnGhost,
      fontSize: 12,
      padding: "7px 12px"
    }
  }, "Open"), /*#__PURE__*/React.createElement("button", {
    onClick: () => deletePlan(p.id),
    style: {
      ...S.btnGhost,
      fontSize: 12,
      padding: "7px 12px",
      color: C.redL
    }
  }, "Delete")))))));
}
function LawsTab({
  age
}) {
  const A = findAge(age);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: A.full + " — Age Grade Law Variations"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.muted,
      fontSize: 13,
      marginBottom: 16
    }
  }, "Scottish Rugby strapline: ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: C.gold
    }
  }, A.strapline)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))",
      gap: 10,
      marginBottom: 22
    }
  }, A.tiles.map(l => /*#__PURE__*/React.createElement("div", {
    key: l.title,
    style: S.lawTile
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      marginBottom: 5
    }
  }, l.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: "bold",
      color: C.gold,
      fontSize: 11.5,
      marginBottom: 3
    }
  }, l.title), /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.text,
      fontSize: 12
    }
  }, l.value)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
      gap: 14
    }
  }, A.cards.map(l => /*#__PURE__*/React.createElement("div", {
    key: l.title,
    style: S.libCard
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 19,
      marginBottom: 5
    }
  }, l.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: "bold",
      color: C.gold,
      fontSize: 14,
      marginBottom: 6
    }
  }, l.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: C.tan,
      lineHeight: 1.7
    }
  }, l.body))))));
}

// ── PLAYERS / STANDING POSITIONS ─────────────────────────────
const STANDS = [{
  id: "kickoff",
  label: "Our kick off",
  note: "Any kick from the centre, must travel 5m. Spread across the width so we can chase in a line, not a bunch.",
  say: "Chase together · Nobody offside in front of the kicker",
  ours: [[170, 108, "K"], [120, 55, ""], [120, 160, ""], [150, 35, ""], [150, 182, ""], [135, 108, ""]],
  theirs: [[230, 45, ""], [230, 108, ""], [230, 172, ""], [265, 70, ""], [265, 148, ""], [292, 108, ""]],
  lines: [[170, 108, 205, 108]]
}, {
  id: "receive",
  label: "Their kick off",
  note: "We must be 5m back. Front three take the ball, back three cover the space behind.",
  say: "Front three: two hands, call it early · Back three: cover the space",
  ours: [[205, 55, ""], [205, 108, ""], [205, 160, ""], [255, 70, ""], [255, 148, ""], [285, 108, ""]],
  theirs: [[135, 108, "K"], [100, 60, ""], [100, 158, ""], [125, 35, ""], [125, 182, ""], [80, 108, ""]],
  lines: []
}, {
  id: "defend",
  label: "Defending",
  note: "Six across 30m is about 5m each. Everyone has someone. Move up as one line — the fastest player rushing out is what makes the gap.",
  say: "Arm's length plus · Call your player · Move up together",
  ours: [[205, 35, ""], [205, 78, ""], [205, 120, ""], [205, 162, ""], [205, 200, ""], [245, 108, ""]],
  theirs: [[120, 35, ""], [120, 78, ""], [120, 120, ""], [120, 162, ""], [120, 200, ""], [85, 108, ""]],
  lines: []
}, {
  id: "aftertackle",
  label: "After a tackle",
  note: "First player there is our 9 and passes it away. One player takes the pass. Everyone else gets width — nobody else goes near the ball.",
  say: "First there is 9 · Everyone else spread",
  ours: [[95, 108, "9"], [140, 88, ""], [190, 55, ""], [225, 130, ""], [265, 78, ""], [290, 165, ""]],
  theirs: [[135, 150, ""], [180, 175, ""], [225, 195, ""], [265, 205, ""]],
  lines: [[107, 105, 130, 93], [152, 85, 178, 62]],
  ball: [78, 108]
}];

// Shared item renderer — used by the builder and by saved team setups
function drawItem(it) {
  const disc = (fill, label, txtCol) => /*#__PURE__*/React.createElement("g", {
    key: it.id
  }, /*#__PURE__*/React.createElement("circle", {
    cx: it.x,
    cy: it.y,
    r: 10,
    fill: fill,
    stroke: "rgba(0,0,0,0.55)",
    strokeWidth: 1.6
  }), /*#__PURE__*/React.createElement("text", {
    x: it.x,
    y: it.y + 4,
    textAnchor: "middle",
    fill: txtCol,
    fontSize: 10,
    fontWeight: "bold"
  }, label));
  switch (it.type) {
    case "A":
      return disc(IC.A, "A", "#000");
    case "D":
      return disc(IC.D, "D", "#fff");
    case "num":
      return disc(IC.num, String(it.n), "#000");
    case "numD":
      return disc(IC.D, String(it.n), "#fff");
    case "nine":
      return disc(IC.A, "9", "#000");
    case "cone":
      return /*#__PURE__*/React.createElement("polygon", {
        key: it.id,
        points: `${it.x},${it.y - 9} ${it.x - 7},${it.y + 5} ${it.x + 7},${it.y + 5}`,
        fill: IC.cone,
        stroke: "rgba(0,0,0,0.5)"
      });
    case "ball":
      return /*#__PURE__*/React.createElement("ellipse", {
        key: it.id,
        cx: it.x,
        cy: it.y,
        rx: 7,
        ry: 4.5,
        fill: IC.ball,
        stroke: "#000",
        strokeWidth: 1.2
      });
    case "run":
      return /*#__PURE__*/React.createElement("line", {
        key: it.id,
        x1: it.x,
        y1: it.y,
        x2: it.x2,
        y2: it.y2,
        stroke: IC.run,
        strokeWidth: 2.6,
        markerEnd: "url(#bag)"
      });
    case "arc":
      {
        const mx = (it.x + it.x2) / 2,
          my = (it.y + it.y2) / 2;
        const dx = it.x2 - it.x,
          dy = it.y2 - it.y;
        const len = Math.max(1, Math.hypot(dx, dy));
        const bow = Math.min(46, len * 0.45);
        const cx = mx - dy / len * bow,
          cy = my + dx / len * bow;
        return /*#__PURE__*/React.createElement("path", {
          key: it.id,
          d: `M${it.x},${it.y} Q${cx},${cy} ${it.x2},${it.y2}`,
          fill: "none",
          stroke: IC.run,
          strokeWidth: 2.6,
          markerEnd: "url(#bag)"
        });
      }
    case "pass":
      return /*#__PURE__*/React.createElement("line", {
        key: it.id,
        x1: it.x,
        y1: it.y,
        x2: it.x2,
        y2: it.y2,
        stroke: IC.pass,
        strokeWidth: 2.4,
        strokeDasharray: "7,4",
        markerEnd: "url(#bat)"
      });
    case "text":
      return /*#__PURE__*/React.createElement("text", {
        key: it.id,
        x: it.x,
        y: it.y,
        textAnchor: "middle",
        fill: IC.text,
        fontSize: 12.5,
        fontWeight: "bold",
        stroke: "#000",
        strokeWidth: 0.6,
        paintOrder: "stroke"
      }, it.text);
    default:
      return null;
  }
}

// Pitch drawn to the right shape for the age group.
const PITCHES = {
  u10: {
    long: 40,
    wide: 30,
    ingoal: 5,
    label: "40m x 30m"
  },
  u12: {
    long: 60,
    wide: 40,
    ingoal: 5,
    label: "60m x 40m · 5m in-goals"
  },
  u14: {
    long: 100,
    wide: 70,
    ingoal: 10,
    label: "Full pitch"
  }
};
const VIEWS = [{
  id: "full",
  label: "Full pitch"
}, {
  id: "def",
  label: "Our third"
}, {
  id: "mid",
  label: "Middle third"
}, {
  id: "att",
  label: "Their third"
}];
function pitchBox(age, view = "full") {
  const p = PITCHES[age] || PITCHES.u10;
  const maxW = 280,
    maxH = 210;
  const zoom = view && view !== "full" ? 3 : 1;
  const scale = Math.min(maxW / p.long, maxH / p.wide) * zoom;
  const w = p.long * scale,
    h = p.wide * scale;
  const y = 12 + (maxH - Math.min(h, maxH)) / 2;
  // slide the pitch so the chosen third fills the canvas
  const shift = {
    def: 0,
    mid: 1,
    att: 2
  }[view] || 0;
  const x = zoom === 1 ? (340 - w) / 2 : 30 - shift * (w / 3);
  return {
    ...p,
    scale,
    w,
    h,
    x,
    y,
    zoom,
    view: view || "full"
  };
}
function PitchBg({
  bg,
  age,
  view
}) {
  if (bg !== "pitch") return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: 22,
    y: 12,
    width: 296,
    height: 216,
    fill: "#123d1a",
    rx: 3,
    stroke: "rgba(252,252,252,0.7)",
    strokeWidth: 1.3
  }), [80, 140, 200, 260].map(x => /*#__PURE__*/React.createElement("line", {
    key: x,
    x1: x,
    y1: 12,
    x2: x,
    y2: 228,
    stroke: "rgba(252,252,252,0.09)"
  })), [66, 120, 174].map(y => /*#__PURE__*/React.createElement("line", {
    key: y,
    x1: 22,
    y1: y,
    x2: 318,
    y2: y,
    stroke: "rgba(252,252,252,0.09)"
  })));
  const P = pitchBox(age, view);
  const ig = P.ingoal * P.scale;
  const clip = "pclip-" + (view || "full");
  const white = "rgba(252,252,252,0.55)";
  const faint = "rgba(252,252,252,0.3)";

  // x runs along the length, y across the width
  const alongFromTry = m => P.x + ig + m * P.scale; // m from the near try line
  const alongFromFarTry = m => P.x + P.w - ig - m * P.scale;
  const acrossFromTouch = m => P.y + m * P.scale;
  const acrossFromFarTouch = m => P.y + P.h - m * P.scale;
  const playLong = P.long - 2 * P.ingoal; // try line to try line
  const mid = P.x + P.w / 2;
  const cross = [];
  // 22m lines — only on a pitch long enough to have them
  if (playLong >= 60) {
    [alongFromTry(22), alongFromFarTry(22)].forEach((x, i) => cross.push(/*#__PURE__*/React.createElement("line", {
      key: "22-" + i,
      x1: x,
      y1: P.y,
      x2: x,
      y2: P.y + P.h,
      stroke: white,
      strokeWidth: 1.1
    })));
    [alongFromTry(playLong / 2 - 10), alongFromTry(playLong / 2 + 10)].forEach((x, i) => cross.push(/*#__PURE__*/React.createElement("line", {
      key: "10-" + i,
      x1: x,
      y1: P.y,
      x2: x,
      y2: P.y + P.h,
      stroke: faint,
      strokeWidth: 1,
      strokeDasharray: "7,6"
    })));
    [alongFromTry(5), alongFromFarTry(5)].forEach((x, i) => cross.push(/*#__PURE__*/React.createElement("line", {
      key: "5-" + i,
      x1: x,
      y1: P.y,
      x2: x,
      y2: P.y + P.h,
      stroke: faint,
      strokeWidth: 1,
      strokeDasharray: "4,5"
    })));
  } else {
    // mini pitches: the two dashed cross lines SRU show on their diagrams
    [alongFromTry(playLong / 4), alongFromFarTry(playLong / 4)].forEach((x, i) => cross.push(/*#__PURE__*/React.createElement("line", {
      key: "q-" + i,
      x1: x,
      y1: P.y,
      x2: x,
      y2: P.y + P.h,
      stroke: faint,
      strokeWidth: 1,
      strokeDasharray: "6,5"
    })));
  }

  // lengthwise 5m and 15m lines in from each touchline
  const lanes = [];
  [5, 15].forEach(m => {
    if (P.wide > m * 2 + 6) {
      [acrossFromTouch(m), acrossFromFarTouch(m)].forEach((y, i) => lanes.push(/*#__PURE__*/React.createElement("line", {
        key: `l${m}-${i}`,
        x1: P.x + ig,
        y1: y,
        x2: P.x + P.w - ig,
        y2: y,
        stroke: faint,
        strokeWidth: 1,
        strokeDasharray: "5,7"
      })));
    }
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", {
    id: clip
  }, /*#__PURE__*/React.createElement("rect", {
    x: 28,
    y: 10,
    width: 284,
    height: 214,
    rx: 2
  }))), /*#__PURE__*/React.createElement("rect", {
    x: 28,
    y: 10,
    width: 284,
    height: 214,
    fill: "#0e3315",
    rx: 2
  }), /*#__PURE__*/React.createElement("g", {
    clipPath: `url(#${clip})`
  }, /*#__PURE__*/React.createElement("rect", {
    x: P.x,
    y: P.y,
    width: P.w,
    height: P.h,
    fill: "#123d1a",
    rx: 2
  }), /*#__PURE__*/React.createElement("rect", {
    x: P.x,
    y: P.y,
    width: ig,
    height: P.h,
    fill: "#0e3315"
  }), /*#__PURE__*/React.createElement("rect", {
    x: P.x + P.w - ig,
    y: P.y,
    width: ig,
    height: P.h,
    fill: "#0e3315"
  }), lanes, cross, /*#__PURE__*/React.createElement("line", {
    x1: mid,
    y1: P.y,
    x2: mid,
    y2: P.y + P.h,
    stroke: "rgba(252,252,252,0.7)",
    strokeWidth: 1.3
  }), /*#__PURE__*/React.createElement("line", {
    x1: P.x + ig,
    y1: P.y,
    x2: P.x + ig,
    y2: P.y + P.h,
    stroke: "rgba(252,252,252,0.9)",
    strokeWidth: 1.4
  }), /*#__PURE__*/React.createElement("line", {
    x1: P.x + P.w - ig,
    y1: P.y,
    x2: P.x + P.w - ig,
    y2: P.y + P.h,
    stroke: "rgba(252,252,252,0.9)",
    strokeWidth: 1.4
  }), /*#__PURE__*/React.createElement("rect", {
    x: P.x,
    y: P.y,
    width: P.w,
    height: P.h,
    fill: "none",
    stroke: "rgba(252,252,252,0.85)",
    strokeWidth: 1.4,
    rx: 2
  }), [P.x + ig, P.x + P.w - ig].map((x, i) => /*#__PURE__*/React.createElement("g", {
    key: "p" + i
  }, /*#__PURE__*/React.createElement("line", {
    x1: x,
    y1: P.y + P.h / 2 - 5.6 * P.scale,
    x2: x,
    y2: P.y + P.h / 2 + 5.6 * P.scale,
    stroke: "#FCFCFC",
    strokeWidth: 2.2
  })))), /*#__PURE__*/React.createElement("rect", {
    x: 28,
    y: 10,
    width: 284,
    height: 214,
    fill: "none",
    stroke: "rgba(252,252,252,0.35)",
    strokeWidth: 1,
    rx: 2
  }), /*#__PURE__*/React.createElement("text", {
    x: 340 / 2,
    y: 7,
    textAnchor: "middle",
    fill: C.tan,
    fontSize: 8
  }, P.label, P.zoom > 1 ? " · " + (VIEWS.find(v => v.id === P.view) || {}).label : "", " · we attack right"));
}
function Markers() {
  return /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("marker", {
    id: "bag",
    markerWidth: "6",
    markerHeight: "6",
    refX: "3",
    refY: "3",
    orient: "auto"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0,0 L0,6 L6,3 z",
    fill: IC.run
  })), /*#__PURE__*/React.createElement("marker", {
    id: "bat",
    markerWidth: "6",
    markerHeight: "6",
    refX: "3",
    refY: "3",
    orient: "auto"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0,0 L0,6 L6,3 z",
    fill: IC.pass
  })));
}

// Turn a built-in setup into editable builder items
function standToItems(st) {
  let n = 0;
  const out = [];
  (st.ours || []).forEach(([x, y, l]) => out.push({
    id: ++n,
    type: l === "9" ? "nine" : "A",
    x,
    y
  }));
  (st.theirs || []).forEach(([x, y]) => out.push({
    id: ++n,
    type: "D",
    x,
    y
  }));
  (st.lines || []).forEach(([x1, y1, x2, y2]) => out.push({
    id: ++n,
    type: "run",
    x: x1,
    y: y1,
    x2,
    y2
  }));
  if (st.ball) out.push({
    id: ++n,
    type: "ball",
    x: st.ball[0],
    y: st.ball[1]
  });
  return out;
}
function PlayersTab({
  sel,
  setSel,
  setups,
  editSetup,
  newSetup,
  deleteDiagram,
  age
}) {
  const all = [...(age === "u10" ? STANDS : []).map(x => ({
    key: x.id,
    label: x.label,
    builtin: x,
    custom: null
  })), ...setups.map(d => ({
    key: "c" + d.id,
    label: d.name,
    builtin: null,
    custom: d
  }))];
  const groups = [];
  setups.forEach(d => {
    const g = d.platform || "Other";
    let row = groups.find(x => x.name === g);
    if (!row) {
      row = {
        name: g,
        items: []
      };
      groups.push(row);
    }
    row.items.push(d);
  });
  groups.sort((a, b) => a.name === "Other" ? 1 : b.name === "Other" ? -1 : a.name.localeCompare(b.name));
  const cur = all.find(x => x.key === sel) || all[0] || null;
  const st = cur ? cur.builtin : null;
  const cd = cur ? cur.custom : null;
  const dot = (x, y, l, ours) => /*#__PURE__*/React.createElement("g", {
    key: `${x}-${y}-${l}-${ours}`
  }, /*#__PURE__*/React.createElement("circle", {
    cx: x,
    cy: y,
    r: 10,
    fill: ours ? IC.A : IC.D,
    stroke: "rgba(0,0,0,0.55)",
    strokeWidth: 1.6
  }), l && /*#__PURE__*/React.createElement("text", {
    x: x,
    y: y + 4,
    textAnchor: "middle",
    fill: ours ? "#000" : "#fff",
    fontSize: 10,
    fontWeight: "bold"
  }, l));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Plays — where they stand"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.muted,
      fontSize: 13,
      marginBottom: 14,
      lineHeight: 1.6
    }
  }, "Hold this up and show them. The four built-in ones are a starting point — edit any of them, or add your own."), age === "u10" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      marginBottom: 12
    }
  }, all.filter(x => x.builtin).map(x => /*#__PURE__*/React.createElement("button", {
    key: x.key,
    onClick: () => setSel(x.key),
    style: {
      ...S.diagBtn,
      ...(sel === x.key ? S.diagBtnOn : {})
    }
  }, x.label))), groups.map(g => /*#__PURE__*/React.createElement("div", {
    key: g.name,
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...S.microHd,
      marginBottom: 6
    }
  }, g.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, g.items.map(d => /*#__PURE__*/React.createElement("button", {
    key: d.id,
    onClick: () => setSel("c" + d.id),
    style: {
      ...S.diagBtn,
      ...(sel === "c" + d.id ? S.diagBtnOn : {})
    }
  }, "★ ", d.name, d.zone ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.muted,
      fontWeight: 400
    }
  }, " · ", d.zone) : null))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: newSetup,
    style: {
      ...S.diagBtn,
      borderStyle: "dashed"
    }
  }, "+ New play or setup")), !cur ? /*#__PURE__*/React.createElement("div", {
    style: S.empty
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 30,
      marginBottom: 10
    }
  }, "📍"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.muted,
      lineHeight: 1.6,
      maxWidth: 400,
      margin: "0 auto"
    }
  }, "No setups for ", findAge(age).full, " yet. Tap \"+ New setup\" and place the players — the pitch is drawn to the right size for this age group.")) : /*#__PURE__*/React.createElement("div", {
    style: S.diagCard
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 10,
      flexWrap: "wrap",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      color: C.gold,
      fontSize: 15
    }
  }, cur.label), cd && (cd.platform || cd.zone) && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      color: C.muted,
      marginTop: 3,
      textTransform: "uppercase",
      letterSpacing: 1
    }
  }, [cd.platform, cd.zone].filter(Boolean).join(" · "))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => editSetup(cd ? cd : {
      name: st.label,
      bg: "pitch",
      items: standToItems(st)
    }),
    style: {
      ...S.btnGhost,
      fontSize: 11,
      padding: "6px 11px"
    }
  }, "Edit in Draw"), cd && /*#__PURE__*/React.createElement("button", {
    onClick: () => deleteDiagram(cd.id),
    style: {
      ...S.btnGhost,
      fontSize: 11,
      padding: "6px 11px",
      color: C.redL
    }
  }, "Delete"))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 520,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 340 250",
    style: {
      width: "100%",
      borderRadius: 4,
      display: "block"
    }
  }, /*#__PURE__*/React.createElement(Markers, null), /*#__PURE__*/React.createElement(PitchBg, {
    bg: cd ? cd.bg : "pitch",
    age: age,
    view: cd ? cd.view : "full"
  }), cd ? cd.items.map(drawItem) : /*#__PURE__*/React.createElement(React.Fragment, null, (st.lines || []).map(([x1, y1, x2, y2], i) => /*#__PURE__*/React.createElement("line", {
    key: i,
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2,
    stroke: IC.run,
    strokeWidth: 2.4,
    markerEnd: "url(#bag)"
  })), st.ball && /*#__PURE__*/React.createElement("ellipse", {
    cx: st.ball[0],
    cy: st.ball[1],
    rx: 7,
    ry: 4.5,
    fill: IC.ball,
    stroke: "#000",
    strokeWidth: 1.2
  }), st.ours.map(([x, y, l]) => dot(x, y, l, true)), st.theirs.map(([x, y, l]) => dot(x, y, l, false))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: 18,
      marginTop: 10,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: C.muted
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: IC.A,
      marginRight: 5
    }
  }), "Panthers"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: C.muted
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: IC.D,
      marginRight: 5
    }
  }), "Them")), st && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: C.tan,
      lineHeight: 1.7,
      marginTop: 14
    }
  }, st.note), /*#__PURE__*/React.createElement("div", {
    style: S.tipPill
  }, "⚡ ", st.say)))));
}

// ── DRILL BUILDER ────────────────────────────────────────────
// One colour per item type — nothing shares a colour
const IC = {
  A: "#F2A81B",
  // attacker — gold
  D: "#E04A3F",
  // defender — red
  num: "#FFFFFF",
  // numbered player — white
  cone: "#FF7A1A",
  // cone — orange
  ball: "#C9A227",
  // ball — olive gold
  run: "#4CC15E",
  // run — green
  pass: "#3FA9E0",
  // pass — blue
  text: "#F5F0E6" // label — off white
};
// Set piece shapes, correct numbers for each age group.
// Offsets are in canvas units from where the coach taps.
const FORMATIONS = {
  scrumAttack: {
    label: "Scrum — ours",
    ages: {
      u12: 5,
      u14: 8
    },
    shape: n => {
      const front = [["1", -18, -14], ["2", 0, -16], ["3", 18, -14]];
      const second = [["4", -9, 4], ["5", 9, 4]];
      const back = [["6", -26, 10], ["7", 26, 10], ["8", 0, 22]];
      const rows = n >= 8 ? front.concat(second, back) : front.concat(second);
      return rows.concat([["9", -34, 26]]);
    }
  },
  scrumDefend: {
    label: "Scrum — theirs",
    ages: {
      u12: 5,
      u14: 8
    },
    shape: n => {
      const front = [["1", -18, 14], ["2", 0, 16], ["3", 18, 14]];
      const second = [["4", -9, -4], ["5", 9, -4]];
      const back = [["6", -26, -10], ["7", 26, -10], ["8", 0, -22]];
      const rows = n >= 8 ? front.concat(second, back) : front.concat(second);
      return rows.concat([["9", 34, -26]]);
    }
  },
  lineout: {
    label: "Lineout — ours",
    ages: {
      u12: 5,
      u14: 5
    },
    shape: () => [["2", -34, 0], ["1", 0, 0], ["3", 22, 0], ["4", 44, 0], ["5", 66, 0], ["9", 52, 26]]
  }
};
const TOOLS = [{
  k: "A",
  label: "Attacker",
  c: IC.A
}, {
  k: "D",
  label: "Defender",
  c: IC.D
}, {
  k: "num",
  label: "Player 1,2,3…",
  c: IC.num
}, {
  k: "nine",
  label: "The 9",
  c: IC.A
}, {
  k: "cone",
  label: "Cone",
  c: IC.cone
}, {
  k: "ball",
  label: "Ball",
  c: IC.ball
}, {
  k: "run",
  label: "Run →",
  c: IC.run
}, {
  k: "arc",
  label: "Arc ↷",
  c: IC.run
}, {
  k: "pass",
  label: "Pass ⇢",
  c: IC.pass
}, {
  k: "text",
  label: "Label",
  c: IC.text
}, {
  k: "erase",
  label: "Erase",
  c: C.muted
}];
function BuilderTab({
  diagrams,
  saveDiagram,
  saveDrill,
  deleteDiagram,
  updateDiagram,
  flash,
  seed,
  clearSeed,
  age
}) {
  const [tool, setTool] = useState("A");
  const [items, setItems] = useState([]);
  const [pending, setPending] = useState(null);
  const [labelText, setLabelText] = useState("");
  const [name, setName] = useState("");
  const [bg, setBg] = useState("pitch");
  const [kind, setKind] = useState("newdrill");
  const [view, setView] = useState("full");
  const [platform, setPlatform] = useState("");
  const [zone, setZone] = useState("");
  const [drillId, setDrillId] = useState("");
  const [meta, setMeta] = useState({
    cat: "Handling",
    dur: 12,
    equip: "",
    desc: "",
    p1: "",
    p2: "",
    p3: "",
    tip: ""
  });
  const setM = (k, v) => setMeta(m => ({
    ...m,
    [k]: v
  }));
  useEffect(() => {
    if (!seed) return;
    setItems(seed.items || []);
    setName(seed.name || "");
    setBg(seed.bg || "pitch");
    setKind(seed.kind || "setup");
    setView(seed.view || "full");
    setPlatform(seed.platform || "");
    setZone(seed.zone || "");
    setDrillId(seed.drillId || "");
    clearSeed();
  }, [seed]);
  const VW = 340,
    VH = 262;
  const coords = e => {
    const r = e.currentTarget.getBoundingClientRect();
    return {
      x: Math.round((e.clientX - r.left) / r.width * VW),
      y: Math.round((e.clientY - r.top) / r.height * VH)
    };
  };
  const tap = e => {
    const {
      x,
      y
    } = coords(e);
    if (tool === "erase") {
      let best = null,
        bestD = 24 * 24;
      items.forEach(it => {
        const cx = it.x2 !== undefined ? (it.x + it.x2) / 2 : it.x;
        const cy = it.y2 !== undefined ? (it.y + it.y2) / 2 : it.y;
        const d = (cx - x) ** 2 + (cy - y) ** 2;
        if (d < bestD) {
          bestD = d;
          best = it.id;
        }
      });
      if (best !== null) setItems(a => a.filter(it => it.id !== best));
      return;
    }
    if (tool === "run" || tool === "pass" || tool === "arc") {
      if (!pending) {
        setPending({
          x,
          y
        });
        return;
      }
      setItems(a => [...a, {
        id: Date.now(),
        type: tool,
        x: pending.x,
        y: pending.y,
        x2: x,
        y2: y
      }]);
      setPending(null);
      return;
    }
    if (tool.startsWith("form:")) {
      const key = tool.slice(5);
      const f = FORMATIONS[key];
      const n = f.ages[age] || 5;
      const stamp = f.shape(n).map(([label, dx, dy], i) => ({
        id: Date.now() + i,
        type: key === "scrumDefend" ? "numD" : "num",
        x: x + dx,
        y: y + dy,
        n: label
      }));
      setItems(a => [...a, ...stamp]);
      return;
    }
    if (tool === "text") {
      if (!labelText.trim()) return flash("Type the label first, then tap the pitch");
      setItems(a => [...a, {
        id: Date.now(),
        type: "text",
        x,
        y,
        text: labelText.trim()
      }]);
      return;
    }
    if (tool === "num") {
      const n = items.filter(i => i.type === "num").length + 1;
      setItems(a => [...a, {
        id: Date.now(),
        type: "num",
        x,
        y,
        n
      }]);
      return;
    }
    setItems(a => [...a, {
      id: Date.now(),
      type: tool,
      x,
      y
    }]);
  };
  const undo = () => {
    setPending(null);
    setItems(a => a.slice(0, -1));
  };
  const clear = () => {
    setPending(null);
    setItems([]);
  };
  const doSave = () => {
    if (!name.trim()) return flash("Give it a name first");
    if (!items.length) return flash("Nothing on the pitch yet");
    if (kind === "newdrill") {
      if (!meta.desc.trim()) return flash("Add a line on how it runs, so another coach can pick it up");
      saveDrill({
        id: Date.now(),
        name: name.trim(),
        cat: meta.cat,
        dur: Number(meta.dur) || 12,
        players: "",
        equip: meta.equip.trim() || "Cones",
        ages: [age],
        age,
        desc: meta.desc.trim(),
        points: [meta.p1, meta.p2, meta.p3].filter(x => x.trim()),
        tip: meta.tip.trim(),
        bg,
        items,
        mine: true
      });
      return flash("Drill added — it's in the Drills tab");
    }
    saveDiagram({
      id: Date.now(),
      name: name.trim(),
      bg,
      items,
      kind,
      age,
      view,
      platform,
      zone,
      drillId: kind === "drill" ? drillId : ""
    });
    flash(kind === "setup" ? "Saved — it's in the Players tab" : drillId ? "Saved — it's on that drill" : "Saved — it's in the Visuals tab");
  };
  const load = d => {
    setItems(d.items);
    setBg(d.bg || "pitch");
    setName(d.name);
    setKind(d.kind || "drill");
    setDrillId(d.drillId || "");
    setView(d.view || "full");
    setPlatform(d.platform || "");
    setZone(d.zone || "");
  };
  const FULL = 7,
    PX = 30,
    PY = 12,
    PW = 280,
    PH = 210;
  const disc = (it, fill, label, txtCol) => /*#__PURE__*/React.createElement("g", {
    key: it.id
  }, /*#__PURE__*/React.createElement("circle", {
    cx: it.x,
    cy: it.y,
    r: 10,
    fill: fill,
    stroke: "rgba(0,0,0,0.55)",
    strokeWidth: 1.6
  }), /*#__PURE__*/React.createElement("text", {
    x: it.x,
    y: it.y + 4,
    textAnchor: "middle",
    fill: txtCol,
    fontSize: 10,
    fontWeight: "bold"
  }, label));
  const draw = it => {
    switch (it.type) {
      case "A":
        return disc(it, IC.A, "A", "#000");
      case "D":
        return disc(it, IC.D, "D", "#fff");
      case "num":
        return disc(it, IC.num, String(it.n), "#000");
      case "numD":
        return disc(it, IC.D, String(it.n), "#fff");
      case "nine":
        return disc(it, IC.A, "9", "#000");
      case "cone":
        return /*#__PURE__*/React.createElement("polygon", {
          key: it.id,
          points: `${it.x},${it.y - 9} ${it.x - 7},${it.y + 5} ${it.x + 7},${it.y + 5}`,
          fill: IC.cone,
          stroke: "rgba(0,0,0,0.5)"
        });
      case "ball":
        return /*#__PURE__*/React.createElement("ellipse", {
          key: it.id,
          cx: it.x,
          cy: it.y,
          rx: 7,
          ry: 4.5,
          fill: IC.ball,
          stroke: "#000",
          strokeWidth: 1.2
        });
      case "run":
        return /*#__PURE__*/React.createElement("line", {
          key: it.id,
          x1: it.x,
          y1: it.y,
          x2: it.x2,
          y2: it.y2,
          stroke: IC.run,
          strokeWidth: 2.6,
          markerEnd: "url(#bag)"
        });
      case "arc":
        {
          const mx = (it.x + it.x2) / 2,
            my = (it.y + it.y2) / 2;
          const dx = it.x2 - it.x,
            dy = it.y2 - it.y;
          const len = Math.max(1, Math.hypot(dx, dy));
          const bow = Math.min(46, len * 0.45);
          const cx = mx - dy / len * bow,
            cy = my + dx / len * bow;
          return /*#__PURE__*/React.createElement("path", {
            key: it.id,
            d: `M${it.x},${it.y} Q${cx},${cy} ${it.x2},${it.y2}`,
            fill: "none",
            stroke: IC.run,
            strokeWidth: 2.6,
            markerEnd: "url(#bag)"
          });
        }
      case "pass":
        return /*#__PURE__*/React.createElement("line", {
          key: it.id,
          x1: it.x,
          y1: it.y,
          x2: it.x2,
          y2: it.y2,
          stroke: IC.pass,
          strokeWidth: 2.4,
          strokeDasharray: "7,4",
          markerEnd: "url(#bat)"
        });
      case "text":
        return /*#__PURE__*/React.createElement("text", {
          key: it.id,
          x: it.x,
          y: it.y,
          textAnchor: "middle",
          fill: IC.text,
          fontSize: 12.5,
          fontWeight: "bold",
          stroke: "#000",
          strokeWidth: 0.6,
          paintOrder: "stroke"
        }, it.text);
      default:
        return null;
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: S.cols
  }, /*#__PURE__*/React.createElement("div", {
    style: S.colWide
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Draw your drill"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      marginBottom: 10
    }
  }, TOOLS.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.k,
    onClick: () => {
      setTool(t.k);
      setPending(null);
    },
    style: {
      ...S.catBtn,
      padding: "8px 12px",
      fontSize: 12.5,
      display: "flex",
      alignItems: "center",
      gap: 7,
      background: tool === t.k ? t.c : C.panel2,
      color: tool === t.k ? t.k === "num" || t.k === "text" ? "#000" : "#000" : C.text,
      border: `1px solid ${tool === t.k ? t.c : C.line}`,
      fontWeight: tool === t.k ? 800 : 600
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: "50%",
      background: t.c,
      border: "1px solid rgba(0,0,0,0.35)"
    }
  }), t.label))), tool === "text" && /*#__PURE__*/React.createElement("input", {
    value: labelText,
    onChange: e => setLabelText(e.target.value),
    placeholder: "Type the label, then tap the pitch",
    style: {
      ...S.input,
      marginBottom: 10
    }
  }), bg === "pitch" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      marginBottom: 10
    }
  }, VIEWS.map(v => /*#__PURE__*/React.createElement("button", {
    key: v.id,
    onClick: () => setView(v.id),
    style: {
      ...S.catBtn,
      padding: "6px 11px",
      background: view === v.id ? C.maroon : C.panel2,
      color: view === v.id ? C.white : C.muted,
      border: `1px solid ${view === v.id ? C.maroon : C.line}`
    }
  }, v.label))), Object.entries(FORMATIONS).filter(([, f]) => f.ages[age]).length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      marginBottom: 10,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: C.muted,
      textTransform: "uppercase",
      letterSpacing: 1,
      fontWeight: 700
    }
  }, "Drop in a set piece"), Object.entries(FORMATIONS).filter(([, f]) => f.ages[age]).map(([k, f]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => {
      setTool("form:" + k);
      setPending(null);
    },
    style: {
      ...S.catBtn,
      padding: "6px 11px",
      background: tool === "form:" + k ? C.gold : C.panel2,
      color: tool === "form:" + k ? "#000" : C.text,
      border: `1px solid ${tool === "form:" + k ? C.gold : C.line}`,
      fontWeight: 700
    }
  }, f.label, " (", f.ages[age], ")"))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: pending ? C.gold : C.muted,
      marginBottom: 8
    }
  }, tool.startsWith("form:") ? "Tap the pitch to drop the whole set piece in, numbered." : tool === "erase" ? "Tap anything to remove it." : tool === "arc" ? pending ? "Now tap where the run finishes." : "Tap where the run starts, then where it finishes. It bows to one side — tap the ends the other way round to bow it the other way." : tool === "run" || tool === "pass" ? pending ? "Now tap where it ends." : "Tap where it starts, then where it ends." : tool === "text" ? "Type a label above, then tap the pitch." : "Tap the pitch to place."), /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${VW} ${VH}`,
    onClick: tap,
    style: {
      width: "100%",
      borderRadius: 4,
      display: "block",
      cursor: "crosshair",
      touchAction: "manipulation"
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("marker", {
    id: "bag",
    markerWidth: "6",
    markerHeight: "6",
    refX: "3",
    refY: "3",
    orient: "auto"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0,0 L0,6 L6,3 z",
    fill: IC.run
  })), /*#__PURE__*/React.createElement("marker", {
    id: "bat",
    markerWidth: "6",
    markerHeight: "6",
    refX: "3",
    refY: "3",
    orient: "auto"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0,0 L0,6 L6,3 z",
    fill: IC.pass
  }))), /*#__PURE__*/React.createElement(PitchBg, {
    bg: bg,
    age: age,
    view: view
  }), items.map(draw), pending && /*#__PURE__*/React.createElement("circle", {
    cx: pending.x,
    cy: pending.y,
    r: 5,
    fill: "none",
    stroke: C.gold,
    strokeWidth: 2,
    strokeDasharray: "3,2"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap",
      marginTop: 10,
      padding: "9px 11px",
      background: C.panel2,
      borderRadius: 3
    }
  }, TOOLS.filter(t => t.k !== "erase").map(t => /*#__PURE__*/React.createElement("span", {
    key: t.k,
    style: {
      fontSize: 10.5,
      color: C.muted,
      display: "flex",
      alignItems: "center",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: "50%",
      background: t.c
    }
  }), t.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setBg(bg === "pitch" ? "grid" : "pitch"),
    style: S.btnGhost
  }, bg === "pitch" ? "Use blank area" : "Use full pitch"), /*#__PURE__*/React.createElement("button", {
    onClick: undo,
    style: S.btnGhost
  }, "Undo"), /*#__PURE__*/React.createElement("button", {
    onClick: clear,
    style: S.btnGhost
  }, "Clear")))), /*#__PURE__*/React.createElement("div", {
    style: S.colNarrow
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Save it"
  }, /*#__PURE__*/React.createElement("div", {
    style: S.label
  }, "What is it?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, [["newdrill", "New drill"], ["drill", "Add to a drill"], ["setup", "Team setup"]].map(([k, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setKind(k),
    style: {
      ...S.typBtn,
      fontSize: 11.5,
      background: kind === k ? C.gold : C.panel2,
      color: kind === k ? "#000" : C.muted,
      border: `2px solid ${kind === k ? C.gold : C.line}`
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      marginTop: 6,
      lineHeight: 1.6
    }
  }, kind === "setup" ? "Team setups appear in the Players tab." : kind === "newdrill" ? "Makes a brand new drill you can add to sessions." : "Adds this picture to one of the existing drills."), kind === "drill" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: S.label
  }, "Which drill?"), /*#__PURE__*/React.createElement("select", {
    value: drillId,
    onChange: e => setDrillId(e.target.value),
    style: S.input
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Just a diagram (goes in Visuals)"), ALL_DRILLS.map(d => /*#__PURE__*/React.createElement("option", {
    key: d.id,
    value: d.id
  }, d.name)))), kind === "setup" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: S.label
  }, "Starts from"), /*#__PURE__*/React.createElement("select", {
    value: platform,
    onChange: e => setPlatform(e.target.value),
    style: S.input
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Not from a set piece"), ["Scrum", "Lineout", "Kick off", "Restart", "Penalty", "Free kick", "Open play"].map(x => /*#__PURE__*/React.createElement("option", {
    key: x,
    value: x
  }, x))), /*#__PURE__*/React.createElement("div", {
    style: S.label
  }, "Where on the pitch"), /*#__PURE__*/React.createElement("select", {
    value: zone,
    onChange: e => setZone(e.target.value),
    style: S.input
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Anywhere"), ["Our third", "Middle third", "Their third"].map(x => /*#__PURE__*/React.createElement("option", {
    key: x,
    value: x
  }, x)))), /*#__PURE__*/React.createElement("div", {
    style: S.label
  }, "Name"), /*#__PURE__*/React.createElement("input", {
    value: name,
    onChange: e => setName(e.target.value),
    placeholder: kind === "setup" ? "e.g. Lineout strike, their 22" : "e.g. Bulldog",
    style: S.input
  }), kind === "newdrill" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: S.label
  }, "Type"), /*#__PURE__*/React.createElement("select", {
    value: meta.cat,
    onChange: e => setM("cat", e.target.value),
    style: S.input
  }, ["Warm-Up", "Handling", "Tackle", "Game"].map(c => /*#__PURE__*/React.createElement("option", {
    key: c,
    value: c
  }, c))), /*#__PURE__*/React.createElement("div", {
    style: S.label
  }, "Minutes"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "3",
    max: "40",
    value: meta.dur,
    onChange: e => setM("dur", e.target.value),
    style: S.input
  }), /*#__PURE__*/React.createElement("div", {
    style: S.label
  }, "Kit needed"), /*#__PURE__*/React.createElement("input", {
    value: meta.equip,
    onChange: e => setM("equip", e.target.value),
    placeholder: "Cones, bibs, 2 balls",
    style: S.input
  }), /*#__PURE__*/React.createElement("div", {
    style: S.label
  }, "How it runs"), /*#__PURE__*/React.createElement("textarea", {
    value: meta.desc,
    onChange: e => setM("desc", e.target.value),
    placeholder: "A couple of sentences so another coach can run it cold.",
    style: {
      ...S.input,
      height: 70,
      resize: "vertical"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: S.label
  }, "What to say (three coaching points)"), ["p1", "p2", "p3"].map((k, i) => /*#__PURE__*/React.createElement("input", {
    key: k,
    value: meta[k],
    onChange: e => setM(k, e.target.value),
    placeholder: i + 1 + ".",
    style: {
      ...S.input,
      marginBottom: 5
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: S.label
  }, "Coach's tip (optional)"), /*#__PURE__*/React.createElement("input", {
    value: meta.tip,
    onChange: e => setM("tip", e.target.value),
    placeholder: "Anything that makes it work better",
    style: S.input
  })), /*#__PURE__*/React.createElement("button", {
    onClick: doSave,
    style: {
      ...S.btnPrimary,
      width: "100%",
      marginTop: 12
    }
  }, "Save diagram"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      marginTop: 8,
      lineHeight: 1.6
    }
  }, "Saved diagrams are shared — every coach sees them.")), /*#__PURE__*/React.createElement(Card, {
    title: "Saved diagrams"
  }, diagrams.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: C.muted,
      lineHeight: 1.6
    }
  }, "None yet. Draw one and save it.") : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, diagrams.map(d => /*#__PURE__*/React.createElement("div", {
    key: d.id,
    style: S.pickCard
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 13,
      color: C.text,
      marginBottom: 2
    }
  }, d.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: C.gold,
      marginBottom: 7,
      textTransform: "uppercase",
      letterSpacing: 1
    }
  }, d.kind === "setup" ? "→ Players tab" : d.drillId ? "→ " + (findDrill(Number(d.drillId)) || {}).name : "→ Visuals tab"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => load(d),
    style: {
      ...S.btnGhost,
      fontSize: 11,
      padding: "6px 10px"
    }
  }, "Open"), /*#__PURE__*/React.createElement("button", {
    onClick: () => updateDiagram(d.id, {
      kind: d.kind === "setup" ? "drill" : "setup",
      drillId: ""
    }),
    style: {
      ...S.btnGhost,
      fontSize: 11,
      padding: "6px 10px"
    }
  }, d.kind === "setup" ? "Move to Visuals" : "Move to Players"), /*#__PURE__*/React.createElement("button", {
    onClick: () => deleteDiagram(d.id),
    style: {
      ...S.btnGhost,
      fontSize: 11,
      padding: "6px 10px",
      color: C.redL
    }
  }, "Delete")))))))));
}

// ── BLUEPRINT (Scottish Rugby coaching framework) ────────────
function BlueprintTab() {
  const scots = [["S", "Selfless", "Puts the team first before individual success."], ["C", "Creative", "Positive about mistakes and the part they play in learning."], ["O", "Optimistic", "Looks for a positive outcome and treats setbacks as learning."], ["T", "Tenacious", "High work ethic, pushes themselves to improve."], ["S", "Self-Organised", "Works as a team to solve problems without the coach stepping in."]];
  const split = [{
    pct: 70,
    name: "Games",
    body: "Wee games, clan battles, big game. High decision-making, looks most like a real match. Let it flow and coach on the go."
  }, {
    pct: 20,
    name: "Skill Zones",
    body: "Decision-making with the pressure turned down. Attack v defence, repetition without repetition. Lots of questions and feedback."
  }, {
    pct: 10,
    name: "Thistle Time",
    body: "Isolated technical practice. Short and sweet, clear coaching points. Watch carefully and encourage."
  }];
  const blocks = [["Muckabout", "Free play, no coaching. Players express themselves while physical prep happens around it."], ["Wee Games", "Small-sided. Lots of touches. Use STEP to change the challenge."], ["Clan Battle", "Games that force tactical decisions and problem solving."], ["Big Game", "Looks like the full game. Lots of transition. All coaches active."], ["Skills Zone", "Isolated practice on one skill. Short, with clear coaching points."], ["Thistle Time", "Individual or small group work, run by the players and supported by the coach."]];
  const step = [["S — Space", "Pitch size, starting positions, scoring areas, wide channels."], ["T — Task", "Conditions on certain players, new scoring systems, scenarios, challenges."], ["E — Equipment", "Number or type of balls, distractions, alignment constraints."], ["P — People", "Uneven teams, special roles, 'super powers' like double points."]];
  const skills = [["Freeze", "Stop the activity to build awareness. Let players call the freeze too."], ["Replay", "Rewind a phase and give them another go at it."], ["Questioning", "Open questions at the right moment, rather than telling them the answer."], ["Peer-to-peer", "Players share what they saw. Buddy up key positions."], ["Scoring system", "Exaggerate the session's point through how you award points. Reward effort as well as outcome."], ["Second ball", "Add a second ball to create more decisions."], ["Delegation", "Players help design and run parts of the session, and coach each other."], ["Challenges", "Set individual or team challenges tied to the session theme."]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "The Blueprint",
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.muted,
      fontSize: 13,
      lineHeight: 1.7,
      marginBottom: 4
    }
  }, "Scottish Rugby's coaching philosophy, the same at every age group. Worth all of us pulling in the same direction, whichever group we coach."), /*#__PURE__*/React.createElement("div", {
    style: S.tipPill
  }, "⚡ APES underpins every session: ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: C.goldL
    }
  }, "Active · Purposeful · Enjoyment · Safety"))), /*#__PURE__*/React.createElement(Card, {
    title: "SCOTS — what we're trying to grow",
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
      gap: 12
    }
  }, scots.map(([l, name, body], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: S.libCard
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: C.maroon,
      color: C.white,
      width: 26,
      height: 26,
      borderRadius: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 800
    }
  }, l), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: C.gold,
      fontSize: 14
    }
  }, name)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: C.tan,
      lineHeight: 1.6
    }
  }, body))))), /*#__PURE__*/React.createElement(Card, {
    title: "How a session should split",
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.muted,
      fontSize: 13,
      marginBottom: 12,
      lineHeight: 1.6
    }
  }, "The challenge SRU set coaches: spend up to 80% of the session inside game-related activity."), split.map(x => /*#__PURE__*/React.createElement("div", {
    key: x.name,
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '"Haettenschweiler", "Arial Narrow", Impact, sans-serif',
      fontSize: 26,
      color: C.gold,
      minWidth: 52
    }
  }, x.pct, "%"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: C.white,
      fontSize: 14
    }
  }, x.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#1a1713",
      borderRadius: 2,
      height: 7,
      overflow: "hidden",
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: x.pct + "%",
      height: "100%",
      background: C.gold
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: C.tan,
      lineHeight: 1.6
    }
  }, x.body)))), /*#__PURE__*/React.createElement(Card, {
    title: "Session blocks",
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
      gap: 12
    }
  }, blocks.map(([n, b]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: S.libCard
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      color: C.gold,
      fontSize: 13.5,
      marginBottom: 5
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: C.tan,
      lineHeight: 1.6
    }
  }, b))))), /*#__PURE__*/React.createElement(Card, {
    title: "STEP — making it harder or easier",
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.muted,
      fontSize: 13,
      marginBottom: 12,
      lineHeight: 1.6
    }
  }, "When a game isn't working, change one of these rather than explaining it again."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
      gap: 12
    }
  }, step.map(([n, b]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: S.libCard
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      color: C.gold,
      fontSize: 13.5,
      marginBottom: 5
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: C.tan,
      lineHeight: 1.6
    }
  }, b))))), /*#__PURE__*/React.createElement(Card, {
    title: "Coaching skills"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
      gap: 12
    }
  }, skills.map(([n, b]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: S.libCard
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      color: C.gold,
      fontSize: 13.5,
      marginBottom: 5
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: C.tan,
      lineHeight: 1.6
    }
  }, b))))));
}

// ── APP ──────────────────────────────────────────────────────

var LOGO_FILES = ["panthers-logo.png","panthers-logo.jpg","panthers-logo.jpeg","Panthers-Logo.png","logo.png","logo.jpg","panthers.png","panthers.jpg","Panmure_Panthers.jpg","Panmure_Panthers.png"];
function Logo() {
  var _s = useState(0), i = _s[0], setI = _s[1];
  if (i >= LOGO_FILES.length) return null;
  return React.createElement("img", { src: LOGO_FILES[i], alt: "Panmure Panthers", style: S.mark, onError: function () { setI(i + 1); } });
}

function App() {
  const [tab, setTab] = useState("block");
  const [age, setAge] = useState("u10");
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState(blankPlan("u10"));
  const [cat, setCat] = useState("All");
  const [sel, setSel] = useState("nine");
  const [stand, setStand] = useState("defend");
  const [names, setNames] = useState({});
  const [seed, setSeed] = useState(null);
  const [hidden, setHidden] = useState([]);
  const [myDrills, setMyDrills] = useState([]);
  const [drillAges, setDrillAges] = useState({});
  const [drillNotes, setDrillNotes] = useState({});
  const [toast, setToast] = useState("");
  const [diagrams, setDiagrams] = useState([]);
  const [shareText, setShareText] = useState(null);
  const [copied, setCopied] = useState(false);

  // Each age group has its own data. U10 falls back to the original keys so
  // anything saved before the age groups existed is still there.
  const loadKey = async (base, setter, fallback) => {
    for (const key of [`${base}-${age}`, ...(fallback ? [base] : [])]) {
      try {
        const r = await window.storage.get(key, true);
        if (r?.value) {
          setter(JSON.parse(r.value));
          return;
        }
      } catch {/* try the next one */}
    }
    setter([]);
  };
  useEffect(() => {
    (async () => {
      setLoading(true);
      const first = age === "u10";
      await loadKey("panthers-sessions", setPlans, first);
      await loadKey("panthers-diagrams", setDiagrams, first);
      await loadKey("panthers-hidden", setHidden, first);
      try {
        const md = await window.storage.get("panthers-my-drills", true);
        setMyDrills(md?.value ? JSON.parse(md.value) : []);
      } catch {
        setMyDrills([]);
      }
      try {
        const da = await window.storage.get("panthers-drill-ages", true);
        setDrillAges(da?.value ? JSON.parse(da.value) : {});
      } catch {
        setDrillAges({});
      }
      try {
        const dnt = await window.storage.get("panthers-drill-notes", true);
        setDrillNotes(dnt?.value ? JSON.parse(dnt.value) : {});
      } catch {
        setDrillNotes({});
      }
      try {
        const n = await window.storage.get(`panthers-drill-names-${age}`, true);
        setNames(n?.value ? JSON.parse(n.value) : {});
      } catch {
        try {
          const n2 = await window.storage.get("panthers-drill-names", true);
          setNames(n2?.value && first ? JSON.parse(n2.value) : {});
        } catch {
          setNames({});
        }
      }
      setLoading(false);
    })();
  }, [age]);
  const flash = m => {
    setToast(m);
    setTimeout(() => setToast(""), 2600);
  };
  const persist = async next => {
    setPlans(next);
    try {
      await window.storage.set(`panthers-sessions-${age}`, JSON.stringify(next), true);
    } catch {
      flash("Saved on this device only — couldn't reach shared storage");
    }
  };
  const addDrill = d => setPlan(p => p.drills.find(x => x.id === d.id) ? p : {
    ...p,
    drills: [...p.drills, {
      ...d
    }]
  });
  const remDrill = id => setPlan(p => ({
    ...p,
    drills: p.drills.filter(d => d.id !== id)
  }));
  const move = (from, to) => setPlan(p => {
    if (to < 0 || to >= p.drills.length) return p;
    const a = [...p.drills];
    const [it] = a.splice(from, 1);
    a.splice(to, 0, it);
    return {
      ...p,
      drills: a
    };
  });
  const savePlan = () => {
    if (!plan.date) return flash("Pick a date so everyone knows which Sunday it is");
    const i = plans.findIndex(x => x.id === plan.id);
    persist(i >= 0 ? plans.map((x, j) => j === i ? plan : x) : [...plans, plan]);
    flash("Saved for all coaches");
  };
  const deletePlan = id => persist(plans.filter(p => p.id !== id));
  const persistDiagrams = async next => {
    setDiagrams(next);
    try {
      await window.storage.set(`panthers-diagrams-${age}`, JSON.stringify(next), true);
    } catch {
      flash("Saved on this device only");
    }
  };
  const saveDiagram = d => persistDiagrams([...diagrams.filter(x => x.name !== d.name || x.kind !== d.kind), d]);
  const persistHidden = async next => {
    setHidden(next);
    try {
      await window.storage.set(`panthers-hidden-${age}`, JSON.stringify(next), true);
    } catch {/* offline */}
  };
  const hide = id => {
    persistHidden([...hidden, id]);
    flash("Hidden — restore it at the bottom of this tab");
  };
  const unhide = id => persistHidden(hidden.filter(x => x !== id));
  const drawOwn = d => {
    setSeed({
      ...d,
      kind: "drill"
    });
    setTab("builder");
  };
  const persistDrills = async next => {
    setMyDrills(next);
    try {
      await window.storage.set("panthers-my-drills", JSON.stringify(next), true);
    } catch {
      flash("Saved on this device only");
    }
  };
  const saveDrill = d => persistDrills([...myDrills.filter(x => x.name !== d.name), d]);
  const deleteDrill = id => persistDrills(myDrills.filter(d => d.id !== id));
  const editSetup = d => {
    setSeed({
      ...d,
      kind: "setup"
    });
    setTab("builder");
  };
  const newSetup = () => {
    setSeed({
      name: "",
      bg: "pitch",
      items: [],
      kind: "setup"
    });
    setTab("builder");
  };
  const agesOf = d => drillAges[d.id] || d.ages || ["u10", "u12"];
  const everyDrill = [...DRILLS, ...myDrills];
  const allDrills = everyDrill.filter(d => agesOf(d).includes(age));
  const otherDrills = everyDrill.filter(d => !agesOf(d).includes(age));
  const setAges = async (d, list) => {
    const next = {
      ...drillAges,
      [d.id]: list
    };
    setDrillAges(next);
    try {
      await window.storage.set("panthers-drill-ages", JSON.stringify(next), true);
    } catch {
      flash("Saved on this device only");
    }
  };
  const noteOf = d => d && drillNotes[d.id] ? drillNotes[d.id][age] || "" : "";
  const setNote = async (d, text) => {
    const next = {
      ...drillNotes,
      [d.id]: {
        ...(drillNotes[d.id] || {}),
        [age]: text
      }
    };
    if (!text) delete next[d.id][age];
    setDrillNotes(next);
    try {
      await window.storage.set("panthers-drill-notes", JSON.stringify(next), true);
    } catch {
      flash("Saved on this device only");
    }
    flash(text ? `Saved for ${findAge(age).label}` : "Note removed");
  };
  const addToAge = d => {
    setAges(d, [...new Set([...agesOf(d), age])]);
    flash(`Added to ${findAge(age).label}`);
  };
  const removeFromAge = d => {
    setAges(d, agesOf(d).filter(a => a !== age));
    flash(`Removed from ${findAge(age).label}`);
  };
  setAllDrills(allDrills);
  const dn = d => d ? names[d.id] || d.name : "";
  const rename = async (id, custom) => {
    const next = {
      ...names
    };
    if (custom) next[id] = custom;else delete next[id];
    setNames(next);
    try {
      await window.storage.set(`panthers-drill-names-${age}`, JSON.stringify(next), true);
    } catch {
      flash("Renamed here only — couldn't reach shared storage");
    }
    flash(custom ? "Renamed for all coaches" : "Name reset");
  };
  const deleteDiagram = id => persistDiagrams(diagrams.filter(d => d.id !== id));
  const updateDiagram = (id, patch) => persistDiagrams(diagrams.map(d => d.id === id ? {
    ...d,
    ...patch
  } : d));
  const loadBlock = b => {
    setPlan({
      id: Date.now(),
      age,
      date: "",
      type: "sunday",
      theme: `Session ${b.n} — ${b.theme}`,
      points: [...b.points],
      notes: "",
      drills: b.drills.map(id => ({
        ...findDrill(id)
      }))
    });
    setTab("planner");
    flash(`Session ${b.n} loaded`);
  };
  const share = p => {
    setShareText(buildMessage(p, dn));
    setCopied(false);
  };
  const doCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
    } catch {
      flash("Select the text and copy it manually");
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    style: S.root
  }, /*#__PURE__*/React.createElement("div", {
    style: S.header
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Logo, null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Wordmark, null), /*#__PURE__*/React.createElement("div", {
    style: S.sub
  }, findAge(age).full, " · ", findAge(age).strapline))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 5,
      flexWrap: "wrap",
      justifyContent: "flex-end"
    }
  }, AGES.map(a => /*#__PURE__*/React.createElement("button", {
    key: a.id,
    onClick: () => {
      setAge(a.id);
      setPlan(blankPlan(a.id));
    },
    style: {
      ...S.ageBtn,
      ...(age === a.id ? S.ageBtnOn : {})
    }
  }, a.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      justifyContent: "flex-end"
    }
  }, [["block", "Sessions"], ["planner", "Planner"], ["visuals", "Visuals"], ["players", "Plays"], ["builder", "Draw"], ["library", "Drills"], ["saved", "Saved"], ["laws", "Laws"], ["blueprint", "Blueprint"]].map(([k, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setTab(k),
    style: {
      ...S.navBtn,
      ...(tab === k ? S.navBtnOn : {})
    }
  }, l))))), /*#__PURE__*/React.createElement("div", {
    style: S.values
  }, "Respect · Teamwork · Enjoyment ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.gold,
      fontWeight: 800
    }
  }, "#PLAYUPPANMURE"), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.55,
      marginLeft: 10,
      letterSpacing: 1
    }
  }, APP_VERSION)), tab === "block" && /*#__PURE__*/React.createElement(BlockTab, {
    loadBlock: loadBlock,
    dn: dn,
    age: age
  }), tab === "planner" && /*#__PURE__*/React.createElement(PlannerTab, {
    plan,
    setPlan,
    savePlan,
    cat,
    setCat,
    addDrill,
    remDrill,
    move,
    loadBlock,
    openShare: () => share(plan),
    dn,
    custom: diagrams,
    noteOf
  }), tab === "visuals" && /*#__PURE__*/React.createElement(VisualsTab, {
    sel: sel,
    setSel: setSel,
    custom: diagrams,
    hidden: hidden,
    hide: hide,
    unhide: unhide,
    drawOwn: drawOwn,
    deleteDiagram: deleteDiagram,
    age: age
  }), tab === "players" && /*#__PURE__*/React.createElement(PlayersTab, {
    sel: stand,
    setSel: setStand,
    setups: diagrams.filter(d => d.kind === "setup"),
    editSetup: editSetup,
    newSetup: newSetup,
    deleteDiagram: deleteDiagram,
    age: age
  }), tab === "builder" && /*#__PURE__*/React.createElement(BuilderTab, {
    diagrams: diagrams,
    saveDiagram: saveDiagram,
    saveDrill: saveDrill,
    deleteDiagram: deleteDiagram,
    updateDiagram: updateDiagram,
    flash: flash,
    seed: seed,
    clearSeed: () => setSeed(null),
    age: age
  }), tab === "library" && /*#__PURE__*/React.createElement(LibraryTab, {
    cat: cat,
    setCat: setCat,
    addDrill: addDrill,
    goPlanner: () => setTab("planner"),
    dn: dn,
    rename: rename,
    custom: diagrams,
    drills: allDrills,
    others: otherDrills,
    deleteDrill: deleteDrill,
    age: age,
    agesOf: agesOf,
    addToAge: addToAge,
    removeFromAge: removeFromAge,
    noteOf: noteOf,
    setNote: setNote
  }), tab === "saved" && /*#__PURE__*/React.createElement(SavedTab, {
    plans: plans,
    loadPlan: p => {
      setPlan(p);
      setTab("planner");
    },
    newPlan: () => {
      setPlan(blankPlan(age));
      setTab("planner");
    },
    deletePlan: deletePlan,
    loading: loading,
    share: share,
    dn: dn
  }), tab === "laws" && /*#__PURE__*/React.createElement(LawsTab, {
    age: age
  }), tab === "blueprint" && /*#__PURE__*/React.createElement(BlueprintTab, null), shareText && /*#__PURE__*/React.createElement(ShareSheet, {
    text: shareText,
    onClose: () => setShareText(null),
    onCopy: doCopy,
    copied: copied
  }), toast && /*#__PURE__*/React.createElement("div", {
    style: S.toast
  }, toast));
}

// ── STYLES ────────────────────────────────────────────────────
const S = {
  root: {
    minHeight: "100vh",
    background: C.black,
    color: C.text,
    fontFamily: '"Helvetica Neue", Arial, sans-serif'
  },
  header: {
    background: C.black,
    borderBottom: `3px solid ${C.gold}`,
    padding: "14px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 14
  },
  mark: {
    height: 48,
    width: "auto",
    display: "block"
  },
  values: {
    background: C.maroon,
    color: C.white,
    fontSize: 10.5,
    letterSpacing: 2.2,
    textTransform: "uppercase",
    padding: "6px 16px",
    fontWeight: 700
  },
  eyebrow: {
    fontSize: 10,
    letterSpacing: 5,
    color: C.white,
    fontWeight: 700,
    textTransform: "uppercase",
    marginBottom: -1
  },
  wordmark: {
    fontFamily: '"Haettenschweiler", "Arial Narrow", Impact, sans-serif',
    fontSize: 34,
    color: C.gold,
    letterSpacing: 1.5,
    fontStyle: "italic",
    lineHeight: 0.92,
    textTransform: "uppercase"
  },
  sub: {
    fontSize: 10,
    color: C.muted,
    letterSpacing: 3,
    marginTop: 7,
    textTransform: "uppercase",
    fontWeight: 700
  },
  ageBtn: {
    background: "transparent",
    border: `1px solid ${C.line}`,
    color: C.muted,
    padding: "6px 16px",
    borderRadius: 2,
    cursor: "pointer",
    fontSize: 13,
    fontFamily: "inherit",
    fontWeight: 800,
    letterSpacing: 1.5
  },
  ageBtnOn: {
    background: C.maroon,
    color: C.white,
    border: `1px solid ${C.maroon}`
  },
  navBtn: {
    background: "transparent",
    border: `1px solid ${C.line}`,
    color: C.muted,
    padding: "8px 13px",
    borderRadius: 2,
    cursor: "pointer",
    fontSize: 11.5,
    fontFamily: "inherit",
    fontWeight: 700,
    letterSpacing: 1.2,
    textTransform: "uppercase"
  },
  navBtnOn: {
    background: C.gold,
    color: C.black,
    border: `1px solid ${C.gold}`
  },
  cols: {
    display: "flex",
    gap: 14,
    padding: 14,
    alignItems: "flex-start",
    flexWrap: "wrap"
  },
  colNarrow: {
    flex: "1 1 270px",
    minWidth: 250,
    display: "flex",
    flexDirection: "column",
    gap: 14
  },
  colWide: {
    flex: "2 1 340px",
    minWidth: 280
  },
  card: {
    background: C.panel,
    border: `1px solid ${C.line}`,
    borderRadius: 4,
    padding: 16
  },
  cardHd: {
    fontFamily: '"Haettenschweiler", "Arial Narrow", Impact, sans-serif',
    fontSize: 21,
    fontWeight: 400,
    color: C.white,
    marginBottom: 12,
    letterSpacing: 1.2,
    textTransform: "uppercase"
  },
  microHd: {
    fontSize: 9.5,
    color: C.gold,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: 1.6,
    marginBottom: 5
  },
  datePill: {
    fontSize: 11,
    background: "#1a1713",
    color: C.gold,
    padding: "2px 8px",
    borderRadius: 10,
    marginLeft: 8
  },
  badge: {
    fontSize: 10,
    padding: "4px 11px",
    borderRadius: 2,
    background: C.maroon,
    color: C.white,
    fontWeight: 800,
    letterSpacing: 1.4,
    textTransform: "uppercase"
  },
  label: {
    display: "block",
    fontSize: 10,
    color: C.muted,
    marginBottom: 4,
    marginTop: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: 700
  },
  input: {
    width: "100%",
    background: C.panel2,
    border: `1px solid ${C.line}`,
    color: C.text,
    borderRadius: 5,
    padding: "9px 10px",
    fontSize: 14,
    boxSizing: "border-box",
    fontFamily: "inherit"
  },
  typBtn: {
    flex: 1,
    padding: "8px 10px",
    borderRadius: 5,
    cursor: "pointer",
    fontSize: 12.5,
    fontWeight: 700,
    fontFamily: "inherit"
  },
  timerBox: {
    background: C.panel2,
    border: `1px solid ${C.line}`,
    borderRadius: 8,
    padding: 12,
    marginTop: 14
  },
  noteBox: {
    background: C.maroon,
    borderRadius: 3,
    padding: "9px 11px",
    marginBottom: 10
  },
  pointsBox: {
    background: C.maroon,
    borderRadius: 4,
    padding: "12px 14px",
    marginBottom: 14
  },
  btnPrimary: {
    background: C.gold,
    color: C.black,
    border: "none",
    padding: "12px 16px",
    borderRadius: 2,
    cursor: "pointer",
    fontWeight: 800,
    fontSize: 12.5,
    fontFamily: "inherit",
    textAlign: "center",
    letterSpacing: 1.4,
    textTransform: "uppercase"
  },
  btnGhost: {
    background: "transparent",
    color: C.gold,
    border: `1px solid ${C.goldDim}`,
    padding: "11px 14px",
    borderRadius: 2,
    cursor: "pointer",
    fontSize: 12,
    fontFamily: "inherit",
    fontWeight: 700,
    letterSpacing: 1.1,
    textTransform: "uppercase"
  },
  blockBtn: {
    background: "#1a1713",
    color: C.gold,
    border: `1px solid ${C.goldDim}`,
    padding: "8px 14px",
    borderRadius: 20,
    cursor: "pointer",
    fontSize: 12.5,
    fontFamily: "inherit",
    fontWeight: 600
  },
  catBtn: {
    padding: "5px 11px",
    borderRadius: 20,
    fontSize: 11.5,
    background: C.panel2,
    color: C.muted,
    border: `1px solid ${C.line}`,
    cursor: "pointer",
    fontFamily: "inherit"
  },
  catBtnOn: {
    background: C.gold,
    color: C.black,
    border: `1px solid ${C.gold}`,
    fontWeight: 700
  },
  drillRow: {
    display: "flex",
    gap: 10,
    background: C.panel2,
    border: `1px solid ${C.line}`,
    borderRadius: 8,
    padding: 12,
    alignItems: "flex-start"
  },
  drillNum: {
    background: C.maroon,
    color: C.white,
    width: 26,
    height: 26,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 800,
    flexShrink: 0
  },
  moveBtn: {
    background: "transparent",
    border: `1px solid ${C.line}`,
    color: C.gold,
    width: 26,
    height: 22,
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 9,
    padding: 0,
    fontFamily: "inherit"
  },
  catPill: {
    fontSize: 10,
    color: C.muted,
    background: C.black,
    padding: "1px 6px",
    borderRadius: 10
  },
  ptPill: {
    fontSize: 11,
    color: C.green,
    background: "#0d1409",
    padding: "2px 8px",
    borderRadius: 10
  },
  tipPill: {
    fontSize: 11.5,
    color: C.goldL,
    background: "#12100a",
    borderLeft: `3px solid ${C.gold}`,
    borderRadius: 2,
    padding: "8px 11px",
    marginTop: 8,
    lineHeight: 1.65
  },
  durPill: {
    background: "#1a1713",
    color: C.gold,
    fontSize: 11,
    padding: "2px 7px",
    borderRadius: 10,
    fontWeight: 700
  },
  xBtn: {
    background: "transparent",
    border: `1px solid ${C.line}`,
    color: C.grey,
    width: 26,
    height: 26,
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: 12,
    fontFamily: "inherit"
  },
  pickCard: {
    background: C.panel2,
    border: `1px solid ${C.line}`,
    borderRadius: 7,
    padding: 11
  },
  empty: {
    textAlign: "center",
    padding: "34px 16px",
    fontSize: 14
  },
  diagBtn: {
    background: C.panel2,
    border: `1px solid ${C.line}`,
    color: C.muted,
    padding: "8px 12px",
    borderRadius: 5,
    cursor: "pointer",
    fontSize: 12.5,
    fontFamily: "inherit",
    fontWeight: 600
  },
  diagBtnOn: {
    background: C.gold,
    color: C.black,
    border: `1px solid ${C.gold}`
  },
  diagCard: {
    background: C.panel2,
    border: `1px solid ${C.goldDim}`,
    borderRadius: 10,
    padding: 16
  },
  libCard: {
    background: C.panel2,
    border: `1px solid ${C.line}`,
    borderRadius: 4,
    padding: 14
  },
  lawTile: {
    background: C.panel2,
    border: `1px solid ${C.line}`,
    borderRadius: 8,
    padding: 12,
    textAlign: "center"
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.75)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    zIndex: 100
  },
  sheet: {
    background: C.panel,
    border: `1px solid ${C.gold}`,
    borderRadius: 12,
    padding: 18,
    width: "100%",
    maxWidth: 460,
    maxHeight: "88vh",
    overflowY: "auto"
  },
  shareBox: {
    width: "100%",
    height: 260,
    background: C.panel2,
    border: `1px solid ${C.line}`,
    color: C.text,
    borderRadius: 6,
    padding: 12,
    fontSize: 12.5,
    fontFamily: "ui-monospace, Menlo, monospace",
    boxSizing: "border-box",
    resize: "vertical",
    lineHeight: 1.55
  },
  toast: {
    position: "fixed",
    bottom: 20,
    left: "50%",
    transform: "translateX(-50%)",
    background: C.gold,
    color: C.black,
    padding: "11px 20px",
    borderRadius: 2,
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    zIndex: 120
  }
};
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));