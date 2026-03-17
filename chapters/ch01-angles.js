window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch01',
    number: 1,
    title: 'Angles & Angle Relationships',
    subtitle: 'Measuring turns, classifying angle pairs, and the rich geometry of parallel lines',
    sections: [
        // ============================================================
        // SECTION 1: Measuring Angles
        // ============================================================
        {
            id: 'ch01-sec01',
            title: 'Measuring Angles',
            content: `<h2>Measuring Angles</h2>

                <div class="env-block intuition">
                    <div class="env-title">What Is an Angle?</div>
                    <div class="env-body"><p>An angle is formed when two rays share a common endpoint. The amount of "opening" between the rays, measured in degrees, is the angle's measure. A full rotation around a point is \\(360^\\circ\\).</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Angle)</div>
                    <div class="env-body"><p>An <strong>angle</strong> is the figure formed by two rays with a common endpoint, called the <strong>vertex</strong>. The rays are the <strong>sides</strong> of the angle. We write \\(\\angle ABC\\) where \\(B\\) is the vertex, or simply \\(\\angle B\\) when unambiguous.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Degree Measure)</div>
                    <div class="env-body"><p>The <strong>degree measure</strong> of an angle is a number from \\(0\\) to \\(180\\) (for standard angles). We classify:
                    <ul>
                        <li><strong>Acute</strong>: \\(0^\\circ < m\\angle < 90^\\circ\\)</li>
                        <li><strong>Right</strong>: \\(m\\angle = 90^\\circ\\)</li>
                        <li><strong>Obtuse</strong>: \\(90^\\circ < m\\angle < 180^\\circ\\)</li>
                        <li><strong>Straight</strong>: \\(m\\angle = 180^\\circ\\)</li>
                    </ul></p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-protractor"></div>

                <div class="env-block theorem">
                    <div class="env-title">Postulate (Angle Addition Postulate)</div>
                    <div class="env-body"><p>If ray \\(\\overrightarrow{BD}\\) is in the interior of \\(\\angle ABC\\), then
                    \\[m\\angle ABD + m\\angle DBC = m\\angle ABC.\\]</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>If \\(m\\angle ABD = 35^\\circ\\) and \\(m\\angle DBC = 50^\\circ\\), then \\(m\\angle ABC = 35^\\circ + 50^\\circ = 85^\\circ\\).</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-protractor',
                    title: 'Interactive Protractor',
                    description: 'Drag the ray endpoint to change the angle. The protractor shows the degree measure and classifies the angle.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40, height: 420 });
                        var cx = 0, cy = 0;
                        var rayLen = 4.5;
                        var ptRay = viz.addDraggable('R', 4, 2, viz.colors.orange, 10);

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            var ctx = viz.ctx;

                            // Fixed ray along positive x-axis
                            var sx0 = viz.originX + cx * viz.scale;
                            var sy0 = viz.originY - cy * viz.scale;
                            var sxEnd = viz.originX + rayLen * viz.scale;

                            // Angle from draggable point
                            var angleDeg = Math.atan2(ptRay.y - cy, ptRay.x - cx) * 180 / Math.PI;
                            if (angleDeg < 0) angleDeg += 360;
                            var displayAngle = angleDeg;
                            if (displayAngle > 180) displayAngle = 360 - displayAngle;

                            var angleRad = angleDeg * Math.PI / 180;

                            // Draw protractor arc markings
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var deg = 0; deg <= 180; deg += 10) {
                                var rad = deg * Math.PI / 180;
                                var r1 = 3.2 * viz.scale;
                                var r2 = (deg % 30 === 0) ? 3.6 * viz.scale : 3.4 * viz.scale;
                                ctx.beginPath();
                                ctx.moveTo(sx0 + r1 * Math.cos(rad), sy0 - r1 * Math.sin(rad));
                                ctx.lineTo(sx0 + r2 * Math.cos(rad), sy0 - r2 * Math.sin(rad));
                                ctx.stroke();

                                if (deg % 30 === 0) {
                                    ctx.fillStyle = viz.colors.text;
                                    ctx.font = '11px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'middle';
                                    var labelR = 3.9 * viz.scale;
                                    ctx.fillText(deg + '\u00B0', sx0 + labelR * Math.cos(rad), sy0 - labelR * Math.sin(rad));
                                }
                            }

                            // Draw angle arc
                            var arcR = 1.5 * viz.scale;
                            var startA = 0;
                            var endA = angleRad;
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            if (angleDeg <= 180) {
                                ctx.arc(sx0, sy0, arcR, -endA, 0);
                            } else {
                                ctx.arc(sx0, sy0, arcR, 0, -(2 * Math.PI - endA), true);
                            }
                            ctx.stroke();

                            // Shade the angle region
                            ctx.fillStyle = viz.colors.yellow + '22';
                            ctx.beginPath();
                            ctx.moveTo(sx0, sy0);
                            if (angleDeg <= 180) {
                                ctx.arc(sx0, sy0, arcR, -endA, 0);
                            } else {
                                ctx.arc(sx0, sy0, arcR, 0, -(2 * Math.PI - endA), true);
                            }
                            ctx.closePath();
                            ctx.fill();

                            // Fixed ray (along positive x-axis)
                            viz.drawSegment(cx, cy, rayLen, 0, viz.colors.blue, 2.5);
                            // Draw arrowhead on fixed ray
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.moveTo(sxEnd + 8, sy0);
                            ctx.lineTo(sxEnd - 4, sy0 - 5);
                            ctx.lineTo(sxEnd - 4, sy0 + 5);
                            ctx.closePath();
                            ctx.fill();

                            // Movable ray
                            var rx = cx + rayLen * Math.cos(angleRad);
                            var ry = cy + rayLen * Math.sin(angleRad);
                            viz.drawSegment(cx, cy, rx, ry, viz.colors.orange, 2.5);
                            var srx = viz.originX + rx * viz.scale;
                            var sry = viz.originY - ry * viz.scale;
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.moveTo(srx + 8 * Math.cos(angleRad), sry - 8 * Math.sin(angleRad));
                            ctx.lineTo(srx - 4 * Math.cos(angleRad) - 5 * Math.sin(angleRad), sry + 4 * Math.sin(angleRad) - 5 * Math.cos(angleRad));
                            ctx.lineTo(srx - 4 * Math.cos(angleRad) + 5 * Math.sin(angleRad), sry + 4 * Math.sin(angleRad) + 5 * Math.cos(angleRad));
                            ctx.closePath();
                            ctx.fill();

                            // Vertex
                            viz.drawPoint(cx, cy, viz.colors.white, 'V', 6);
                            viz.drawDraggables();

                            // Classify angle
                            var classification = 'Acute';
                            var classColor = viz.colors.green;
                            if (Math.abs(displayAngle - 90) < 1) { classification = 'Right'; classColor = viz.colors.teal; }
                            else if (displayAngle > 90 && displayAngle < 180) { classification = 'Obtuse'; classColor = viz.colors.orange; }
                            else if (Math.abs(displayAngle - 180) < 1) { classification = 'Straight'; classColor = viz.colors.red; }

                            // Right angle marker
                            if (Math.abs(displayAngle - 90) < 3) {
                                var sqSize = 15;
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.moveTo(sx0 + sqSize, sy0);
                                ctx.lineTo(sx0 + sqSize, sy0 - sqSize);
                                ctx.lineTo(sx0, sy0 - sqSize);
                                ctx.stroke();
                            }

                            // Display
                            ctx.font = 'bold 20px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillStyle = classColor;
                            ctx.fillText(displayAngle.toFixed(1) + '\u00B0  (' + classification + ')', viz.width / 2, 10);
                        }

                        ptRay.onDrag = function() { draw(); };
                        draw();
                        viz.animate(function() { draw(); });
                        return viz;
                    }
                },
                {
                    id: 'viz-angle-addition',
                    title: 'Angle Addition Postulate',
                    description: 'Drag the middle ray BD to split angle ABC into two parts. Verify that the two parts always sum to the whole angle.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40, height: 400 });
                        var cx = 0, cy = 0;
                        var rayLen = 4.5;
                        // Fixed rays: one along positive x, one at 100 degrees
                        var totalAngle = 100;
                        var ptD = viz.addDraggable('D', 3, 3, viz.colors.green, 10);

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            var ctx = viz.ctx;

                            var totalRad = totalAngle * Math.PI / 180;
                            var sx0 = viz.originX, sy0 = viz.originY;

                            // Angle of D ray
                            var dAngle = Math.atan2(ptD.y, ptD.x);
                            if (dAngle < 0) dAngle += 2 * Math.PI;
                            var dDeg = dAngle * 180 / Math.PI;
                            // Clamp D to be inside the total angle
                            if (dDeg > totalAngle) dDeg = totalAngle - 1;
                            if (dDeg < 1) dDeg = 1;
                            var dRad = dDeg * Math.PI / 180;

                            // Fixed ray BC along x-axis
                            viz.drawSegment(0, 0, rayLen, 0, viz.colors.blue, 2.5);
                            // Fixed ray BA at totalAngle
                            var bax = rayLen * Math.cos(totalRad), bay = rayLen * Math.sin(totalRad);
                            viz.drawSegment(0, 0, bax, bay, viz.colors.teal, 2.5);
                            // Middle ray BD
                            var bdx = rayLen * Math.cos(dRad), bdy = rayLen * Math.sin(dRad);
                            viz.drawSegment(0, 0, bdx, bdy, viz.colors.green, 2.5);

                            // Draw angle arcs
                            // Angle ABD (from totalAngle down to D)
                            var arcR1 = 50;
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 2.5;
                            ctx.fillStyle = viz.colors.purple + '22';
                            ctx.beginPath(); ctx.moveTo(sx0, sy0);
                            ctx.arc(sx0, sy0, arcR1, -totalRad, -dRad);
                            ctx.closePath(); ctx.fill();
                            ctx.beginPath(); ctx.arc(sx0, sy0, arcR1, -totalRad, -dRad); ctx.stroke();

                            // Angle DBC (from D down to x-axis)
                            var arcR2 = 35;
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.fillStyle = viz.colors.orange + '22';
                            ctx.beginPath(); ctx.moveTo(sx0, sy0);
                            ctx.arc(sx0, sy0, arcR2, -dRad, 0);
                            ctx.closePath(); ctx.fill();
                            ctx.beginPath(); ctx.arc(sx0, sy0, arcR2, -dRad, 0); ctx.stroke();

                            // Labels
                            var abd = totalAngle - dDeg;
                            var dbc = dDeg;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            var midA1 = (totalRad + dRad) / 2;
                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillText(abd.toFixed(1) + '\u00B0', sx0 + 68 * Math.cos(midA1), sy0 - 68 * Math.sin(midA1));
                            var midA2 = dRad / 2;
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText(dbc.toFixed(1) + '\u00B0', sx0 + 52 * Math.cos(midA2), sy0 - 52 * Math.sin(midA2));

                            // Point labels
                            viz.drawText('C', rayLen + 0.5, -0.3, viz.colors.blue, 13);
                            viz.drawText('A', bax / rayLen * (rayLen + 0.5), bay / rayLen * (rayLen + 0.5), viz.colors.teal, 13);
                            viz.drawText('D', bdx / rayLen * (rayLen + 0.5), bdy / rayLen * (rayLen + 0.5), viz.colors.green, 13);
                            viz.drawPoint(0, 0, viz.colors.white, 'B', 5);
                            viz.drawDraggables();

                            // Display
                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('\u2220ABD + \u2220DBC = ' + abd.toFixed(1) + '\u00B0 + ' + dbc.toFixed(1) + '\u00B0 = ' + (abd + dbc).toFixed(1) + '\u00B0 = \u2220ABC', viz.width / 2, 10);
                        }

                        VizEngine.createSlider(controls, '\u2220ABC', 40, 170, totalAngle, 5, function(v) { totalAngle = v; draw(); });
                        ptD.onDrag = function() { draw(); };
                        draw();
                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'Classify an angle with measure \\(47^\\circ\\).',
                    hint: 'Compare to \\(90^\\circ\\).',
                    solution: 'Since \\(0^\\circ < 47^\\circ < 90^\\circ\\), the angle is <strong>acute</strong>.'
                },
                {
                    question: 'If ray \\(\\overrightarrow{BD}\\) lies in the interior of \\(\\angle ABC\\), \\(m\\angle ABD = 2x + 10\\), \\(m\\angle DBC = 3x - 5\\), and \\(m\\angle ABC = 80^\\circ\\), find \\(x\\).',
                    hint: 'Use the Angle Addition Postulate: the two smaller angles must sum to the larger.',
                    solution: '\\((2x+10) + (3x-5) = 80\\), so \\(5x + 5 = 80\\), giving \\(x = 15\\).'
                },
                {
                    question: 'What is the measure of a straight angle?',
                    hint: 'Think of two opposite rays.',
                    solution: 'A straight angle has measure \\(180^\\circ\\). Its two sides are opposite rays forming a line.'
                },
                {
                    question: 'True or false: An angle with measure \\(90^\\circ\\) is acute.',
                    hint: 'Recall the definition of acute vs. right.',
                    solution: 'False. An angle of \\(90^\\circ\\) is a <strong>right</strong> angle, not acute. Acute angles are strictly less than \\(90^\\circ\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Angle Pairs
        // ============================================================
        {
            id: 'ch01-sec02',
            title: 'Angle Pairs: Complementary & Supplementary',
            content: `<h2>Angle Pairs: Complementary & Supplementary</h2>

                <div class="env-block definition">
                    <div class="env-title">Definition (Complementary Angles)</div>
                    <div class="env-body"><p>Two angles are <strong>complementary</strong> if the sum of their measures is \\(90^\\circ\\). Each angle is the <strong>complement</strong> of the other.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Supplementary Angles)</div>
                    <div class="env-body"><p>Two angles are <strong>supplementary</strong> if the sum of their measures is \\(180^\\circ\\). Each angle is the <strong>supplement</strong> of the other.</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>Angles of \\(35^\\circ\\) and \\(55^\\circ\\) are complementary (sum \\(= 90^\\circ\\)).
                    Angles of \\(110^\\circ\\) and \\(70^\\circ\\) are supplementary (sum \\(= 180^\\circ\\)).</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-comp-supp"></div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Vertical Angles)</div>
                    <div class="env-body"><p>When two lines intersect, they form two pairs of <strong>vertical angles</strong> (also called <em>vertically opposite angles</em>). Vertical angles are the non-adjacent angles formed by the intersecting lines.</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Vertical Angles Theorem)</div>
                    <div class="env-body"><p>Vertical angles are congruent. If two lines intersect forming angles \\(\\angle 1\\), \\(\\angle 2\\), \\(\\angle 3\\), \\(\\angle 4\\) (in order), then \\(m\\angle 1 = m\\angle 3\\) and \\(m\\angle 2 = m\\angle 4\\).</p></div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch</div>
                    <div class="env-body"><p>\\(\\angle 1\\) and \\(\\angle 2\\) are supplementary (they form a straight angle), so \\(m\\angle 1 + m\\angle 2 = 180^\\circ\\). Similarly, \\(\\angle 2\\) and \\(\\angle 3\\) are supplementary, so \\(m\\angle 2 + m\\angle 3 = 180^\\circ\\). Subtracting, \\(m\\angle 1 = m\\angle 3\\). \\(\\square\\)</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Linear Pair)</div>
                    <div class="env-body"><p>A <strong>linear pair</strong> is a pair of adjacent angles whose non-common sides form a line (opposite rays). A linear pair is always supplementary.</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-comp-supp',
                    title: 'Complementary, Supplementary & Vertical Angles',
                    description: 'Drag the ray to see complementary and supplementary relationships. When two lines cross, observe vertical angles.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40, height: 420 });
                        var mode = 'vertical';
                        var ptR = viz.addDraggable('R', 3, 2, viz.colors.orange, 10);

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            var ctx = viz.ctx;
                            var cx = viz.width / 2, cy = viz.height / 2;

                            if (mode === 'comp') {
                                var angle = Math.atan2(ptR.y, ptR.x);
                                if (angle < 0) angle += 2 * Math.PI;
                                var deg = angle * 180 / Math.PI;
                                if (deg > 90) deg = 90;
                                if (deg < 1) deg = 1;
                                var rad = deg * Math.PI / 180;

                                // Draw right angle box
                                var sqS = 18;
                                ctx.strokeStyle = viz.colors.text;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(cx + sqS, cy);
                                ctx.lineTo(cx + sqS, cy - sqS);
                                ctx.lineTo(cx, cy - sqS);
                                ctx.stroke();

                                // Fixed ray along x
                                var rLen = 160;
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + rLen, cy); ctx.stroke();

                                // Ray along 90
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy - rLen); ctx.stroke();

                                // Movable ray
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + rLen * Math.cos(rad), cy - rLen * Math.sin(rad)); ctx.stroke();

                                // Arcs
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.arc(cx, cy, 50, -rad, 0); ctx.stroke();
                                ctx.strokeStyle = viz.colors.purple;
                                ctx.beginPath(); ctx.arc(cx, cy, 60, -Math.PI / 2, -rad); ctx.stroke();

                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillStyle = viz.colors.green;
                                ctx.fillText(deg.toFixed(1) + '\u00B0', cx + 70 * Math.cos(rad / 2), cy - 70 * Math.sin(rad / 2));
                                ctx.fillStyle = viz.colors.purple;
                                var midA = (Math.PI / 2 + rad) / 2;
                                ctx.fillText((90 - deg).toFixed(1) + '\u00B0', cx + 80 * Math.cos(midA), cy - 80 * Math.sin(midA));

                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.fillStyle = viz.colors.white;
                                ctx.fillText('Complementary: ' + deg.toFixed(1) + '\u00B0 + ' + (90 - deg).toFixed(1) + '\u00B0 = 90\u00B0', viz.width / 2, 15);
                            } else if (mode === 'supp') {
                                var angle = Math.atan2(ptR.y, ptR.x);
                                if (angle < 0) angle += 2 * Math.PI;
                                var deg = angle * 180 / Math.PI;
                                if (deg > 179) deg = 179;
                                if (deg < 1) deg = 1;
                                var rad = deg * Math.PI / 180;

                                var rLen = 160;
                                // Straight line
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath(); ctx.moveTo(cx - rLen, cy); ctx.lineTo(cx + rLen, cy); ctx.stroke();

                                // Movable ray
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + rLen * Math.cos(rad), cy - rLen * Math.sin(rad)); ctx.stroke();

                                // Arcs
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.arc(cx, cy, 50, -rad, 0); ctx.stroke();
                                ctx.strokeStyle = viz.colors.purple;
                                ctx.beginPath(); ctx.arc(cx, cy, 60, -Math.PI, -rad); ctx.stroke();

                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillStyle = viz.colors.green;
                                ctx.fillText(deg.toFixed(1) + '\u00B0', cx + 70 * Math.cos(rad / 2), cy - 70 * Math.sin(rad / 2));
                                ctx.fillStyle = viz.colors.purple;
                                var midA2 = (Math.PI + rad) / 2;
                                ctx.fillText((180 - deg).toFixed(1) + '\u00B0', cx + 80 * Math.cos(midA2), cy - 80 * Math.sin(midA2));

                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.fillStyle = viz.colors.white;
                                ctx.fillText('Supplementary: ' + deg.toFixed(1) + '\u00B0 + ' + (180 - deg).toFixed(1) + '\u00B0 = 180\u00B0', viz.width / 2, 15);
                            } else {
                                // Vertical angles mode
                                var angle = Math.atan2(ptR.y, ptR.x);
                                var deg = angle * 180 / Math.PI;
                                if (deg < 10) deg = 10;
                                if (deg > 170) deg = 170;
                                var rad = deg * Math.PI / 180;

                                var rLen = 180;
                                // Line 1 (horizontal)
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(cx - rLen, cy); ctx.lineTo(cx + rLen, cy); ctx.stroke();

                                // Line 2 (at angle)
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.beginPath();
                                ctx.moveTo(cx - rLen * Math.cos(rad), cy + rLen * Math.sin(rad));
                                ctx.lineTo(cx + rLen * Math.cos(rad), cy - rLen * Math.sin(rad));
                                ctx.stroke();

                                // Mark angles
                                var a1 = deg;
                                var a2 = 180 - deg;

                                // Angle 1 (between rays going right)
                                ctx.fillStyle = viz.colors.green + '33';
                                ctx.beginPath(); ctx.moveTo(cx, cy);
                                ctx.arc(cx, cy, 45, -rad, 0);
                                ctx.closePath(); ctx.fill();
                                ctx.strokeStyle = viz.colors.green; ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.arc(cx, cy, 45, -rad, 0); ctx.stroke();

                                // Angle 3 (vertical to 1)
                                ctx.fillStyle = viz.colors.green + '33';
                                ctx.beginPath(); ctx.moveTo(cx, cy);
                                ctx.arc(cx, cy, 45, Math.PI - rad, Math.PI);
                                ctx.closePath(); ctx.fill();
                                ctx.strokeStyle = viz.colors.green;
                                ctx.beginPath(); ctx.arc(cx, cy, 45, Math.PI - rad, Math.PI); ctx.stroke();

                                // Angle 2
                                ctx.fillStyle = viz.colors.purple + '33';
                                ctx.beginPath(); ctx.moveTo(cx, cy);
                                ctx.arc(cx, cy, 55, -Math.PI, -rad);
                                ctx.closePath(); ctx.fill();
                                ctx.strokeStyle = viz.colors.purple;
                                ctx.beginPath(); ctx.arc(cx, cy, 55, -Math.PI, -rad); ctx.stroke();

                                // Angle 4 (vertical to 2)
                                ctx.fillStyle = viz.colors.purple + '33';
                                ctx.beginPath(); ctx.moveTo(cx, cy);
                                ctx.arc(cx, cy, 55, 0, Math.PI - rad);
                                ctx.closePath(); ctx.fill();
                                ctx.strokeStyle = viz.colors.purple;
                                ctx.beginPath(); ctx.arc(cx, cy, 55, 0, Math.PI - rad); ctx.stroke();

                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillStyle = viz.colors.green;
                                ctx.fillText(a1.toFixed(1) + '\u00B0', cx + 70 * Math.cos(rad / 2), cy - 70 * Math.sin(rad / 2));
                                ctx.fillText(a1.toFixed(1) + '\u00B0', cx - 70 * Math.cos(rad / 2), cy + 70 * Math.sin(rad / 2));
                                ctx.fillStyle = viz.colors.purple;
                                var midA3 = (Math.PI + rad) / 2;
                                ctx.fillText(a2.toFixed(1) + '\u00B0', cx + 75 * Math.cos(midA3), cy - 75 * Math.sin(midA3));
                                ctx.fillText(a2.toFixed(1) + '\u00B0', cx - 75 * Math.cos(midA3), cy + 75 * Math.sin(midA3));

                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.fillStyle = viz.colors.white;
                                ctx.fillText('Vertical angles are congruent: ' + a1.toFixed(1) + '\u00B0 = ' + a1.toFixed(1) + '\u00B0', viz.width / 2, 15);
                            }

                            viz.drawDraggables();
                        }

                        VizEngine.createButton(controls, 'Complementary', function() { mode = 'comp'; ptR.x = 3; ptR.y = 2; draw(); });
                        VizEngine.createButton(controls, 'Supplementary', function() { mode = 'supp'; ptR.x = -2; ptR.y = 3; draw(); });
                        VizEngine.createButton(controls, 'Vertical Angles', function() { mode = 'vertical'; ptR.x = 3; ptR.y = 2; draw(); });
                        ptR.onDrag = function() { draw(); };
                        draw();
                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'Find the complement of a \\(37^\\circ\\) angle.',
                    hint: 'Complementary angles sum to \\(90^\\circ\\).',
                    solution: '\\(90^\\circ - 37^\\circ = 53^\\circ\\).'
                },
                {
                    question: 'Find the supplement of a \\(123^\\circ\\) angle.',
                    hint: 'Supplementary angles sum to \\(180^\\circ\\).',
                    solution: '\\(180^\\circ - 123^\\circ = 57^\\circ\\).'
                },
                {
                    question: 'Two lines intersect, forming a \\(65^\\circ\\) angle. Find the measures of the other three angles.',
                    hint: 'Use the Vertical Angles Theorem and the fact that linear pairs are supplementary.',
                    solution: 'The vertical angle is also \\(65^\\circ\\). Each of the other two angles is \\(180^\\circ - 65^\\circ = 115^\\circ\\). The four angles are \\(65^\\circ, 115^\\circ, 65^\\circ, 115^\\circ\\).'
                },
                {
                    question: 'An angle is twice its complement. Find the angle.',
                    hint: 'Let the angle be \\(x\\). Then its complement is \\(90 - x\\), and \\(x = 2(90 - x)\\).',
                    solution: '\\(x = 2(90 - x) = 180 - 2x\\), so \\(3x = 180\\), giving \\(x = 60^\\circ\\). Its complement is \\(30^\\circ\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Perpendicular & Parallel Lines
        // ============================================================
        {
            id: 'ch01-sec03',
            title: 'Perpendicular & Parallel Lines',
            content: `<h2>Perpendicular & Parallel Lines</h2>

                <div class="env-block definition">
                    <div class="env-title">Definition (Perpendicular Lines)</div>
                    <div class="env-body"><p>Two lines are <strong>perpendicular</strong> (\\(\\ell \\perp m\\)) if they intersect to form a right angle (\\(90^\\circ\\)).</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Parallel Lines)</div>
                    <div class="env-body"><p>Two lines in the same plane are <strong>parallel</strong> (\\(\\ell \\parallel m\\)) if they do not intersect. Parallel lines are always the same distance apart.</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Postulate (Parallel Postulate, Euclid's Fifth)</div>
                    <div class="env-body"><p>Through a point not on a given line, there is exactly one line parallel to the given line.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-perp-parallel"></div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Perpendicular Bisector)</div>
                    <div class="env-body"><p>The <strong>perpendicular bisector</strong> of a segment is the line that is perpendicular to the segment at its midpoint. Every point on the perpendicular bisector is equidistant from the two endpoints.</p></div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body"><p>The symbol \\(\\perp\\) means "is perpendicular to" and \\(\\parallel\\) means "is parallel to." These are relationships between lines, not properties of a single line.</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-perp-parallel',
                    title: 'Perpendicular & Parallel Lines',
                    description: 'Drag the endpoints to create perpendicular or parallel configurations. The display shows the angle between lines and whether they are perpendicular or parallel.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40, height: 400 });
                        var p1 = viz.addDraggable('A', -4, 0, viz.colors.blue, 9);
                        var p2 = viz.addDraggable('B', 4, 0, viz.colors.blue, 9);
                        var p3 = viz.addDraggable('C', -3, 3, viz.colors.orange, 9);
                        var p4 = viz.addDraggable('D', 3, 3, viz.colors.orange, 9);

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            viz.drawLine(p1.x, p1.y, p2.x, p2.y, viz.colors.blue, 2);
                            viz.drawLine(p3.x, p3.y, p4.x, p4.y, viz.colors.orange, 2);

                            // Compute angle between lines
                            var dx1 = p2.x - p1.x, dy1 = p2.y - p1.y;
                            var dx2 = p4.x - p3.x, dy2 = p4.y - p3.y;
                            var dot = dx1 * dx2 + dy1 * dy2;
                            var len1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
                            var len2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                            var cosA = (len1 > 0.01 && len2 > 0.01) ? dot / (len1 * len2) : 1;
                            cosA = Math.max(-1, Math.min(1, cosA));
                            var angleBetween = Math.acos(Math.abs(cosA)) * 180 / Math.PI;

                            var isPerp = Math.abs(angleBetween - 90) < 2;
                            var cross = dx1 * dy2 - dy1 * dx2;
                            var isParallel = Math.abs(cross) < 0.15 * len1 * len2 / Math.max(len1, len2, 1);

                            viz.drawPoint(p1.x, p1.y, viz.colors.blue, 'A', 5);
                            viz.drawPoint(p2.x, p2.y, viz.colors.blue, 'B', 5);
                            viz.drawPoint(p3.x, p3.y, viz.colors.orange, 'C', 5);
                            viz.drawPoint(p4.x, p4.y, viz.colors.orange, 'D', 5);
                            viz.drawDraggables();

                            var ctx = viz.ctx;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';

                            if (isPerp) {
                                ctx.fillStyle = viz.colors.green;
                                ctx.fillText('Perpendicular! (90\u00B0)', viz.width / 2, 10);
                            } else if (isParallel) {
                                ctx.fillStyle = viz.colors.purple;
                                ctx.fillText('Parallel! (0\u00B0)', viz.width / 2, 10);
                            } else {
                                ctx.fillStyle = viz.colors.white;
                                ctx.fillText('Angle between lines: ' + angleBetween.toFixed(1) + '\u00B0', viz.width / 2, 10);
                            }
                        }

                        p1.onDrag = function() { draw(); };
                        p2.onDrag = function() { draw(); };
                        p3.onDrag = function() { draw(); };
                        p4.onDrag = function() { draw(); };
                        draw();
                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'If \\(\\ell \\perp m\\), what is the measure of the angles formed at their intersection?',
                    hint: 'Perpendicular lines form right angles.',
                    solution: 'All four angles are \\(90^\\circ\\).'
                },
                {
                    question: 'Line \\(a\\) is parallel to line \\(b\\), and line \\(b\\) is parallel to line \\(c\\). What can you conclude about lines \\(a\\) and \\(c\\)?',
                    hint: 'Parallelism is transitive.',
                    solution: 'Lines \\(a\\) and \\(c\\) are parallel. If \\(a \\parallel b\\) and \\(b \\parallel c\\), then \\(a \\parallel c\\).'
                },
                {
                    question: 'Through point \\(P\\) not on line \\(\\ell\\), how many lines can be drawn parallel to \\(\\ell\\)?',
                    hint: 'This is essentially the Parallel Postulate.',
                    solution: 'Exactly one, by the Parallel Postulate (Euclid\'s Fifth Postulate).'
                },
                {
                    question: 'If \\(\\ell \\perp m\\) and \\(m \\parallel n\\), what is the relationship between \\(\\ell\\) and \\(n\\)?',
                    hint: 'If \\(\\ell\\) crosses \\(m\\) at \\(90^\\circ\\) and \\(n\\) is parallel to \\(m\\), think about the angle \\(\\ell\\) makes with \\(n\\).',
                    solution: '\\(\\ell \\perp n\\). A line perpendicular to one of two parallel lines is perpendicular to both.'
                }
            ]
        },

        // ============================================================
        // SECTION 4: Transversals & Angle Relationships
        // ============================================================
        {
            id: 'ch01-sec04',
            title: 'Transversals & Angle Relationships',
            content: `<h2>Transversals & Angle Relationships</h2>

                <div class="env-block definition">
                    <div class="env-title">Definition (Transversal)</div>
                    <div class="env-body"><p>A <strong>transversal</strong> is a line that intersects two or more lines at different points. When a transversal crosses two lines, it creates eight angles.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Angle Pairs Formed by a Transversal</div>
                    <div class="env-body"><p>When a transversal crosses two lines:
                    <ul>
                        <li><strong>Corresponding angles</strong>: same position at each intersection (e.g., both upper-right)</li>
                        <li><strong>Alternate interior angles</strong>: opposite sides of the transversal, between the two lines</li>
                        <li><strong>Alternate exterior angles</strong>: opposite sides of the transversal, outside the two lines</li>
                        <li><strong>Co-interior (same-side interior) angles</strong>: same side of the transversal, between the two lines</li>
                    </ul></p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Parallel Lines & Transversals)</div>
                    <div class="env-body"><p>If two parallel lines are cut by a transversal, then:
                    <ol>
                        <li>Corresponding angles are congruent.</li>
                        <li>Alternate interior angles are congruent.</li>
                        <li>Alternate exterior angles are congruent.</li>
                        <li>Co-interior (same-side interior) angles are supplementary (sum to \\(180^\\circ\\)).</li>
                    </ol></p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-transversal"></div>

                <div class="env-block theorem">
                    <div class="env-title">Converse Theorems</div>
                    <div class="env-body"><p>If any of the above angle relationships hold (corresponding angles congruent, alternate interior angles congruent, etc.), then the two lines are parallel. These converses let us <em>prove</em> lines are parallel.</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>Lines \\(\\ell \\parallel m\\) are cut by transversal \\(t\\). One of the angles is \\(70^\\circ\\). Find all eight angles.</p>
                    <p>The eight angles are: \\(70^\\circ, 110^\\circ, 70^\\circ, 110^\\circ\\) at the first intersection and \\(70^\\circ, 110^\\circ, 70^\\circ, 110^\\circ\\) at the second (by corresponding angles).</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-transversal',
                    title: 'Parallel Lines Cut by a Transversal',
                    description: 'Drag the transversal angle to see how all eight angles change. Color-coded angle pairs highlight corresponding, alternate interior, and co-interior relationships.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40, height: 450 });
                        var transAngle = 60;
                        var pairMode = 'corresponding';
                        var ptT = viz.addDraggable('T', 3, 3, viz.colors.yellow, 10);

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var cx = viz.width / 2;

                            // Two parallel horizontal lines
                            var y1Screen = 140;
                            var y2Screen = 310;

                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath(); ctx.moveTo(20, y1Screen); ctx.lineTo(viz.width - 20, y1Screen); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(20, y2Screen); ctx.lineTo(viz.width - 20, y2Screen); ctx.stroke();

                            // Labels for parallel lines
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('\u2113', 25, y1Screen - 12);
                            ctx.fillText('m', 25, y2Screen - 12);

                            // Transversal angle from draggable
                            var tRad = Math.atan2(-(ptT.y * viz.scale - (viz.originY - y1Screen)), ptT.x * viz.scale - (cx - viz.originX));
                            var tDeg = -tRad * 180 / Math.PI;
                            if (tDeg < 20) tDeg = 20;
                            if (tDeg > 160) tDeg = 160;
                            tRad = -tDeg * Math.PI / 180;

                            // Draw transversal
                            var ext = 300;
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 2;

                            // Through intersection 1
                            var ix1 = cx;
                            ctx.beginPath();
                            ctx.moveTo(ix1 - ext * Math.cos(tRad), y1Screen + ext * Math.sin(tRad));
                            ctx.lineTo(ix1 + ext * Math.cos(tRad), y1Screen - ext * Math.sin(tRad));
                            ctx.stroke();

                            // Intersection 2
                            var dy = y2Screen - y1Screen;
                            var ix2 = ix1 + dy * Math.cos(tRad) / Math.sin(tRad);

                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'italic 14px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.fillText('t', ix1 + ext * Math.cos(tRad) * 0.8 + 10, y1Screen - ext * Math.sin(tRad) * 0.8);

                            // Angles at intersection 1: numbered 1-4 (clockwise from upper-right)
                            // Angles at intersection 2: numbered 5-8
                            var a1 = tDeg; // angle between transversal going upper-right and line going right
                            var a2 = 180 - tDeg;

                            // Draw angle arcs and labels
                            var arcR = 25;
                            var angles1 = [a1, a2, a1, a2]; // 1,2,3,4
                            var angles2 = [a1, a2, a1, a2]; // 5,6,7,8

                            function drawAngleArc(x, y, startDeg, sweepDeg, color, label, rOff) {
                                var r = arcR + (rOff || 0);
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 2.5;
                                var s = -startDeg * Math.PI / 180;
                                var e = -(startDeg + sweepDeg) * Math.PI / 180;
                                ctx.beginPath();
                                ctx.arc(x, y, r, s, e, sweepDeg > 0 ? true : false);
                                ctx.stroke();

                                if (label) {
                                    var midA = -(startDeg + sweepDeg / 2) * Math.PI / 180;
                                    ctx.fillStyle = color;
                                    ctx.font = 'bold 12px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'middle';
                                    ctx.fillText(label, x + (r + 14) * Math.cos(midA), y + (r + 14) * Math.sin(midA));
                                }
                            }

                            // Color scheme based on pair mode
                            var c1 = viz.colors.text + '66', c2 = viz.colors.text + '66';
                            var c3 = viz.colors.text + '66', c4 = viz.colors.text + '66';
                            var c5 = viz.colors.text + '66', c6 = viz.colors.text + '66';
                            var c7 = viz.colors.text + '66', c8 = viz.colors.text + '66';

                            if (pairMode === 'corresponding') {
                                c1 = viz.colors.green; c5 = viz.colors.green;   // 1&5
                                c2 = viz.colors.purple; c6 = viz.colors.purple;  // 2&6
                            } else if (pairMode === 'alt-interior') {
                                c3 = viz.colors.green; c6 = viz.colors.green;   // 3&6
                                c4 = viz.colors.purple; c5 = viz.colors.purple;  // 4&5
                            } else if (pairMode === 'co-interior') {
                                c3 = viz.colors.orange; c5 = viz.colors.orange;  // 3&5
                                c4 = viz.colors.red; c6 = viz.colors.red;       // 4&6
                            }

                            // Intersection 1 angles
                            // Angle 1: upper right (from right of line to upper-right of transversal)
                            drawAngleArc(ix1, y1Screen, 0, tDeg, c1, '\u22201=' + a1.toFixed(0) + '\u00B0', 0);
                            // Angle 2: upper left
                            drawAngleArc(ix1, y1Screen, tDeg, 180 - tDeg, c2, '\u22202=' + a2.toFixed(0) + '\u00B0', 5);
                            // Angle 3: lower left
                            drawAngleArc(ix1, y1Screen, 180, tDeg, c3, '\u22203=' + a1.toFixed(0) + '\u00B0', 0);
                            // Angle 4: lower right
                            drawAngleArc(ix1, y1Screen, 180 + tDeg, 180 - tDeg, c4, '\u22204=' + a2.toFixed(0) + '\u00B0', 5);

                            // Intersection 2 angles
                            drawAngleArc(ix2, y2Screen, 0, tDeg, c5, '\u22205=' + a1.toFixed(0) + '\u00B0', 0);
                            drawAngleArc(ix2, y2Screen, tDeg, 180 - tDeg, c6, '\u22206=' + a2.toFixed(0) + '\u00B0', 5);
                            drawAngleArc(ix2, y2Screen, 180, tDeg, c7, '\u22207=' + a1.toFixed(0) + '\u00B0', 0);
                            drawAngleArc(ix2, y2Screen, 180 + tDeg, 180 - tDeg, c8, '\u22208=' + a2.toFixed(0) + '\u00B0', 5);

                            // Parallel markers
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 1.5;
                            var arrowX = viz.width - 55;
                            for (var p = 0; p < 2; p++) {
                                var yy = p === 0 ? y1Screen : y2Screen;
                                ctx.beginPath();
                                ctx.moveTo(arrowX, yy - 5); ctx.lineTo(arrowX + 8, yy); ctx.lineTo(arrowX, yy + 5);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(arrowX + 6, yy - 5); ctx.lineTo(arrowX + 14, yy); ctx.lineTo(arrowX + 6, yy + 5);
                                ctx.stroke();
                            }

                            // Title
                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillStyle = viz.colors.white;
                            var titleText = pairMode === 'corresponding' ? 'Corresponding angles are congruent' :
                                            pairMode === 'alt-interior' ? 'Alternate interior angles are congruent' :
                                            'Co-interior angles are supplementary';
                            ctx.fillText(titleText, viz.width / 2, 10);

                            viz.drawDraggables();
                        }

                        VizEngine.createButton(controls, 'Corresponding', function() { pairMode = 'corresponding'; draw(); });
                        VizEngine.createButton(controls, 'Alt. Interior', function() { pairMode = 'alt-interior'; draw(); });
                        VizEngine.createButton(controls, 'Co-Interior', function() { pairMode = 'co-interior'; draw(); });
                        ptT.onDrag = function() { draw(); };
                        draw();
                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'Lines \\(\\ell \\parallel m\\) are cut by transversal \\(t\\). If one angle at the first intersection is \\(55^\\circ\\), find all eight angles.',
                    hint: 'Use corresponding, vertical, and supplementary relationships.',
                    solution: 'At each intersection: \\(55^\\circ\\) and \\(125^\\circ\\) appear twice as vertical pairs. By corresponding angles, the same pattern repeats at the second intersection. The eight angles are \\(55^\\circ, 125^\\circ, 55^\\circ, 125^\\circ, 55^\\circ, 125^\\circ, 55^\\circ, 125^\\circ\\).'
                },
                {
                    question: 'Two parallel lines are cut by a transversal. One pair of co-interior angles has measures \\(3x + 10\\) and \\(2x + 20\\). Find \\(x\\).',
                    hint: 'Co-interior (same-side interior) angles are supplementary.',
                    solution: '\\((3x + 10) + (2x + 20) = 180\\), so \\(5x + 30 = 180\\), giving \\(x = 30\\).'
                },
                {
                    question: 'If alternate interior angles formed by a transversal are \\(4x - 5\\) and \\(3x + 15\\), (a) find \\(x\\), (b) are the lines parallel?',
                    hint: 'Alternate interior angles are congruent when lines are parallel.',
                    solution: '(a) Setting them equal: \\(4x - 5 = 3x + 15\\), so \\(x = 20\\). (b) Both angles are \\(75^\\circ\\), so yes, by the converse of the Alternate Interior Angles Theorem, the lines are parallel.'
                },
                {
                    question: 'Name the four types of angle pairs formed when a transversal crosses two lines.',
                    hint: 'Think about position relative to the lines and the transversal.',
                    solution: 'Corresponding angles, alternate interior angles, alternate exterior angles, and co-interior (same-side interior) angles.'
                }
            ]
        }
    ]
});
