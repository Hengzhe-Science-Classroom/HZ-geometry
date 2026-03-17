// === Chapter 13: Coordinate Geometry Basics ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch13',
    number: 13,
    title: 'Coordinate Geometry Basics',
    subtitle: 'Distance, midpoint, slope, equations of lines, and coordinate proofs',
    sections: [
        // ============================================================
        // SECTION 1: Distance & Midpoint
        // ============================================================
        {
            id: 'ch13-sec01',
            title: 'Distance & Midpoint',
            content: `<h2>Distance & Midpoint</h2>

<div class="env-block intuition">
<div class="env-title">The Big Picture</div>
<div class="env-body"><p>Coordinate geometry (analytic geometry) merges algebra with geometry by placing figures on a coordinate plane. Every geometric question becomes an algebraic calculation. The two most fundamental tools are the <strong>distance formula</strong> and the <strong>midpoint formula</strong>.</p></div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem (Distance Formula)</div>
<div class="env-body"><p>The distance between two points \\(A(x_1, y_1)\\) and \\(B(x_2, y_2)\\) is
\\[d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\\]
This follows directly from the Pythagorean theorem applied to the right triangle with horizontal leg \\(|x_2 - x_1|\\) and vertical leg \\(|y_2 - y_1|\\).</p></div>
</div>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body"><p>Find the distance between \\(A(1, 3)\\) and \\(B(4, 7)\\).
\\[d = \\sqrt{(4-1)^2 + (7-3)^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5\\]</p></div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem (Midpoint Formula)</div>
<div class="env-body"><p>The midpoint of the segment from \\(A(x_1, y_1)\\) to \\(B(x_2, y_2)\\) is
\\[M = \\left(\\frac{x_1 + x_2}{2},\\; \\frac{y_1 + y_2}{2}\\right)\\]</p></div>
</div>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body"><p>The midpoint of \\(A(-2, 5)\\) and \\(B(6, 1)\\) is \\(M = \\left(\\frac{-2+6}{2}, \\frac{5+1}{2}\\right) = (2, 3)\\).</p></div>
</div>

<div class="env-block warning">
<div class="env-title">Common Mistake</div>
<div class="env-body"><p>When computing distance, remember to <em>square</em> the differences, not the individual coordinates. Also, \\(d\\) is always non-negative; if you get a negative value under the square root, check your arithmetic.</p></div>
</div>

<div class="viz-placeholder" data-viz="viz-distance-midpoint"></div>

<div class="viz-placeholder" data-viz="viz-triangle-classify"></div>`,

            visualizations: [
                {
                    id: 'viz-distance-midpoint',
                    title: 'Interactive Distance & Midpoint',
                    description: 'Drag points A and B. The distance, midpoint, and the right triangle used in the distance formula are shown.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 30 });
                        var pA = viz.addDraggable('A', -3, 2, viz.colors.blue, 8);
                        var pB = viz.addDraggable('B', 4, -1, viz.colors.orange, 8);

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw right triangle
                            viz.drawSegment(pA.x, pA.y, pB.x, pA.y, viz.colors.teal + '88', 1.5, true);
                            viz.drawSegment(pB.x, pA.y, pB.x, pB.y, viz.colors.teal + '88', 1.5, true);

                            // Label legs
                            var dx = Math.abs(pB.x - pA.x);
                            var dy = Math.abs(pB.y - pA.y);
                            viz.drawText('|dx| = ' + dx.toFixed(1), (pA.x + pB.x) / 2, pA.y - 0.5, viz.colors.teal, 11);
                            viz.drawText('|dy| = ' + dy.toFixed(1), pB.x + 0.8, (pA.y + pB.y) / 2, viz.colors.teal, 11);

                            // Draw right-angle marker
                            var ctx = viz.ctx;
                            var corner = viz.toScreen(pB.x, pA.y);
                            var sz = 8;
                            var signX = pA.x < pB.x ? -1 : 1;
                            var signY = pB.y < pA.y ? -1 : 1;
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(corner[0] + signX * sz, corner[1]);
                            ctx.lineTo(corner[0] + signX * sz, corner[1] + signY * sz);
                            ctx.lineTo(corner[0], corner[1] + signY * sz);
                            ctx.stroke();

                            // Draw segment AB
                            viz.drawSegment(pA.x, pA.y, pB.x, pB.y, viz.colors.purple, 2);

                            // Compute distance and midpoint
                            var dist = Math.sqrt((pB.x - pA.x) * (pB.x - pA.x) + (pB.y - pA.y) * (pB.y - pA.y));
                            var mx = (pA.x + pB.x) / 2;
                            var my = (pA.y + pB.y) / 2;

                            // Draw midpoint
                            viz.drawPoint(mx, my, viz.colors.green, 'M(' + mx.toFixed(1) + ', ' + my.toFixed(1) + ')', 5);

                            // Label points
                            viz.drawDraggables();
                            viz.screenText('A(' + pA.x.toFixed(1) + ', ' + pA.y.toFixed(1) + ')', 10, 20, viz.colors.blue, 12, 'left');
                            viz.screenText('B(' + pB.x.toFixed(1) + ', ' + pB.y.toFixed(1) + ')', 10, 36, viz.colors.orange, 12, 'left');
                            viz.screenText('d = ' + dist.toFixed(2), 10, 52, viz.colors.purple, 13, 'left');
                            viz.screenText('M = (' + mx.toFixed(1) + ', ' + my.toFixed(1) + ')', 10, 68, viz.colors.green, 13, 'left');
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                },
                {
                    id: 'viz-triangle-classify',
                    title: 'Triangle Classifier by Side Lengths',
                    description: 'Drag three vertices. The triangle is classified as scalene, isosceles, or equilateral, and as acute, right, or obtuse.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 25 });
                        var pA = viz.addDraggable('A', -3, -1, viz.colors.blue, 8);
                        var pB = viz.addDraggable('B', 3, -1, viz.colors.orange, 8);
                        var pC = viz.addDraggable('C', 0, 3, viz.colors.green, 8);

                        function dist(x1, y1, x2, y2) {
                            return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            viz.drawPolygon([[pA.x, pA.y], [pB.x, pB.y], [pC.x, pC.y]], viz.colors.purple + '22', viz.colors.purple, 2);

                            var ab = dist(pA.x, pA.y, pB.x, pB.y);
                            var bc = dist(pB.x, pB.y, pC.x, pC.y);
                            var ac = dist(pA.x, pA.y, pC.x, pC.y);

                            // Classify by sides
                            var sides = [ab, bc, ac].sort(function(a, b) { return a - b; });
                            var sideType = 'Scalene';
                            if (Math.abs(sides[0] - sides[1]) < 0.1 && Math.abs(sides[1] - sides[2]) < 0.1) sideType = 'Equilateral';
                            else if (Math.abs(sides[0] - sides[1]) < 0.1 || Math.abs(sides[1] - sides[2]) < 0.1) sideType = 'Isosceles';

                            // Classify by angles (using longest side)
                            var a2 = sides[0] * sides[0], b2 = sides[1] * sides[1], c2 = sides[2] * sides[2];
                            var angleType = 'Acute';
                            if (Math.abs(a2 + b2 - c2) < 0.2) angleType = 'Right';
                            else if (a2 + b2 < c2) angleType = 'Obtuse';

                            viz.drawDraggables();

                            // Side length labels
                            viz.drawText(ab.toFixed(2), (pA.x + pB.x) / 2, (pA.y + pB.y) / 2 - 0.5, viz.colors.yellow, 11);
                            viz.drawText(bc.toFixed(2), (pB.x + pC.x) / 2 + 0.5, (pB.y + pC.y) / 2, viz.colors.yellow, 11);
                            viz.drawText(ac.toFixed(2), (pA.x + pC.x) / 2 - 0.5, (pA.y + pC.y) / 2, viz.colors.yellow, 11);

                            viz.screenText(sideType + ' ' + angleType + ' Triangle', viz.width / 2, 16, viz.colors.white, 13);
                            viz.screenText('AB = ' + ab.toFixed(2) + ' | BC = ' + bc.toFixed(2) + ' | AC = ' + ac.toFixed(2), viz.width / 2, viz.height - 14, viz.colors.teal, 12);
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the distance between \\(P(-3, 4)\\) and \\(Q(5, -2)\\).',
                    hint: 'Use \\(d = \\sqrt{(5-(-3))^2 + (-2-4)^2}\\).',
                    solution: '\\(d = \\sqrt{8^2 + (-6)^2} = \\sqrt{64 + 36} = \\sqrt{100} = 10\\).'
                },
                {
                    question: 'Find the midpoint of the segment from \\(A(7, -1)\\) to \\(B(-3, 5)\\).',
                    hint: 'Average the \\(x\\)-coordinates and the \\(y\\)-coordinates separately.',
                    solution: '\\(M = \\left(\\frac{7+(-3)}{2}, \\frac{-1+5}{2}\\right) = (2, 2)\\).'
                },
                {
                    question: 'If \\(M(3, 4)\\) is the midpoint of \\(\\overline{AB}\\) and \\(A = (1, 7)\\), find \\(B\\).',
                    hint: 'Use \\(M = \\frac{A+B}{2}\\), so \\(B = 2M - A\\).',
                    solution: '\\(B = (2 \\cdot 3 - 1, 2 \\cdot 4 - 7) = (5, 1)\\).'
                },
                {
                    question: 'Show that the triangle with vertices \\(A(0,0)\\), \\(B(5,0)\\), \\(C(2,4)\\) is scalene (all sides different).',
                    hint: 'Compute all three side lengths using the distance formula.',
                    solution: '\\(AB = 5\\), \\(BC = \\sqrt{9+16} = 5\\), \\(AC = \\sqrt{4+16} = \\sqrt{20}\\). Wait, \\(AB = BC = 5\\), so this triangle is actually isosceles, not scalene. The statement is false: the triangle is isosceles with \\(AB = BC\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Slope & Equations of Lines
        // ============================================================
        {
            id: 'ch13-sec02',
            title: 'Slope & Equations of Lines',
            content: `<h2>Slope & Equations of Lines</h2>

<div class="env-block definition">
<div class="env-title">Definition (Slope)</div>
<div class="env-body"><p>The <strong>slope</strong> of a non-vertical line through \\(A(x_1, y_1)\\) and \\(B(x_2, y_2)\\) is
\\[m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{\\Delta y}{\\Delta x} = \\frac{\\text{rise}}{\\text{run}}\\]
A vertical line has <strong>undefined</strong> slope.</p></div>
</div>

<h3>Forms of the Equation of a Line</h3>

<div class="env-block definition">
<div class="env-title">Slope-Intercept Form</div>
<div class="env-body"><p>\\[y = mx + b\\] where \\(m\\) is the slope and \\(b\\) is the \\(y\\)-intercept.</p></div>
</div>

<div class="env-block definition">
<div class="env-title">Point-Slope Form</div>
<div class="env-body"><p>Given a point \\((x_1, y_1)\\) on the line and slope \\(m\\):
\\[y - y_1 = m(x - x_1)\\]</p></div>
</div>

<div class="env-block definition">
<div class="env-title">Standard Form</div>
<div class="env-body"><p>\\[Ax + By = C\\] where \\(A, B, C\\) are integers and \\(A \\geq 0\\). The slope is \\(m = -A/B\\) (when \\(B \\neq 0\\)).</p></div>
</div>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body"><p>Write the equation of the line through \\((2, -1)\\) with slope \\(3\\).
Using point-slope form: \\(y - (-1) = 3(x - 2)\\), i.e., \\(y + 1 = 3x - 6\\), so \\(y = 3x - 7\\).</p></div>
</div>

<div class="viz-placeholder" data-viz="viz-slope-line"></div>`,

            visualizations: [
                {
                    id: 'viz-slope-line',
                    title: 'Interactive Slope & Line Equation',
                    description: 'Drag points A and B to change the line. The slope, equation, and rise/run triangle are displayed.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 30 });
                        var pA = viz.addDraggable('A', -3, -2, viz.colors.blue, 8);
                        var pB = viz.addDraggable('B', 3, 2, viz.colors.orange, 8);

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var dx = pB.x - pA.x;
                            var dy = pB.y - pA.y;

                            // Draw full line through both points
                            if (Math.abs(dx) > 0.01) {
                                viz.drawLine(pA.x, pA.y, pB.x, pB.y, viz.colors.purple + 'aa', 2);
                            } else {
                                // Vertical line
                                viz.drawSegment(pA.x, -10, pA.x, 10, viz.colors.purple + 'aa', 2);
                            }

                            // Rise/run triangle
                            viz.drawSegment(pA.x, pA.y, pB.x, pA.y, viz.colors.green, 1.5, true);
                            viz.drawSegment(pB.x, pA.y, pB.x, pB.y, viz.colors.red, 1.5, true);
                            viz.drawText('run = ' + dx.toFixed(1), (pA.x + pB.x) / 2, pA.y - 0.5, viz.colors.green, 11);
                            viz.drawText('rise = ' + dy.toFixed(1), pB.x + 1, (pA.y + pB.y) / 2, viz.colors.red, 11);

                            viz.drawDraggables();

                            // Info
                            var ctx = viz.ctx;
                            if (Math.abs(dx) < 0.01) {
                                viz.screenText('Slope: undefined (vertical line)', 10, 20, viz.colors.yellow, 12, 'left');
                                viz.screenText('x = ' + pA.x.toFixed(1), 10, 38, viz.colors.white, 12, 'left');
                            } else {
                                var m = dy / dx;
                                var b = pA.y - m * pA.x;
                                viz.screenText('m = ' + dy.toFixed(1) + '/' + dx.toFixed(1) + ' = ' + m.toFixed(2), 10, 20, viz.colors.yellow, 12, 'left');
                                viz.screenText('y = ' + m.toFixed(2) + 'x + (' + b.toFixed(2) + ')', 10, 38, viz.colors.white, 12, 'left');

                                // Mark y-intercept
                                viz.drawPoint(0, b, viz.colors.teal, 'b=' + b.toFixed(1), 4);
                            }
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the slope of the line through \\((2, 5)\\) and \\((-1, 11)\\).',
                    hint: 'Use \\(m = \\frac{y_2 - y_1}{x_2 - x_1}\\).',
                    solution: '\\(m = \\frac{11 - 5}{-1 - 2} = \\frac{6}{-3} = -2\\).'
                },
                {
                    question: 'Write the equation of the line with slope \\(\\frac{2}{3}\\) passing through \\((6, -4)\\).',
                    hint: 'Use point-slope form: \\(y - y_1 = m(x - x_1)\\).',
                    solution: '\\(y - (-4) = \\frac{2}{3}(x - 6)\\), so \\(y + 4 = \\frac{2}{3}x - 4\\), giving \\(y = \\frac{2}{3}x - 8\\).'
                },
                {
                    question: 'Convert \\(3x - 5y = 15\\) to slope-intercept form.',
                    hint: 'Solve for \\(y\\).',
                    solution: '\\(-5y = -3x + 15\\), so \\(y = \\frac{3}{5}x - 3\\). Slope \\(m = \\frac{3}{5}\\), \\(y\\)-intercept \\(-3\\).'
                },
                {
                    question: 'Find the equation of the line through \\((-2, 3)\\) and \\((4, -1)\\) in standard form.',
                    hint: 'Find slope first, then use point-slope form, then rearrange.',
                    solution: '\\(m = \\frac{-1-3}{4-(-2)} = \\frac{-4}{6} = -\\frac{2}{3}\\). Point-slope: \\(y - 3 = -\\frac{2}{3}(x+2)\\). Multiply by 3: \\(3y - 9 = -2x - 4\\), so \\(2x + 3y = 5\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Parallel & Perpendicular Lines
        // ============================================================
        {
            id: 'ch13-sec03',
            title: 'Parallel & Perpendicular Lines',
            content: `<h2>Parallel & Perpendicular Lines</h2>

<div class="env-block theorem">
<div class="env-title">Theorem (Parallel Lines)</div>
<div class="env-body"><p>Two non-vertical lines are <strong>parallel</strong> if and only if they have the same slope:
\\[\\ell_1 \\parallel \\ell_2 \\iff m_1 = m_2\\]
Two vertical lines are always parallel to each other.</p></div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem (Perpendicular Lines)</div>
<div class="env-body"><p>Two non-vertical lines are <strong>perpendicular</strong> if and only if their slopes are negative reciprocals:
\\[\\ell_1 \\perp \\ell_2 \\iff m_1 \\cdot m_2 = -1\\]
Equivalently, \\(m_2 = -1/m_1\\). A vertical line is perpendicular to every horizontal line.</p></div>
</div>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body"><p>Line \\(\\ell_1\\) has equation \\(y = 2x + 3\\), so \\(m_1 = 2\\).
<ul>
<li>A line parallel to \\(\\ell_1\\) through \\((1, 0)\\): \\(y = 2(x - 1) = 2x - 2\\).</li>
<li>A line perpendicular to \\(\\ell_1\\) through \\((1, 0)\\): slope \\(= -\\frac{1}{2}\\), so \\(y = -\\frac{1}{2}(x - 1) = -\\frac{1}{2}x + \\frac{1}{2}\\).</li>
</ul></p></div>
</div>

<div class="env-block warning">
<div class="env-title">Common Mistake</div>
<div class="env-body"><p>The negative reciprocal of \\(m = 3\\) is \\(-1/3\\), not \\(-3\\). Students often just negate the slope without also taking the reciprocal.</p></div>
</div>

<div class="viz-placeholder" data-viz="viz-parallel-perp"></div>`,

            visualizations: [
                {
                    id: 'viz-parallel-perp',
                    title: 'Parallel & Perpendicular Line Explorer',
                    description: 'Drag the slope slider and see parallel/perpendicular lines through given points.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 30 });
                        var m = 1;
                        var showParallel = true;
                        var showPerp = true;

                        VizEngine.createSlider(controls, 'Slope m', -4, 4, m, 0.1, function(v) { m = v; draw(); });
                        VizEngine.createButton(controls, 'Toggle Parallel', function() { showParallel = !showParallel; draw(); });
                        VizEngine.createButton(controls, 'Toggle Perp', function() { showPerp = !showPerp; draw(); });

                        function drawLineThrough(px, py, slope, color, lw) {
                            if (!isFinite(slope)) return;
                            var x1 = px - 10;
                            var y1 = py + slope * (x1 - px);
                            var x2 = px + 10;
                            var y2 = py + slope * (x2 - px);
                            viz.drawSegment(x1, y1, x2, y2, color, lw || 2);
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Original line through (0, 0)
                            drawLineThrough(0, 0, m, viz.colors.blue, 2.5);
                            viz.drawPoint(0, 0, viz.colors.blue, 'O', 5);
                            viz.screenText('Original: y = ' + m.toFixed(1) + 'x (blue)', 10, 20, viz.colors.blue, 12, 'left');

                            // Parallel line through (0, 3)
                            if (showParallel) {
                                drawLineThrough(0, 3, m, viz.colors.green, 2);
                                viz.drawPoint(0, 3, viz.colors.green, '', 4);
                                viz.screenText('Parallel: m = ' + m.toFixed(1) + ' (green)', 10, 38, viz.colors.green, 12, 'left');
                            }

                            // Perpendicular line through (0, 0)
                            if (showPerp && Math.abs(m) > 0.01) {
                                var mp = -1 / m;
                                drawLineThrough(0, 0, mp, viz.colors.orange, 2);
                                viz.screenText('Perpendicular: m = ' + mp.toFixed(2) + ' (orange)', 10, 56, viz.colors.orange, 12, 'left');
                                viz.screenText('Product: ' + m.toFixed(1) + ' x ' + mp.toFixed(2) + ' = ' + (m * mp).toFixed(1), 10, 74, viz.colors.yellow, 12, 'left');
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Are the lines \\(y = 3x + 1\\) and \\(y = 3x - 7\\) parallel, perpendicular, or neither?',
                    hint: 'Compare the slopes.',
                    solution: 'Both lines have slope \\(m = 3\\). Since the slopes are equal, the lines are parallel.'
                },
                {
                    question: 'Are the lines \\(2x + 5y = 10\\) and \\(5x - 2y = 4\\) parallel, perpendicular, or neither?',
                    hint: 'Rewrite each in slope-intercept form to find the slopes.',
                    solution: 'First line: \\(y = -\\frac{2}{5}x + 2\\), so \\(m_1 = -\\frac{2}{5}\\). Second line: \\(y = \\frac{5}{2}x - 2\\), so \\(m_2 = \\frac{5}{2}\\). Product: \\(m_1 m_2 = -1\\). The lines are perpendicular.'
                },
                {
                    question: 'Write the equation of the line perpendicular to \\(y = -4x + 3\\) through the point \\((8, 1)\\).',
                    hint: 'The perpendicular slope is the negative reciprocal of \\(-4\\).',
                    solution: 'Perpendicular slope: \\(m = \\frac{1}{4}\\). Using point-slope form: \\(y - 1 = \\frac{1}{4}(x - 8)\\), so \\(y = \\frac{1}{4}x - 1\\).'
                },
                {
                    question: 'Write the equation of the line parallel to \\(3x - y = 6\\) that passes through \\((-2, 5)\\).',
                    hint: 'Find the slope from \\(3x - y = 6\\) first.',
                    solution: 'From \\(y = 3x - 6\\), the slope is 3. Parallel line: \\(y - 5 = 3(x + 2)\\), so \\(y = 3x + 11\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 4: Coordinate Proofs
        // ============================================================
        {
            id: 'ch13-sec04',
            title: 'Coordinate Proofs',
            content: `<h2>Coordinate Proofs</h2>

<div class="env-block intuition">
<div class="env-title">What is a Coordinate Proof?</div>
<div class="env-body"><p>A <strong>coordinate proof</strong> places a geometric figure on a coordinate plane (usually with vertices at convenient locations) and uses algebra (distance, slope, midpoint) to prove geometric properties. The key is choosing coordinates wisely to make the algebra as simple as possible.</p></div>
</div>

<h3>Strategy for Coordinate Proofs</h3>
<ol>
<li><strong>Place the figure</strong> so that key vertices lie on axes or at the origin. Use symmetry when possible.</li>
<li><strong>Assign general coordinates</strong> using variables (like \\((a,0)\\) or \\((0,b)\\)) to keep the proof general.</li>
<li><strong>Compute</strong> distances, slopes, or midpoints as needed.</li>
<li><strong>Conclude</strong> the geometric property from the algebraic result.</li>
</ol>

<div class="env-block example">
<div class="env-title">Example (Midpoint Theorem for Triangles)</div>
<div class="env-body"><p>Prove: The segment connecting the midpoints of two sides of a triangle is parallel to the third side and half its length.</p>
<p><strong>Setup:</strong> Place \\(A\\) at the origin \\((0,0)\\), \\(B\\) at \\((2b, 0)\\), and \\(C\\) at \\((2c, 2d)\\).</p>
<p><strong>Midpoints:</strong> \\(M_{AB} = (b, 0)\\) and \\(M_{AC} = (c, d)\\).</p>
<p><strong>Slope of</strong> \\(M_{AB}M_{AC}\\): \\(\\frac{d - 0}{c - b} = \\frac{d}{c - b}\\).</p>
<p><strong>Slope of</strong> \\(BC\\): \\(\\frac{2d - 0}{2c - 2b} = \\frac{d}{c - b}\\). Same slope, so they are parallel.</p>
<p><strong>Length of</strong> \\(M_{AB}M_{AC} = \\sqrt{(c-b)^2 + d^2}\\). Length of \\(BC = \\sqrt{(2c-2b)^2 + (2d)^2} = 2\\sqrt{(c-b)^2 + d^2}\\). So \\(M_{AB}M_{AC} = \\frac{1}{2} BC\\). \\(\\square\\)</p></div>
</div>

<div class="env-block warning">
<div class="env-title">Common Pitfall</div>
<div class="env-body"><p>When placing a figure on the coordinate plane, do not use overly specific coordinates (like making all sides equal when you only need a general triangle). Your proof must work for all possible shapes of the figure, not just a special case.</p></div>
</div>

<div class="viz-placeholder" data-viz="viz-coord-proof"></div>`,

            visualizations: [
                {
                    id: 'viz-coord-proof',
                    title: 'Triangle Midpoint Theorem Visualizer',
                    description: 'Drag triangle vertices. The midsegment (connecting midpoints of two sides) is shown to be parallel to the third side and half its length.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 25 });
                        var vA = viz.addDraggable('A', -4, -2, viz.colors.blue, 8);
                        var vB = viz.addDraggable('B', 5, -2, viz.colors.blue, 8);
                        var vC = viz.addDraggable('C', 1, 4, viz.colors.blue, 8);

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Triangle
                            viz.drawPolygon([[vA.x, vA.y], [vB.x, vB.y], [vC.x, vC.y]], viz.colors.blue + '22', viz.colors.blue, 2);

                            // Midpoints of AB and AC
                            var mAB_x = (vA.x + vB.x) / 2, mAB_y = (vA.y + vB.y) / 2;
                            var mAC_x = (vA.x + vC.x) / 2, mAC_y = (vA.y + vC.y) / 2;

                            // Midsegment
                            viz.drawSegment(mAB_x, mAB_y, mAC_x, mAC_y, viz.colors.orange, 3);
                            viz.drawPoint(mAB_x, mAB_y, viz.colors.orange, 'M1', 5);
                            viz.drawPoint(mAC_x, mAC_y, viz.colors.orange, 'M2', 5);

                            // Third side BC
                            viz.drawSegment(vB.x, vB.y, vC.x, vC.y, viz.colors.green, 2);

                            // Labels
                            viz.drawDraggables();

                            // Slopes
                            var dxMid = mAC_x - mAB_x, dyMid = mAC_y - mAB_y;
                            var dxBC = vC.x - vB.x, dyBC = vC.y - vB.y;
                            var slopeMid = Math.abs(dxMid) > 0.01 ? (dyMid / dxMid).toFixed(2) : 'undef';
                            var slopeBC = Math.abs(dxBC) > 0.01 ? (dyBC / dxBC).toFixed(2) : 'undef';
                            var lenMid = Math.sqrt(dxMid * dxMid + dyMid * dyMid);
                            var lenBC = Math.sqrt(dxBC * dxBC + dyBC * dyBC);

                            viz.screenText('Midsegment slope: ' + slopeMid + ' | BC slope: ' + slopeBC + ' (parallel!)', viz.width / 2, 16, viz.colors.white, 11);
                            viz.screenText('Midsegment length: ' + lenMid.toFixed(2) + ' | BC length: ' + lenBC.toFixed(2) + ' | Ratio: ' + (lenMid / lenBC).toFixed(2), viz.width / 2, 32, viz.colors.teal, 11);
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use coordinates to prove that the diagonals of a rectangle bisect each other.',
                    hint: 'Place the rectangle at \\((0,0), (a,0), (a,b), (0,b)\\) and show both diagonals have the same midpoint.',
                    solution: 'Place vertices at \\(O(0,0)\\), \\(A(a,0)\\), \\(B(a,b)\\), \\(C(0,b)\\). Diagonal \\(OB\\) has midpoint \\((a/2, b/2)\\). Diagonal \\(AC\\) has midpoint \\(((a+0)/2, (0+b)/2) = (a/2, b/2)\\). Same midpoint, so the diagonals bisect each other.'
                },
                {
                    question: 'Use coordinates to prove that the diagonals of a parallelogram bisect each other.',
                    hint: 'Place the parallelogram at \\(O(0,0)\\), \\(A(a,0)\\), \\(B(a+c,d)\\), \\(C(c,d)\\).',
                    solution: 'With the given coordinates, diagonal \\(OB\\) has midpoint \\(((a+c)/2, d/2)\\). Diagonal \\(AC\\) has midpoint \\(((a+c)/2, d/2)\\). The midpoints are equal, so the diagonals bisect each other.'
                },
                {
                    question: 'Prove that the triangle with vertices \\(A(0,0)\\), \\(B(6,0)\\), \\(C(3, 3\\sqrt{3})\\) is equilateral.',
                    hint: 'Compute all three side lengths.',
                    solution: '\\(AB = 6\\). \\(BC = \\sqrt{(6-3)^2 + (0-3\\sqrt{3})^2} = \\sqrt{9 + 27} = 6\\). \\(AC = \\sqrt{9 + 27} = 6\\). All sides equal, so the triangle is equilateral.'
                },
                {
                    question: 'Use the distance formula to find the perimeter of the quadrilateral with vertices \\(A(1,2)\\), \\(B(5,2)\\), \\(C(6,5)\\), \\(D(2,5)\\).',
                    hint: 'Compute \\(AB + BC + CD + DA\\).',
                    solution: '\\(AB = 4\\), \\(BC = \\sqrt{1+9} = \\sqrt{10}\\), \\(CD = 4\\), \\(DA = \\sqrt{1+9} = \\sqrt{10}\\). Perimeter = \\(8 + 2\\sqrt{10} \\approx 14.32\\).'
                }
            ]
        }
    ]
});
