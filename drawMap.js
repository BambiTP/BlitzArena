const floorTiles = {
  1: { hex: "d4d4d4", y: 4, x: 13, texture: "tile", drawBackground: false }, // floor
  2: { hex: "808000", y: 1, x: 13, texture: "tile", drawBackground: true }, // yellow flag
  3: { hex: "ff0000", y: 1, x: 14, texture: "tile", drawBackground: true }, // red flag
  4: { hex: "0000ff", y: 1, x: 15, texture: "tile", drawBackground: true }, // blue flag
  5: { hex: "373737", y: 0, x: 12, texture: "tile", drawBackground: true }, // spike
  6: { hex: "202020", y: 0, x: 0, texture: "gravitywell", drawBackground: true }, // gravity well
  7: { hex: "b90000", y: 5, x: 14, texture: "tile", drawBackground: false }, // red goal
  8: { hex: "190094", y: 5, x: 15, texture: "tile", drawBackground: false }, // blue goal
  9: { hex: "dcbaba", y: 4, x: 14, texture: "tile", drawBackground: false }, // red team tile
  10: { hex: "bbb8dd", y: 4, x: 15, texture: "tile", drawBackground: false }, // blue team tile
  11: { hex: "dcdcba", y: 5, x: 13, texture: "tile", drawBackground: false }, // yellow team tile
  12: { hex: "00ff00", y: 4, x: 12, texture: "tile", drawBackground: true }, // juke juice
  13: { hex: "b97a57", y: 6, x: 13, texture: "tile", drawBackground: true }, // button
  14: { hex: "ff8000", y: 1, x: 12, texture: "tile", drawBackground: true }, // bomb
  15: { hex: "007500", y: 3, x: 12, texture: "tile", drawBackground: false }, // empty gate
  16: { hex: "007500", y: 3, x: 13, texture: "tile", drawBackground: false }, // green gate
  17: { hex: "007500", y: 3, x: 14, texture: "tile", drawBackground: false }, // red gate
  18: { hex: "007500", y: 3, x: 15, texture: "tile", drawBackground: false }, // blue gate
  19: { hex: "ff8080", y: 7, x: 14, texture: "tile", drawBackground: true }, // red potato
  20: { hex: "656500", y: 6, x: 14, texture: "tile", drawBackground: true }, // yellow potato
  21: { hex: "8080ff", y: 8, x: 14, texture: "tile", drawBackground: true }, // blue potato
  22: { hex: "ffff00", y: 0, x: 0, texture: "speedpad", drawBackground: true }, // yellow boost
  23: { hex: "ff7373", y: 0, x: 0, texture: "speedpadred", drawBackground: true }, // red boost
  24: { hex: "7373ff", y: 0, x: 0, texture: "speedpadblue", drawBackground: true }, // blue boost
  25: { hex: "cac000", y: 0, x: 0, texture: "portal", drawBackground: true }, // neutral portal
  26: { hex: "cc3300", y: 0, x: 0, texture: "portalred", drawBackground: true }, // red portal
  27: { hex: "0066cc", y: 0, x: 0, texture: "portalblue", drawBackground: true } // blue portal
};

const wallTypes = {
  1.0: { hex: "787878", wallSolids: 0xff },
  1.1: { hex: "804070", wallSolids: 0x2d },
  1.2: { hex: "408050", wallSolids: 0xd2 },
  1.3: { hex: "405080", wallSolids: 0x4b },
  1.4: { hex: "807040", wallSolids: 0xb4 }
};

const hexToWallId = Object.fromEntries(
  Object.entries(wallTypes).map(([id, wt]) => [wt.hex, parseFloat(id)])
);

