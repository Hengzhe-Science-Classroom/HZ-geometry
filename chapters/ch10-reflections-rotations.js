window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch10',
    number: 10,
    title: 'Reflections & Rotations',
    subtitle: 'Reflecting shapes over lines, rotating about points, and composing rigid transformations',
    sections: [
        // ============================================================
        // SECTION 1: Reflections over a Line
        // ============================================================
        {
            id: 'ch10-sec01',
            title: 'Reflections over a Line',
            content: `<h2>Reflections over a Line</h2>

                <div class="env-block intuition">
                    <div class="env-title">The Big Picture</div>
                    <div class="env-body"><p>A reflection is a "mirror image" transformation. Every point is flipped to the opposite side of a line (the <strong>line of reflection</strong>), at the same distance from the line. Reflections preserve lengths and angles, but reverse orientation (turning clockwise figures into counterclockwise ones).</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Reflection)</div>
                    <div class="env-body"><p>A <strong>reflection</strong> across line \\(\\ell\\) maps each point \\(P\\) to a point \\(P'\\) such that \\(\\ell\\) is the perpendicular bisector of \\(\\overline{PP'}\\). Points on \\(\\ell\\) are fixed.</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Common Reflections in the Coordinate Plane</div>
                    <div class="env-body">
                    <ul>
                        <li>Reflection over the \\(x\\)-axis: \\((x, y) \\to (x, -y)\\)</li>
                        <li>Reflection over the \\(y\\)-axis: \\((x, y) \\to (-x, y)\\)</li>
                        <li>Reflection over \\(y = x\\): \\((x, y) \\to (y, x)\\)</li>
                        <li>Reflection over \\(y = -x\\): \\((x, y) \\to (-y, -x)\\)</li>
                    </ul>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-reflection"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>Reflect the point \\((3, 4)\\) over the \\(x\\)-axis.</p>
                    <p>The image is \\((3, -4)\\).</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>Reflect the triangle with vertices \\((1, 2)\\), \\((4, 2)\\), \\((3, 5)\\) over the \\(y\\)-axis.</p>
                    <p>The image has vertices \\((-1, 2)\\), \\((-4, 2)\\), \\((-3, 5)\\).</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-reflection-custom"></div>`,

            visualizations: [
                {
                    id: 'viz-reflection',
                    title: 'Reflection over Axes',
                    description: 'Drag the triangle vertices. Choose which axis to reflect over and see the image in real time.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40, originX: 240, originY: 200, height: 380 });
                        var pA = viz.addDraggable('A', 1, 1, viz.colors.blue, 10);
                        var pB = viz.addDraggable('B', 3, 1, viz.colors.blue, 10);
                        var pC = viz.addDraggable('C', 2, 3.5, viz.colors.blue, 10);
                        var reflAxis = 'x';

                        VizEngine.createButton(controls, 'x-axis', function() { reflAxis = 'x'; });
                        VizEngine.createButton(controls, 'y-axis', function() { reflAxis = 'y'; });
                        VizEngine.createButton(controls, 'y = x', function() { reflAxis = 'yx'; });
                        VizEngine.createButton(controls, 'y = -x', function() { reflAxis = 'ynx'; });

                        function reflectPoint(x, y) {
                            if (reflAxis === 'x') return [x, -y];
                            if (reflAxis === 'y') return [-x, y];
                            if (reflAxis === 'yx') return [y, x];
                            if (reflAxis === 'ynx') return [-y, -x];
                            return [x, y];
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            var pts = [[pA.x, pA.y], [pB.x, pB.y], [pC.x, pC.y]];

                            // Draw reflection line
                            if (reflAxis === 'x') {
                                viz.drawLine(-10, 0, 10, 0, viz.colors.yellow, 2);
                            } else if (reflAxis === 'y') {
                                viz.drawLine(0, -10, 0, 10, viz.colors.yellow, 2);
                            } else if (reflAxis === 'yx') {
                                viz.drawLine(-8, -8, 8, 8, viz.colors.yellow, 2);
                            } else {
                                viz.drawLine(-8, 8, 8, -8, viz.colors.yellow, 2);
                            }

                            // Original triangle
                            viz.drawPolygon(pts, viz.colors.blue + '33', viz.colors.blue, 2);

                            // Reflected triangle
                            var rPts = [];
                            for (var i = 0; i < 3; i++) {
                                rPts.push(reflectPoint(pts[i][0], pts[i][1]));
                            }
                            viz.drawPolygon(rPts, viz.colors.red + '33', viz.colors.red, 2);

                            // Dashed connecting lines
                            for (var j = 0; j < 3; j++) {
                                viz.drawSegment(pts[j][0], pts[j][1], rPts[j][0], rPts[j][1], viz.colors.text, 1, true);
                            }

                            // Labels
                            var labels = ['A', 'B', 'C'];
                            for (var k = 0; k < 3; k++) {
                                viz.drawPoint(pts[k][0], pts[k][1], viz.colors.blue, labels[k], 5);
                                viz.drawPoint(rPts[k][0], rPts[k][1], viz.colors.red, labels[k] + "'", 5);
                            }

                            // Info
                            var lineLabel = reflAxis === 'x' ? 'x-axis' : reflAxis === 'y' ? 'y-axis' : reflAxis === 'yx' ? 'y = x' : 'y = -x';
                            viz.screenText('Reflection over ' + lineLabel, viz.width / 2, 20, viz.colors.yellow, 15);

                            viz.drawDraggables();
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                },
                {
                    id: 'viz-reflection-custom',
                    title: 'Reflection over Any Line',
                    description: 'Drag the line endpoints to set a custom reflection line. The triangle reflects in real time.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40, originX: 240, originY: 200, height: 380 });

                        var lineP1 = viz.addDraggable('L1', -3, -2, viz.colors.yellow, 8);
                        var lineP2 = viz.addDraggable('L2', 2, 4, viz.colors.yellow, 8);

                        var triA = viz.addDraggable('A', 1, 1, viz.colors.blue, 10);
                        var triB = viz.addDraggable('B', 3, 0.5, viz.colors.blue, 10);
                        var triC = viz.addDraggable('C', 2, 3, viz.colors.blue, 10);

                        function reflectOverLine(px, py, lx1, ly1, lx2, ly2) {
                            var dx = lx2 - lx1, dy = ly2 - ly1;
                            var lenSq = dx * dx + dy * dy;
                            if (lenSq < 1e-10) return [px, py];
                            var t = ((px - lx1) * dx + (py - ly1) * dy) / lenSq;
                            var footX = lx1 + t * dx;
                            var footY = ly1 + t * dy;
                            return [2 * footX - px, 2 * footY - py];
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            var lx1 = lineP1.x, ly1 = lineP1.y;
                            var lx2 = lineP2.x, ly2 = lineP2.y;

                            // Reflection line (extended)
                            viz.drawLine(lx1, ly1, lx2, ly2, viz.colors.yellow, 2);

                            // Original triangle
                            var pts = [[triA.x, triA.y], [triB.x, triB.y], [triC.x, triC.y]];
                            viz.drawPolygon(pts, viz.colors.blue + '33', viz.colors.blue, 2);

                            // Reflected triangle
                            var rPts = [];
                            for (var i = 0; i < 3; i++) {
                                var ref = reflectOverLine(pts[i][0], pts[i][1], lx1, ly1, lx2, ly2);
                                rPts.push(ref);
                            }
                            viz.drawPolygon(rPts, viz.colors.red + '33', viz.colors.red, 2);

                            // Connecting lines
                            for (var j = 0; j < 3; j++) {
                                viz.drawSegment(pts[j][0], pts[j][1], rPts[j][0], rPts[j][1], viz.colors.text, 1, true);
                            }

                            // Labels
                            var labels = ['A', 'B', 'C'];
                            for (var k = 0; k < 3; k++) {
                                viz.drawPoint(pts[k][0], pts[k][1], viz.colors.blue, labels[k], 5);
                                viz.drawPoint(rPts[k][0], rPts[k][1], viz.colors.red, labels[k] + "'", 5);
                            }

                            // Line control points
                            viz.drawPoint(lx1, ly1, viz.colors.yellow, '', 6);
                            viz.drawPoint(lx2, ly2, viz.colors.yellow, '', 6);

                            viz.screenText('Drag yellow points to move the reflection line', viz.width / 2, viz.height - 15, viz.colors.text, 12);
                            viz.drawDraggables();
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'Reflect the point \\((5, -3)\\) over the \\(y\\)-axis.',
                    hint: 'Reflection over the \\(y\\)-axis negates the \\(x\\)-coordinate.',
                    solution: 'The image is \\((-5, -3)\\).'
                },
                {
                    question: 'Reflect the point \\((2, 7)\\) over the line \\(y = x\\).',
                    hint: 'Reflection over \\(y = x\\) swaps coordinates.',
                    solution: 'The image is \\((7, 2)\\).'
                },
                {
                    question: 'A triangle has vertices \\((0, 0)\\), \\((4, 0)\\), and \\((2, 3)\\). Reflect it over the \\(x\\)-axis and find the vertices of the image.',
                    hint: 'Negate the \\(y\\)-coordinates.',
                    solution: 'Image vertices: \\((0, 0)\\), \\((4, 0)\\), \\((2, -3)\\).'
                },
                {
                    question: 'If a point \\(P\\) is on the line of reflection, where does it map to?',
                    hint: 'The line of reflection is the perpendicular bisector of \\(PP\'\\).',
                    solution: 'It maps to itself. Points on the line of reflection are fixed points.'
                },
                {
                    question: 'Reflect \\((-1, 4)\\) over the line \\(y = -x\\).',
                    hint: 'The rule is \\((x,y) \\to (-y, -x)\\).',
                    solution: 'Image: \\((-4, 1)\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Rotations about a Point
        // ============================================================
        {
            id: 'ch10-sec02',
            title: 'Rotations about a Point',
            content: `<h2>Rotations about a Point</h2>

                <div class="env-block definition">
                    <div class="env-title">Definition (Rotation)</div>
                    <div class="env-body"><p>A <strong>rotation</strong> of angle \\(\\theta\\) about center \\(O\\) maps each point \\(P\\) to a point \\(P'\\) such that \\(OP = OP'\\) and \\(\\angle POP' = \\theta\\). Positive angles rotate counterclockwise; negative angles rotate clockwise.</p></div>
                </div>

                <div class="env-block theorem">
                    <div name="env-title">Rotation Formulas</div>
                    <div class="env-body"><p>Rotation by angle \\(\\theta\\) about the origin:
                    \\[\\begin{pmatrix} x' \\\\ y' \\end{pmatrix} = \\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix} \\begin{pmatrix} x \\\\ y \\end{pmatrix}.\\]</p>
                    <p>Common cases:</p>
                    <ul>
                        <li>\\(90^\\circ\\): \\((x, y) \\to (-y, x)\\)</li>
                        <li>\\(180^\\circ\\): \\((x, y) \\to (-x, -y)\\)</li>
                        <li>\\(270^\\circ\\): \\((x, y) \\to (y, -x)\\)</li>
                    </ul></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-rotation"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>Rotate the point \\((3, 1)\\) by \\(90^\\circ\\) counterclockwise about the origin.</p>
                    <p>\\((x', y') = (-1, 3)\\).</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>Rotate \\((2, 5)\\) by \\(180^\\circ\\) about the origin.</p>
                    <p>\\((x', y') = (-2, -5)\\).</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-rotation',
                    title: 'Interactive Rotation',
                    description: 'Drag the shape and adjust the rotation angle. The center of rotation can also be dragged.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 35, originX: 240, originY: 210, height: 400 });
                        var angleDeg = 90;
                        var center = viz.addDraggable('O', 0, 0, viz.colors.red, 10);
                        var triA = viz.addDraggable('A', 2, 1, viz.colors.blue, 10);
                        var triB = viz.addDraggable('B', 4, 0.5, viz.colors.blue, 10);
                        var triC = viz.addDraggable('C', 3, 3, viz.colors.blue, 10);

                        VizEngine.createSlider(controls, 'Angle (\u00B0)', -360, 360, 90, 5, function(val) {
                            angleDeg = val;
                        });

                        function rotatePoint(px, py, cx, cy, angle) {
                            var rad = angle * Math.PI / 180;
                            var dx = px - cx, dy = py - cy;
                            var rx = dx * Math.cos(rad) - dy * Math.sin(rad);
                            var ry = dx * Math.sin(rad) + dy * Math.cos(rad);
                            return [cx + rx, cy + ry];
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            var pts = [[triA.x, triA.y], [triB.x, triB.y], [triC.x, triC.y]];
                            var cx = center.x, cy = center.y;

                            // Original
                            viz.drawPolygon(pts, viz.colors.blue + '33', viz.colors.blue, 2);

                            // Rotated
                            var rPts = [];
                            for (var i = 0; i < 3; i++) {
                                rPts.push(rotatePoint(pts[i][0], pts[i][1], cx, cy, angleDeg));
                            }
                            viz.drawPolygon(rPts, viz.colors.teal + '33', viz.colors.teal, 2);

                            // Rotation arcs from center to each pair
                            for (var j = 0; j < 3; j++) {
                                var d = Math.sqrt((pts[j][0] - cx) * (pts[j][0] - cx) + (pts[j][1] - cy) * (pts[j][1] - cy));
                                if (d > 0.1) {
                                    var startAngle = Math.atan2(pts[j][1] - cy, pts[j][0] - cx);
                                    var endAngle = startAngle + angleDeg * Math.PI / 180;
                                    var cs = viz.toScreen(cx, cy);
                                    ctx.strokeStyle = viz.colors.yellow + '55';
                                    ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    if (angleDeg >= 0) {
                                        ctx.arc(cs[0], cs[1], d * viz.scale, -startAngle, -endAngle, true);
                                    } else {
                                        ctx.arc(cs[0], cs[1], d * viz.scale, -startAngle, -endAngle, false);
                                    }
                                    ctx.stroke();
                                }
                            }

                            // Labels
                            var labels = ['A', 'B', 'C'];
                            for (var k = 0; k < 3; k++) {
                                viz.drawPoint(pts[k][0], pts[k][1], viz.colors.blue, labels[k], 5);
                                viz.drawPoint(rPts[k][0], rPts[k][1], viz.colors.teal, labels[k] + "'", 5);
                            }

                            // Center
                            viz.drawPoint(cx, cy, viz.colors.red, 'O', 7);

                            // Info
                            viz.screenText('Rotation: ' + angleDeg + '\u00B0 about O(' + cx.toFixed(1) + ', ' + cy.toFixed(1) + ')', viz.width / 2, viz.height - 15, viz.colors.white, 14);

                            viz.drawDraggables();
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                },
                {
                    id: 'viz-rotation-trace',
                    title: 'Rotation Trace',
                    description: 'Watch a shape rotate smoothly. The trace shows the circular path of each vertex.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 35, originX: 240, originY: 210, height: 380 });
                        var animAngle = 0;
                        var speed = 1;
                        var running = false;

                        VizEngine.createButton(controls, 'Start/Stop', function() { running = !running; });
                        VizEngine.createSlider(controls, 'Speed', 0.2, 5, 1, 0.2, function(val) { speed = val; });

                        var triPts = [[2, 1], [4, 0], [3, 3]];

                        function draw(t) {
                            if (running) {
                                animAngle += speed;
                                if (animAngle > 360) animAngle -= 360;
                            }

                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();
                            var ctx = viz.ctx;
                            var rad = animAngle * Math.PI / 180;

                            // Circular paths
                            for (var i = 0; i < 3; i++) {
                                var d = Math.sqrt(triPts[i][0] * triPts[i][0] + triPts[i][1] * triPts[i][1]);
                                viz.drawCircle(0, 0, d, null, viz.colors.axis + '33', 1);
                            }

                            // Original (faint)
                            viz.drawPolygon(triPts, viz.colors.blue + '11', viz.colors.blue + '33', 1);

                            // Rotated
                            var rPts = [];
                            for (var j = 0; j < 3; j++) {
                                var x = triPts[j][0], y = triPts[j][1];
                                rPts.push([
                                    x * Math.cos(rad) - y * Math.sin(rad),
                                    x * Math.sin(rad) + y * Math.cos(rad)
                                ]);
                            }
                            viz.drawPolygon(rPts, viz.colors.teal + '44', viz.colors.teal, 2);

                            // Center
                            viz.drawPoint(0, 0, viz.colors.red, 'O', 6);

                            // Labels
                            var labels = ['A', 'B', 'C'];
                            var colors = [viz.colors.blue, viz.colors.green, viz.colors.purple];
                            for (var k = 0; k < 3; k++) {
                                viz.drawPoint(rPts[k][0], rPts[k][1], colors[k], labels[k], 5);
                            }

                            viz.screenText('\u03B8 = ' + animAngle.toFixed(0) + '\u00B0', viz.width / 2, 25, viz.colors.yellow, 16);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'Rotate the point \\((4, 2)\\) by \\(90^\\circ\\) counterclockwise about the origin.',
                    hint: 'Use the rule \\((x, y) \\to (-y, x)\\).',
                    solution: 'Image: \\((-2, 4)\\).'
                },
                {
                    question: 'Rotate \\((-3, 5)\\) by \\(180^\\circ\\) about the origin.',
                    hint: '\\(180^\\circ\\) rotation: \\((x, y) \\to (-x, -y)\\).',
                    solution: 'Image: \\((3, -5)\\).'
                },
                {
                    question: 'Rotate \\((1, 0)\\) by \\(270^\\circ\\) counterclockwise about the origin.',
                    hint: '\\(270^\\circ\\) CCW = \\(90^\\circ\\) clockwise: \\((x, y) \\to (y, -x)\\).',
                    solution: 'Image: \\((0, -1)\\).'
                },
                {
                    question: 'A triangle has vertices \\((0, 0)\\), \\((3, 0)\\), and \\((3, 4)\\). Rotate it \\(90^\\circ\\) counterclockwise about the origin. Find the new vertices.',
                    hint: 'Apply \\((x, y) \\to (-y, x)\\) to each vertex.',
                    solution: 'New vertices: \\((0, 0)\\), \\((0, 3)\\), \\((-4, 3)\\).'
                },
                {
                    question: 'What rotation maps \\((5, 0)\\) to \\((0, -5)\\)?',
                    hint: 'The point moved from the positive \\(x\\)-axis to the negative \\(y\\)-axis.',
                    solution: 'This is a \\(90^\\circ\\) clockwise rotation (or \\(270^\\circ\\) counterclockwise) about the origin.'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Composition of Transformations
        // ============================================================
        {
            id: 'ch10-sec03',
            title: 'Composition of Transformations',
            content: `<h2>Composition of Transformations</h2>

                <div class="env-block intuition">
                    <div class="env-title">The Big Picture</div>
                    <div class="env-body"><p>Composing two transformations means applying one after the other. The order matters! Two reflections over parallel lines produce a translation; two reflections over intersecting lines produce a rotation. These results connect different types of transformations in a beautiful way.</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Composition Theorems</div>
                    <div class="env-body">
                    <ul>
                        <li><strong>Two reflections over parallel lines</strong> (distance \\(d\\) apart) = translation by \\(2d\\) perpendicular to the lines.</li>
                        <li><strong>Two reflections over intersecting lines</strong> (angle \\(\\alpha\\) between them) = rotation by \\(2\\alpha\\) about the intersection point.</li>
                        <li><strong>Three reflections</strong> = a glide reflection (translation + reflection).</li>
                    </ul>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-composition"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>Reflect \\((2, 3)\\) over the \\(x\\)-axis, then over the \\(y\\)-axis. What single transformation achieves the same result?</p>
                    <p>Step 1: \\((2, 3) \\to (2, -3)\\). Step 2: \\((2, -3) \\to (-2, -3)\\).</p>
                    <p>This is the same as a \\(180^\\circ\\) rotation about the origin.</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-composition',
                    title: 'Composition of Two Reflections',
                    description: 'See how reflecting over two lines produces either a translation (parallel lines) or a rotation (intersecting lines).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 35, originX: 240, originY: 210, height: 400 });
                        var mode = 'intersect'; // 'parallel' or 'intersect'
                        var lineAngle = 30;
                        var lineSep = 2;

                        VizEngine.createButton(controls, 'Parallel Lines', function() { mode = 'parallel'; });
                        VizEngine.createButton(controls, 'Intersecting Lines', function() { mode = 'intersect'; });
                        VizEngine.createSlider(controls, 'Angle/Sep', 0, 90, 30, 5, function(val) {
                            lineAngle = val;
                            lineSep = val / 15;
                        });

                        var triPts = [[1, 1], [3, 1], [2, 3]];

                        function reflectOverLine(px, py, lx1, ly1, lx2, ly2) {
                            var dx = lx2 - lx1, dy = ly2 - ly1;
                            var lenSq = dx * dx + dy * dy;
                            if (lenSq < 1e-10) return [px, py];
                            var t = ((px - lx1) * dx + (py - ly1) * dy) / lenSq;
                            var footX = lx1 + t * dx;
                            var footY = ly1 + t * dy;
                            return [2 * footX - px, 2 * footY - py];
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            var line1p1, line1p2, line2p1, line2p2;

                            if (mode === 'parallel') {
                                var sep = Math.max(0.5, lineSep);
                                line1p1 = [-sep / 2, -6]; line1p2 = [-sep / 2, 6];
                                line2p1 = [sep / 2, -6]; line2p2 = [sep / 2, 6];
                            } else {
                                var ang1 = 0;
                                var ang2 = lineAngle * Math.PI / 180;
                                line1p1 = [-8 * Math.cos(ang1), -8 * Math.sin(ang1)];
                                line1p2 = [8 * Math.cos(ang1), 8 * Math.sin(ang1)];
                                line2p1 = [-8 * Math.cos(ang2), -8 * Math.sin(ang2)];
                                line2p2 = [8 * Math.cos(ang2), 8 * Math.sin(ang2)];
                            }

                            // Draw lines
                            viz.drawLine(line1p1[0], line1p1[1], line1p2[0], line1p2[1], viz.colors.yellow, 2);
                            viz.drawLine(line2p1[0], line2p1[1], line2p2[0], line2p2[1], viz.colors.pink, 2);

                            // Original
                            viz.drawPolygon(triPts, viz.colors.blue + '33', viz.colors.blue, 2);

                            // First reflection
                            var mid1 = [];
                            for (var i = 0; i < 3; i++) {
                                mid1.push(reflectOverLine(triPts[i][0], triPts[i][1], line1p1[0], line1p1[1], line1p2[0], line1p2[1]));
                            }
                            viz.drawPolygon(mid1, viz.colors.orange + '22', viz.colors.orange, 1.5);

                            // Second reflection
                            var final1 = [];
                            for (var j = 0; j < 3; j++) {
                                final1.push(reflectOverLine(mid1[j][0], mid1[j][1], line2p1[0], line2p1[1], line2p2[0], line2p2[1]));
                            }
                            viz.drawPolygon(final1, viz.colors.teal + '33', viz.colors.teal, 2);

                            // Labels
                            var labels = ['A', 'B', 'C'];
                            for (var k = 0; k < 3; k++) {
                                viz.drawPoint(triPts[k][0], triPts[k][1], viz.colors.blue, labels[k], 4);
                                viz.drawPoint(mid1[k][0], mid1[k][1], viz.colors.orange, '', 3);
                                viz.drawPoint(final1[k][0], final1[k][1], viz.colors.teal, labels[k] + "''", 4);
                            }

                            if (mode === 'parallel') {
                                viz.screenText('Two reflections over parallel lines = Translation', viz.width / 2, viz.height - 40, viz.colors.white, 14);
                                viz.screenText('Translation distance = 2 \u00D7 ' + lineSep.toFixed(1) + ' = ' + (2 * lineSep).toFixed(1), viz.width / 2, viz.height - 18, viz.colors.teal, 13);
                            } else {
                                viz.screenText('Two reflections over intersecting lines = Rotation', viz.width / 2, viz.height - 40, viz.colors.white, 14);
                                viz.screenText('Rotation angle = 2 \u00D7 ' + lineAngle + '\u00B0 = ' + (2 * lineAngle) + '\u00B0', viz.width / 2, viz.height - 18, viz.colors.teal, 13);

                                // Show angle between lines
                                ctx.strokeStyle = viz.colors.white;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.arc(viz.originX, viz.originY, 20, 0, -lineAngle * Math.PI / 180, true);
                                ctx.stroke();
                            }

                            // Legend
                            viz.screenText('Blue = original', 30, 20, viz.colors.blue, 11, 'left');
                            viz.screenText('Orange = after 1st reflection', 30, 38, viz.colors.orange, 11, 'left');
                            viz.screenText('Teal = after 2nd reflection', 30, 56, viz.colors.teal, 11, 'left');
                        }

                        draw();
                        VizEngine.createSlider(controls, 'Update', 0, 1, 0, 0.01, function() { draw(); });
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'Reflect \\((1, 4)\\) over the \\(x\\)-axis, then over the \\(y\\)-axis. What is the final image?',
                    hint: 'Apply each reflection in sequence.',
                    solution: 'Step 1: \\((1, 4) \\to (1, -4)\\). Step 2: \\((1, -4) \\to (-1, -4)\\). This equals a \\(180^\\circ\\) rotation.'
                },
                {
                    question: 'Two parallel reflection lines are 5 units apart. What is the resulting translation distance?',
                    hint: 'Translation distance = twice the distance between the parallel lines.',
                    solution: 'The translation distance is \\(2 \\times 5 = 10\\) units, perpendicular to the lines.'
                },
                {
                    question: 'Two reflection lines intersect at a \\(45^\\circ\\) angle. What rotation does their composition produce?',
                    hint: 'Rotation angle = twice the angle between lines.',
                    solution: 'The composition is a \\(2 \\times 45^\\circ = 90^\\circ\\) rotation about the intersection point.'
                },
                {
                    question: 'Is the composition of two reflections always a rotation? Explain.',
                    hint: 'Consider both the case of parallel and intersecting lines.',
                    solution: 'No. If the lines are parallel, the composition is a translation (not a rotation). If the lines intersect, the composition is a rotation. So it depends on whether the lines are parallel or not.'
                }
            ]
        }
    ]
});
