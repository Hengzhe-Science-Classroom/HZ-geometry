window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch02',
    number: 2,
    title: 'Reasoning & Proof',
    subtitle: 'From patterns to certainty: inductive reasoning, conditional logic, and the structure of geometric proof',
    sections: [
        // ============================================================
        // SECTION 1: Inductive vs Deductive Reasoning
        // ============================================================
        {
            id: 'ch02-sec01',
            title: 'Inductive vs Deductive Reasoning',
            content: `<h2>Inductive vs Deductive Reasoning</h2>

                <div class="env-block intuition">
                    <div class="env-title">Two Ways to Think</div>
                    <div class="env-body"><p>Mathematics uses two kinds of reasoning. <strong>Inductive reasoning</strong> looks at specific examples and finds patterns. <strong>Deductive reasoning</strong> starts from known facts and uses logic to reach a conclusion that <em>must</em> be true. Proofs use deductive reasoning; conjectures often begin with inductive reasoning.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Inductive Reasoning)</div>
                    <div class="env-body"><p><strong>Inductive reasoning</strong> draws a general conclusion from a collection of specific observations. The conclusion is called a <strong>conjecture</strong>. A conjecture may be true, but it is not guaranteed; a single counterexample disproves it.</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example (Inductive Reasoning)</div>
                    <div class="env-body"><p>Observation: \\(2 + 4 = 6\\), \\(4 + 6 = 10\\), \\(8 + 12 = 20\\), \\(10 + 14 = 24\\).
                    <br>Conjecture: The sum of two even numbers is always even.
                    <br>(This conjecture is actually true, but the examples alone do not prove it.)</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Deductive Reasoning)</div>
                    <div class="env-body"><p><strong>Deductive reasoning</strong> uses logical steps from accepted statements (postulates, definitions, previously proved theorems) to reach a conclusion that is necessarily true.</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example (Deductive Reasoning)</div>
                    <div class="env-body"><p>Given: All right angles measure \\(90^\\circ\\). \\(\\angle A\\) is a right angle.
                    <br>Conclusion: \\(m\\angle A = 90^\\circ\\).
                    <br>This conclusion follows necessarily from the premises.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-inductive-pattern"></div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Counterexample)</div>
                    <div class="env-body"><p>A <strong>counterexample</strong> is a single specific case that shows a conjecture is false. You only need one counterexample to disprove a conjecture.</p></div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Warning</div>
                    <div class="env-body"><p>Even a million examples do not prove a conjecture. However, a single counterexample is enough to disprove it.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-counterexample"></div>`,

            visualizations: [
                {
                    id: 'viz-inductive-pattern',
                    title: 'Discovering Patterns: Points on a Circle',
                    description: 'Place n points on a circle and draw all chords. Count the maximum number of regions. Does the pattern continue? Drag the slider to see.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40, height: 420 });
                        var nPoints = 4;

                        // Maximum regions for n points on a circle with all chords
                        function maxRegions(n) {
                            if (n <= 0) return 1;
                            // Actual formula: C(n,4) + C(n,2) + 1
                            var c4 = n >= 4 ? (n * (n - 1) * (n - 2) * (n - 3)) / 24 : 0;
                            var c2 = n >= 2 ? (n * (n - 1)) / 2 : 0;
                            return c4 + c2 + 1;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var cx = viz.width / 2;
                            var cy = viz.height / 2 + 20;
                            var R = 140;

                            // Draw circle
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(cx, cy, R, 0, Math.PI * 2);
                            ctx.stroke();

                            // Place points evenly
                            var pts = [];
                            for (var i = 0; i < nPoints; i++) {
                                var angle = (2 * Math.PI * i / nPoints) - Math.PI / 2;
                                pts.push({ x: cx + R * Math.cos(angle), y: cy + R * Math.sin(angle) });
                            }

                            // Draw all chords
                            ctx.strokeStyle = viz.colors.orange + 'aa';
                            ctx.lineWidth = 1.5;
                            for (var i = 0; i < nPoints; i++) {
                                for (var j = i + 1; j < nPoints; j++) {
                                    ctx.beginPath();
                                    ctx.moveTo(pts[i].x, pts[i].y);
                                    ctx.lineTo(pts[j].x, pts[j].y);
                                    ctx.stroke();
                                }
                            }

                            // Draw points
                            for (var i = 0; i < nPoints; i++) {
                                ctx.fillStyle = viz.colors.teal;
                                ctx.beginPath();
                                ctx.arc(pts[i].x, pts[i].y, 6, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                var labelAngle = (2 * Math.PI * i / nPoints) - Math.PI / 2;
                                ctx.fillText((i + 1).toString(), cx + (R + 18) * Math.cos(labelAngle), cy + (R + 18) * Math.sin(labelAngle));
                            }

                            // Display region counts
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('n = ' + nPoints + ' points,  Max regions = ' + maxRegions(nPoints), viz.width / 2, 10);

                            // Pattern table
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            var tableY = 40;
                            var cols = [1, 2, 3, 4, 5, 6];
                            var tableLeft = viz.width / 2 - 150;
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('n:', tableLeft, tableY);
                            ctx.fillText('Regions:', tableLeft, tableY + 18);
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('2^(n-1)?', tableLeft, tableY + 36);

                            for (var k = 0; k < cols.length; k++) {
                                var xx = tableLeft + 50 + k * 50;
                                var n = cols[k];
                                ctx.fillStyle = n === nPoints ? viz.colors.yellow : viz.colors.white;
                                ctx.fillText(n.toString(), xx, tableY);
                                ctx.fillText(maxRegions(n).toString(), xx, tableY + 18);
                                var pow = Math.pow(2, n - 1);
                                ctx.fillStyle = (maxRegions(n) === pow) ? viz.colors.green : viz.colors.red;
                                ctx.fillText(pow.toString(), xx, tableY + 36);
                            }

                            // Warning for n=6
                            if (nPoints >= 6) {
                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.fillStyle = viz.colors.red;
                                ctx.fillText('The pattern 1, 2, 4, 8, 16 suggests 32 for n=6, but the answer is 31!', viz.width / 2, viz.height - 25);
                                ctx.fillText('Inductive reasoning can mislead. Always seek proof.', viz.width / 2, viz.height - 8);
                            }
                        }

                        VizEngine.createSlider(controls, 'Points (n)', 1, 7, nPoints, 1, function(v) {
                            nPoints = Math.round(v);
                            draw();
                        });
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-counterexample',
                    title: 'Counterexample Finder',
                    description: 'Test conjectures about quadrilaterals. Drag the vertices to find a counterexample that disproves the displayed conjecture.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40, height: 400 });
                        var pA = viz.addDraggable('A', -3, 2, viz.colors.blue, 10);
                        var pB = viz.addDraggable('B', 3, 2, viz.colors.teal, 10);
                        var pC = viz.addDraggable('C', 3, -2, viz.colors.orange, 10);
                        var pD = viz.addDraggable('D', -3, -2, viz.colors.green, 10);
                        var conjectureIdx = 0;

                        var conjectures = [
                            {
                                text: '"If all sides are equal, then all angles are 90\u00B0."',
                                check: function(sides, angles) {
                                    var eps = 0.2;
                                    var allEq = Math.abs(sides[0] - sides[1]) < eps && Math.abs(sides[1] - sides[2]) < eps && Math.abs(sides[2] - sides[3]) < eps;
                                    if (!allEq) return { relevant: false };
                                    var allRight = Math.abs(angles[0] - 90) < 3 && Math.abs(angles[1] - 90) < 3 && Math.abs(angles[2] - 90) < 3 && Math.abs(angles[3] - 90) < 3;
                                    return { relevant: true, holds: allRight };
                                },
                                hint: 'Try making a rhombus that is not a square.'
                            },
                            {
                                text: '"If opposite sides are equal, then it must be a rectangle."',
                                check: function(sides, angles) {
                                    var eps = 0.2;
                                    var oppEq = Math.abs(sides[0] - sides[2]) < eps && Math.abs(sides[1] - sides[3]) < eps;
                                    if (!oppEq) return { relevant: false };
                                    var allRight = Math.abs(angles[0] - 90) < 5 && Math.abs(angles[1] - 90) < 5;
                                    return { relevant: true, holds: allRight };
                                },
                                hint: 'A parallelogram has opposite sides equal. Is every parallelogram a rectangle?'
                            }
                        ];

                        function dist(x1, y1, x2, y2) {
                            return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
                        }

                        function angleBetween(ax, ay, bx, by, cx, cy) {
                            var v1x = ax - bx, v1y = ay - by;
                            var v2x = cx - bx, v2y = cy - by;
                            var dot = v1x * v2x + v1y * v2y;
                            var l1 = Math.sqrt(v1x * v1x + v1y * v1y);
                            var l2 = Math.sqrt(v2x * v2x + v2y * v2y);
                            if (l1 < 0.001 || l2 < 0.001) return 0;
                            return Math.acos(Math.max(-1, Math.min(1, dot / (l1 * l2)))) * 180 / Math.PI;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();

                            var sides = [
                                dist(pA.x, pA.y, pB.x, pB.y),
                                dist(pB.x, pB.y, pC.x, pC.y),
                                dist(pC.x, pC.y, pD.x, pD.y),
                                dist(pD.x, pD.y, pA.x, pA.y)
                            ];
                            var angles = [
                                angleBetween(pD.x, pD.y, pA.x, pA.y, pB.x, pB.y),
                                angleBetween(pA.x, pA.y, pB.x, pB.y, pC.x, pC.y),
                                angleBetween(pB.x, pB.y, pC.x, pC.y, pD.x, pD.y),
                                angleBetween(pC.x, pC.y, pD.x, pD.y, pA.x, pA.y)
                            ];

                            var conj = conjectures[conjectureIdx];
                            var result = conj.check(sides, angles);

                            var fillC = viz.colors.blue + '15';
                            var strokeC = viz.colors.white;
                            if (result.relevant && !result.holds) { fillC = viz.colors.red + '25'; strokeC = viz.colors.red; }
                            else if (result.relevant && result.holds) { fillC = viz.colors.green + '20'; strokeC = viz.colors.green; }

                            viz.drawPolygon([[pA.x, pA.y], [pB.x, pB.y], [pC.x, pC.y], [pD.x, pD.y]], fillC, strokeC, 2);

                            viz.drawPoint(pA.x, pA.y, viz.colors.blue, 'A', 5);
                            viz.drawPoint(pB.x, pB.y, viz.colors.teal, 'B', 5);
                            viz.drawPoint(pC.x, pC.y, viz.colors.orange, 'C', 5);
                            viz.drawPoint(pD.x, pD.y, viz.colors.green, 'D', 5);
                            viz.drawDraggables();

                            var ctx = viz.ctx;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.fillText('Conjecture: ' + conj.text, viz.width / 2, 10);

                            ctx.font = '12px -apple-system,sans-serif';
                            if (!result.relevant) {
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText('Hypothesis not met. ' + conj.hint, viz.width / 2, 30);
                            } else if (result.holds) {
                                ctx.fillStyle = viz.colors.green;
                                ctx.fillText('Conjecture holds for this shape. Try to find a counterexample!', viz.width / 2, 30);
                            } else {
                                ctx.fillStyle = viz.colors.red;
                                ctx.fillText('COUNTEREXAMPLE FOUND! The conjecture is FALSE.', viz.width / 2, 30);
                            }

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillText('Sides: ' + sides.map(function(s) { return s.toFixed(1); }).join(', ') + '  Angles: ' + angles.map(function(a) { return a.toFixed(0) + '\u00B0'; }).join(', '), viz.width / 2, viz.height - 12);
                        }

                        VizEngine.createButton(controls, 'Next Conjecture', function() { conjectureIdx = (conjectureIdx + 1) % conjectures.length; draw(); });
                        VizEngine.createButton(controls, 'Make Square', function() { pA.x = -2; pA.y = 2; pB.x = 2; pB.y = 2; pC.x = 2; pC.y = -2; pD.x = -2; pD.y = -2; draw(); });
                        VizEngine.createButton(controls, 'Make Rhombus', function() { pA.x = 0; pA.y = 3; pB.x = 3; pB.y = 0; pC.x = 0; pC.y = -3; pD.x = -3; pD.y = 0; draw(); });
                        pA.onDrag = function() { draw(); };
                        pB.onDrag = function() { draw(); };
                        pC.onDrag = function() { draw(); };
                        pD.onDrag = function() { draw(); };
                        draw();
                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'The sequence \\(3, 5, 7, 9, 11, \\ldots\\) suggests the next term is \\(13\\). Is this inductive or deductive reasoning?',
                    hint: 'Are we observing a pattern or applying a logical rule?',
                    solution: '<strong>Inductive.</strong> We are observing a pattern (adding 2 each time) and guessing the next term. There is no logical guarantee the pattern continues without a formal rule.'
                },
                {
                    question: 'Given: If a figure is a square, then it has four right angles. ABCD is a square. Conclude the number of right angles. What type of reasoning is this?',
                    hint: 'We are applying a general rule to a specific case.',
                    solution: '<strong>Deductive.</strong> From the general statement and the specific fact, we conclude ABCD has four right angles. This conclusion follows necessarily.'
                },
                {
                    question: 'Conjecture: "All prime numbers are odd." Find a counterexample.',
                    hint: 'Think of the smallest prime numbers.',
                    solution: '\\(2\\) is a prime number and it is even. This single counterexample disproves the conjecture.'
                },
                {
                    question: 'Use inductive reasoning: what is the sum of the first \\(n\\) odd numbers? Test \\(n = 1, 2, 3, 4, 5\\).',
                    hint: 'Compute \\(1\\), \\(1+3\\), \\(1+3+5\\), \\(1+3+5+7\\), \\(1+3+5+7+9\\).',
                    solution: '\\(1 = 1\\), \\(1+3 = 4\\), \\(1+3+5 = 9\\), \\(1+3+5+7 = 16\\), \\(1+3+5+7+9 = 25\\). Conjecture: the sum of the first \\(n\\) odd numbers is \\(n^2\\). (This is actually true and can be proved deductively.)'
                },
                {
                    question: 'Why can one million examples not prove a conjecture, but one counterexample can disprove it?',
                    hint: 'Think about what "for all" means versus "there exists."',
                    solution: 'A conjecture claims something is true for <strong>all</strong> cases. Examples only confirm specific cases and cannot cover all infinitely many possibilities. But the conjecture being false only requires <strong>one</strong> case where it fails.'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Conditional Statements
        // ============================================================
        {
            id: 'ch02-sec02',
            title: 'Conditional Statements',
            content: `<h2>Conditional Statements</h2>

                <div class="env-block definition">
                    <div class="env-title">Definition (Conditional Statement)</div>
                    <div class="env-body"><p>A <strong>conditional statement</strong> has the form "If \\(p\\), then \\(q\\)" (written \\(p \\Rightarrow q\\)). The part \\(p\\) is the <strong>hypothesis</strong> and \\(q\\) is the <strong>conclusion</strong>.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Related Conditionals</div>
                    <div class="env-body"><p>Given the conditional \\(p \\Rightarrow q\\):
                    <ul>
                        <li><strong>Converse</strong>: \\(q \\Rightarrow p\\) (swap hypothesis and conclusion)</li>
                        <li><strong>Inverse</strong>: \\(\\neg p \\Rightarrow \\neg q\\) (negate both)</li>
                        <li><strong>Contrapositive</strong>: \\(\\neg q \\Rightarrow \\neg p\\) (swap and negate)</li>
                    </ul>
                    A conditional and its contrapositive always have the same truth value.</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Logical Equivalence</div>
                    <div class="env-body"><p>A conditional \\(p \\Rightarrow q\\) is logically equivalent to its contrapositive \\(\\neg q \\Rightarrow \\neg p\\). However, the converse and inverse are <em>not</em> necessarily equivalent to the original.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-conditional"></div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Biconditional)</div>
                    <div class="env-body"><p>A <strong>biconditional</strong> statement "\\(p\\) if and only if \\(q\\)" (written \\(p \\Leftrightarrow q\\)) means both \\(p \\Rightarrow q\\) and \\(q \\Rightarrow p\\) are true. Definitions in geometry are always biconditional.</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>Conditional: "If a figure is a square, then it has four equal sides."
                    <br>Converse: "If a figure has four equal sides, then it is a square." (False! A rhombus has four equal sides but is not necessarily a square.)
                    <br>Contrapositive: "If a figure does not have four equal sides, then it is not a square." (True, same as the original.)</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-conditional',
                    title: 'Conditional Statement Explorer',
                    description: 'See a conditional, its converse, inverse, and contrapositive. Toggle to compare their truth values using a geometric example.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40, height: 420 });
                        var currentView = 0;

                        var examples = [
                            {
                                cond: 'If a shape is a square, then it is a rectangle.',
                                conv: 'If a shape is a rectangle, then it is a square.',
                                inv: 'If a shape is not a square, then it is not a rectangle.',
                                contra: 'If a shape is not a rectangle, then it is not a square.',
                                condT: true, convT: false, invT: false, contraT: true,
                                drawFn: function(ctx, cx, cy, mode) {
                                    // Draw Venn-like diagram
                                    // Rectangles set (larger)
                                    ctx.fillStyle = viz.colors.blue + '22';
                                    ctx.strokeStyle = viz.colors.blue;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.ellipse(cx - 20, cy, 130, 90, 0, 0, Math.PI * 2);
                                    ctx.fill(); ctx.stroke();
                                    ctx.fillStyle = viz.colors.blue;
                                    ctx.font = '13px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText('Rectangles', cx - 80, cy - 70);

                                    // Squares set (smaller, inside)
                                    ctx.fillStyle = viz.colors.orange + '33';
                                    ctx.strokeStyle = viz.colors.orange;
                                    ctx.beginPath();
                                    ctx.ellipse(cx + 20, cy, 65, 55, 0, 0, Math.PI * 2);
                                    ctx.fill(); ctx.stroke();
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.fillText('Squares', cx + 20, cy - 5);

                                    // Example shapes
                                    if (mode === 0 || mode === 3) {
                                        // Highlight: square inside rectangle
                                        ctx.fillStyle = viz.colors.green;
                                        ctx.font = 'bold 12px -apple-system,sans-serif';
                                        ctx.fillText('Every square IS a rectangle \u2713', cx, cy + 85);
                                    } else {
                                        ctx.fillStyle = viz.colors.red;
                                        ctx.font = 'bold 12px -apple-system,sans-serif';
                                        ctx.fillText('Not every rectangle is a square \u2717', cx, cy + 85);
                                    }
                                }
                            },
                            {
                                cond: 'If two angles are vertical, then they are congruent.',
                                conv: 'If two angles are congruent, then they are vertical.',
                                inv: 'If two angles are not vertical, then they are not congruent.',
                                contra: 'If two angles are not congruent, then they are not vertical.',
                                condT: true, convT: false, invT: false, contraT: true,
                                drawFn: function(ctx, cx, cy, mode) {
                                    // Vertical angles set inside congruent angles set
                                    ctx.fillStyle = viz.colors.teal + '22';
                                    ctx.strokeStyle = viz.colors.teal;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.ellipse(cx - 20, cy, 130, 90, 0, 0, Math.PI * 2);
                                    ctx.fill(); ctx.stroke();
                                    ctx.fillStyle = viz.colors.teal;
                                    ctx.font = '13px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText('Congruent angle pairs', cx - 80, cy - 70);

                                    ctx.fillStyle = viz.colors.purple + '33';
                                    ctx.strokeStyle = viz.colors.purple;
                                    ctx.beginPath();
                                    ctx.ellipse(cx + 20, cy, 65, 55, 0, 0, Math.PI * 2);
                                    ctx.fill(); ctx.stroke();
                                    ctx.fillStyle = viz.colors.purple;
                                    ctx.fillText('Vertical angles', cx + 20, cy - 5);

                                    if (mode === 0 || mode === 3) {
                                        ctx.fillStyle = viz.colors.green;
                                        ctx.font = 'bold 12px -apple-system,sans-serif';
                                        ctx.fillText('Vertical angles are always congruent \u2713', cx, cy + 85);
                                    } else {
                                        ctx.fillStyle = viz.colors.red;
                                        ctx.font = 'bold 12px -apple-system,sans-serif';
                                        ctx.fillText('Congruent angles need not be vertical \u2717', cx, cy + 85);
                                    }
                                }
                            }
                        ];

                        var exIdx = 0;
                        var stmtMode = 0; // 0=conditional, 1=converse, 2=inverse, 3=contrapositive

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var ex = examples[exIdx];
                            var cx = viz.width / 2;

                            // Statement display
                            var stmts = [ex.cond, ex.conv, ex.inv, ex.contra];
                            var labels = ['Conditional (p \u21D2 q)', 'Converse (q \u21D2 p)', 'Inverse (\u00ACp \u21D2 \u00ACq)', 'Contrapositive (\u00ACq \u21D2 \u00ACp)'];
                            var truths = [ex.condT, ex.convT, ex.invT, ex.contraT];

                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.fillText(labels[stmtMode], cx, 12);

                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.white;
                            // Word wrap the statement
                            var text = stmts[stmtMode];
                            ctx.fillText(text, cx, 35);

                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.fillStyle = truths[stmtMode] ? viz.colors.green : viz.colors.red;
                            ctx.fillText('Truth value: ' + (truths[stmtMode] ? 'TRUE' : 'FALSE'), cx, 58);

                            // Venn diagram
                            ex.drawFn(ctx, cx, viz.height / 2 + 30, stmtMode);

                            // Equivalence note
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            ctx.textAlign = 'center';
                            if (stmtMode === 0 || stmtMode === 3) {
                                ctx.fillText('Conditional and Contrapositive have the SAME truth value', cx, viz.height - 15);
                            } else {
                                ctx.fillText('Converse and Inverse have the SAME truth value (but may differ from the original)', cx, viz.height - 15);
                            }
                        }

                        VizEngine.createButton(controls, 'Conditional', function() { stmtMode = 0; draw(); });
                        VizEngine.createButton(controls, 'Converse', function() { stmtMode = 1; draw(); });
                        VizEngine.createButton(controls, 'Inverse', function() { stmtMode = 2; draw(); });
                        VizEngine.createButton(controls, 'Contrapositive', function() { stmtMode = 3; draw(); });
                        VizEngine.createButton(controls, 'Next Example', function() { exIdx = (exIdx + 1) % examples.length; draw(); });
                        draw();
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'Write the converse, inverse, and contrapositive of: "If an angle is \\(90^\\circ\\), then it is a right angle."',
                    hint: 'Identify the hypothesis \\(p\\) and conclusion \\(q\\), then swap/negate.',
                    solution: 'Converse: "If an angle is a right angle, then it is \\(90^\\circ\\)." Inverse: "If an angle is not \\(90^\\circ\\), then it is not a right angle." Contrapositive: "If an angle is not a right angle, then it is not \\(90^\\circ\\)." (All three happen to be true here because the original is a biconditional definition.)'
                },
                {
                    question: 'Is the following conditional true or false? "If a figure is a rhombus, then it is a square." Explain.',
                    hint: 'Think of a rhombus that is not a square.',
                    solution: 'False. A rhombus has four equal sides but its angles need not be \\(90^\\circ\\). For example, a rhombus with angles \\(60^\\circ\\) and \\(120^\\circ\\) is not a square.'
                },
                {
                    question: 'A conditional statement and which related statement always have the same truth value?',
                    hint: 'Swap and negate.',
                    solution: 'A conditional and its <strong>contrapositive</strong> always have the same truth value.'
                },
                {
                    question: 'Write the biconditional form of: "A triangle is equilateral if and only if all three sides are equal."',
                    hint: 'A biconditional means both directions hold.',
                    solution: 'The biconditional means: (1) If a triangle is equilateral, then all three sides are equal, AND (2) If all three sides of a triangle are equal, then it is equilateral. Both directions are true.'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Two-Column Proofs Introduction
        // ============================================================
        {
            id: 'ch02-sec03',
            title: 'Two-Column Proofs Introduction',
            content: `<h2>Two-Column Proofs Introduction</h2>

                <div class="env-block intuition">
                    <div class="env-title">What Is a Proof?</div>
                    <div class="env-body"><p>A <strong>proof</strong> is a logical argument that establishes the truth of a statement beyond doubt. In geometry, the most common format is the <strong>two-column proof</strong>, where each step has a <em>statement</em> and a <em>reason</em>.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Structure of a Two-Column Proof</div>
                    <div class="env-body"><p>A two-column proof has:
                    <ol>
                        <li><strong>"Given"</strong> information (the hypothesis)</li>
                        <li><strong>"Prove"</strong> statement (the conclusion)</li>
                        <li>A table with <strong>Statements</strong> on the left and <strong>Reasons</strong> on the right</li>
                    </ol>
                    Every reason must be a definition, postulate, or previously proved theorem.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Common Proof Reasons</div>
                    <div class="env-body"><p>
                    <ul>
                        <li><strong>Given</strong>: stated in the problem</li>
                        <li><strong>Definition of ...</strong>: applying a definition</li>
                        <li><strong>Segment/Angle Addition Postulate</strong></li>
                        <li><strong>Substitution Property</strong>: replacing equals</li>
                        <li><strong>Transitive Property</strong>: if \\(a = b\\) and \\(b = c\\), then \\(a = c\\)</li>
                        <li><strong>Reflexive Property</strong>: \\(a = a\\)</li>
                        <li><strong>Symmetric Property</strong>: if \\(a = b\\), then \\(b = a\\)</li>
                        <li><strong>Vertical Angles Theorem</strong></li>
                        <li><strong>Linear Pair Postulate</strong></li>
                    </ul></p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-proof-builder"></div>

                <div class="viz-placeholder" data-viz="viz-proof-vertical"></div>

                <div class="env-block example">
                    <div class="env-title">Example (Two-Column Proof)</div>
                    <div class="env-body"><p><strong>Given:</strong> \\(M\\) is the midpoint of \\(\\overline{AB}\\).
                    <br><strong>Prove:</strong> \\(AM = \\frac{1}{2}AB\\).
                    <table style="width:100%;border-collapse:collapse;">
                        <tr style="border-bottom:1px solid #4a4a7a;"><td style="padding:4px 8px;"><strong>Statement</strong></td><td style="padding:4px 8px;"><strong>Reason</strong></td></tr>
                        <tr><td style="padding:4px 8px;">1. \\(M\\) is the midpoint of \\(\\overline{AB}\\)</td><td style="padding:4px 8px;">Given</td></tr>
                        <tr><td style="padding:4px 8px;">2. \\(AM = MB\\)</td><td style="padding:4px 8px;">Definition of midpoint</td></tr>
                        <tr><td style="padding:4px 8px;">3. \\(AM + MB = AB\\)</td><td style="padding:4px 8px;">Segment Addition Postulate</td></tr>
                        <tr><td style="padding:4px 8px;">4. \\(AM + AM = AB\\)</td><td style="padding:4px 8px;">Substitution (from step 2)</td></tr>
                        <tr><td style="padding:4px 8px;">5. \\(2 \\cdot AM = AB\\)</td><td style="padding:4px 8px;">Simplify</td></tr>
                        <tr><td style="padding:4px 8px;">6. \\(AM = \\frac{1}{2}AB\\)</td><td style="padding:4px 8px;">Division Property of Equality</td></tr>
                    </table></p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-proof-builder',
                    title: 'Interactive Proof: Midpoint Theorem',
                    description: 'Click through each step of the proof. The diagram updates to show what each step establishes.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40, height: 380 });
                        var step = 0;
                        var maxStep = 5;

                        var steps = [
                            { stmt: 'M is the midpoint of AB', reason: 'Given', highlight: 'all' },
                            { stmt: 'AM = MB', reason: 'Definition of midpoint', highlight: 'equal' },
                            { stmt: 'AM + MB = AB', reason: 'Segment Addition', highlight: 'addition' },
                            { stmt: 'AM + AM = AB', reason: 'Substitution', highlight: 'sub' },
                            { stmt: '2 \u00B7 AM = AB', reason: 'Simplify', highlight: 'simplify' },
                            { stmt: 'AM = (1/2)AB', reason: 'Division Property', highlight: 'final' }
                        ];

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Draw segment AB with midpoint M
                            var ax = 80, bx = viz.width - 80, segY = 100;
                            var mx = (ax + bx) / 2;

                            // Segment
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 3;
                            ctx.beginPath(); ctx.moveTo(ax, segY); ctx.lineTo(bx, segY); ctx.stroke();

                            // Points
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath(); ctx.arc(ax, segY, 7, 0, Math.PI * 2); ctx.fill();
                            ctx.fillStyle = viz.colors.teal;
                            ctx.beginPath(); ctx.arc(bx, segY, 7, 0, Math.PI * 2); ctx.fill();
                            ctx.fillStyle = viz.colors.purple;
                            ctx.beginPath(); ctx.arc(mx, segY, 7, 0, Math.PI * 2); ctx.fill();

                            // Labels
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('A', ax, segY + 14);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('B', bx, segY + 14);
                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillText('M', mx, segY + 14);

                            // Highlight based on step
                            var s = steps[step];
                            if (step >= 1) {
                                // Show AM = MB
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 4;
                                ctx.beginPath(); ctx.moveTo(ax, segY - 8); ctx.lineTo(mx, segY - 8); ctx.stroke();
                                ctx.strokeStyle = viz.colors.green;
                                ctx.beginPath(); ctx.moveTo(mx, segY - 8); ctx.lineTo(bx, segY - 8); ctx.stroke();

                                // Tick marks for equality
                                var tick1 = (ax + mx) / 2;
                                var tick2 = (mx + bx) / 2;
                                ctx.strokeStyle = viz.colors.yellow;
                                ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(tick1, segY - 15); ctx.lineTo(tick1, segY - 1); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(tick2, segY - 15); ctx.lineTo(tick2, segY - 1); ctx.stroke();
                            }

                            // Current step display
                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.fillText('Step ' + (step + 1) + ' of ' + (maxStep + 1), viz.width / 2, 15);

                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('Statement: ' + s.stmt, viz.width / 2, 160);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('Reason: ' + s.reason, viz.width / 2, 185);

                            // Show all steps so far
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            for (var i = 0; i <= step; i++) {
                                var yy = 220 + i * 22;
                                ctx.fillStyle = i === step ? viz.colors.yellow : viz.colors.text;
                                ctx.fillText((i + 1) + '. ' + steps[i].stmt, 30, yy);
                                ctx.fillStyle = i === step ? viz.colors.teal : viz.colors.text + '88';
                                ctx.fillText(steps[i].reason, viz.width / 2 + 30, yy);
                            }
                        }

                        VizEngine.createButton(controls, '\u25C0 Previous', function() { if (step > 0) step--; draw(); });
                        VizEngine.createButton(controls, 'Next \u25B6', function() { if (step < maxStep) step++; draw(); });
                        VizEngine.createButton(controls, 'Reset', function() { step = 0; draw(); });
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-proof-vertical',
                    title: 'Proof: Vertical Angles Are Congruent',
                    description: 'Step through the proof that vertical angles are congruent. Drag the angle to see the relationship hold for any angle.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40, height: 400 });
                        var ptA = viz.addDraggable('A', 3, 2, viz.colors.orange, 10);
                        var step = 0;

                        var steps = [
                            { stmt: '\u22201 and \u22202 are a linear pair', reason: 'Given (two lines intersect)' },
                            { stmt: 'm\u22201 + m\u22202 = 180\u00B0', reason: 'Linear Pair Postulate' },
                            { stmt: '\u22202 and \u22203 are a linear pair', reason: 'Given (two lines intersect)' },
                            { stmt: 'm\u22202 + m\u22203 = 180\u00B0', reason: 'Linear Pair Postulate' },
                            { stmt: 'm\u22201 + m\u22202 = m\u22202 + m\u22203', reason: 'Transitive Property (both = 180\u00B0)' },
                            { stmt: 'm\u22201 = m\u22203', reason: 'Subtraction Property of Equality' }
                        ];

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var cx = viz.width / 2, cy = 130;

                            // Compute angle from draggable
                            var angle = Math.atan2(ptA.y, ptA.x);
                            var deg = angle * 180 / Math.PI;
                            if (deg < 15) deg = 15;
                            if (deg > 165) deg = 165;
                            var rad = deg * Math.PI / 180;

                            var rLen = 120;

                            // Line 1 (horizontal)
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(cx - rLen, cy); ctx.lineTo(cx + rLen, cy); ctx.stroke();

                            // Line 2
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.moveTo(cx - rLen * Math.cos(rad), cy + rLen * Math.sin(rad));
                            ctx.lineTo(cx + rLen * Math.cos(rad), cy - rLen * Math.sin(rad));
                            ctx.stroke();

                            // Angle labels
                            var a1 = deg, a2 = 180 - deg;
                            var arcR = 30;

                            // Angle 1 (green)
                            ctx.fillStyle = viz.colors.green + '44';
                            ctx.beginPath(); ctx.moveTo(cx, cy);
                            ctx.arc(cx, cy, arcR, -rad, 0);
                            ctx.closePath(); ctx.fill();
                            ctx.strokeStyle = viz.colors.green; ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.arc(cx, cy, arcR, -rad, 0); ctx.stroke();

                            // Angle 2 (purple)
                            ctx.fillStyle = viz.colors.purple + '44';
                            ctx.beginPath(); ctx.moveTo(cx, cy);
                            ctx.arc(cx, cy, arcR + 5, -Math.PI, -rad);
                            ctx.closePath(); ctx.fill();
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.beginPath(); ctx.arc(cx, cy, arcR + 5, -Math.PI, -rad); ctx.stroke();

                            // Angle 3 (green - vertical to 1)
                            ctx.fillStyle = viz.colors.green + '44';
                            ctx.beginPath(); ctx.moveTo(cx, cy);
                            ctx.arc(cx, cy, arcR, Math.PI - rad, Math.PI);
                            ctx.closePath(); ctx.fill();
                            ctx.strokeStyle = viz.colors.green;
                            ctx.beginPath(); ctx.arc(cx, cy, arcR, Math.PI - rad, Math.PI); ctx.stroke();

                            // Labels
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('\u22201=' + a1.toFixed(0) + '\u00B0', cx + 55 * Math.cos(rad / 2), cy - 55 * Math.sin(rad / 2));
                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillText('\u22202=' + a2.toFixed(0) + '\u00B0', cx - 65 * Math.cos(rad / 2), cy - 10);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('\u22203=' + a1.toFixed(0) + '\u00B0', cx - 55 * Math.cos(rad / 2), cy + 55 * Math.sin(rad / 2));

                            viz.drawDraggables();

                            // Proof steps
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            for (var i = 0; i < steps.length; i++) {
                                var yy = 225 + i * 22;
                                ctx.fillStyle = i <= step ? (i === step ? viz.colors.yellow : viz.colors.white) : viz.colors.text + '44';
                                ctx.fillText((i + 1) + '. ' + steps[i].stmt, 20, yy);
                                if (i <= step) {
                                    ctx.fillStyle = i === step ? viz.colors.teal : viz.colors.text;
                                    ctx.fillText(steps[i].reason, viz.width / 2 + 20, yy);
                                }
                            }

                            // Conclusion
                            if (step === 5) {
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.fillStyle = viz.colors.green;
                                ctx.textAlign = 'center';
                                ctx.fillText('\u2234 Vertical angles \u22201 and \u22203 are congruent! QED', viz.width / 2, viz.height - 15);
                            }
                        }

                        VizEngine.createButton(controls, '\u25C0 Prev', function() { if (step > 0) step--; draw(); });
                        VizEngine.createButton(controls, 'Next \u25B6', function() { if (step < 5) step++; draw(); });
                        VizEngine.createButton(controls, 'Reset', function() { step = 0; draw(); });
                        ptA.onDrag = function() { draw(); };
                        draw();
                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'Fill in the reason: "\\(M\\) is the midpoint of \\(\\overline{AB}\\)" in a proof. What reason would you use for this statement?',
                    hint: 'Is this the starting information or a derived fact?',
                    solution: '<strong>Given.</strong> It is stated in the problem, so the reason is "Given."'
                },
                {
                    question: 'In a two-column proof, you write "\\(AB = CD\\) and \\(CD = EF\\), therefore \\(AB = EF\\)." What property is the reason?',
                    hint: 'If \\(a = b\\) and \\(b = c\\), then...',
                    solution: '<strong>Transitive Property of Equality.</strong>'
                },
                {
                    question: 'Write a two-column proof: Given \\(\\angle 1\\) and \\(\\angle 2\\) are supplementary, and \\(m\\angle 1 = 65^\\circ\\). Prove \\(m\\angle 2 = 115^\\circ\\).',
                    hint: 'Supplementary means the angles sum to \\(180^\\circ\\). Substitute and solve.',
                    solution: '1. \\(\\angle 1\\) and \\(\\angle 2\\) are supplementary (Given). 2. \\(m\\angle 1 + m\\angle 2 = 180^\\circ\\) (Def. of supplementary). 3. \\(65 + m\\angle 2 = 180\\) (Substitution). 4. \\(m\\angle 2 = 115^\\circ\\) (Subtraction Property of Equality).'
                },
                {
                    question: 'What is the Reflexive Property of Equality, and why is it useful in proofs?',
                    hint: 'Any quantity equals itself.',
                    solution: 'The Reflexive Property states \\(a = a\\). It is used when two figures share a common side or angle; for instance, in a proof that two triangles are congruent, a shared side \\(\\overline{AB} = \\overline{AB}\\) by the Reflexive Property.'
                },
                {
                    question: 'What is the difference between a postulate and a theorem?',
                    hint: 'Think about whether a proof is required.',
                    solution: 'A <strong>postulate</strong> is accepted as true without proof. A <strong>theorem</strong> is a statement that has been proved using postulates, definitions, and previously proved theorems.'
                }
            ]
        }
    ]
});
