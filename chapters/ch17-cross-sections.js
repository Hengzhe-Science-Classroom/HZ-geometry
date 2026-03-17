// === Chapter 17: Cross-Sections & Projections ===
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch17',
    number: 17,
    title: 'Cross-Sections & Projections',
    subtitle: 'Slicing solids, orthographic views, and Euler\'s polyhedron formula',
    sections: [
        // ============================================================
        // SECTION 1: Cross-Sections of Solids
        // ============================================================
        {
            id: 'ch17-sec01',
            title: 'Cross-Sections of Solids',
            content: `<h2>Cross-Sections of Solids</h2>

<div class="env-block definition">
<div class="env-title">Definition (Cross-Section)</div>
<div class="env-body"><p>A <strong>cross-section</strong> of a solid is the intersection of the solid with a plane. The resulting shape is a flat (2D) figure whose form depends on the solid and the angle at which the plane cuts through it.</p></div>
</div>

<div class="env-block intuition">
<div class="env-title">Why Cross-Sections Matter</div>
<div class="env-body"><p>Cross-sections appear everywhere: medical CT scans produce cross-sections of the body, contour maps show cross-sections of terrain, and engineers analyze cross-sections of beams for structural strength. Understanding cross-sections connects 2D and 3D reasoning.</p></div>
</div>

<h3>Cross-Sections of Common Solids</h3>

<p><strong>Cube / Rectangular Prism:</strong></p>
<ul>
<li>A plane parallel to a face gives a <strong>rectangle</strong> (or square) congruent to that face.</li>
<li>A diagonal plane can give a <strong>rectangle, triangle, pentagon,</strong> or <strong>hexagon</strong>.</li>
<li>The largest cross-section of a cube through its center is a regular hexagon!</li>
</ul>

<p><strong>Cylinder:</strong></p>
<ul>
<li>Parallel to the base: a <strong>circle</strong>.</li>
<li>Parallel to the axis: a <strong>rectangle</strong>.</li>
<li>At an angle: an <strong>ellipse</strong>.</li>
</ul>

<p><strong>Sphere:</strong></p>
<ul>
<li>Every cross-section of a sphere is a <strong>circle</strong>.</li>
<li>A great circle (passing through the center) has the maximum radius.</li>
</ul>

<p><strong>Cone:</strong></p>
<ul>
<li>Parallel to the base: a <strong>circle</strong> (smaller than the base).</li>
<li>Through the apex parallel to a slant: a <strong>parabola</strong>.</li>
<li>Perpendicular to the base through the apex: an <strong>isosceles triangle</strong>.</li>
<li>At other angles: an <strong>ellipse</strong> or <strong>hyperbola</strong>.</li>
</ul>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body"><p>A cylinder with radius 5 and height 10 is cut by a plane at \\(45^\\circ\\) to the base. The cross-section is an ellipse with semi-minor axis \\(a = 5\\) (the radius) and semi-major axis \\(b = 5/\\cos(45^\\circ) = 5\\sqrt{2}\\).</p></div>
</div>

<div class="viz-placeholder" data-viz="viz-cross-section-slicer"></div>`,

            visualizations: [
                {
                    id: 'viz-cross-section-slicer',
                    title: 'Cross-Section Slicer',
                    description: 'Choose a solid and adjust the cutting plane height. The cross-section shape and area are displayed.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0, height: 420 });
                        var solidType = 0; // 0=cube, 1=cylinder, 2=cone, 3=sphere
                        var sliceH = 0.5;
                        var sc = 35;
                        var ax = 0.5, ay = 0.35;

                        VizEngine.createButton(controls, 'Cube', function() { solidType = 0; draw(); });
                        VizEngine.createButton(controls, 'Cylinder', function() { solidType = 1; draw(); });
                        VizEngine.createButton(controls, 'Cone', function() { solidType = 2; draw(); });
                        VizEngine.createButton(controls, 'Sphere', function() { solidType = 3; draw(); });
                        VizEngine.createSlider(controls, 'Slice height', 0.05, 0.95, sliceH, 0.02, function(v) { sliceH = v; draw(); });

                        function project(x, y, z) {
                            var baseX = viz.width * 0.35;
                            var baseY = 330;
                            var sx = baseX + (x * sc) + (y * sc * ax);
                            var sy = baseY - (z * sc) - (y * sc * ay);
                            return [sx, sy];
                        }

                        function drawEdge(p1, p2, color, lw, dashed) {
                            var ctx = viz.ctx;
                            ctx.strokeStyle = color; ctx.lineWidth = lw || 1.5;
                            if (dashed) ctx.setLineDash([4, 4]);
                            ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]); ctx.stroke();
                            if (dashed) ctx.setLineDash([]);
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var w = viz.width;
                            var size = 4; // generic dimension
                            var H = 5; // height of solids
                            var sliceZ = sliceH * H;
                            var csInfo = '';
                            var csArea = 0;

                            // Right panel for cross-section display
                            var csPanelCx = w * 0.78;
                            var csPanelCy = viz.height / 2;

                            if (solidType === 0) {
                                // CUBE
                                var s = size;
                                var hs = s / 2;
                                H = s;
                                sliceZ = sliceH * H;

                                // 8 vertices
                                var v = [
                                    project(-hs, -hs, 0), project(hs, -hs, 0), project(hs, hs, 0), project(-hs, hs, 0),
                                    project(-hs, -hs, s), project(hs, -hs, s), project(hs, hs, s), project(-hs, hs, s)
                                ];

                                // Bottom
                                drawEdge(v[0], v[1], viz.colors.blue, 1.5);
                                drawEdge(v[1], v[2], viz.colors.blue, 1.5);
                                drawEdge(v[2], v[3], viz.colors.blue + '44', 1, true);
                                drawEdge(v[3], v[0], viz.colors.blue, 1.5);

                                // Top
                                drawEdge(v[4], v[5], viz.colors.teal, 1.5);
                                drawEdge(v[5], v[6], viz.colors.teal, 1.5);
                                drawEdge(v[6], v[7], viz.colors.teal, 1.5);
                                drawEdge(v[7], v[4], viz.colors.teal, 1.5);

                                // Verticals
                                drawEdge(v[0], v[4], viz.colors.orange + 'aa', 1);
                                drawEdge(v[1], v[5], viz.colors.orange + 'aa', 1);
                                drawEdge(v[2], v[6], viz.colors.orange + '44', 0.5, true);
                                drawEdge(v[3], v[7], viz.colors.orange + 'aa', 1);

                                // Slice plane (horizontal)
                                var sv = [
                                    project(-hs, -hs, sliceZ), project(hs, -hs, sliceZ),
                                    project(hs, hs, sliceZ), project(-hs, hs, sliceZ)
                                ];
                                ctx.fillStyle = viz.colors.green + '44';
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(sv[0][0], sv[0][1]); ctx.lineTo(sv[1][0], sv[1][1]);
                                ctx.lineTo(sv[2][0], sv[2][1]); ctx.lineTo(sv[3][0], sv[3][1]);
                                ctx.closePath(); ctx.fill(); ctx.stroke();

                                // Cross-section display (square)
                                var csSize = 50;
                                ctx.fillStyle = viz.colors.green + '44';
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 2;
                                ctx.fillRect(csPanelCx - csSize, csPanelCy - csSize, csSize * 2, csSize * 2);
                                ctx.strokeRect(csPanelCx - csSize, csPanelCy - csSize, csSize * 2, csSize * 2);

                                csInfo = 'Square: ' + s.toFixed(0) + ' x ' + s.toFixed(0);
                                csArea = s * s;

                            } else if (solidType === 1) {
                                // CYLINDER
                                var r = 2.5;
                                H = 5;
                                sliceZ = sliceH * H;
                                var n = 36;

                                // Bottom ellipse
                                ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var i = 0; i <= n; i++) {
                                    var angle = (2 * Math.PI * i) / n;
                                    var sp = project(r * Math.cos(angle), r * Math.sin(angle), 0);
                                    if (i === 0) ctx.moveTo(sp[0], sp[1]); else ctx.lineTo(sp[0], sp[1]);
                                }
                                ctx.stroke();

                                // Top ellipse
                                ctx.strokeStyle = viz.colors.teal; ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var j = 0; j <= n; j++) {
                                    var a2 = (2 * Math.PI * j) / n;
                                    var sp2 = project(r * Math.cos(a2), r * Math.sin(a2), H);
                                    if (j === 0) ctx.moveTo(sp2[0], sp2[1]); else ctx.lineTo(sp2[0], sp2[1]);
                                }
                                ctx.stroke();

                                // Side edges
                                drawEdge(project(-r, 0, 0), project(-r, 0, H), viz.colors.orange + 'aa', 1);
                                drawEdge(project(r, 0, 0), project(r, 0, H), viz.colors.orange + 'aa', 1);

                                // Slice ellipse
                                ctx.fillStyle = viz.colors.green + '44';
                                ctx.strokeStyle = viz.colors.green; ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var k = 0; k <= n; k++) {
                                    var a3 = (2 * Math.PI * k) / n;
                                    var sp3 = project(r * Math.cos(a3), r * Math.sin(a3), sliceZ);
                                    if (k === 0) ctx.moveTo(sp3[0], sp3[1]); else ctx.lineTo(sp3[0], sp3[1]);
                                }
                                ctx.closePath(); ctx.fill(); ctx.stroke();

                                // Cross-section display (circle)
                                var csR = 50;
                                ctx.fillStyle = viz.colors.green + '44';
                                ctx.strokeStyle = viz.colors.green; ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.arc(csPanelCx, csPanelCy, csR, 0, Math.PI * 2);
                                ctx.fill(); ctx.stroke();

                                csInfo = 'Circle: r = ' + r.toFixed(1);
                                csArea = Math.PI * r * r;

                            } else if (solidType === 2) {
                                // CONE
                                var cr = 3;
                                H = 5;
                                sliceZ = sliceH * H;
                                var apex = project(0, 0, H);
                                var cn = 36;

                                // Bottom ellipse
                                ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var ci = 0; ci <= cn; ci++) {
                                    var ca = (2 * Math.PI * ci) / cn;
                                    var csp = project(cr * Math.cos(ca), cr * Math.sin(ca), 0);
                                    if (ci === 0) ctx.moveTo(csp[0], csp[1]); else ctx.lineTo(csp[0], csp[1]);
                                }
                                ctx.stroke();

                                // Silhouette to apex
                                drawEdge(project(-cr, 0, 0), apex, viz.colors.orange, 2);
                                drawEdge(project(cr, 0, 0), apex, viz.colors.orange, 2);

                                ctx.fillStyle = viz.colors.red;
                                ctx.beginPath(); ctx.arc(apex[0], apex[1], 3, 0, Math.PI * 2); ctx.fill();

                                // Cross-section: circle with radius r*(1-sliceH)
                                var csRadius = cr * (1 - sliceH);
                                ctx.fillStyle = viz.colors.green + '44';
                                ctx.strokeStyle = viz.colors.green; ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var cj = 0; cj <= cn; cj++) {
                                    var ca2 = (2 * Math.PI * cj) / cn;
                                    var csp2 = project(csRadius * Math.cos(ca2), csRadius * Math.sin(ca2), sliceZ);
                                    if (cj === 0) ctx.moveTo(csp2[0], csp2[1]); else ctx.lineTo(csp2[0], csp2[1]);
                                }
                                ctx.closePath(); ctx.fill(); ctx.stroke();

                                // Cross-section display
                                var dispR = Math.max(csRadius / cr * 50, 5);
                                ctx.fillStyle = viz.colors.green + '44';
                                ctx.strokeStyle = viz.colors.green; ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.arc(csPanelCx, csPanelCy, dispR, 0, Math.PI * 2);
                                ctx.fill(); ctx.stroke();

                                csInfo = 'Circle: r = ' + csRadius.toFixed(2);
                                csArea = Math.PI * csRadius * csRadius;

                            } else {
                                // SPHERE
                                var sr = 3;
                                H = 2 * sr;
                                sliceZ = sliceH * H;
                                var sphereCenter = project(0, 0, sr);

                                // Sphere as circle
                                ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.arc(sphereCenter[0], sphereCenter[1], sr * sc, 0, Math.PI * 2); ctx.stroke();

                                // Equatorial ellipse
                                ctx.strokeStyle = viz.colors.teal + '44'; ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.ellipse(sphereCenter[0], sphereCenter[1], sr * sc, sr * sc * 0.3, 0, 0, Math.PI * 2);
                                ctx.stroke();

                                // Cross-section circle radius: sqrt(r^2 - (z-r)^2) where z is measured from bottom
                                var dFromCenter = sliceZ - sr;
                                var csRad = Math.sqrt(Math.max(sr * sr - dFromCenter * dFromCenter, 0));

                                // Draw slice position line
                                var sliceScreenY = sphereCenter[1] - dFromCenter * sc;
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.ellipse(sphereCenter[0], sliceScreenY, csRad * sc, csRad * sc * 0.3, 0, 0, Math.PI * 2);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.green + '33';
                                ctx.beginPath();
                                ctx.ellipse(sphereCenter[0], sliceScreenY, csRad * sc, csRad * sc * 0.3, 0, 0, Math.PI * 2);
                                ctx.fill();

                                // Display
                                var dispR2 = Math.max(csRad / sr * 50, 5);
                                ctx.fillStyle = viz.colors.green + '44';
                                ctx.strokeStyle = viz.colors.green; ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.arc(csPanelCx, csPanelCy, dispR2, 0, Math.PI * 2);
                                ctx.fill(); ctx.stroke();

                                csInfo = 'Circle: r = ' + csRad.toFixed(2);
                                csArea = Math.PI * csRad * csRad;
                            }

                            // Cross-section info
                            ctx.fillStyle = viz.colors.white; ctx.font = '13px -apple-system,sans-serif'; ctx.textAlign = 'center';
                            ctx.fillText('Cross-section:', csPanelCx, csPanelCy - 70);
                            ctx.fillText(csInfo, csPanelCx, csPanelCy + 70);
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.fillText('Area = ' + csArea.toFixed(2), csPanelCx, csPanelCy + 88);

                            var names = ['Cube', 'Cylinder', 'Cone', 'Sphere'];
                            viz.screenText(names[solidType] + ' | Slice at ' + (sliceH * 100).toFixed(0) + '% height', viz.width / 2, 16, viz.colors.white, 13);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'What shape is the cross-section of a cylinder when cut by a plane parallel to its base?',
                    hint: 'Every horizontal slice of a cylinder looks like the base.',
                    solution: 'A circle, congruent to the base.'
                },
                {
                    question: 'A cone has radius 6 and height 12. A horizontal plane cuts through at height 4 from the base. What is the radius of the resulting circular cross-section?',
                    hint: 'By similar triangles, the radius at height \\(z\\) is \\(r \\cdot \\frac{H - z}{H}\\).',
                    solution: 'At height 4, \\(r_{\\text{cross}} = 6 \\cdot \\frac{12-4}{12} = 6 \\cdot \\frac{2}{3} = 4\\).'
                },
                {
                    question: 'A sphere of radius 10 is cut by a plane 6 units from the center. What is the area of the cross-section?',
                    hint: 'The cross-section is a circle with radius \\(r = \\sqrt{R^2 - d^2}\\).',
                    solution: '\\(r = \\sqrt{100 - 36} = 8\\). Area = \\(\\pi(8)^2 = 64\\pi \\approx 201.1\\).'
                },
                {
                    question: 'What possible cross-sectional shapes can you get from slicing a cube with a plane?',
                    hint: 'Think about how many faces the cutting plane can intersect.',
                    solution: 'Possible cross-sections of a cube include: triangles (cutting 3 faces), quadrilaterals including squares, rectangles, and other parallelograms (cutting 4 faces), pentagons (cutting 5 faces), and hexagons including regular hexagons (cutting all 6 faces).'
                },
                {
                    question: 'A cylinder with radius \\(r\\) is cut by a plane that makes a \\(60^\\circ\\) angle with the base. What shape is the cross-section, and what are its dimensions?',
                    hint: 'The cross-section is an ellipse. One axis equals the diameter; the other is stretched by \\(1/\\cos(60^\\circ)\\).',
                    solution: 'The cross-section is an ellipse with semi-minor axis \\(r\\) and semi-major axis \\(r/\\cos(60^\\circ) = 2r\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Orthographic Projections
        // ============================================================
        {
            id: 'ch17-sec02',
            title: 'Orthographic Projections',
            content: `<h2>Orthographic Projections</h2>

<div class="env-block definition">
<div class="env-title">Definition (Orthographic Projection)</div>
<div class="env-body"><p>An <strong>orthographic projection</strong> (or <strong>orthogonal projection</strong>) represents a 3D object by showing separate 2D views from different directions, typically:
<ul>
<li><strong>Front view</strong> (elevation): looking at the front face.</li>
<li><strong>Top view</strong> (plan): looking straight down from above.</li>
<li><strong>Side view</strong> (profile): looking from the right or left side.</li>
</ul>
These three views together can uniquely determine most 3D shapes.</p></div>
</div>

<div class="env-block intuition">
<div class="env-title">Why Orthographic Views?</div>
<div class="env-body"><p>Architects, engineers, and product designers use orthographic projections because they preserve true dimensions. Unlike perspective drawings, parallel lines remain parallel and distances are not distorted. This makes it possible to read exact measurements from the drawing.</p></div>
</div>

<div class="env-block example">
<div class="env-title">Example</div>
<div class="env-body"><p>Consider an L-shaped block:
<ul>
<li><strong>Front view</strong>: an L-shape.</li>
<li><strong>Top view</strong>: a rectangle.</li>
<li><strong>Side view</strong>: a rectangle.</li>
</ul>
From these three views, we can reconstruct the full 3D shape.</p></div>
</div>

<h3>Isometric vs. Orthographic</h3>
<p><strong>Isometric projection</strong> shows all three dimensions in a single view (with axes at \\(120^\\circ\\) to each other). It gives a "3D feel" but distorts angles. <strong>Orthographic projection</strong> uses multiple true-to-scale 2D views.</p>

<div class="viz-placeholder" data-viz="viz-ortho-projection"></div>`,

            visualizations: [
                {
                    id: 'viz-ortho-projection',
                    title: 'Orthographic Views of a 3D Shape',
                    description: 'See the front, top, and side views of an L-shaped block. The 3D isometric view is shown alongside.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0, height: 420 });
                        var shapeType = 0; // 0=L-block, 1=T-block, 2=step-block

                        VizEngine.createButton(controls, 'L-block', function() { shapeType = 0; draw(); });
                        VizEngine.createButton(controls, 'T-block', function() { shapeType = 1; draw(); });
                        VizEngine.createButton(controls, 'Step-block', function() { shapeType = 2; draw(); });

                        var sc = 22;
                        var axf = 0.5, ayf = 0.35;

                        function project(x, y, z, ox, oy) {
                            return [ox + x * sc + y * sc * axf, oy - z * sc - y * sc * ayf];
                        }

                        function drawBox(x, y, z, w, d, h, ox, oy, color) {
                            var ctx = viz.ctx;
                            // 8 vertices
                            var v = [
                                project(x, y, z, ox, oy), project(x + w, y, z, ox, oy),
                                project(x + w, y + d, z, ox, oy), project(x, y + d, z, ox, oy),
                                project(x, y, z + h, ox, oy), project(x + w, y, z + h, ox, oy),
                                project(x + w, y + d, z + h, ox, oy), project(x, y + d, z + h, ox, oy)
                            ];

                            // Top face
                            ctx.fillStyle = color + '55';
                            ctx.beginPath();
                            ctx.moveTo(v[4][0], v[4][1]); ctx.lineTo(v[5][0], v[5][1]);
                            ctx.lineTo(v[6][0], v[6][1]); ctx.lineTo(v[7][0], v[7][1]);
                            ctx.closePath(); ctx.fill();
                            ctx.strokeStyle = color; ctx.lineWidth = 1.5; ctx.stroke();

                            // Front face
                            ctx.fillStyle = color + '33';
                            ctx.beginPath();
                            ctx.moveTo(v[0][0], v[0][1]); ctx.lineTo(v[1][0], v[1][1]);
                            ctx.lineTo(v[5][0], v[5][1]); ctx.lineTo(v[4][0], v[4][1]);
                            ctx.closePath(); ctx.fill();
                            ctx.strokeStyle = color; ctx.stroke();

                            // Right face
                            ctx.fillStyle = color + '44';
                            ctx.beginPath();
                            ctx.moveTo(v[1][0], v[1][1]); ctx.lineTo(v[2][0], v[2][1]);
                            ctx.lineTo(v[6][0], v[6][1]); ctx.lineTo(v[5][0], v[5][1]);
                            ctx.closePath(); ctx.fill();
                            ctx.strokeStyle = color; ctx.stroke();
                        }

                        function drawRect2D(x, y, w, h, color, label) {
                            var ctx = viz.ctx;
                            ctx.fillStyle = color + '33';
                            ctx.fillRect(x, y, w, h);
                            ctx.strokeStyle = color;
                            ctx.lineWidth = 1.5;
                            ctx.strokeRect(x, y, w, h);
                            if (label) {
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(label, x + w / 2, y - 6);
                            }
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var w = viz.width;

                            // Isometric 3D view (left)
                            var iso_ox = w * 0.22;
                            var iso_oy = 300;

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('3D Isometric View', iso_ox + 30, 20);

                            if (shapeType === 0) {
                                // L-block: base 4x2x1, tower 1x2x3
                                drawBox(0, 0, 0, 4, 2, 1, iso_ox, iso_oy, viz.colors.blue);
                                drawBox(0, 0, 1, 1, 2, 3, iso_ox, iso_oy, viz.colors.teal);
                            } else if (shapeType === 1) {
                                // T-block: base 4x2x1, tower middle 1x2x2
                                drawBox(0, 0, 0, 4, 2, 1, iso_ox, iso_oy, viz.colors.blue);
                                drawBox(1.5, 0, 1, 1, 2, 2, iso_ox, iso_oy, viz.colors.teal);
                            } else {
                                // Step-block: 3 steps
                                drawBox(0, 0, 0, 3, 2, 1, iso_ox, iso_oy, viz.colors.blue);
                                drawBox(0, 0, 1, 2, 2, 1, iso_ox, iso_oy, viz.colors.teal);
                                drawBox(0, 0, 2, 1, 2, 1, iso_ox, iso_oy, viz.colors.orange);
                            }

                            // Orthographic views (right side)
                            var viewSc = 20;
                            var frontX = w * 0.52;
                            var topX = w * 0.52;
                            var sideX = w * 0.78;

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '11px -apple-system,sans-serif';

                            if (shapeType === 0) {
                                // L-block front: L-shape (4 wide, bottom 1 tall, left column 4 tall)
                                ctx.textAlign = 'center';
                                ctx.fillText('Front View', frontX + 2 * viewSc, 48);
                                // Bottom row
                                drawRect2D(frontX, 130, 4 * viewSc, 1 * viewSc, viz.colors.blue);
                                // Left column up
                                drawRect2D(frontX, 130 - 3 * viewSc, 1 * viewSc, 3 * viewSc, viz.colors.teal);

                                // Top view: rectangle 4x2
                                ctx.fillText('Top View', topX + 2 * viewSc, 176);
                                drawRect2D(topX, 190, 4 * viewSc, 2 * viewSc, viz.colors.blue);
                                // Front strip
                                drawRect2D(topX, 190, 1 * viewSc, 2 * viewSc, viz.colors.teal);

                                // Side view: rectangle 2 wide, L-shape
                                ctx.fillText('Side View', sideX + 1 * viewSc, 48);
                                drawRect2D(sideX, 130, 2 * viewSc, 1 * viewSc, viz.colors.blue);
                                drawRect2D(sideX, 130 - 3 * viewSc, 2 * viewSc, 3 * viewSc, viz.colors.teal);

                            } else if (shapeType === 1) {
                                // T-block front: T-shape
                                ctx.textAlign = 'center';
                                ctx.fillText('Front View', frontX + 2 * viewSc, 48);
                                drawRect2D(frontX, 130, 4 * viewSc, 1 * viewSc, viz.colors.blue);
                                drawRect2D(frontX + 1.5 * viewSc, 130 - 2 * viewSc, 1 * viewSc, 2 * viewSc, viz.colors.teal);

                                // Top view
                                ctx.fillText('Top View', topX + 2 * viewSc, 176);
                                drawRect2D(topX, 190, 4 * viewSc, 2 * viewSc, viz.colors.blue);
                                drawRect2D(topX + 1.5 * viewSc, 190, 1 * viewSc, 2 * viewSc, viz.colors.teal);

                                // Side view
                                ctx.fillText('Side View', sideX + 1 * viewSc, 48);
                                drawRect2D(sideX, 130, 2 * viewSc, 1 * viewSc, viz.colors.blue);
                                drawRect2D(sideX, 130 - 2 * viewSc, 2 * viewSc, 2 * viewSc, viz.colors.teal);

                            } else {
                                // Step-block front: staircase
                                ctx.textAlign = 'center';
                                ctx.fillText('Front View', frontX + 1.5 * viewSc, 48);
                                drawRect2D(frontX, 130, 3 * viewSc, 1 * viewSc, viz.colors.blue);
                                drawRect2D(frontX, 130 - 1 * viewSc, 2 * viewSc, 1 * viewSc, viz.colors.teal);
                                drawRect2D(frontX, 130 - 2 * viewSc, 1 * viewSc, 1 * viewSc, viz.colors.orange);

                                // Top view
                                ctx.fillText('Top View', topX + 1.5 * viewSc, 176);
                                drawRect2D(topX, 190, 3 * viewSc, 2 * viewSc, viz.colors.blue);

                                // Side view
                                ctx.fillText('Side View', sideX + 1 * viewSc, 48);
                                drawRect2D(sideX, 130, 2 * viewSc, 1 * viewSc, viz.colors.blue);
                                drawRect2D(sideX, 130 - 1 * viewSc, 2 * viewSc, 1 * viewSc, viz.colors.teal);
                                drawRect2D(sideX, 130 - 2 * viewSc, 2 * viewSc, 1 * viewSc, viz.colors.orange);
                            }

                            var names = ['L-block', 'T-block', 'Step-block'];
                            viz.screenText('Shape: ' + names[shapeType] + ' | Three orthographic views reconstruct the solid', viz.width / 2, viz.height - 14, viz.colors.white, 12);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A cube has the same front, top, and side views. What are they?',
                    hint: 'All faces of a cube are squares.',
                    solution: 'Each orthographic view of a cube is a square (with the same side length as the cube edge).'
                },
                {
                    question: 'An object has a circular front view, a circular side view, and a circular top view. Must it be a sphere?',
                    hint: 'Think about other shapes that might also have circular projections.',
                    solution: 'Not necessarily. A sphere has these views, but so does a solid of revolution formed by rotating a circle about a diameter. However, only a sphere has all three circular projections of the same diameter. If they are the same size, it is indeed a sphere.'
                },
                {
                    question: 'Draw (or describe) the front, top, and side views of a right circular cylinder standing on its base.',
                    hint: 'Think about what you see from each direction.',
                    solution: 'Front view: a rectangle (width = diameter, height = h). Top view: a circle (radius = r). Side view: a rectangle (same as front view, width = diameter, height = h).'
                },
                {
                    question: 'Can two different 3D objects have the same front and top views but different side views?',
                    hint: 'Think about an L-shaped block vs. a rectangular block with a notch.',
                    solution: 'Yes. For example, a solid block 3x2x4 and an L-shaped block could share the same front and top views while having different side views. This is why all three views are typically needed to uniquely determine a shape.'
                },
                {
                    question: 'What are the orthographic views of a regular tetrahedron sitting on one face?',
                    hint: 'Look from the front, the top, and the side.',
                    solution: 'Front view: an isosceles triangle. Top view: an equilateral triangle (the base, with the apex projected inside). Side view: an isosceles triangle (possibly with different proportions from the front view depending on orientation).'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Euler's Formula (V - E + F = 2)
        // ============================================================
        {
            id: 'ch17-sec03',
            title: 'Euler\'s Formula (V - E + F = 2)',
            content: `<h2>Euler's Formula: \\(V - E + F = 2\\)</h2>

<div class="env-block theorem">
<div class="env-title">Euler's Polyhedron Formula</div>
<div class="env-body"><p>For any convex polyhedron (or more generally, any polyhedron that is topologically equivalent to a sphere):
\\[V - E + F = 2\\]
where \\(V\\) = number of vertices, \\(E\\) = number of edges, and \\(F\\) = number of faces.</p></div>
</div>

<div class="env-block intuition">
<div class="env-title">Why is This Remarkable?</div>
<div class="env-body"><p>No matter how complicated the polyhedron (as long as it has no holes), this simple relationship always holds. A cube, a tetrahedron, a dodecahedron, or any convex polyhedron with thousands of faces all satisfy \\(V - E + F = 2\\). This is a <strong>topological</strong> invariant: it depends on the "shape" of the surface, not its geometry.</p></div>
</div>

<h3>Verification with Common Polyhedra</h3>

<table style="width:100%; border-collapse: collapse; margin: 1em 0;">
<tr style="border-bottom: 1px solid #30363d;">
<th style="text-align:left; padding:6px;">Polyhedron</th>
<th style="text-align:center; padding:6px;">V</th>
<th style="text-align:center; padding:6px;">E</th>
<th style="text-align:center; padding:6px;">F</th>
<th style="text-align:center; padding:6px;">V - E + F</th>
</tr>
<tr style="border-bottom: 1px solid #30363d;">
<td style="padding:6px;">Tetrahedron</td><td style="text-align:center;">4</td><td style="text-align:center;">6</td><td style="text-align:center;">4</td><td style="text-align:center;">2</td>
</tr>
<tr style="border-bottom: 1px solid #30363d;">
<td style="padding:6px;">Cube</td><td style="text-align:center;">8</td><td style="text-align:center;">12</td><td style="text-align:center;">6</td><td style="text-align:center;">2</td>
</tr>
<tr style="border-bottom: 1px solid #30363d;">
<td style="padding:6px;">Octahedron</td><td style="text-align:center;">6</td><td style="text-align:center;">12</td><td style="text-align:center;">8</td><td style="text-align:center;">2</td>
</tr>
<tr style="border-bottom: 1px solid #30363d;">
<td style="padding:6px;">Dodecahedron</td><td style="text-align:center;">20</td><td style="text-align:center;">30</td><td style="text-align:center;">12</td><td style="text-align:center;">2</td>
</tr>
<tr>
<td style="padding:6px;">Icosahedron</td><td style="text-align:center;">12</td><td style="text-align:center;">30</td><td style="text-align:center;">20</td><td style="text-align:center;">2</td>
</tr>
</table>

<div class="env-block theorem">
<div class="env-title">Theorem (Platonic Solids)</div>
<div class="env-body"><p>There are exactly <strong>five</strong> regular polyhedra (Platonic solids):
<ol>
<li>Tetrahedron (4 triangular faces)</li>
<li>Cube (6 square faces)</li>
<li>Octahedron (8 triangular faces)</li>
<li>Dodecahedron (12 pentagonal faces)</li>
<li>Icosahedron (20 triangular faces)</li>
</ol>
Euler's formula, combined with the constraint that all faces are congruent regular polygons meeting equally at each vertex, limits the possibilities to exactly five.</p></div>
</div>

<div class="env-block example">
<div class="env-title">Example (Using Euler's Formula)</div>
<div class="env-body"><p>A polyhedron has 12 vertices and 18 edges. How many faces does it have?
\\[12 - 18 + F = 2 \\implies F = 8\\]</p></div>
</div>

<h3>The Handshaking Lemma for Polyhedra</h3>
<p>Since every edge is shared by exactly 2 faces and connects exactly 2 vertices:
\\[\\sum_{\\text{faces}} (\\text{edges per face}) = 2E \\quad \\text{and} \\quad \\sum_{\\text{vertices}} (\\text{edges per vertex}) = 2E\\]</p>

<div class="viz-placeholder" data-viz="viz-euler-verifier"></div>

<div class="viz-placeholder" data-viz="viz-platonic-solids"></div>`,

            visualizations: [
                {
                    id: 'viz-euler-verifier',
                    title: 'Euler Formula Verifier',
                    description: 'Enter V, E, F for a polyhedron and verify that V - E + F = 2.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0, height: 350 });
                        var V = 8, E = 12, F = 6;

                        VizEngine.createSlider(controls, 'Vertices V', 4, 30, V, 1, function(v) { V = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Edges E', 6, 50, E, 1, function(v) { E = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Faces F', 4, 25, F, 1, function(v) { F = Math.round(v); draw(); });

                        // Preset buttons
                        VizEngine.createButton(controls, 'Tetrahedron', function() { V = 4; E = 6; F = 4; draw(); });
                        VizEngine.createButton(controls, 'Cube', function() { V = 8; E = 12; F = 6; draw(); });
                        VizEngine.createButton(controls, 'Octahedron', function() { V = 6; E = 12; F = 8; draw(); });
                        VizEngine.createButton(controls, 'Dodecahedron', function() { V = 20; E = 30; F = 12; draw(); });
                        VizEngine.createButton(controls, 'Icosahedron', function() { V = 12; E = 30; F = 20; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var w = viz.width;
                            var h = viz.height;
                            var euler = V - E + F;

                            // Display large V - E + F
                            ctx.font = 'bold 50px -apple-system,sans-serif';
                            ctx.textAlign = 'center';

                            // V
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText(V, w * 0.15, h * 0.4);
                            ctx.font = '16px -apple-system,sans-serif';
                            ctx.fillText('Vertices', w * 0.15, h * 0.5);

                            // minus sign
                            ctx.font = 'bold 40px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('-', w * 0.28, h * 0.4);

                            // E
                            ctx.font = 'bold 50px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText(E, w * 0.42, h * 0.4);
                            ctx.font = '16px -apple-system,sans-serif';
                            ctx.fillText('Edges', w * 0.42, h * 0.5);

                            // plus sign
                            ctx.font = 'bold 40px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('+', w * 0.56, h * 0.4);

                            // F
                            ctx.font = 'bold 50px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText(F, w * 0.7, h * 0.4);
                            ctx.font = '16px -apple-system,sans-serif';
                            ctx.fillText('Faces', w * 0.7, h * 0.5);

                            // equals
                            ctx.font = 'bold 40px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('=', w * 0.82, h * 0.4);

                            // Result
                            ctx.font = 'bold 60px -apple-system,sans-serif';
                            ctx.fillStyle = euler === 2 ? viz.colors.green : viz.colors.red;
                            ctx.fillText(euler, w * 0.92, h * 0.42);

                            // Status
                            ctx.font = '18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            if (euler === 2) {
                                ctx.fillStyle = viz.colors.green;
                                ctx.fillText('Euler\'s formula satisfied! This could be a valid convex polyhedron.', w / 2, h * 0.7);
                            } else {
                                ctx.fillStyle = viz.colors.red;
                                ctx.fillText('V - E + F != 2. Not a valid convex polyhedron (or has holes).', w / 2, h * 0.7);
                            }

                            // Additional info
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('For any convex polyhedron: V - E + F = 2 (Euler, 1752)', w / 2, h * 0.82);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-platonic-solids',
                    title: 'The Five Platonic Solids',
                    description: 'Wireframe renderings of all five Platonic solids, rotating slowly.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0, height: 320 });
                        var time = 0;

                        // Platonic solid vertex data (pre-computed)
                        function getTetrahedron() {
                            var s = 1.5;
                            return {
                                vertices: [[s,s,s],[-s,-s,s],[-s,s,-s],[s,-s,-s]],
                                edges: [[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]],
                                name: 'Tetrahedron', vef: '4-6+4=2'
                            };
                        }

                        function getCube() {
                            var s = 1;
                            return {
                                vertices: [[-s,-s,-s],[s,-s,-s],[s,s,-s],[-s,s,-s],[-s,-s,s],[s,-s,s],[s,s,s],[-s,s,s]],
                                edges: [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]],
                                name: 'Cube', vef: '8-12+6=2'
                            };
                        }

                        function getOctahedron() {
                            var s = 1.4;
                            return {
                                vertices: [[s,0,0],[-s,0,0],[0,s,0],[0,-s,0],[0,0,s],[0,0,-s]],
                                edges: [[0,2],[0,3],[0,4],[0,5],[1,2],[1,3],[1,4],[1,5],[2,4],[2,5],[3,4],[3,5]],
                                name: 'Octahedron', vef: '6-12+8=2'
                            };
                        }

                        function getDodecahedron() {
                            var phi = (1 + Math.sqrt(5)) / 2;
                            var s = 0.8;
                            var a = s, b = s / phi, c = s * phi;
                            var verts = [
                                [a,a,a],[a,a,-a],[a,-a,a],[a,-a,-a],
                                [-a,a,a],[-a,a,-a],[-a,-a,a],[-a,-a,-a],
                                [0,b,c],[0,b,-c],[0,-b,c],[0,-b,-c],
                                [b,c,0],[b,-c,0],[-b,c,0],[-b,-c,0],
                                [c,0,b],[c,0,-b],[-c,0,b],[-c,0,-b]
                            ];
                            var edges = [
                                [0,8],[0,12],[0,16],[1,9],[1,12],[1,17],
                                [2,10],[2,13],[2,16],[3,11],[3,13],[3,17],
                                [4,8],[4,14],[4,18],[5,9],[5,14],[5,19],
                                [6,10],[6,15],[6,18],[7,11],[7,15],[7,19],
                                [8,10],[9,11],[12,14],[13,15],[16,17],[18,19]
                            ];
                            return { vertices: verts, edges: edges, name: 'Dodecahedron', vef: '20-30+12=2' };
                        }

                        function getIcosahedron() {
                            var phi = (1 + Math.sqrt(5)) / 2;
                            var s = 1;
                            var verts = [
                                [0,s,s*phi],[0,s,-s*phi],[0,-s,s*phi],[0,-s,-s*phi],
                                [s,s*phi,0],[s,-s*phi,0],[-s,s*phi,0],[-s,-s*phi,0],
                                [s*phi,0,s],[s*phi,0,-s],[-s*phi,0,s],[-s*phi,0,-s]
                            ];
                            var edges = [
                                [0,2],[0,4],[0,6],[0,8],[0,10],
                                [1,3],[1,4],[1,6],[1,9],[1,11],
                                [2,5],[2,7],[2,8],[2,10],
                                [3,5],[3,7],[3,9],[3,11],
                                [4,6],[4,8],[4,9],
                                [5,7],[5,8],[5,9],
                                [6,10],[6,11],
                                [7,10],[7,11],
                                [8,9],[10,11]
                            ];
                            return { vertices: verts, edges: edges, name: 'Icosahedron', vef: '12-30+20=2' };
                        }

                        var solids = [getTetrahedron(), getCube(), getOctahedron(), getDodecahedron(), getIcosahedron()];

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var w = viz.width;
                            var spacing = w / 5;

                            var cosA = Math.cos(time * 0.01);
                            var sinA = Math.sin(time * 0.01);
                            var cosB = Math.cos(time * 0.007);
                            var sinB = Math.sin(time * 0.007);

                            for (var s = 0; s < 5; s++) {
                                var solid = solids[s];
                                var cx = spacing * (s + 0.5);
                                var cy = viz.height / 2 - 20;
                                var scale = 40;

                                // Rotate and project vertices
                                var projected = [];
                                for (var v = 0; v < solid.vertices.length; v++) {
                                    var x = solid.vertices[v][0];
                                    var y = solid.vertices[v][1];
                                    var z = solid.vertices[v][2];

                                    // Rotation around Y axis
                                    var x1 = x * cosA + z * sinA;
                                    var z1 = -x * sinA + z * cosA;

                                    // Rotation around X axis
                                    var y1 = y * cosB - z1 * sinB;
                                    var z2 = y * sinB + z1 * cosB;

                                    projected.push([cx + x1 * scale, cy - y1 * scale, z2]);
                                }

                                // Draw edges
                                for (var e = 0; e < solid.edges.length; e++) {
                                    var i1 = solid.edges[e][0];
                                    var i2 = solid.edges[e][1];
                                    var avgZ = (projected[i1][2] + projected[i2][2]) / 2;
                                    var alpha = Math.max(0.3, Math.min(1, 0.5 + avgZ * 0.3));
                                    var colors = [viz.colors.blue, viz.colors.teal, viz.colors.orange, viz.colors.purple, viz.colors.green];
                                    ctx.strokeStyle = colors[s];
                                    ctx.globalAlpha = alpha;
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath();
                                    ctx.moveTo(projected[i1][0], projected[i1][1]);
                                    ctx.lineTo(projected[i2][0], projected[i2][1]);
                                    ctx.stroke();
                                }
                                ctx.globalAlpha = 1;

                                // Draw vertices
                                for (var vv = 0; vv < projected.length; vv++) {
                                    ctx.fillStyle = viz.colors.white;
                                    ctx.beginPath();
                                    ctx.arc(projected[vv][0], projected[vv][1], 2, 0, Math.PI * 2);
                                    ctx.fill();
                                }

                                // Label
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(solid.name, cx, viz.height - 36);
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.fillText(solid.vef, cx, viz.height - 20);
                            }

                            time++;
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify Euler\'s formula for a triangular prism (V, E, F = ?).',
                    hint: 'Count carefully: 2 triangular bases + 3 rectangular lateral faces.',
                    solution: 'V = 6, E = 9, F = 5 (2 triangles + 3 rectangles). Check: \\(6 - 9 + 5 = 2\\). Verified!'
                },
                {
                    question: 'A polyhedron has all triangular faces. If it has 6 vertices and 12 edges, how many faces does it have?',
                    hint: 'Use \\(V - E + F = 2\\) and verify with the handshaking lemma.',
                    solution: '\\(F = 2 - V + E = 2 - 6 + 12 = 8\\). Check: each face has 3 edges, so \\(3F = 2E\\) gives \\(3(8) = 24 = 2(12)\\). This is an octahedron.'
                },
                {
                    question: 'A soccer ball is made of 12 pentagons and 20 hexagons (a truncated icosahedron). Find V and E.',
                    hint: 'F = 32. Use the handshaking lemma: \\(12 \\times 5 + 20 \\times 6 = 2E\\). Then use Euler\'s formula for V.',
                    solution: '\\(2E = 60 + 120 = 180\\), so \\(E = 90\\). \\(V = 2 - F + E = 2 - 32 + 90 = 60\\). The soccer ball has 60 vertices and 90 edges.'
                },
                {
                    question: 'Use Euler\'s formula to prove that a convex polyhedron with all triangular faces satisfies \\(E = 3V - 6\\).',
                    hint: 'Every edge is shared by 2 faces, and every face has 3 edges, so \\(3F = 2E\\).',
                    solution: 'Since every face is a triangle, \\(3F = 2E\\), so \\(F = 2E/3\\). Substituting into \\(V - E + F = 2\\): \\(V - E + 2E/3 = 2\\), so \\(V - E/3 = 2\\), giving \\(E = 3V - 6\\).'
                }
            ]
        }
    ]
});