const quadrantCoords = {
      "132": [10.5, 7.5],
      "232": [11, 7.5],
      "332": [11, 8],
      "032": [10.5, 8],
      "132d": [0.5, 3.5],
      "232d": [1, 3.5],
      "032d": [0.5, 4],
      "143": [4.5, 9.5],
      "243": [5, 9.5],
      "343": [5, 10],
      "043": [4.5, 10],
      "143d": [1.5, 2.5],
      "243d": [2, 2.5],
      "043d": [1.5, 3],
      "154": [6.5, 9.5],
      "254": [7, 9.5],
      "354": [7, 10],
      "054": [6.5, 10],
      "154d": [9.5, 2.5],
      "254d": [10, 2.5],
      "354d": [10, 3],
      "165": [0.5, 7.5],
      "265": [1, 7.5],
      "365": [1, 8],
      "065": [0.5, 8],
      "165d": [10.5, 3.5],
      "265d": [11, 3.5],
      "365d": [11, 4],
      "176": [1.5, 6.5],
      "276": [2, 6.5],
      "376": [2, 7],
      "076": [1.5, 7],
      "276d": [9, 1.5],
      "376d": [9, 2],
      "076d": [8.5, 2],
      "107": [6.5, 8.5],
      "207": [7, 8.5],
      "307": [7, 9],
      "007": [6.5, 9],
      "207d": [11, 1.5],
      "307d": [11, 2],
      "007d": [10.5, 2],
      "110": [4.5, 8.5],
      "210": [5, 8.5],
      "310": [5, 9],
      "010": [4.5, 9],
      "110d": [0.5, 1.5],
      "310d": [1, 2],
      "010d": [0.5, 2],
      "121": [9.5, 6.5],
      "221": [10, 6.5],
      "321": [10, 7],
      "021": [9.5, 7],
      "121d": [2.5, 1.5],
      "321d": [3, 2],
      "021d": [2.5, 2],
      "142": [1.5, 7.5],
      "242": [2, 7.5],
      "042": [1.5, 8],
      "142d": [10.5, 0.5],
      "242d": [11, 0.5],
      "042d": [10.5, 1],
      "153": [5.5, 6.5],
      "253": [6, 6.5],
      "353": [6, 7],
      "053": [5.5, 7],
      "153d": [5.5, 0.5],
      "253d": [6, 0.5],
      "164": [9.5, 7.5],
      "264": [10, 7.5],
      "364": [10, 8],
      "164d": [0.5, 0.5],
      "264d": [1, 0.5],
      "364d": [1, 1],
      "175": [4.5, 5.5],
      "275": [5, 5.5],
      "375": [5, 6],
      "075": [4.5, 6],
      "275d": [7, 1.5],
      "375d": [7, 2],
      "206": [4.5, 9.5],
      "306": [4.5, 10],
      "006": [3.5, 10],
      "206d": [2, 3.5],
      "306d": [2, 4],
      "006d": [1.5, 4],
      "117": [5.5, 2.5],
      "217": [6, 2.5],
      "317": [6, 4],
      "017": [5.5, 4],
      "317d": [6, 3],
      "017d": [5.5, 3],
      "120": [7.5, 9.5],
      "320": [8, 10],
      "020": [7.5, 10],
      "120d": [9.5, 3.5],
      "320d": [10, 4],
      "020d": [9.5, 4],
      "131": [6.5, 5.5],
      "231": [7, 5.5],
      "331": [7, 6],
      "031": [6.5, 6],
      "131d": [4.5, 1.5],
      "031d": [4.5, 2],
      "141": [7.5, 8.5],
      "241": [8, 8.5],
      "323": [4, 5],
      "041": [7.5, 9],
      "141d": [8.5, 3.5],
      "041d": [8.5, 4],
      "152": [8.5, 7.5],
      "252": [9, 7.5],
      "334": [2, 0],
      "052": [8.5, 8],
      "152d": [3.5, 0.5],
      "252d": [4, 0.5],
      "163": [2, 7.5],
      "263": [3, 7.5],
      "363": [3, 8],
      "045": [9.5, 0],
      "163d": [7.5, 0.5],
      "263d": [8, 0.5],
      "174": [3.5, 8.5],
      "274": [4, 8.5],
      "374": [4, 9],
      "056": [7.5, 5],
      "274d": [3, 3.5],
      "374d": [3, 4],
      "167": [7.5, 6.5],
      "205": [10, 8.5],
      "305": [10, 9],
      "005": [9.5, 9],
      "205d": [2, 0.5],
      "305d": [2, 1],
      "170": [6.5, 7.5],
      "216": [9, 9.5],
      "316": [9, 10],
      "016": [8.5, 10],
      "316d": [10, 5],
      "016d": [9.5, 5],
      "127": [2.5, 9.5],
      "201": [5, 7.5],
      "327": [3, 10],
      "027": [2.5, 10],
      "327d": [2, 5],
      "027d": [1.5, 5],
      "130": [1.5, 8.5],
      "212": [4, 6.5],
      "330": [2, 9],
      "030": [1.5, 9],
      "130d": [9.5, 0.5],
      "030d": [9.5, 1],
      "151": [10.5, 9.5],
      "251": [11, 9.5],
      "324": [0, 7],
      "051": [10.5, 10],
      "151d": [10.5, 4.5],
      "324d": [0, 0],
      "162": [8.5, 10.5],
      "262": [9, 10.5],
      "335": [6, 8],
      "035": [5.5, 8],
      "162d": [3.5, 2.5],
      "262d": [8, 2.5],
      "173": [0.5, 9.5],
      "273": [1, 9.5],
      "373": [1, 10],
      "046": [11.5, 7],
      "046d": [11.5, 0],
      "273d": [1, 4.5],
      "157": [11.5, 8.5],
      "204": [0, 5.5],
      "304": [0, 5],
      "057": [11.5, 9],
      "204d": [0, 4.5],
      "304d": [0, 6],
      "160": [11.5, 7.5],
      "215": [8, 6.5],
      "315": [8, 7],
      "015": [7.5, 7],
      "160d": [2.5, 4.5],
      "315d": [9, 3],
      "171": [5.5, 10.5],
      "271": [6, 10.5],
      "326": [6, 5],
      "026": [5.5, 5],
      "326d": [7, 5],
      "026d": [4.5, 5],
      "137": [3.5, 6.5],
      "202": [0, 7.5],
      "337": [4, 7],
      "037": [3.5, 7],
      "202d": [9, 4.5],
      "037d": [2.5, 3],
      "140": [11.5, 5.5],
      "213": [0, 8.5],
      "313": [0, 9],
      "040": [11.5, 5],
      "140d": [11.5, 4.5],
      "040d": [11.5, 6],
      "161": [9.5, 10.5],
      "261": [10, 10.5],
      "325": [9, 6],
      "025": [8.5, 6],
      "161d": [3.5, 1.5],
      "325d": [4, 1],
      "172": [1.5, 10.5],
      "272": [2, 10.5],
      "336": [3, 6],
      "036": [2.5, 6],
      "036d": [7.5, 1],
      "272d": [8, 1.5],
      "147": [4.5, 7.5],
      "203": [4, 3.5],
      "303": [4, 4],
      "047": [4.5, 8],
      "047d": [8.5, 5],
      "203d": [8, 4.5],
      "150": [7.5, 3.5],
      "214": [7, 7.5],
      "314": [7, 8],
      "050": [7.5, 4],
      "150d": [3.5, 4.5],
      "314d": [3, 5],
      "100": [5.5, 5.5],
      "200": [6, 5.5],
      "300": [6, 6],
      "000": [5.5, 6],
      "100d": [5.5, 8.5],
      "200d": [6, 8.5],
      "300d": [6, 10],
      "000d": [5.5, 10]
    };
