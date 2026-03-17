window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch03',
    number: 3,
    title: 'Triangle Fundamentals',
    subtitle: 'Classifying triangles, the angle sum theorem, triangle inequality, and special segments',
    sections: [
        // ============================================================
        // SECTION 1: Triangle Classification
        // ============================================================
        {
            id: 'ch03-sec01',
            title: 'Triangle Classification',
            content: `<h2>Triangle Classification</h2>

                <div class="env-block intuition">
                    <div class="env-title">The Triangle</div>
                    <div class="env-body"><p>A triangle is the simplest polygon: three sides, three vertices, three angles. Despite this simplicity, triangles are the foundation of all geometry. Every polygon can be split into triangles, and triangles arise everywhere in engineering, architecture, and nature.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Triangle)</div>
                    <div class="env-body"><p>A <strong>triangle</strong> is a polygon with three sides and three angles. We denote a triangle with vertices \\(A\\), \\(B\\), \\(C\\) as \\(\\triangle ABC\\).</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Classification by Sides</div>
                    <div class="env-body"><p>
                    <ul>
                        <li><strong>Scalene</strong>: No two sides are congruent.</li>
                        <li><strong>Isosceles</strong>: At least two sides are congruent.</li>
                        <li><strong>Equilateral</strong>: All three sides are congruent.</li>
                    </ul></p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Classification by Angles</div>
                    <div class="env-body"><p>
                    <ul>
                        <li><strong>Acute</strong>: All three angles are less than \\(90^\\circ\\).</li>
                        <li><strong>Right</strong>: One angle is exactly \\(90^\\circ\\).</li>
                        <li><strong>Obtuse</strong>: One angle is greater than \\(90^\\circ\\).</li>
                        <li><strong>Equiangular</strong>: All three angles are equal (each \\(60^\\circ\\)).</li>
                    </ul></p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-triangle-classify"></div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body"><p>An equilateral triangle is always equiangular, and vice versa. An equilateral triangle is a special case of isosceles.</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-triangle-classify',
                    title: 'Triangle Classifier',
                    description: 'Drag the three vertices to form different triangles. The display automatically classifies the triangle by sides and by angles.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40, height: 420 });
                        var pA = viz.addDraggable('A', -3, -2, viz.colors.blue, 10);
                        var pB = viz.addDraggable('B', 3, -2, viz.colors.teal, 10);
                        var pC = viz.addDraggable('C', 0, 3, viz.colors.orange, 10);

                        function dist(x1, y1, x2, y2) {
                            return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
                        }

                        function angleBetween(ax, ay, bx, by, cx, cy) {
                            var v1x = ax - bx, v1y = ay - by;
                            var v2x = cx - bx, v2y = cy - by;
                            var dot = v1x * v2x + v1y * v2y;
                            var len1 = Math.sqrt(v1x * v1x + v1y * v1y);
                            var len2 = Math.sqrt(v2x * v2x + v2y * v2y);
                            if (len1 < 0.001 || len2 < 0.001) return 0;
                            var cosA = Math.max(-1, Math.min(1, dot / (len1 * len2)));
                            return Math.acos(cosA) * 180 / Math.PI;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();

                            var ab = dist(pA.x, pA.y, pB.x, pB.y);
                            var bc = dist(pB.x, pB.y, pC.x, pC.y);
                            var ca = dist(pC.x, pC.y, pA.x, pA.y);

                            var angA = angleBetween(pB.x, pB.y, pA.x, pA.y, pC.x, pC.y);
                            var angB = angleBetween(pA.x, pA.y, pB.x, pB.y, pC.x, pC.y);
                            var angC = angleBetween(pA.x, pA.y, pC.x, pC.y, pB.x, pB.y);

                            // Draw triangle
                            viz.drawPolygon([[pA.x, pA.y], [pB.x, pB.y], [pC.x, pC.y]], viz.colors.blue + '18', viz.colors.white, 2);

                            // Draw angle arcs
                            var ctx = viz.ctx;
                            function drawAngleArc(vx, vy, deg, color) {
                                var s = viz.toScreen(vx, vy);
                                ctx.fillStyle = color + '33';
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 1.5;

                                var r = 18;
                                // Simple arc placeholder
                                ctx.beginPath();
                                ctx.arc(s[0], s[1], r, 0, Math.PI * 2 * (deg / 360));
                                ctx.stroke();
                            }

                            // Side length labels
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';

                            var midAB = [(pA.x + pB.x) / 2, (pA.y + pB.y) / 2];
                            var midBC = [(pB.x + pC.x) / 2, (pB.y + pC.y) / 2];
                            var midCA = [(pC.x + pA.x) / 2, (pC.y + pA.y) / 2];

                            ctx.fillStyle = viz.colors.yellow;
                            viz.drawText(ab.toFixed(2), midAB[0], midAB[1] - 0.4, viz.colors.yellow, 12);
                            viz.drawText(bc.toFixed(2), midBC[0] + 0.4, midBC[1], viz.colors.yellow, 12);
                            viz.drawText(ca.toFixed(2), midCA[0] - 0.4, midCA[1], viz.colors.yellow, 12);

                            // Angle labels
                            viz.drawText(angA.toFixed(1) + '\u00B0', pA.x + 0.5, pA.y + 0.5, viz.colors.green, 12);
                            viz.drawText(angB.toFixed(1) + '\u00B0', pB.x - 0.5, pB.y + 0.5, viz.colors.green, 12);
                            viz.drawText(angC.toFixed(1) + '\u00B0', pC.x, pC.y - 0.5, viz.colors.green, 12);

                            // Vertex labels
                            viz.drawPoint(pA.x, pA.y, viz.colors.blue, 'A', 5);
                            viz.drawPoint(pB.x, pB.y, viz.colors.teal, 'B', 5);
                            viz.drawPoint(pC.x, pC.y, viz.colors.orange, 'C', 5);
                            viz.drawDraggables();

                            // Classify by sides
                            var eps = 0.15;
                            var sideClass = 'Scalene';
                            var sideColor = viz.colors.white;
                            if (Math.abs(ab - bc) < eps && Math.abs(bc - ca) < eps) {
                                sideClass = 'Equilateral';
                                sideColor = viz.colors.green;
                            } else if (Math.abs(ab - bc) < eps || Math.abs(bc - ca) < eps || Math.abs(ab - ca) < eps) {
                                sideClass = 'Isosceles';
                                sideColor = viz.colors.teal;
                            }

                            // Classify by angles
                            var maxAng = Math.max(angA, angB, angC);
                            var angleClass = 'Acute';
                            var angleColor = viz.colors.green;
                            if (Math.abs(maxAng - 90) < 2) {
                                angleClass = 'Right';
                                angleColor = viz.colors.teal;
                            } else if (maxAng > 90) {
                                angleClass = 'Obtuse';
                                angleColor = viz.colors.orange;
                            }
                            if (Math.abs(angA - 60) < 2 && Math.abs(angB - 60) < 2) {
                                angleClass = 'Equiangular';
                                angleColor = viz.colors.green;
                            }

                            // Display classifications
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillStyle = sideColor;
                            ctx.fillText('By sides: ' + sideClass, viz.width / 2 - 110, 10);
                            ctx.fillStyle = angleColor;
                            ctx.fillText('By angles: ' + angleClass, viz.width / 2 + 110, 10);

                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('Angle sum: ' + (angA + angB + angC).toFixed(1) + '\u00B0', viz.width / 2, 35);
                        }

                        pA.onDrag = function() { draw(); };
                        pB.onDrag = function() { draw(); };
                        pC.onDrag = function() { draw(); };
                        draw();
                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'Classify a triangle with sides 5, 5, 8 by its sides.',
                    hint: 'How many sides are congruent?',
                    solution: '<strong>Isosceles.</strong> Two sides (both of length 5) are congruent.'
                },
                {
                    question: 'Classify a triangle with angles \\(60^\\circ\\), \\(60^\\circ\\), \\(60^\\circ\\) by both sides and angles.',
                    hint: 'What happens when all angles are equal?',
                    solution: '<strong>Equilateral</strong> (all sides equal) and <strong>equiangular</strong> (all angles equal to \\(60^\\circ\\)).'
                },
                {
                    question: 'A triangle has angles \\(30^\\circ\\), \\(60^\\circ\\), \\(90^\\circ\\). Classify it by angles.',
                    hint: 'Is any angle equal to \\(90^\\circ\\)?',
                    solution: '<strong>Right triangle</strong>, because one angle is exactly \\(90^\\circ\\).'
                },
                {
                    question: 'Can a triangle be both right and obtuse? Explain.',
                    hint: 'A right angle is \\(90^\\circ\\) and the three angles must sum to \\(180^\\circ\\).',
                    solution: 'No. A right triangle has one \\(90^\\circ\\) angle, and the other two must sum to \\(90^\\circ\\), so both are acute. An obtuse triangle has an angle greater than \\(90^\\circ\\). A triangle cannot have both.'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Triangle Angle Sum Theorem
        // ============================================================
        {
            id: 'ch03-sec02',
            title: 'Triangle Angle Sum Theorem',
            content: `<h2>Triangle Angle Sum Theorem</h2>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Triangle Angle Sum)</div>
                    <div class="env-body"><p>The sum of the interior angles of any triangle is \\(180^\\circ\\):
                    \\[m\\angle A + m\\angle B + m\\angle C = 180^\\circ\\]</p></div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body"><p>Let \\(\\triangle ABC\\) be given. Draw line \\(\\ell\\) through \\(A\\) parallel to \\(\\overline{BC}\\). Then:
                    <br>\\(\\angle 1 = \\angle B\\) (alternate interior angles, \\(\\ell \\parallel BC\\), transversal \\(AB\\))
                    <br>\\(\\angle 3 = \\angle C\\) (alternate interior angles, \\(\\ell \\parallel BC\\), transversal \\(AC\\))
                    <br>Since \\(\\angle 1 + \\angle A + \\angle 3 = 180^\\circ\\) (straight angle along \\(\\ell\\)),
                    <br>we get \\(\\angle B + \\angle A + \\angle C = 180^\\circ\\). \\(\\square\\)</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-angle-sum"></div>

                <div class="env-block theorem">
                    <div class="env-title">Corollary (Exterior Angle Theorem)</div>
                    <div class="env-body"><p>An exterior angle of a triangle equals the sum of the two non-adjacent (remote) interior angles:
                    \\[m\\angle_{\\text{ext}} = m\\angle A + m\\angle B\\]
                    where \\(\\angle A\\) and \\(\\angle B\\) are the remote interior angles.</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>In \\(\\triangle ABC\\), \\(m\\angle A = 50^\\circ\\), \\(m\\angle B = 70^\\circ\\). Find \\(m\\angle C\\) and the exterior angle at \\(C\\).
                    <br>\\(m\\angle C = 180^\\circ - 50^\\circ - 70^\\circ = 60^\\circ\\).
                    <br>Exterior angle at \\(C = 50^\\circ + 70^\\circ = 120^\\circ\\).</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-angle-sum',
                    title: 'Triangle Angle Sum Demonstration',
                    description: 'Drag the triangle vertices. Watch the three angles always sum to 180. The parallel-line proof construction is shown above the triangle.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40, height: 440 });
                        var pA = viz.addDraggable('A', 0, 3, viz.colors.blue, 10);
                        var pB = viz.addDraggable('B', -3, -1.5, viz.colors.teal, 10);
                        var pC = viz.addDraggable('C', 3, -1.5, viz.colors.orange, 10);

                        function angleBetween(ax, ay, bx, by, cx, cy) {
                            var v1x = ax - bx, v1y = ay - by;
                            var v2x = cx - bx, v2y = cy - by;
                            var dot = v1x * v2x + v1y * v2y;
                            var len1 = Math.sqrt(v1x * v1x + v1y * v1y);
                            var len2 = Math.sqrt(v2x * v2x + v2y * v2y);
                            if (len1 < 0.001 || len2 < 0.001) return 0;
                            return Math.acos(Math.max(-1, Math.min(1, dot / (len1 * len2)))) * 180 / Math.PI;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();

                            var angA = angleBetween(pB.x, pB.y, pA.x, pA.y, pC.x, pC.y);
                            var angB = angleBetween(pA.x, pA.y, pB.x, pB.y, pC.x, pC.y);
                            var angC = angleBetween(pA.x, pA.y, pC.x, pC.y, pB.x, pB.y);

                            // Draw the triangle
                            viz.drawPolygon([[pA.x, pA.y], [pB.x, pB.y], [pC.x, pC.y]], viz.colors.blue + '15', viz.colors.white, 2);

                            // Draw parallel line through A
                            var dx = pC.x - pB.x, dy = pC.y - pB.y;
                            var len = Math.sqrt(dx * dx + dy * dy);
                            if (len > 0.01) {
                                var ux = dx / len, uy = dy / len;
                                var ext = 5;
                                viz.drawLine(pA.x - ux * ext, pA.y - uy * ext, pA.x + ux * ext, pA.y + uy * ext, viz.colors.purple + '66', 1.5, true);
                            }

                            // Draw angle arcs at each vertex
                            var ctx = viz.ctx;

                            function drawArc(vx, vy, fromX, fromY, toX, toY, color, label) {
                                var sv = viz.toScreen(vx, vy);
                                var a1 = Math.atan2(-(fromY - vy), fromX - vx);
                                var a2 = Math.atan2(-(toY - vy), toX - vx);

                                // Ensure we go the short way
                                var diff = a2 - a1;
                                while (diff > Math.PI) diff -= 2 * Math.PI;
                                while (diff < -Math.PI) diff += 2 * Math.PI;

                                ctx.fillStyle = color + '33';
                                ctx.beginPath();
                                ctx.moveTo(sv[0], sv[1]);
                                if (diff > 0) {
                                    ctx.arc(sv[0], sv[1], 22, a1, a1 + diff);
                                } else {
                                    ctx.arc(sv[0], sv[1], 22, a1, a1 + diff, true);
                                }
                                ctx.closePath();
                                ctx.fill();

                                ctx.strokeStyle = color;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                if (diff > 0) {
                                    ctx.arc(sv[0], sv[1], 22, a1, a1 + diff);
                                } else {
                                    ctx.arc(sv[0], sv[1], 22, a1, a1 + diff, true);
                                }
                                ctx.stroke();

                                var midA = a1 + diff / 2;
                                ctx.fillStyle = color;
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(label, sv[0] + 40 * Math.cos(midA), sv[1] + 40 * Math.sin(midA));
                            }

                            drawArc(pA.x, pA.y, pB.x, pB.y, pC.x, pC.y, viz.colors.green, angA.toFixed(1) + '\u00B0');
                            drawArc(pB.x, pB.y, pC.x, pC.y, pA.x, pA.y, viz.colors.purple, angB.toFixed(1) + '\u00B0');
                            drawArc(pC.x, pC.y, pA.x, pA.y, pB.x, pB.y, viz.colors.orange, angC.toFixed(1) + '\u00B0');

                            viz.drawPoint(pA.x, pA.y, viz.colors.blue, 'A', 5);
                            viz.drawPoint(pB.x, pB.y, viz.colors.teal, 'B', 5);
                            viz.drawPoint(pC.x, pC.y, viz.colors.orange, 'C', 5);
                            viz.drawDraggables();

                            // Sum display
                            var sum = angA + angB + angC;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillStyle = Math.abs(sum - 180) < 1 ? viz.colors.green : viz.colors.yellow;
                            ctx.fillText(angA.toFixed(1) + '\u00B0 + ' + angB.toFixed(1) + '\u00B0 + ' + angC.toFixed(1) + '\u00B0 = ' + sum.toFixed(1) + '\u00B0', viz.width / 2, 10);

                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('Dashed line: parallel to BC through A (used in proof)', viz.width / 2, viz.height - 15);
                        }

                        pA.onDrag = function() { draw(); };
                        pB.onDrag = function() { draw(); };
                        pC.onDrag = function() { draw(); };
                        draw();
                        viz.animate(function() { draw(); });
                        return viz;
                    }
                },
                {
                    id: 'viz-exterior-angle',
                    title: 'Exterior Angle Theorem',
                    description: 'Drag the vertices to see the exterior angle at C always equals the sum of the two remote interior angles at A and B.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40, height: 400 });
                        var pA = viz.addDraggable('A', 0, 3.5, viz.colors.blue, 10);
                        var pB = viz.addDraggable('B', -3.5, -1.5, viz.colors.teal, 10);
                        var pC = viz.addDraggable('C', 2, -1.5, viz.colors.orange, 10);

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

                            var angA = angleBetween(pB.x, pB.y, pA.x, pA.y, pC.x, pC.y);
                            var angB = angleBetween(pA.x, pA.y, pB.x, pB.y, pC.x, pC.y);
                            var angC = angleBetween(pA.x, pA.y, pC.x, pC.y, pB.x, pB.y);
                            var extC = angA + angB;

                            // Draw triangle
                            viz.drawPolygon([[pA.x, pA.y], [pB.x, pB.y], [pC.x, pC.y]], viz.colors.blue + '12', viz.colors.white, 2);

                            // Extend side BC past C to form exterior angle
                            var dx = pC.x - pB.x, dy = pC.y - pB.y;
                            var len = Math.sqrt(dx * dx + dy * dy);
                            if (len > 0.01) {
                                var extPx = pC.x + dx / len * 3;
                                var extPy = pC.y + dy / len * 3;
                                viz.drawSegment(pC.x, pC.y, extPx, extPy, viz.colors.red, 2);

                                // Draw exterior angle arc
                                var ctx = viz.ctx;
                                var sc = viz.toScreen(pC.x, pC.y);
                                var aBC = Math.atan2(-(dy), dx); // direction B->C in screen coords
                                var aCA = Math.atan2(-(pA.y - pC.y), pA.x - pC.x);

                                ctx.fillStyle = viz.colors.red + '33';
                                ctx.strokeStyle = viz.colors.red;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                ctx.moveTo(sc[0], sc[1]);
                                ctx.arc(sc[0], sc[1], 30, aBC, aCA, true);
                                ctx.closePath();
                                ctx.fill();
                                ctx.beginPath();
                                ctx.arc(sc[0], sc[1], 30, aBC, aCA, true);
                                ctx.stroke();
                            }

                            // Labels
                            viz.drawPoint(pA.x, pA.y, viz.colors.blue, 'A', 5);
                            viz.drawPoint(pB.x, pB.y, viz.colors.teal, 'B', 5);
                            viz.drawPoint(pC.x, pC.y, viz.colors.orange, 'C', 5);
                            viz.drawDraggables();

                            var ctx = viz.ctx;
                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillText('Exterior angle at C = ' + extC.toFixed(1) + '\u00B0', viz.width / 2, 10);
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('\u2220A + \u2220B = ' + angA.toFixed(1) + '\u00B0 + ' + angB.toFixed(1) + '\u00B0 = ' + extC.toFixed(1) + '\u00B0 = Exterior angle', viz.width / 2, 32);
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('Interior \u2220C = ' + angC.toFixed(1) + '\u00B0  (supplementary to exterior: ' + angC.toFixed(1) + ' + ' + extC.toFixed(1) + ' = ' + (angC + extC).toFixed(1) + '\u00B0)', viz.width / 2, 52);
                        }

                        pA.onDrag = function() { draw(); };
                        pB.onDrag = function() { draw(); };
                        pC.onDrag = function() { draw(); };
                        draw();
                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'In \\(\\triangle ABC\\), \\(m\\angle A = 45^\\circ\\) and \\(m\\angle B = 85^\\circ\\). Find \\(m\\angle C\\).',
                    hint: 'Use the Triangle Angle Sum Theorem.',
                    solution: '\\(m\\angle C = 180^\\circ - 45^\\circ - 85^\\circ = 50^\\circ\\).'
                },
                {
                    question: 'The angles of a triangle are \\(x\\), \\(2x\\), and \\(3x\\). Find \\(x\\).',
                    hint: 'The three angles sum to \\(180^\\circ\\).',
                    solution: '\\(x + 2x + 3x = 180\\), so \\(6x = 180\\), giving \\(x = 30^\\circ\\). The angles are \\(30^\\circ, 60^\\circ, 90^\\circ\\).'
                },
                {
                    question: 'An exterior angle of a triangle measures \\(130^\\circ\\). One of the remote interior angles is \\(55^\\circ\\). Find the other remote interior angle.',
                    hint: 'By the Exterior Angle Theorem, the exterior angle equals the sum of the two remote interior angles.',
                    solution: '\\(130^\\circ = 55^\\circ + x\\), so \\(x = 75^\\circ\\).'
                },
                {
                    question: 'Can a triangle have two right angles? Why or why not?',
                    hint: 'What would two \\(90^\\circ\\) angles sum to?',
                    solution: 'No. Two right angles would already sum to \\(180^\\circ\\), leaving \\(0^\\circ\\) for the third angle, which is impossible for a triangle.'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Triangle Inequality
        // ============================================================
        {
            id: 'ch03-sec03',
            title: 'Triangle Inequality',
            content: `<h2>Triangle Inequality</h2>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Triangle Inequality)</div>
                    <div class="env-body"><p>The sum of the lengths of any two sides of a triangle must be greater than the length of the third side. For \\(\\triangle ABC\\):
                    \\[AB + BC > AC, \\quad AB + AC > BC, \\quad BC + AC > AB\\]</p></div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition</div>
                    <div class="env-body"><p>The shortest path between two points is a straight line. Going from \\(A\\) to \\(C\\) via \\(B\\) is always longer than going directly (unless \\(B\\) is on segment \\(\\overline{AC}\\), in which case you do not have a triangle).</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-triangle-inequality"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>Can sides of length 3, 4, 8 form a triangle?
                    <br>Check: \\(3 + 4 = 7 < 8\\). No! The triangle inequality fails.
                    <br>Can sides 3, 4, 5 form a triangle?
                    <br>Check: \\(3 + 4 = 7 > 5\\), \\(3 + 5 = 8 > 4\\), \\(4 + 5 = 9 > 3\\). Yes!</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Corollary (Side-Angle Relationship)</div>
                    <div class="env-body"><p>In a triangle, the longest side is opposite the largest angle, and the shortest side is opposite the smallest angle.</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-triangle-inequality',
                    title: 'Triangle Inequality Explorer',
                    description: 'Drag vertex C. When the three side lengths violate the triangle inequality, the triangle collapses and the display turns red.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40, height: 400 });
                        var pA = viz.addDraggable('A', -3, -1, viz.colors.blue, 10);
                        var pB = viz.addDraggable('B', 3, -1, viz.colors.teal, 10);
                        var pC = viz.addDraggable('C', 0, 3, viz.colors.orange, 10);

                        function dist(x1, y1, x2, y2) {
                            return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();

                            var ab = dist(pA.x, pA.y, pB.x, pB.y);
                            var bc = dist(pB.x, pB.y, pC.x, pC.y);
                            var ca = dist(pC.x, pC.y, pA.x, pA.y);

                            var valid = (ab + bc > ca + 0.01) && (ab + ca > bc + 0.01) && (bc + ca > ab + 0.01);

                            // Draw triangle
                            var fillColor = valid ? viz.colors.blue + '15' : viz.colors.red + '15';
                            var strokeColor = valid ? viz.colors.white : viz.colors.red;
                            viz.drawPolygon([[pA.x, pA.y], [pB.x, pB.y], [pC.x, pC.y]], fillColor, strokeColor, 2);

                            viz.drawPoint(pA.x, pA.y, viz.colors.blue, 'A', 5);
                            viz.drawPoint(pB.x, pB.y, viz.colors.teal, 'B', 5);
                            viz.drawPoint(pC.x, pC.y, viz.colors.orange, 'C', 5);
                            viz.drawDraggables();

                            // Display inequalities
                            var ctx = viz.ctx;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';

                            var checks = [
                                { text: 'AB + BC = ' + ab.toFixed(2) + ' + ' + bc.toFixed(2) + ' = ' + (ab + bc).toFixed(2) + (ab + bc > ca ? ' > ' : ' \u2264 ') + 'CA = ' + ca.toFixed(2), ok: ab + bc > ca + 0.01 },
                                { text: 'AB + CA = ' + ab.toFixed(2) + ' + ' + ca.toFixed(2) + ' = ' + (ab + ca).toFixed(2) + (ab + ca > bc ? ' > ' : ' \u2264 ') + 'BC = ' + bc.toFixed(2), ok: ab + ca > bc + 0.01 },
                                { text: 'BC + CA = ' + bc.toFixed(2) + ' + ' + ca.toFixed(2) + ' = ' + (bc + ca).toFixed(2) + (bc + ca > ab ? ' > ' : ' \u2264 ') + 'AB = ' + ab.toFixed(2), ok: bc + ca > ab + 0.01 }
                            ];

                            for (var i = 0; i < 3; i++) {
                                ctx.fillStyle = checks[i].ok ? viz.colors.green : viz.colors.red;
                                ctx.fillText((checks[i].ok ? '\u2713 ' : '\u2717 ') + checks[i].text, 15, 10 + i * 20);
                            }

                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillStyle = valid ? viz.colors.green : viz.colors.red;
                            ctx.fillText(valid ? 'Valid Triangle' : 'NOT a Valid Triangle (inequality violated)', viz.width / 2, viz.height - 20);
                        }

                        pA.onDrag = function() { draw(); };
                        pB.onDrag = function() { draw(); };
                        pC.onDrag = function() { draw(); };
                        draw();
                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'Can sides of length 2, 3, and 6 form a triangle?',
                    hint: 'Check: is the sum of the two shorter sides greater than the longest side?',
                    solution: 'No. \\(2 + 3 = 5 < 6\\). The triangle inequality fails.'
                },
                {
                    question: 'Two sides of a triangle have lengths 7 and 10. What are the possible lengths for the third side?',
                    hint: 'The third side must satisfy all three triangle inequalities.',
                    solution: 'Let the third side be \\(s\\). Then \\(|10 - 7| < s < 10 + 7\\), so \\(3 < s < 17\\).'
                },
                {
                    question: 'In \\(\\triangle ABC\\), \\(m\\angle A = 80^\\circ\\), \\(m\\angle B = 60^\\circ\\), \\(m\\angle C = 40^\\circ\\). Which side is longest?',
                    hint: 'The longest side is opposite the largest angle.',
                    solution: 'The largest angle is \\(\\angle A = 80^\\circ\\), so the longest side is \\(\\overline{BC}\\) (the side opposite \\(\\angle A\\)).'
                },
                {
                    question: 'Can a triangle have sides 5, 5, 10?',
                    hint: 'Check the inequality carefully; equality is not enough.',
                    solution: 'No. \\(5 + 5 = 10\\), which is <strong>not greater</strong> than 10. The inequality requires strict inequality (\\(>\\), not \\(\\geq\\)).'
                }
            ]
        },

        // ============================================================
        // SECTION 4: Special Segments
        // ============================================================
        {
            id: 'ch03-sec04',
            title: 'Special Segments: Median, Altitude, Bisector',
            content: `<h2>Special Segments: Median, Altitude, Bisector</h2>

                <div class="env-block definition">
                    <div class="env-title">Definition (Median)</div>
                    <div class="env-body"><p>A <strong>median</strong> of a triangle is a segment from a vertex to the midpoint of the opposite side. The three medians of a triangle meet at a single point called the <strong>centroid</strong>.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Altitude)</div>
                    <div class="env-body"><p>An <strong>altitude</strong> of a triangle is the perpendicular segment from a vertex to the line containing the opposite side. The three altitudes meet at the <strong>orthocenter</strong>.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Angle Bisector)</div>
                    <div class="env-body"><p>An <strong>angle bisector</strong> of a triangle is a segment from a vertex to the opposite side that bisects the vertex angle. The three angle bisectors meet at the <strong>incenter</strong>, which is the center of the inscribed circle.</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Centroid Theorem)</div>
                    <div class="env-body"><p>The centroid divides each median in the ratio \\(2:1\\) from the vertex. The centroid is the "balance point" (center of mass) of the triangle.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-special-segments"></div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body"><p>For an equilateral triangle, the centroid, orthocenter, incenter, and circumcenter all coincide at the same point.</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-special-segments',
                    title: 'Special Segments of a Triangle',
                    description: 'Drag the triangle vertices. Toggle between medians (centroid), altitudes (orthocenter), and angle bisectors (incenter).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40, height: 440 });
                        var pA = viz.addDraggable('A', 0, 3.5, viz.colors.blue, 10);
                        var pB = viz.addDraggable('B', -3.5, -2, viz.colors.teal, 10);
                        var pC = viz.addDraggable('C', 3.5, -2, viz.colors.orange, 10);
                        var mode = 'median';

                        function dist(x1, y1, x2, y2) {
                            return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
                        }

                        function footOfAltitude(px, py, ax, ay, bx, by) {
                            var dx = bx - ax, dy = by - ay;
                            var lenSq = dx * dx + dy * dy;
                            if (lenSq < 0.0001) return { x: ax, y: ay };
                            var t = ((px - ax) * dx + (py - ay) * dy) / lenSq;
                            return { x: ax + t * dx, y: ay + t * dy };
                        }

                        function angleBisectorFoot(vx, vy, ax, ay, bx, by) {
                            var da = dist(vx, vy, ax, ay);
                            var db = dist(vx, vy, bx, by);
                            if (da + db < 0.001) return { x: (ax + bx) / 2, y: (ay + by) / 2 };
                            var t = da / (da + db);
                            return { x: ax + t * (bx - ax), y: ay + t * (by - ay) };
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();

                            // Draw the triangle
                            viz.drawPolygon([[pA.x, pA.y], [pB.x, pB.y], [pC.x, pC.y]], viz.colors.blue + '12', viz.colors.white, 2);

                            var ctx = viz.ctx;

                            if (mode === 'median') {
                                // Midpoints
                                var mAB = { x: (pA.x + pB.x) / 2, y: (pA.y + pB.y) / 2 };
                                var mBC = { x: (pB.x + pC.x) / 2, y: (pB.y + pC.y) / 2 };
                                var mCA = { x: (pC.x + pA.x) / 2, y: (pC.y + pA.y) / 2 };

                                // Draw medians
                                viz.drawSegment(pA.x, pA.y, mBC.x, mBC.y, viz.colors.green, 2);
                                viz.drawSegment(pB.x, pB.y, mCA.x, mCA.y, viz.colors.purple, 2);
                                viz.drawSegment(pC.x, pC.y, mAB.x, mAB.y, viz.colors.yellow, 2);

                                // Centroid
                                var gx = (pA.x + pB.x + pC.x) / 3;
                                var gy = (pA.y + pB.y + pC.y) / 3;
                                viz.drawPoint(gx, gy, viz.colors.red, 'G (centroid)', 7);

                                // Midpoint labels
                                viz.drawPoint(mBC.x, mBC.y, viz.colors.green, 'M_a', 4);
                                viz.drawPoint(mCA.x, mCA.y, viz.colors.purple, 'M_b', 4);
                                viz.drawPoint(mAB.x, mAB.y, viz.colors.yellow, 'M_c', 4);

                                viz.screenText('Medians meet at the Centroid (balance point)', viz.width / 2, 15, viz.colors.green, 15);
                                viz.screenText('G divides each median 2:1 from vertex', viz.width / 2, 35, viz.colors.text, 12);

                            } else if (mode === 'altitude') {
                                // Feet of altitudes
                                var fA = footOfAltitude(pA.x, pA.y, pB.x, pB.y, pC.x, pC.y);
                                var fB = footOfAltitude(pB.x, pB.y, pA.x, pA.y, pC.x, pC.y);
                                var fC = footOfAltitude(pC.x, pC.y, pA.x, pA.y, pB.x, pB.y);

                                viz.drawSegment(pA.x, pA.y, fA.x, fA.y, viz.colors.green, 2);
                                viz.drawSegment(pB.x, pB.y, fB.x, fB.y, viz.colors.purple, 2);
                                viz.drawSegment(pC.x, pC.y, fC.x, fC.y, viz.colors.yellow, 2);

                                // Right angle markers
                                function drawRightAngle(fx, fy, lx, ly) {
                                    var sf = viz.toScreen(fx, fy);
                                    var sl = viz.toScreen(lx, ly);
                                    var dx = sl[0] - sf[0], dy = sl[1] - sf[1];
                                    var len = Math.sqrt(dx * dx + dy * dy);
                                    if (len < 1) return;
                                    var ux = dx / len * 10, uy = dy / len * 10;
                                    var px = -uy, py = ux;
                                    ctx.strokeStyle = viz.colors.text;
                                    ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    ctx.moveTo(sf[0] + ux, sf[1] + uy);
                                    ctx.lineTo(sf[0] + ux + px, sf[1] + uy + py);
                                    ctx.lineTo(sf[0] + px, sf[1] + py);
                                    ctx.stroke();
                                }
                                drawRightAngle(fA.x, fA.y, pB.x, pB.y);
                                drawRightAngle(fB.x, fB.y, pA.x, pA.y);
                                drawRightAngle(fC.x, fC.y, pA.x, pA.y);

                                // Orthocenter (intersection of altitudes)
                                // Using the fact that it is the "reflection" computation
                                var ox = pA.x + pB.x + pC.x - 2 * ((pA.x + pB.x + pC.x) / 3) + (pA.x + pB.x + pC.x) / 3;
                                // Proper orthocenter calculation
                                var dAB = { x: pB.x - pA.x, y: pB.y - pA.y };
                                var dAC = { x: pC.x - pA.x, y: pC.y - pA.y };
                                var dBC = { x: pC.x - pB.x, y: pC.y - pB.y };
                                // From altitude A to BC and altitude B to AC
                                // Altitude from A: perpendicular to BC through A
                                // Altitude from B: perpendicular to AC through B
                                var det = dBC.x * dAC.y - dBC.y * dAC.x;
                                if (Math.abs(det) > 0.001) {
                                    var tA = ((pB.x - pA.x) * dAC.y - (pB.y - pA.y) * dAC.x) / det;
                                    var hx = pA.x + tA * (-dBC.y);
                                    var hy = pA.y + tA * dBC.x;
                                    viz.drawPoint(hx, hy, viz.colors.red, 'H (orthocenter)', 7);
                                }

                                viz.screenText('Altitudes meet at the Orthocenter', viz.width / 2, 15, viz.colors.green, 15);

                            } else if (mode === 'bisector') {
                                var fA = angleBisectorFoot(pA.x, pA.y, pB.x, pB.y, pC.x, pC.y);
                                var fB = angleBisectorFoot(pB.x, pB.y, pA.x, pA.y, pC.x, pC.y);
                                var fC = angleBisectorFoot(pC.x, pC.y, pA.x, pA.y, pB.x, pB.y);

                                viz.drawSegment(pA.x, pA.y, fA.x, fA.y, viz.colors.green, 2);
                                viz.drawSegment(pB.x, pB.y, fB.x, fB.y, viz.colors.purple, 2);
                                viz.drawSegment(pC.x, pC.y, fC.x, fC.y, viz.colors.yellow, 2);

                                // Incenter (weighted by side lengths)
                                var a = dist(pB.x, pB.y, pC.x, pC.y);
                                var b = dist(pA.x, pA.y, pC.x, pC.y);
                                var c = dist(pA.x, pA.y, pB.x, pB.y);
                                var perimeter = a + b + c;
                                if (perimeter > 0.01) {
                                    var ix = (a * pA.x + b * pB.x + c * pC.x) / perimeter;
                                    var iy = (a * pA.y + b * pB.y + c * pC.y) / perimeter;
                                    viz.drawPoint(ix, iy, viz.colors.red, 'I (incenter)', 7);

                                    // Inscribed circle
                                    var s = perimeter / 2;
                                    var area = Math.sqrt(Math.max(0, s * (s - a) * (s - b) * (s - c)));
                                    var inradius = area / s;
                                    viz.drawCircle(ix, iy, inradius, null, viz.colors.red + '66', 1.5);
                                }

                                viz.screenText('Angle bisectors meet at the Incenter', viz.width / 2, 15, viz.colors.green, 15);
                                viz.screenText('The incircle (red) is tangent to all three sides', viz.width / 2, 35, viz.colors.text, 12);
                            }

                            viz.drawPoint(pA.x, pA.y, viz.colors.blue, 'A', 5);
                            viz.drawPoint(pB.x, pB.y, viz.colors.teal, 'B', 5);
                            viz.drawPoint(pC.x, pC.y, viz.colors.orange, 'C', 5);
                            viz.drawDraggables();
                        }

                        VizEngine.createButton(controls, 'Medians', function() { mode = 'median'; draw(); });
                        VizEngine.createButton(controls, 'Altitudes', function() { mode = 'altitude'; draw(); });
                        VizEngine.createButton(controls, 'Angle Bisectors', function() { mode = 'bisector'; draw(); });
                        pA.onDrag = function() { draw(); };
                        pB.onDrag = function() { draw(); };
                        pC.onDrag = function() { draw(); };
                        draw();
                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'What is the centroid, and in what ratio does it divide each median?',
                    hint: 'The centroid is where the medians meet.',
                    solution: 'The <strong>centroid</strong> is the intersection point of the three medians. It divides each median in the ratio \\(2:1\\) from the vertex to the midpoint of the opposite side.'
                },
                {
                    question: 'In a right triangle, where does the orthocenter lie?',
                    hint: 'The orthocenter is where the altitudes meet. In a right triangle, two of the altitudes are the legs.',
                    solution: 'The orthocenter of a right triangle lies at the vertex of the right angle.'
                },
                {
                    question: 'What is the incenter of a triangle, and what special property does it have?',
                    hint: 'Think about angle bisectors and inscribed circles.',
                    solution: 'The <strong>incenter</strong> is the intersection of the three angle bisectors. It is equidistant from all three sides and is the center of the inscribed circle (incircle).'
                },
                {
                    question: 'A triangle has vertices at \\(A(0, 0)\\), \\(B(6, 0)\\), \\(C(0, 8)\\). Find the centroid.',
                    hint: 'The centroid is the average of the three vertices.',
                    solution: 'Centroid \\(= \\left(\\frac{0+6+0}{3},\\; \\frac{0+0+8}{3}\\right) = (2, \\frac{8}{3}) \\approx (2, 2.67)\\).'
                }
            ]
        }
    ]
});
