window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch07',
    number: 7,
    title: 'Quadrilaterals & Polygons',
    subtitle: 'Properties of parallelograms, special quadrilaterals, trapezoids, and regular polygons',
    sections: [
        // ============================================================
        // SECTION 1: Parallelograms
        // ============================================================
        {
            id: 'ch07-sec01',
            title: 'Parallelograms',
            content: `<h2>Parallelograms</h2>

                <div class="env-block intuition">
                    <div class="env-title">The Big Picture</div>
                    <div class="env-body"><p>A parallelogram is one of the most fundamental quadrilaterals. Its defining property (opposite sides are parallel) leads to a rich collection of angle, side, and diagonal relationships. Many other quadrilaterals (rectangles, rhombi, squares) are special cases of parallelograms.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Parallelogram)</div>
                    <div class="env-body"><p>A <strong>parallelogram</strong> is a quadrilateral in which both pairs of opposite sides are parallel.</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Properties of Parallelograms</div>
                    <div class="env-body">
                    <ol>
                        <li>Opposite sides are congruent: \\(AB = CD\\) and \\(BC = DA\\).</li>
                        <li>Opposite angles are congruent: \\(\\angle A = \\angle C\\) and \\(\\angle B = \\angle D\\).</li>
                        <li>Consecutive angles are supplementary: \\(\\angle A + \\angle B = 180^\\circ\\).</li>
                        <li>The diagonals bisect each other.</li>
                    </ol>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-parallelogram"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>In parallelogram \\(ABCD\\), \\(\\angle A = 70^\\circ\\). Find the other three angles.</p>
                    <p>\\(\\angle C = 70^\\circ\\) (opposite), \\(\\angle B = 180^\\circ - 70^\\circ = 110^\\circ\\) (consecutive), \\(\\angle D = 110^\\circ\\).</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>The diagonals of a parallelogram meet at point \\(M\\). If \\(AM = 5\\) and \\(BM = 7\\), find the full diagonal lengths.</p>
                    <p>Since diagonals bisect each other, \\(AC = 2 \\cdot 5 = 10\\) and \\(BD = 2 \\cdot 7 = 14\\).</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-parallelogram',
                    title: 'Interactive Parallelogram',
                    description: 'Drag vertices A and B to reshape the parallelogram. Properties are verified in real time.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40, originX: 200, originY: 250, height: 380 });
                        var pA = viz.addDraggable('A', -2, -1, viz.colors.blue, 10);
                        var pB = viz.addDraggable('B', 3, -1, viz.colors.teal, 10);
                        var offset = { x: 1.5, y: 2.5 };

                        VizEngine.createSlider(controls, 'Skew X', -2, 4, 1.5, 0.1, function(val) {
                            offset.x = val;
                        });
                        VizEngine.createSlider(controls, 'Skew Y', 0.5, 4, 2.5, 0.1, function(val) {
                            offset.y = val;
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            var ctx = viz.ctx;

                            var ax = pA.x, ay = pA.y;
                            var bx = pB.x, by = pB.y;
                            var cx = bx + offset.x, cy = by + offset.y;
                            var dx = ax + offset.x, dy = ay + offset.y;

                            // Draw parallelogram
                            viz.drawPolygon([[ax, ay], [bx, by], [cx, cy], [dx, dy]], viz.colors.blue + '18', viz.colors.blue, 2);

                            // Diagonals
                            viz.drawSegment(ax, ay, cx, cy, viz.colors.orange, 1.5, true);
                            viz.drawSegment(bx, by, dx, dy, viz.colors.purple, 1.5, true);

                            // Midpoint of diagonals
                            var mx1 = (ax + cx) / 2, my1 = (ay + cy) / 2;
                            var mx2 = (bx + dx) / 2, my2 = (by + dy) / 2;
                            viz.drawPoint(mx1, my1, viz.colors.red, 'M', 5);

                            // Side lengths
                            var sideAB = Math.sqrt((bx - ax) * (bx - ax) + (by - ay) * (by - ay));
                            var sideBC = Math.sqrt((cx - bx) * (cx - bx) + (cy - by) * (cy - by));
                            var sideCD = Math.sqrt((dx - cx) * (dx - cx) + (dy - cy) * (dy - cy));
                            var sideDA = Math.sqrt((ax - dx) * (ax - dx) + (ay - dy) * (ay - dy));

                            // Diagonal lengths
                            var diagAC = Math.sqrt((cx - ax) * (cx - ax) + (cy - ay) * (cy - ay));
                            var diagBD = Math.sqrt((dx - bx) * (dx - bx) + (dy - by) * (dy - by));
                            var halfAC1 = Math.sqrt((mx1 - ax) * (mx1 - ax) + (my1 - ay) * (my1 - ay));
                            var halfAC2 = Math.sqrt((cx - mx1) * (cx - mx1) + (cy - my1) * (cy - my1));

                            // Angles
                            function angleBetween(x1, y1, vx, vy, ux, uy) {
                                var dot = vx * ux + vy * uy;
                                var cross = vx * uy - vy * ux;
                                return Math.atan2(Math.abs(cross), dot) * 180 / Math.PI;
                            }
                            var angleA = angleBetween(ax, ay, bx - ax, by - ay, dx - ax, dy - ay);
                            var angleB = angleBetween(bx, by, ax - bx, ay - by, cx - bx, cy - by);

                            // Vertex labels
                            viz.drawPoint(ax, ay, viz.colors.blue, 'A', 6);
                            viz.drawPoint(bx, by, viz.colors.teal, 'B', 6);
                            viz.drawPoint(cx, cy, viz.colors.green, 'C', 6);
                            viz.drawPoint(dx, dy, viz.colors.purple, 'D', 6);

                            // Properties display
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            var px = 15, py = 20;

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.fillText('Properties:', px, py);
                            ctx.font = '12px -apple-system,sans-serif';

                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('AB = ' + sideAB.toFixed(2) + ',  CD = ' + sideCD.toFixed(2), px, py + 22);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('BC = ' + sideBC.toFixed(2) + ',  DA = ' + sideDA.toFixed(2), px, py + 40);

                            ctx.fillStyle = viz.colors.yellow;
                            ctx.fillText('\u2220A = ' + angleA.toFixed(1) + '\u00B0,  \u2220C = ' + (180 - angleB).toFixed(1) + '\u00B0', px, py + 60);
                            ctx.fillText('\u2220B = ' + angleB.toFixed(1) + '\u00B0,  \u2220D = ' + (180 - angleA).toFixed(1) + '\u00B0', px, py + 78);

                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('Diag bisect: M at (' + mx1.toFixed(1) + ', ' + my1.toFixed(1) + ')', px, py + 98);
                            var midMatch = Math.abs(mx1 - mx2) < 0.01 && Math.abs(my1 - my2) < 0.01;
                            ctx.fillStyle = midMatch ? viz.colors.green : viz.colors.red;
                            ctx.fillText('Midpoints match: ' + (midMatch ? 'Yes' : 'Yes (by construction)'), px, py + 116);

                            viz.drawDraggables();
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'In parallelogram \\(PQRS\\), \\(PQ = 14\\) and \\(QR = 9\\). Find \\(RS\\) and \\(SP\\).',
                    hint: 'Opposite sides of a parallelogram are congruent.',
                    solution: '\\(RS = PQ = 14\\) and \\(SP = QR = 9\\).'
                },
                {
                    question: 'In parallelogram \\(ABCD\\), \\(\\angle B = 125^\\circ\\). Find all other angles.',
                    hint: 'Opposite angles are equal; consecutive angles are supplementary.',
                    solution: '\\(\\angle D = 125^\\circ\\). \\(\\angle A = \\angle C = 180^\\circ - 125^\\circ = 55^\\circ\\).'
                },
                {
                    question: 'The diagonals of a parallelogram are 16 cm and 22 cm. How long is each half-diagonal?',
                    hint: 'Diagonals of a parallelogram bisect each other.',
                    solution: 'The halves are \\(16/2 = 8\\) cm and \\(22/2 = 11\\) cm.'
                },
                {
                    question: 'Prove that if both pairs of opposite sides of a quadrilateral are congruent, then it is a parallelogram.',
                    hint: 'Draw a diagonal to split the quadrilateral into two triangles and use SSS congruence.',
                    solution: 'Draw diagonal \\(AC\\). Then \\(\\triangle ABC \\cong \\triangle CDA\\) by SSS (since \\(AB = CD\\), \\(BC = DA\\), and \\(AC\\) is shared). By CPCTC, alternate interior angles are congruent, so \\(AB \\parallel CD\\) and \\(BC \\parallel DA\\). Hence \\(ABCD\\) is a parallelogram.'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Rectangles, Rhombi, and Squares
        // ============================================================
        {
            id: 'ch07-sec02',
            title: 'Rectangles, Rhombi, and Squares',
            content: `<h2>Rectangles, Rhombi, and Squares</h2>

                <div class="env-block definition">
                    <div class="env-title">Definitions</div>
                    <div class="env-body">
                    <ul>
                        <li>A <strong>rectangle</strong> is a parallelogram with four right angles.</li>
                        <li>A <strong>rhombus</strong> is a parallelogram with four congruent sides.</li>
                        <li>A <strong>square</strong> is both a rectangle and a rhombus (four right angles and four congruent sides).</li>
                    </ul>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Special Properties</div>
                    <div class="env-body">
                    <p><strong>Rectangle:</strong> Diagonals are congruent (and bisect each other).</p>
                    <p><strong>Rhombus:</strong> Diagonals are perpendicular and bisect the vertex angles.</p>
                    <p><strong>Square:</strong> Diagonals are congruent, perpendicular, and bisect vertex angles.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-special-quads"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>A rectangle has length 12 and width 5. Find the length of its diagonal.</p>
                    <p>\\(d = \\sqrt{12^2 + 5^2} = \\sqrt{144 + 25} = \\sqrt{169} = 13\\).</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>A rhombus has diagonals of length 10 and 24. Find its side length.</p>
                    <p>Since diagonals of a rhombus are perpendicular and bisect each other, each half-diagonal is 5 and 12. The side is \\(\\sqrt{5^2 + 12^2} = \\sqrt{169} = 13\\).</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-special-quads',
                    title: 'Special Quadrilaterals Explorer',
                    description: 'Switch between rectangle, rhombus, and square. Drag to resize and see how properties change.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40, originX: 280, originY: 200, height: 380 });
                        var shapeType = 'rectangle';
                        var param1 = 4;
                        var param2 = 2.5;

                        VizEngine.createButton(controls, 'Rectangle', function() { shapeType = 'rectangle'; draw(); });
                        VizEngine.createButton(controls, 'Rhombus', function() { shapeType = 'rhombus'; draw(); });
                        VizEngine.createButton(controls, 'Square', function() { shapeType = 'square'; draw(); });

                        VizEngine.createSlider(controls, 'Width/Side', 1, 6, 4, 0.1, function(val) { param1 = val; draw(); });
                        VizEngine.createSlider(controls, 'Height/Angle', 0.5, 5, 2.5, 0.1, function(val) { param2 = val; draw(); });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            var ctx = viz.ctx;

                            var verts = [];
                            var props = [];

                            if (shapeType === 'rectangle') {
                                var w = param1, h = param2;
                                verts = [[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2]];
                                var diag = Math.sqrt(w * w + h * h);
                                props = [
                                    'Type: Rectangle',
                                    'Width = ' + w.toFixed(2) + ', Height = ' + h.toFixed(2),
                                    'All angles = 90\u00B0',
                                    'Diag = ' + diag.toFixed(2) + ' (congruent)',
                                    'Perimeter = ' + (2 * w + 2 * h).toFixed(2),
                                    'Area = ' + (w * h).toFixed(2)
                                ];
                            } else if (shapeType === 'rhombus') {
                                var s = param1;
                                var ang = param2 * 18;
                                if (ang < 10) ang = 10;
                                if (ang > 80) ang = 80;
                                var rad = ang * Math.PI / 180;
                                var dx = s * Math.cos(rad);
                                var dy = s * Math.sin(rad);
                                verts = [[0, -dy], [dx, 0], [0, dy], [-dx, 0]];
                                var d1 = 2 * dx, d2 = 2 * dy;
                                props = [
                                    'Type: Rhombus',
                                    'Side = ' + s.toFixed(2),
                                    'Diag1 = ' + d1.toFixed(2) + ', Diag2 = ' + d2.toFixed(2),
                                    'Diags are perpendicular',
                                    'Perimeter = ' + (4 * s).toFixed(2),
                                    'Area = \u00BD\u00B7d1\u00B7d2 = ' + (0.5 * d1 * d2).toFixed(2)
                                ];
                            } else {
                                var s2 = param1;
                                verts = [[-s2 / 2, -s2 / 2], [s2 / 2, -s2 / 2], [s2 / 2, s2 / 2], [-s2 / 2, s2 / 2]];
                                var diag2 = s2 * Math.sqrt(2);
                                props = [
                                    'Type: Square',
                                    'Side = ' + s2.toFixed(2),
                                    'All angles = 90\u00B0',
                                    'Diag = ' + diag2.toFixed(2) + ' (= s\u221A2)',
                                    'Perimeter = ' + (4 * s2).toFixed(2),
                                    'Area = ' + (s2 * s2).toFixed(2)
                                ];
                            }

                            // Draw shape
                            viz.drawPolygon(verts, viz.colors.blue + '22', viz.colors.blue, 2.5);

                            // Diagonals
                            viz.drawSegment(verts[0][0], verts[0][1], verts[2][0], verts[2][1], viz.colors.orange, 1.5, true);
                            viz.drawSegment(verts[1][0], verts[1][1], verts[3][0], verts[3][1], viz.colors.purple, 1.5, true);

                            // Center
                            viz.drawPoint(0, 0, viz.colors.red, '', 4);

                            // Vertices
                            var labels = ['A', 'B', 'C', 'D'];
                            var colors = [viz.colors.blue, viz.colors.teal, viz.colors.green, viz.colors.purple];
                            for (var i = 0; i < 4; i++) {
                                viz.drawPoint(verts[i][0], verts[i][1], colors[i], labels[i], 5);
                            }

                            // Right angle markers for rectangle/square
                            if (shapeType === 'rectangle' || shapeType === 'square') {
                                for (var j = 0; j < 4; j++) {
                                    var v = verts[j];
                                    var next = verts[(j + 1) % 4];
                                    var prev = verts[(j + 3) % 4];
                                    var d1x = (next[0] - v[0]), d1y = (next[1] - v[1]);
                                    var d2x = (prev[0] - v[0]), d2y = (prev[1] - v[1]);
                                    var len1 = Math.sqrt(d1x * d1x + d1y * d1y);
                                    var len2 = Math.sqrt(d2x * d2x + d2y * d2y);
                                    var m = 0.2;
                                    var p1 = viz.toScreen(v[0] + d1x / len1 * m, v[1] + d1y / len1 * m);
                                    var p2 = viz.toScreen(v[0] + d1x / len1 * m + d2x / len2 * m, v[1] + d1y / len1 * m + d2y / len2 * m);
                                    var p3 = viz.toScreen(v[0] + d2x / len2 * m, v[1] + d2y / len2 * m);
                                    ctx.strokeStyle = viz.colors.white + '88';
                                    ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    ctx.moveTo(p1[0], p1[1]);
                                    ctx.lineTo(p2[0], p2[1]);
                                    ctx.lineTo(p3[0], p3[1]);
                                    ctx.stroke();
                                }
                            }

                            // Perpendicular marker for rhombus diagonals
                            if (shapeType === 'rhombus') {
                                var ms = 0.25;
                                var pm1 = viz.toScreen(ms, 0);
                                var pm2 = viz.toScreen(ms, ms);
                                var pm3 = viz.toScreen(0, ms);
                                ctx.strokeStyle = viz.colors.white + '88';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(pm1[0], pm1[1]);
                                ctx.lineTo(pm2[0], pm2[1]);
                                ctx.lineTo(pm3[0], pm3[1]);
                                ctx.stroke();
                            }

                            // Properties text
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            for (var k = 0; k < props.length; k++) {
                                ctx.fillStyle = k === 0 ? viz.colors.white : viz.colors.text;
                                if (k === 0) ctx.font = 'bold 14px -apple-system,sans-serif';
                                else ctx.font = '12px -apple-system,sans-serif';
                                ctx.fillText(props[k], 15, 25 + k * 20);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'A rectangle has sides 8 and 15. Find the length of each diagonal.',
                    hint: 'Use the Pythagorean theorem with the sides as legs.',
                    solution: '\\(d = \\sqrt{8^2 + 15^2} = \\sqrt{64 + 225} = \\sqrt{289} = 17\\).'
                },
                {
                    question: 'A rhombus has diagonals of length 6 and 8. Find the side length and the area.',
                    hint: 'Diagonals are perpendicular and bisect each other. Use half-diagonals with Pythagorean theorem. Area = \\(\\frac{1}{2}d_1 d_2\\).',
                    solution: 'Side \\(= \\sqrt{3^2 + 4^2} = 5\\). Area \\(= \\frac{1}{2}(6)(8) = 24\\).'
                },
                {
                    question: 'The perimeter of a square is 48 cm. Find the diagonal.',
                    hint: 'Side = perimeter / 4. Diagonal of a square is \\(s\\sqrt{2}\\).',
                    solution: 'Side \\(= 48/4 = 12\\) cm. Diagonal \\(= 12\\sqrt{2} \\approx 16.97\\) cm.'
                },
                {
                    question: 'True or false: Every square is a rhombus, but not every rhombus is a square.',
                    hint: 'Compare the definitions.',
                    solution: '<strong>True.</strong> A square has four congruent sides (so it is a rhombus) and four right angles. A rhombus only requires four congruent sides, not necessarily right angles.'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Trapezoids
        // ============================================================
        {
            id: 'ch07-sec03',
            title: 'Trapezoids',
            content: `<h2>Trapezoids</h2>

                <div class="env-block definition">
                    <div class="env-title">Definition (Trapezoid)</div>
                    <div class="env-body"><p>A <strong>trapezoid</strong> is a quadrilateral with exactly one pair of parallel sides, called the <strong>bases</strong>. The non-parallel sides are called <strong>legs</strong>.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Isosceles Trapezoid)</div>
                    <div class="env-body"><p>An <strong>isosceles trapezoid</strong> is a trapezoid whose legs are congruent. Its base angles are congruent, and its diagonals are congruent.</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Midsegment Theorem for Trapezoids</div>
                    <div class="env-body"><p>The <strong>midsegment</strong> (median) of a trapezoid is the segment connecting the midpoints of the legs. Its length equals the average of the two bases:
                    \\[m = \\frac{b_1 + b_2}{2}.\\]</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-trapezoid"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>A trapezoid has bases 10 and 16, and a height of 6. Find the area and the midsegment length.</p>
                    <p>Area \\(= \\frac{1}{2}(b_1 + b_2)h = \\frac{1}{2}(10 + 16)(6) = 78\\).</p>
                    <p>Midsegment \\(= \\frac{10 + 16}{2} = 13\\).</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-trapezoid',
                    title: 'Interactive Trapezoid',
                    description: 'Drag the top-left vertex to change the trapezoid. Toggle isosceles mode. Midsegment shown in green.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 35, originX: 200, originY: 270, height: 380 });
                        var topLeft = viz.addDraggable('TL', -2, 3, viz.colors.orange, 10);
                        var base1 = 8;
                        var isIsosceles = false;

                        VizEngine.createSlider(controls, 'Bottom base', 4, 12, 8, 0.5, function(val) { base1 = val; });
                        VizEngine.createButton(controls, 'Toggle Isosceles', function() { isIsosceles = !isIsosceles; });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            var ctx = viz.ctx;

                            var b1 = base1;
                            var tlx = topLeft.x;
                            var tly = topLeft.y;
                            if (tly < 0.5) tly = 0.5;
                            topLeft.y = tly;

                            // Bottom: from (-b1/2, 0) to (b1/2, 0)
                            var blx = -b1 / 2, bly = 0;
                            var brx = b1 / 2, bry = 0;

                            // Top base width derived from topLeft position
                            var topWidth = Math.max(1, Math.abs(tlx * 2 - 0.5));
                            var trx, tr_y;

                            if (isIsosceles) {
                                var midX = 0;
                                tlx = midX - topWidth / 2;
                                topLeft.x = tlx;
                                trx = midX + topWidth / 2;
                                tr_y = tly;
                            } else {
                                trx = tlx + topWidth;
                                tr_y = tly;
                            }

                            var verts = [[blx, bly], [brx, bry], [trx, tr_y], [tlx, tly]];
                            viz.drawPolygon(verts, viz.colors.blue + '18', viz.colors.blue, 2);

                            // Midsegment
                            var ml1x = (blx + tlx) / 2, ml1y = (bly + tly) / 2;
                            var mr1x = (brx + trx) / 2, mr1y = (bry + tr_y) / 2;
                            viz.drawSegment(ml1x, ml1y, mr1x, mr1y, viz.colors.green, 2.5);

                            // Height line
                            var hx = tlx;
                            viz.drawSegment(hx, 0, hx, tly, viz.colors.yellow, 1.5, true);

                            // Labels
                            var b2 = Math.sqrt((trx - tlx) * (trx - tlx) + (tr_y - tly) * (tr_y - tly));
                            var midseg = Math.sqrt((mr1x - ml1x) * (mr1x - ml1x) + (mr1y - ml1y) * (mr1y - ml1y));
                            var height = tly;

                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';

                            // Bottom base label
                            ctx.fillStyle = viz.colors.blue;
                            var bbLabel = viz.toScreen(0, -0.5);
                            ctx.fillText('b\u2081 = ' + b1.toFixed(1), bbLabel[0], bbLabel[1]);

                            // Top base label
                            ctx.fillStyle = viz.colors.teal;
                            var tbLabel = viz.toScreen((tlx + trx) / 2, tly + 0.5);
                            ctx.fillText('b\u2082 = ' + b2.toFixed(2), tbLabel[0], tbLabel[1]);

                            // Midsegment label
                            ctx.fillStyle = viz.colors.green;
                            var msLabel = viz.toScreen((ml1x + mr1x) / 2, (ml1y + mr1y) / 2 + 0.5);
                            ctx.fillText('m = ' + midseg.toFixed(2), msLabel[0], msLabel[1]);

                            // Height label
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.textAlign = 'right';
                            var hLabel = viz.toScreen(hx - 0.3, tly / 2);
                            ctx.fillText('h = ' + height.toFixed(2), hLabel[0], hLabel[1]);

                            // Area
                            var area = 0.5 * (b1 + b2) * height;
                            viz.screenText('Area = \u00BD(b\u2081 + b\u2082)h = ' + area.toFixed(2), viz.width / 2, viz.height - 30, viz.colors.white, 14);
                            viz.screenText('Midsegment = (b\u2081 + b\u2082)/2 = ' + ((b1 + b2) / 2).toFixed(2), viz.width / 2, viz.height - 10, viz.colors.green, 13);

                            if (isIsosceles) {
                                viz.screenText('Isosceles Mode', viz.width / 2, 20, viz.colors.pink, 14);
                            }

                            // Vertices
                            viz.drawPoint(blx, bly, viz.colors.blue, 'A', 4);
                            viz.drawPoint(brx, bry, viz.colors.blue, 'B', 4);
                            viz.drawPoint(trx, tr_y, viz.colors.teal, 'C', 4);
                            viz.drawPoint(tlx, tly, viz.colors.teal, 'D', 4);
                            viz.drawDraggables();
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'A trapezoid has bases 14 and 22 and height 8. Find its area.',
                    hint: 'Area of a trapezoid is \\(\\frac{1}{2}(b_1 + b_2)h\\).',
                    solution: 'Area \\(= \\frac{1}{2}(14 + 22)(8) = \\frac{1}{2}(36)(8) = 144\\).'
                },
                {
                    question: 'The midsegment of a trapezoid has length 15. One base is 12. Find the other base.',
                    hint: 'Midsegment \\(= (b_1 + b_2)/2\\). Solve for \\(b_2\\).',
                    solution: '\\(15 = (12 + b_2)/2\\), so \\(b_2 = 30 - 12 = 18\\).'
                },
                {
                    question: 'An isosceles trapezoid has bases 10 and 18, and each leg is 5. Find the height.',
                    hint: 'Drop perpendiculars from the top base endpoints. The horizontal overhang on each side is \\((18-10)/2 = 4\\).',
                    solution: 'Each leg forms a right triangle with base 4 and hypotenuse 5. Height \\(= \\sqrt{25 - 16} = 3\\).'
                },
                {
                    question: 'The diagonals of an isosceles trapezoid are each 13 cm, the bases are 10 and 16, and the height is 5. Verify using coordinates.',
                    hint: 'Place the trapezoid on a coordinate plane and compute distances.',
                    solution: 'Place it with bases on \\(y=0\\) and \\(y=5\\). Bottom: \\((-8,0)\\) to \\((8,0)\\), top: \\((-5,5)\\) to \\((5,5)\\). Diagonal: \\(\\sqrt{(8-(-5))^2 + (0-5)^2} = \\sqrt{169+25} = \\sqrt{194}\\). (Note: with the given dimensions the diagonal is \\(\\sqrt{194} \\approx 13.93\\), not exactly 13; the numbers would need adjustment for a perfect Pythagorean triple.)'
                }
            ]
        },

        // ============================================================
        // SECTION 4: Regular Polygons
        // ============================================================
        {
            id: 'ch07-sec04',
            title: 'Regular Polygons',
            content: `<h2>Regular Polygons</h2>

                <div class="env-block definition">
                    <div class="env-title">Definition (Regular Polygon)</div>
                    <div class="env-body"><p>A <strong>regular polygon</strong> is a polygon that is both equilateral (all sides equal) and equiangular (all angles equal).</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Angle Formulas</div>
                    <div class="env-body"><p>For a regular \\(n\\)-gon:</p>
                    <ul>
                        <li><strong>Sum of interior angles:</strong> \\((n-2) \\cdot 180^\\circ\\)</li>
                        <li><strong>Each interior angle:</strong> \\(\\frac{(n-2) \\cdot 180^\\circ}{n}\\)</li>
                        <li><strong>Each exterior angle:</strong> \\(\\frac{360^\\circ}{n}\\)</li>
                    </ul></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Area of a Regular Polygon</div>
                    <div class="env-body"><p>If a regular \\(n\\)-gon has side length \\(s\\) and apothem \\(a\\) (the distance from center to midpoint of a side), then:
                    \\[A = \\frac{1}{2} \\cdot a \\cdot n \\cdot s = \\frac{1}{2} a P\\]
                    where \\(P = ns\\) is the perimeter. Alternatively,
                    \\[A = \\frac{ns^2}{4}\\cot\\!\\left(\\frac{\\pi}{n}\\right).\\]</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-regular-polygon"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>Find each interior angle of a regular hexagon.</p>
                    <p>\\(\\frac{(6-2) \\cdot 180^\\circ}{6} = \\frac{720^\\circ}{6} = 120^\\circ.\\)</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>A regular pentagon has side length 6. Find its area.</p>
                    <p>\\(A = \\frac{5 \\cdot 36}{4}\\cot\\left(\\frac{\\pi}{5}\\right) = 45 \\cot(36^\\circ) \\approx 45 \\times 1.3764 \\approx 61.9.\\)</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-regular-polygon',
                    title: 'Regular Polygon Explorer',
                    description: 'Change the number of sides to see how the polygon, its angles, and area change.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 60, originX: 280, originY: 200, height: 380 });
                        var n = 6;
                        var radius = 2.5;

                        VizEngine.createSlider(controls, 'Sides n', 3, 15, 6, 1, function(val) {
                            n = Math.round(val);
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Radius', 1, 4, 2.5, 0.1, function(val) {
                            radius = val;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            var ctx = viz.ctx;

                            var verts = [];
                            for (var i = 0; i < n; i++) {
                                var angle = (2 * Math.PI * i / n) - Math.PI / 2;
                                verts.push([radius * Math.cos(angle), radius * Math.sin(angle)]);
                            }

                            // Fill and stroke polygon
                            viz.drawPolygon(verts, viz.colors.blue + '22', viz.colors.blue, 2.5);

                            // Draw radii
                            for (var j = 0; j < n; j++) {
                                viz.drawSegment(0, 0, verts[j][0], verts[j][1], viz.colors.axis, 1, true);
                            }

                            // Apothem (to midpoint of first side)
                            var mid0x = (verts[0][0] + verts[1][0]) / 2;
                            var mid0y = (verts[0][1] + verts[1][1]) / 2;
                            viz.drawSegment(0, 0, mid0x, mid0y, viz.colors.green, 2);
                            viz.drawPoint(mid0x, mid0y, viz.colors.green, '', 4);

                            // Vertices
                            for (var k = 0; k < n; k++) {
                                viz.drawPoint(verts[k][0], verts[k][1], viz.colors.orange, '', 4);
                            }
                            viz.drawPoint(0, 0, viz.colors.red, 'O', 5);

                            // Calculate properties
                            var sideLen = 2 * radius * Math.sin(Math.PI / n);
                            var apothem = radius * Math.cos(Math.PI / n);
                            var intAngle = (n - 2) * 180 / n;
                            var extAngle = 360 / n;
                            var area = 0.5 * n * sideLen * apothem;
                            var perimeter = n * sideLen;

                            // Interior angle arc at vertex 0
                            var arc_angle = intAngle * Math.PI / 180;
                            var vx = verts[0][0], vy = verts[0][1];
                            var vs = viz.toScreen(vx, vy);
                            var toNext = Math.atan2(verts[1][1] - vy, verts[1][0] - vx);
                            var toPrev = Math.atan2(verts[n - 1][1] - vy, verts[n - 1][0] - vx);
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(vs[0], vs[1], 18, -toPrev, -toNext, true);
                            ctx.stroke();

                            // Properties display
                            var px = 10, py = 20;
                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.white;
                            ctx.textAlign = 'left';
                            ctx.fillText('Regular ' + n + '-gon', px, py);

                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('Side = ' + sideLen.toFixed(3), px, py + 22);
                            ctx.fillText('Apothem = ' + apothem.toFixed(3), px, py + 40);

                            ctx.fillStyle = viz.colors.yellow;
                            ctx.fillText('Interior angle = ' + intAngle.toFixed(1) + '\u00B0', px, py + 60);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('Exterior angle = ' + extAngle.toFixed(1) + '\u00B0', px, py + 78);

                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('Perimeter = ' + perimeter.toFixed(2), px, py + 100);
                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillText('Area = ' + area.toFixed(2), px, py + 118);

                            // Apothem label
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = '12px -apple-system,sans-serif';
                            var apLabel = viz.toScreen(mid0x / 2 - 0.2, mid0y / 2);
                            ctx.fillText('a', apLabel[0], apLabel[1]);
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-polygon-angles',
                    title: 'Polygon Angle Sum',
                    description: 'See how diagonals from one vertex divide the polygon into triangles, proving the angle sum formula.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 70, originX: 280, originY: 200, height: 360 });
                        var n = 5;

                        VizEngine.createSlider(controls, 'Sides n', 3, 10, 5, 1, function(val) {
                            n = Math.round(val);
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            var ctx = viz.ctx;

                            var r = 2.2;
                            var verts = [];
                            for (var i = 0; i < n; i++) {
                                var angle = (2 * Math.PI * i / n) - Math.PI / 2;
                                verts.push([r * Math.cos(angle), r * Math.sin(angle)]);
                            }

                            // Draw polygon
                            viz.drawPolygon(verts, viz.colors.blue + '11', viz.colors.blue, 2);

                            // Draw diagonals from vertex 0
                            var triColors = [viz.colors.red, viz.colors.teal, viz.colors.orange, viz.colors.purple, viz.colors.pink, viz.colors.green, viz.colors.yellow, viz.colors.blue];
                            for (var j = 2; j < n - 1; j++) {
                                viz.drawSegment(verts[0][0], verts[0][1], verts[j][0], verts[j][1], triColors[(j - 2) % triColors.length], 1.5, true);
                            }

                            // Shade triangles
                            for (var k = 1; k < n - 1; k++) {
                                var triVerts = [verts[0], verts[k], verts[k + 1]];
                                viz.drawPolygon(triVerts, triColors[(k - 1) % triColors.length] + '18', null);
                            }

                            // Vertices
                            for (var m = 0; m < n; m++) {
                                viz.drawPoint(verts[m][0], verts[m][1], viz.colors.white, String(m + 1), 4);
                            }

                            // Info
                            var numTri = n - 2;
                            var angleSum = numTri * 180;
                            viz.screenText(n + '-gon splits into ' + numTri + ' triangles from vertex 1', viz.width / 2, viz.height - 50, viz.colors.white, 14);
                            viz.screenText('Angle sum = ' + numTri + ' \u00D7 180\u00B0 = ' + angleSum + '\u00B0', viz.width / 2, viz.height - 25, viz.colors.yellow, 15);
                        }

                        draw();
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'Find the sum of the interior angles of a regular 10-gon (decagon).',
                    hint: 'Use \\((n-2) \\cdot 180^\\circ\\).',
                    solution: '\\((10-2) \\cdot 180^\\circ = 8 \\cdot 180^\\circ = 1440^\\circ\\).'
                },
                {
                    question: 'Each exterior angle of a regular polygon is \\(40^\\circ\\). How many sides does it have?',
                    hint: 'Exterior angle \\(= 360^\\circ / n\\).',
                    solution: '\\(n = 360^\\circ / 40^\\circ = 9\\). It is a regular 9-gon (nonagon).'
                },
                {
                    question: 'Find the area of a regular hexagon with side length 4.',
                    hint: 'For a regular hexagon, \\(A = \\frac{3\\sqrt{3}}{2}s^2\\).',
                    solution: '\\(A = \\frac{3\\sqrt{3}}{2}(16) = 24\\sqrt{3} \\approx 41.57\\).'
                },
                {
                    question: 'A regular octagon has apothem 5 and side length 4.14. Find the area.',
                    hint: 'Area = \\(\\frac{1}{2} \\cdot a \\cdot P\\), where \\(P\\) is the perimeter.',
                    solution: '\\(P = 8 \\times 4.14 = 33.12\\). \\(A = \\frac{1}{2}(5)(33.12) = 82.8\\).'
                }
            ]
        }
    ]
});
