window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch06',
    number: 6,
    title: 'Right Triangles & Trigonometry',
    subtitle: 'Pythagorean theorem, special triangles, and trigonometric ratios for solving right triangles',
    sections: [
        // ============================================================
        // SECTION 1: Pythagorean Theorem
        // ============================================================
        {
            id: 'ch06-sec01',
            title: 'The Pythagorean Theorem',
            content: `<h2>The Pythagorean Theorem</h2>

                <div class="env-block intuition">
                    <div class="env-title">The Big Picture</div>
                    <div class="env-body"><p>The Pythagorean theorem is one of the most important results in all of mathematics. It connects the three sides of a right triangle, and it has been known for over 2,500 years. Every distance formula, every circle equation, and much of trigonometry rests on this single fact.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Right Triangle)</div>
                    <div class="env-body"><p>A <strong>right triangle</strong> is a triangle with exactly one angle measuring \\(90^\\circ\\). The side opposite the right angle is called the <strong>hypotenuse</strong>; the other two sides are called <strong>legs</strong>.</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Pythagorean Theorem</div>
                    <div class="env-body"><p>In a right triangle with legs of lengths \\(a\\) and \\(b\\) and hypotenuse of length \\(c\\),
                    \\[a^2 + b^2 = c^2.\\]</p></div>
                </div>

                <p>Why is this true? There are hundreds of proofs. One of the most elegant uses area: arrange four copies of the triangle inside a large square. The following visualization shows this proof in action.</p>

                <div class="viz-placeholder" data-viz="viz-pyth-proof"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>A right triangle has legs \\(a = 5\\) and \\(b = 12\\). Find the hypotenuse.</p>
                    <p>\\[c = \\sqrt{a^2 + b^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13.\\]</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>A right triangle has hypotenuse \\(c = 10\\) and one leg \\(a = 6\\). Find the other leg.</p>
                    <p>\\[b = \\sqrt{c^2 - a^2} = \\sqrt{100 - 36} = \\sqrt{64} = 8.\\]</p></div>
                </div>

                <h3>Pythagorean Triples</h3>
                <p>A <strong>Pythagorean triple</strong> is a set of three positive integers \\((a, b, c)\\) satisfying \\(a^2 + b^2 = c^2\\). The most common triples are:</p>
                <ul>
                    <li>\\((3, 4, 5)\\) and its multiples \\((6, 8, 10)\\), \\((9, 12, 15)\\), etc.</li>
                    <li>\\((5, 12, 13)\\)</li>
                    <li>\\((8, 15, 17)\\)</li>
                    <li>\\((7, 24, 25)\\)</li>
                </ul>

                <div class="viz-placeholder" data-viz="viz-pyth-interactive"></div>`,

            visualizations: [
                {
                    id: 'viz-pyth-proof',
                    title: 'Pythagorean Theorem Proof by Rearrangement',
                    description: 'Watch four identical right triangles rearrange inside a square to prove a² + b² = c². Use the slider to animate.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40, originX: 280, originY: 260, height: 380 });
                        var t = 0;

                        VizEngine.createSlider(controls, 'Animation t', 0, 1, 0, 0.01, function(val) {
                            t = val;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var a = 3, b = 4, c = Math.sqrt(a * a + b * b);
                            var s = a + b;
                            var ox = 60, oy = 30;
                            var sc = 38;

                            // Outer square
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(ox, oy, s * sc, s * sc);

                            // Four triangles in arrangement 1 (t=0): forms c² square in middle
                            // arrangement 2 (t=1): forms a² and b² squares
                            var triColor = viz.colors.blue + '88';
                            ctx.fillStyle = triColor;

                            // Triangle vertices at t=0: c² proof arrangement
                            // At t=0, inner square of side c is visible
                            // At t=1, rearranged into two rectangles showing a² + b²
                            var triangles0 = [
                                [[0, 0], [b, 0], [0, a]],
                                [[s, 0], [s, b], [s - a, 0]],
                                [[s, s], [s - b, s], [s, s - a]],
                                [[0, s], [0, s - b], [a, s]]
                            ];
                            var triangles1 = [
                                [[0, 0], [b, 0], [0, a]],
                                [[b, 0], [s, 0], [s, a]],
                                [[s, a], [s, s], [b, s]],
                                [[0, a], [0, s], [b, s]]
                            ];

                            for (var i = 0; i < 4; i++) {
                                ctx.fillStyle = [viz.colors.blue + '88', viz.colors.teal + '88', viz.colors.orange + '88', viz.colors.purple + '88'][i];
                                ctx.beginPath();
                                for (var j = 0; j < 3; j++) {
                                    var x0 = triangles0[i][j][0];
                                    var y0 = triangles0[i][j][1];
                                    var x1 = triangles1[i][j][0];
                                    var y1 = triangles1[i][j][1];
                                    var px = ox + (x0 + (x1 - x0) * t) * sc;
                                    var py = oy + (y0 + (y1 - y0) * t) * sc;
                                    if (j === 0) ctx.moveTo(px, py);
                                    else ctx.lineTo(px, py);
                                }
                                ctx.closePath();
                                ctx.fill();
                                ctx.strokeStyle = viz.colors.white + '88';
                                ctx.lineWidth = 1;
                                ctx.stroke();
                            }

                            // Labels
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';

                            if (t < 0.5) {
                                // Show c² label in center
                                var cx = ox + s * sc / 2;
                                var cy = oy + s * sc / 2;
                                ctx.fillStyle = viz.colors.red;
                                ctx.fillText('c\u00B2 = ' + (c * c).toFixed(0), cx, cy);
                            } else {
                                // Show a² and b² labels
                                ctx.fillStyle = viz.colors.green;
                                ctx.fillText('a\u00B2 = ' + (a * a).toFixed(0), ox + b * sc + (s - b) * sc / 2, oy + a * sc / 2);
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.fillText('b\u00B2 = ' + (b * b).toFixed(0), ox + b * sc / 2, oy + a * sc + (s - a) * sc / 2);
                            }

                            // Bottom equation
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('a = ' + a + ',  b = ' + b + ',  c = ' + c.toFixed(0), viz.width / 2, viz.height - 40);
                            ctx.fillText('a\u00B2 + b\u00B2 = ' + (a * a) + ' + ' + (b * b) + ' = ' + (a * a + b * b) + ' = c\u00B2', viz.width / 2, viz.height - 15);
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-pyth-interactive',
                    title: 'Interactive Right Triangle',
                    description: 'Drag the vertex to change the right triangle. The Pythagorean theorem is verified in real time.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40, originX: 80, originY: 280, height: 360 });
                        var pt = viz.addDraggable('vertex', 4, 3, viz.colors.orange, 10);

                        function draw() {
                            if (pt.x < 0.5) pt.x = 0.5;
                            if (pt.y < 0.5) pt.y = 0.5;
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ctx = viz.ctx;
                            var a = pt.x;
                            var b = pt.y;
                            var c = Math.sqrt(a * a + b * b);

                            // Draw the right triangle
                            viz.drawPolygon([[0, 0], [a, 0], [0, b]], viz.colors.blue + '22', viz.colors.blue, 2);

                            // Right angle marker
                            var markSize = 0.3;
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 1;
                            var s0 = viz.toScreen(markSize, 0);
                            var s1 = viz.toScreen(markSize, markSize);
                            var s2 = viz.toScreen(0, markSize);
                            ctx.beginPath();
                            ctx.moveTo(s0[0], s0[1]);
                            ctx.lineTo(s1[0], s1[1]);
                            ctx.lineTo(s2[0], s2[1]);
                            ctx.stroke();

                            // Squares on each side
                            // Square on a (bottom)
                            viz.drawPolygon([[0, 0], [a, 0], [a, -a], [0, -a]], viz.colors.green + '15', viz.colors.green, 1);
                            // Square on b (left)
                            viz.drawPolygon([[0, 0], [0, b], [-b, b], [-b, 0]], viz.colors.purple + '15', viz.colors.purple, 1);
                            // Square on c (hypotenuse)
                            var nx = -b / c, ny = a / c;
                            var p1x = a + nx * c, p1y = 0 + ny * c;
                            var p2x = 0 + nx * c, p2y = b + ny * c;
                            viz.drawPolygon([[a, 0], [p1x, p1y], [p2x, p2y], [0, b]], viz.colors.red + '15', viz.colors.red, 1);

                            // Labels on sides
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            var sa = viz.toScreen(a / 2, -0.3);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('a = ' + a.toFixed(2), sa[0], sa[1]);

                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            var sb = viz.toScreen(-0.4, b / 2);
                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillText('b = ' + b.toFixed(2), sb[0], sb[1]);

                            ctx.textAlign = 'left';
                            var midH = viz.toScreen(a / 2 + 0.3, b / 2 + 0.3);
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillText('c = ' + c.toFixed(2), midH[0], midH[1]);

                            // Area labels in squares
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            var sa2 = viz.toScreen(a / 2, -a / 2);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('a\u00B2=' + (a * a).toFixed(1), sa2[0], sa2[1]);

                            var sb2 = viz.toScreen(-b / 2, b / 2);
                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillText('b\u00B2=' + (b * b).toFixed(1), sb2[0], sb2[1]);

                            // Verification
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.white;
                            ctx.textAlign = 'center';
                            viz.screenText('a\u00B2 + b\u00B2 = ' + (a * a).toFixed(1) + ' + ' + (b * b).toFixed(1) + ' = ' + (a * a + b * b).toFixed(1), viz.width / 2, 25, viz.colors.white, 16);
                            viz.screenText('c\u00B2 = ' + (c * c).toFixed(1), viz.width / 2, 48, viz.colors.red, 16);

                            var check = Math.abs((a * a + b * b) - c * c) < 0.01;
                            viz.screenText(check ? 'Verified!' : '', viz.width / 2, 70, viz.colors.green, 14);

                            // Draw vertices
                            viz.drawPoint(0, 0, viz.colors.white, 'O', 4);
                            viz.drawPoint(a, 0, viz.colors.green, 'A', 4);
                            viz.drawPoint(0, b, viz.colors.purple, 'B', 4);
                            viz.drawDraggables();
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'A right triangle has legs of length 6 and 8. Find the length of the hypotenuse.',
                    hint: 'Apply \\(c = \\sqrt{a^2 + b^2}\\).',
                    solution: '\\(c = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10\\).'
                },
                {
                    question: 'A right triangle has hypotenuse 13 and one leg 5. Find the other leg.',
                    hint: 'Rearrange: \\(b = \\sqrt{c^2 - a^2}\\).',
                    solution: '\\(b = \\sqrt{13^2 - 5^2} = \\sqrt{169 - 25} = \\sqrt{144} = 12\\).'
                },
                {
                    question: 'Determine whether a triangle with sides 7, 10, and 12 is a right triangle.',
                    hint: 'Check if the square of the longest side equals the sum of squares of the other two.',
                    solution: '\\(7^2 + 10^2 = 49 + 100 = 149\\), but \\(12^2 = 144\\). Since \\(149 \\neq 144\\), this is <strong>not</strong> a right triangle.'
                },
                {
                    question: 'A ladder 15 feet long leans against a wall. Its base is 9 feet from the wall. How high up the wall does the ladder reach?',
                    hint: 'The ladder is the hypotenuse, the distance from the wall is one leg, and the height is the other leg.',
                    solution: '\\(h = \\sqrt{15^2 - 9^2} = \\sqrt{225 - 81} = \\sqrt{144} = 12\\) feet.'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Special Right Triangles
        // ============================================================
        {
            id: 'ch06-sec02',
            title: 'Special Right Triangles',
            content: `<h2>Special Right Triangles</h2>

                <div class="env-block intuition">
                    <div class="env-title">Why Special?</div>
                    <div class="env-body"><p>Two families of right triangles appear so often in mathematics, architecture, and physics that their side ratios are worth memorizing: the <strong>45-45-90</strong> triangle and the <strong>30-60-90</strong> triangle. Knowing their ratios lets you find missing sides instantly, without a calculator.</p></div>
                </div>

                <h3>The 45-45-90 Triangle</h3>

                <div class="env-block theorem">
                    <div class="env-title">45-45-90 Triangle Theorem</div>
                    <div class="env-body"><p>In a 45-45-90 triangle, the legs are congruent and the hypotenuse is \\(\\sqrt{2}\\) times the length of each leg. If each leg has length \\(s\\), then:
                    \\[\\text{hypotenuse} = s\\sqrt{2}.\\]</p></div>
                </div>

                <p>This triangle is half of a square, cut along its diagonal. Since a square has four equal sides, both legs are equal.</p>

                <h3>The 30-60-90 Triangle</h3>

                <div class="env-block theorem">
                    <div class="env-title">30-60-90 Triangle Theorem</div>
                    <div class="env-body"><p>In a 30-60-90 triangle, if the shortest side (opposite the \\(30^\\circ\\) angle) has length \\(s\\), then:
                    \\[\\text{longer leg} = s\\sqrt{3}, \\qquad \\text{hypotenuse} = 2s.\\]
                    The side ratio is \\(1 : \\sqrt{3} : 2\\).</p></div>
                </div>

                <p>This triangle is half of an equilateral triangle, cut along an altitude.</p>

                <div class="viz-placeholder" data-viz="viz-special-triangles"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>In a 45-45-90 triangle, the hypotenuse is 10. Find the legs.</p>
                    <p>\\[s = \\frac{10}{\\sqrt{2}} = \\frac{10\\sqrt{2}}{2} = 5\\sqrt{2} \\approx 7.07.\\]</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>In a 30-60-90 triangle, the side opposite \\(60^\\circ\\) is \\(6\\sqrt{3}\\). Find the other sides.</p>
                    <p>Since the longer leg is \\(s\\sqrt{3}\\), we have \\(s\\sqrt{3} = 6\\sqrt{3}\\), so \\(s = 6\\). The hypotenuse is \\(2s = 12\\).</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-special-triangles',
                    title: 'Special Right Triangles',
                    description: 'See the 45-45-90 and 30-60-90 triangles with their side ratios. Use the slider to scale them.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 50, originX: 280, originY: 240, height: 340 });
                        var s = 2;

                        VizEngine.createSlider(controls, 'Scale s', 0.5, 4, 2, 0.1, function(val) {
                            s = val;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // 45-45-90 on the left
                            var lx = 80, ly = 250;
                            var side = s * 50;
                            var hyp = side * Math.sqrt(2);

                            ctx.fillStyle = viz.colors.blue + '22';
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(lx, ly);
                            ctx.lineTo(lx + side, ly);
                            ctx.lineTo(lx, ly - side);
                            ctx.closePath();
                            ctx.fill();
                            ctx.stroke();

                            // Right angle marker
                            var m = 12;
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(lx + m, ly);
                            ctx.lineTo(lx + m, ly - m);
                            ctx.lineTo(lx, ly - m);
                            ctx.stroke();

                            // Labels
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('s = ' + s.toFixed(1), lx + side / 2, ly + 8);

                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillText('s = ' + s.toFixed(1), lx - 8, ly - side / 2);

                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'middle';
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillText('s\u221A2 = ' + (s * Math.sqrt(2)).toFixed(2), lx + side / 2 + 5, ly - side / 2 - 5);

                            // Angle labels
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.textAlign = 'left';
                            ctx.fillText('45\u00B0', lx + side - 30, ly - 15);
                            ctx.textAlign = 'right';
                            ctx.fillText('45\u00B0', lx + 15, ly - side + 20);

                            // Title
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.white;
                            ctx.textAlign = 'center';
                            ctx.fillText('45-45-90', lx + side / 2, ly - side - 30);

                            // 30-60-90 on the right
                            var rx = 320, ry = 250;
                            var shortSide = s * 50;
                            var longSide = shortSide * Math.sqrt(3);
                            var hypSide = shortSide * 2;

                            ctx.fillStyle = viz.colors.teal + '22';
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(rx, ry);
                            ctx.lineTo(rx + longSide, ry);
                            ctx.lineTo(rx, ry - shortSide);
                            ctx.closePath();
                            ctx.fill();
                            ctx.stroke();

                            // Right angle marker
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(rx + m, ry);
                            ctx.lineTo(rx + m, ry - m);
                            ctx.lineTo(rx, ry - m);
                            ctx.stroke();

                            // Labels
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('s\u221A3 = ' + (s * Math.sqrt(3)).toFixed(2), rx + longSide / 2, ry + 8);

                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillText('s = ' + s.toFixed(1), rx - 8, ry - shortSide / 2);

                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'middle';
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillText('2s = ' + (2 * s).toFixed(1), rx + longSide / 2 + 5, ry - shortSide / 2 - 5);

                            // Angle labels
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.textAlign = 'left';
                            ctx.fillText('30\u00B0', rx + longSide - 35, ry - 15);
                            ctx.textAlign = 'right';
                            ctx.fillText('60\u00B0', rx + 20, ry - shortSide + 15);

                            // Title
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.white;
                            ctx.textAlign = 'center';
                            ctx.fillText('30-60-90', rx + longSide / 2, ry - shortSide - 30);

                            // Ratio summary
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.orange;
                            ctx.textAlign = 'center';
                            viz.screenText('45-45-90 ratio:  1 : 1 : \u221A2', viz.width / 4, viz.height - 15, viz.colors.blue, 13);
                            viz.screenText('30-60-90 ratio:  1 : \u221A3 : 2', 3 * viz.width / 4, viz.height - 15, viz.colors.teal, 13);
                        }

                        draw();
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'In a 45-45-90 triangle, each leg has length 7. Find the hypotenuse.',
                    hint: 'The hypotenuse is \\(s\\sqrt{2}\\).',
                    solution: '\\(\\text{hypotenuse} = 7\\sqrt{2} \\approx 9.90\\).'
                },
                {
                    question: 'In a 30-60-90 triangle, the hypotenuse is 20. Find both legs.',
                    hint: 'The short leg is half the hypotenuse; the long leg is the short leg times \\(\\sqrt{3}\\).',
                    solution: 'Short leg \\(= 20/2 = 10\\). Long leg \\(= 10\\sqrt{3} \\approx 17.32\\).'
                },
                {
                    question: 'The diagonal of a square is 12 cm. Find the side length of the square.',
                    hint: 'A diagonal splits the square into two 45-45-90 triangles. The diagonal is the hypotenuse.',
                    solution: '\\(s\\sqrt{2} = 12\\), so \\(s = 12/\\sqrt{2} = 6\\sqrt{2} \\approx 8.49\\) cm.'
                },
                {
                    question: 'An equilateral triangle has side length 8. Find the height.',
                    hint: 'The altitude splits the equilateral triangle into two 30-60-90 triangles.',
                    solution: 'Half the base is 4 (the short leg). The height is \\(4\\sqrt{3} \\approx 6.93\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Trigonometric Ratios
        // ============================================================
        {
            id: 'ch06-sec03',
            title: 'Trigonometric Ratios',
            content: `<h2>Trigonometric Ratios</h2>

                <div class="env-block intuition">
                    <div class="env-title">The Big Picture</div>
                    <div class="env-body"><p>Trigonometric ratios let you relate angles to side lengths in a right triangle. They are the bridge between angle measurement and distance measurement, and form the foundation of trigonometry.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Trig Ratios)</div>
                    <div class="env-body"><p>For an acute angle \\(\\theta\\) in a right triangle, the three primary trigonometric ratios are:
                    \\[\\sin\\theta = \\frac{\\text{opposite}}{\\text{hypotenuse}}, \\qquad \\cos\\theta = \\frac{\\text{adjacent}}{\\text{hypotenuse}}, \\qquad \\tan\\theta = \\frac{\\text{opposite}}{\\text{adjacent}}.\\]</p>
                    <p>A popular mnemonic is <strong>SOH-CAH-TOA</strong>.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-trig-ratios"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>In a right triangle with legs 3 (opposite) and 4 (adjacent) and hypotenuse 5, find the trig ratios of the angle \\(\\theta\\) opposite the side of length 3.</p>
                    <p>\\[\\sin\\theta = \\frac{3}{5}, \\qquad \\cos\\theta = \\frac{4}{5}, \\qquad \\tan\\theta = \\frac{3}{4}.\\]</p></div>
                </div>

                <h3>Key Identity</h3>
                <div class="env-block theorem">
                    <div class="env-title">Pythagorean Identity</div>
                    <div class="env-body"><p>For any angle \\(\\theta\\):
                    \\[\\sin^2\\theta + \\cos^2\\theta = 1.\\]
                    This follows directly from the Pythagorean theorem applied to a right triangle with hypotenuse 1.</p></div>
                </div>

                <h3>Exact Values for Special Angles</h3>
                <table style="margin:1em auto;border-collapse:collapse;">
                    <tr style="border-bottom:2px solid #4a4a7a;">
                        <th style="padding:6px 16px;">\\(\\theta\\)</th>
                        <th style="padding:6px 16px;">\\(\\sin\\theta\\)</th>
                        <th style="padding:6px 16px;">\\(\\cos\\theta\\)</th>
                        <th style="padding:6px 16px;">\\(\\tan\\theta\\)</th>
                    </tr>
                    <tr><td style="padding:4px 16px;text-align:center;">\\(30^\\circ\\)</td><td style="text-align:center;">\\(\\frac{1}{2}\\)</td><td style="text-align:center;">\\(\\frac{\\sqrt{3}}{2}\\)</td><td style="text-align:center;">\\(\\frac{1}{\\sqrt{3}}\\)</td></tr>
                    <tr><td style="padding:4px 16px;text-align:center;">\\(45^\\circ\\)</td><td style="text-align:center;">\\(\\frac{\\sqrt{2}}{2}\\)</td><td style="text-align:center;">\\(\\frac{\\sqrt{2}}{2}\\)</td><td style="text-align:center;">\\(1\\)</td></tr>
                    <tr><td style="padding:4px 16px;text-align:center;">\\(60^\\circ\\)</td><td style="text-align:center;">\\(\\frac{\\sqrt{3}}{2}\\)</td><td style="text-align:center;">\\(\\frac{1}{2}\\)</td><td style="text-align:center;">\\(\\sqrt{3}\\)</td></tr>
                </table>

                <div class="viz-placeholder" data-viz="viz-trig-circle"></div>`,

            visualizations: [
                {
                    id: 'viz-trig-ratios',
                    title: 'Interactive Trig Ratios',
                    description: 'Drag the point to change the angle. All three trig ratios update in real time.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 50, originX: 80, originY: 280, height: 360 });
                        var pt = viz.addDraggable('p', 4, 3, viz.colors.orange, 10);

                        function draw() {
                            if (pt.x < 0.5) pt.x = 0.5;
                            if (pt.y < 0.5) pt.y = 0.5;
                            viz.clear();
                            var ctx = viz.ctx;

                            var opp = pt.y;
                            var adj = pt.x;
                            var hyp = Math.sqrt(opp * opp + adj * adj);
                            var angle = Math.atan2(opp, adj);
                            var angleDeg = angle * 180 / Math.PI;

                            // Draw triangle
                            viz.drawPolygon([[0, 0], [adj, 0], [adj, opp]], viz.colors.blue + '22', viz.colors.blue, 2);

                            // Right angle marker at (adj, 0)
                            var m = 0.25;
                            var s1 = viz.toScreen(adj - m, 0);
                            var s2 = viz.toScreen(adj - m, m);
                            var s3 = viz.toScreen(adj, m);
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(s1[0], s1[1]);
                            ctx.lineTo(s2[0], s2[1]);
                            ctx.lineTo(s3[0], s3[1]);
                            ctx.stroke();

                            // Angle arc at origin
                            var arcR = 30;
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(viz.originX, viz.originY, arcR, -angle, 0);
                            ctx.stroke();

                            // theta label
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('\u03B8 = ' + angleDeg.toFixed(1) + '\u00B0', viz.originX + arcR + 5, viz.originY - arcR / 2);

                            // Side labels
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            // Adjacent (bottom)
                            var adjMid = viz.toScreen(adj / 2, -0.4);
                            ctx.fillStyle = viz.colors.green;
                            ctx.textAlign = 'center';
                            ctx.fillText('adj = ' + adj.toFixed(2), adjMid[0], adjMid[1]);

                            // Opposite (right side)
                            var oppMid = viz.toScreen(adj + 0.5, opp / 2);
                            ctx.fillStyle = viz.colors.purple;
                            ctx.textAlign = 'left';
                            ctx.fillText('opp = ' + opp.toFixed(2), oppMid[0], oppMid[1]);

                            // Hypotenuse
                            var hypMid = viz.toScreen(adj / 2 - 0.5, opp / 2 + 0.3);
                            ctx.fillStyle = viz.colors.red;
                            ctx.textAlign = 'right';
                            ctx.fillText('hyp = ' + hyp.toFixed(2), hypMid[0], hypMid[1]);

                            // Trig ratios display
                            var sinVal = opp / hyp;
                            var cosVal = adj / hyp;
                            var tanVal = opp / adj;

                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            var tx = viz.width - 230, ty = 30;
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('SOH-CAH-TOA', tx, ty);

                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('sin \u03B8 = opp/hyp = ' + sinVal.toFixed(4), tx, ty + 30);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('cos \u03B8 = adj/hyp = ' + cosVal.toFixed(4), tx, ty + 55);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('tan \u03B8 = opp/adj = ' + tanVal.toFixed(4), tx, ty + 80);

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText('sin\u00B2\u03B8 + cos\u00B2\u03B8 = ' + (sinVal * sinVal + cosVal * cosVal).toFixed(4), tx, ty + 110);

                            viz.drawPoint(0, 0, viz.colors.white, '', 4);
                            viz.drawPoint(adj, 0, viz.colors.green, '', 4);
                            viz.drawPoint(adj, opp, viz.colors.purple, '', 4);
                            viz.drawDraggables();
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                },
                {
                    id: 'viz-trig-circle',
                    title: 'Unit Circle View',
                    description: 'See sin and cos as coordinates on the unit circle. Drag the point around the circle.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 100, originX: 200, originY: 180, height: 360 });
                        var angle = Math.PI / 4;
                        var pt = viz.addDraggable('p', Math.cos(angle), Math.sin(angle), viz.colors.orange, 10);

                        function draw() {
                            // Snap to unit circle
                            var len = Math.sqrt(pt.x * pt.x + pt.y * pt.y);
                            if (len > 0.01) {
                                pt.x = pt.x / len;
                                pt.y = pt.y / len;
                            }
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ctx = viz.ctx;
                            var theta = Math.atan2(pt.y, pt.x);
                            if (theta < 0) theta += 2 * Math.PI;
                            var cosVal = pt.x;
                            var sinVal = pt.y;

                            // Unit circle
                            viz.drawCircle(0, 0, 1, null, viz.colors.axis, 1.5);

                            // Radius line
                            viz.drawSegment(0, 0, cosVal, sinVal, viz.colors.white, 2);

                            // Projections
                            viz.drawSegment(cosVal, 0, cosVal, sinVal, viz.colors.blue, 1.5, true);
                            viz.drawSegment(0, 0, cosVal, 0, viz.colors.teal, 2);

                            // Angle arc
                            var arcR = 25;
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(viz.originX, viz.originY, arcR, -theta, 0);
                            ctx.stroke();

                            // Labels
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';

                            // cos label
                            var cosLabelPos = viz.toScreen(cosVal / 2, -0.15);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('cos \u03B8 = ' + cosVal.toFixed(3), cosLabelPos[0], cosLabelPos[1]);

                            // sin label
                            ctx.fillStyle = viz.colors.blue;
                            ctx.textAlign = 'left';
                            var sinLabelPos = viz.toScreen(cosVal + 0.08, sinVal / 2);
                            ctx.fillText('sin \u03B8 = ' + sinVal.toFixed(3), sinLabelPos[0], sinLabelPos[1]);

                            // Angle display
                            var deg = theta * 180 / Math.PI;
                            viz.screenText('\u03B8 = ' + deg.toFixed(1) + '\u00B0', viz.width - 100, 30, viz.colors.yellow, 16);
                            viz.screenText('sin \u03B8 = ' + sinVal.toFixed(4), viz.width - 100, 55, viz.colors.blue, 13);
                            viz.screenText('cos \u03B8 = ' + cosVal.toFixed(4), viz.width - 100, 75, viz.colors.teal, 13);
                            viz.screenText('tan \u03B8 = ' + (cosVal !== 0 ? (sinVal / cosVal).toFixed(4) : 'undef'), viz.width - 100, 95, viz.colors.orange, 13);

                            viz.drawPoint(cosVal, sinVal, viz.colors.orange, '', 6);
                            viz.drawPoint(cosVal, 0, viz.colors.teal, '', 4);
                            viz.drawDraggables();
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'A right triangle has opposite side 5 and hypotenuse 13. Find \\(\\sin\\theta\\), \\(\\cos\\theta\\), and \\(\\tan\\theta\\).',
                    hint: 'First find the adjacent side using the Pythagorean theorem.',
                    solution: 'Adjacent \\(= \\sqrt{13^2 - 5^2} = 12\\). So \\(\\sin\\theta = 5/13\\), \\(\\cos\\theta = 12/13\\), \\(\\tan\\theta = 5/12\\).'
                },
                {
                    question: 'Find the exact value of \\(\\sin 60^\\circ + \\cos 30^\\circ\\).',
                    hint: 'Recall the special angle values from the 30-60-90 triangle.',
                    solution: '\\(\\sin 60^\\circ = \\frac{\\sqrt{3}}{2}\\) and \\(\\cos 30^\\circ = \\frac{\\sqrt{3}}{2}\\). So the sum is \\(\\sqrt{3}\\).'
                },
                {
                    question: 'If \\(\\cos\\theta = 0.6\\) and \\(\\theta\\) is acute, find \\(\\sin\\theta\\) and \\(\\tan\\theta\\).',
                    hint: 'Use the identity \\(\\sin^2\\theta + \\cos^2\\theta = 1\\).',
                    solution: '\\(\\sin\\theta = \\sqrt{1 - 0.36} = \\sqrt{0.64} = 0.8\\). Then \\(\\tan\\theta = 0.8/0.6 = 4/3\\).'
                },
                {
                    question: 'Verify that \\(\\sin^2 45^\\circ + \\cos^2 45^\\circ = 1\\).',
                    hint: 'Use the exact values \\(\\sin 45^\\circ = \\cos 45^\\circ = \\frac{\\sqrt{2}}{2}\\).',
                    solution: '\\(\\left(\\frac{\\sqrt{2}}{2}\\right)^2 + \\left(\\frac{\\sqrt{2}}{2}\\right)^2 = \\frac{2}{4} + \\frac{2}{4} = \\frac{4}{4} = 1\\). Verified.'
                }
            ]
        },

        // ============================================================
        // SECTION 4: Solving Right Triangles
        // ============================================================
        {
            id: 'ch06-sec04',
            title: 'Solving Right Triangles',
            content: `<h2>Solving Right Triangles</h2>

                <div class="env-block intuition">
                    <div class="env-title">The Big Picture</div>
                    <div class="env-body"><p>"Solving" a right triangle means finding all unknown sides and angles. With the Pythagorean theorem and trigonometric ratios, two pieces of information (beyond the right angle) are enough to determine everything else.</p></div>
                </div>

                <h3>Strategy</h3>
                <ol>
                    <li>If you know two sides, use the Pythagorean theorem for the third side and inverse trig to find angles.</li>
                    <li>If you know one side and one acute angle, use trig ratios to find the other sides.</li>
                    <li>The two acute angles always sum to \\(90^\\circ\\).</li>
                </ol>

                <div class="env-block definition">
                    <div class="env-title">Inverse Trig Functions</div>
                    <div class="env-body"><p>If \\(\\sin\\theta = x\\), then \\(\\theta = \\sin^{-1}(x)\\) (also written \\(\\arcsin x\\)). Similarly for \\(\\cos^{-1}\\) and \\(\\tan^{-1}\\).</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-solve-triangle"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>Solve the right triangle with angle \\(A = 35^\\circ\\) and hypotenuse \\(c = 10\\).</p>
                    <p>\\(B = 90^\\circ - 35^\\circ = 55^\\circ\\).</p>
                    <p>\\(a = c \\sin A = 10 \\sin 35^\\circ \\approx 5.74\\).</p>
                    <p>\\(b = c \\cos A = 10 \\cos 35^\\circ \\approx 8.19\\).</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example (Application)</div>
                    <div class="env-body"><p>From a point 50 meters from the base of a building, the angle of elevation to the top is \\(62^\\circ\\). Find the height of the building.</p>
                    <p>\\[h = 50 \\tan 62^\\circ \\approx 50 \\times 1.8807 \\approx 94.0 \\text{ m}.\\]</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-angle-elevation"></div>`,

            visualizations: [
                {
                    id: 'viz-solve-triangle',
                    title: 'Triangle Solver',
                    description: 'Adjust angle A and one side to solve the entire right triangle.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 30, originX: 80, originY: 280, height: 360 });
                        var angleA = 40;
                        var sideC = 8;

                        VizEngine.createSlider(controls, 'Angle A (\u00B0)', 5, 85, 40, 1, function(val) {
                            angleA = val;
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Hypotenuse c', 2, 12, 8, 0.5, function(val) {
                            sideC = val;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var rad = angleA * Math.PI / 180;
                            var a = sideC * Math.sin(rad);
                            var b = sideC * Math.cos(rad);
                            var angleB = 90 - angleA;

                            // Draw triangle
                            viz.drawPolygon([[0, 0], [b, 0], [b, a]], viz.colors.blue + '22', viz.colors.blue, 2);

                            // Hypotenuse
                            viz.drawSegment(0, 0, b, a, viz.colors.red, 2);

                            // Right angle marker at (b, 0)
                            var m = 0.4;
                            var s1 = viz.toScreen(b - m, 0);
                            var s2 = viz.toScreen(b - m, m);
                            var s3 = viz.toScreen(b, m);
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(s1[0], s1[1]);
                            ctx.lineTo(s2[0], s2[1]);
                            ctx.lineTo(s3[0], s3[1]);
                            ctx.stroke();

                            // Angle arc at origin (angle A)
                            var arcR = 35;
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(viz.originX, viz.originY, arcR, -rad, 0);
                            ctx.stroke();
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.textAlign = 'left';
                            ctx.fillText('A=' + angleA.toFixed(0) + '\u00B0', viz.originX + arcR + 5, viz.originY - 15);

                            // Angle arc at top (angle B)
                            var topScreen = viz.toScreen(b, a);
                            ctx.strokeStyle = viz.colors.pink;
                            ctx.beginPath();
                            ctx.arc(topScreen[0], topScreen[1], 25, Math.PI / 2, Math.PI / 2 + (angleB * Math.PI / 180));
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.pink;
                            ctx.textAlign = 'right';
                            ctx.fillText('B=' + angleB.toFixed(0) + '\u00B0', topScreen[0] - 10, topScreen[1] + 20);

                            // Side labels
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            // a (opposite, vertical)
                            ctx.fillStyle = viz.colors.purple;
                            ctx.textAlign = 'left';
                            var aMid = viz.toScreen(b + 0.5, a / 2);
                            ctx.fillText('a = ' + a.toFixed(2), aMid[0], aMid[1]);

                            // b (adjacent, horizontal)
                            ctx.fillStyle = viz.colors.green;
                            ctx.textAlign = 'center';
                            var bMid = viz.toScreen(b / 2, -0.5);
                            ctx.fillText('b = ' + b.toFixed(2), bMid[0], bMid[1]);

                            // c (hypotenuse)
                            ctx.fillStyle = viz.colors.red;
                            ctx.textAlign = 'right';
                            var cMid = viz.toScreen(b / 2 - 0.5, a / 2 + 0.5);
                            ctx.fillText('c = ' + sideC.toFixed(2), cMid[0], cMid[1]);

                            // Summary box
                            var bx = viz.width - 180, by = 20;
                            ctx.fillStyle = viz.colors.bg + 'cc';
                            ctx.fillRect(bx - 10, by - 5, 180, 130);
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(bx - 10, by - 5, 180, 130);

                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('Solution:', bx, by + 12);

                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.fillText('A = ' + angleA.toFixed(1) + '\u00B0', bx, by + 35);
                            ctx.fillStyle = viz.colors.pink;
                            ctx.fillText('B = ' + angleB.toFixed(1) + '\u00B0', bx, by + 55);
                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillText('a = ' + a.toFixed(3), bx, by + 75);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('b = ' + b.toFixed(3), bx, by + 95);
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillText('c = ' + sideC.toFixed(3), bx, by + 115);
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-angle-elevation',
                    title: 'Angle of Elevation',
                    description: 'Drag the observer to change the distance. The angle of elevation and building height update.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 3, originX: 450, originY: 300, height: 360 });
                        var dist = viz.addDraggable('observer', -50, 0, viz.colors.orange, 10);
                        var buildingH = 40;

                        VizEngine.createSlider(controls, 'Building height', 10, 80, 40, 1, function(val) {
                            buildingH = val;
                        });

                        function draw() {
                            dist.y = 0;
                            if (dist.x > -5) dist.x = -5;
                            viz.clear();
                            var ctx = viz.ctx;

                            var d = Math.abs(dist.x);
                            var h = buildingH;
                            var angle = Math.atan2(h, d) * 180 / Math.PI;

                            // Ground line
                            viz.drawSegment(-100, 0, 10, 0, viz.colors.text, 1);

                            // Building
                            var bw = 3;
                            viz.drawPolygon([[0, 0], [bw, 0], [bw, h], [0, h]], viz.colors.teal + '33', viz.colors.teal, 2);

                            // Line of sight
                            viz.drawSegment(dist.x, 0, 0, h, viz.colors.yellow, 2, true);

                            // Distance label
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.green;
                            ctx.textAlign = 'center';
                            var dLabel = viz.toScreen(dist.x / 2, -3);
                            ctx.fillText('d = ' + d.toFixed(1) + ' m', dLabel[0], dLabel[1]);

                            // Height label
                            ctx.fillStyle = viz.colors.purple;
                            ctx.textAlign = 'left';
                            var hLabel = viz.toScreen(bw + 1, h / 2);
                            ctx.fillText('h = ' + h.toFixed(1) + ' m', hLabel[0], hLabel[1]);

                            // Angle
                            var arcR = 30;
                            var obsScreen = viz.toScreen(dist.x, 0);
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 2;
                            var angleRad = angle * Math.PI / 180;
                            ctx.beginPath();
                            ctx.arc(obsScreen[0], obsScreen[1], arcR, -angleRad, 0);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText(angle.toFixed(1) + '\u00B0', obsScreen[0] + arcR + 3, obsScreen[1] - 10);

                            // Observer
                            viz.drawPoint(dist.x, 0, viz.colors.orange, 'Observer', 6);

                            // Equation
                            viz.screenText('h = d \u00B7 tan(\u03B8) = ' + d.toFixed(1) + ' \u00B7 tan(' + angle.toFixed(1) + '\u00B0) = ' + h.toFixed(1) + ' m', viz.width / 2, viz.height - 20, viz.colors.white, 14);

                            viz.drawDraggables();
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'Solve the right triangle: angle \\(A = 28^\\circ\\), side \\(a = 7\\) (opposite to \\(A\\)). Find \\(b\\), \\(c\\), and angle \\(B\\).',
                    hint: '\\(B = 90^\\circ - A\\). Use \\(\\sin A = a/c\\) to find \\(c\\), then use Pythagorean theorem or \\(\\cos A\\) for \\(b\\).',
                    solution: '\\(B = 62^\\circ\\). \\(c = a/\\sin 28^\\circ = 7/0.4695 \\approx 14.91\\). \\(b = c\\cos 28^\\circ \\approx 13.17\\).'
                },
                {
                    question: 'A right triangle has legs 9 and 12. Find both acute angles.',
                    hint: 'Use \\(\\tan\\theta = \\text{opposite}/\\text{adjacent}\\), then take the arctangent.',
                    solution: '\\(\\theta = \\tan^{-1}(9/12) = \\tan^{-1}(0.75) \\approx 36.87^\\circ\\). The other angle is \\(90^\\circ - 36.87^\\circ \\approx 53.13^\\circ\\).'
                },
                {
                    question: 'From the top of a 120-foot cliff, the angle of depression to a boat is \\(25^\\circ\\). How far is the boat from the base of the cliff?',
                    hint: 'The angle of depression equals the angle of elevation from the boat. Use \\(\\tan 25^\\circ = 120/d\\).',
                    solution: '\\(d = 120/\\tan 25^\\circ \\approx 120/0.4663 \\approx 257.3\\) feet.'
                },
                {
                    question: 'A ramp rises 3 feet over a horizontal distance of 18 feet. What angle does the ramp make with the ground?',
                    hint: 'Use \\(\\tan\\theta = \\text{rise}/\\text{run}\\).',
                    solution: '\\(\\theta = \\tan^{-1}(3/18) = \\tan^{-1}(1/6) \\approx 9.46^\\circ\\).'
                }
            ]
        }
    ]
});
