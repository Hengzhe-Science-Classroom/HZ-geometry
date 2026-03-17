// === Chapter 12: Symmetry & Tessellations ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch12',
    number: 12,
    title: 'Symmetry & Tessellations',
    subtitle: 'Lines of symmetry, rotational symmetry, and how shapes tile the plane',
    sections: [
        // ============================================================
        // SECTION 1: Line Symmetry
        // ============================================================
        {
            id: 'ch12-sec01',
            title: 'Line Symmetry',
            content: `<h2>Line Symmetry</h2>

<div class="env-block intuition">
<div class="env-title">The Big Picture</div>
<div class="env-body"><p>Symmetry is one of the most powerful ideas in all of geometry. When a figure has <strong>line symmetry</strong>, one half is a mirror image of the other. Recognizing symmetry lets you cut your work in half: if you know one side of a symmetric figure, you know both.</p></div>
</div>

<div class="env-block definition">
<div class="env-title">Definition (Line of Symmetry)</div>
<div class="env-body"><p>A <strong>line of symmetry</strong> (or <strong>axis of symmetry</strong>, or <strong>mirror line</strong>) of a figure is a line \\(\\ell\\) such that reflecting the figure across \\(\\ell\\) maps it onto itself. Equivalently, for every point \\(P\\) on the figure, its mirror image \\(P'\\) across \\(\\ell\\) is also on the figure.</p></div>
</div>

<h3>Examples of Line Symmetry</h3>
<ul>
<li>An <strong>isosceles triangle</strong> has exactly 1 line of symmetry (the perpendicular bisector of the base).</li>
<li>An <strong>equilateral triangle</strong> has 3 lines of symmetry.</li>
<li>A <strong>square</strong> has 4 lines of symmetry (2 through opposite midpoints, 2 through opposite vertices).</li>
<li>A <strong>regular \\(n\\)-gon</strong> has exactly \\(n\\) lines of symmetry.</li>
<li>A <strong>circle</strong> has infinitely many lines of symmetry (every diameter).</li>
</ul>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body"><p>A rectangle that is not a square has exactly 2 lines of symmetry: one horizontal through the midpoints of the top and bottom sides, and one vertical through the midpoints of the left and right sides. The diagonals are <em>not</em> lines of symmetry (reflecting across a diagonal produces a different shape unless the rectangle is a square).</p></div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem (Symmetry Line and Perpendicular Bisector)</div>
<div class="env-body"><p>If a figure has a line of symmetry \\(\\ell\\), then for any point \\(P\\) not on \\(\\ell\\), the segment \\(\\overline{PP'}\\) (where \\(P'\\) is the reflection of \\(P\\)) is perpendicular to \\(\\ell\\) and bisected by \\(\\ell\\).</p></div>
</div>

<div class="env-block warning">
<div class="env-title">Common Mistake</div>
<div class="env-body"><p>A parallelogram (that is not a rectangle) has no lines of symmetry, even though it "looks balanced." The diagonals of a general parallelogram do not act as mirror lines.</p></div>
</div>

<div class="viz-placeholder" data-viz="viz-line-symmetry"></div>

<div class="viz-placeholder" data-viz="viz-symmetry-checker"></div>`,

            visualizations: [
                {
                    id: 'viz-line-symmetry',
                    title: 'Interactive Mirror Line',
                    description: 'Drag the vertices of the polygon. The dashed line is the proposed line of symmetry. Points and their reflections are shown.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40 });
                        var p1 = viz.addDraggable('p1', -2, 2, viz.colors.blue, 8);
                        var p2 = viz.addDraggable('p2', 0, 3, viz.colors.blue, 8);
                        var p3 = viz.addDraggable('p3', 2, 2, viz.colors.blue, 8);
                        var p4 = viz.addDraggable('p4', 0, -1, viz.colors.blue, 8);
                        var mA = viz.addDraggable('mA', 0, -4, viz.colors.yellow, 7);
                        var mB = viz.addDraggable('mB', 0, 4, viz.colors.yellow, 7);

                        function reflectPoint(px, py, ax, ay, bx, by) {
                            var dx = bx - ax, dy = by - ay;
                            var len2 = dx * dx + dy * dy;
                            if (len2 < 1e-10) return [px, py];
                            var t = ((px - ax) * dx + (py - ay) * dy) / len2;
                            var fx = ax + t * dx, fy = ay + t * dy;
                            return [2 * fx - px, 2 * fy - py];
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var pts = [[p1.x, p1.y], [p2.x, p2.y], [p3.x, p3.y], [p4.x, p4.y]];
                            viz.drawPolygon(pts, viz.colors.blue + '33', viz.colors.blue, 2);

                            // Draw mirror line
                            viz.drawLine(mA.x, mA.y, mB.x, mB.y, viz.colors.yellow, 2, true);
                            viz.screenText('Mirror line (drag yellow points)', viz.width / 2, 16, viz.colors.yellow, 11);

                            // Draw reflected polygon
                            var reflected = [];
                            for (var i = 0; i < pts.length; i++) {
                                var rp = reflectPoint(pts[i][0], pts[i][1], mA.x, mA.y, mB.x, mB.y);
                                reflected.push(rp);
                            }
                            viz.drawPolygon(reflected, viz.colors.orange + '33', viz.colors.orange, 2);

                            // Draw connection lines
                            for (var j = 0; j < pts.length; j++) {
                                viz.drawSegment(pts[j][0], pts[j][1], reflected[j][0], reflected[j][1], viz.colors.purple + '55', 1, true);
                                viz.drawPoint(reflected[j][0], reflected[j][1], viz.colors.orange, '', 4);
                            }

                            viz.drawDraggables();
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                },
                {
                    id: 'viz-symmetry-checker',
                    title: 'Symmetry Lines of Regular Polygons',
                    description: 'Adjust the number of sides to see all lines of symmetry for a regular polygon.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 50 });
                        var n = 5;
                        var showLines = true;

                        VizEngine.createSlider(controls, 'Sides n', 3, 12, n, 1, function(v) { n = Math.round(v); draw(); });
                        VizEngine.createButton(controls, 'Toggle Lines', function() { showLines = !showLines; draw(); });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            var R = 3;
                            var verts = [];
                            for (var i = 0; i < n; i++) {
                                var angle = (2 * Math.PI * i / n) - Math.PI / 2;
                                verts.push([R * Math.cos(angle), R * Math.sin(angle)]);
                            }
                            viz.drawPolygon(verts, viz.colors.blue + '33', viz.colors.blue, 2);

                            // Draw vertices
                            for (var j = 0; j < n; j++) {
                                viz.drawPoint(verts[j][0], verts[j][1], viz.colors.teal, '', 4);
                            }

                            if (showLines) {
                                // Lines of symmetry for regular n-gon
                                for (var k = 0; k < n; k++) {
                                    var angle1 = (2 * Math.PI * k / n) - Math.PI / 2;
                                    var lx = (R + 1) * Math.cos(angle1);
                                    var ly = (R + 1) * Math.sin(angle1);
                                    if (n % 2 === 1) {
                                        // Odd: vertex to midpoint of opposite side
                                        viz.drawLine(verts[k][0], verts[k][1], lx * -1, ly * -1, viz.colors.orange + 'aa', 1, true);
                                    } else {
                                        // Even: vertex-vertex and midpoint-midpoint
                                        var oppIdx = (k + n / 2) % n;
                                        viz.drawLine(verts[k][0], verts[k][1], verts[oppIdx][0], verts[oppIdx][1], viz.colors.orange + 'aa', 1, true);
                                    }
                                }
                                // For even n, also draw midpoint-midpoint lines
                                if (n % 2 === 0) {
                                    for (var m = 0; m < n / 2; m++) {
                                        var mx1 = (verts[m][0] + verts[(m + 1) % n][0]) / 2;
                                        var my1 = (verts[m][1] + verts[(m + 1) % n][1]) / 2;
                                        var oppM = (m + n / 2) % n;
                                        var mx2 = (verts[oppM][0] + verts[(oppM + 1) % n][0]) / 2;
                                        var my2 = (verts[oppM][1] + verts[(oppM + 1) % n][1]) / 2;
                                        viz.drawLine(mx1, my1, mx2, my2, viz.colors.yellow + 'aa', 1, true);
                                    }
                                }
                            }

                            viz.screenText('Regular ' + n + '-gon: ' + n + ' lines of symmetry', viz.width / 2, viz.height - 14, viz.colors.white, 13);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'How many lines of symmetry does an equilateral triangle have? Describe each one.',
                    hint: 'Each line connects a vertex to the midpoint of the opposite side.',
                    solution: 'An equilateral triangle has 3 lines of symmetry. Each line passes through one vertex and the midpoint of the opposite side.'
                },
                {
                    question: 'Does a rhombus always have line symmetry? If so, how many lines?',
                    hint: 'Think about the diagonals of a rhombus.',
                    solution: 'Yes. A rhombus has 2 lines of symmetry: both diagonals. Each diagonal reflects the rhombus onto itself because the diagonals are perpendicular bisectors of each other.'
                },
                {
                    question: 'A regular hexagon has how many lines of symmetry? A regular octagon?',
                    hint: 'A regular \\(n\\)-gon has \\(n\\) lines of symmetry.',
                    solution: 'A regular hexagon has 6 lines of symmetry. A regular octagon has 8. In general, a regular \\(n\\)-gon has \\(n\\) lines of symmetry.'
                },
                {
                    question: 'The letter "A" (in a standard sans-serif font) has how many lines of symmetry? What about "H"?',
                    hint: 'Think about horizontal and vertical mirror lines for each letter.',
                    solution: '"A" has 1 line of symmetry (a vertical line through the middle). "H" has 2 lines of symmetry (one vertical, one horizontal).'
                },
                {
                    question: 'Prove that if a triangle has two lines of symmetry, it must be equilateral.',
                    hint: 'Each line of symmetry in a triangle must pass through a vertex and the midpoint of the opposite side. Two such lines force two pairs of equal sides.',
                    solution: 'Let the two lines of symmetry pass through vertices \\(A\\) and \\(B\\) respectively. The line through \\(A\\) forces \\(AB = AC\\), and the line through \\(B\\) forces \\(BA = BC\\). Thus \\(AB = AC = BC\\), so the triangle is equilateral.'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Rotational Symmetry
        // ============================================================
        {
            id: 'ch12-sec02',
            title: 'Rotational Symmetry',
            content: `<h2>Rotational Symmetry</h2>

<div class="env-block definition">
<div class="env-title">Definition (Rotational Symmetry)</div>
<div class="env-body"><p>A figure has <strong>rotational symmetry of order \\(n\\)</strong> if there is a rotation of \\(360^\\circ / n\\) about some center point that maps the figure onto itself. The smallest such positive angle is called the <strong>angle of rotational symmetry</strong>.</p></div>
</div>

<p>Every figure has a trivial rotational symmetry of order 1 (a 360-degree rotation). When we say a figure "has rotational symmetry," we usually mean order \\(n \\geq 2\\).</p>

<h3>Examples</h3>
<ul>
<li>An <strong>equilateral triangle</strong> has rotational symmetry of order 3 (rotations of \\(120^\\circ, 240^\\circ\\)).</li>
<li>A <strong>square</strong> has rotational symmetry of order 4 (rotations of \\(90^\\circ, 180^\\circ, 270^\\circ\\)).</li>
<li>A <strong>regular \\(n\\)-gon</strong> has rotational symmetry of order \\(n\\).</li>
<li>A <strong>circle</strong> has rotational symmetry of every order (any angle works).</li>
</ul>

<div class="env-block theorem">
<div class="env-title">Theorem (Symmetry of Regular Polygons)</div>
<div class="env-body"><p>A regular \\(n\\)-gon has:
<ul>
<li>Rotational symmetry of order \\(n\\) (angles \\(360^\\circ/n, 2 \\times 360^\\circ/n, \\ldots, (n-1) \\times 360^\\circ/n\\)).</li>
<li>Exactly \\(n\\) lines of symmetry.</li>
<li>A total of \\(2n\\) symmetries (including the identity), forming the <strong>dihedral group</strong> \\(D_n\\).</li>
</ul></p></div>
</div>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body"><p>Consider a pinwheel with 5 blades. It has rotational symmetry of order 5 (angle \\(72^\\circ\\)) but no line symmetry, since a reflection would reverse the direction of the blades. Its symmetry group has exactly 5 elements (the 5 rotations).</p></div>
</div>

<div class="env-block definition">
<div class="env-title">Definition (Point Symmetry)</div>
<div class="env-body"><p>A figure has <strong>point symmetry</strong> (or <strong>central symmetry</strong>) if it has rotational symmetry of order 2, i.e., a 180-degree rotation maps it onto itself. The center of this rotation is called the <strong>center of symmetry</strong>.</p></div>
</div>

<p>A parallelogram always has point symmetry about the intersection of its diagonals, but may not have line symmetry.</p>

<div class="viz-placeholder" data-viz="viz-rotational-symmetry"></div>`,

            visualizations: [
                {
                    id: 'viz-rotational-symmetry',
                    title: 'Rotational Symmetry Explorer',
                    description: 'Choose the order of rotational symmetry and watch the shape rotate by that angle. The trail shows the shape maps onto itself.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40 });
                        var n = 5;
                        var angle = 0;
                        var animating = false;
                        var targetAngle = 0;

                        VizEngine.createSlider(controls, 'Order n', 2, 10, n, 1, function(v) {
                            n = Math.round(v);
                            angle = 0; targetAngle = 0;
                            draw();
                        });
                        VizEngine.createButton(controls, 'Rotate by 360/n', function() {
                            if (!animating) {
                                targetAngle = angle + (2 * Math.PI / n);
                                animating = true;
                            }
                        });

                        function getPolygonVerts(sides, radius, rot) {
                            var verts = [];
                            for (var i = 0; i < sides; i++) {
                                var a = (2 * Math.PI * i / sides) - Math.PI / 2 + rot;
                                verts.push([radius * Math.cos(a), radius * Math.sin(a)]);
                            }
                            return verts;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();

                            // Draw static outline (ghost)
                            var ghost = getPolygonVerts(n, 3, 0);
                            viz.drawPolygon(ghost, null, viz.colors.text + '44', 1);

                            // Draw rotated polygon
                            var rotated = getPolygonVerts(n, 3, angle);
                            viz.drawPolygon(rotated, viz.colors.blue + '44', viz.colors.blue, 2);

                            // Mark one vertex specially
                            viz.drawPoint(rotated[0][0], rotated[0][1], viz.colors.orange, 'A', 6);

                            // Draw center
                            viz.drawPoint(0, 0, viz.colors.yellow, 'O', 4);

                            // Draw rotation arc
                            if (Math.abs(angle % (2 * Math.PI)) > 0.01) {
                                var ctx = viz.ctx;
                                var cx = viz.originX, cy = viz.originY;
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.arc(cx, cy, 30, -Math.PI / 2, -Math.PI / 2 - angle, angle > 0);
                                ctx.stroke();
                            }

                            var deg = (angle * 180 / Math.PI) % 360;
                            viz.screenText('Angle: ' + deg.toFixed(1) + ' | Order ' + n + ' | Step = ' + (360 / n).toFixed(1) + ' deg', viz.width / 2, viz.height - 14, viz.colors.white, 12);
                        }

                        viz.animate(function() {
                            if (animating) {
                                var diff = targetAngle - angle;
                                if (Math.abs(diff) < 0.02) {
                                    angle = targetAngle;
                                    animating = false;
                                } else {
                                    angle += diff * 0.08;
                                }
                            }
                            draw();
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'What is the order of rotational symmetry of a regular pentagon? What is the angle of rotation?',
                    hint: 'Divide \\(360^\\circ\\) by the number of sides.',
                    solution: 'A regular pentagon has rotational symmetry of order 5. The angle is \\(360^\\circ / 5 = 72^\\circ\\).'
                },
                {
                    question: 'Does a parallelogram (that is not a rectangle) have rotational symmetry? If so, what order?',
                    hint: 'Try rotating a parallelogram \\(180^\\circ\\) about the intersection of its diagonals.',
                    solution: 'Yes, every parallelogram has rotational symmetry of order 2 (point symmetry). Rotating \\(180^\\circ\\) about the center maps it onto itself.'
                },
                {
                    question: 'A figure has both rotational symmetry of order 3 and a line of symmetry. How many total symmetries does it have?',
                    hint: 'This is the dihedral group \\(D_3\\). Combining rotations and reflections generates all symmetries.',
                    solution: 'It has 6 total symmetries: 3 rotations (including the identity) and 3 reflections. This is the dihedral group \\(D_3\\), with \\(|D_3| = 2 \\times 3 = 6\\).'
                },
                {
                    question: 'The letter "S" has what type of symmetry? The letter "N"?',
                    hint: 'Think about rotating each letter \\(180^\\circ\\).',
                    solution: 'Both "S" and "N" have point symmetry (rotational symmetry of order 2, a \\(180^\\circ\\) rotation). Neither has line symmetry.'
                },
                {
                    question: 'A shape has rotational symmetry of order 6 but no lines of symmetry. Give an example of such a shape.',
                    hint: 'Think of something like a pinwheel or triskele, but with 6 arms.',
                    solution: 'A pinwheel (or "swirl") with 6 curved blades has rotational symmetry of order 6 but no line symmetry. The curved blades have a handedness that is reversed by reflection.'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Tessellations & Tilings
        // ============================================================
        {
            id: 'ch12-sec03',
            title: 'Tessellations & Tilings',
            content: `<h2>Tessellations & Tilings</h2>

<div class="env-block definition">
<div class="env-title">Definition (Tessellation)</div>
<div class="env-body"><p>A <strong>tessellation</strong> (or <strong>tiling</strong>) of the plane is a covering of the entire plane by non-overlapping shapes (called <strong>tiles</strong>) with no gaps. The tiles fit together perfectly edge-to-edge.</p></div>
</div>

<h3>Regular Tessellations</h3>
<p>A <strong>regular tessellation</strong> uses only one type of regular polygon. The key constraint is that the interior angles meeting at each vertex must sum to exactly \\(360^\\circ\\).</p>

<div class="env-block theorem">
<div class="env-title">Theorem (Three Regular Tessellations)</div>
<div class="env-body"><p>There are exactly three regular tessellations of the plane:
<ol>
<li><strong>Equilateral triangles</strong>: each angle is \\(60^\\circ\\), and 6 meet at each vertex (\\(6 \\times 60^\\circ = 360^\\circ\\)).</li>
<li><strong>Squares</strong>: each angle is \\(90^\\circ\\), and 4 meet at each vertex (\\(4 \\times 90^\\circ = 360^\\circ\\)).</li>
<li><strong>Regular hexagons</strong>: each angle is \\(120^\\circ\\), and 3 meet at each vertex (\\(3 \\times 120^\\circ = 360^\\circ\\)).</li>
</ol></p></div>
</div>

<div class="env-block intuition">
<div class="env-title">Why Only Three?</div>
<div class="env-body"><p>The interior angle of a regular \\(n\\)-gon is \\(\\frac{(n-2) \\cdot 180^\\circ}{n}\\). For \\(k\\) polygons to meet at a vertex, we need \\(k \\cdot \\frac{(n-2) \\cdot 180}{n} = 360\\). This simplifies to \\(\\frac{1}{n} + \\frac{1}{k} = \\frac{1}{2}\\), which has only three positive integer solutions: \\((n,k) = (3,6), (4,4), (6,3)\\).</p></div>
</div>

<h3>Semi-Regular (Archimedean) Tessellations</h3>
<p>A <strong>semi-regular tessellation</strong> uses two or more types of regular polygons, with the same arrangement at every vertex. There are exactly 8 such tessellations (for example, the tiling by octagons and squares).</p>

<h3>Non-Regular Tessellations</h3>
<p>Any triangle and any quadrilateral can tile the plane, regardless of shape. This is because copies of a triangle can form a parallelogram, and any quadrilateral can be arranged so that all four angles meet at a single point (summing to \\(360^\\circ\\)).</p>

<div class="env-block theorem">
<div class="env-title">Theorem (Triangles and Quadrilaterals Tessellate)</div>
<div class="env-body"><p>Every triangle tiles the plane. Every convex quadrilateral tiles the plane. In both cases, the tiling uses rotated copies of the original shape.</p></div>
</div>

<div class="viz-placeholder" data-viz="viz-tessellation-builder"></div>

<div class="viz-placeholder" data-viz="viz-regular-tessellation"></div>`,

            visualizations: [
                {
                    id: 'viz-tessellation-builder',
                    title: 'Regular Tessellation Viewer',
                    description: 'Switch between the three regular tessellations: triangles, squares, and hexagons.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 30, height: 400 });
                        var tileType = 0; // 0=triangle, 1=square, 2=hexagon

                        VizEngine.createButton(controls, 'Triangles', function() { tileType = 0; draw(); });
                        VizEngine.createButton(controls, 'Squares', function() { tileType = 1; draw(); });
                        VizEngine.createButton(controls, 'Hexagons', function() { tileType = 2; draw(); });

                        var tileColors = [viz.colors.blue, viz.colors.teal, viz.colors.orange, viz.colors.purple, viz.colors.green, viz.colors.pink];

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            if (tileType === 0) {
                                // Equilateral triangles
                                var side = 50;
                                var triH = side * Math.sqrt(3) / 2;
                                for (var row = -1; row < h / triH + 1; row++) {
                                    for (var col = -1; col < w / side + 1; col++) {
                                        var x0 = col * side + (row % 2 === 0 ? 0 : side / 2);
                                        var y0 = row * triH;
                                        // Upward triangle
                                        ctx.beginPath();
                                        ctx.moveTo(x0, y0 + triH);
                                        ctx.lineTo(x0 + side / 2, y0);
                                        ctx.lineTo(x0 + side, y0 + triH);
                                        ctx.closePath();
                                        ctx.fillStyle = tileColors[(row * 7 + col * 3) % tileColors.length] + '44';
                                        ctx.fill();
                                        ctx.strokeStyle = viz.colors.blue;
                                        ctx.lineWidth = 1;
                                        ctx.stroke();
                                        // Downward triangle
                                        ctx.beginPath();
                                        ctx.moveTo(x0 + side / 2, y0);
                                        ctx.lineTo(x0 + side, y0 + triH);
                                        ctx.lineTo(x0 + side + side / 2, y0);
                                        ctx.closePath();
                                        ctx.fillStyle = tileColors[(row * 7 + col * 3 + 2) % tileColors.length] + '44';
                                        ctx.fill();
                                        ctx.strokeStyle = viz.colors.blue;
                                        ctx.stroke();
                                    }
                                }
                                viz.screenText('Equilateral Triangles: 6 meet at each vertex (6 x 60 = 360)', w / 2, 16, viz.colors.white, 12);
                            } else if (tileType === 1) {
                                // Squares
                                var sq = 50;
                                for (var r = -1; r < h / sq + 1; r++) {
                                    for (var c = -1; c < w / sq + 1; c++) {
                                        ctx.fillStyle = tileColors[(r * 5 + c * 3 + 1) % tileColors.length] + '44';
                                        ctx.fillRect(c * sq, r * sq, sq, sq);
                                        ctx.strokeStyle = viz.colors.teal;
                                        ctx.lineWidth = 1;
                                        ctx.strokeRect(c * sq, r * sq, sq, sq);
                                    }
                                }
                                viz.screenText('Squares: 4 meet at each vertex (4 x 90 = 360)', w / 2, 16, viz.colors.white, 12);
                            } else {
                                // Hexagons
                                var hexR = 30;
                                var hexW = hexR * Math.sqrt(3);
                                var hexH = hexR * 2;
                                for (var ry = -1; ry < h / (hexH * 0.75) + 1; ry++) {
                                    for (var cx = -1; cx < w / hexW + 1; cx++) {
                                        var hx = cx * hexW + (ry % 2 === 0 ? 0 : hexW / 2);
                                        var hy = ry * hexH * 0.75;
                                        ctx.beginPath();
                                        for (var v = 0; v < 6; v++) {
                                            var angle = (Math.PI / 3) * v - Math.PI / 6;
                                            var vx = hx + hexR * Math.cos(angle);
                                            var vy = hy + hexR * Math.sin(angle);
                                            if (v === 0) ctx.moveTo(vx, vy);
                                            else ctx.lineTo(vx, vy);
                                        }
                                        ctx.closePath();
                                        ctx.fillStyle = tileColors[(ry * 5 + cx * 2) % tileColors.length] + '44';
                                        ctx.fill();
                                        ctx.strokeStyle = viz.colors.orange;
                                        ctx.lineWidth = 1;
                                        ctx.stroke();
                                    }
                                }
                                viz.screenText('Hexagons: 3 meet at each vertex (3 x 120 = 360)', w / 2, 16, viz.colors.white, 12);
                            }
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-regular-tessellation',
                    title: 'Angle Sum at Vertex',
                    description: 'See why only three regular polygons tile the plane. Adjust n to see the interior angle and how many fit around a vertex.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40 });
                        var n = 4;

                        VizEngine.createSlider(controls, 'Sides n', 3, 12, n, 1, function(v) { n = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();

                            var intAngle = ((n - 2) * 180) / n;
                            var k = 360 / intAngle;
                            var kInt = Math.floor(k);
                            var exact = Math.abs(k - Math.round(k)) < 0.001;

                            // Draw polygons meeting at center
                            var R = 2;
                            var angleStep = 2 * Math.PI / n;
                            var placed = exact ? Math.round(k) : kInt;

                            for (var p = 0; p < placed; p++) {
                                var baseAngle = (2 * Math.PI * p / (exact ? Math.round(k) : kInt));
                                var verts = [];
                                // First vertex at origin
                                verts.push([0, 0]);
                                for (var i = 1; i < n; i++) {
                                    var a = baseAngle + angleStep * i - angleStep;
                                    verts.push([R * Math.cos(a), R * Math.sin(a)]);
                                }
                                var col = [viz.colors.blue, viz.colors.teal, viz.colors.orange, viz.colors.purple, viz.colors.green, viz.colors.pink][p % 6];
                                viz.drawPolygon(verts, col + '33', col, 1.5);
                            }

                            viz.drawPoint(0, 0, viz.colors.yellow, '', 4);

                            var msg = 'Interior angle = ' + intAngle.toFixed(1) + ' | 360/' + intAngle.toFixed(1) + ' = ' + k.toFixed(2);
                            if (exact) {
                                msg += ' (TILES!)';
                                viz.screenText(msg, viz.width / 2, viz.height - 14, viz.colors.green, 12);
                            } else {
                                msg += ' (gap or overlap)';
                                viz.screenText(msg, viz.width / 2, viz.height - 14, viz.colors.red, 12);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Why can regular pentagons not tile the plane?',
                    hint: 'Find the interior angle of a regular pentagon and check if it divides \\(360^\\circ\\) evenly.',
                    solution: 'The interior angle of a regular pentagon is \\(\\frac{(5-2) \\times 180}{5} = 108^\\circ\\). Since \\(360 / 108 = 3.\\overline{3}\\), which is not an integer, regular pentagons cannot meet at a vertex without gaps or overlaps.'
                },
                {
                    question: 'Verify that equilateral triangles, squares, and regular hexagons are the only regular polygons that tile the plane.',
                    hint: 'Set up the equation \\(k \\cdot \\frac{(n-2) \\cdot 180}{n} = 360\\) and find all positive integer solutions.',
                    solution: 'We need \\(\\frac{k(n-2)}{n} = 2\\), i.e., \\(kn - 2k = 2n\\), so \\(k = \\frac{2n}{n-2}\\). For \\(k\\) to be a positive integer with \\(n \\geq 3\\): \\(n=3 \\Rightarrow k=6\\); \\(n=4 \\Rightarrow k=4\\); \\(n=6 \\Rightarrow k=3\\). For \\(n=5\\), \\(k=10/3\\); for \\(n \\geq 7\\), \\(k < 3\\). So only three solutions exist.'
                },
                {
                    question: 'Explain why any triangle can tile the plane.',
                    hint: 'Rotate a triangle \\(180^\\circ\\) about the midpoint of one of its sides to form a parallelogram. Then tile with the parallelogram.',
                    solution: 'Take any triangle \\(ABC\\). Rotate it \\(180^\\circ\\) about the midpoint of side \\(BC\\). The original and rotated triangles together form a parallelogram. Parallelograms tile the plane by translation, so any triangle tiles the plane.'
                },
                {
                    question: 'In a semi-regular tessellation of regular octagons and squares, how many of each meet at a vertex?',
                    hint: 'The interior angle of a regular octagon is \\(135^\\circ\\) and a square is \\(90^\\circ\\). Find a combination summing to \\(360^\\circ\\).',
                    solution: 'At each vertex: \\(2 \\times 135^\\circ + 1 \\times 90^\\circ = 360^\\circ\\). So 2 octagons and 1 square meet at each vertex.'
                }
            ]
        }
    ]
});
