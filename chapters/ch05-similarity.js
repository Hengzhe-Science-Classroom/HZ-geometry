window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch05',
    number: 5,
    title: 'Similarity',
    subtitle: 'Same shape, different size: ratios, proportions, similar triangles, and real-world applications',
    sections: [
        // ============================================================
        // SECTION 1: Similar Figures & Ratios
        // ============================================================
        {
            id: 'ch05-sec01',
            title: 'Similar Figures & Ratios',
            content: `<h2>Similar Figures & Ratios</h2>

                <div class="env-block intuition">
                    <div class="env-title">Congruence vs. Similarity</div>
                    <div class="env-body"><p>Congruent figures have the same shape <em>and</em> size. <strong>Similar</strong> figures have the same shape but may differ in size. Similarity is a weaker condition than congruence: every congruent pair is also similar, but not vice versa.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Similar Figures)</div>
                    <div class="env-body"><p>Two figures are <strong>similar</strong> (written \\(\\sim\\)) if their corresponding angles are congruent and their corresponding sides are proportional. The ratio of corresponding side lengths is called the <strong>scale factor</strong> \\(k\\).</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Scale Factor)</div>
                    <div class="env-body"><p>If \\(\\triangle ABC \\sim \\triangle DEF\\) with scale factor \\(k\\), then:
                    \\[\\frac{DE}{AB} = \\frac{EF}{BC} = \\frac{FD}{CA} = k\\]
                    If \\(k = 1\\), the triangles are congruent. If \\(k > 1\\), the second triangle is an enlargement; if \\(k < 1\\), it is a reduction.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-similar-intro"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Properties of Similar Figures)</div>
                    <div class="env-body"><p>If two figures are similar with scale factor \\(k\\), then:
                    <ul>
                        <li>Corresponding angles are equal.</li>
                        <li>Corresponding sides have ratio \\(k\\).</li>
                        <li>Perimeters have ratio \\(k\\).</li>
                        <li>Areas have ratio \\(k^2\\).</li>
                    </ul></p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>\\(\\triangle ABC \\sim \\triangle DEF\\) with scale factor \\(k = 2\\). If \\(AB = 3\\), then \\(DE = 6\\). If the area of \\(\\triangle ABC = 10\\), then the area of \\(\\triangle DEF = 10 \\times 2^2 = 40\\).</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-similar-intro',
                    title: 'Similar Triangles: Scale Factor',
                    description: 'Drag the scale factor slider to resize the second triangle. All angles remain the same; only the size changes.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 35, height: 420 });
                        var pA = viz.addDraggable('A', -5, -2, viz.colors.blue, 10);
                        var pB = viz.addDraggable('B', -1, -2, viz.colors.teal, 10);
                        var pC = viz.addDraggable('C', -3, 2, viz.colors.orange, 10);
                        var k = 1.5;

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

                            // Triangle 1 centroid
                            var gx1 = (pA.x + pB.x + pC.x) / 3;
                            var gy1 = (pA.y + pB.y + pC.y) / 3;

                            // Triangle 2: scaled version, placed to the right
                            var ox2 = 3, oy2 = 0;
                            var dAx = (pA.x - gx1) * k, dAy = (pA.y - gy1) * k;
                            var dBx = (pB.x - gx1) * k, dBy = (pB.y - gy1) * k;
                            var dCx = (pC.x - gx1) * k, dCy = (pC.y - gy1) * k;

                            var ax2 = ox2 + dAx, ay2 = oy2 + dAy;
                            var bx2 = ox2 + dBx, by2 = oy2 + dBy;
                            var cx2 = ox2 + dCx, cy2 = oy2 + dCy;

                            // Draw both triangles
                            viz.drawPolygon([[pA.x, pA.y], [pB.x, pB.y], [pC.x, pC.y]], viz.colors.blue + '18', viz.colors.blue, 2);
                            viz.drawPolygon([[ax2, ay2], [bx2, by2], [cx2, cy2]], viz.colors.orange + '18', viz.colors.orange, 2);

                            // Side lengths
                            var ab1 = dist(pA.x, pA.y, pB.x, pB.y);
                            var bc1 = dist(pB.x, pB.y, pC.x, pC.y);
                            var ca1 = dist(pC.x, pC.y, pA.x, pA.y);
                            var ab2 = ab1 * k, bc2 = bc1 * k, ca2 = ca1 * k;

                            // Angles (same for both)
                            var angA = angleBetween(pB.x, pB.y, pA.x, pA.y, pC.x, pC.y);
                            var angB = angleBetween(pA.x, pA.y, pB.x, pB.y, pC.x, pC.y);
                            var angC = angleBetween(pA.x, pA.y, pC.x, pC.y, pB.x, pB.y);

                            // Labels
                            viz.drawPoint(pA.x, pA.y, viz.colors.blue, 'A', 5);
                            viz.drawPoint(pB.x, pB.y, viz.colors.teal, 'B', 5);
                            viz.drawPoint(pC.x, pC.y, viz.colors.orange, 'C', 5);
                            viz.drawPoint(ax2, ay2, viz.colors.blue, 'D', 5);
                            viz.drawPoint(bx2, by2, viz.colors.teal, 'E', 5);
                            viz.drawPoint(cx2, cy2, viz.colors.orange, 'F', 5);
                            viz.drawDraggables();

                            var ctx = viz.ctx;
                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('\u25B3ABC ~ \u25B3DEF,  scale factor k = ' + k.toFixed(2), viz.width / 2, 10);

                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('AB=' + ab1.toFixed(1) + ' DE=' + ab2.toFixed(1) + ' | BC=' + bc1.toFixed(1) + ' EF=' + bc2.toFixed(1) + ' | CA=' + ca1.toFixed(1) + ' FD=' + ca2.toFixed(1), viz.width / 2, 32);
                            ctx.fillText('Angles: A=D=' + angA.toFixed(1) + '\u00B0  B=E=' + angB.toFixed(1) + '\u00B0  C=F=' + angC.toFixed(1) + '\u00B0 (unchanged!)', viz.width / 2, 50);

                            // Area ratio
                            var area1 = Math.abs((pB.x - pA.x) * (pC.y - pA.y) - (pC.x - pA.x) * (pB.y - pA.y)) / 2;
                            var area2 = area1 * k * k;
                            ctx.fillText('Area ratio: k\u00B2 = ' + (k * k).toFixed(2) + '  (' + area1.toFixed(1) + ' \u2192 ' + area2.toFixed(1) + ')', viz.width / 2, viz.height - 15);
                        }

                        VizEngine.createSlider(controls, 'Scale factor k', 0.3, 2.5, k, 0.1, function(v) { k = v; draw(); });
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
                    question: '\\(\\triangle ABC \\sim \\triangle DEF\\) with scale factor \\(k = 3\\). If \\(AB = 4\\), find \\(DE\\).',
                    hint: 'The scale factor multiplies each side.',
                    solution: '\\(DE = k \\cdot AB = 3 \\times 4 = 12\\).'
                },
                {
                    question: 'Two similar triangles have a scale factor of \\(k = 2\\). If the area of the smaller is 15, what is the area of the larger?',
                    hint: 'Area scales by \\(k^2\\).',
                    solution: 'Area of larger \\(= 15 \\times 2^2 = 15 \\times 4 = 60\\).'
                },
                {
                    question: 'If \\(\\triangle PQR \\sim \\triangle STU\\) and the perimeter of \\(\\triangle PQR\\) is 24, while the perimeter of \\(\\triangle STU\\) is 36, what is the scale factor?',
                    hint: 'Perimeter scales linearly with \\(k\\).',
                    solution: '\\(k = \\frac{36}{24} = \\frac{3}{2} = 1.5\\).'
                },
                {
                    question: 'True or false: All equilateral triangles are similar to each other.',
                    hint: 'What are the angles of any equilateral triangle?',
                    solution: 'True. Every equilateral triangle has angles \\(60^\\circ\\)-\\(60^\\circ\\)-\\(60^\\circ\\). Since all corresponding angles are equal, any two equilateral triangles are similar.'
                }
            ]
        },

        // ============================================================
        // SECTION 2: AA, SAS, SSS Similarity
        // ============================================================
        {
            id: 'ch05-sec02',
            title: 'AA, SAS, & SSS Similarity',
            content: `<h2>AA, SAS, & SSS Similarity</h2>

                <div class="env-block theorem">
                    <div class="env-title">Postulate (AA Similarity)</div>
                    <div class="env-body"><p>If two angles of one triangle are congruent to two angles of another triangle, then the triangles are similar.
                    \\[\\angle A = \\angle D \\text{ and } \\angle B = \\angle E \\implies \\triangle ABC \\sim \\triangle DEF\\]</p></div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Why Only Two Angles?</div>
                    <div class="env-body"><p>If two angles match, the third must also match (since all three sum to \\(180^\\circ\\)). So AA is really "AAA" in disguise, but more efficient.</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (SAS Similarity)</div>
                    <div class="env-body"><p>If two sides of one triangle are proportional to two sides of another, and the <strong>included angles</strong> are congruent, then the triangles are similar.</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (SSS Similarity)</div>
                    <div class="env-body"><p>If three sides of one triangle are proportional to three sides of another triangle, then the triangles are similar.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-aa-similarity"></div>

                <div class="env-block example">
                    <div class="env-title">Example (SSS Similarity)</div>
                    <div class="env-body"><p>\\(\\triangle ABC\\) has sides 3, 4, 5. \\(\\triangle DEF\\) has sides 6, 8, 10. Check:
                    \\[\\frac{6}{3} = \\frac{8}{4} = \\frac{10}{5} = 2\\]
                    All ratios are equal, so \\(\\triangle ABC \\sim \\triangle DEF\\) by SSS Similarity with scale factor 2.</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-aa-similarity',
                    title: 'AA Similarity: Same Angles, Any Size',
                    description: 'Two triangles with the same two base angles but different sizes. Drag the second triangle\'s base to change its size. The angles remain identical.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 35, height: 420 });
                        var angL = 50;
                        var angR = 65;
                        var base1 = 3;
                        var pScale = viz.addDraggable('S', 4, -1, viz.colors.yellow, 10);

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

                            var aLR = angL * Math.PI / 180;
                            var aRR = angR * Math.PI / 180;

                            // Compute apex from base angles
                            function makeTriangle(baseLen, ox, oy) {
                                var ax = ox, ay = oy;
                                var bx = ox + baseLen, by = oy;
                                var h = baseLen * Math.sin(aLR) * Math.sin(aRR) / Math.sin(aLR + aRR);
                                var cxOff = baseLen * Math.sin(aRR) * Math.cos(aLR) / Math.sin(aLR + aRR);
                                var cx = ox + cxOff, cy = oy + h;
                                return { ax: ax, ay: ay, bx: bx, by: by, cx: cx, cy: cy };
                            }

                            // Triangle 1
                            var t1 = makeTriangle(base1, -5.5, -2);
                            viz.drawPolygon([[t1.ax, t1.ay], [t1.bx, t1.by], [t1.cx, t1.cy]], viz.colors.blue + '18', viz.colors.blue, 2);
                            viz.drawPoint(t1.ax, t1.ay, viz.colors.blue, 'A', 5);
                            viz.drawPoint(t1.bx, t1.by, viz.colors.teal, 'B', 5);
                            viz.drawPoint(t1.cx, t1.cy, viz.colors.orange, 'C', 5);

                            // Triangle 2: scale from draggable
                            var base2 = Math.max(1, Math.abs(pScale.x - 0.5)) * 1.2;
                            pScale.y = -1;
                            var t2 = makeTriangle(base2, 0.5, -2);
                            viz.drawPolygon([[t2.ax, t2.ay], [t2.bx, t2.by], [t2.cx, t2.cy]], viz.colors.orange + '18', viz.colors.orange, 2);
                            viz.drawPoint(t2.ax, t2.ay, viz.colors.blue, 'D', 5);
                            viz.drawPoint(t2.bx, t2.by, viz.colors.teal, 'E', 5);
                            viz.drawPoint(t2.cx, t2.cy, viz.colors.orange, 'F', 5);

                            viz.drawDraggables();

                            var ctx = viz.ctx;
                            var kFactor = base2 / base1;

                            // Angle labels
                            var angTop = 180 - angL - angR;
                            viz.drawText(angL + '\u00B0', t1.ax + 0.5, t1.ay + 0.4, viz.colors.yellow, 11);
                            viz.drawText(angR + '\u00B0', t1.bx - 0.5, t1.by + 0.4, viz.colors.yellow, 11);
                            viz.drawText(angL + '\u00B0', t2.ax + 0.5, t2.ay + 0.4, viz.colors.yellow, 11);
                            viz.drawText(angR + '\u00B0', t2.bx - 0.5, t2.by + 0.4, viz.colors.yellow, 11);

                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('\u25B3ABC ~ \u25B3DEF by AA (same angles, scale factor k = ' + kFactor.toFixed(2) + ')', viz.width / 2, 10);

                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('\u2220A = \u2220D = ' + angL + '\u00B0,  \u2220B = \u2220E = ' + angR + '\u00B0,  \u2220C = \u2220F = ' + angTop.toFixed(0) + '\u00B0', viz.width / 2, 32);
                            ctx.fillText('Drag yellow point to resize \u25B3DEF', viz.width / 2, viz.height - 15);
                        }

                        VizEngine.createSlider(controls, 'Angle L', 20, 80, angL, 5, function(v) { angL = v; draw(); });
                        VizEngine.createSlider(controls, 'Angle R', 20, 80, angR, 5, function(v) { angR = v; draw(); });
                        pScale.onDrag = function() { draw(); };
                        draw();
                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'In \\(\\triangle ABC\\), \\(\\angle A = 40^\\circ\\), \\(\\angle B = 75^\\circ\\). In \\(\\triangle DEF\\), \\(\\angle D = 40^\\circ\\), \\(\\angle F = 65^\\circ\\). Are the triangles similar?',
                    hint: 'Compute all three angles for each triangle.',
                    solution: '\\(\\angle C = 180 - 40 - 75 = 65^\\circ\\), \\(\\angle E = 180 - 40 - 65 = 75^\\circ\\). So \\(\\angle A = \\angle D = 40^\\circ\\) and \\(\\angle B = \\angle E = 75^\\circ\\). By AA, \\(\\triangle ABC \\sim \\triangle DEF\\).'
                },
                {
                    question: '\\(\\triangle ABC\\) has sides 4, 6, 8. \\(\\triangle DEF\\) has sides 6, 9, 12. Are they similar? If so, find the scale factor.',
                    hint: 'Check if all three ratios of corresponding sides are equal.',
                    solution: '\\(\\frac{6}{4} = \\frac{9}{6} = \\frac{12}{8} = 1.5\\). All ratios are equal, so \\(\\triangle ABC \\sim \\triangle DEF\\) by SSS Similarity with \\(k = 1.5\\).'
                },
                {
                    question: 'What is the minimum information needed to prove two triangles are similar?',
                    hint: 'Which similarity criterion has the fewest requirements?',
                    solution: 'Two pairs of congruent angles (AA). This is the minimum since the third angle is automatically determined.'
                },
                {
                    question: '\\(\\triangle ABC\\) has \\(AB = 10\\), \\(BC = 15\\), \\(\\angle B = 50^\\circ\\). \\(\\triangle DEF\\) has \\(DE = 6\\), \\(EF = 9\\), \\(\\angle E = 50^\\circ\\). Are they similar?',
                    hint: 'Check the SAS Similarity criterion: are two sides proportional with the included angle congruent?',
                    solution: '\\(\\frac{DE}{AB} = \\frac{6}{10} = 0.6\\), \\(\\frac{EF}{BC} = \\frac{9}{15} = 0.6\\), and \\(\\angle B = \\angle E = 50^\\circ\\). By SAS Similarity, \\(\\triangle ABC \\sim \\triangle DEF\\) with \\(k = 0.6\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Proportional Segments
        // ============================================================
        {
            id: 'ch05-sec03',
            title: 'Proportional Segments',
            content: `<h2>Proportional Segments</h2>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Triangle Proportionality Theorem / Basic Proportionality Theorem)</div>
                    <div class="env-body"><p>If a line parallel to one side of a triangle intersects the other two sides, then it divides those sides proportionally. That is, if \\(DE \\parallel BC\\) in \\(\\triangle ABC\\) with \\(D\\) on \\(\\overline{AB}\\) and \\(E\\) on \\(\\overline{AC}\\), then:
                    \\[\\frac{AD}{DB} = \\frac{AE}{EC}\\]</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Corollary (Midsegment Theorem)</div>
                    <div class="env-body"><p>The segment connecting the midpoints of two sides of a triangle (the <strong>midsegment</strong>) is parallel to the third side and half its length.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-proportional"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Angle Bisector Proportionality)</div>
                    <div class="env-body"><p>The angle bisector of a triangle divides the opposite side in the ratio of the adjacent sides:
                    \\[\\frac{BD}{DC} = \\frac{AB}{AC}\\]
                    where \\(D\\) is the point where the bisector of \\(\\angle A\\) meets \\(\\overline{BC}\\).</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>In \\(\\triangle ABC\\), \\(DE \\parallel BC\\), \\(AD = 3\\), \\(DB = 5\\), \\(AE = 4.5\\). Find \\(EC\\).
                    <br>By the Triangle Proportionality Theorem: \\(\\frac{AD}{DB} = \\frac{AE}{EC}\\), so \\(\\frac{3}{5} = \\frac{4.5}{EC}\\), giving \\(EC = 7.5\\).</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-proportional',
                    title: 'Triangle Proportionality Theorem',
                    description: 'Drag point D along side AB. Line DE parallel to BC divides the sides proportionally. The ratios update in real time.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40, height: 440 });
                        var pA = viz.addDraggable('A', 0, 4, viz.colors.blue, 10);
                        var pB = viz.addDraggable('B', -4, -2, viz.colors.teal, 10);
                        var pC = viz.addDraggable('C', 4, -2, viz.colors.orange, 10);
                        var pD = viz.addDraggable('D', -2, 1, viz.colors.green, 10);

                        function dist(x1, y1, x2, y2) {
                            return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();

                            // Constrain D to segment AB
                            var abDx = pB.x - pA.x, abDy = pB.y - pA.y;
                            var abLen = Math.sqrt(abDx * abDx + abDy * abDy);
                            if (abLen > 0.01) {
                                var t = ((pD.x - pA.x) * abDx + (pD.y - pA.y) * abDy) / (abLen * abLen);
                                t = Math.max(0.05, Math.min(0.95, t));
                                pD.x = pA.x + t * abDx;
                                pD.y = pA.y + t * abDy;

                                // E on AC such that DE || BC
                                var ex = pA.x + t * (pC.x - pA.x);
                                var ey = pA.y + t * (pC.y - pA.y);

                                // Draw the triangle
                                viz.drawPolygon([[pA.x, pA.y], [pB.x, pB.y], [pC.x, pC.y]], viz.colors.blue + '10', viz.colors.white, 2);

                                // Draw DE (parallel to BC)
                                viz.drawSegment(pD.x, pD.y, ex, ey, viz.colors.green, 2.5);

                                // Draw BC
                                viz.drawSegment(pB.x, pB.y, pC.x, pC.y, viz.colors.purple, 2);

                                // Mark parallel
                                var ctx = viz.ctx;

                                // Compute lengths
                                var AD = dist(pA.x, pA.y, pD.x, pD.y);
                                var DB = dist(pD.x, pD.y, pB.x, pB.y);
                                var AE = dist(pA.x, pA.y, ex, ey);
                                var EC = dist(ex, ey, pC.x, pC.y);
                                var DE = dist(pD.x, pD.y, ex, ey);
                                var BC = dist(pB.x, pB.y, pC.x, pC.y);

                                // Points
                                viz.drawPoint(pA.x, pA.y, viz.colors.blue, 'A', 5);
                                viz.drawPoint(pB.x, pB.y, viz.colors.teal, 'B', 5);
                                viz.drawPoint(pC.x, pC.y, viz.colors.orange, 'C', 5);
                                viz.drawPoint(pD.x, pD.y, viz.colors.green, 'D', 5);
                                viz.drawPoint(ex, ey, viz.colors.green, 'E', 5);
                                viz.drawDraggables();

                                // Display ratios
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillStyle = viz.colors.green;
                                ctx.fillText('DE \u2225 BC', viz.width / 2, 10);

                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.fillStyle = viz.colors.white;
                                var ratio1 = DB > 0.01 ? (AD / DB).toFixed(3) : '-';
                                var ratio2 = EC > 0.01 ? (AE / EC).toFixed(3) : '-';
                                ctx.fillText('AD/DB = ' + AD.toFixed(2) + '/' + DB.toFixed(2) + ' = ' + ratio1, viz.width / 2, 32);
                                ctx.fillText('AE/EC = ' + AE.toFixed(2) + '/' + EC.toFixed(2) + ' = ' + ratio2, viz.width / 2, 52);

                                ctx.fillStyle = viz.colors.yellow;
                                ctx.fillText('DE/BC = ' + DE.toFixed(2) + '/' + BC.toFixed(2) + ' = ' + (BC > 0.01 ? (DE / BC).toFixed(3) : '-') + ' = t = ' + t.toFixed(3), viz.width / 2, 72);

                                // Midsegment note
                                if (Math.abs(t - 0.5) < 0.03) {
                                    ctx.font = 'bold 13px -apple-system,sans-serif';
                                    ctx.fillStyle = viz.colors.purple;
                                    ctx.fillText('Midsegment! DE = BC/2', viz.width / 2, viz.height - 15);
                                }
                            }
                        }

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
                    question: 'In \\(\\triangle ABC\\), \\(DE \\parallel BC\\) with \\(D\\) on \\(AB\\) and \\(E\\) on \\(AC\\). If \\(AD = 6\\), \\(DB = 4\\), and \\(AE = 9\\), find \\(EC\\).',
                    hint: 'Use \\(\\frac{AD}{DB} = \\frac{AE}{EC}\\).',
                    solution: '\\(\\frac{6}{4} = \\frac{9}{EC}\\), so \\(EC = \\frac{9 \\times 4}{6} = 6\\).'
                },
                {
                    question: 'The midsegment of a triangle connecting the midpoints of two sides has length 7. What is the length of the parallel third side?',
                    hint: 'The midsegment is half the third side.',
                    solution: 'The third side has length \\(2 \\times 7 = 14\\).'
                },
                {
                    question: 'In \\(\\triangle ABC\\), the angle bisector from \\(A\\) meets \\(BC\\) at \\(D\\). If \\(AB = 8\\), \\(AC = 12\\), and \\(BC = 15\\), find \\(BD\\).',
                    hint: 'Use the angle bisector proportionality: \\(\\frac{BD}{DC} = \\frac{AB}{AC}\\).',
                    solution: '\\(\\frac{BD}{DC} = \\frac{8}{12} = \\frac{2}{3}\\). Since \\(BD + DC = 15\\), let \\(BD = 2t\\), \\(DC = 3t\\). Then \\(5t = 15\\), so \\(t = 3\\) and \\(BD = 6\\).'
                },
                {
                    question: 'Prove: If \\(DE \\parallel BC\\) and \\(D\\) is the midpoint of \\(AB\\), then \\(E\\) is the midpoint of \\(AC\\).',
                    hint: 'Use the Triangle Proportionality Theorem.',
                    solution: 'Since \\(DE \\parallel BC\\), by the TPT \\(\\frac{AD}{DB} = \\frac{AE}{EC}\\). Since \\(D\\) is the midpoint, \\(AD = DB\\), so \\(\\frac{AD}{DB} = 1\\). Therefore \\(\\frac{AE}{EC} = 1\\), meaning \\(AE = EC\\), so \\(E\\) is the midpoint of \\(AC\\). \\(\\square\\)'
                }
            ]
        },

        // ============================================================
        // SECTION 4: Applications (Shadow Problems)
        // ============================================================
        {
            id: 'ch05-sec04',
            title: 'Applications: Shadow & Distance Problems',
            content: `<h2>Applications: Shadow & Distance Problems</h2>

                <div class="env-block intuition">
                    <div class="env-title">Similarity in the Real World</div>
                    <div class="env-body"><p>Similar triangles appear whenever parallel light rays create shadows, mirrors create reflections, or lines of sight create overlapping triangles. These situations let us measure heights and distances indirectly.</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example (Shadow Problem)</div>
                    <div class="env-body"><p>A person 1.8 m tall casts a 3 m shadow at the same time that a tree casts a 15 m shadow. How tall is the tree?
                    <br>The sun's rays are parallel, so the triangles formed are similar:
                    \\[\\frac{\\text{tree height}}{15} = \\frac{1.8}{3}\\]
                    \\[\\text{tree height} = \\frac{1.8 \\times 15}{3} = 9 \\text{ m}\\]</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-shadow"></div>

                <div class="env-block example">
                    <div class="env-title">Example (Mirror Reflection)</div>
                    <div class="env-body"><p>A student places a mirror on the ground and stands back until they can see the top of a building in the mirror. If the student's eyes are 1.5 m high, the student is 2 m from the mirror, and the mirror is 12 m from the building, how tall is the building?
                    <br>By the law of reflection, the two triangles are similar:
                    \\[\\frac{h}{12} = \\frac{1.5}{2}\\]
                    \\[h = \\frac{1.5 \\times 12}{2} = 9 \\text{ m}\\]</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-indirect-measure"></div>`,

            visualizations: [
                {
                    id: 'viz-shadow',
                    title: 'Shadow Problem Solver',
                    description: 'Drag the person and the tree to see how parallel sun rays create similar triangles. The height of the tree is computed from the proportion.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 25, originX: 60, originY: 340, height: 400 });
                        var personH = 1.8;
                        var personShadow = 3;
                        var treeShadow = 15;
                        var pPerson = viz.addDraggable('P', 3, personH, viz.colors.blue, 9);
                        var pTree = viz.addDraggable('T', 15, 6, viz.colors.green, 9);

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Constrain person height and tree
                            var ph = Math.max(0.5, pPerson.y);
                            pPerson.y = ph;
                            pPerson.x = 3;
                            var ps = 3; // person shadow length (fixed position)

                            var th = Math.max(1, pTree.y);
                            pTree.y = th;
                            pTree.x = 15;
                            // Tree shadow: computed from similarity
                            var ts = ps * th / ph;

                            // Ground line
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 2;
                            var gy = viz.originY;
                            ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(viz.width, gy); ctx.stroke();

                            // Draw ground texture
                            ctx.fillStyle = viz.colors.grid;
                            ctx.fillRect(0, gy, viz.width, viz.height - gy);

                            // Person (stick figure)
                            var ppx = viz.originX + pPerson.x * viz.scale;
                            var ppy = viz.originY - ph * viz.scale;
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 3;
                            ctx.beginPath(); ctx.moveTo(ppx, gy); ctx.lineTo(ppx, ppy); ctx.stroke();
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath(); ctx.arc(ppx, ppy - 8, 8, 0, Math.PI * 2); ctx.fill();

                            // Person shadow
                            var psx = viz.originX + (pPerson.x - ps) * viz.scale;
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 4;
                            ctx.beginPath(); ctx.moveTo(psx, gy + 2); ctx.lineTo(ppx, gy + 2); ctx.stroke();

                            // Sun ray to person
                            ctx.strokeStyle = viz.colors.yellow + '66';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath(); ctx.moveTo(ppx, ppy); ctx.lineTo(psx, gy); ctx.stroke();
                            ctx.setLineDash([]);

                            // Tree
                            var tpx = viz.originX + pTree.x * viz.scale;
                            var tpy = viz.originY - th * viz.scale;
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 5;
                            ctx.beginPath(); ctx.moveTo(tpx, gy); ctx.lineTo(tpx, tpy); ctx.stroke();
                            // Tree crown
                            ctx.fillStyle = viz.colors.green + '88';
                            ctx.beginPath(); ctx.arc(tpx, tpy - 10, 15, 0, Math.PI * 2); ctx.fill();

                            // Tree shadow
                            var tsx = viz.originX + (pTree.x - ts) * viz.scale;
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 4;
                            ctx.beginPath(); ctx.moveTo(tsx, gy + 2); ctx.lineTo(tpx, gy + 2); ctx.stroke();

                            // Sun ray to tree
                            ctx.strokeStyle = viz.colors.yellow + '66';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath(); ctx.moveTo(tpx, tpy); ctx.lineTo(tsx, gy); ctx.stroke();
                            ctx.setLineDash([]);

                            // Labels
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText(ph.toFixed(1) + ' m', ppx - 25, (gy + ppy) / 2);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText(th.toFixed(1) + ' m', tpx + 30, (gy + tpy) / 2);

                            ctx.textBaseline = 'top';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText(ps.toFixed(1) + ' m', (psx + ppx) / 2, gy + 8);
                            ctx.fillText(ts.toFixed(1) + ' m', (tsx + tpx) / 2, gy + 8);

                            // Proportion display
                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('Person height / Person shadow = Tree height / Tree shadow', viz.width / 2, 12);
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.fillText(ph.toFixed(1) + ' / ' + ps.toFixed(1) + ' = ' + th.toFixed(1) + ' / ' + ts.toFixed(1) + ' = ' + (ph / ps).toFixed(3), viz.width / 2, 35);

                            viz.drawDraggables();
                        }

                        pPerson.onDrag = function() { draw(); };
                        pTree.onDrag = function() { draw(); };
                        draw();
                        viz.animate(function() { draw(); });
                        return viz;
                    }
                },
                {
                    id: 'viz-indirect-measure',
                    title: 'Indirect Measurement with Similar Triangles',
                    description: 'Use a mirror on the ground to measure a building height. Drag the student and mirror positions to see the similar triangles.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 18, originX: 40, originY: 340, height: 400 });
                        var eyeH = 1.6;
                        var distToMirror = 3;
                        var mirrorToBuilding = 15;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var gy = viz.originY;

                            // Ground
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(viz.width, gy); ctx.stroke();
                            ctx.fillStyle = viz.colors.grid;
                            ctx.fillRect(0, gy, viz.width, viz.height - gy);

                            var sc = viz.scale;
                            var ox = viz.originX;

                            // Student position
                            var sx = ox + distToMirror * sc;
                            var sy = gy - eyeH * sc;
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 3;
                            ctx.beginPath(); ctx.moveTo(sx, gy); ctx.lineTo(sx, sy); ctx.stroke();
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath(); ctx.arc(sx, sy - 8, 8, 0, Math.PI * 2); ctx.fill();

                            // Mirror
                            var mx = ox;
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.fillRect(mx - 8, gy - 3, 16, 6);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('mirror', mx, gy + 15);

                            // Building
                            var buildingH = eyeH * mirrorToBuilding / distToMirror;
                            var bx = ox + (distToMirror + mirrorToBuilding) * sc;
                            var by = gy - buildingH * sc;
                            ctx.fillStyle = viz.colors.orange + '44';
                            ctx.fillRect(bx - 15, by, 30, buildingH * sc);
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(bx - 15, by, 30, buildingH * sc);

                            // Reflection lines
                            ctx.strokeStyle = viz.colors.yellow + 'aa';
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([4, 4]);
                            // Student eye to mirror
                            ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(mx, gy); ctx.stroke();
                            // Mirror to building top
                            ctx.beginPath(); ctx.moveTo(mx, gy); ctx.lineTo(bx, by); ctx.stroke();
                            ctx.setLineDash([]);

                            // Similar triangle marking
                            ctx.fillStyle = viz.colors.blue + '22';
                            ctx.beginPath();
                            ctx.moveTo(sx, gy); ctx.lineTo(sx, sy); ctx.lineTo(mx, gy); ctx.closePath();
                            ctx.fill();

                            ctx.fillStyle = viz.colors.orange + '22';
                            ctx.beginPath();
                            ctx.moveTo(bx, gy); ctx.lineTo(bx, by); ctx.lineTo(mx, gy); ctx.closePath();
                            ctx.fill();

                            // Labels
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText(eyeH.toFixed(1) + ' m', sx + 25, (gy + sy) / 2);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText(buildingH.toFixed(1) + ' m', bx + 30, (gy + by) / 2);

                            ctx.fillStyle = viz.colors.text;
                            ctx.textBaseline = 'top';
                            ctx.fillText(distToMirror.toFixed(1) + ' m', (sx + mx) / 2, gy + 5);
                            ctx.fillText(mirrorToBuilding.toFixed(1) + ' m', (mx + bx) / 2, gy + 5);

                            // Formula
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('h / ' + mirrorToBuilding.toFixed(1) + ' = ' + eyeH.toFixed(1) + ' / ' + distToMirror.toFixed(1) + '  \u21D2  h = ' + buildingH.toFixed(1) + ' m', viz.width / 2, 15);
                        }

                        VizEngine.createSlider(controls, 'Eye height (m)', 1.2, 2.0, eyeH, 0.1, function(v) { eyeH = v; draw(); });
                        VizEngine.createSlider(controls, 'Dist to mirror (m)', 1, 6, distToMirror, 0.5, function(v) { distToMirror = v; draw(); });
                        VizEngine.createSlider(controls, 'Mirror to building (m)', 5, 25, mirrorToBuilding, 1, function(v) { mirrorToBuilding = v; draw(); });
                        draw();
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'A 2 m tall person casts a 4 m shadow. At the same time, a flagpole casts a 20 m shadow. How tall is the flagpole?',
                    hint: 'Set up a proportion using similar triangles.',
                    solution: '\\(\\frac{h}{20} = \\frac{2}{4}\\), so \\(h = \\frac{2 \\times 20}{4} = 10\\) m.'
                },
                {
                    question: 'A student places a mirror on flat ground 8 m from a building and walks back 2 m from the mirror, at which point they see the top of the building. If the student\'s eyes are 1.5 m above the ground, how tall is the building?',
                    hint: 'The mirror creates similar triangles by the law of reflection.',
                    solution: '\\(\\frac{h}{8} = \\frac{1.5}{2}\\), so \\(h = \\frac{1.5 \\times 8}{2} = 6\\) m.'
                },
                {
                    question: 'A map has a scale of 1:50000. Two cities are 3 cm apart on the map. What is the actual distance?',
                    hint: 'The scale factor means 1 cm on the map = 50000 cm in reality.',
                    solution: '\\(3 \\times 50000 = 150000\\) cm \\(= 1500\\) m \\(= 1.5\\) km.'
                },
                {
                    question: 'Two similar triangles have areas 16 and 36. What is the ratio of their corresponding sides?',
                    hint: 'The area ratio is \\(k^2\\).',
                    solution: '\\(k^2 = \\frac{36}{16} = \\frac{9}{4}\\), so \\(k = \\frac{3}{2}\\). The ratio of corresponding sides is \\(3:2\\).'
                }
            ]
        }
    ]
});
