// === Chapter 16: Surface Area ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch16',
    number: 16,
    title: 'Surface Area',
    subtitle: 'Nets and surface area formulas for prisms, cylinders, pyramids, cones, and spheres',
    sections: [
        // ============================================================
        // SECTION 1: Prism & Cylinder Surface Area
        // ============================================================
        {
            id: 'ch16-sec01',
            title: 'Prism & Cylinder Surface Area',
            content: `<h2>Prism & Cylinder Surface Area</h2>

<div class="env-block intuition">
<div class="env-title">The Big Picture</div>
<div class="env-body"><p>The <strong>surface area</strong> of a solid is the total area of all its outer faces. To compute it, imagine "unfolding" the solid into a flat pattern called a <strong>net</strong>. The surface area is the area of the net.</p></div>
</div>

<div class="env-block theorem">
<div class="env-title">Surface Area of a Right Prism</div>
<div class="env-body"><p>\\[SA = 2B + Ph\\]
where \\(B\\) is the area of the base, \\(P\\) is the perimeter of the base, and \\(h\\) is the height. The term \\(Ph\\) is the <strong>lateral surface area</strong>.</p></div>
</div>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body"><p>A rectangular prism is \\(4 \\times 3 \\times 5\\). Base area \\(B = 4 \\times 3 = 12\\). Perimeter \\(P = 2(4+3) = 14\\). Height \\(h = 5\\).
\\[SA = 2(12) + 14(5) = 24 + 70 = 94\\]</p></div>
</div>

<div class="env-block theorem">
<div class="env-title">Surface Area of a Right Cylinder</div>
<div class="env-body"><p>\\[SA = 2\\pi r^2 + 2\\pi r h\\]
The first term is the area of the two circular bases. The second term is the lateral area, which unfolds into a rectangle of width \\(2\\pi r\\) and height \\(h\\).</p></div>
</div>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body"><p>A cylinder has \\(r = 3\\) and \\(h = 7\\).
\\[SA = 2\\pi(3)^2 + 2\\pi(3)(7) = 18\\pi + 42\\pi = 60\\pi \\approx 188.5\\]</p></div>
</div>

<div class="viz-placeholder" data-viz="viz-prism-net"></div>

<div class="viz-placeholder" data-viz="viz-cylinder-net"></div>`,

            visualizations: [
                {
                    id: 'viz-prism-net',
                    title: 'Rectangular Prism Net (Unfoldable)',
                    description: 'Watch a rectangular prism unfold into its net. Adjust dimensions to see how surface area changes.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0, height: 400 });
                        var w = 3, d = 2, h = 4;
                        var unfold = 0;

                        VizEngine.createSlider(controls, 'Width', 1, 5, w, 0.5, function(v) { w = v; draw(); });
                        VizEngine.createSlider(controls, 'Depth', 1, 4, d, 0.5, function(v) { d = v; draw(); });
                        VizEngine.createSlider(controls, 'Height', 1, 6, h, 0.5, function(v) { h = v; draw(); });
                        VizEngine.createSlider(controls, 'Unfold', 0, 1, unfold, 0.02, function(v) { unfold = v; draw(); });

                        var sc = 30;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var cx = viz.width / 2;
                            var cy = viz.height / 2;

                            var colors = [viz.colors.blue, viz.colors.teal, viz.colors.orange, viz.colors.green, viz.colors.purple, viz.colors.pink];

                            if (unfold < 0.5) {
                                // 3D view with partial unfolding
                                var t = unfold * 2; // 0 to 1 for 3D -> flat
                                var ax = 0.45, ay = 0.3;

                                function proj(x, y, z) {
                                    var sx = cx + (x * sc) + (y * sc * ax) - 80;
                                    var sy = cy + 40 - (z * sc) - (y * sc * ay);
                                    return [sx, sy];
                                }

                                // Bottom face
                                var bf = [proj(0,0,0), proj(w,0,0), proj(w,d,0), proj(0,d,0)];
                                ctx.fillStyle = colors[0] + '44';
                                ctx.beginPath();
                                ctx.moveTo(bf[0][0], bf[0][1]); ctx.lineTo(bf[1][0], bf[1][1]);
                                ctx.lineTo(bf[2][0], bf[2][1]); ctx.lineTo(bf[3][0], bf[3][1]);
                                ctx.closePath(); ctx.fill();
                                ctx.strokeStyle = colors[0]; ctx.lineWidth = 1.5; ctx.stroke();

                                // Top face
                                var tf = [proj(0,0,h), proj(w,0,h), proj(w,d,h), proj(0,d,h)];
                                ctx.fillStyle = colors[1] + '44';
                                ctx.beginPath();
                                ctx.moveTo(tf[0][0], tf[0][1]); ctx.lineTo(tf[1][0], tf[1][1]);
                                ctx.lineTo(tf[2][0], tf[2][1]); ctx.lineTo(tf[3][0], tf[3][1]);
                                ctx.closePath(); ctx.fill();
                                ctx.strokeStyle = colors[1]; ctx.lineWidth = 1.5; ctx.stroke();

                                // Front face
                                ctx.fillStyle = colors[2] + '44';
                                ctx.beginPath();
                                ctx.moveTo(bf[0][0], bf[0][1]); ctx.lineTo(bf[1][0], bf[1][1]);
                                ctx.lineTo(tf[1][0], tf[1][1]); ctx.lineTo(tf[0][0], tf[0][1]);
                                ctx.closePath(); ctx.fill();
                                ctx.strokeStyle = colors[2]; ctx.lineWidth = 1.5; ctx.stroke();

                                // Right face
                                ctx.fillStyle = colors[3] + '44';
                                ctx.beginPath();
                                ctx.moveTo(bf[1][0], bf[1][1]); ctx.lineTo(bf[2][0], bf[2][1]);
                                ctx.lineTo(tf[2][0], tf[2][1]); ctx.lineTo(tf[1][0], tf[1][1]);
                                ctx.closePath(); ctx.fill();
                                ctx.strokeStyle = colors[3]; ctx.lineWidth = 1.5; ctx.stroke();

                                // Vertical edges
                                ctx.strokeStyle = viz.colors.white + '66'; ctx.lineWidth = 1;
                                for (var i = 0; i < 4; i++) {
                                    ctx.beginPath(); ctx.moveTo(bf[i][0], bf[i][1]); ctx.lineTo(tf[i][0], tf[i][1]); ctx.stroke();
                                }
                            } else {
                                // Flat net view
                                var baseX = cx - (w * sc) / 2;
                                var baseY = cy - (h * sc) / 2;

                                // Layout: center row is the 4 lateral faces in a strip
                                // Top and bottom faces extend from the front face

                                // Front face (center-left)
                                ctx.fillStyle = colors[2] + '44';
                                ctx.fillRect(baseX, baseY, w * sc, h * sc);
                                ctx.strokeStyle = colors[2]; ctx.lineWidth = 1.5;
                                ctx.strokeRect(baseX, baseY, w * sc, h * sc);
                                ctx.fillStyle = colors[2]; ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.fillText('Front ' + w.toFixed(0) + 'x' + h.toFixed(0), baseX + w * sc / 2, baseY + h * sc / 2 + 4);

                                // Right face
                                var rx = baseX + w * sc;
                                ctx.fillStyle = colors[3] + '44';
                                ctx.fillRect(rx, baseY, d * sc, h * sc);
                                ctx.strokeStyle = colors[3]; ctx.lineWidth = 1.5;
                                ctx.strokeRect(rx, baseY, d * sc, h * sc);
                                ctx.fillStyle = colors[3]; ctx.fillText('Right ' + d.toFixed(0) + 'x' + h.toFixed(0), rx + d * sc / 2, baseY + h * sc / 2 + 4);

                                // Back face
                                var bkx = rx + d * sc;
                                ctx.fillStyle = colors[4] + '44';
                                ctx.fillRect(bkx, baseY, w * sc, h * sc);
                                ctx.strokeStyle = colors[4]; ctx.lineWidth = 1.5;
                                ctx.strokeRect(bkx, baseY, w * sc, h * sc);
                                ctx.fillStyle = colors[4]; ctx.fillText('Back ' + w.toFixed(0) + 'x' + h.toFixed(0), bkx + w * sc / 2, baseY + h * sc / 2 + 4);

                                // Left face
                                var lx = baseX - d * sc;
                                ctx.fillStyle = colors[5] + '44';
                                ctx.fillRect(lx, baseY, d * sc, h * sc);
                                ctx.strokeStyle = colors[5]; ctx.lineWidth = 1.5;
                                ctx.strokeRect(lx, baseY, d * sc, h * sc);
                                ctx.fillStyle = colors[5]; ctx.fillText('Left ' + d.toFixed(0) + 'x' + h.toFixed(0), lx + d * sc / 2, baseY + h * sc / 2 + 4);

                                // Bottom base (below front)
                                var bby = baseY + h * sc;
                                ctx.fillStyle = colors[0] + '44';
                                ctx.fillRect(baseX, bby, w * sc, d * sc);
                                ctx.strokeStyle = colors[0]; ctx.lineWidth = 1.5;
                                ctx.strokeRect(baseX, bby, w * sc, d * sc);
                                ctx.fillStyle = colors[0]; ctx.fillText('Base ' + w.toFixed(0) + 'x' + d.toFixed(0), baseX + w * sc / 2, bby + d * sc / 2 + 4);

                                // Top base (above front)
                                var tby = baseY - d * sc;
                                ctx.fillStyle = colors[1] + '44';
                                ctx.fillRect(baseX, tby, w * sc, d * sc);
                                ctx.strokeStyle = colors[1]; ctx.lineWidth = 1.5;
                                ctx.strokeRect(baseX, tby, w * sc, d * sc);
                                ctx.fillStyle = colors[1]; ctx.fillText('Top ' + w.toFixed(0) + 'x' + d.toFixed(0), baseX + w * sc / 2, tby + d * sc / 2 + 4);
                            }

                            // Surface area
                            var sa = 2 * (w * d + w * h + d * h);
                            viz.screenText('SA = 2(' + w.toFixed(0) + 'x' + d.toFixed(0) + ' + ' + w.toFixed(0) + 'x' + h.toFixed(0) + ' + ' + d.toFixed(0) + 'x' + h.toFixed(0) + ') = ' + sa.toFixed(0), viz.width / 2, viz.height - 14, viz.colors.white, 13);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-cylinder-net',
                    title: 'Cylinder Net (Unfoldable)',
                    description: 'A cylinder unfolds into two circles and a rectangle. Adjust r and h to see the dimensions of the net.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0, height: 380 });
                        var r = 2.5, h = 5;
                        var unfold = 0;

                        VizEngine.createSlider(controls, 'Radius r', 1, 4, r, 0.5, function(v) { r = v; draw(); });
                        VizEngine.createSlider(controls, 'Height h', 2, 8, h, 0.5, function(v) { h = v; draw(); });
                        VizEngine.createSlider(controls, 'Unfold', 0, 1, unfold, 0.02, function(v) { unfold = v; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var cx = viz.width / 2;
                            var sc = 22;

                            if (unfold < 0.5) {
                                // 3D cylinder
                                var baseY = 280;
                                var topY = baseY - h * sc;

                                // Bottom ellipse
                                ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.ellipse(cx, baseY, r * sc, r * sc * 0.3, 0, 0, Math.PI * 2);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.blue + '22'; ctx.fill();

                                // Top ellipse
                                ctx.strokeStyle = viz.colors.teal; ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.ellipse(cx, topY, r * sc, r * sc * 0.3, 0, 0, Math.PI * 2);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.teal + '22'; ctx.fill();

                                // Side edges
                                ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 1.5;
                                ctx.beginPath(); ctx.moveTo(cx - r * sc, baseY); ctx.lineTo(cx - r * sc, topY); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(cx + r * sc, baseY); ctx.lineTo(cx + r * sc, topY); ctx.stroke();

                                ctx.fillStyle = viz.colors.orange; ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'right'; ctx.fillText('h = ' + h.toFixed(1), cx - r * sc - 6, (baseY + topY) / 2);
                                ctx.textAlign = 'center'; ctx.fillStyle = viz.colors.blue;
                                ctx.fillText('r = ' + r.toFixed(1), cx, baseY + 22);
                            } else {
                                // Flat net
                                var rectW = 2 * Math.PI * r * sc * 0.4;
                                var rectH = h * sc * 0.6;
                                var circR = r * sc * 0.35;
                                var rectCx = cx;
                                var rectCy = viz.height / 2 - 10;

                                // Rectangle (lateral surface)
                                ctx.fillStyle = viz.colors.orange + '44';
                                ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 2;
                                ctx.fillRect(rectCx - rectW / 2, rectCy - rectH / 2, rectW, rectH);
                                ctx.strokeRect(rectCx - rectW / 2, rectCy - rectH / 2, rectW, rectH);

                                ctx.fillStyle = viz.colors.orange; ctx.font = '11px -apple-system,sans-serif'; ctx.textAlign = 'center';
                                ctx.fillText('Lateral: 2 pi r x h', rectCx, rectCy + 4);
                                ctx.fillText((2 * Math.PI * r).toFixed(1) + ' x ' + h.toFixed(1), rectCx, rectCy + 18);

                                // Width label
                                ctx.fillStyle = viz.colors.yellow; ctx.font = '10px -apple-system,sans-serif';
                                ctx.fillText('2 pi r = ' + (2 * Math.PI * r).toFixed(1), rectCx, rectCy - rectH / 2 - 8);
                                ctx.textAlign = 'right';
                                ctx.fillText('h = ' + h.toFixed(1), rectCx - rectW / 2 - 4, rectCy);

                                // Top circle
                                var topCy = rectCy - rectH / 2 - circR - 22;
                                ctx.fillStyle = viz.colors.teal + '44';
                                ctx.strokeStyle = viz.colors.teal; ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.arc(rectCx, topCy, circR, 0, Math.PI * 2);
                                ctx.fill(); ctx.stroke();
                                ctx.fillStyle = viz.colors.teal; ctx.textAlign = 'center';
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.fillText('pi r^2', rectCx, topCy + 4);

                                // Bottom circle
                                var botCy = rectCy + rectH / 2 + circR + 22;
                                ctx.fillStyle = viz.colors.blue + '44';
                                ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.arc(rectCx, botCy, circR, 0, Math.PI * 2);
                                ctx.fill(); ctx.stroke();
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillText('pi r^2', rectCx, botCy + 4);
                            }

                            var sa = 2 * Math.PI * r * r + 2 * Math.PI * r * h;
                            viz.screenText('SA = 2 pi r^2 + 2 pi rh = ' + (2 * Math.PI * r * r).toFixed(1) + ' + ' + (2 * Math.PI * r * h).toFixed(1) + ' = ' + sa.toFixed(1), viz.width / 2, viz.height - 14, viz.colors.white, 12);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the surface area of a rectangular prism with dimensions \\(5 \\times 3 \\times 8\\).',
                    hint: 'Use \\(SA = 2(lw + lh + wh)\\).',
                    solution: '\\(SA = 2(5 \\times 3 + 5 \\times 8 + 3 \\times 8) = 2(15 + 40 + 24) = 2(79) = 158\\) square units.'
                },
                {
                    question: 'Find the total surface area of a cylinder with radius 4 and height 10.',
                    hint: 'Use \\(SA = 2\\pi r^2 + 2\\pi rh\\).',
                    solution: '\\(SA = 2\\pi(16) + 2\\pi(4)(10) = 32\\pi + 80\\pi = 112\\pi \\approx 351.9\\) square units.'
                },
                {
                    question: 'A cube has surface area 150. Find the length of each edge.',
                    hint: 'A cube has \\(SA = 6s^2\\).',
                    solution: '\\(6s^2 = 150\\), so \\(s^2 = 25\\) and \\(s = 5\\).'
                },
                {
                    question: 'Find the lateral surface area of a triangular prism with an equilateral triangular base of side 6 and height 10.',
                    hint: 'Lateral area = perimeter of base times height.',
                    solution: 'Perimeter = \\(3 \\times 6 = 18\\). Lateral area = \\(18 \\times 10 = 180\\) square units.'
                },
                {
                    question: 'A cylindrical can has no lid. If \\(r = 3\\) and \\(h = 8\\), find the total surface area (one base + lateral).',
                    hint: 'Only one base, so \\(SA = \\pi r^2 + 2\\pi rh\\).',
                    solution: '\\(SA = \\pi(9) + 2\\pi(3)(8) = 9\\pi + 48\\pi = 57\\pi \\approx 179.1\\) square units.'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Pyramid & Cone Surface Area
        // ============================================================
        {
            id: 'ch16-sec02',
            title: 'Pyramid & Cone Surface Area',
            content: `<h2>Pyramid & Cone Surface Area</h2>

<div class="env-block theorem">
<div class="env-title">Surface Area of a Regular Pyramid</div>
<div class="env-body"><p>\\[SA = B + \\frac{1}{2}P\\ell\\]
where \\(B\\) is the base area, \\(P\\) is the perimeter of the base, and \\(\\ell\\) is the <strong>slant height</strong> (the distance from the apex to the midpoint of a base edge).</p></div>
</div>

<div class="env-block definition">
<div class="env-title">Definition (Slant Height)</div>
<div class="env-body"><p>For a regular pyramid, the <strong>slant height</strong> \\(\\ell\\) is the height of each triangular lateral face. It is related to the pyramid height \\(h\\) and the apothem \\(a\\) of the base by \\(\\ell^2 = h^2 + a^2\\), where \\(a\\) is the distance from the center of the base to the midpoint of a base edge.</p></div>
</div>

<div class="env-block theorem">
<div class="env-title">Surface Area of a Right Cone</div>
<div class="env-body"><p>\\[SA = \\pi r^2 + \\pi r \\ell\\]
where \\(\\ell = \\sqrt{r^2 + h^2}\\) is the slant height. The lateral surface unrolls into a sector of a circle with radius \\(\\ell\\) and arc length \\(2\\pi r\\).</p></div>
</div>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body"><p>A cone with \\(r = 5\\) and \\(h = 12\\) has slant height \\(\\ell = \\sqrt{25 + 144} = 13\\).
\\[SA = \\pi(5)^2 + \\pi(5)(13) = 25\\pi + 65\\pi = 90\\pi \\approx 282.7\\]</p></div>
</div>

<div class="viz-placeholder" data-viz="viz-cone-net"></div>`,

            visualizations: [
                {
                    id: 'viz-cone-net',
                    title: 'Cone Net (Unfoldable)',
                    description: 'Watch a cone unfold into its net: a circle (base) and a sector (lateral surface). Adjust r and h.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0, height: 400 });
                        var r = 3, h = 5;
                        var unfold = 0;

                        VizEngine.createSlider(controls, 'Radius r', 1, 5, r, 0.5, function(v) { r = v; draw(); });
                        VizEngine.createSlider(controls, 'Height h', 2, 8, h, 0.5, function(v) { h = v; draw(); });
                        VizEngine.createSlider(controls, 'Unfold', 0, 1, unfold, 0.02, function(v) { unfold = v; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var cx = viz.width / 2;
                            var cy = viz.height / 2;
                            var sc = 25;
                            var sl = Math.sqrt(r * r + h * h);

                            if (unfold < 0.5) {
                                // 3D cone view
                                var apexY = cy - h * sc * 0.7;
                                var baseY = cy + 40;

                                // Base ellipse
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.ellipse(cx, baseY, r * sc, r * sc * 0.3, 0, 0, Math.PI * 2);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.blue + '22';
                                ctx.fill();

                                // Apex
                                ctx.fillStyle = viz.colors.red;
                                ctx.beginPath(); ctx.arc(cx, apexY, 4, 0, Math.PI * 2); ctx.fill();

                                // Silhouette
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(cx - r * sc, baseY); ctx.lineTo(cx, apexY); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(cx + r * sc, baseY); ctx.lineTo(cx, apexY); ctx.stroke();

                                // Height dashed line
                                ctx.strokeStyle = viz.colors.yellow + 'aa';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([4, 4]);
                                ctx.beginPath(); ctx.moveTo(cx, baseY); ctx.lineTo(cx, apexY); ctx.stroke();
                                ctx.setLineDash([]);

                                // Labels
                                ctx.fillStyle = viz.colors.yellow; ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.fillText('h = ' + h.toFixed(1), cx - 8, (apexY + baseY) / 2);
                                ctx.textAlign = 'center';
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillText('r = ' + r.toFixed(1), cx, baseY + 22);
                            } else {
                                // Flat net view
                                var sectorR = sl * sc * 0.6;
                                var sectorAngle = (2 * Math.PI * r) / sl; // arc length = 2*pi*r, radius = sl
                                var circleR = r * sc * 0.6;

                                // Sector (lateral surface)
                                var sectorCx = cx;
                                var sectorCy = cy - 20;
                                ctx.fillStyle = viz.colors.orange + '44';
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(sectorCx, sectorCy);
                                ctx.arc(sectorCx, sectorCy, sectorR, -Math.PI / 2 - sectorAngle / 2, -Math.PI / 2 + sectorAngle / 2);
                                ctx.closePath();
                                ctx.fill(); ctx.stroke();

                                // Label sector
                                ctx.fillStyle = viz.colors.orange; ctx.font = '11px -apple-system,sans-serif'; ctx.textAlign = 'center';
                                ctx.fillText('Lateral: pi r l = ' + (Math.PI * r * sl).toFixed(1), sectorCx, sectorCy + sectorR + 20);
                                ctx.fillText('slant = ' + sl.toFixed(1), sectorCx, sectorCy + 14);

                                // Base circle (below sector)
                                var circleCy = sectorCy + sectorR + 55;
                                ctx.fillStyle = viz.colors.blue + '44';
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.arc(sectorCx, circleCy, circleR, 0, Math.PI * 2);
                                ctx.fill(); ctx.stroke();

                                ctx.fillStyle = viz.colors.blue; ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillText('Base: pi r^2 = ' + (Math.PI * r * r).toFixed(1), sectorCx, circleCy + circleR + 16);
                            }

                            var sa = Math.PI * r * r + Math.PI * r * sl;
                            viz.screenText('SA = pi r^2 + pi r l = ' + (Math.PI * r * r).toFixed(1) + ' + ' + (Math.PI * r * sl).toFixed(1) + ' = ' + sa.toFixed(1), viz.width / 2, viz.height - 14, viz.colors.white, 12);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A cone has radius 4 and height 3. Find its total surface area.',
                    hint: 'First find \\(\\ell = \\sqrt{r^2 + h^2}\\). Then \\(SA = \\pi r^2 + \\pi r \\ell\\).',
                    solution: '\\(\\ell = \\sqrt{16 + 9} = 5\\). \\(SA = \\pi(16) + \\pi(4)(5) = 16\\pi + 20\\pi = 36\\pi \\approx 113.1\\) square units.'
                },
                {
                    question: 'A regular square pyramid has base edge 10 and slant height 13. Find the total surface area.',
                    hint: '\\(SA = B + \\frac{1}{2}P\\ell\\).',
                    solution: '\\(B = 100\\), \\(P = 40\\). \\(SA = 100 + \\frac{1}{2}(40)(13) = 100 + 260 = 360\\) square units.'
                },
                {
                    question: 'A cone has lateral surface area \\(65\\pi\\) and radius 5. Find the slant height and height.',
                    hint: 'Lateral area = \\(\\pi r \\ell\\). Solve for \\(\\ell\\), then use \\(h = \\sqrt{\\ell^2 - r^2}\\).',
                    solution: '\\(\\pi(5)\\ell = 65\\pi\\), so \\(\\ell = 13\\). \\(h = \\sqrt{169 - 25} = \\sqrt{144} = 12\\).'
                },
                {
                    question: 'Find the surface area of a regular tetrahedron (all edges length \\(a\\)).',
                    hint: 'A regular tetrahedron has 4 equilateral triangular faces.',
                    solution: 'Each face has area \\(\\frac{\\sqrt{3}}{4}a^2\\). Total: \\(SA = 4 \\times \\frac{\\sqrt{3}}{4}a^2 = \\sqrt{3}\\,a^2\\).'
                },
                {
                    question: 'A cone-shaped party hat has slant height 25 cm and base diameter 14 cm. How much cardboard is needed (lateral area only)?',
                    hint: 'Lateral area = \\(\\pi r \\ell\\) with \\(r = 7\\).',
                    solution: '\\(\\text{Lateral area} = \\pi(7)(25) = 175\\pi \\approx 549.8\\) cm\\(^2\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Sphere Surface Area & Nets
        // ============================================================
        {
            id: 'ch16-sec03',
            title: 'Sphere Surface Area & Nets',
            content: `<h2>Sphere Surface Area & Nets</h2>

<div class="env-block theorem">
<div class="env-title">Surface Area of a Sphere</div>
<div class="env-body"><p>\\[SA = 4\\pi r^2\\]
This is exactly 4 times the area of a great circle (a circle with the same radius as the sphere).</p></div>
</div>

<div class="env-block intuition">
<div class="env-title">Archimedes' Proof</div>
<div class="env-body"><p>Archimedes showed that the surface area of a sphere equals the lateral surface area of its circumscribed cylinder. The cylinder has radius \\(r\\) and height \\(2r\\), so its lateral area is \\(2\\pi r \\times 2r = 4\\pi r^2\\). This elegant result is one of the gems of ancient mathematics.</p></div>
</div>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body"><p>A sphere with diameter 10 (radius 5) has surface area \\(SA = 4\\pi(5)^2 = 100\\pi \\approx 314.2\\) square units.</p></div>
</div>

<h3>Why Spheres Have No Flat Net</h3>
<p>Unlike prisms, pyramids, and cones, a sphere cannot be unfolded into a flat pattern without distortion. This is the fundamental problem of <strong>map projection</strong>: you cannot perfectly represent the Earth's surface on a flat map. Every map projection introduces some distortion (of area, shape, distance, or direction).</p>

<div class="env-block definition">
<div class="env-title">Hemisphere</div>
<div class="env-body"><p>A hemisphere (half a sphere) has total surface area:
\\[SA_{\\text{hemisphere}} = 2\\pi r^2 + \\pi r^2 = 3\\pi r^2\\]
The first term is the curved surface; the second is the flat circular base.</p></div>
</div>

<div class="viz-placeholder" data-viz="viz-sphere-sa"></div>`,

            visualizations: [
                {
                    id: 'viz-sphere-sa',
                    title: 'Sphere Surface Area = 4 Great Circles',
                    description: 'See how the sphere\'s surface area compares to 4 great circles. Adjust the radius.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0, height: 400 });
                        var r = 3;
                        var showCircles = true;

                        VizEngine.createSlider(controls, 'Radius r', 1, 5, r, 0.5, function(v) { r = v; draw(); });
                        VizEngine.createButton(controls, 'Toggle 4 Circles', function() { showCircles = !showCircles; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var w = viz.width;
                            var sc = 35;

                            // Left: sphere
                            var sphereCx = w * 0.3;
                            var sphereCy = viz.height / 2 - 20;

                            // Sphere outline
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.arc(sphereCx, sphereCy, r * sc, 0, Math.PI * 2); ctx.stroke();
                            ctx.fillStyle = viz.colors.blue + '22';
                            ctx.beginPath(); ctx.arc(sphereCx, sphereCy, r * sc, 0, Math.PI * 2); ctx.fill();

                            // Latitude/longitude lines
                            ctx.strokeStyle = viz.colors.teal + '44';
                            ctx.lineWidth = 0.5;
                            ctx.beginPath(); ctx.ellipse(sphereCx, sphereCy, r * sc, r * sc * 0.3, 0, 0, Math.PI * 2); ctx.stroke();
                            ctx.beginPath(); ctx.ellipse(sphereCx, sphereCy, r * sc * 0.3, r * sc, 0, 0, Math.PI * 2); ctx.stroke();

                            ctx.fillStyle = viz.colors.white; ctx.font = '13px -apple-system,sans-serif'; ctx.textAlign = 'center';
                            ctx.fillText('SA = 4 pi r^2 = ' + (4 * Math.PI * r * r).toFixed(1), sphereCx, sphereCy + r * sc + 28);

                            // Right: 4 great circles
                            if (showCircles) {
                                var circCx = w * 0.72;
                                var circCy = sphereCy;
                                var gap = r * sc * 0.15;
                                var cR = r * sc * 0.45;
                                var positions = [
                                    [circCx - cR - gap, circCy - cR - gap],
                                    [circCx + cR + gap, circCy - cR - gap],
                                    [circCx - cR - gap, circCy + cR + gap],
                                    [circCx + cR + gap, circCy + cR + gap]
                                ];
                                var circColors = [viz.colors.orange, viz.colors.green, viz.colors.purple, viz.colors.pink];

                                for (var i = 0; i < 4; i++) {
                                    ctx.fillStyle = circColors[i] + '44';
                                    ctx.strokeStyle = circColors[i];
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath();
                                    ctx.arc(positions[i][0], positions[i][1], cR, 0, Math.PI * 2);
                                    ctx.fill(); ctx.stroke();
                                }

                                ctx.fillStyle = viz.colors.white; ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillText('4 x (pi r^2) = ' + (4 * Math.PI * r * r).toFixed(1), circCx, circCy + cR * 2 + gap + 28);
                                ctx.fillText('= SA of sphere', circCx, circCy + cR * 2 + gap + 44);

                                // Equals sign
                                ctx.font = 'bold 28px -apple-system,sans-serif';
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.fillText('=', (sphereCx + circCx) / 2 - 30, sphereCy);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the surface area of a sphere with radius 7.',
                    hint: 'Use \\(SA = 4\\pi r^2\\).',
                    solution: '\\(SA = 4\\pi(7)^2 = 196\\pi \\approx 615.8\\) square units.'
                },
                {
                    question: 'A sphere has surface area \\(144\\pi\\). Find its radius and volume.',
                    hint: '\\(4\\pi r^2 = 144\\pi\\). Solve for \\(r\\), then use \\(V = \\frac{4}{3}\\pi r^3\\).',
                    solution: '\\(r^2 = 36\\), so \\(r = 6\\). Volume: \\(V = \\frac{4}{3}\\pi(216) = 288\\pi \\approx 904.8\\).'
                },
                {
                    question: 'Find the total surface area of a hemisphere with radius 5.',
                    hint: 'Curved surface: \\(2\\pi r^2\\). Flat base: \\(\\pi r^2\\). Total: \\(3\\pi r^2\\).',
                    solution: '\\(SA = 3\\pi(25) = 75\\pi \\approx 235.6\\) square units.'
                },
                {
                    question: 'If the radius of a sphere is tripled, by what factor does the surface area increase?',
                    hint: 'Compare \\(4\\pi(3r)^2\\) with \\(4\\pi r^2\\).',
                    solution: '\\(4\\pi(3r)^2 = 4\\pi \\cdot 9r^2 = 9 \\cdot 4\\pi r^2\\). The surface area increases by a factor of 9.'
                }
            ]
        }
    ]
});