const images = {
  tile:         "tiles.png",
  speedpad:     "speedpad.png",
  speedpadred:  "speedpadred.png",
  speedpadblue: "speedpadblue.png",
  portal:       "portal.png",
  portalred:    "portalred.png",
  portalblue:   "portalblue.png",
  gravitywell:  "gravitywell.png"
};

async function drawMap(mapSrc, ctx, tileSize, quadSize) {
  function loadImage(src) {
    return new Promise(res => {
      const img = new Image(); img.src = src; img.onload = () => res(img);
    });
  }

  const hexToTileId = Object.fromEntries(
    Object.entries(floorTiles).map(([id, ft]) => [ft.hex, Number(id)])
  );

  const mapImg = await loadImage(mapSrc);
  const imageElements = {};
  for (const [key, src] of Object.entries(images)) {
    imageElements[key] = await loadImage(src);
  }

  const w = mapImg.width, h = mapImg.height;
  ctx.canvas.width = w * tileSize;
  ctx.canvas.height = h * tileSize;

  // Draw everything on offscreen canvas to read pixels
  const tmp = document.createElement("canvas");
  tmp.width = w; tmp.height = h;
  const tctx = tmp.getContext("2d");
  tctx.drawImage(mapImg, 0, 0);
  const data = tctx.getImageData(0, 0, w, h).data;

  const tileMap = Array.from({ length: h }, () => Array(w).fill(0));
  const wallMap = Array.from({ length: h }, () => Array(w).fill(0));

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const r = data[i], g = data[i+1], b = data[i+2], a = data[i+3];
      // skip transparent pixels in source PNG
      if (a === 0) {
        continue;
      }
      // skip black pixels if desired (optional)
      if (r === 0 && g === 0 && b === 0) {
        continue;
      }
      const hex = r.toString(16).padStart(2, "0") +
                  g.toString(16).padStart(2, "0") +
                  b.toString(16).padStart(2, "0");

      const tileId = hexToTileId[hex];
      if (tileId) {
        const ft = floorTiles[tileId];
        if (ft.drawBackground) {
          const bg = floorTiles[1];
          ctx.drawImage(
            imageElements[bg.texture],
            bg.x * tileSize, bg.y * tileSize,
            tileSize, tileSize,
            x * tileSize, y * tileSize,
            tileSize, tileSize
          );
        }
        const img = imageElements[ft.texture];
        if (img) {
          ctx.drawImage(
            img,
            ft.x * tileSize, ft.y * tileSize,
            tileSize, tileSize,
            x * tileSize, y * tileSize,
            tileSize, tileSize
          );
        }
        tileMap[y][x] = tileId;
      }

      const wid = hexToWallId[hex];
      if (wid !== undefined) {
        wallMap[y][x] = wid;
      }
    }
  }

  function wallSolidsAt(c, r) {
    if (c < 0 || r < 0 || r >= h || c >= w) return 0;
    const id = wallMap[r][c]; if (!id) return 0;
    return wallTypes[id].wallSolids;
  }

