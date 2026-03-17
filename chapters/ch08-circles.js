window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch08',
    number: 8,
    title: 'Circles',
    subtitle: 'Radius, chords, central and inscribed angles, tangent lines, arc length, sector area, and power of a point',
    sections: [
        // ============================================================
        // SECTION 1: Circle Basics
        // ============================================================
        {
            id: 'ch08-sec01',
            title: 'Circle Basics',
            content: `<h2>Circle Basics</h2>

                <div class="env-block intuition">
                    <div class="env-title">The Big Picture</div>
                    <div class="env-body"><p>A circle is the set of all points at a fixed distance from a center. This simple definition gives rise to a rich structure of chords, secants, tangents, arcs, and angles. Circles appear everywhere in mathematics, from the unit circle in trigonometry to orbital mechanics.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Key Terms</div>
                    <div class="env-body">
                    <ul>
                        <li><strong>Radius \\(r\\):</strong> distance from center to any point on the circle.</li>
                        <li><strong>Diameter \\(d = 2r\\):</strong> a chord passing through the center.</li>
                        <li><strong>Chord:</strong> a segment with both endpoints on the circle.</li>
                        <li><strong>Secant:</strong> a line that intersects the circle at two points.</li>
                        <li><strong>Tangent:</strong> a line that touches the circle at exactly one point.</li>
                        <li><strong>Arc:</strong> a portion of the circle between two points.</li>
                    </ul>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-circle-parts"></div>

                <div class="env-block theorem">
                    <div class="env-title">Perpendicular from Center to Chord</div>
                    <div class="env-body"><p>A line from the center of a circle perpendicular to a chord bisects the chord. Conversely, a line from the center to the midpoint of a chord is perpendicular to the chord.</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>A chord of length 24 is 5 units from the center of a circle. Find the radius.</p>
                    <p>Half the chord is 12. By the Pythagorean theorem, \\(r = \\sqrt{12^2 + 5^2} = \\sqrt{169} = 13\\).</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-circle-parts',
                    title: 'Parts of a Circle',
                    description: 'Drag point P around the circle to see the radius, chord, and arc. Drag point Q to create a chord.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 60, originX: 250, originY: 200, height: 380 });
                        var r = 2.5;
                        var pAngle = Math.PI / 4;
                        var qAngle = 3 * Math.PI / 4;
                        var pPt = viz.addDraggable('P', r * Math.cos(pAngle), r * Math.sin(pAngle), viz.colors.orange, 10);
                        var qPt = viz.addDraggable('Q', r * Math.cos(qAngle), r * Math.sin(qAngle), viz.colors.teal, 10);

                        function draw() {
                            // Snap to circle
                            var pLen = Math.sqrt(pPt.x * pPt.x + pPt.y * pPt.y);
                            if (pLen > 0.01) { pPt.x = pPt.x / pLen * r; pPt.y = pPt.y / pLen * r; }
                            var qLen = Math.sqrt(qPt.x * qPt.x + qPt.y * qPt.y);
                            if (qLen > 0.01) { qPt.x = qPt.x / qLen * r; qPt.y = qPt.y / qLen * r; }

                            viz.clear();
                            viz.drawGrid();
                            var ctx = viz.ctx;

                            // Circle
                            viz.drawCircle(0, 0, r, null, viz.colors.blue, 2);

                            // Radius to P
                            viz.drawSegment(0, 0, pPt.x, pPt.y, viz.colors.red, 2);

                            // Diameter through P
                            viz.drawSegment(-pPt.x, -pPt.y, pPt.x, pPt.y, viz.colors.red, 1, true);

                            // Chord PQ
                            viz.drawSegment(pPt.x, pPt.y, qPt.x, qPt.y, viz.colors.green, 2.5);

                            // Perpendicular from center to chord
                            var mx = (pPt.x + qPt.x) / 2;
                            var my = (pPt.y + qPt.y) / 2;
                            viz.drawSegment(0, 0, mx, my, viz.colors.yellow, 1.5, true);
                            viz.drawPoint(mx, my, viz.colors.yellow, 'M', 4);

                            // Arc PQ (minor arc)
                            var angleP = Math.atan2(pPt.y, pPt.x);
                            var angleQ = Math.atan2(qPt.y, qPt.x);
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 4;
                            ctx.beginPath();
                            ctx.arc(viz.originX, viz.originY, r * viz.scale, -angleQ, -angleP);
                            ctx.stroke();

                            // Labels
                            var chordLen = Math.sqrt((qPt.x - pPt.x) * (qPt.x - pPt.x) + (qPt.y - pPt.y) * (qPt.y - pPt.y));
                            var distToChord = Math.sqrt(mx * mx + my * my);

                            viz.drawPoint(0, 0, viz.colors.white, 'O', 5);
                            viz.drawPoint(pPt.x, pPt.y, viz.colors.orange, 'P', 6);
                            viz.drawPoint(qPt.x, qPt.y, viz.colors.teal, 'Q', 6);

                            // Info panel
                            viz.screenText('r = ' + r.toFixed(2), viz.width - 110, 25, viz.colors.red, 14);
                            viz.screenText('d = ' + (2 * r).toFixed(2), viz.width - 110, 45, viz.colors.red, 13);
                            viz.screenText('Chord PQ = ' + chordLen.toFixed(2), viz.width - 110, 70, viz.colors.green, 13);
                            viz.screenText('Dist to chord = ' + distToChord.toFixed(2), viz.width - 110, 90, viz.colors.yellow, 13);

                            // Arc angle
                            var arcAngle = Math.abs(angleP - angleQ);
                            if (arcAngle > Math.PI) arcAngle = 2 * Math.PI - arcAngle;
                            viz.screenText('Arc = ' + (arcAngle * 180 / Math.PI).toFixed(1) + '\u00B0', viz.width - 110, 115, viz.colors.purple, 13);

                            viz.drawDraggables();
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'A circle has radius 10. A chord is 12 units from the center. Find the chord length.',
                    hint: 'Use the right triangle formed by the radius, the distance to the chord, and half the chord.',
                    solution: 'Half-chord \\(= \\sqrt{10^2 - 12^2}\\). Since \\(12 > 10\\), no such chord exists (the distance cannot exceed the radius). If the distance were 6, then half-chord \\(= \\sqrt{100 - 36} = 8\\), so chord \\(= 16\\).'
                },
                {
                    question: 'A chord of length 16 is 6 units from the center. Find the radius.',
                    hint: 'Half the chord is 8. Form a right triangle.',
                    solution: '\\(r = \\sqrt{8^2 + 6^2} = \\sqrt{100} = 10\\).'
                },
                {
                    question: 'Two chords of a circle are equidistant from the center. What can you conclude?',
                    hint: 'Think about the relationship between distance from center and chord length.',
                    solution: 'The chords are congruent (equal in length). Chords equidistant from the center of a circle are congruent.'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Central & Inscribed Angles
        // ============================================================
        {
            id: 'ch08-sec02',
            title: 'Central & Inscribed Angles',
            content: `<h2>Central & Inscribed Angles</h2>

                <div class="env-block definition">
                    <div class="env-title">Definitions</div>
                    <div class="env-body">
                    <ul>
                        <li>A <strong>central angle</strong> has its vertex at the center. Its measure equals the intercepted arc.</li>
                        <li>An <strong>inscribed angle</strong> has its vertex on the circle. Its measure is <em>half</em> the intercepted arc.</li>
                    </ul>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Inscribed Angle Theorem</div>
                    <div class="env-body"><p>An inscribed angle is half the central angle that subtends the same arc:
                    \\[\\text{inscribed angle} = \\frac{1}{2} \\times \\text{intercepted arc}.\\]</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Corollaries</div>
                    <div class="env-body">
                    <ol>
                        <li>Inscribed angles subtending the same arc are congruent.</li>
                        <li>An angle inscribed in a semicircle is a right angle (Thales' theorem).</li>
                        <li>Opposite angles of an inscribed quadrilateral sum to \\(180^\\circ\\).</li>
                    </ol>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-inscribed-angle"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>A central angle is \\(110^\\circ\\). An inscribed angle subtends the same arc. Find the inscribed angle.</p>
                    <p>\\(\\text{Inscribed angle} = 110^\\circ / 2 = 55^\\circ.\\)</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-inscribed-angle',
                    title: 'Inscribed vs Central Angle',
                    description: 'Drag point V (on the circle) and points A, B to see how the inscribed angle relates to the central angle.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 80, originX: 240, originY: 200, height: 380 });
                        var r = 2;
                        var aAngle = -Math.PI / 3;
                        var bAngle = Math.PI / 3;
                        var vAngle = Math.PI * 0.8;

                        var ptA = viz.addDraggable('A', r * Math.cos(aAngle), r * Math.sin(aAngle), viz.colors.blue, 10);
                        var ptB = viz.addDraggable('B', r * Math.cos(bAngle), r * Math.sin(bAngle), viz.colors.teal, 10);
                        var ptV = viz.addDraggable('V', r * Math.cos(vAngle), r * Math.sin(vAngle), viz.colors.orange, 10);

                        function draw() {
                            // Snap to circle
                            var pts = [ptA, ptB, ptV];
                            for (var i = 0; i < 3; i++) {
                                var len = Math.sqrt(pts[i].x * pts[i].x + pts[i].y * pts[i].y);
                                if (len > 0.01) { pts[i].x = pts[i].x / len * r; pts[i].y = pts[i].y / len * r; }
                            }

                            viz.clear();
                            viz.drawGrid();
                            var ctx = viz.ctx;

                            // Circle
                            viz.drawCircle(0, 0, r, null, viz.colors.axis, 2);

                            // Central angle: O to A and O to B
                            viz.drawSegment(0, 0, ptA.x, ptA.y, viz.colors.blue, 1.5);
                            viz.drawSegment(0, 0, ptB.x, ptB.y, viz.colors.teal, 1.5);

                            // Inscribed angle: V to A and V to B
                            viz.drawSegment(ptV.x, ptV.y, ptA.x, ptA.y, viz.colors.orange, 2);
                            viz.drawSegment(ptV.x, ptV.y, ptB.x, ptB.y, viz.colors.orange, 2);

                            // Intercepted arc
                            var angA = Math.atan2(ptA.y, ptA.x);
                            var angB = Math.atan2(ptB.y, ptB.x);

                            // Central angle calculation
                            var centralAngle = angB - angA;
                            if (centralAngle < 0) centralAngle += 2 * Math.PI;
                            // We need the arc not containing V
                            var angV = Math.atan2(ptV.y, ptV.x);
                            var vNorm = angV - angA;
                            if (vNorm < 0) vNorm += 2 * Math.PI;
                            if (vNorm < centralAngle) {
                                centralAngle = 2 * Math.PI - centralAngle;
                            }

                            var centralDeg = centralAngle * 180 / Math.PI;

                            // Inscribed angle calculation
                            var va = [ptA.x - ptV.x, ptA.y - ptV.y];
                            var vb = [ptB.x - ptV.x, ptB.y - ptV.y];
                            var dot = va[0] * vb[0] + va[1] * vb[1];
                            var cross = va[0] * vb[1] - va[1] * vb[0];
                            var inscribedAngle = Math.abs(Math.atan2(cross, dot));
                            var inscribedDeg = inscribedAngle * 180 / Math.PI;

                            // Central angle arc
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(viz.originX, viz.originY, 25, -angB, -angA);
                            ctx.stroke();

                            // Inscribed angle arc at V
                            var vScreen = viz.toScreen(ptV.x, ptV.y);
                            var vaAngle = Math.atan2(-(ptA.y - ptV.y), ptA.x - ptV.x);
                            var vbAngle = Math.atan2(-(ptB.y - ptV.y), ptB.x - ptV.x);
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(vScreen[0], vScreen[1], 20, Math.min(vaAngle, vbAngle), Math.max(vaAngle, vbAngle));
                            ctx.stroke();

                            // Intercepted arc highlight
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 5;
                            ctx.beginPath();
                            ctx.arc(viz.originX, viz.originY, r * viz.scale, -angB, -angA);
                            ctx.stroke();

                            // Points
                            viz.drawPoint(0, 0, viz.colors.white, 'O', 5);
                            viz.drawPoint(ptA.x, ptA.y, viz.colors.blue, 'A', 6);
                            viz.drawPoint(ptB.x, ptB.y, viz.colors.teal, 'B', 6);
                            viz.drawPoint(ptV.x, ptV.y, viz.colors.orange, 'V', 6);

                            // Info
                            viz.screenText('Central angle = ' + centralDeg.toFixed(1) + '\u00B0', viz.width - 130, 30, viz.colors.yellow, 14);
                            viz.screenText('Inscribed angle = ' + inscribedDeg.toFixed(1) + '\u00B0', viz.width - 130, 55, viz.colors.red, 14);
                            viz.screenText('Ratio = ' + (inscribedDeg / centralDeg).toFixed(3), viz.width - 130, 80, viz.colors.white, 13);
                            viz.screenText('(should be 0.500)', viz.width - 130, 100, viz.colors.text, 12);

                            viz.drawDraggables();
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'An inscribed angle measures \\(35^\\circ\\). What is the measure of its intercepted arc?',
                    hint: 'The intercepted arc is twice the inscribed angle.',
                    solution: 'Arc \\(= 2 \\times 35^\\circ = 70^\\circ\\).'
                },
                {
                    question: 'Two inscribed angles subtend the same arc. One measures \\(48^\\circ\\). What does the other measure?',
                    hint: 'Inscribed angles subtending the same arc are congruent.',
                    solution: 'The other angle also measures \\(48^\\circ\\).'
                },
                {
                    question: 'A triangle is inscribed in a circle so that one side is a diameter. What type of triangle is it?',
                    hint: 'Apply Thales\' theorem.',
                    solution: 'It is a right triangle. The angle inscribed in a semicircle is \\(90^\\circ\\) (Thales\' theorem).'
                },
                {
                    question: 'In a cyclic quadrilateral \\(ABCD\\), \\(\\angle A = 85^\\circ\\). Find \\(\\angle C\\).',
                    hint: 'Opposite angles of a cyclic quadrilateral are supplementary.',
                    solution: '\\(\\angle C = 180^\\circ - 85^\\circ = 95^\\circ\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Tangent Lines
        // ============================================================
        {
            id: 'ch08-sec03',
            title: 'Tangent Lines',
            content: `<h2>Tangent Lines</h2>

                <div class="env-block theorem">
                    <div class="env-title">Tangent-Radius Theorem</div>
                    <div class="env-body"><p>A tangent to a circle is perpendicular to the radius at the point of tangency.</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Two-Tangent Theorem</div>
                    <div class="env-body"><p>Tangent segments from the same external point are congruent:
                    \\[PA = PB\\]
                    where \\(A\\) and \\(B\\) are the points of tangency.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-tangent-lines"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>A tangent from external point \\(P\\) touches a circle of radius 5 at point \\(T\\). If \\(OP = 13\\), find \\(PT\\).</p>
                    <p>Since \\(OT \\perp PT\\), triangle \\(OTP\\) is right: \\(PT = \\sqrt{13^2 - 5^2} = \\sqrt{144} = 12\\).</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-tangent-lines',
                    title: 'Tangent Line Construction',
                    description: 'Drag point P outside the circle. Two tangent lines from P are drawn, showing the right angle at each tangent point.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 50, originX: 220, originY: 200, height: 380 });
                        var r = 2;
                        var extPt = viz.addDraggable('P', 4.5, 1, viz.colors.orange, 10);

                        function draw() {
                            var d = Math.sqrt(extPt.x * extPt.x + extPt.y * extPt.y);
                            if (d < r + 0.3) {
                                var scale = (r + 0.3) / d;
                                extPt.x *= scale;
                                extPt.y *= scale;
                                d = r + 0.3;
                            }

                            viz.clear();
                            viz.drawGrid();
                            var ctx = viz.ctx;

                            // Circle
                            viz.drawCircle(0, 0, r, viz.colors.blue + '11', viz.colors.blue, 2);

                            // Calculate tangent points
                            var px = extPt.x, py = extPt.y;
                            var tangentLen = Math.sqrt(d * d - r * r);
                            var angleToP = Math.atan2(py, px);
                            var halfAngle = Math.acos(r / d);

                            var t1Angle = angleToP + halfAngle;
                            var t2Angle = angleToP - halfAngle;
                            var t1x = r * Math.cos(t1Angle), t1y = r * Math.sin(t1Angle);
                            var t2x = r * Math.cos(t2Angle), t2y = r * Math.sin(t2Angle);

                            // Tangent lines
                            viz.drawSegment(px, py, t1x, t1y, viz.colors.green, 2);
                            viz.drawSegment(px, py, t2x, t2y, viz.colors.green, 2);

                            // Radii to tangent points
                            viz.drawSegment(0, 0, t1x, t1y, viz.colors.red, 1.5);
                            viz.drawSegment(0, 0, t2x, t2y, viz.colors.red, 1.5);

                            // Line from O to P
                            viz.drawSegment(0, 0, px, py, viz.colors.yellow, 1.5, true);

                            // Right angle markers at tangent points
                            var markSize = 0.2;
                            for (var ti = 0; ti < 2; ti++) {
                                var tx = ti === 0 ? t1x : t2x;
                                var ty = ti === 0 ? t1y : t2y;
                                // Direction along radius (outward)
                                var rdx = tx / r, rdy = ty / r;
                                // Direction along tangent (toward P)
                                var tdx = px - tx, tdy = py - ty;
                                var tlen = Math.sqrt(tdx * tdx + tdy * tdy);
                                tdx /= tlen; tdy /= tlen;

                                var p1 = viz.toScreen(tx + rdx * markSize, ty + rdy * markSize);
                                var p2 = viz.toScreen(tx + rdx * markSize + tdx * markSize, ty + rdy * markSize + tdy * markSize);
                                var p3 = viz.toScreen(tx + tdx * markSize, ty + tdy * markSize);
                                ctx.strokeStyle = viz.colors.white;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(p1[0], p1[1]);
                                ctx.lineTo(p2[0], p2[1]);
                                ctx.lineTo(p3[0], p3[1]);
                                ctx.stroke();
                            }

                            // Points
                            viz.drawPoint(0, 0, viz.colors.white, 'O', 5);
                            viz.drawPoint(t1x, t1y, viz.colors.green, 'T\u2081', 5);
                            viz.drawPoint(t2x, t2y, viz.colors.green, 'T\u2082', 5);
                            viz.drawPoint(px, py, viz.colors.orange, 'P', 6);

                            // Info
                            var pt1 = Math.sqrt((px - t1x) * (px - t1x) + (py - t1y) * (py - t1y));
                            var pt2 = Math.sqrt((px - t2x) * (px - t2x) + (py - t2y) * (py - t2y));

                            viz.screenText('r = ' + r.toFixed(1) + ',  OP = ' + d.toFixed(2), viz.width / 2, viz.height - 60, viz.colors.white, 14);
                            viz.screenText('PT\u2081 = ' + pt1.toFixed(2) + ',  PT\u2082 = ' + pt2.toFixed(2), viz.width / 2, viz.height - 38, viz.colors.green, 13);
                            viz.screenText('PT = \u221A(OP\u00B2 - r\u00B2) = ' + tangentLen.toFixed(2), viz.width / 2, viz.height - 16, viz.colors.yellow, 13);

                            viz.drawDraggables();
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'A circle has radius 8. A tangent from point \\(P\\) has length 15. Find the distance from \\(P\\) to the center.',
                    hint: 'The tangent, radius, and line OP form a right triangle.',
                    solution: '\\(OP = \\sqrt{8^2 + 15^2} = \\sqrt{64 + 225} = \\sqrt{289} = 17\\).'
                },
                {
                    question: 'Two tangents from point \\(P\\) touch a circle of radius 6 at \\(A\\) and \\(B\\). If \\(PA = 8\\), find \\(PB\\).',
                    hint: 'Tangent segments from the same external point are congruent.',
                    solution: '\\(PB = PA = 8\\).'
                },
                {
                    question: 'A tangent and a radius meet at point \\(T\\) on the circle. What is the angle between them?',
                    hint: 'State the tangent-radius theorem.',
                    solution: 'The angle is \\(90^\\circ\\). A tangent is perpendicular to the radius at the point of tangency.'
                },
                {
                    question: 'From external point \\(P\\), tangent \\(PA = 12\\) and \\(OP = 13\\). Find the radius of the circle.',
                    hint: 'Use \\(r = \\sqrt{OP^2 - PA^2}\\).',
                    solution: '\\(r = \\sqrt{13^2 - 12^2} = \\sqrt{169 - 144} = \\sqrt{25} = 5\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 4: Arc Length & Sector Area
        // ============================================================
        {
            id: 'ch08-sec04',
            title: 'Arc Length & Sector Area',
            content: `<h2>Arc Length & Sector Area</h2>

                <div class="env-block definition">
                    <div class="env-title">Formulas</div>
                    <div class="env-body"><p>For a circle of radius \\(r\\) and central angle \\(\\theta\\) (in radians):</p>
                    <ul>
                        <li><strong>Arc length:</strong> \\(s = r\\theta\\)</li>
                        <li><strong>Sector area:</strong> \\(A = \\frac{1}{2}r^2\\theta\\)</li>
                    </ul>
                    <p>If \\(\\theta\\) is in degrees, use \\(s = \\frac{\\theta}{360^\\circ} \\cdot 2\\pi r\\) and \\(A = \\frac{\\theta}{360^\\circ} \\cdot \\pi r^2\\).</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-arc-sector"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>Find the arc length and sector area for a circle of radius 6 with central angle \\(60^\\circ\\).</p>
                    <p>Arc length: \\(s = \\frac{60}{360} \\cdot 2\\pi(6) = \\frac{1}{6} \\cdot 12\\pi = 2\\pi \\approx 6.28\\).</p>
                    <p>Sector area: \\(A = \\frac{60}{360} \\cdot \\pi(36) = 6\\pi \\approx 18.85\\).</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-arc-sector',
                    title: 'Arc Length & Sector Area',
                    description: 'Adjust the radius and angle to see arc length and sector area change.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 50, originX: 220, originY: 210, height: 380 });
                        var r = 3;
                        var angleDeg = 90;

                        VizEngine.createSlider(controls, 'Radius r', 1, 5, 3, 0.1, function(val) {
                            r = val;
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Angle (\u00B0)', 10, 350, 90, 5, function(val) {
                            angleDeg = val;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            var ctx = viz.ctx;

                            var angleRad = angleDeg * Math.PI / 180;

                            // Full circle outline
                            viz.drawCircle(0, 0, r, null, viz.colors.axis + '44', 1);

                            // Sector fill
                            var center = viz.toScreen(0, 0);
                            ctx.fillStyle = viz.colors.blue + '33';
                            ctx.beginPath();
                            ctx.moveTo(center[0], center[1]);
                            ctx.arc(center[0], center[1], r * viz.scale, 0, -angleRad, true);
                            ctx.closePath();
                            ctx.fill();

                            // Arc
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 4;
                            ctx.beginPath();
                            ctx.arc(center[0], center[1], r * viz.scale, 0, -angleRad, true);
                            ctx.stroke();

                            // Radii
                            viz.drawSegment(0, 0, r, 0, viz.colors.green, 2);
                            viz.drawSegment(0, 0, r * Math.cos(angleRad), r * Math.sin(angleRad), viz.colors.green, 2);

                            // Angle arc
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(center[0], center[1], 30, 0, -angleRad, true);
                            ctx.stroke();

                            // Angle label
                            var midAngle = angleRad / 2;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.textAlign = 'center';
                            ctx.fillText(angleDeg + '\u00B0', center[0] + 45 * Math.cos(-midAngle), center[1] + 45 * Math.sin(-midAngle));

                            // Radius label
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('r = ' + r.toFixed(1), center[0] + r * viz.scale / 2, center[1] + 20);

                            // Points
                            viz.drawPoint(0, 0, viz.colors.white, 'O', 5);
                            viz.drawPoint(r, 0, viz.colors.green, '', 4);
                            viz.drawPoint(r * Math.cos(angleRad), r * Math.sin(angleRad), viz.colors.green, '', 4);

                            // Calculations
                            var arcLen = r * angleRad;
                            var sectorArea = 0.5 * r * r * angleRad;
                            var circumference = 2 * Math.PI * r;
                            var fullArea = Math.PI * r * r;

                            viz.screenText('Arc length s = r\u03B8 = ' + arcLen.toFixed(2), viz.width / 2, viz.height - 80, viz.colors.red, 14);
                            viz.screenText('Sector area A = \u00BDr\u00B2\u03B8 = ' + sectorArea.toFixed(2), viz.width / 2, viz.height - 55, viz.colors.blue, 14);
                            viz.screenText('Fraction of circle: ' + (angleDeg / 360 * 100).toFixed(1) + '%', viz.width / 2, viz.height - 30, viz.colors.text, 13);
                            viz.screenText('Full circle: C = ' + circumference.toFixed(2) + ', A = ' + fullArea.toFixed(2), viz.width / 2, viz.height - 10, viz.colors.text, 12);
                        }

                        draw();
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'Find the arc length for a circle of radius 10 with central angle \\(45^\\circ\\).',
                    hint: 'Convert to radians: \\(45^\\circ = \\pi/4\\). Then \\(s = r\\theta\\).',
                    solution: '\\(s = 10 \\cdot \\pi/4 = 5\\pi/2 \\approx 7.85\\).'
                },
                {
                    question: 'A sector has radius 8 and area \\(16\\pi\\). Find the central angle in degrees.',
                    hint: 'Use \\(A = \\frac{1}{2}r^2\\theta\\). Solve for \\(\\theta\\) in radians, then convert.',
                    solution: '\\(16\\pi = \\frac{1}{2}(64)\\theta\\), so \\(\\theta = \\pi/2\\) radians \\(= 90^\\circ\\).'
                },
                {
                    question: 'A pizza has diameter 16 inches and is cut into 8 equal slices. Find the area of each slice and the arc length of its crust.',
                    hint: 'Each slice has central angle \\(360^\\circ / 8 = 45^\\circ\\). Radius = 8.',
                    solution: 'Area \\(= \\frac{1}{2}(64)(\\pi/4) = 8\\pi \\approx 25.13\\) sq in. Arc \\(= 8 \\cdot \\pi/4 = 2\\pi \\approx 6.28\\) in.'
                }
            ]
        },

        // ============================================================
        // SECTION 5: Power of a Point
        // ============================================================
        {
            id: 'ch08-sec05',
            title: 'Power of a Point',
            content: `<h2>Power of a Point</h2>

                <div class="env-block definition">
                    <div class="env-title">Definition</div>
                    <div class="env-body"><p>The <strong>power of a point</strong> \\(P\\) with respect to a circle of center \\(O\\) and radius \\(r\\) is:
                    \\[\\text{pow}(P) = OP^2 - r^2.\\]
                    It is positive if \\(P\\) is outside the circle, zero if on the circle, and negative if inside.</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Intersecting Chords Theorem</div>
                    <div class="env-body"><p>If two chords intersect at point \\(P\\) inside a circle, then
                    \\[PA \\cdot PB = PC \\cdot PD\\]
                    where \\(A, B\\) are on one chord and \\(C, D\\) on the other.</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Secant-Secant and Secant-Tangent</div>
                    <div class="env-body"><p>From external point \\(P\\):</p>
                    <ul>
                        <li><strong>Two secants:</strong> \\(PA \\cdot PB = PC \\cdot PD\\).</li>
                        <li><strong>Tangent and secant:</strong> \\(PT^2 = PA \\cdot PB\\).</li>
                    </ul></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-power-point"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>Two chords intersect inside a circle. One chord is divided into segments of length 4 and 6. The other has one segment of length 3. Find the other segment.</p>
                    <p>\\(4 \\cdot 6 = 3 \\cdot x\\), so \\(x = 24/3 = 8\\).</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-power-point',
                    title: 'Power of a Point',
                    description: 'Drag point P inside or outside the circle to see intersecting chords or secant segments. The products are always equal.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 50, originX: 250, originY: 200, height: 380 });
                        var r = 2.5;
                        var pPt = viz.addDraggable('P', 1, 0.5, viz.colors.orange, 10);

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            var ctx = viz.ctx;

                            // Circle
                            viz.drawCircle(0, 0, r, viz.colors.blue + '0a', viz.colors.blue, 2);

                            var px = pPt.x, py = pPt.y;
                            var distToCenter = Math.sqrt(px * px + py * py);
                            var power = distToCenter * distToCenter - r * r;
                            var isInside = distToCenter < r;

                            // Two lines through P
                            var angles = [0.3, 1.8];
                            var lineColors = [viz.colors.green, viz.colors.purple];

                            for (var li = 0; li < 2; li++) {
                                var theta = angles[li];
                                var dx = Math.cos(theta);
                                var dy = Math.sin(theta);

                                // Intersect line through P with circle
                                // Line: (px + t*dx, py + t*dy), |point|^2 = r^2
                                var a2 = 1;
                                var b2 = 2 * (px * dx + py * dy);
                                var c2 = px * px + py * py - r * r;
                                var disc = b2 * b2 - 4 * a2 * c2;

                                if (disc >= 0) {
                                    var sqrtDisc = Math.sqrt(disc);
                                    var t1 = (-b2 - sqrtDisc) / (2 * a2);
                                    var t2 = (-b2 + sqrtDisc) / (2 * a2);

                                    var ix1 = px + t1 * dx, iy1 = py + t1 * dy;
                                    var ix2 = px + t2 * dx, iy2 = py + t2 * dy;

                                    // Draw chord/secant
                                    viz.drawSegment(ix1, iy1, ix2, iy2, lineColors[li], 2);

                                    // Segment lengths from P
                                    var d1 = Math.sqrt((ix1 - px) * (ix1 - px) + (iy1 - py) * (iy1 - py));
                                    var d2 = Math.sqrt((ix2 - px) * (ix2 - px) + (iy2 - py) * (iy2 - py));

                                    viz.drawPoint(ix1, iy1, lineColors[li], '', 4);
                                    viz.drawPoint(ix2, iy2, lineColors[li], '', 4);

                                    // Labels
                                    var label1 = li === 0 ? 'A' : 'C';
                                    var label2 = li === 0 ? 'B' : 'D';
                                    ctx.font = '12px -apple-system,sans-serif';
                                    ctx.fillStyle = lineColors[li];
                                    ctx.textAlign = 'center';
                                    var ls1 = viz.toScreen(ix1, iy1);
                                    var ls2 = viz.toScreen(ix2, iy2);
                                    ctx.fillText(label1, ls1[0] - 12, ls1[1] - 10);
                                    ctx.fillText(label2, ls2[0] + 12, ls2[1] + 10);

                                    // Product
                                    var yOff = li === 0 ? viz.height - 70 : viz.height - 45;
                                    ctx.fillStyle = lineColors[li];
                                    ctx.font = '13px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText('P' + label1 + ' \u00B7 P' + label2 + ' = ' + d1.toFixed(2) + ' \u00B7 ' + d2.toFixed(2) + ' = ' + (d1 * d2).toFixed(2), viz.width / 2, yOff);
                                }
                            }

                            // Center and P
                            viz.drawPoint(0, 0, viz.colors.white, 'O', 5);
                            viz.drawPoint(px, py, viz.colors.orange, 'P', 6);

                            // Power info
                            viz.screenText('Power of P = OP\u00B2 - r\u00B2 = ' + power.toFixed(2), viz.width / 2, 20, viz.colors.yellow, 14);
                            viz.screenText(isInside ? '(P is inside the circle)' : '(P is outside the circle)', viz.width / 2, 40, viz.colors.text, 12);

                            viz.drawDraggables();
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'Two chords intersect inside a circle at point \\(P\\). One chord has segments \\(PA = 5\\) and \\(PB = 8\\). The other has \\(PC = 4\\). Find \\(PD\\).',
                    hint: 'Use \\(PA \\cdot PB = PC \\cdot PD\\).',
                    solution: '\\(5 \\cdot 8 = 4 \\cdot PD\\), so \\(PD = 40/4 = 10\\).'
                },
                {
                    question: 'From external point \\(P\\), a tangent to a circle has length 6. A secant from \\(P\\) passes through the circle with external segment 3. Find the total secant length.',
                    hint: 'Use \\(PT^2 = PA \\cdot PB\\), where \\(PA\\) is the external part and \\(PB\\) is the full secant.',
                    solution: '\\(36 = 3 \\cdot PB\\), so \\(PB = 12\\). The secant has total length 12.'
                },
                {
                    question: 'Find the power of a point that is 7 units from the center of a circle with radius 5.',
                    hint: 'Power \\(= d^2 - r^2\\).',
                    solution: 'Power \\(= 49 - 25 = 24\\).'
                },
                {
                    question: 'Two secants from external point \\(P\\) have external segments 2 and 3, with total lengths through the circle of 10 and \\(x\\). Find \\(x\\).',
                    hint: 'Use \\(PA \\cdot PB = PC \\cdot PD\\) where full lengths are measured from \\(P\\).',
                    solution: '\\(2 \\cdot 10 = 3 \\cdot x\\), so \\(x = 20/3 \\approx 6.67\\).'
                }
            ]
        }
    ]
});
