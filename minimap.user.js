// ==UserScript==
// @name         TagPro Minimap
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Draws a full-scale minimap with a centered player marker.
// @author       Minimap
// @match        *://*.koalabeast.com/game*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Adjustable tile size for the minimap (in pixels).
    let tileSize = 10; // minimap tile size in pixels

    // Game uses 40 pixels per tile.
    const gameTileSize = 40;

    // Player sprite size in game pixels (28x28 ball)
    let playerSpriteSize = 28;
    let playerOffset = playerSpriteSize / 2 + 4; // 14 pixels offset for centering

    // Wait until tagpro.map is defined.
    function waitForTagproMap(callback) {
        if (window.tagpro && tagpro.map) {
            callback();
        } else {
            setTimeout(function() {
                waitForTagproMap(callback);
            }, 100);
        }
    }

    // Helper: get the spritesheet for a given tileKey.
    function getSpriteForTile(tileKey) {
        let def = tagpro.tiles[tileKey] || {};
        let sprite;
        if (def.source && tagpro.tiles.images[def.source]) {
            sprite = tagpro.tiles.images[def.source];  //non tiles.png
        } else {
            sprite = tagpro.tiles.image;  //tiles.png
        }
        // Set crossOrigin to avoid canvas tainting.
        if (!sprite.crossOrigin) {
            sprite.crossOrigin = 'anonymous';
        }
        return sprite;
    }

    /**
     * Draw a portion of a sprite sheet onto the canvas.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas drawing context.
     * @param {string|number} tileKey - The key to use for tagpro.tiles.
     * @param {number} dx - The x coordinate on the canvas to draw to.
     * @param {number} dy - The y coordinate on the canvas to draw to.
     * @param {number} dispSize - The destination display size (in pixels).
     * @param {number} originalSize - The size of the tile portion in the sprite sheet.
     */
    function drawTile(ctx, tileKey, dx, dy, dispSize, originalSize) {
        let sprite = getSpriteForTile(tileKey);
        let def = tagpro.tiles[tileKey] || {};
        let sx = (def.x !== undefined ? def.x * 40 : 0);
        let sy = (def.y !== undefined ? def.y * 40 : 0);
        ctx.drawImage(sprite, sx, sy, originalSize, originalSize, dx, dy, dispSize, dispSize);
    }

    function createMinimap() {
        let mapWidth = tagpro.map.length;
        let mapHeight = tagpro.map[0].length;

        // Create the minimap canvas.
        let canvas = document.createElement('canvas');
        canvas.width = mapWidth * tileSize;
        canvas.height = mapHeight * tileSize;
        canvas.style.position = 'fixed';
        canvas.style.bottom = '10px';
        canvas.style.right = '10px';
        canvas.style.border = '1px solid #000';
        canvas.style.boxSizing = 'border-box';
        canvas.style.zIndex = '1000';
        document.body.appendChild(canvas);
        let ctx = canvas.getContext('2d');

        // Define quad size for wall tiles.
        let quadSize = tileSize / 2;

        // --- Draw Floor Tiles from tagpro.map ---
        for (let col = 0; col < mapWidth; col++) {
            let column = tagpro.map[col];
            for (let row = 0; row < mapHeight; row++) {
                let tileValue = column[row];
                let dx = col * tileSize;
                let dy = row * tileSize;

                if (tileValue === 0) {
                    continue; // transparent
                } else if (tileValue === 1.1) {
                    let above = (row - 1 >= 0) ? tagpro.map[col][row - 1] : 0;
                    let right = (col + 1 < mapWidth) ? tagpro.map[col + 1][row] : 0;
                    if (above !== 0 && right !== 0) {
                        drawTile(ctx, "2", dx, dy, tileSize, 40);
                    }
                    continue;
                    // --- 45s background logic ---
                } else if (tileValue === 1.2) {
                    let below = (row + 1 < mapHeight) ? tagpro.map[col][row + 1] : 0;
                    let right = (col + 1 < mapWidth) ? tagpro.map[col + 1][row] : 0;
                    if (below !== 0 && right !== 0) {
                        drawTile(ctx, "2", dx, dy, tileSize, 40);
                   }
                    continue;
                } else if (tileValue === 1.3) {
                    let below = (row + 1 < mapHeight) ? tagpro.map[col][row + 1] : 0;
                    let left = (col - 1 >= 0) ? tagpro.map[col - 1][row] : 0;
                    if (below !== 0 && left !== 0) {
                        drawTile(ctx, "2", dx, dy, tileSize, 40);
                    }
                    continue;
                } else if (tileValue === 1.4) {
                    let above = (row - 1 >= 0) ? tagpro.map[col][row - 1] : 0;
                    let left = (col - 1 >= 0) ? tagpro.map[col - 1][row] : 0;
                    if (above !== 0 && left !== 0) {
                        drawTile(ctx, "2", dx, dy, tileSize, 40);
                    }
                    continue;
                }

                // For other tile values.
                let tileKey;
                //portals
                if (tileValue === 13 || tileValue === 24 || tileValue === 25) {
                    tileKey = tileValue + ".101";
                  //exit portal
                } else if (tileValue === 13.1 || tileValue === "13.1") {
                    tileKey = "13.102";
                //boosts
                } else if (tileValue === 5 || tileValue === 14 || tileValue === 15) {
                    tileKey = tileValue + ".101";
                } else {
                    tileKey = tileValue;
                }
                let tileDef = tagpro.tiles[tileKey] || {};
                if (tileDef.drawFloor === true) {
                    drawTile(ctx, "2", dx, dy, tileSize, 40);
                }
                drawTile(ctx, tileKey, dx, dy, tileSize, 40);
            }
        }

        // --- Draw Wall Tiles from tagpro.wallMap ---
        let quadMapping = [
            {offsetX: 0, offsetY: 0},
            {offsetX: quadSize, offsetY: 0},
            {offsetX: quadSize, offsetY: quadSize},
            {offsetX: 0, offsetY: quadSize}
        ];

        for (let col = 0; col < tagpro.wallMap.length; col++) {
            let column = tagpro.wallMap[col];
            for (let row = 0; row < column.length; row++) {
                let quadrants = column[row];
                let baseX = col * tileSize;
                let baseY = row * tileSize;
                if (!Array.isArray(quadrants)) continue;
                for (let i = 0; i < 4; i++) {
                    let quadKey = quadrants[i];
                    if (!quadKey) continue;
                    let mapping = quadMapping[i];
                    let dx = baseX + mapping.offsetX;
                    let dy = baseY + mapping.offsetY;
                    drawTile(ctx, quadKey, dx, dy, quadSize, 20);
                }
            }
        }

        // --- Create an overlay for the player marker ---
        let overlayCanvas = document.createElement('canvas');
        overlayCanvas.width = canvas.width;
        overlayCanvas.height = canvas.height;
        overlayCanvas.style.position = 'fixed';
        overlayCanvas.style.bottom = '10px';
        overlayCanvas.style.right = '10px';
        overlayCanvas.style.zIndex = '1001';
        overlayCanvas.style.pointerEvents = 'none';
        document.body.appendChild(overlayCanvas);
        let overlayCtx = overlayCanvas.getContext('2d');

        // Update the overlay continuously.
        function updateOverlay() {
            overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
            let player = tagpro.players[tagpro.playerId];
            if (player) {
                let curX = player.x + playerOffset;
                let curY = player.y + playerOffset;
                let centerX = (curX / gameTileSize) * tileSize;
                let centerY = (curY / gameTileSize) * tileSize;
                overlayCtx.beginPath();
                overlayCtx.arc(centerX, centerY, tileSize / 4, 0, 2 * Math.PI);
                overlayCtx.fillStyle = 'red';
                overlayCtx.fill();
                overlayCtx.lineWidth = 2;
                overlayCtx.strokeStyle = 'white';
                overlayCtx.stroke();
            }
            requestAnimationFrame(updateOverlay);
        }
        updateOverlay();
    }

    waitForTagproMap(function() {
        if (tagpro.ready) {
            tagpro.ready(createMinimap);
        } else {
            createMinimap();
        }
    });
})();
