// === Chapter 14: Conic Sections ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch14',
    number: 14,
    title: 'Conic Sections',
    subtitle: 'Circles, parabolas, ellipses, and hyperbolas in the coordinate plane',
    sections: [
        // ============================================================
        // SECTION 1: Circles in the Coordinate Plane
        // ============================================================
        {
            id: 'ch14-sec01',
            title: 'Circles in the Coordinate Plane',
            content: `<h2>Circles in the Coordinate Plane</h2>

<div class="env-block intuition">
<div class="env-title">The Big Picture</div>
<div class="env-body"><p>A conic section is a curve obtained by slicing a double cone with a plane. The four types are circles, ellipses, parabolas, and hyperbolas. We begin with the simplest: the circle.</p></div>
</div>

<div class="env-block definition">
<div class="env-title">Definition (Circle)</div>
<div class="env-body"><p>A <strong>circle</strong> is the set of all points in a plane that are at a fixed distance \\(r\\) (the <strong>radius</strong>) from a fixed point \\((h, k)\\) (the <strong>center</strong>).</p></div>
</div>

<div class="env-block theorem">
<div class="env-title">Standard Equation of a Circle</div>
<div class="env-body"><p>\\[(x - h)^2 + (y - k)^2 = r^2\\]
where \\((h, k)\\) is the center and \\(r\\) is the radius.</p></div>
</div>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body"><p>The circle with center \\((3, -2)\\) and radius 5 has equation:
\\[(x - 3)^2 + (y + 2)^2 = 25\\]</p></div>
</div>

<h3>General Form</h3>
<p>Expanding the standard form gives the <strong>general form</strong>:
\\[x^2 + y^2 + Dx + Ey + F = 0\\]
To convert back to standard form, complete the square in both \\(x\\) and \\(y\\).</p>

<div class="env-block example">
<div class="env-title">Example (General to Standard)</div>
<div class="env-body"><p>Convert \\(x^2 + y^2 - 6x + 4y - 12 = 0\\) to standard form.
\\[(x^2 - 6x + 9) + (y^2 + 4y + 4) = 12 + 9 + 4\\]
\\[(x - 3)^2 + (y + 2)^2 = 25\\]
Center \\((3, -2)\\), radius \\(5\\).</p></div>
</div>

<div class="viz-placeholder" data-viz="viz-circle-eq"></div>

<div class="viz-placeholder" data-viz="viz-circle-tangent"></div>`,

            visualizations: [
                {
                    id: 'viz-circle-eq',
                    title: 'Interactive Circle',
                    description: 'Drag the center and adjust the radius. The equation updates in real time.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 30 });
                        var center = viz.addDraggable('C', 0, 0, viz.colors.yellow, 8);
                        var r = 3;

                        VizEngine.createSlider(controls, 'Radius r', 0.5, 6, r, 0.1, function(v) { r = v; draw(); });

                        function draw() {
                            center.y = Math.round(center.y * 4) / 4;
                            center.x = Math.round(center.x * 4) / 4;
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw circle
                            viz.drawCircle(center.x, center.y, r, viz.colors.blue + '22', viz.colors.blue, 2);

                            // Draw radius line
                            viz.drawSegment(center.x, center.y, center.x + r, center.y, viz.colors.orange, 2);
                            viz.drawText('r = ' + r.toFixed(1), center.x + r / 2, center.y + 0.5, viz.colors.orange, 11);

                            // Center
                            viz.drawDraggables();

                            // Equation
                            var h = center.x.toFixed(1);
                            var k = center.y.toFixed(1);
                            var r2 = (r * r).toFixed(1);
                            viz.screenText('(x - ' + h + ')^2 + (y - ' + k + ')^2 = ' + r2, viz.width / 2, viz.height - 14, viz.colors.white, 12);
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                },
                {
                    id: 'viz-circle-tangent',
                    title: 'Circle: Tangent Line at a Point',
                    description: 'Drag a point on the circle to see the tangent line. Notice the tangent is always perpendicular to the radius.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 30 });
                        var r = 3;
                        var theta = 0.8;

                        VizEngine.createSlider(controls, 'Point angle', 0, 6.28, theta, 0.05, function(v) { theta = v; draw(); });
                        VizEngine.createSlider(controls, 'Radius r', 1, 5, r, 0.5, function(v) { r = v; draw(); });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Circle
                            viz.drawCircle(0, 0, r, viz.colors.blue + '22', viz.colors.blue, 2);

                            // Point on circle
                            var px = r * Math.cos(theta);
                            var py = r * Math.sin(theta);
                            viz.drawPoint(px, py, viz.colors.orange, 'P(' + px.toFixed(1) + ', ' + py.toFixed(1) + ')', 6);

                            // Radius to point
                            viz.drawSegment(0, 0, px, py, viz.colors.yellow, 2);
                            viz.drawPoint(0, 0, viz.colors.yellow, 'O', 4);

                            // Tangent line (perpendicular to radius)
                            var tx = -Math.sin(theta);
                            var ty = Math.cos(theta);
                            viz.drawSegment(px - tx * 5, py - ty * 5, px + tx * 5, py + ty * 5, viz.colors.green, 2);

                            // Right angle mark
                            var ctx = viz.ctx;
                            var sp = viz.toScreen(px, py);
                            var markSize = 10;
                            var rdx = -Math.cos(theta) * markSize;
                            var rdy = Math.sin(theta) * markSize;
                            var tdx = -Math.sin(theta) * markSize;
                            var tdy = Math.cos(theta) * markSize;
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(sp[0] + rdx, sp[1] + rdy);
                            ctx.lineTo(sp[0] + rdx + tdx, sp[1] + rdy + tdy);
                            ctx.lineTo(sp[0] + tdx, sp[1] + tdy);
                            ctx.stroke();

                            viz.screenText('Tangent at P is perpendicular to radius OP', viz.width / 2, viz.height - 14, viz.colors.white, 12);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Write the equation of the circle with center \\((-1, 4)\\) and radius 3.',
                    hint: 'Use \\((x-h)^2 + (y-k)^2 = r^2\\) with \\(h=-1, k=4, r=3\\).',
                    solution: '\\((x+1)^2 + (y-4)^2 = 9\\).'
                },
                {
                    question: 'Find the center and radius of \\(x^2 + y^2 + 8x - 2y + 8 = 0\\).',
                    hint: 'Complete the square in \\(x\\) and \\(y\\).',
                    solution: '\\((x^2+8x+16) + (y^2-2y+1) = -8+16+1 = 9\\). So \\((x+4)^2 + (y-1)^2 = 9\\). Center \\((-4, 1)\\), radius \\(3\\).'
                },
                {
                    question: 'Determine whether the point \\((5, 2)\\) lies inside, on, or outside the circle \\((x-2)^2 + (y+1)^2 = 16\\).',
                    hint: 'Compute the distance from \\((5,2)\\) to the center and compare with \\(r\\).',
                    solution: 'Distance from \\((5,2)\\) to center \\((2,-1)\\): \\(\\sqrt{9+9} = 3\\sqrt{2} \\approx 4.24\\). Since \\(3\\sqrt{2} > 4 = r\\), the point is outside the circle.'
                },
                {
                    question: 'Write the equation of the circle with endpoints of a diameter at \\(A(-2,3)\\) and \\(B(4,7)\\).',
                    hint: 'The center is the midpoint of the diameter. The radius is half the length of the diameter.',
                    solution: 'Center: \\((1, 5)\\). Diameter: \\(\\sqrt{36+16} = \\sqrt{52}\\), so \\(r = \\frac{\\sqrt{52}}{2}\\) and \\(r^2 = 13\\). Equation: \\((x-1)^2 + (y-5)^2 = 13\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Parabolas
        // ============================================================
        {
            id: 'ch14-sec02',
            title: 'Parabolas',
            content: `<h2>Parabolas</h2>

<div class="env-block definition">
<div class="env-title">Definition (Parabola)</div>
<div class="env-body"><p>A <strong>parabola</strong> is the set of all points equidistant from a fixed point (the <strong>focus</strong>) and a fixed line (the <strong>directrix</strong>). The distance from any point \\(P\\) on the parabola to the focus equals its distance to the directrix.</p></div>
</div>

<h3>Standard Forms</h3>
<p>For a parabola with vertex at the origin:</p>
<ul>
<li><strong>Opens up/down:</strong> \\(x^2 = 4py\\). Focus \\((0, p)\\), directrix \\(y = -p\\).</li>
<li><strong>Opens right/left:</strong> \\(y^2 = 4px\\). Focus \\((p, 0)\\), directrix \\(x = -p\\).</li>
</ul>
<p>If \\(p > 0\\), it opens up (or right); if \\(p < 0\\), it opens down (or left).</p>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body"><p>Find the focus and directrix of \\(y = \\frac{1}{8}x^2\\).
Rewrite: \\(x^2 = 8y\\), so \\(4p = 8\\), giving \\(p = 2\\).
Focus: \\((0, 2)\\). Directrix: \\(y = -2\\).</p></div>
</div>

<div class="env-block theorem">
<div class="env-title">Reflective Property</div>
<div class="env-body"><p>Any ray parallel to the axis of a parabola reflects off the curve and passes through the focus. This is why satellite dishes and car headlights use parabolic shapes.</p></div>
</div>

<div class="viz-placeholder" data-viz="viz-parabola-focus"></div>`,

            visualizations: [
                {
                    id: 'viz-parabola-focus',
                    title: 'Parabola: Focus & Directrix',
                    description: 'Adjust p to see how the focus, directrix, and shape of the parabola change. A sample point shows equal distances.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 25 });
                        var p = 1.5;

                        VizEngine.createSlider(controls, 'p', -4, 4, p, 0.1, function(v) { p = v; draw(); });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            if (Math.abs(p) < 0.05) { viz.screenText('p must be nonzero', viz.width / 2, viz.height / 2, viz.colors.red, 14); return; }

                            // Parabola: x^2 = 4py, i.e., y = x^2/(4p)
                            viz.drawFunction(function(x) { return x * x / (4 * p); }, -8, 8, viz.colors.blue, 2.5);

                            // Focus
                            viz.drawPoint(0, p, viz.colors.orange, 'Focus (0, ' + p.toFixed(1) + ')', 6);

                            // Directrix
                            viz.drawSegment(-10, -p, 10, -p, viz.colors.red, 1.5, true);
                            viz.drawText('Directrix: y = ' + (-p).toFixed(1), 4, -p - 0.5, viz.colors.red, 11);

                            // Sample point
                            var sx = 3;
                            var sy = sx * sx / (4 * p);
                            viz.drawPoint(sx, sy, viz.colors.green, 'P', 5);

                            // Distance to focus
                            viz.drawSegment(sx, sy, 0, p, viz.colors.teal + 'aa', 1.5, true);
                            var dFocus = Math.sqrt(sx * sx + (sy - p) * (sy - p));

                            // Distance to directrix
                            viz.drawSegment(sx, sy, sx, -p, viz.colors.yellow + 'aa', 1.5, true);
                            var dDir = Math.abs(sy + p);

                            viz.screenText('dist(P, Focus) = ' + dFocus.toFixed(2) + ' = dist(P, Directrix) = ' + dDir.toFixed(2), viz.width / 2, viz.height - 14, viz.colors.white, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the focus and directrix of \\(y = -\\frac{1}{12}x^2\\).',
                    hint: 'Rewrite as \\(x^2 = -12y\\), so \\(4p = -12\\).',
                    solution: '\\(4p = -12\\), so \\(p = -3\\). Focus: \\((0, -3)\\). Directrix: \\(y = 3\\). The parabola opens downward.'
                },
                {
                    question: 'Write the equation of the parabola with focus \\((0, 5)\\) and directrix \\(y = -5\\).',
                    hint: 'Since \\(p = 5\\), use \\(x^2 = 4py\\).',
                    solution: '\\(x^2 = 4(5)y = 20y\\), or equivalently \\(y = \\frac{x^2}{20}\\).'
                },
                {
                    question: 'Find the equation of the parabola with vertex at the origin that opens to the right and passes through \\((3, 6)\\).',
                    hint: 'Use \\(y^2 = 4px\\) and substitute the point.',
                    solution: '\\(6^2 = 4p \\cdot 3\\), so \\(36 = 12p\\), giving \\(p = 3\\). Equation: \\(y^2 = 12x\\).'
                },
                {
                    question: 'A satellite dish is parabolic with diameter 2 m and depth 0.5 m. Where should the receiver (focus) be placed?',
                    hint: 'Place the vertex at the origin. The rim point is at \\((1, 0.5)\\) on the parabola \\(x^2 = 4py\\).',
                    solution: '\\(1^2 = 4p(0.5)\\), so \\(1 = 2p\\), giving \\(p = 0.5\\) m. The receiver should be placed 0.5 m from the vertex.'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Ellipses
        // ============================================================
        {
            id: 'ch14-sec03',
            title: 'Ellipses',
            content: `<h2>Ellipses</h2>

<div class="env-block definition">
<div class="env-title">Definition (Ellipse)</div>
<div class="env-body"><p>An <strong>ellipse</strong> is the set of all points \\(P\\) such that the sum of the distances from \\(P\\) to two fixed points (the <strong>foci</strong>) is constant:
\\[d(P, F_1) + d(P, F_2) = 2a\\]
where \\(2a\\) is the length of the major axis.</p></div>
</div>

<div class="env-block theorem">
<div class="env-title">Standard Equation of an Ellipse (Center at Origin)</div>
<div class="env-body"><p>
<strong>Horizontal major axis:</strong>
\\[\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1 \\quad (a > b > 0)\\]
Foci at \\((\\pm c, 0)\\) where \\(c^2 = a^2 - b^2\\).

<strong>Vertical major axis:</strong>
\\[\\frac{x^2}{b^2} + \\frac{y^2}{a^2} = 1 \\quad (a > b > 0)\\]
Foci at \\((0, \\pm c)\\) where \\(c^2 = a^2 - b^2\\).</p></div>
</div>

<h3>Key Terminology</h3>
<ul>
<li><strong>Semi-major axis</strong>: \\(a\\) (half the longest diameter).</li>
<li><strong>Semi-minor axis</strong>: \\(b\\) (half the shortest diameter).</li>
<li><strong>Eccentricity</strong>: \\(e = c/a\\). For an ellipse, \\(0 < e < 1\\). A circle has \\(e = 0\\).</li>
<li><strong>Vertices</strong>: the endpoints of the major axis, at distance \\(a\\) from center.</li>
</ul>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body"><p>For \\(\\frac{x^2}{25} + \\frac{y^2}{9} = 1\\):
\\(a = 5\\), \\(b = 3\\), \\(c = \\sqrt{25 - 9} = 4\\).
Foci: \\((\\pm 4, 0)\\). Eccentricity: \\(e = 4/5 = 0.8\\).</p></div>
</div>

<div class="viz-placeholder" data-viz="viz-ellipse-foci"></div>`,

            visualizations: [
                {
                    id: 'viz-ellipse-foci',
                    title: 'Ellipse: Foci & Sum of Distances',
                    description: 'Adjust a and b. A draggable point on the ellipse shows that the sum of distances to the foci is always 2a.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 30 });
                        var a = 5, b = 3;
                        var theta = 0.7;

                        VizEngine.createSlider(controls, 'a', 1, 7, a, 0.1, function(v) { a = Math.max(v, b + 0.1); draw(); });
                        VizEngine.createSlider(controls, 'b', 0.5, 6, b, 0.1, function(v) { b = Math.min(v, a - 0.1); draw(); });
                        VizEngine.createSlider(controls, 'Point angle', 0, 6.28, theta, 0.05, function(v) { theta = v; draw(); });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var c = Math.sqrt(Math.max(a * a - b * b, 0));

                            // Ellipse
                            viz.drawEllipse(0, 0, a, b, 0, viz.colors.blue + '22', viz.colors.blue);

                            // Foci
                            viz.drawPoint(-c, 0, viz.colors.red, 'F1(-' + c.toFixed(1) + ', 0)', 5);
                            viz.drawPoint(c, 0, viz.colors.red, 'F2(' + c.toFixed(1) + ', 0)', 5);

                            // Vertices
                            viz.drawPoint(-a, 0, viz.colors.teal, '', 3);
                            viz.drawPoint(a, 0, viz.colors.teal, '', 3);
                            viz.drawPoint(0, -b, viz.colors.teal, '', 3);
                            viz.drawPoint(0, b, viz.colors.teal, '', 3);

                            // Point on ellipse
                            var px = a * Math.cos(theta);
                            var py = b * Math.sin(theta);
                            viz.drawPoint(px, py, viz.colors.orange, 'P', 6);

                            // Lines to foci
                            viz.drawSegment(px, py, -c, 0, viz.colors.yellow + 'aa', 1.5, true);
                            viz.drawSegment(px, py, c, 0, viz.colors.yellow + 'aa', 1.5, true);

                            var d1 = Math.sqrt((px + c) * (px + c) + py * py);
                            var d2 = Math.sqrt((px - c) * (px - c) + py * py);

                            viz.screenText('d(P,F1) = ' + d1.toFixed(2) + '  +  d(P,F2) = ' + d2.toFixed(2) + '  =  ' + (d1 + d2).toFixed(2) + '  (2a = ' + (2 * a).toFixed(1) + ')', viz.width / 2, viz.height - 14, viz.colors.white, 11);
                            viz.screenText('e = c/a = ' + (c / a).toFixed(3), viz.width / 2, 16, viz.colors.teal, 12);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the foci and eccentricity of \\(\\frac{x^2}{16} + \\frac{y^2}{9} = 1\\).',
                    hint: '\\(a^2 = 16\\), \\(b^2 = 9\\). Use \\(c^2 = a^2 - b^2\\).',
                    solution: '\\(a = 4\\), \\(b = 3\\), \\(c = \\sqrt{16 - 9} = \\sqrt{7}\\). Foci: \\((\\pm\\sqrt{7}, 0)\\). Eccentricity: \\(e = \\sqrt{7}/4 \\approx 0.661\\).'
                },
                {
                    question: 'Write the equation of the ellipse with foci \\((0, \\pm 3)\\) and major axis length 10.',
                    hint: '\\(c = 3\\), \\(2a = 10\\) so \\(a = 5\\). Find \\(b\\) using \\(c^2 = a^2 - b^2\\). The major axis is vertical.',
                    solution: '\\(b^2 = 25 - 9 = 16\\). Equation: \\(\\frac{x^2}{16} + \\frac{y^2}{25} = 1\\).'
                },
                {
                    question: 'An ellipse has equation \\(4x^2 + 9y^2 = 36\\). Find its vertices and foci.',
                    hint: 'Divide by 36 to get standard form.',
                    solution: '\\(\\frac{x^2}{9} + \\frac{y^2}{4} = 1\\). So \\(a = 3\\), \\(b = 2\\), \\(c = \\sqrt{5}\\). Vertices: \\((\\pm 3, 0)\\). Foci: \\((\\pm\\sqrt{5}, 0)\\).'
                },
                {
                    question: 'The orbit of Earth around the Sun is approximately an ellipse with semi-major axis \\(a = 1.496 \\times 10^8\\) km and eccentricity \\(e = 0.0167\\). Find the distance between the Sun and the center of the ellipse.',
                    hint: 'Use \\(c = ea\\).',
                    solution: '\\(c = 0.0167 \\times 1.496 \\times 10^8 = 2.498 \\times 10^6\\) km. The Sun is about 2.5 million km from the center of the elliptical orbit.'
                }
            ]
        },

        // ============================================================
        // SECTION 4: Hyperbolas
        // ============================================================
        {
            id: 'ch14-sec04',
            title: 'Hyperbolas',
            content: `<h2>Hyperbolas</h2>

<div class="env-block definition">
<div class="env-title">Definition (Hyperbola)</div>
<div class="env-body"><p>A <strong>hyperbola</strong> is the set of all points \\(P\\) such that the <em>absolute difference</em> of the distances from \\(P\\) to two fixed foci is constant:
\\[|d(P, F_1) - d(P, F_2)| = 2a\\]</p></div>
</div>

<div class="env-block theorem">
<div class="env-title">Standard Equations of a Hyperbola (Center at Origin)</div>
<div class="env-body"><p>
<strong>Horizontal transverse axis:</strong>
\\[\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1\\]
Foci at \\((\\pm c, 0)\\) where \\(c^2 = a^2 + b^2\\). Asymptotes: \\(y = \\pm \\frac{b}{a}x\\).

<strong>Vertical transverse axis:</strong>
\\[\\frac{y^2}{a^2} - \\frac{x^2}{b^2} = 1\\]
Foci at \\((0, \\pm c)\\) where \\(c^2 = a^2 + b^2\\). Asymptotes: \\(y = \\pm \\frac{a}{b}x\\).</p></div>
</div>

<h3>Key Features</h3>
<ul>
<li><strong>Vertices</strong>: on the transverse axis, at distance \\(a\\) from center.</li>
<li><strong>Asymptotes</strong>: lines the hyperbola approaches but never touches.</li>
<li><strong>Eccentricity</strong>: \\(e = c/a > 1\\) for every hyperbola.</li>
</ul>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body"><p>For \\(\\frac{x^2}{9} - \\frac{y^2}{16} = 1\\):
\\(a = 3\\), \\(b = 4\\), \\(c = \\sqrt{9+16} = 5\\).
Vertices: \\((\\pm 3, 0)\\). Foci: \\((\\pm 5, 0)\\). Asymptotes: \\(y = \\pm \\frac{4}{3}x\\).</p></div>
</div>

<div class="env-block warning">
<div class="env-title">Ellipse vs. Hyperbola</div>
<div class="env-body"><p>For an ellipse, \\(c^2 = a^2 - b^2\\) (sum of distances is constant). For a hyperbola, \\(c^2 = a^2 + b^2\\) (difference of distances is constant). Do not confuse these!</p></div>
</div>

<div class="viz-placeholder" data-viz="viz-hyperbola"></div>

<div class="viz-placeholder" data-viz="viz-conic-family"></div>`,

            visualizations: [
                {
                    id: 'viz-hyperbola',
                    title: 'Hyperbola: Asymptotes & Foci',
                    description: 'Adjust a and b for a horizontal hyperbola. See the asymptotes, foci, and the difference of distances property.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 25 });
                        var a = 3, b = 2;
                        var theta = 0.5;

                        VizEngine.createSlider(controls, 'a', 1, 6, a, 0.1, function(v) { a = v; draw(); });
                        VizEngine.createSlider(controls, 'b', 0.5, 5, b, 0.1, function(v) { b = v; draw(); });
                        VizEngine.createSlider(controls, 'Point t', 0.1, 2.5, theta, 0.05, function(v) { theta = v; draw(); });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var c = Math.sqrt(a * a + b * b);

                            // Asymptotes
                            var slope = b / a;
                            viz.drawLine(-8, -8 * slope, 8, 8 * slope, viz.colors.text + '66', 1, true);
                            viz.drawLine(-8, 8 * slope, 8, -8 * slope, viz.colors.text + '66', 1, true);

                            // Draw hyperbola (parametric: x = a*cosh(t), y = b*sinh(t))
                            viz.drawParametric(
                                function(t) { return a * Math.cosh(t); },
                                function(t) { return b * Math.sinh(t); },
                                -3, 3, viz.colors.blue, 2.5
                            );
                            viz.drawParametric(
                                function(t) { return -a * Math.cosh(t); },
                                function(t) { return b * Math.sinh(t); },
                                -3, 3, viz.colors.blue, 2.5
                            );

                            // Foci
                            viz.drawPoint(-c, 0, viz.colors.red, 'F1', 5);
                            viz.drawPoint(c, 0, viz.colors.red, 'F2', 5);

                            // Vertices
                            viz.drawPoint(-a, 0, viz.colors.teal, 'V1', 4);
                            viz.drawPoint(a, 0, viz.colors.teal, 'V2', 4);

                            // Point on right branch
                            var px = a * Math.cosh(theta);
                            var py = b * Math.sinh(theta);
                            viz.drawPoint(px, py, viz.colors.orange, 'P', 5);
                            viz.drawSegment(px, py, -c, 0, viz.colors.yellow + 'aa', 1.5, true);
                            viz.drawSegment(px, py, c, 0, viz.colors.yellow + 'aa', 1.5, true);

                            var d1 = Math.sqrt((px + c) * (px + c) + py * py);
                            var d2 = Math.sqrt((px - c) * (px - c) + py * py);

                            viz.screenText('|d1 - d2| = |' + d1.toFixed(2) + ' - ' + d2.toFixed(2) + '| = ' + Math.abs(d1 - d2).toFixed(2) + '  (2a = ' + (2 * a).toFixed(1) + ')', viz.width / 2, viz.height - 14, viz.colors.white, 11);
                            viz.screenText('Asymptotes: y = +/- ' + slope.toFixed(2) + 'x | e = ' + (c / a).toFixed(2), viz.width / 2, 16, viz.colors.teal, 12);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-conic-family',
                    title: 'Conic Family by Eccentricity',
                    description: 'Adjust eccentricity to see the conic morph from a circle through ellipses to a parabola and hyperbolas.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 20 });
                        var e = 0.5;
                        var d = 4; // directrix distance

                        VizEngine.createSlider(controls, 'Eccentricity e', 0, 2.5, e, 0.01, function(v) { e = v; draw(); });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Focus at origin, directrix at x = -d/e (for horizontal)
                            // Polar form: r = ed/(1 + e*cos(theta))
                            if (e < 0.001) {
                                // Circle
                                viz.drawCircle(0, 0, d, viz.colors.blue + '22', viz.colors.blue, 2);
                                viz.screenText('e = 0: Circle', viz.width / 2, 16, viz.colors.green, 13);
                            } else {
                                viz.drawParametric(
                                    function(t) { return e * d * Math.cos(t) / (1 + e * Math.cos(t)); },
                                    function(t) { return e * d * Math.sin(t) / (1 + e * Math.cos(t)); },
                                    -3.1, 3.1, viz.colors.blue, 2.5, 600
                                );

                                var label = '';
                                var col = viz.colors.white;
                                if (e < 0.999) { label = 'e < 1: Ellipse'; col = viz.colors.green; }
                                else if (e < 1.001) { label = 'e = 1: Parabola'; col = viz.colors.yellow; }
                                else { label = 'e > 1: Hyperbola'; col = viz.colors.orange; }
                                viz.screenText(label + ' (e = ' + e.toFixed(2) + ')', viz.width / 2, 16, col, 13);
                            }

                            viz.drawPoint(0, 0, viz.colors.red, 'Focus', 4);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the foci, vertices, and asymptotes of \\(\\frac{x^2}{4} - \\frac{y^2}{12} = 1\\).',
                    hint: '\\(a^2 = 4\\), \\(b^2 = 12\\). Compute \\(c\\) from \\(c^2 = a^2 + b^2\\).',
                    solution: '\\(a = 2\\), \\(b = 2\\sqrt{3}\\), \\(c = \\sqrt{4+12} = 4\\). Vertices: \\((\\pm 2, 0)\\). Foci: \\((\\pm 4, 0)\\). Asymptotes: \\(y = \\pm \\sqrt{3}\\, x\\).'
                },
                {
                    question: 'Write the equation of the hyperbola with foci \\((\\pm 5, 0)\\) and vertices \\((\\pm 3, 0)\\).',
                    hint: '\\(c = 5\\), \\(a = 3\\). Find \\(b\\).',
                    solution: '\\(b^2 = c^2 - a^2 = 25 - 9 = 16\\). Equation: \\(\\frac{x^2}{9} - \\frac{y^2}{16} = 1\\).'
                },
                {
                    question: 'For the hyperbola \\(\\frac{y^2}{9} - \\frac{x^2}{4} = 1\\), find the asymptotes and eccentricity.',
                    hint: 'This is a vertical transverse axis hyperbola. Asymptotes: \\(y = \\pm \\frac{a}{b}x\\).',
                    solution: '\\(a = 3\\), \\(b = 2\\), \\(c = \\sqrt{9+4} = \\sqrt{13}\\). Asymptotes: \\(y = \\pm \\frac{3}{2}x\\). Eccentricity: \\(e = \\sqrt{13}/3 \\approx 1.20\\).'
                },
                {
                    question: 'Classify the conic \\(9x^2 - 4y^2 + 36x + 8y - 4 = 0\\) and find its center.',
                    hint: 'Complete the square in both \\(x\\) and \\(y\\). The signs of the squared terms tell you the type.',
                    solution: '\\(9(x^2+4x+4) - 4(y^2-2y+1) = 4 + 36 - 4 = 36\\). So \\(9(x+2)^2 - 4(y-1)^2 = 36\\), i.e., \\(\\frac{(x+2)^2}{4} - \\frac{(y-1)^2}{9} = 1\\). This is a hyperbola with center \\((-2, 1)\\).'
                }
            ]
        }
    ]
});
