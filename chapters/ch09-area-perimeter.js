window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch09',
    number: 9,
    title: 'Area & Perimeter',
    subtitle: 'Computing areas of triangles, parallelograms, circles, composite figures, and using Heron\'s formula',
    sections: [
        // ============================================================
        // SECTION 1: Triangles & Parallelograms
        // ============================================================
        {
            id: 'ch09-sec01',
            title: 'Triangles & Parallelograms',
            content: `<h2>Triangles & Parallelograms</h2>

                <div class="env-block intuition">
                    <div class="env-title">The Big Picture</div>
                    <div class="env-body"><p>Area measures the amount of two-dimensional space enclosed by a figure. The most fundamental area formula is for a rectangle (\\(A = \\ell w\\)). Every other polygon area formula can be derived from this one through cutting and rearranging.</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Area Formulas</div>
                    <div class="env-body">
                    <ul>
                        <li><strong>Rectangle:</strong> \\(A = \\ell w\\)</li>
                        <li><strong>Parallelogram:</strong> \\(A = bh\\) (base times height)</li>
                        <li><strong>Triangle:</strong> \\(A = \\frac{1}{2}bh\\)</li>
                    </ul>
                    <p>The height is always the <em>perpendicular</em> distance from the base to the opposite side (or vertex).</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-tri-para-area"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>A triangle has base 10 and height 7. Its area is \\(\\frac{1}{2}(10)(7) = 35\\).</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>A parallelogram has base 8 and a slant side of 5, with an included angle of \\(60^\\circ\\). Find the area.</p>
                    <p>Height \\(= 5 \\sin 60^\\circ = 5 \\cdot \\frac{\\sqrt{3}}{2} \\approx 4.33\\). Area \\(= 8 \\times 4.33 \\approx 34.64\\).</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-tri-para-area',
                    title: 'Triangle & Parallelogram Area',
                    description: 'Drag the top vertex to change the shape. Toggle between triangle and parallelogram to see how their areas relate.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40, originX: 120, originY: 280, height: 380 });
                        var topPt = viz.addDraggable('top', 3, 4, viz.colors.orange, 10);
                        var base = 6;
                        var showPara = false;

                        VizEngine.createSlider(controls, 'Base', 2, 10, 6, 0.5, function(val) { base = val; });
                        VizEngine.createButton(controls, 'Toggle Parallelogram', function() { showPara = !showPara; });

                        function draw() {
                            if (topPt.y < 0.3) topPt.y = 0.3;
                            viz.clear();
                            viz.drawGrid();
                            var ctx = viz.ctx;

                            var b = base;
                            var tx = topPt.x, ty = topPt.y;

                            if (showPara) {
                                // Parallelogram: (0,0), (b,0), (b+tx, ty), (tx, ty)
                                viz.drawPolygon([[0, 0], [b, 0], [b + tx, ty], [tx, ty]], viz.colors.blue + '22', viz.colors.blue, 2);

                                // Height line
                                viz.drawSegment(tx, 0, tx, ty, viz.colors.yellow, 2, true);

                                // Area
                                var area = b * ty;
                                viz.screenText('Parallelogram: A = b \u00D7 h = ' + b.toFixed(1) + ' \u00D7 ' + ty.toFixed(1) + ' = ' + area.toFixed(1), viz.width / 2, viz.height - 20, viz.colors.white, 14);

                                // Labels
                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.fillStyle = viz.colors.green;
                                ctx.textAlign = 'center';
                                var bLabel = viz.toScreen(b / 2, -0.4);
                                ctx.fillText('b = ' + b.toFixed(1), bLabel[0], bLabel[1]);

                                ctx.fillStyle = viz.colors.yellow;
                                ctx.textAlign = 'right';
                                var hLabel = viz.toScreen(tx - 0.3, ty / 2);
                                ctx.fillText('h = ' + ty.toFixed(1), hLabel[0], hLabel[1]);

                                viz.drawPoint(0, 0, viz.colors.white, '', 4);
                                viz.drawPoint(b, 0, viz.colors.white, '', 4);
                                viz.drawPoint(b + tx, ty, viz.colors.white, '', 4);
                                viz.drawPoint(tx, ty, viz.colors.white, '', 4);
                            } else {
                                // Triangle: (0,0), (b,0), (tx, ty)
                                viz.drawPolygon([[0, 0], [b, 0], [tx, ty]], viz.colors.teal + '22', viz.colors.teal, 2);

                                // Height line
                                viz.drawSegment(tx, 0, tx, ty, viz.colors.yellow, 2, true);

                                // Right angle marker
                                var m = 0.25;
                                var p1 = viz.toScreen(tx + m, 0);
                                var p2 = viz.toScreen(tx + m, m);
                                var p3 = viz.toScreen(tx, m);
                                ctx.strokeStyle = viz.colors.white;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(p1[0], p1[1]);
                                ctx.lineTo(p2[0], p2[1]);
                                ctx.lineTo(p3[0], p3[1]);
                                ctx.stroke();

                                // Area
                                var area = 0.5 * b * ty;
                                viz.screenText('Triangle: A = \u00BDbh = \u00BD \u00D7 ' + b.toFixed(1) + ' \u00D7 ' + ty.toFixed(1) + ' = ' + area.toFixed(1), viz.width / 2, viz.height - 20, viz.colors.white, 14);

                                // Labels
                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.fillStyle = viz.colors.green;
                                ctx.textAlign = 'center';
                                var bLabel = viz.toScreen(b / 2, -0.4);
                                ctx.fillText('b = ' + b.toFixed(1), bLabel[0], bLabel[1]);

                                ctx.fillStyle = viz.colors.yellow;
                                ctx.textAlign = 'right';
                                var hLabel = viz.toScreen(tx - 0.3, ty / 2);
                                ctx.fillText('h = ' + ty.toFixed(1), hLabel[0], hLabel[1]);

                                viz.drawPoint(0, 0, viz.colors.white, 'A', 4);
                                viz.drawPoint(b, 0, viz.colors.white, 'B', 4);
                                viz.drawPoint(tx, ty, viz.colors.orange, 'C', 4);
                            }

                            viz.drawDraggables();
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                },
                {
                    id: 'viz-perimeter-walk',
                    title: 'Perimeter Walk',
                    description: 'Watch a point trace the perimeter of a polygon. The total distance traveled equals the perimeter.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 35, originX: 100, originY: 280, height: 340 });
                        var running = false;
                        var progress = 0;
                        var shapeType = 'triangle';

                        VizEngine.createButton(controls, 'Start/Stop', function() { running = !running; });
                        VizEngine.createButton(controls, 'Triangle', function() { shapeType = 'triangle'; progress = 0; });
                        VizEngine.createButton(controls, 'Rectangle', function() { shapeType = 'rectangle'; progress = 0; });
                        VizEngine.createButton(controls, 'Pentagon', function() { shapeType = 'pentagon'; progress = 0; });

                        function getVerts() {
                            if (shapeType === 'triangle') return [[0, 0], [7, 0], [3, 5]];
                            if (shapeType === 'rectangle') return [[0, 0], [8, 0], [8, 4], [0, 4]];
                            var pts = [];
                            for (var i = 0; i < 5; i++) {
                                var angle = (2 * Math.PI * i / 5) - Math.PI / 2;
                                pts.push([4 + 3 * Math.cos(angle), 3 + 3 * Math.sin(angle)]);
                            }
                            return pts;
                        }

                        function draw() {
                            if (running) {
                                progress += 0.005;
                                if (progress > 1) progress = 0;
                            }
                            viz.clear();
                            viz.drawGrid();
                            var ctx = viz.ctx;

                            var verts = getVerts();
                            var n = verts.length;

                            // Compute side lengths and total perimeter
                            var sideLens = [];
                            var totalPerim = 0;
                            for (var i = 0; i < n; i++) {
                                var next = (i + 1) % n;
                                var dx = verts[next][0] - verts[i][0];
                                var dy = verts[next][1] - verts[i][1];
                                var len = Math.sqrt(dx * dx + dy * dy);
                                sideLens.push(len);
                                totalPerim += len;
                            }

                            // Draw polygon
                            viz.drawPolygon(verts, viz.colors.blue + '22', viz.colors.blue, 2);

                            // Highlight traced portion
                            var distSoFar = progress * totalPerim;
                            var accumulated = 0;
                            var tracePt = [verts[0][0], verts[0][1]];
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 4;
                            ctx.beginPath();
                            var sp = viz.toScreen(verts[0][0], verts[0][1]);
                            ctx.moveTo(sp[0], sp[1]);

                            for (var j = 0; j < n; j++) {
                                var next2 = (j + 1) % n;
                                if (accumulated + sideLens[j] >= distSoFar) {
                                    var frac = (distSoFar - accumulated) / sideLens[j];
                                    tracePt = [
                                        verts[j][0] + frac * (verts[next2][0] - verts[j][0]),
                                        verts[j][1] + frac * (verts[next2][1] - verts[j][1])
                                    ];
                                    var ep = viz.toScreen(tracePt[0], tracePt[1]);
                                    ctx.lineTo(ep[0], ep[1]);
                                    break;
                                } else {
                                    var np = viz.toScreen(verts[next2][0], verts[next2][1]);
                                    ctx.lineTo(np[0], np[1]);
                                    accumulated += sideLens[j];
                                }
                            }
                            ctx.stroke();

                            // Moving point
                            viz.drawPoint(tracePt[0], tracePt[1], viz.colors.orange, '', 8);

                            // Side labels
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            ctx.textAlign = 'center';
                            for (var k = 0; k < n; k++) {
                                var nk = (k + 1) % n;
                                var mx = (verts[k][0] + verts[nk][0]) / 2;
                                var my = (verts[k][1] + verts[nk][1]) / 2;
                                var ms = viz.toScreen(mx, my);
                                ctx.fillText(sideLens[k].toFixed(2), ms[0], ms[1] - 10);
                            }

                            // Info
                            viz.screenText('Perimeter = ' + totalPerim.toFixed(2), viz.width / 2, viz.height - 30, viz.colors.white, 15);
                            viz.screenText('Distance walked: ' + (progress * totalPerim).toFixed(2) + ' / ' + totalPerim.toFixed(2), viz.width / 2, viz.height - 10, viz.colors.green, 13);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'A triangle has base 14 cm and height 9 cm. Find the area.',
                    hint: 'Area of a triangle is \\(\\frac{1}{2}bh\\).',
                    solution: '\\(A = \\frac{1}{2}(14)(9) = 63\\) cm\\(^2\\).'
                },
                {
                    question: 'A parallelogram has base 12 m and height 8 m. Find the area and perimeter if the slant side is 10 m.',
                    hint: 'Area = base times height. Perimeter = 2(base + slant side).',
                    solution: 'Area \\(= 12 \\times 8 = 96\\) m\\(^2\\). Perimeter \\(= 2(12 + 10) = 44\\) m.'
                },
                {
                    question: 'A triangle has vertices at \\((0, 0)\\), \\((6, 0)\\), and \\((2, 5)\\). Find the area.',
                    hint: 'Use the base along the x-axis (length 6) and height (the y-coordinate of the third vertex).',
                    solution: '\\(A = \\frac{1}{2}(6)(5) = 15\\).'
                },
                {
                    question: 'The area of a triangle is 48 cm\\(^2\\) and its base is 16 cm. Find the height.',
                    hint: 'Rearrange: \\(h = 2A/b\\).',
                    solution: '\\(h = 2(48)/16 = 6\\) cm.'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Circles & Sectors
        // ============================================================
        {
            id: 'ch09-sec02',
            title: 'Circles & Sectors',
            content: `<h2>Circles & Sectors</h2>

                <div class="env-block theorem">
                    <div class="env-title">Circle Formulas</div>
                    <div class="env-body">
                    <ul>
                        <li><strong>Circumference:</strong> \\(C = 2\\pi r = \\pi d\\)</li>
                        <li><strong>Area:</strong> \\(A = \\pi r^2\\)</li>
                    </ul></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Sector and Segment</div>
                    <div class="env-body">
                    <p>For central angle \\(\\theta\\) (in degrees):</p>
                    <ul>
                        <li><strong>Sector area:</strong> \\(A_{\\text{sector}} = \\frac{\\theta}{360^\\circ} \\pi r^2\\)</li>
                        <li><strong>Segment area:</strong> \\(A_{\\text{segment}} = A_{\\text{sector}} - A_{\\text{triangle}}\\)</li>
                    </ul>
                    <p>The triangle has two sides equal to \\(r\\) with included angle \\(\\theta\\), so its area is \\(\\frac{1}{2}r^2 \\sin\\theta\\).</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-circle-area"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>A circle has radius 7. Find the area of the segment cut off by a central angle of \\(90^\\circ\\).</p>
                    <p>Sector area \\(= \\frac{90}{360}\\pi(49) = \\frac{49\\pi}{4} \\approx 38.48\\).</p>
                    <p>Triangle area \\(= \\frac{1}{2}(49)\\sin 90^\\circ = 24.5\\).</p>
                    <p>Segment area \\(\\approx 38.48 - 24.5 = 13.98\\).</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-circle-area',
                    title: 'Circle, Sector, and Segment',
                    description: 'Adjust the radius and angle to see the sector and segment areas change.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40, originX: 220, originY: 200, height: 380 });
                        var r = 3.5;
                        var angleDeg = 120;

                        VizEngine.createSlider(controls, 'Radius r', 1, 5, 3.5, 0.1, function(val) { r = val; draw(); });
                        VizEngine.createSlider(controls, 'Angle (\u00B0)', 10, 350, 120, 5, function(val) { angleDeg = val; draw(); });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            var ctx = viz.ctx;
                            var angleRad = angleDeg * Math.PI / 180;

                            var center = viz.toScreen(0, 0);

                            // Full circle outline
                            viz.drawCircle(0, 0, r, null, viz.colors.axis + '55', 1);

                            // Sector fill
                            ctx.fillStyle = viz.colors.blue + '33';
                            ctx.beginPath();
                            ctx.moveTo(center[0], center[1]);
                            ctx.arc(center[0], center[1], r * viz.scale, 0, -angleRad, true);
                            ctx.closePath();
                            ctx.fill();
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.stroke();

                            // Triangle inside sector
                            var endX = r * Math.cos(angleRad);
                            var endY = r * Math.sin(angleRad);
                            viz.drawPolygon([[0, 0], [r, 0], [endX, endY]], null, viz.colors.green, 1.5);

                            // Segment (shade area between arc and chord)
                            ctx.fillStyle = viz.colors.red + '22';
                            ctx.beginPath();
                            var startScreen = viz.toScreen(r, 0);
                            var endScreen = viz.toScreen(endX, endY);
                            ctx.moveTo(startScreen[0], startScreen[1]);
                            ctx.arc(center[0], center[1], r * viz.scale, 0, -angleRad, true);
                            ctx.lineTo(startScreen[0], startScreen[1]);
                            ctx.fill();

                            // Chord
                            viz.drawSegment(r, 0, endX, endY, viz.colors.red, 2);

                            // Radii
                            viz.drawSegment(0, 0, r, 0, viz.colors.white, 1.5);
                            viz.drawSegment(0, 0, endX, endY, viz.colors.white, 1.5);

                            // Angle arc
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(center[0], center[1], 25, 0, -angleRad, true);
                            ctx.stroke();

                            // Points
                            viz.drawPoint(0, 0, viz.colors.white, 'O', 5);
                            viz.drawPoint(r, 0, viz.colors.blue, '', 4);
                            viz.drawPoint(endX, endY, viz.colors.blue, '', 4);

                            // Calculations
                            var circleArea = Math.PI * r * r;
                            var circumference = 2 * Math.PI * r;
                            var sectorArea = (angleDeg / 360) * circleArea;
                            var triangleArea = 0.5 * r * r * Math.sin(angleRad);
                            var segmentArea = sectorArea - triangleArea;

                            var yBase = viz.height - 100;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('Circle: A = \u03C0r\u00B2 = ' + circleArea.toFixed(2) + ',  C = 2\u03C0r = ' + circumference.toFixed(2), viz.width / 2, yBase);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('Sector area = ' + sectorArea.toFixed(2), viz.width / 2, yBase + 22);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('Triangle area = ' + triangleArea.toFixed(2), viz.width / 2, yBase + 42);
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillText('Segment area = ' + segmentArea.toFixed(2), viz.width / 2, yBase + 62);
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.fillText('\u03B8 = ' + angleDeg + '\u00B0,  r = ' + r.toFixed(1), viz.width / 2, yBase + 82);
                        }

                        draw();
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'A circle has diameter 20. Find the circumference and area.',
                    hint: 'Radius = diameter / 2.',
                    solution: '\\(r = 10\\). \\(C = 2\\pi(10) = 20\\pi \\approx 62.83\\). \\(A = \\pi(100) = 100\\pi \\approx 314.16\\).'
                },
                {
                    question: 'Find the area of a semicircle with radius 8.',
                    hint: 'A semicircle is half a circle.',
                    solution: '\\(A = \\frac{1}{2}\\pi(64) = 32\\pi \\approx 100.53\\).'
                },
                {
                    question: 'A sector has radius 10 and central angle \\(72^\\circ\\). Find the sector area.',
                    hint: 'Use \\(A = \\frac{\\theta}{360^\\circ}\\pi r^2\\).',
                    solution: '\\(A = \\frac{72}{360}\\pi(100) = \\frac{1}{5}(100\\pi) = 20\\pi \\approx 62.83\\).'
                },
                {
                    question: 'Find the area of the circular segment with radius 6 and central angle \\(60^\\circ\\).',
                    hint: 'Segment = sector area minus triangle area.',
                    solution: 'Sector \\(= \\frac{60}{360}\\pi(36) = 6\\pi \\approx 18.85\\). Triangle \\(= \\frac{1}{2}(36)\\sin 60^\\circ = 9\\sqrt{3} \\approx 15.59\\). Segment \\(\\approx 3.26\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Composite Figures
        // ============================================================
        {
            id: 'ch09-sec03',
            title: 'Composite Figures',
            content: `<h2>Composite Figures</h2>

                <div class="env-block intuition">
                    <div class="env-title">Strategy</div>
                    <div class="env-body"><p>A <strong>composite figure</strong> is made up of simpler shapes. To find the area, decompose it into rectangles, triangles, circles (or parts thereof), then add or subtract as needed.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-composite-area"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>Find the area of a shape that is a 10-by-6 rectangle with a semicircle of diameter 6 attached to one short side.</p>
                    <p>Rectangle area \\(= 60\\). Semicircle area \\(= \\frac{1}{2}\\pi(3)^2 = 4.5\\pi \\approx 14.14\\). Total \\(\\approx 74.14\\).</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>A square of side 10 has a circle of radius 5 inscribed inside it. Find the shaded area (corners).</p>
                    <p>Square area \\(= 100\\). Circle area \\(= 25\\pi \\approx 78.54\\). Shaded \\(\\approx 21.46\\).</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-composite-area',
                    title: 'Composite Figure Decomposition',
                    description: 'See a composite shape decomposed into simpler pieces. Toggle pieces to see how areas add up.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 30, originX: 140, originY: 310, height: 380 });
                        var mode = 0; // 0: rect+semi, 1: square-circle, 2: L-shape

                        VizEngine.createButton(controls, 'Rect + Semicircle', function() { mode = 0; draw(); });
                        VizEngine.createButton(controls, 'Square - Circle', function() { mode = 1; draw(); });
                        VizEngine.createButton(controls, 'L-Shape', function() { mode = 2; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            if (mode === 0) {
                                // Rectangle + semicircle
                                var w = 10, h = 6;
                                viz.drawPolygon([[0, 0], [w, 0], [w, h], [0, h]], viz.colors.blue + '33', viz.colors.blue, 2);

                                // Semicircle on right
                                var centerScreen = viz.toScreen(w, h / 2);
                                ctx.fillStyle = viz.colors.teal + '33';
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.arc(centerScreen[0], centerScreen[1], (h / 2) * viz.scale, -Math.PI / 2, Math.PI / 2, true);
                                ctx.closePath();
                                ctx.fill();
                                ctx.stroke();

                                // Labels
                                var rectA = w * h;
                                var semiA = 0.5 * Math.PI * (h / 2) * (h / 2);
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.fillStyle = viz.colors.blue;
                                ctx.textAlign = 'center';
                                var rc = viz.toScreen(w / 2, h / 2);
                                ctx.fillText('Rect: ' + rectA.toFixed(0), rc[0], rc[1]);

                                ctx.fillStyle = viz.colors.teal;
                                var sc = viz.toScreen(w + 1.2, h / 2);
                                ctx.fillText('Semi: ' + semiA.toFixed(1), sc[0], sc[1]);

                                viz.screenText('Total = ' + rectA + ' + ' + semiA.toFixed(2) + ' = ' + (rectA + semiA).toFixed(2), viz.width / 2, viz.height - 20, viz.colors.white, 15);

                                // Dimensions
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.fillStyle = viz.colors.green;
                                var wLabel = viz.toScreen(w / 2, -0.5);
                                ctx.fillText(w.toString(), wLabel[0], wLabel[1]);
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.textAlign = 'right';
                                var hLabel = viz.toScreen(-0.5, h / 2);
                                ctx.fillText(h.toString(), hLabel[0], hLabel[1]);

                            } else if (mode === 1) {
                                // Square with inscribed circle
                                var s = 10;
                                viz.drawPolygon([[0, 0], [s, 0], [s, s], [0, s]], viz.colors.purple + '33', viz.colors.purple, 2);
                                viz.drawCircle(s / 2, s / 2, s / 2, viz.colors.blue + '33', viz.colors.blue, 2);

                                var squareA = s * s;
                                var circA = Math.PI * (s / 2) * (s / 2);
                                var shaded = squareA - circA;

                                // Shade corners
                                // We approximate by noting the visual
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                var cc = viz.toScreen(s / 2, s / 2);
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillText('Circle: ' + circA.toFixed(1), cc[0], cc[1] - 10);
                                ctx.fillStyle = viz.colors.purple;
                                ctx.fillText('Square: ' + squareA, cc[0], cc[1] + 10);

                                viz.screenText('Shaded corners = ' + squareA + ' - ' + circA.toFixed(2) + ' = ' + shaded.toFixed(2), viz.width / 2, viz.height - 20, viz.colors.white, 14);

                            } else {
                                // L-shape
                                var verts = [[0, 0], [8, 0], [8, 4], [4, 4], [4, 8], [0, 8]];
                                viz.drawPolygon(verts, viz.colors.orange + '22', viz.colors.orange, 2);

                                // Decompose: bottom rect + left rect
                                viz.drawSegment(0, 4, 4, 4, viz.colors.yellow, 1.5, true);

                                var bottomA = 8 * 4;
                                var topA = 4 * 4;
                                var totalA = bottomA + topA;

                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillStyle = viz.colors.blue;
                                var r1c = viz.toScreen(4, 2);
                                ctx.fillText('8\u00D74 = 32', r1c[0], r1c[1]);
                                ctx.fillStyle = viz.colors.teal;
                                var r2c = viz.toScreen(2, 6);
                                ctx.fillText('4\u00D74 = 16', r2c[0], r2c[1]);

                                viz.screenText('L-shape area = 32 + 16 = 48', viz.width / 2, viz.height - 20, viz.colors.white, 15);

                                // Dimension labels
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillStyle = viz.colors.text;
                                ctx.textAlign = 'center';
                                var labels = [['8', 4, -0.4], ['4', -0.4, 2], ['4', 6, 4.4], ['4', 4.4, 6], ['4', 2, 8.4], ['8', -0.6, 4]];
                                for (var i = 0; i < labels.length; i++) {
                                    var lp = viz.toScreen(labels[i][1], labels[i][2]);
                                    ctx.fillText(labels[i][0], lp[0], lp[1]);
                                }
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'A shape is made of a rectangle (12 by 5) with a right triangle (legs 5 and 4) attached to one end. Find the total area.',
                    hint: 'Add the rectangle area and triangle area.',
                    solution: 'Rectangle \\(= 60\\). Triangle \\(= \\frac{1}{2}(5)(4) = 10\\). Total \\(= 70\\).'
                },
                {
                    question: 'A rectangular garden is 20 m by 15 m. A circular fountain of radius 3 m is in the center. Find the area of the garden excluding the fountain.',
                    hint: 'Subtract the circle area from the rectangle area.',
                    solution: 'Rectangle \\(= 300\\) m\\(^2\\). Circle \\(= 9\\pi \\approx 28.27\\) m\\(^2\\). Garden area \\(\\approx 271.73\\) m\\(^2\\).'
                },
                {
                    question: 'Find the area of a semicircular window with diameter 4 feet.',
                    hint: 'Radius = 2. Area of semicircle = half of \\(\\pi r^2\\).',
                    solution: '\\(A = \\frac{1}{2}\\pi(4) = 2\\pi \\approx 6.28\\) ft\\(^2\\).'
                },
                {
                    question: 'An L-shaped room consists of two rectangles: one is 10 m by 4 m, and the other is 6 m by 3 m. Find the total area and the perimeter of the L-shape.',
                    hint: 'Add the two rectangle areas. For the perimeter, carefully trace the outside edges.',
                    solution: 'Area \\(= 40 + 18 = 58\\) m\\(^2\\). For the perimeter, trace the outer boundary: \\(10 + 4 + 4 + 3 + 6 + 7 = 34\\) m (exact value depends on arrangement).'
                }
            ]
        },

        // ============================================================
        // SECTION 4: Heron's Formula
        // ============================================================
        {
            id: 'ch09-sec04',
            title: "Heron's Formula",
            content: `<h2>Heron's Formula</h2>

                <div class="env-block intuition">
                    <div class="env-title">When is it useful?</div>
                    <div class="env-body"><p>When you know all three sides of a triangle but not the height, Heron's formula lets you compute the area directly from the side lengths. It is named after Hero of Alexandria (c. 60 AD).</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Heron's Formula</div>
                    <div class="env-body"><p>For a triangle with sides \\(a\\), \\(b\\), \\(c\\) and semi-perimeter \\(s = \\frac{a+b+c}{2}\\):
                    \\[A = \\sqrt{s(s-a)(s-b)(s-c)}.\\]</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-herons"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>Find the area of a triangle with sides 7, 8, and 9.</p>
                    <p>\\(s = (7+8+9)/2 = 12\\).</p>
                    <p>\\(A = \\sqrt{12 \\cdot 5 \\cdot 4 \\cdot 3} = \\sqrt{720} = 12\\sqrt{5} \\approx 26.83\\).</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>Can a triangle have sides 3, 4, and 8?</p>
                    <p>Check the triangle inequality: \\(3 + 4 = 7 < 8\\). No, these sides do not form a triangle.</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-herons',
                    title: "Heron's Formula Calculator",
                    description: 'Adjust the three side lengths. The triangle is drawn if valid, and Heron\'s formula computes the area.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 30, originX: 140, originY: 280, height: 380 });
                        var a = 7, b = 8, c = 9;

                        VizEngine.createSlider(controls, 'Side a', 1, 15, 7, 0.5, function(val) { a = val; draw(); });
                        VizEngine.createSlider(controls, 'Side b', 1, 15, 8, 0.5, function(val) { b = val; draw(); });
                        VizEngine.createSlider(controls, 'Side c', 1, 15, 9, 0.5, function(val) { c = val; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Check triangle inequality
                            var valid = (a + b > c) && (a + c > b) && (b + c > a);

                            if (!valid) {
                                viz.screenText('These sides do not form a valid triangle!', viz.width / 2, viz.height / 2, viz.colors.red, 18);
                                viz.screenText('Triangle inequality: each side < sum of the other two', viz.width / 2, viz.height / 2 + 30, viz.colors.text, 13);
                                return;
                            }

                            // Place triangle: A at origin, B at (c, 0), C computed
                            var cosA = (b * b + c * c - a * a) / (2 * b * c);
                            var sinA = Math.sqrt(1 - cosA * cosA);
                            var cx = b * cosA;
                            var cy = b * sinA;

                            viz.drawPolygon([[0, 0], [c, 0], [cx, cy]], viz.colors.blue + '22', viz.colors.blue, 2.5);

                            // Height line
                            viz.drawSegment(cx, 0, cx, cy, viz.colors.yellow, 1.5, true);

                            // Vertices
                            viz.drawPoint(0, 0, viz.colors.white, 'A', 5);
                            viz.drawPoint(c, 0, viz.colors.white, 'B', 5);
                            viz.drawPoint(cx, cy, viz.colors.white, 'C', 5);

                            // Side labels
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';

                            // a = BC (opposite A)
                            var aMid = viz.toScreen((c + cx) / 2 + 0.3, cy / 2 + 0.3);
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillText('a = ' + a.toFixed(1), aMid[0], aMid[1]);

                            // b = AC
                            var bMid = viz.toScreen(cx / 2 - 0.5, cy / 2 + 0.3);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('b = ' + b.toFixed(1), bMid[0], bMid[1]);

                            // c = AB
                            var cMid = viz.toScreen(c / 2, -0.5);
                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillText('c = ' + c.toFixed(1), cMid[0], cMid[1]);

                            // Heron's formula calculation
                            var s = (a + b + c) / 2;
                            var area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

                            var yBase = viz.height - 80;
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('s = (a+b+c)/2 = ' + s.toFixed(2), viz.width / 2, yBase);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('s-a = ' + (s - a).toFixed(2) + ',  s-b = ' + (s - b).toFixed(2) + ',  s-c = ' + (s - c).toFixed(2), viz.width / 2, yBase + 22);
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.fillText('Area = \u221A[s(s-a)(s-b)(s-c)] = ' + area.toFixed(3), viz.width / 2, yBase + 50);

                            // Height for verification
                            var h = cy;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('Verify: \u00BDbh = \u00BD(' + c.toFixed(1) + ')(' + h.toFixed(2) + ') = ' + (0.5 * c * h).toFixed(3), viz.width / 2, yBase + 72);
                        }

                        draw();
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: "Use Heron's formula to find the area of a triangle with sides 5, 12, and 13.",
                    hint: 'Find the semi-perimeter first: \\(s = (5+12+13)/2\\).',
                    solution: '\\(s = 15\\). \\(A = \\sqrt{15 \\cdot 10 \\cdot 3 \\cdot 2} = \\sqrt{900} = 30\\). (This is a right triangle: \\(5^2 + 12^2 = 13^2\\), so \\(A = \\frac{1}{2}(5)(12) = 30\\). Confirmed!)'
                },
                {
                    question: 'Find the area of a triangle with sides 10, 10, and 12.',
                    hint: '\\(s = 16\\). Compute \\(s - a\\), \\(s - b\\), \\(s - c\\).',
                    solution: '\\(s = 16\\). \\(A = \\sqrt{16 \\cdot 6 \\cdot 6 \\cdot 4} = \\sqrt{2304} = 48\\).'
                },
                {
                    question: 'A triangular plot of land has sides 150 m, 200 m, and 250 m. Find the area in square meters.',
                    hint: 'This is a scaled 3-4-5 right triangle (scale factor 50).',
                    solution: '\\(s = 300\\). \\(A = \\sqrt{300 \\cdot 150 \\cdot 100 \\cdot 50} = \\sqrt{225{,}000{,}000} = 15{,}000\\) m\\(^2\\). (Or directly: \\(\\frac{1}{2}(150)(200) = 15{,}000\\).)'
                },
                {
                    question: "Can a triangle have sides 2, 3, and 6? Check using Heron's formula.",
                    hint: 'First check the triangle inequality, then try the formula.',
                    solution: 'Triangle inequality: \\(2 + 3 = 5 < 6\\). This fails, so no valid triangle exists. Heron gives \\(s = 5.5\\), and \\(s - c = -0.5 < 0\\), so the expression under the square root is negative.'
                }
            ]
        }
    ]
});
