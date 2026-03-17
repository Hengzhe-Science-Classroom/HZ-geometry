window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch04',
    number: 4,
    title: 'Congruence',
    subtitle: 'When two triangles are identical: SSS, SAS, ASA, AAS, and how to use CPCTC in proofs',
    sections: [
        // ============================================================
        // SECTION 1: SSS Congruence
        // ============================================================
        {
            id: 'ch04-sec01',
            title: 'SSS Congruence',
            content: `<h2>SSS Congruence</h2>

                <div class="env-block intuition">
                    <div class="env-title">What Does Congruent Mean?</div>
                    <div class="env-body"><p>Two figures are <strong>congruent</strong> if they have the same shape and size. For triangles, this means all three pairs of corresponding sides are equal and all three pairs of corresponding angles are equal. But you do <em>not</em> need to check all six; certain shortcut criteria are sufficient.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Congruent Triangles)</div>
                    <div class="env-body"><p>\\(\\triangle ABC \\cong \\triangle DEF\\) means:
                    \\[AB = DE,\\; BC = EF,\\; CA = FD\\]
                    \\[\\angle A = \\angle D,\\; \\angle B = \\angle E,\\; \\angle C = \\angle F\\]
                    The <strong>order of vertices</strong> in the congruence statement tells you which parts correspond.</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Postulate (SSS: Side-Side-Side)</div>
                    <div class="env-body"><p>If three sides of one triangle are congruent to three sides of another triangle, then the triangles are congruent.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-sss"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>\\(\\triangle ABC\\) has sides \\(AB = 5\\), \\(BC = 7\\), \\(CA = 6\\). \\(\\triangle DEF\\) has sides \\(DE = 5\\), \\(EF = 7\\), \\(FD = 6\\). By SSS, \\(\\triangle ABC \\cong \\triangle DEF\\).</p></div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body"><p>SSS is a <em>rigidity</em> result: if you fix the three side lengths of a triangle, the shape is completely determined (up to reflection). This is why triangles are used in structural engineering.</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-sss',
                    title: 'SSS Congruence: Rigid Triangles',
                    description: 'Drag the vertices of the left triangle. A second triangle with the same three side lengths is constructed on the right. Both triangles are always congruent by SSS.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 35, height: 420 });
                        var pA = viz.addDraggable('A', -5, -2, viz.colors.blue, 10);
                        var pB = viz.addDraggable('B', -1, -2, viz.colors.teal, 10);
                        var pC = viz.addDraggable('C', -3, 2, viz.colors.orange, 10);

                        function dist(x1, y1, x2, y2) {
                            return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();

                            var ab = dist(pA.x, pA.y, pB.x, pB.y);
                            var bc = dist(pB.x, pB.y, pC.x, pC.y);
                            var ca = dist(pC.x, pC.y, pA.x, pA.y);

                            // Draw triangle 1
                            viz.drawPolygon([[pA.x, pA.y], [pB.x, pB.y], [pC.x, pC.y]], viz.colors.blue + '18', viz.colors.blue, 2);

                            // Construct triangle 2 with same side lengths
                            // Place D at (2, -2), E at (2 + ab, -2)
                            var dx = 2, dy = -2;
                            var ex = dx + ab, ey = dy;

                            // F: intersection of circles centered at D (radius ca) and E (radius bc)
                            var d2 = ab; // distance DE = AB
                            // Using circle-circle intersection
                            var a_val = (ca * ca - bc * bc + d2 * d2) / (2 * d2);
                            var hSq = ca * ca - a_val * a_val;
                            var fx, fy;
                            if (hSq >= 0) {
                                var h = Math.sqrt(hSq);
                                fx = dx + a_val;
                                fy = dy + h; // Take upper intersection
                            } else {
                                fx = (dx + ex) / 2;
                                fy = dy + 1;
                            }

                            viz.drawPolygon([[dx, dy], [ex, ey], [fx, fy]], viz.colors.orange + '18', viz.colors.orange, 2);

                            // Labels for triangle 1
                            viz.drawPoint(pA.x, pA.y, viz.colors.blue, 'A', 5);
                            viz.drawPoint(pB.x, pB.y, viz.colors.teal, 'B', 5);
                            viz.drawPoint(pC.x, pC.y, viz.colors.orange, 'C', 5);

                            // Labels for triangle 2
                            viz.drawPoint(dx, dy, viz.colors.blue, 'D', 5);
                            viz.drawPoint(ex, ey, viz.colors.teal, 'E', 5);
                            viz.drawPoint(fx, fy, viz.colors.orange, 'F', 5);

                            // Tick marks for equal sides
                            var ctx = viz.ctx;

                            function drawTicks(x1, y1, x2, y2, n) {
                                var s1 = viz.toScreen(x1, y1);
                                var s2 = viz.toScreen(x2, y2);
                                var mx = (s1[0] + s2[0]) / 2, my = (s1[1] + s2[1]) / 2;
                                var ddx = s2[0] - s1[0], ddy = s2[1] - s1[1];
                                var len = Math.sqrt(ddx * ddx + ddy * ddy);
                                if (len < 1) return;
                                var px = -ddy / len * 8, py = ddx / len * 8;
                                ctx.strokeStyle = viz.colors.yellow;
                                ctx.lineWidth = 2;
                                for (var i = 0; i < n; i++) {
                                    var off = (i - (n - 1) / 2) * 6;
                                    var tx = mx + off * ddx / len;
                                    var ty = my + off * ddy / len;
                                    ctx.beginPath();
                                    ctx.moveTo(tx - px, ty - py);
                                    ctx.lineTo(tx + px, ty + py);
                                    ctx.stroke();
                                }
                            }

                            drawTicks(pA.x, pA.y, pB.x, pB.y, 1);
                            drawTicks(dx, dy, ex, ey, 1);
                            drawTicks(pB.x, pB.y, pC.x, pC.y, 2);
                            drawTicks(ex, ey, fx, fy, 2);
                            drawTicks(pC.x, pC.y, pA.x, pA.y, 3);
                            drawTicks(fx, fy, dx, dy, 3);

                            viz.drawDraggables();

                            // Display
                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('\u25B3ABC \u2245 \u25B3DEF by SSS', viz.width / 2, 10);

                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('AB=DE=' + ab.toFixed(2) + '   BC=EF=' + bc.toFixed(2) + '   CA=FD=' + ca.toFixed(2), viz.width / 2, 32);
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
                    id: 'viz-congruence-overlay',
                    title: 'Congruence Overlay',
                    description: 'Drag triangle DEF to overlay it on triangle ABC. When they match perfectly, the overlay turns green. This demonstrates that congruent triangles are identical in size and shape.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40, height: 420 });
                        // Fixed triangle ABC
                        var ax = -3, ay = -1.5, bx = 2, by = -1.5, cxx = -0.5, cy = 2;

                        // Movable triangle DEF (same shape, different position)
                        var pD = viz.addDraggable('D', 1, -1.5, viz.colors.orange, 10);
                        var pE = viz.addDraggable('E', 6, -1.5, viz.colors.orange, 10);
                        var pF = viz.addDraggable('F', 3.5, 2, viz.colors.orange, 10);

                        function dist(x1, y1, x2, y2) {
                            return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();

                            // Draw fixed triangle ABC
                            viz.drawPolygon([[ax, ay], [bx, by], [cxx, cy]], viz.colors.blue + '20', viz.colors.blue, 2);
                            viz.drawPoint(ax, ay, viz.colors.blue, 'A', 5);
                            viz.drawPoint(bx, by, viz.colors.blue, 'B', 5);
                            viz.drawPoint(cxx, cy, viz.colors.blue, 'C', 5);

                            // Check if DEF matches ABC
                            var dA = dist(pD.x, pD.y, ax, ay);
                            var dB = dist(pE.x, pE.y, bx, by);
                            var dC = dist(pF.x, pF.y, cxx, cy);
                            var matched = dA < 0.4 && dB < 0.4 && dC < 0.4;

                            var color2 = matched ? viz.colors.green : viz.colors.orange;
                            viz.drawPolygon([[pD.x, pD.y], [pE.x, pE.y], [pF.x, pF.y]], color2 + '25', color2, 2);
                            viz.drawPoint(pD.x, pD.y, color2, 'D', 5);
                            viz.drawPoint(pE.x, pE.y, color2, 'E', 5);
                            viz.drawPoint(pF.x, pF.y, color2, 'F', 5);
                            viz.drawDraggables();

                            var ctx = viz.ctx;
                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';

                            // Side lengths
                            var ab = dist(ax, ay, bx, by);
                            var bc2 = dist(bx, by, cxx, cy);
                            var ca = dist(cxx, cy, ax, ay);
                            var de = dist(pD.x, pD.y, pE.x, pE.y);
                            var ef = dist(pE.x, pE.y, pF.x, pF.y);
                            var fd = dist(pF.x, pF.y, pD.x, pD.y);

                            if (matched) {
                                ctx.fillStyle = viz.colors.green;
                                ctx.fillText('Perfect overlay! \u25B3ABC \u2245 \u25B3DEF', viz.width / 2, 10);
                            } else {
                                ctx.fillStyle = viz.colors.white;
                                ctx.fillText('Drag D, E, F to overlay on A, B, C', viz.width / 2, 10);
                            }

                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('ABC sides: ' + ab.toFixed(1) + ', ' + bc2.toFixed(1) + ', ' + ca.toFixed(1) + '  |  DEF sides: ' + de.toFixed(1) + ', ' + ef.toFixed(1) + ', ' + fd.toFixed(1), viz.width / 2, 32);
                        }

                        VizEngine.createButton(controls, 'Reset DEF', function() {
                            pD.x = 1; pD.y = -1.5;
                            pE.x = 6; pE.y = -1.5;
                            pF.x = 3.5; pF.y = 2;
                            draw();
                        });
                        VizEngine.createButton(controls, 'Snap to ABC', function() {
                            pD.x = ax; pD.y = ay;
                            pE.x = bx; pE.y = by;
                            pF.x = cxx; pF.y = cy;
                            draw();
                        });
                        pD.onDrag = function() { draw(); };
                        pE.onDrag = function() { draw(); };
                        pF.onDrag = function() { draw(); };
                        draw();
                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: '\\(\\triangle ABC\\) has \\(AB = 8\\), \\(BC = 6\\), \\(CA = 10\\). \\(\\triangle DEF\\) has \\(DE = 8\\), \\(EF = 6\\), \\(FD = 10\\). Are they congruent? By what criterion?',
                    hint: 'Compare all three pairs of sides.',
                    solution: 'Yes. All three pairs of sides are equal (\\(AB = DE\\), \\(BC = EF\\), \\(CA = FD\\)), so \\(\\triangle ABC \\cong \\triangle DEF\\) by <strong>SSS</strong>.'
                },
                {
                    question: 'Why does SSS work for triangles but not for quadrilaterals?',
                    hint: 'Think about rigidity. Can a quadrilateral with fixed side lengths deform?',
                    solution: 'A triangle is rigid: fixing the three side lengths determines its shape uniquely. A quadrilateral with fixed side lengths can flex (think of a parallelogram becoming a rhombus). Quadrilaterals need additional information (like a diagonal) to determine their shape.'
                },
                {
                    question: 'If \\(\\triangle ABC \\cong \\triangle DEF\\), must \\(\\triangle ABC \\cong \\triangle FED\\)?',
                    hint: 'The order of vertices in a congruence statement matters.',
                    solution: 'Not necessarily in that exact correspondence. \\(\\triangle ABC \\cong \\triangle DEF\\) means \\(A \\leftrightarrow D\\), \\(B \\leftrightarrow E\\), \\(C \\leftrightarrow F\\). Writing \\(\\triangle ABC \\cong \\triangle FED\\) would mean \\(A \\leftrightarrow F\\), \\(B \\leftrightarrow E\\), \\(C \\leftrightarrow D\\), which gives a different correspondence and may or may not be valid.'
                },
                {
                    question: 'Given \\(\\overline{AC}\\) is a shared side of \\(\\triangle ABC\\) and \\(\\triangle ADC\\), with \\(AB = AD\\) and \\(BC = DC\\). Prove \\(\\triangle ABC \\cong \\triangle ADC\\).',
                    hint: 'What do you know about side \\(AC\\)?',
                    solution: '\\(AB = AD\\) (given), \\(BC = DC\\) (given), \\(AC = AC\\) (Reflexive Property). Therefore \\(\\triangle ABC \\cong \\triangle ADC\\) by SSS.'
                }
            ]
        },

        // ============================================================
        // SECTION 2: SAS Congruence
        // ============================================================
        {
            id: 'ch04-sec02',
            title: 'SAS Congruence',
            content: `<h2>SAS Congruence</h2>

                <div class="env-block theorem">
                    <div class="env-title">Postulate (SAS: Side-Angle-Side)</div>
                    <div class="env-body"><p>If two sides and the <strong>included angle</strong> of one triangle are congruent to two sides and the included angle of another triangle, then the triangles are congruent.</p></div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Warning: Included Angle</div>
                    <div class="env-body"><p>The angle must be <strong>between</strong> the two sides (the "included" angle). Two sides and a non-included angle (SSA) do <strong>not</strong> guarantee congruence. SSA is sometimes called the "ambiguous case."</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-sas"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>In \\(\\triangle ABC\\) and \\(\\triangle DEF\\): \\(AB = DE = 5\\), \\(\\angle B = \\angle E = 60^\\circ\\), \\(BC = EF = 7\\). Since the angle is included between the two given sides, \\(\\triangle ABC \\cong \\triangle DEF\\) by SAS.</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-sas',
                    title: 'SAS Congruence & the SSA Ambiguous Case',
                    description: 'Build two triangles with two sides and an angle. Toggle between SAS (included angle) and SSA (non-included) to see when congruence holds and when it fails.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 35, height: 420 });
                        var side1 = 4;
                        var side2 = 3;
                        var angle = 60;
                        var mode = 'sas';

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            var ctx = viz.ctx;

                            var angRad = angle * Math.PI / 180;

                            if (mode === 'sas') {
                                // Triangle 1: SAS with included angle
                                var ax1 = -5, ay1 = -1;
                                var bx1 = ax1 + side1, by1 = ay1;
                                var cx1 = ax1 + side2 * Math.cos(angRad), cy1 = ay1 + side2 * Math.sin(angRad);

                                viz.drawPolygon([[ax1, ay1], [bx1, by1], [cx1, cy1]], viz.colors.blue + '18', viz.colors.blue, 2);
                                viz.drawPoint(ax1, ay1, viz.colors.blue, 'A', 5);
                                viz.drawPoint(bx1, by1, viz.colors.teal, 'B', 5);
                                viz.drawPoint(cx1, cy1, viz.colors.orange, 'C', 5);

                                // Triangle 2: same SAS
                                var ax2 = 1, ay2 = -1;
                                var bx2 = ax2 + side1, by2 = ay2;
                                var cx2 = ax2 + side2 * Math.cos(angRad), cy2 = ay2 + side2 * Math.sin(angRad);

                                viz.drawPolygon([[ax2, ay2], [bx2, by2], [cx2, cy2]], viz.colors.orange + '18', viz.colors.orange, 2);
                                viz.drawPoint(ax2, ay2, viz.colors.blue, 'D', 5);
                                viz.drawPoint(bx2, by2, viz.colors.teal, 'E', 5);
                                viz.drawPoint(cx2, cy2, viz.colors.orange, 'F', 5);

                                // Angle arcs
                                var sa1 = viz.toScreen(ax1, ay1);
                                ctx.strokeStyle = viz.colors.yellow;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.arc(sa1[0], sa1[1], 25, -angRad, 0);
                                ctx.stroke();

                                var sa2 = viz.toScreen(ax2, ay2);
                                ctx.beginPath();
                                ctx.arc(sa2[0], sa2[1], 25, -angRad, 0);
                                ctx.stroke();

                                ctx.font = 'bold 15px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillStyle = viz.colors.green;
                                ctx.fillText('SAS: Included angle \u2192 Triangles ARE congruent', viz.width / 2, 10);

                            } else {
                                // SSA ambiguous case
                                var ax1 = -5, ay1 = -1;
                                var bx1 = ax1 + side1, by1 = ay1;
                                // Angle at B (non-included for sides AB and AC)
                                var cx1 = ax1 + side2 * Math.cos(angRad), cy1 = ay1 + side2 * Math.sin(angRad);

                                viz.drawPolygon([[ax1, ay1], [bx1, by1], [cx1, cy1]], viz.colors.blue + '18', viz.colors.blue, 2);
                                viz.drawPoint(ax1, ay1, viz.colors.blue, 'A', 5);
                                viz.drawPoint(bx1, by1, viz.colors.teal, 'B', 5);
                                viz.drawPoint(cx1, cy1, viz.colors.orange, 'C', 5);

                                // SSA: second possible triangle (reflected)
                                var ax2 = 1, ay2 = -1;
                                var bx2 = ax2 + side1, by2 = ay2;
                                var cx2 = ax2 + side2 * Math.cos(angRad), cy2 = ay2 - side2 * Math.sin(angRad);

                                viz.drawPolygon([[ax2, ay2], [bx2, by2], [cx2, cy2]], viz.colors.orange + '18', viz.colors.orange, 2);
                                viz.drawPoint(ax2, ay2, viz.colors.blue, 'D', 5);
                                viz.drawPoint(bx2, by2, viz.colors.teal, 'E', 5);
                                viz.drawPoint(cx2, cy2, viz.colors.orange, 'F', 5);

                                ctx.font = 'bold 15px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillStyle = viz.colors.red;
                                ctx.fillText('SSA: Non-included angle \u2192 Two possible triangles!', viz.width / 2, 10);
                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText('Same two sides & angle, but different triangles (SSA is NOT a congruence criterion)', viz.width / 2, 32);
                            }

                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            ctx.textAlign = 'center';
                            ctx.fillText('Side 1 = ' + side1.toFixed(1) + '   Side 2 = ' + side2.toFixed(1) + '   Angle = ' + angle.toFixed(0) + '\u00B0', viz.width / 2, viz.height - 15);
                        }

                        VizEngine.createButton(controls, 'SAS (valid)', function() { mode = 'sas'; draw(); });
                        VizEngine.createButton(controls, 'SSA (ambiguous)', function() { mode = 'ssa'; draw(); });
                        VizEngine.createSlider(controls, 'Side 1', 2, 6, side1, 0.5, function(v) { side1 = v; draw(); });
                        VizEngine.createSlider(controls, 'Side 2', 2, 6, side2, 0.5, function(v) { side2 = v; draw(); });
                        VizEngine.createSlider(controls, 'Angle', 20, 150, angle, 5, function(v) { angle = v; draw(); });
                        draw();
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'Why does SSA not guarantee congruence?',
                    hint: 'Think about the "swing" of the third side.',
                    solution: 'With two sides and a non-included angle, the unknown side can "swing" to two different positions, creating two non-congruent triangles. This is called the ambiguous case.'
                },
                {
                    question: 'In \\(\\triangle PQR\\) and \\(\\triangle STU\\), \\(PQ = ST\\), \\(\\angle Q = \\angle T\\), \\(QR = TU\\). Is this SAS? Are the triangles congruent?',
                    hint: 'Is \\(\\angle Q\\) the included angle between \\(PQ\\) and \\(QR\\)?',
                    solution: 'Yes, \\(\\angle Q\\) is the angle between sides \\(PQ\\) and \\(QR\\), so this is SAS. The triangles are congruent: \\(\\triangle PQR \\cong \\triangle STU\\).'
                },
                {
                    question: 'Name all four valid triangle congruence criteria (postulates/theorems).',
                    hint: 'Three letters each. SSA and AAA are NOT valid.',
                    solution: 'SSS, SAS, ASA, and AAS (or SAA). Note: SSA and AAA are <strong>not</strong> valid congruence criteria.'
                },
                {
                    question: 'Two sides of a triangle are 5 and 7, and the included angle is \\(40^\\circ\\). Is the triangle uniquely determined?',
                    hint: 'SAS gives a unique triangle.',
                    solution: 'Yes. By SAS, two sides and the included angle uniquely determine a triangle (up to congruence).'
                }
            ]
        },

        // ============================================================
        // SECTION 3: ASA & AAS Congruence
        // ============================================================
        {
            id: 'ch04-sec03',
            title: 'ASA & AAS Congruence',
            content: `<h2>ASA & AAS Congruence</h2>

                <div class="env-block theorem">
                    <div class="env-title">Postulate (ASA: Angle-Side-Angle)</div>
                    <div class="env-body"><p>If two angles and the <strong>included side</strong> of one triangle are congruent to two angles and the included side of another triangle, then the triangles are congruent.</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (AAS: Angle-Angle-Side)</div>
                    <div class="env-body"><p>If two angles and a <strong>non-included side</strong> of one triangle are congruent to two angles and the corresponding non-included side of another triangle, then the triangles are congruent.</p></div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Why AAS Works</div>
                    <div class="env-body"><p>If two angles are known, the third is determined (since angles sum to \\(180^\\circ\\)). So AAS effectively gives you all three angles and one side, which reduces to an ASA configuration.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-asa-aas"></div>

                <div class="env-block warning">
                    <div class="env-title">Warning: AAA is NOT a Congruence Criterion</div>
                    <div class="env-body"><p>Knowing all three angles tells you the <strong>shape</strong> of the triangle but not its <strong>size</strong>. Triangles with the same angles can be different sizes; they are <strong>similar</strong>, not necessarily congruent.</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-asa-aas',
                    title: 'ASA, AAS, and the AAA Failure',
                    description: 'Toggle between ASA (valid), AAS (valid), and AAA (not valid). See why knowing all three angles alone does not determine the size.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 35, height: 420 });
                        var mode = 'asa';
                        var baseLen = 4;
                        var angL = 50;
                        var angR = 60;

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            var ctx = viz.ctx;

                            var angLR = angL * Math.PI / 180;
                            var angRR = angR * Math.PI / 180;
                            var angTop = 180 - angL - angR;

                            if (mode === 'asa' || mode === 'aas') {
                                // Triangle 1
                                var ax1 = -5, ay1 = -1.5;
                                var bx1 = ax1 + baseLen, by1 = ay1;
                                // Compute C from the two base angles
                                var h = baseLen * Math.sin(angLR) * Math.sin(angRR) / Math.sin((angLR + angRR));
                                var cx1Offset = baseLen * Math.sin(angRR) * Math.cos(angLR) / Math.sin(angLR + angRR);
                                var cx1 = ax1 + cx1Offset;
                                var cy1 = ay1 + h;

                                viz.drawPolygon([[ax1, ay1], [bx1, by1], [cx1, cy1]], viz.colors.blue + '18', viz.colors.blue, 2);
                                viz.drawPoint(ax1, ay1, viz.colors.blue, 'A', 5);
                                viz.drawPoint(bx1, by1, viz.colors.teal, 'B', 5);
                                viz.drawPoint(cx1, cy1, viz.colors.orange, 'C', 5);

                                // Triangle 2 (congruent copy)
                                var ax2 = 1, ay2 = -1.5;
                                var bx2 = ax2 + baseLen, by2 = ay2;
                                var cx2 = ax2 + cx1Offset;
                                var cy2 = ay2 + h;

                                viz.drawPolygon([[ax2, ay2], [bx2, by2], [cx2, cy2]], viz.colors.orange + '18', viz.colors.orange, 2);
                                viz.drawPoint(ax2, ay2, viz.colors.blue, 'D', 5);
                                viz.drawPoint(bx2, by2, viz.colors.teal, 'E', 5);
                                viz.drawPoint(cx2, cy2, viz.colors.orange, 'F', 5);

                                // Angle arcs
                                function drawArc(sx, sy, startAng, sweepAng, color) {
                                    var ss = viz.toScreen(sx, sy);
                                    ctx.strokeStyle = color;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.arc(ss[0], ss[1], 20, -startAng - sweepAng, -startAng);
                                    ctx.stroke();
                                }

                                if (mode === 'asa') {
                                    drawArc(ax1, ay1, 0, angLR, viz.colors.yellow);
                                    drawArc(bx1, by1, Math.PI - angRR, angRR, viz.colors.yellow);
                                    drawArc(ax2, ay2, 0, angLR, viz.colors.yellow);
                                    drawArc(bx2, by2, Math.PI - angRR, angRR, viz.colors.yellow);

                                    ctx.font = 'bold 15px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillStyle = viz.colors.green;
                                    ctx.fillText('ASA: Two angles + included side \u2192 Congruent', viz.width / 2, 10);
                                } else {
                                    drawArc(ax1, ay1, 0, angLR, viz.colors.yellow);
                                    drawArc(bx1, by1, Math.PI - angRR, angRR, viz.colors.yellow);
                                    drawArc(ax2, ay2, 0, angLR, viz.colors.yellow);
                                    drawArc(bx2, by2, Math.PI - angRR, angRR, viz.colors.yellow);

                                    ctx.font = 'bold 15px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillStyle = viz.colors.green;
                                    ctx.fillText('AAS: Two angles + non-included side \u2192 Congruent', viz.width / 2, 10);
                                }

                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText('\u2220A=\u2220D=' + angL + '\u00B0   \u2220B=\u2220E=' + angR + '\u00B0   AB=DE=' + baseLen.toFixed(1), viz.width / 2, 32);

                            } else {
                                // AAA: show two triangles with same angles but different sizes
                                var scale1 = 1, scale2 = 1.7;
                                for (var t = 0; t < 2; t++) {
                                    var sc = t === 0 ? scale1 : scale2;
                                    var bl = baseLen * sc;
                                    var ox = t === 0 ? -4.5 : 1.5;
                                    var oy = -2;

                                    var ax = ox, ay = oy;
                                    var bx = ox + bl, by = oy;
                                    var h2 = bl * Math.sin(angLR) * Math.sin(angRR) / Math.sin(angLR + angRR);
                                    var cxOff = bl * Math.sin(angRR) * Math.cos(angLR) / Math.sin(angLR + angRR);
                                    var cxx = ox + cxOff, cy2 = oy + h2;

                                    var col = t === 0 ? viz.colors.blue : viz.colors.orange;
                                    viz.drawPolygon([[ax, ay], [bx, by], [cxx, cy2]], col + '18', col, 2);

                                    ctx.font = '11px -apple-system,sans-serif';
                                    ctx.fillStyle = viz.colors.yellow;
                                    ctx.textAlign = 'center';
                                    viz.drawText(angL + '\u00B0', ax + 0.5, ay + 0.4, viz.colors.yellow, 11);
                                    viz.drawText(angR + '\u00B0', bx - 0.5, by + 0.4, viz.colors.yellow, 11);
                                    viz.drawText(angTop.toFixed(0) + '\u00B0', cxx, cy2 - 0.3, viz.colors.yellow, 11);
                                }

                                ctx.font = 'bold 15px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillStyle = viz.colors.red;
                                ctx.fillText('AAA: Same angles, different sizes \u2192 NOT congruent!', viz.width / 2, 10);
                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText('Same shape (similar) but not same size', viz.width / 2, 32);
                            }
                        }

                        VizEngine.createButton(controls, 'ASA', function() { mode = 'asa'; draw(); });
                        VizEngine.createButton(controls, 'AAS', function() { mode = 'aas'; draw(); });
                        VizEngine.createButton(controls, 'AAA (invalid)', function() { mode = 'aaa'; draw(); });
                        VizEngine.createSlider(controls, 'Base', 2, 6, baseLen, 0.5, function(v) { baseLen = v; draw(); });
                        VizEngine.createSlider(controls, 'Angle L', 20, 80, angL, 5, function(v) { angL = v; draw(); });
                        VizEngine.createSlider(controls, 'Angle R', 20, 80, angR, 5, function(v) { angR = v; draw(); });
                        draw();
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'In \\(\\triangle ABC\\) and \\(\\triangle DEF\\): \\(\\angle A = \\angle D = 50^\\circ\\), \\(AB = DE = 6\\), \\(\\angle B = \\angle E = 70^\\circ\\). Which criterion applies?',
                    hint: 'Is the side between the two angles?',
                    solution: 'Side \\(AB\\) is between \\(\\angle A\\) and \\(\\angle B\\), so this is <strong>ASA</strong>. \\(\\triangle ABC \\cong \\triangle DEF\\).'
                },
                {
                    question: 'Explain why AAA does not prove congruence.',
                    hint: 'Can two triangles have the same angles but different sizes?',
                    solution: 'Yes. For example, a triangle with angles \\(60^\\circ\\)-\\(60^\\circ\\)-\\(60^\\circ\\) and sides 1-1-1 has the same angles as a triangle with sides 2-2-2. They have the same shape but different sizes, so they are similar but not congruent.'
                },
                {
                    question: 'Given \\(\\angle P = \\angle S\\), \\(\\angle Q = \\angle T\\), and \\(QR = TU\\) (the side opposite \\(\\angle P\\) and \\(\\angle S\\) respectively). Is this AAS?',
                    hint: 'In AAS, the side is not included between the two angles.',
                    solution: 'Yes. The side \\(QR\\) (resp. \\(TU\\)) is not between \\(\\angle P\\) and \\(\\angle Q\\) (resp. \\(\\angle S\\) and \\(\\angle T\\)). This is AAS, so \\(\\triangle PQR \\cong \\triangle STU\\).'
                },
                {
                    question: 'Which congruence criterion requires no angle information at all?',
                    hint: 'Think of a criterion that uses only side lengths.',
                    solution: '<strong>SSS</strong> (Side-Side-Side). It uses only the three side lengths with no angle information.'
                }
            ]
        },

        // ============================================================
        // SECTION 4: CPCTC Applications
        // ============================================================
        {
            id: 'ch04-sec04',
            title: 'CPCTC Applications',
            content: `<h2>CPCTC Applications</h2>

                <div class="env-block definition">
                    <div class="env-title">Definition (CPCTC)</div>
                    <div class="env-body"><p><strong>CPCTC</strong> stands for "Corresponding Parts of Congruent Triangles are Congruent." Once you prove two triangles are congruent, <em>every</em> pair of corresponding sides and angles must also be congruent.</p></div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Proof Strategy</div>
                    <div class="env-body"><p>To prove that two segments are equal or two angles are equal:
                    <ol>
                        <li>Identify two triangles that contain those segments/angles.</li>
                        <li>Prove the triangles are congruent (using SSS, SAS, ASA, or AAS).</li>
                        <li>Conclude the desired parts are congruent by CPCTC.</li>
                    </ol></p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-cpctc"></div>

                <div class="env-block example">
                    <div class="env-title">Example (CPCTC Proof)</div>
                    <div class="env-body"><p><strong>Given:</strong> \\(\\overline{AB} \\cong \\overline{CD}\\), \\(\\overline{AB} \\parallel \\overline{CD}\\), \\(M\\) is the midpoint of \\(\\overline{BD}\\).
                    <br><strong>Prove:</strong> \\(M\\) is the midpoint of \\(\\overline{AC}\\).
                    <br><strong>Proof:</strong>
                    <br>1. \\(AB = CD\\) and \\(AB \\parallel CD\\) (Given)
                    <br>2. \\(\\angle ABM = \\angle CDM\\) (Alternate interior angles, \\(AB \\parallel CD\\))
                    <br>3. \\(BM = DM\\) (\\(M\\) is midpoint of \\(BD\\))
                    <br>4. \\(\\angle AMB = \\angle CMD\\) (Vertical angles)
                    <br>5. \\(\\triangle ABM \\cong \\triangle CDM\\) (ASA)
                    <br>6. \\(AM = CM\\) (CPCTC)
                    <br>7. \\(M\\) is the midpoint of \\(\\overline{AC}\\) (Definition of midpoint) \\(\\square\\)</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-cpctc',
                    title: 'CPCTC in Action',
                    description: 'Two triangles share a common side. Once proven congruent, corresponding parts are highlighted. Drag vertices to see the correspondence maintained.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40, height: 420 });
                        var pA = viz.addDraggable('A', -2, 3, viz.colors.blue, 10);
                        var pB = viz.addDraggable('B', -3, -1, viz.colors.teal, 10);
                        var pC = viz.addDraggable('C', 1, -1, viz.colors.teal, 10);
                        var pD = viz.addDraggable('D', 2, 3, viz.colors.orange, 10);
                        // Shared diagonal BC

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

                        var showCPCTC = false;

                        function draw() {
                            viz.clear();
                            viz.drawGrid();

                            // Draw two triangles sharing side BC
                            viz.drawPolygon([[pA.x, pA.y], [pB.x, pB.y], [pC.x, pC.y]], viz.colors.blue + '18', viz.colors.blue, 2);
                            viz.drawPolygon([[pD.x, pD.y], [pB.x, pB.y], [pC.x, pC.y]], viz.colors.orange + '18', viz.colors.orange, 2);

                            // Compute sides
                            var ab = dist(pA.x, pA.y, pB.x, pB.y);
                            var ac = dist(pA.x, pA.y, pC.x, pC.y);
                            var db = dist(pD.x, pD.y, pB.x, pB.y);
                            var dc = dist(pD.x, pD.y, pC.x, pC.y);
                            var bc = dist(pB.x, pB.y, pC.x, pC.y);

                            // Check if AB=DB and AC=DC (then SSS with shared BC)
                            var abDB = Math.abs(ab - db) < 0.3;
                            var acDC = Math.abs(ac - dc) < 0.3;
                            var congruent = abDB && acDC;

                            var ctx = viz.ctx;

                            if (showCPCTC && congruent) {
                                // Highlight corresponding parts
                                var angA = angleBetween(pB.x, pB.y, pA.x, pA.y, pC.x, pC.y);
                                var angD = angleBetween(pB.x, pB.y, pD.x, pD.y, pC.x, pC.y);

                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.textBaseline = 'top';
                                ctx.fillStyle = viz.colors.green;
                                ctx.fillText('CPCTC:', 15, viz.height - 75);
                                ctx.fillText('AB = DB = ' + ab.toFixed(2), 15, viz.height - 55);
                                ctx.fillText('AC = DC = ' + ac.toFixed(2), 15, viz.height - 38);
                                ctx.fillText('\u2220A = \u2220D = ' + angA.toFixed(1) + '\u00B0', 15, viz.height - 21);
                            }

                            // Labels
                            viz.drawPoint(pA.x, pA.y, viz.colors.blue, 'A', 5);
                            viz.drawPoint(pB.x, pB.y, viz.colors.teal, 'B', 5);
                            viz.drawPoint(pC.x, pC.y, viz.colors.teal, 'C', 5);
                            viz.drawPoint(pD.x, pD.y, viz.colors.orange, 'D', 5);
                            viz.drawDraggables();

                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';

                            if (congruent) {
                                ctx.fillStyle = viz.colors.green;
                                ctx.fillText('\u25B3ABC \u2245 \u25B3DBC by SSS (AB=DB, AC=DC, BC=BC)', viz.width / 2, 10);
                            } else {
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText('Adjust so AB \u2248 DB and AC \u2248 DC to see congruence', viz.width / 2, 10);
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.fillText('AB=' + ab.toFixed(2) + ' DB=' + db.toFixed(2) + ' | AC=' + ac.toFixed(2) + ' DC=' + dc.toFixed(2), viz.width / 2, 32);
                            }
                        }

                        VizEngine.createButton(controls, 'Show CPCTC', function() { showCPCTC = !showCPCTC; draw(); });
                        VizEngine.createButton(controls, 'Make Congruent', function() {
                            pD.x = -pA.x;
                            pD.y = pA.y;
                            pB.x = -1.5; pB.y = -1.5;
                            pC.x = 1.5; pC.y = -1.5;
                            showCPCTC = true;
                            draw();
                        });
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
                    question: 'What does CPCTC stand for, and when can you use it?',
                    hint: 'It is used after you have already proved triangles congruent.',
                    solution: 'CPCTC stands for "Corresponding Parts of Congruent Triangles are Congruent." You can use it only <strong>after</strong> proving two triangles congruent (by SSS, SAS, ASA, or AAS).'
                },
                {
                    question: 'Given: \\(\\overline{AB} \\cong \\overline{CB}\\), \\(\\overline{AD} \\cong \\overline{CD}\\). Prove: \\(\\angle A \\cong \\angle C\\). (Hint: draw diagonal \\(\\overline{BD}\\).)',
                    hint: 'Form two triangles sharing side \\(BD\\).',
                    solution: 'In \\(\\triangle ABD\\) and \\(\\triangle CBD\\): \\(AB = CB\\) (given), \\(AD = CD\\) (given), \\(BD = BD\\) (reflexive). So \\(\\triangle ABD \\cong \\triangle CBD\\) by SSS. Therefore \\(\\angle A \\cong \\angle C\\) by CPCTC.'
                },
                {
                    question: 'In isosceles \\(\\triangle ABC\\) with \\(AB = AC\\), the angle bisector from \\(A\\) meets \\(\\overline{BC}\\) at \\(D\\). Prove \\(BD = DC\\).',
                    hint: 'Show \\(\\triangle ABD \\cong \\triangle ACD\\).',
                    solution: '\\(AB = AC\\) (given), \\(AD = AD\\) (reflexive), \\(\\angle BAD = \\angle CAD\\) (\\(AD\\) bisects \\(\\angle A\\)). By SAS, \\(\\triangle ABD \\cong \\triangle ACD\\). Therefore \\(BD = DC\\) by CPCTC.'
                },
                {
                    question: 'Can you use CPCTC as the <em>first</em> step in a proof? Why or why not?',
                    hint: 'What must you establish before using CPCTC?',
                    solution: 'No. CPCTC requires that the triangles have already been proven congruent. It is a <em>consequence</em> of congruence, not a method for establishing it.'
                }
            ]
        }
    ]
});