function drawWallTile(col, row) {
  const id = wallMap[row][col];
  if (!id) return;

  // helper to say “non‐zero” in *either* map, or false if OOB
  function hasContent(r, c) {
    if (
      r < 0 || c < 0 ||
      r >= tileMap.length ||
      c >= tileMap[0].length
    ) return false;
    return tileMap[r][c] !== 0 || wallMap[r][c] !== 0;
  }

  const dx = col * tileSize;
  const dy = row * tileSize;
  const bg = floorTiles[1]; // your plain‐floor

  // draw 45°‐corner background when BOTH orthogonals have *any* tile/wall
  if (id === 1.1 && hasContent(row - 1, col) && hasContent(row, col - 1)) {
    ctx.drawImage(
      imageElements[bg.texture],
      bg.x * tileSize, bg.y * tileSize,
      tileSize, tileSize,
      dx, dy,
      tileSize, tileSize
    );
  }
  else if (
    id === 1.2 &&
    hasContent(row + 1, col) &&
    hasContent(row, col + 1)
  ) {
    ctx.drawImage(
      imageElements[bg.texture],
      bg.x * tileSize, bg.y * tileSize,
      tileSize, tileSize,
      dx, dy,
      tileSize, tileSize
    );
  }
  else if (
    id === 1.3 &&
    hasContent(row + 1, col) &&
    hasContent(row, col - 1)
  ) {
    ctx.drawImage(
      imageElements[bg.texture],
      bg.x * tileSize, bg.y * tileSize,
      tileSize, tileSize,
      dx, dy,
      tileSize, tileSize
    );
  }
  else if (
    id === 1.4 &&
    hasContent(row - 1, col) &&
    hasContent(row, col + 1)
  ) {
    ctx.drawImage(
      imageElements[bg.texture],
      bg.x * tileSize, bg.y * tileSize,
      tileSize, tileSize,
      dx, dy,
      tileSize, tileSize
    );
  }

  // — now draw your wall quadrants exactly as before —
  const solids = wallTypes[id].wallSolids;
  for (let q = 0; q < 4; q++) {
    const mask = (solids >> (q << 1)) & 3;
    if (!mask) continue;

    // build the 8-neighborhood mask...
    let cx = col + ((q & 2) ? 0 : 1);
    let cy = row + (((q + 1) & 2) ? 1 : 0);
    let around =
      (wallSolidsAt(cx,   cy  ) & 0xc0) |
      (wallSolidsAt(cx-1, cy  ) & 0x03) |
      (wallSolidsAt(cx-1, cy-1) & 0x0c) |
      (wallSolidsAt(cx,   cy-1) & 0x30);
    around |= (around << 8);

    const startDir = q * 2 + 1;
    let cw = 0, ccw = 0;
    while (cw < 8 && (around & (1 << (startDir + cw)))) cw++;
    while (ccw < 8 && (around & (1 << (startDir + 7 - ccw)))) ccw++;

    const hasChip =
      mask === 3 &&
      (((solids | (solids << 8)) >> ((q + 2) << 1)) & 3) === 0;

    let start, end;
    if (cw === 8) { start = end = 0; }
    else {
      end   = (startDir + cw + 4) % 8;
      start = (startDir - ccw + 12) % 8;
    }

    const key = `${q}${start}${end}${hasChip ? "d" : ""}`;
    const [rx, ry] = quadrantCoords[key] || [5.5, 5.5];

    let qdx = dx, qdy = dy;
    if (q === 0)           qdx += quadSize;
    else if (q === 1) { qdx += quadSize; qdy += quadSize; }
    else if (q === 2)      qdy += quadSize;

    ctx.drawImage(
      imageElements.tile,
      rx * tileSize, ry * tileSize,
      quadSize, quadSize,
      qdx, qdy,
      quadSize, quadSize
    );
  }
}


  for (let ry = 0; ry < h; ry++) {
    for (let cx = 0; cx < w; cx++) {
      if (wallMap[ry][cx]) drawWallTile(cx, ry);
    }
  }

  return { tileMap, wallMap };
}

const canvas = document.getElementById("mapCanvas");
const ctx    = canvas.getContext("2d");

drawMap("map.png", ctx, 40, 20).then(({ tileMap, wallMap }) => {
  console.log("tileMap ready", tileMap);
  console.log("wallMap ready (type IDs)", wallMap);
});
