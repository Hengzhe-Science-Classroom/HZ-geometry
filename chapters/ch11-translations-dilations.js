window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch11',
    number: 11,
    title: 'Translations & Dilations',
    subtitle: 'Translating by a vector, dilating from a center with a scale factor, and connecting dilations to similarity',
    sections: [
        // ============================================================
        // SECTION 1: Translations by a Vector
        // ============================================================
        {
            id: 'ch11-sec01',
            title: 'Translations by a Vector',
            content: `<h2>Translations by a Vector</h2>

                <div class="env-block intuition">
                    <div class="env-title">The Big Picture</div>
                    <div class="env-body"><p>A translation slides every point of a figure the same distance in the same direction. It is the simplest rigid motion: no rotation, no reflection, just a shift. Translations preserve shape, size, and orientation.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Translation)</div>
                    <div class="env-body"><p>A <strong>translation</strong> by vector \\(\\vec{v} = \\langle a, b \\rangle\\) maps each point \\((x, y)\\) to \\((x + a, y + b)\\).</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-translation"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>Translate the triangle with vertices \\((1, 2)\\), \\((4, 2)\\), \\((3, 5)\\) by \\(\\vec{v} = \\langle -3, 2 \\rangle\\).</p>
                    <p>New vertices: \\((-2, 4)\\), \\((1, 4)\\), \\((0, 7)\\).</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Properties of Translations</div>
                    <div class="env-body">
                    <ul>
                        <li>Preserves distances (isometry)</li>
                        <li>Preserves angle measures</li>
                        <li>Preserves orientation (unlike reflections)</li>
                        <li>Every line maps to a parallel line</li>
                        <li>No fixed points (unless \\(\\vec{v} = \\vec{0}\\))</li>
                    </ul>
                    </div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-translation',
                    title: 'Interactive Translation',
                    description: 'Drag the vector arrow or the shape. The translation vector and image update in real time.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 35, originX: 240, originY: 220, height: 400 });
                        var vecEnd = viz.addDraggable('vec', 3, 2, viz.colors.yellow, 10);
                        var triA = viz.addDraggable('A', -3, -1, viz.colors.blue, 10);
                        var triB = viz.addDraggable('B', -1, -2, viz.colors.blue, 10);
                        var triC = viz.addDraggable('C', -2, 1.5, viz.colors.blue, 10);

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            var vx = vecEnd.x, vy = vecEnd.y;
                            var pts = [[triA.x, triA.y], [triB.x, triB.y], [triC.x, triC.y]];

                            // Original
                            viz.drawPolygon(pts, viz.colors.blue + '33', viz.colors.blue, 2);

                            // Translated
                            var tPts = [];
                            for (var i = 0; i < 3; i++) {
                                tPts.push([pts[i][0] + vx, pts[i][1] + vy]);
                            }
                            viz.drawPolygon(tPts, viz.colors.teal + '33', viz.colors.teal, 2);

                            // Translation arrows for each vertex
                            for (var j = 0; j < 3; j++) {
                                viz.drawVector(pts[j][0], pts[j][1], tPts[j][0], tPts[j][1], viz.colors.orange + '66', '', 1);
                            }

                            // Main vector from origin
                            viz.drawVector(0, 0, vx, vy, viz.colors.yellow, '', 2.5);

                            // Labels
                            var labels = ['A', 'B', 'C'];
                            for (var k = 0; k < 3; k++) {
                                viz.drawPoint(pts[k][0], pts[k][1], viz.colors.blue, labels[k], 5);
                                viz.drawPoint(tPts[k][0], tPts[k][1], viz.colors.teal, labels[k] + "'", 5);
                            }

                            // Vector label
                            viz.screenText('v = \u27E8' + vx.toFixed(1) + ', ' + vy.toFixed(1) + '\u27E9', viz.width / 2, 20, viz.colors.yellow, 16);
                            viz.screenText('(x, y) \u2192 (x + ' + vx.toFixed(1) + ', y + ' + vy.toFixed(1) + ')', viz.width / 2, 42, viz.colors.text, 13);

                            // Magnitude
                            var mag = Math.sqrt(vx * vx + vy * vy);
                            viz.screenText('|v| = ' + mag.toFixed(2), viz.width / 2, viz.height - 15, viz.colors.yellow, 13);

                            viz.drawDraggables();
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'Translate the point \\((5, -2)\\) by \\(\\vec{v} = \\langle -4, 7 \\rangle\\).',
                    hint: 'Add the vector components to the point coordinates.',
                    solution: '\\((5 + (-4), -2 + 7) = (1, 5)\\).'
                },
                {
                    question: 'A square has vertices \\((0,0)\\), \\((3,0)\\), \\((3,3)\\), \\((0,3)\\). Translate it by \\(\\langle 2, -1 \\rangle\\). List the new vertices.',
                    hint: 'Add \\((2, -1)\\) to each vertex.',
                    solution: '\\((2, -1)\\), \\((5, -1)\\), \\((5, 2)\\), \\((2, 2)\\).'
                },
                {
                    question: 'Point \\(P(1, 3)\\) is translated to \\(P\'(4, -1)\\). Find the translation vector.',
                    hint: 'Subtract: \\(\\vec{v} = P\' - P\\).',
                    solution: '\\(\\vec{v} = \\langle 4-1, -1-3 \\rangle = \\langle 3, -4 \\rangle\\).'
                },
                {
                    question: 'If a translation maps \\((a, b)\\) to \\((a, b)\\), what can you conclude about the vector?',
                    hint: 'What vector leaves every point unchanged?',
                    solution: 'The translation vector is \\(\\langle 0, 0 \\rangle\\). This is the identity transformation.'
                },
                {
                    question: 'Translate the line \\(y = 2x + 1\\) by \\(\\langle 3, 4 \\rangle\\). Find the equation of the image line.',
                    hint: 'A point \\((x, y)\\) on the original maps to \\((x+3, y+4)\\). Substitute \\(x = X-3\\), \\(y = Y-4\\) into the original equation.',
                    solution: '\\(Y - 4 = 2(X - 3) + 1\\), so \\(Y = 2X - 6 + 1 + 4 = 2X - 1\\). The image is \\(y = 2x - 1\\) (same slope, different intercept).'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Dilations with Center & Scale Factor
        // ============================================================
        {
            id: 'ch11-sec02',
            title: 'Dilations',
            content: `<h2>Dilations with Center & Scale Factor</h2>

                <div class="env-block definition">
                    <div class="env-title">Definition (Dilation)</div>
                    <div class="env-body"><p>A <strong>dilation</strong> with center \\(O\\) and scale factor \\(k > 0\\) maps each point \\(P\\) to a point \\(P'\\) on ray \\(\\overrightarrow{OP}\\) such that
                    \\[OP' = k \\cdot OP.\\]
                    If \\(k > 1\\), the figure is <strong>enlarged</strong>. If \\(0 < k < 1\\), the figure is <strong>reduced</strong>. If \\(k = 1\\), the figure is unchanged.</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Dilation Formula</div>
                    <div class="env-body"><p>Dilation with center \\((a, b)\\) and scale factor \\(k\\):
                    \\[(x, y) \\to (a + k(x - a),\\; b + k(y - b)).\\]
                    When the center is the origin: \\((x, y) \\to (kx, ky)\\).</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Properties of Dilations</div>
                    <div class="env-body">
                    <ul>
                        <li>Preserves angle measures</li>
                        <li>Maps lines to parallel lines (or the same line if through the center)</li>
                        <li>Multiplies all lengths by \\(|k|\\)</li>
                        <li>Multiplies area by \\(k^2\\)</li>
                        <li>The center is the only fixed point</li>
                    </ul>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-dilation"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>Dilate the point \\((4, 6)\\) with center \\((1, 2)\\) and scale factor \\(k = 2\\).</p>
                    <p>\\(x' = 1 + 2(4 - 1) = 1 + 6 = 7\\). \\(y' = 2 + 2(6 - 2) = 2 + 8 = 10\\).</p>
                    <p>Image: \\((7, 10)\\).</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>A triangle with area 20 is dilated by scale factor 3. Find the area of the image.</p>
                    <p>Area scales by \\(k^2 = 9\\). New area \\(= 20 \\times 9 = 180\\).</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-dilation-area"></div>`,

            visualizations: [
                {
                    id: 'viz-dilation',
                    title: 'Draggable Dilation',
                    description: 'Drag the center of dilation. Use the slider to change the scale factor. See how the triangle enlarges or shrinks.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 30, originX: 240, originY: 230, height: 400 });
                        var center = viz.addDraggable('O', 0, 0, viz.colors.red, 12);
                        var k = 2;

                        var triA = viz.addDraggable('A', 2, 1, viz.colors.blue, 10);
                        var triB = viz.addDraggable('B', 4, 0, viz.colors.blue, 10);
                        var triC = viz.addDraggable('C', 3, 3, viz.colors.blue, 10);

                        VizEngine.createSlider(controls, 'Scale k', 0.2, 3, 2, 0.1, function(val) {
                            k = val;
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            var cx = center.x, cy = center.y;
                            var pts = [[triA.x, triA.y], [triB.x, triB.y], [triC.x, triC.y]];

                            // Dilated points
                            var dPts = [];
                            for (var i = 0; i < 3; i++) {
                                dPts.push([
                                    cx + k * (pts[i][0] - cx),
                                    cy + k * (pts[i][1] - cy)
                                ]);
                            }

                            // Rays from center through vertices
                            for (var j = 0; j < 3; j++) {
                                var farX = cx + (pts[j][0] - cx) * 4;
                                var farY = cy + (pts[j][1] - cy) * 4;
                                viz.drawSegment(cx, cy, farX, farY, viz.colors.text + '33', 1, true);
                            }

                            // Original triangle
                            viz.drawPolygon(pts, viz.colors.blue + '33', viz.colors.blue, 2);

                            // Dilated triangle
                            viz.drawPolygon(dPts, viz.colors.teal + '33', viz.colors.teal, 2);

                            // Labels
                            var labels = ['A', 'B', 'C'];
                            for (var m = 0; m < 3; m++) {
                                viz.drawPoint(pts[m][0], pts[m][1], viz.colors.blue, labels[m], 5);
                                viz.drawPoint(dPts[m][0], dPts[m][1], viz.colors.teal, labels[m] + "'", 5);
                            }

                            // Center
                            viz.drawPoint(cx, cy, viz.colors.red, 'O', 8);

                            // Compute areas
                            function triArea(p) {
                                return 0.5 * Math.abs(
                                    (p[1][0] - p[0][0]) * (p[2][1] - p[0][1]) -
                                    (p[2][0] - p[0][0]) * (p[1][1] - p[0][1])
                                );
                            }
                            var origArea = triArea(pts);
                            var dilArea = triArea(dPts);

                            // Side lengths
                            function dist(p1, p2) {
                                return Math.sqrt((p2[0] - p1[0]) * (p2[0] - p1[0]) + (p2[1] - p1[1]) * (p2[1] - p1[1]));
                            }
                            var origSide = dist(pts[0], pts[1]);
                            var dilSide = dist(dPts[0], dPts[1]);

                            // Info
                            viz.screenText('k = ' + k.toFixed(1), viz.width / 2, 20, viz.colors.yellow, 16);
                            viz.screenText('Original AB = ' + origSide.toFixed(2) + ',  Image A\'B\' = ' + dilSide.toFixed(2) + '  (ratio: ' + (dilSide / origSide).toFixed(2) + ')', viz.width / 2, viz.height - 55, viz.colors.text, 12);
                            viz.screenText('Original area = ' + origArea.toFixed(2) + ',  Image area = ' + dilArea.toFixed(2) + '  (ratio: ' + (dilArea / origArea).toFixed(2) + ')', viz.width / 2, viz.height - 35, viz.colors.text, 12);
                            viz.screenText('Length ratio = k = ' + k.toFixed(1) + ',  Area ratio = k\u00B2 = ' + (k * k).toFixed(2), viz.width / 2, viz.height - 12, viz.colors.white, 13);

                            viz.drawDraggables();
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                },
                {
                    id: 'viz-dilation-area',
                    title: 'Area Scaling Under Dilation',
                    description: 'See how area scales as k^2 when a shape is dilated. The grid squares help visualize the area change.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40, originX: 120, originY: 300, height: 380 });
                        var k = 1;

                        VizEngine.createSlider(controls, 'Scale k', 0.5, 3, 1, 0.1, function(val) {
                            k = val;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            var ctx = viz.ctx;

                            // Original square
                            var side = 3;
                            viz.drawPolygon([[0, 0], [side, 0], [side, side], [0, side]], viz.colors.blue + '33', viz.colors.blue, 2);

                            // Draw grid inside original
                            ctx.strokeStyle = viz.colors.blue + '44';
                            ctx.lineWidth = 0.5;
                            for (var i = 0; i <= side; i++) {
                                var p1 = viz.toScreen(i, 0);
                                var p2 = viz.toScreen(i, side);
                                ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]); ctx.stroke();
                                p1 = viz.toScreen(0, i);
                                p2 = viz.toScreen(side, i);
                                ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]); ctx.stroke();
                            }

                            // Dilated square (from origin)
                            var ds = side * k;
                            viz.drawPolygon([[0, 0], [ds, 0], [ds, ds], [0, ds]], viz.colors.teal + '22', viz.colors.teal, 2);

                            // Grid inside dilated
                            ctx.strokeStyle = viz.colors.teal + '33';
                            ctx.lineWidth = 0.5;
                            for (var j = 0; j <= side; j++) {
                                var q1 = viz.toScreen(j * k, 0);
                                var q2 = viz.toScreen(j * k, ds);
                                ctx.beginPath(); ctx.moveTo(q1[0], q1[1]); ctx.lineTo(q2[0], q2[1]); ctx.stroke();
                                q1 = viz.toScreen(0, j * k);
                                q2 = viz.toScreen(ds, j * k);
                                ctx.beginPath(); ctx.moveTo(q1[0], q1[1]); ctx.lineTo(q2[0], q2[1]); ctx.stroke();
                            }

                            // Labels
                            var origArea = side * side;
                            var dilArea = ds * ds;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillStyle = viz.colors.blue;
                            var oc = viz.toScreen(side / 2, side / 2);
                            ctx.fillText(side + '\u00D7' + side + ' = ' + origArea, oc[0], oc[1]);

                            if (k !== 1) {
                                ctx.fillStyle = viz.colors.teal;
                                var dc = viz.toScreen(ds / 2, ds / 2 + (k > 1 ? side / 2 + 0.5 : -0.5));
                                ctx.fillText(ds.toFixed(1) + '\u00D7' + ds.toFixed(1) + ' = ' + dilArea.toFixed(1), dc[0], dc[1]);
                            }

                            viz.screenText('k = ' + k.toFixed(1) + ',  k\u00B2 = ' + (k * k).toFixed(2), viz.width / 2, 25, viz.colors.yellow, 16);
                            viz.screenText('Original area: ' + origArea + ' sq units', viz.width / 2, viz.height - 40, viz.colors.blue, 14);
                            viz.screenText('Dilated area: ' + dilArea.toFixed(1) + ' = ' + origArea + ' \u00D7 ' + (k * k).toFixed(2), viz.width / 2, viz.height - 18, viz.colors.teal, 14);
                        }

                        draw();
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'Dilate the point \\((6, 4)\\) with center \\((0, 0)\\) and scale factor \\(k = \\frac{1}{2}\\).',
                    hint: 'Multiply each coordinate by \\(k\\).',
                    solution: '\\((6 \\cdot 0.5, 4 \\cdot 0.5) = (3, 2)\\).'
                },
                {
                    question: 'Dilate \\((5, 3)\\) with center \\((1, 1)\\) and \\(k = 3\\).',
                    hint: 'Use \\((a + k(x-a), b + k(y-b))\\) with \\((a, b) = (1, 1)\\).',
                    solution: '\\((1 + 3(4), 1 + 3(2)) = (13, 7)\\).'
                },
                {
                    question: 'A circle of radius 5 is dilated by factor \\(k = 2\\). Find the radius and area of the image.',
                    hint: 'Radius scales by \\(k\\), area scales by \\(k^2\\).',
                    solution: 'New radius \\(= 10\\). New area \\(= \\pi(10)^2 = 100\\pi\\) (original was \\(25\\pi\\), ratio is 4 = \\(k^2\\)).'
                },
                {
                    question: 'After dilation with \\(k = 0.4\\), an image has area 8. What was the original area?',
                    hint: 'Original area = image area / \\(k^2\\).',
                    solution: 'Original area \\(= 8 / 0.16 = 50\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Similarity via Transformations
        // ============================================================
        {
            id: 'ch11-sec03',
            title: 'Similarity via Transformations',
            content: `<h2>Similarity via Transformations</h2>

                <div class="env-block definition">
                    <div class="env-title">Definition (Similarity Transformation)</div>
                    <div class="env-body"><p>A <strong>similarity transformation</strong> is a composition of rigid motions (translations, rotations, reflections) and a dilation. Two figures are <strong>similar</strong> (\\(\\sim\\)) if one can be mapped to the other by a similarity transformation.</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">AA Similarity (via Transformations)</div>
                    <div class="env-body"><p>If two triangles have two pairs of congruent angles, then they are similar. This can be proven by:</p>
                    <ol>
                        <li>Translate one triangle so a vertex matches.</li>
                        <li>Rotate so one pair of sides aligns.</li>
                        <li>Dilate so the matched sides are equal.</li>
                    </ol>
                    <p>The remaining sides and angles match by the angle conditions.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-similarity"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>Triangle \\(ABC\\) has sides 3, 4, 5. Triangle \\(DEF\\) has sides 6, 8, 10. Show they are similar.</p>
                    <p>The ratios are all \\(6/3 = 8/4 = 10/5 = 2\\). So triangle \\(DEF\\) is a dilation of triangle \\(ABC\\) by factor 2. Since corresponding angles are equal (both are right triangles), they are similar with \\(k = 2\\).</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Properties of Similar Figures</div>
                    <div class="env-body">
                    <ul>
                        <li>Corresponding angles are congruent</li>
                        <li>Corresponding sides are proportional (ratio = \\(k\\))</li>
                        <li>Perimeter ratio = \\(k\\)</li>
                        <li>Area ratio = \\(k^2\\)</li>
                    </ul>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-similar-triangles"></div>`,

            visualizations: [
                {
                    id: 'viz-similarity',
                    title: 'Similarity Transformation Builder',
                    description: 'Apply translate, rotate, and dilate in sequence to map one triangle onto another.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 30, originX: 240, originY: 240, height: 400 });
                        var tx = 0, ty = 0, rotAngle = 0, scaleFactor = 1;

                        VizEngine.createSlider(controls, 'Translate X', -5, 5, 0, 0.2, function(val) { tx = val; draw(); });
                        VizEngine.createSlider(controls, 'Translate Y', -5, 5, 0, 0.2, function(val) { ty = val; draw(); });
                        VizEngine.createSlider(controls, 'Rotate (\u00B0)', -180, 180, 0, 5, function(val) { rotAngle = val; draw(); });
                        VizEngine.createSlider(controls, 'Scale k', 0.3, 3, 1, 0.1, function(val) { scaleFactor = val; draw(); });

                        var origTri = [[-3, -2], [-1, -2], [-2, 1]];
                        var targetTri = [[2, 0], [6, 0], [4, 4.5]];

                        function applyTransform(pts) {
                            var result = [];
                            var rad = rotAngle * Math.PI / 180;
                            for (var i = 0; i < pts.length; i++) {
                                // Translate
                                var px = pts[i][0] + tx;
                                var py = pts[i][1] + ty;
                                // Rotate about origin
                                var rx = px * Math.cos(rad) - py * Math.sin(rad);
                                var ry = px * Math.sin(rad) + py * Math.cos(rad);
                                // Scale from origin
                                result.push([rx * scaleFactor, ry * scaleFactor]);
                            }
                            return result;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            // Target (faint)
                            viz.drawPolygon(targetTri, viz.colors.green + '18', viz.colors.green, 2, true);

                            // Transformed original
                            var transformed = applyTransform(origTri);
                            viz.drawPolygon(transformed, viz.colors.blue + '33', viz.colors.blue, 2);

                            // Original (very faint)
                            viz.drawPolygon(origTri, viz.colors.red + '11', viz.colors.red + '44', 1);

                            // Labels
                            var labels = ['A', 'B', 'C'];
                            for (var k = 0; k < 3; k++) {
                                viz.drawPoint(origTri[k][0], origTri[k][1], viz.colors.red + '66', '', 3);
                                viz.drawPoint(transformed[k][0], transformed[k][1], viz.colors.blue, labels[k], 5);
                                viz.drawPoint(targetTri[k][0], targetTri[k][1], viz.colors.green, labels[k] + "'", 5);
                            }

                            // Check overlap
                            var totalDist = 0;
                            for (var m = 0; m < 3; m++) {
                                var dx = transformed[m][0] - targetTri[m][0];
                                var dy = transformed[m][1] - targetTri[m][1];
                                totalDist += Math.sqrt(dx * dx + dy * dy);
                            }
                            var matched = totalDist < 1.5;

                            viz.screenText('Red = original,  Blue = transformed,  Green = target', viz.width / 2, 20, viz.colors.text, 12);
                            viz.screenText(matched ? 'Matched! The triangles are similar.' : 'Adjust sliders to map blue onto green', viz.width / 2, viz.height - 15, matched ? viz.colors.green : viz.colors.yellow, 14);
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-similar-triangles',
                    title: 'Similar Triangles: Side Ratios',
                    description: 'Drag vertices of the larger triangle. The smaller triangle maintains the same angles, and the side ratios are displayed.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 30, originX: 100, originY: 300, height: 380 });
                        var pA = viz.addDraggable('A', 0, 0, viz.colors.blue, 10);
                        var pB = viz.addDraggable('B', 8, 0, viz.colors.blue, 10);
                        var pC = viz.addDraggable('C', 3, 6, viz.colors.blue, 10);
                        var k = 0.5;

                        VizEngine.createSlider(controls, 'Scale k', 0.2, 0.9, 0.5, 0.05, function(val) { k = val; });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            var ctx = viz.ctx;

                            var pts = [[pA.x, pA.y], [pB.x, pB.y], [pC.x, pC.y]];

                            // Centroid for positioning the smaller triangle
                            var centX = (pts[0][0] + pts[1][0] + pts[2][0]) / 3;
                            var centY = (pts[0][1] + pts[1][1] + pts[2][1]) / 3;

                            // Smaller triangle dilated from centroid
                            var smallPts = [];
                            for (var i = 0; i < 3; i++) {
                                smallPts.push([
                                    centX + k * (pts[i][0] - centX),
                                    centY + k * (pts[i][1] - centY)
                                ]);
                            }

                            // Draw both triangles
                            viz.drawPolygon(pts, viz.colors.blue + '22', viz.colors.blue, 2);
                            viz.drawPolygon(smallPts, viz.colors.teal + '33', viz.colors.teal, 2);

                            // Side lengths
                            function dist(p1, p2) {
                                return Math.sqrt((p2[0] - p1[0]) * (p2[0] - p1[0]) + (p2[1] - p1[1]) * (p2[1] - p1[1]));
                            }

                            var sAB = dist(pts[0], pts[1]);
                            var sBC = dist(pts[1], pts[2]);
                            var sCA = dist(pts[2], pts[0]);

                            var sABs = dist(smallPts[0], smallPts[1]);
                            var sBCs = dist(smallPts[1], smallPts[2]);
                            var sCAs = dist(smallPts[2], smallPts[0]);

                            // Labels
                            viz.drawPoint(pts[0][0], pts[0][1], viz.colors.blue, 'A', 5);
                            viz.drawPoint(pts[1][0], pts[1][1], viz.colors.blue, 'B', 5);
                            viz.drawPoint(pts[2][0], pts[2][1], viz.colors.blue, 'C', 5);

                            viz.drawPoint(smallPts[0][0], smallPts[0][1], viz.colors.teal, "A'", 4);
                            viz.drawPoint(smallPts[1][0], smallPts[1][1], viz.colors.teal, "B'", 4);
                            viz.drawPoint(smallPts[2][0], smallPts[2][1], viz.colors.teal, "C'", 4);

                            // Ratios display
                            var yBase = viz.height - 90;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('Side ratios (small / large):', viz.width / 2, yBase);
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText("A'B'/AB = " + sABs.toFixed(2) + '/' + sAB.toFixed(2) + ' = ' + (sABs / sAB).toFixed(3), viz.width / 2, yBase + 20);
                            ctx.fillText("B'C'/BC = " + sBCs.toFixed(2) + '/' + sBC.toFixed(2) + ' = ' + (sBCs / sBC).toFixed(3), viz.width / 2, yBase + 38);
                            ctx.fillText("C'A'/CA = " + sCAs.toFixed(2) + '/' + sCA.toFixed(2) + ' = ' + (sCAs / sCA).toFixed(3), viz.width / 2, yBase + 56);
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.fillText('k = ' + k.toFixed(2) + '  (all ratios equal)', viz.width / 2, yBase + 78);

                            viz.drawDraggables();
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                },
                {
                    id: 'viz-aa-similarity',
                    title: 'AA Similarity in Action',
                    description: 'Set two angles for each triangle. When two angles match, the triangles are similar regardless of size.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 25, originX: 200, originY: 300, height: 380 });
                        var angle1 = 50;
                        var angle2 = 60;
                        var size1 = 5;
                        var size2 = 3;

                        VizEngine.createSlider(controls, 'Angle 1 (\u00B0)', 20, 80, 50, 1, function(val) { angle1 = val; draw(); });
                        VizEngine.createSlider(controls, 'Angle 2 (\u00B0)', 20, 80, 60, 1, function(val) { angle2 = val; draw(); });
                        VizEngine.createSlider(controls, 'Size 1', 2, 8, 5, 0.5, function(val) { size1 = val; draw(); });
                        VizEngine.createSlider(controls, 'Size 2', 1, 6, 3, 0.5, function(val) { size2 = val; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Ensure angles are valid
                            var a3 = 180 - angle1 - angle2;
                            if (a3 <= 0) {
                                viz.screenText('Angles must sum to less than 180\u00B0', viz.width / 2, viz.height / 2, viz.colors.red, 16);
                                return;
                            }

                            // Build triangle 1 using law of sines
                            var rad1 = angle1 * Math.PI / 180;
                            var rad2 = angle2 * Math.PI / 180;
                            var rad3 = a3 * Math.PI / 180;

                            // Triangle 1
                            var base1 = size1;
                            var tri1 = [[0, 0], [base1, 0]];
                            var c1x = base1 * Math.sin(rad2) / Math.sin(rad3) * Math.cos(rad1);
                            var c1y = base1 * Math.sin(rad2) / Math.sin(rad3) * Math.sin(rad1);
                            tri1.push([c1x, c1y]);

                            // Triangle 2 offset to the right
                            var offsetX = 10;
                            var base2 = size2;
                            var tri2 = [[offsetX, 0], [offsetX + base2, 0]];
                            var c2x = offsetX + base2 * Math.sin(rad2) / Math.sin(rad3) * Math.cos(rad1);
                            var c2y = base2 * Math.sin(rad2) / Math.sin(rad3) * Math.sin(rad1);
                            tri2.push([c2x, c2y]);

                            // Draw both
                            viz.drawPolygon(tri1, viz.colors.blue + '33', viz.colors.blue, 2);
                            viz.drawPolygon(tri2, viz.colors.teal + '33', viz.colors.teal, 2);

                            // Angle labels
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';

                            // Triangle 1 angles
                            ctx.fillStyle = viz.colors.yellow;
                            var a1s = viz.toScreen(0.8, 0.3);
                            ctx.fillText(angle1 + '\u00B0', a1s[0], a1s[1]);
                            var a2s = viz.toScreen(base1 - 0.8, 0.3);
                            ctx.fillText(angle2 + '\u00B0', a2s[0], a2s[1]);
                            var a3s = viz.toScreen(c1x + 0.2, c1y - 0.3);
                            ctx.fillText(a3 + '\u00B0', a3s[0], a3s[1]);

                            // Triangle 2 angles
                            var b1s = viz.toScreen(offsetX + 0.6, 0.3);
                            ctx.fillText(angle1 + '\u00B0', b1s[0], b1s[1]);
                            var b2s = viz.toScreen(offsetX + base2 - 0.6, 0.3);
                            ctx.fillText(angle2 + '\u00B0', b2s[0], b2s[1]);
                            var b3s = viz.toScreen(c2x + 0.2, c2y - 0.3);
                            ctx.fillText(a3 + '\u00B0', b3s[0], b3s[1]);

                            // Similarity statement
                            var ratio = size2 / size1;
                            viz.screenText('AA Similarity: same angles \u21D2 similar triangles', viz.width / 2, 20, viz.colors.white, 14);
                            viz.screenText('Scale factor k = ' + ratio.toFixed(2), viz.width / 2, 42, viz.colors.yellow, 14);
                            viz.screenText('Angles: ' + angle1 + '\u00B0, ' + angle2 + '\u00B0, ' + a3 + '\u00B0', viz.width / 2, viz.height - 15, viz.colors.text, 13);
                        }

                        draw();
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'Two triangles have angles \\(40^\\circ\\), \\(60^\\circ\\), \\(80^\\circ\\) and \\(40^\\circ\\), \\(60^\\circ\\), \\(80^\\circ\\). Are they similar?',
                    hint: 'Check AA similarity.',
                    solution: 'Yes. By AA similarity, two pairs of congruent angles (all three, in fact) guarantee the triangles are similar.'
                },
                {
                    question: 'Triangle \\(ABC\\) has sides 6, 8, 10 and triangle \\(DEF\\) has sides 9, 12, 15. Find the scale factor and verify similarity.',
                    hint: 'Compute the ratio of corresponding sides.',
                    solution: 'Ratios: \\(9/6 = 12/8 = 15/10 = 1.5\\). All ratios are equal, so the triangles are similar with \\(k = 1.5\\).'
                },
                {
                    question: 'Two similar triangles have a perimeter ratio of 3:5. If the smaller triangle has area 27, find the area of the larger.',
                    hint: 'If perimeter ratio is \\(k\\), area ratio is \\(k^2\\).',
                    solution: '\\(k = 5/3\\). Area ratio \\(= (5/3)^2 = 25/9\\). Larger area \\(= 27 \\times 25/9 = 75\\).'
                },
                {
                    question: 'A figure is translated by \\(\\langle 3, -2 \\rangle\\), then dilated from the origin by factor 2. Is the image similar to the original? Congruent?',
                    hint: 'A similarity transformation = rigid motion + dilation.',
                    solution: 'The image is similar (same angles, sides scaled by 2) but not congruent (different size). The composition is a similarity transformation with \\(k = 2\\).'
                },
                {
                    question: 'Describe a sequence of transformations that maps a triangle with vertices \\((0,0), (2,0), (1,3)\\) to one with vertices \\((4,2), (8,2), (6,8)\\).',
                    hint: 'Compare side lengths to find the scale factor, then figure out the translation.',
                    solution: 'The second triangle has sides \\(4, 2\\sqrt{10}, 2\\sqrt{10}\\) and the first has \\(2, \\sqrt{10}, \\sqrt{10}\\), so \\(k = 2\\). Dilate by 2 from origin: \\((0,0) \\to (0,0), (2,0) \\to (4,0), (1,3) \\to (2,6)\\). Then translate by \\(\\langle 4, 2 \\rangle\\): \\((0,0) \\to (4,2), (4,0) \\to (8,2), (2,6) \\to (6,8)\\). So: dilate by 2, then translate by \\(\\langle 4, 2 \\rangle\\).'
                }
            ]
        }
    ]
});
