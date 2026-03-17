// === Chapter 15: Solid Figures & Volume ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch15',
    number: 15,
    title: 'Solid Figures & Volume',
    subtitle: 'Prisms, cylinders, pyramids, cones, spheres, and Cavalieri\'s principle',
    sections: [
        // ============================================================
        // SECTION 1: Prisms & Cylinders
        // ============================================================
        {
            id: 'ch15-sec01',
            title: 'Prisms & Cylinders',
            content: `<h2>Prisms & Cylinders</h2>

<div class="env-block intuition">
<div class="env-title">The Big Picture</div>
<div class="env-body"><p>A <strong>prism</strong> is formed by translating a polygon along a direction perpendicular to itself. A <strong>cylinder</strong> is the analogous shape for a circle. Both have two congruent parallel bases connected by rectangular (or curved) lateral faces.</p></div>
</div>

<div class="env-block definition">
<div class="env-title">Definition (Prism)</div>
<div class="env-body"><p>A <strong>prism</strong> is a polyhedron with two congruent, parallel polygonal bases. The lateral faces are parallelograms (rectangles in a <strong>right prism</strong>). The <strong>height</strong> \\(h\\) is the perpendicular distance between the bases.</p></div>
</div>

<div class="env-block theorem">
<div class="env-title">Volume of a Prism</div>
<div class="env-body"><p>\\[V = B \\cdot h\\]
where \\(B\\) is the area of the base and \\(h\\) is the height.</p></div>
</div>

<div class="env-block definition">
<div class="env-title">Definition (Cylinder)</div>
<div class="env-body"><p>A <strong>cylinder</strong> has two congruent, parallel circular bases of radius \\(r\\). In a <strong>right cylinder</strong>, the axis connecting the centers of the bases is perpendicular to them.</p></div>
</div>

<div class="env-block theorem">
<div class="env-title">Volume of a Cylinder</div>
<div class="env-body"><p>\\[V = \\pi r^2 h\\]
This is just \\(B \\cdot h\\) with \\(B = \\pi r^2\\).</p></div>
</div>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body"><p>A rectangular prism has base dimensions \\(4 \\times 6\\) and height 10. Volume: \\(V = (4 \\times 6) \\times 10 = 240\\) cubic units.</p>
<p>A cylinder with radius 3 and height 7 has volume \\(V = \\pi(3)^2(7) = 63\\pi \\approx 197.9\\) cubic units.</p></div>
</div>

<div class="viz-placeholder" data-viz="viz-prism-volume"></div>`,

            visualizations: [
                {
                    id: 'viz-prism-volume',
                    title: '3D Wireframe: Prism & Cylinder',
                    description: 'Adjust dimensions to see volume change. An oblique projection gives a 3D feel.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 1, originX: 280, originY: 320, height: 400 });
                        var baseW = 3, baseD = 2, height = 4;
                        var showCylinder = false;
                        var cylR = 2, cylH = 4;

                        // Oblique projection helpers
                        var ax = 0.5, ay = 0.35; // oblique factors

                        function project(x, y, z) {
                            var sx = viz.originX + (x * 40) + (y * 40 * ax);
                            var sy = viz.originY - (z * 40) - (y * 40 * ay);
                            return [sx, sy];
                        }

                        VizEngine.createSlider(controls, 'Width', 1, 6, baseW, 0.5, function(v) { baseW = v; draw(); });
                        VizEngine.createSlider(controls, 'Depth', 1, 5, baseD, 0.5, function(v) { baseD = v; draw(); });
                        VizEngine.createSlider(controls, 'Height', 1, 7, height, 0.5, function(v) { height = v; cylH = v; draw(); });
                        VizEngine.createButton(controls, 'Toggle Prism/Cylinder', function() { showCylinder = !showCylinder; draw(); });

                        function drawEdge(p1, p2, color, lw, dashed) {
                            var ctx = viz.ctx;
                            ctx.strokeStyle = color;
                            ctx.lineWidth = lw || 1.5;
                            if (dashed) ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            ctx.moveTo(p1[0], p1[1]);
                            ctx.lineTo(p2[0], p2[1]);
                            ctx.stroke();
                            if (dashed) ctx.setLineDash([]);
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            if (!showCylinder) {
                                // Rectangular prism
                                var w = baseW, d = baseD, h = height;
                                // 8 corners
                                var c = [
                                    project(0, 0, 0), project(w, 0, 0), project(w, d, 0), project(0, d, 0),
                                    project(0, 0, h), project(w, 0, h), project(w, d, h), project(0, d, h)
                                ];

                                // Bottom face
                                drawEdge(c[0], c[1], viz.colors.blue, 2);
                                drawEdge(c[1], c[2], viz.colors.blue, 2);
                                drawEdge(c[2], c[3], viz.colors.blue + '66', 1.5, true);
                                drawEdge(c[3], c[0], viz.colors.blue, 2);

                                // Top face
                                drawEdge(c[4], c[5], viz.colors.teal, 2);
                                drawEdge(c[5], c[6], viz.colors.teal, 2);
                                drawEdge(c[6], c[7], viz.colors.teal, 2);
                                drawEdge(c[7], c[4], viz.colors.teal, 2);

                                // Verticals
                                drawEdge(c[0], c[4], viz.colors.orange, 1.5);
                                drawEdge(c[1], c[5], viz.colors.orange, 1.5);
                                drawEdge(c[2], c[6], viz.colors.orange + '66', 1, true);
                                drawEdge(c[3], c[7], viz.colors.orange, 1.5);

                                // Fill top face
                                ctx.fillStyle = viz.colors.teal + '22';
                                ctx.beginPath();
                                ctx.moveTo(c[4][0], c[4][1]); ctx.lineTo(c[5][0], c[5][1]);
                                ctx.lineTo(c[6][0], c[6][1]); ctx.lineTo(c[7][0], c[7][1]);
                                ctx.closePath(); ctx.fill();

                                // Height label
                                var hMid = project(-0.5, 0, h / 2);
                                ctx.fillStyle = viz.colors.orange; ctx.font = '13px -apple-system,sans-serif';
                                ctx.textAlign = 'right'; ctx.fillText('h = ' + h.toFixed(1), hMid[0], hMid[1]);

                                // Base label
                                var bMid = project(w / 2, d / 2, -0.5);
                                ctx.fillStyle = viz.colors.blue; ctx.textAlign = 'center';
                                ctx.fillText('B = ' + w.toFixed(1) + ' x ' + d.toFixed(1) + ' = ' + (w * d).toFixed(1), bMid[0], bMid[1]);

                                var vol = w * d * h;
                                viz.screenText('V = B x h = ' + (w * d).toFixed(1) + ' x ' + h.toFixed(1) + ' = ' + vol.toFixed(1), viz.width / 2, viz.height - 14, viz.colors.white, 13);
                            } else {
                                // Cylinder
                                var r = cylR, ch = cylH;
                                var n = 36;

                                // Draw bottom ellipse
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var i = 0; i <= n; i++) {
                                    var angle = (2 * Math.PI * i) / n;
                                    var px = r * Math.cos(angle);
                                    var py = r * Math.sin(angle);
                                    var sp = project(px, py, 0);
                                    if (i === 0) ctx.moveTo(sp[0], sp[1]);
                                    else ctx.lineTo(sp[0], sp[1]);
                                }
                                ctx.stroke();

                                // Draw top ellipse
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var j = 0; j <= n; j++) {
                                    var angle2 = (2 * Math.PI * j) / n;
                                    var px2 = r * Math.cos(angle2);
                                    var py2 = r * Math.sin(angle2);
                                    var sp2 = project(px2, py2, ch);
                                    if (j === 0) ctx.moveTo(sp2[0], sp2[1]);
                                    else ctx.lineTo(sp2[0], sp2[1]);
                                }
                                ctx.stroke();

                                // Fill top
                                ctx.fillStyle = viz.colors.teal + '22';
                                ctx.beginPath();
                                for (var k = 0; k <= n; k++) {
                                    var angle3 = (2 * Math.PI * k) / n;
                                    var sp3 = project(r * Math.cos(angle3), r * Math.sin(angle3), ch);
                                    if (k === 0) ctx.moveTo(sp3[0], sp3[1]);
                                    else ctx.lineTo(sp3[0], sp3[1]);
                                }
                                ctx.closePath(); ctx.fill();

                                // Vertical silhouette edges
                                var leftP = project(-r, 0, 0);
                                var leftT = project(-r, 0, ch);
                                var rightP = project(r, 0, 0);
                                var rightT = project(r, 0, ch);
                                drawEdge(leftP, leftT, viz.colors.orange, 1.5);
                                drawEdge(rightP, rightT, viz.colors.orange, 1.5);

                                // Labels
                                var hLabel = project(-r - 0.5, 0, ch / 2);
                                ctx.fillStyle = viz.colors.orange; ctx.font = '13px -apple-system,sans-serif';
                                ctx.textAlign = 'right'; ctx.fillText('h = ' + ch.toFixed(1), hLabel[0], hLabel[1]);

                                var rLabel = project(0, 0, -0.5);
                                ctx.fillStyle = viz.colors.blue; ctx.textAlign = 'center';
                                ctx.fillText('r = ' + r.toFixed(1), rLabel[0], rLabel[1]);

                                var vol2 = Math.PI * r * r * ch;
                                viz.screenText('V = pi r^2 h = pi(' + r.toFixed(1) + ')^2(' + ch.toFixed(1) + ') = ' + vol2.toFixed(1), viz.width / 2, viz.height - 14, viz.colors.white, 13);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the volume of a triangular prism whose base is a right triangle with legs 3 and 4, and whose height is 10.',
                    hint: 'The base area is \\(\\frac{1}{2}(3)(4)\\). Then \\(V = Bh\\).',
                    solution: '\\(B = \\frac{1}{2}(3)(4) = 6\\). \\(V = 6 \\times 10 = 60\\) cubic units.'
                },
                {
                    question: 'A cylinder has volume \\(200\\pi\\) and height 8. Find its radius.',
                    hint: 'Use \\(V = \\pi r^2 h\\) and solve for \\(r\\).',
                    solution: '\\(200\\pi = \\pi r^2 (8)\\), so \\(r^2 = 25\\) and \\(r = 5\\).'
                },
                {
                    question: 'A hexagonal prism has a regular hexagonal base with side length 4 and height 9. Find its volume.',
                    hint: 'Area of a regular hexagon with side \\(s\\) is \\(\\frac{3\\sqrt{3}}{2}s^2\\).',
                    solution: '\\(B = \\frac{3\\sqrt{3}}{2}(4)^2 = 24\\sqrt{3}\\). \\(V = 24\\sqrt{3} \\times 9 = 216\\sqrt{3} \\approx 374.1\\) cubic units.'
                },
                {
                    question: 'Water flows through a cylindrical pipe of diameter 10 cm at a speed of 2 m/s. How many liters per second flow through?',
                    hint: 'Volume per second = cross-sectional area times speed. Convert units: 10 cm diameter means radius 5 cm = 0.05 m.',
                    solution: 'Cross-section area = \\(\\pi(0.05)^2 = 0.0025\\pi\\) m\\(^2\\). Flow rate = \\(0.0025\\pi \\times 2 = 0.005\\pi\\) m\\(^3\\)/s = \\(5\\pi\\) liters/s \\(\\approx 15.7\\) L/s.'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Pyramids & Cones
        // ============================================================
        {
            id: 'ch15-sec02',
            title: 'Pyramids & Cones',
            content: `<h2>Pyramids & Cones</h2>

<div class="env-block definition">
<div class="env-title">Definition (Pyramid)</div>
<div class="env-body"><p>A <strong>pyramid</strong> is a solid with a polygonal base and triangular lateral faces that meet at a single point called the <strong>apex</strong>. The <strong>height</strong> is the perpendicular distance from the apex to the base.</p></div>
</div>

<div class="env-block theorem">
<div class="env-title">Volume of a Pyramid</div>
<div class="env-body"><p>\\[V = \\frac{1}{3} B h\\]
where \\(B\\) is the area of the base and \\(h\\) is the height. This is exactly one-third the volume of a prism with the same base and height.</p></div>
</div>

<div class="env-block definition">
<div class="env-title">Definition (Cone)</div>
<div class="env-body"><p>A <strong>cone</strong> has a circular base of radius \\(r\\) and an apex directly above (or below) the center of the base. The <strong>slant height</strong> \\(\\ell\\) satisfies \\(\\ell^2 = r^2 + h^2\\).</p></div>
</div>

<div class="env-block theorem">
<div class="env-title">Volume of a Cone</div>
<div class="env-body"><p>\\[V = \\frac{1}{3}\\pi r^2 h\\]</p></div>
</div>

<div class="env-block intuition">
<div class="env-title">Why the Factor of 1/3?</div>
<div class="env-body"><p>The \\(\\frac{1}{3}\\) factor can be proven by Cavalieri's principle or calculus. Informally, you can verify it experimentally: it takes exactly 3 cones of water to fill a cylinder of the same base and height.</p></div>
</div>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body"><p>A cone has radius 6 and height 10. Volume: \\(V = \\frac{1}{3}\\pi(6)^2(10) = 120\\pi \\approx 376.99\\) cubic units.</p></div>
</div>

<div class="viz-placeholder" data-viz="viz-pyramid-cone"></div>

<div class="viz-placeholder" data-viz="viz-volume-compare"></div>`,

            visualizations: [
                {
                    id: 'viz-pyramid-cone',
                    title: '3D Wireframe: Pyramid & Cone',
                    description: 'Toggle between a square pyramid and a cone. Adjust height and base size.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 1, originX: 280, originY: 340, height: 400 });
                        var baseSize = 3, height = 5;
                        var showCone = false;
                        var ax = 0.5, ay = 0.35;

                        function project(x, y, z) {
                            var sx = viz.originX + (x * 35) + (y * 35 * ax);
                            var sy = viz.originY - (z * 35) - (y * 35 * ay);
                            return [sx, sy];
                        }

                        VizEngine.createSlider(controls, 'Base size', 1, 6, baseSize, 0.5, function(v) { baseSize = v; draw(); });
                        VizEngine.createSlider(controls, 'Height', 1, 8, height, 0.5, function(v) { height = v; draw(); });
                        VizEngine.createButton(controls, 'Toggle Pyramid/Cone', function() { showCone = !showCone; draw(); });

                        function drawEdge(p1, p2, color, lw, dashed) {
                            var ctx = viz.ctx;
                            ctx.strokeStyle = color;
                            ctx.lineWidth = lw || 1.5;
                            if (dashed) ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            ctx.moveTo(p1[0], p1[1]);
                            ctx.lineTo(p2[0], p2[1]);
                            ctx.stroke();
                            if (dashed) ctx.setLineDash([]);
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var s = baseSize, h = height;
                            var apex = project(0, 0, h);

                            if (!showCone) {
                                // Square pyramid
                                var hs = s / 2;
                                var b = [
                                    project(-hs, -hs, 0), project(hs, -hs, 0),
                                    project(hs, hs, 0), project(-hs, hs, 0)
                                ];

                                // Base
                                drawEdge(b[0], b[1], viz.colors.blue, 2);
                                drawEdge(b[1], b[2], viz.colors.blue, 2);
                                drawEdge(b[2], b[3], viz.colors.blue + '66', 1.5, true);
                                drawEdge(b[3], b[0], viz.colors.blue, 2);

                                // Fill base lightly
                                ctx.fillStyle = viz.colors.blue + '11';
                                ctx.beginPath();
                                ctx.moveTo(b[0][0], b[0][1]); ctx.lineTo(b[1][0], b[1][1]);
                                ctx.lineTo(b[2][0], b[2][1]); ctx.lineTo(b[3][0], b[3][1]);
                                ctx.closePath(); ctx.fill();

                                // Lateral edges
                                drawEdge(b[0], apex, viz.colors.orange, 2);
                                drawEdge(b[1], apex, viz.colors.orange, 2);
                                drawEdge(b[2], apex, viz.colors.orange + '66', 1, true);
                                drawEdge(b[3], apex, viz.colors.orange, 2);

                                // Apex
                                ctx.fillStyle = viz.colors.red;
                                ctx.beginPath(); ctx.arc(apex[0], apex[1], 4, 0, Math.PI * 2); ctx.fill();

                                // Height dashed line
                                var baseCenter = project(0, 0, 0);
                                drawEdge(baseCenter, apex, viz.colors.yellow + 'aa', 1, true);

                                var vol = (1 / 3) * s * s * h;
                                viz.screenText('V = (1/3) x ' + s.toFixed(1) + '^2 x ' + h.toFixed(1) + ' = ' + vol.toFixed(1), viz.width / 2, viz.height - 14, viz.colors.white, 13);
                            } else {
                                // Cone
                                var r = s;
                                var n = 36;

                                // Bottom ellipse
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var i = 0; i <= n; i++) {
                                    var angle = (2 * Math.PI * i) / n;
                                    var sp = project(r * Math.cos(angle), r * Math.sin(angle), 0);
                                    if (i === 0) ctx.moveTo(sp[0], sp[1]);
                                    else ctx.lineTo(sp[0], sp[1]);
                                }
                                ctx.stroke();

                                // Fill base
                                ctx.fillStyle = viz.colors.blue + '11';
                                ctx.beginPath();
                                for (var j = 0; j <= n; j++) {
                                    var ang2 = (2 * Math.PI * j) / n;
                                    var sp2 = project(r * Math.cos(ang2), r * Math.sin(ang2), 0);
                                    if (j === 0) ctx.moveTo(sp2[0], sp2[1]);
                                    else ctx.lineTo(sp2[0], sp2[1]);
                                }
                                ctx.closePath(); ctx.fill();

                                // Silhouette lines to apex
                                var leftP = project(-r, 0, 0);
                                var rightP = project(r, 0, 0);
                                drawEdge(leftP, apex, viz.colors.orange, 2);
                                drawEdge(rightP, apex, viz.colors.orange, 2);

                                // Apex dot
                                ctx.fillStyle = viz.colors.red;
                                ctx.beginPath(); ctx.arc(apex[0], apex[1], 4, 0, Math.PI * 2); ctx.fill();

                                // Height line
                                var baseC = project(0, 0, 0);
                                drawEdge(baseC, apex, viz.colors.yellow + 'aa', 1, true);

                                // Slant height label
                                var slant = Math.sqrt(r * r + h * h);
                                var vol2 = (1 / 3) * Math.PI * r * r * h;
                                viz.screenText('V = (1/3) pi (' + r.toFixed(1) + ')^2 (' + h.toFixed(1) + ') = ' + vol2.toFixed(1) + ' | slant = ' + slant.toFixed(1), viz.width / 2, viz.height - 14, viz.colors.white, 12);
                            }
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-volume-compare',
                    title: 'Volume Comparison: Cylinder vs. Cone vs. Sphere',
                    description: 'For a given radius and height, see how the volumes of a cylinder, cone, and sphere compare.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0, height: 360 });
                        var r = 3, h = 6;

                        VizEngine.createSlider(controls, 'Radius r', 1, 5, r, 0.5, function(v) { r = v; draw(); });
                        VizEngine.createSlider(controls, 'Height h', 2, 10, h, 0.5, function(v) { h = v; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var w = viz.width;
                            var ht = viz.height;

                            var vCyl = Math.PI * r * r * h;
                            var vCone = (1 / 3) * Math.PI * r * r * h;
                            var vSphere = (4 / 3) * Math.PI * r * r * r;
                            var maxV = Math.max(vCyl, vCone, vSphere);

                            var barW = 80;
                            var maxBarH = 240;
                            var baseY = 310;
                            var labels = ['Cylinder', 'Cone', 'Sphere'];
                            var formulas = ['pi r^2 h', '(1/3) pi r^2 h', '(4/3) pi r^3'];
                            var volumes = [vCyl, vCone, vSphere];
                            var colors = [viz.colors.blue, viz.colors.orange, viz.colors.green];

                            for (var i = 0; i < 3; i++) {
                                var cx = w * (0.2 + i * 0.3);
                                var barH = (volumes[i] / maxV) * maxBarH;

                                // Bar
                                ctx.fillStyle = colors[i] + '66';
                                ctx.fillRect(cx - barW / 2, baseY - barH, barW, barH);
                                ctx.strokeStyle = colors[i];
                                ctx.lineWidth = 2;
                                ctx.strokeRect(cx - barW / 2, baseY - barH, barW, barH);

                                // Label
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(labels[i], cx, baseY + 18);
                                ctx.fillStyle = colors[i];
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillText(formulas[i], cx, baseY + 34);
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.fillText(volumes[i].toFixed(1), cx, baseY - barH - 8);
                            }

                            // Ratio info
                            viz.screenText('Cone = (1/3) Cylinder | Sphere/Cylinder = ' + (vSphere / vCyl).toFixed(3), w / 2, 16, viz.colors.teal, 12);
                            viz.screenText('r = ' + r.toFixed(1) + ', h = ' + h.toFixed(1), w / 2, ht - 14, viz.colors.text, 12);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A square pyramid has base side 8 and height 9. Find its volume.',
                    hint: '\\(V = \\frac{1}{3}Bh\\) with \\(B = 8^2 = 64\\).',
                    solution: '\\(V = \\frac{1}{3}(64)(9) = 192\\) cubic units.'
                },
                {
                    question: 'A cone has slant height 13 and radius 5. Find its volume.',
                    hint: 'First find \\(h\\) from \\(\\ell^2 = r^2 + h^2\\).',
                    solution: '\\(h = \\sqrt{13^2 - 5^2} = \\sqrt{144} = 12\\). \\(V = \\frac{1}{3}\\pi(5)^2(12) = 100\\pi \\approx 314.16\\) cubic units.'
                },
                {
                    question: 'A pyramid has volume 120 and base area 40. Find its height.',
                    hint: '\\(V = \\frac{1}{3}Bh\\). Solve for \\(h\\).',
                    solution: '\\(120 = \\frac{1}{3}(40)h\\), so \\(h = 9\\).'
                },
                {
                    question: 'A cone and a cylinder have the same base and height. What fraction of the cylinder\'s volume is the cone\'s volume?',
                    hint: 'Compare \\(\\frac{1}{3}\\pi r^2 h\\) with \\(\\pi r^2 h\\).',
                    solution: '\\(\\frac{V_{\\text{cone}}}{V_{\\text{cyl}}} = \\frac{\\frac{1}{3}\\pi r^2 h}{\\pi r^2 h} = \\frac{1}{3}\\). The cone is one-third the volume of the cylinder.'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Spheres
        // ============================================================
        {
            id: 'ch15-sec03',
            title: 'Spheres',
            content: `<h2>Spheres</h2>

<div class="env-block definition">
<div class="env-title">Definition (Sphere)</div>
<div class="env-body"><p>A <strong>sphere</strong> is the set of all points in 3D space at a fixed distance \\(r\\) (the <strong>radius</strong>) from a center point. It is the 3D analogue of a circle.</p></div>
</div>

<div class="env-block theorem">
<div class="env-title">Volume of a Sphere</div>
<div class="env-body"><p>\\[V = \\frac{4}{3}\\pi r^3\\]</p></div>
</div>

<div class="env-block intuition">
<div class="env-title">Archimedes' Discovery</div>
<div class="env-body"><p>Archimedes showed that the volume of a sphere equals \\(\\frac{2}{3}\\) of the volume of the circumscribed cylinder (the cylinder that just fits around the sphere). He considered this his greatest achievement.</p>
<p>The circumscribed cylinder has radius \\(r\\) and height \\(2r\\), so \\(V_{\\text{cyl}} = \\pi r^2(2r) = 2\\pi r^3\\). Then \\(\\frac{2}{3}(2\\pi r^3) = \\frac{4}{3}\\pi r^3\\).</p></div>
</div>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body"><p>A sphere with diameter 10 has radius 5 and volume \\(V = \\frac{4}{3}\\pi(5)^3 = \\frac{500\\pi}{3} \\approx 523.6\\) cubic units.</p></div>
</div>

<h3>Hemisphere</h3>
<p>The volume of a hemisphere (half a sphere) is \\(V = \\frac{2}{3}\\pi r^3\\).</p>

<div class="viz-placeholder" data-viz="viz-sphere-volume"></div>`,

            visualizations: [
                {
                    id: 'viz-sphere-volume',
                    title: 'Sphere Wireframe & Archimedes\' Cylinder',
                    description: 'Adjust the radius. See the sphere inside its circumscribed cylinder, verifying V_sphere = (2/3) V_cylinder.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 1, originX: 280, originY: 200, height: 400 });
                        var r = 3;
                        var showCylinder = true;

                        VizEngine.createSlider(controls, 'Radius r', 1, 5, r, 0.5, function(v) { r = v; draw(); });
                        VizEngine.createButton(controls, 'Toggle Cylinder', function() { showCylinder = !showCylinder; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var cx = viz.originX, cy = viz.originY;
                            var sc = 35;

                            // Draw circumscribed cylinder if toggled
                            if (showCylinder) {
                                var topY = cy - r * sc;
                                var botY = cy + r * sc;

                                // Vertical edges
                                ctx.strokeStyle = viz.colors.text + '44';
                                ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(cx - r * sc, topY); ctx.lineTo(cx - r * sc, botY); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(cx + r * sc, topY); ctx.lineTo(cx + r * sc, botY); ctx.stroke();

                                // Top ellipse
                                ctx.strokeStyle = viz.colors.text + '44';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.ellipse(cx, topY, r * sc, r * sc * 0.3, 0, 0, Math.PI * 2);
                                ctx.stroke();

                                // Bottom ellipse
                                ctx.beginPath();
                                ctx.ellipse(cx, botY, r * sc, r * sc * 0.3, 0, 0, Math.PI * 2);
                                ctx.stroke();
                            }

                            // Draw sphere as circle + latitude/longitude lines
                            // Main circle
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.arc(cx, cy, r * sc, 0, Math.PI * 2); ctx.stroke();

                            // Equatorial ellipse
                            ctx.strokeStyle = viz.colors.teal + '88';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.ellipse(cx, cy, r * sc, r * sc * 0.3, 0, 0, Math.PI * 2);
                            ctx.stroke();

                            // Vertical meridian
                            ctx.strokeStyle = viz.colors.orange + '88';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.ellipse(cx, cy, r * sc * 0.3, r * sc, 0, 0, Math.PI * 2);
                            ctx.stroke();

                            // Latitude lines
                            for (var lat = -2; lat <= 2; lat++) {
                                if (lat === 0) continue;
                                var ly = cy + lat * (r * sc) / 3;
                                var lr = Math.sqrt(r * r - (lat * r / 3) * (lat * r / 3)) * sc;
                                if (lr > 0) {
                                    ctx.strokeStyle = viz.colors.purple + '33';
                                    ctx.lineWidth = 0.5;
                                    ctx.beginPath();
                                    ctx.ellipse(cx, ly, lr, lr * 0.3, 0, 0, Math.PI * 2);
                                    ctx.stroke();
                                }
                            }

                            // Center dot
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill();

                            // Radius line
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + r * sc, cy); ctx.stroke();
                            ctx.fillStyle = viz.colors.orange; ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.fillText('r = ' + r.toFixed(1), cx + r * sc / 2, cy - 10);

                            // Volume info
                            var vSphere = (4 / 3) * Math.PI * r * r * r;
                            var vCyl = Math.PI * r * r * 2 * r;
                            viz.screenText('V_sphere = (4/3)pi(' + r.toFixed(1) + ')^3 = ' + vSphere.toFixed(1), viz.width / 2, viz.height - 34, viz.colors.blue, 12);
                            if (showCylinder) {
                                viz.screenText('V_cyl = pi(' + r.toFixed(1) + ')^2(' + (2 * r).toFixed(1) + ') = ' + vCyl.toFixed(1) + ' | Ratio = ' + (vSphere / vCyl).toFixed(3) + ' = 2/3', viz.width / 2, viz.height - 14, viz.colors.teal, 12);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the volume of a sphere with radius 6.',
                    hint: 'Use \\(V = \\frac{4}{3}\\pi r^3\\).',
                    solution: '\\(V = \\frac{4}{3}\\pi(6)^3 = \\frac{4}{3}\\pi(216) = 288\\pi \\approx 904.8\\) cubic units.'
                },
                {
                    question: 'A sphere has volume \\(36\\pi\\). Find its radius.',
                    hint: 'Set \\(\\frac{4}{3}\\pi r^3 = 36\\pi\\) and solve for \\(r\\).',
                    solution: '\\(r^3 = \\frac{36 \\times 3}{4} = 27\\), so \\(r = 3\\).'
                },
                {
                    question: 'A hemisphere has radius 4. Find its volume.',
                    hint: 'Volume of a hemisphere is half the volume of a full sphere.',
                    solution: '\\(V = \\frac{1}{2} \\cdot \\frac{4}{3}\\pi(4)^3 = \\frac{2}{3}\\pi(64) = \\frac{128\\pi}{3} \\approx 134.0\\) cubic units.'
                },
                {
                    question: 'If the radius of a sphere is doubled, by what factor does the volume increase?',
                    hint: 'Compare \\(V(2r)\\) with \\(V(r)\\).',
                    solution: '\\(V(2r) = \\frac{4}{3}\\pi(2r)^3 = \\frac{4}{3}\\pi \\cdot 8r^3 = 8V(r)\\). The volume increases by a factor of 8.'
                }
            ]
        },

        // ============================================================
        // SECTION 4: Cavalieri's Principle
        // ============================================================
        {
            id: 'ch15-sec04',
            title: 'Cavalieri\'s Principle',
            content: `<h2>Cavalieri's Principle</h2>

<div class="env-block theorem">
<div class="env-title">Cavalieri's Principle</div>
<div class="env-body"><p>If two solids are between the same pair of parallel planes, and every plane parallel to these planes intersects both solids in cross-sections of equal area, then the two solids have equal volume.</p></div>
</div>

<div class="env-block intuition">
<div class="env-title">The Stack-of-Coins Analogy</div>
<div class="env-body"><p>Think of two stacks of coins, each containing the same coins (same radii) in the same order. Even if one stack is tilted or shifted, both stacks have the same total volume because each "slice" has the same area.</p></div>
</div>

<h3>Applications</h3>
<p><strong>Oblique prisms:</strong> An oblique prism has the same volume as a right prism with the same base and height. This is because every cross-section parallel to the base is identical.</p>

<p><strong>Deriving the sphere volume:</strong> Cavalieri's principle can be used to show that the volume of a hemisphere equals the volume of a cylinder minus a cone. At height \\(z\\), the hemisphere has cross-section \\(\\pi(r^2 - z^2)\\), while the cylinder minus the cone has cross-section \\(\\pi r^2 - \\pi z^2 = \\pi(r^2 - z^2)\\). Since the cross-sections match, the volumes match.</p>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body"><p>A right cylinder with radius \\(r\\) and height \\(h\\) has the same volume as an oblique cylinder with the same radius and vertical height \\(h\\), regardless of how much the top circle is shifted sideways. This follows from Cavalieri's principle since every horizontal cross-section is the same circle of area \\(\\pi r^2\\).</p></div>
</div>

<div class="viz-placeholder" data-viz="viz-cavalieri"></div>`,

            visualizations: [
                {
                    id: 'viz-cavalieri',
                    title: 'Cavalieri\'s Principle: Cross-Section Slicer',
                    description: 'A right and oblique solid shown side by side. Slide the cutting plane to compare cross-sectional areas at every height.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0, height: 400 });
                        var sliceZ = 0.5;
                        var shear = 2;

                        VizEngine.createSlider(controls, 'Slice height', 0, 1, sliceZ, 0.02, function(v) { sliceZ = v; draw(); });
                        VizEngine.createSlider(controls, 'Shear', 0, 4, shear, 0.2, function(v) { shear = v; draw(); });

                        var sc = 35;
                        var h = 5; // height of solids
                        var r = 2; // radius

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var w = viz.width;
                            var leftCx = w * 0.25;
                            var rightCx = w * 0.7;
                            var baseY = 340;

                            // --- Right cylinder (left) ---
                            // Bottom ellipse
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.ellipse(leftCx, baseY, r * sc, r * sc * 0.3, 0, 0, Math.PI * 2);
                            ctx.stroke();

                            // Top ellipse
                            var topY = baseY - h * sc;
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.beginPath();
                            ctx.ellipse(leftCx, topY, r * sc, r * sc * 0.3, 0, 0, Math.PI * 2);
                            ctx.stroke();

                            // Side edges
                            ctx.strokeStyle = viz.colors.orange + 'aa';
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(leftCx - r * sc, baseY); ctx.lineTo(leftCx - r * sc, topY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(leftCx + r * sc, baseY); ctx.lineTo(leftCx + r * sc, topY); ctx.stroke();

                            // --- Oblique cylinder (right) ---
                            var shearPx = shear * sc;
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.ellipse(rightCx, baseY, r * sc, r * sc * 0.3, 0, 0, Math.PI * 2);
                            ctx.stroke();

                            var oblTopCx = rightCx + shearPx;
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.beginPath();
                            ctx.ellipse(oblTopCx, topY, r * sc, r * sc * 0.3, 0, 0, Math.PI * 2);
                            ctx.stroke();

                            // Side edges
                            ctx.strokeStyle = viz.colors.orange + 'aa';
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(rightCx - r * sc, baseY); ctx.lineTo(oblTopCx - r * sc, topY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(rightCx + r * sc, baseY); ctx.lineTo(oblTopCx + r * sc, topY); ctx.stroke();

                            // --- Slice plane ---
                            var sliceY = baseY - sliceZ * h * sc;

                            // Right cylinder slice
                            ctx.fillStyle = viz.colors.green + '44';
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.ellipse(leftCx, sliceY, r * sc, r * sc * 0.3, 0, 0, Math.PI * 2);
                            ctx.fill(); ctx.stroke();

                            // Oblique cylinder slice
                            var oblSliceCx = rightCx + shearPx * sliceZ;
                            ctx.beginPath();
                            ctx.ellipse(oblSliceCx, sliceY, r * sc, r * sc * 0.3, 0, 0, Math.PI * 2);
                            ctx.fill(); ctx.stroke();

                            // Cutting plane line
                            ctx.strokeStyle = viz.colors.yellow + '66';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath(); ctx.moveTo(0, sliceY); ctx.lineTo(w, sliceY); ctx.stroke();
                            ctx.setLineDash([]);

                            // Labels
                            var area = Math.PI * r * r;
                            viz.screenText('Right Cylinder', leftCx, 16, viz.colors.blue, 13);
                            viz.screenText('Oblique Cylinder', rightCx + shearPx / 2, 16, viz.colors.blue, 13);
                            viz.screenText('Cross-section area = pi r^2 = ' + area.toFixed(1) + ' (same at every height!)', w / 2, viz.height - 14, viz.colors.green, 12);
                            viz.screenText('Both volumes = pi r^2 h = ' + (area * h).toFixed(1), w / 2, viz.height - 34, viz.colors.white, 12);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'An oblique cylinder has a circular base of radius 5 and a vertical height of 12. Find its volume.',
                    hint: 'By Cavalieri\'s principle, it has the same volume as a right cylinder with the same base and height.',
                    solution: '\\(V = \\pi(5)^2(12) = 300\\pi \\approx 942.5\\) cubic units.'
                },
                {
                    question: 'Explain why Cavalieri\'s principle guarantees that the volume of an oblique prism is the same as a right prism with the same base and height.',
                    hint: 'What shape is each horizontal cross-section of a prism?',
                    solution: 'Every horizontal cross-section of both the oblique and right prism is the same polygon (congruent to the base). Since corresponding cross-sections have equal area at every height, Cavalieri\'s principle says the volumes are equal: \\(V = Bh\\).'
                },
                {
                    question: 'Two solids have cross-sections at height \\(z\\) with areas \\(A_1(z) = \\pi(9 - z^2)\\) and \\(A_2(z) = \\pi(9 - z^2)\\) for \\(0 \\leq z \\leq 3\\). What can you conclude?',
                    hint: 'The cross-sectional areas are equal at every height.',
                    solution: 'By Cavalieri\'s principle, the two solids have equal volume. The volume is \\(\\int_0^3 \\pi(9 - z^2)\\,dz = \\pi[9z - z^3/3]_0^3 = \\pi(27 - 9) = 18\\pi\\).'
                },
                {
                    question: 'A stack of 100 identical square cards, each 5 cm x 5 cm and 1 mm thick, is rearranged into a tilted stack. What is the volume of the tilted stack?',
                    hint: 'Each "cross-section" is still a 5 x 5 square.',
                    solution: 'Each card has area \\(25\\) cm\\(^2\\) and thickness \\(0.1\\) cm. Total volume = \\(25 \\times 0.1 \\times 100 = 250\\) cm\\(^3\\). By Cavalieri\'s principle, tilting does not change the volume.'
                }
            ]
        }
    ]
});
