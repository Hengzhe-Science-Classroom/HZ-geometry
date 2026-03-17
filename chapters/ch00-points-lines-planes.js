window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch00',
    number: 0,
    title: 'Points, Lines & Planes',
    subtitle: 'The undefined terms of geometry: building the language of space from points, lines, and planes',
    sections: [
        // ============================================================
        // SECTION 1: Points & Lines
        // ============================================================
        {
            id: 'ch00-sec01',
            title: 'Points & Lines',
            content: `<h2>Points & Lines</h2>

                <div class="env-block intuition">
                    <div class="env-title">The Big Picture</div>
                    <div class="env-body"><p>Geometry begins with three <strong>undefined terms</strong>: point, line, and plane. We do not define them from simpler ideas; instead we describe their properties and how they relate to each other. Every theorem in geometry ultimately rests on these three primitives.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Description (Point)</div>
                    <div class="env-body"><p>A <strong>point</strong> has no size, no width, no length, and no depth. It represents a single location in space. We name points with capital letters: \\(A\\), \\(B\\), \\(C\\).</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Description (Line)</div>
                    <div class="env-body"><p>A <strong>line</strong> is a straight path that extends infinitely in both directions. It has no thickness. A line is determined by any two distinct points on it. We write \\(\\overleftrightarrow{AB}\\) for the line through \\(A\\) and \\(B\\), or use a lowercase letter like \\(\\ell\\).</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Postulate (Two-Point Postulate)</div>
                    <div class="env-body"><p>Through any two distinct points, there is exactly one line.</p></div>
                </div>

                <p>This postulate tells us that two points completely determine a line. If you pick any two different points in space, one and only one line passes through both.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Collinear Points)</div>
                    <div class="env-body"><p>Points that lie on the same line are called <strong>collinear</strong>. Points that do not all lie on a single line are <strong>noncollinear</strong>.</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body"><p>Suppose \\(A\\), \\(B\\), and \\(C\\) all lie on line \\(\\ell\\). Then \\(A\\), \\(B\\), \\(C\\) are collinear. If point \\(D\\) is not on \\(\\ell\\), then \\(A\\), \\(B\\), \\(D\\) are noncollinear (assuming \\(D\\) is not on \\(\\overleftrightarrow{AB}\\)).</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-points-on-line"></div>

                <h3>The Coordinate Plane</h3>
                <p>To work with points precisely, we use the <strong>coordinate plane</strong> (also called the Cartesian plane). Each point is specified by an ordered pair \\((x, y)\\).</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Distance Formula)</div>
                    <div class="env-body"><p>The distance between two points \\(A(x_1, y_1)\\) and \\(B(x_2, y_2)\\) in the coordinate plane is
                    \\[AB = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\\]
                    This follows directly from the Pythagorean Theorem.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-distance-formula"></div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body"><p>In diagrams, we draw a point as a dot and a line as an arrow on both ends. Remember: the dot really has no size, and the line really extends forever.</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-points-on-line',
                    title: 'Points on a Line',
                    description: 'Drag points A, B, C to explore collinearity. The line through A and B is drawn; when C lies on this line, the display shows "Collinear."',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40, height: 400 });
                        var ptA = viz.addDraggable('A', -3, 1, viz.colors.blue, 10);
                        var ptB = viz.addDraggable('B', 2, -1, viz.colors.teal, 10);
                        var ptC = viz.addDraggable('C', 0, 0.5, viz.colors.orange, 10);

                        function distPointToLine(px, py, x1, y1, x2, y2) {
                            var dx = x2 - x1, dy = y2 - y1;
                            var len = Math.sqrt(dx * dx + dy * dy);
                            if (len < 0.001) return Math.sqrt((px - x1) * (px - x1) + (py - y1) * (py - y1));
                            return Math.abs(dy * px - dx * py + x2 * y1 - y2 * x1) / len;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();

                            // Draw the line through A and B
                            viz.drawLine(ptA.x, ptA.y, ptB.x, ptB.y, viz.colors.blue + '88', 2);

                            // Check collinearity
                            var d = distPointToLine(ptC.x, ptC.y, ptA.x, ptA.y, ptB.x, ptB.y);
                            var isCollinear = d < 0.2;

                            // Draw points
                            viz.drawPoint(ptA.x, ptA.y, viz.colors.blue, 'A', 6);
                            viz.drawPoint(ptB.x, ptB.y, viz.colors.teal, 'B', 6);
                            viz.drawPoint(ptC.x, ptC.y, isCollinear ? viz.colors.green : viz.colors.orange, 'C', 6);

                            viz.drawDraggables();

                            // Status display
                            var ctx = viz.ctx;
                            ctx.fillStyle = isCollinear ? viz.colors.green : viz.colors.orange;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText(isCollinear ? 'A, B, C are Collinear' : 'A, B, C are Noncollinear', viz.width / 2, 15);

                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('Distance of C from line AB: ' + d.toFixed(2), viz.width / 2, 38);
                        }

                        ptA.onDrag = function() { draw(); };
                        ptB.onDrag = function() { draw(); };
                        ptC.onDrag = function() { draw(); };
                        draw();
                        viz.animate(function() { draw(); });
                        return viz;
                    }
                },
                {
                    id: 'viz-distance-formula',
                    title: 'Distance Formula Explorer',
                    description: 'Drag points A and B in the coordinate plane. The right triangle showing the horizontal and vertical legs is drawn, and the distance is computed using the Pythagorean Theorem.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40, height: 400 });
                        var ptA = viz.addDraggable('A', -3, -1, viz.colors.blue, 10);
                        var ptB = viz.addDraggable('B', 2, 3, viz.colors.teal, 10);

                        function snap(v) { return Math.round(v * 2) / 2; }

                        function draw() {
                            ptA.x = snap(ptA.x); ptA.y = snap(ptA.y);
                            ptB.x = snap(ptB.x); ptB.y = snap(ptB.y);

                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var dx = ptB.x - ptA.x;
                            var dy = ptB.y - ptA.y;
                            var dist = Math.sqrt(dx * dx + dy * dy);

                            // Draw right triangle: horizontal leg, vertical leg, hypotenuse
                            // Corner point at (B.x, A.y)
                            var cx = ptB.x, cy = ptA.y;

                            // Horizontal leg (A to corner)
                            viz.drawSegment(ptA.x, ptA.y, cx, cy, viz.colors.orange, 2, true);
                            // Vertical leg (corner to B)
                            viz.drawSegment(cx, cy, ptB.x, ptB.y, viz.colors.green, 2, true);
                            // Hypotenuse (A to B)
                            viz.drawSegment(ptA.x, ptA.y, ptB.x, ptB.y, viz.colors.yellow, 2.5);

                            // Right angle marker at corner
                            var ctx = viz.ctx;
                            var sc = viz.toScreen(cx, cy);
                            var sqSize = 10;
                            var signX = dx >= 0 ? -1 : 1;
                            var signY = dy >= 0 ? -1 : 1;
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(sc[0] + signX * sqSize, sc[1]);
                            ctx.lineTo(sc[0] + signX * sqSize, sc[1] + signY * sqSize);
                            ctx.lineTo(sc[0], sc[1] + signY * sqSize);
                            ctx.stroke();

                            // Labels on legs
                            var midHx = (ptA.x + cx) / 2, midHy = ptA.y;
                            var midVx = cx, midVy = (cy + ptB.y) / 2;
                            viz.drawText('|dx| = ' + Math.abs(dx).toFixed(1), midHx, midHy - 0.5, viz.colors.orange, 12);
                            viz.drawText('|dy| = ' + Math.abs(dy).toFixed(1), midVx + 0.7, midVy, viz.colors.green, 12);

                            // Points
                            viz.drawPoint(ptA.x, ptA.y, viz.colors.blue, 'A(' + ptA.x.toFixed(1) + ', ' + ptA.y.toFixed(1) + ')', 6);
                            viz.drawPoint(ptB.x, ptB.y, viz.colors.teal, 'B(' + ptB.x.toFixed(1) + ', ' + ptB.y.toFixed(1) + ')', 6);
                            viz.drawDraggables();

                            // Formula display
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.fillText('AB = \u221A(' + Math.abs(dx).toFixed(1) + '\u00B2 + ' + Math.abs(dy).toFixed(1) + '\u00B2) = \u221A' + (dx * dx + dy * dy).toFixed(1) + ' = ' + dist.toFixed(2), viz.width / 2, 12);
                        }

                        ptA.onDrag = function() { draw(); };
                        ptB.onDrag = function() { draw(); };
                        draw();
                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'True or false: A point has a definite size, just very small.',
                    hint: 'Recall the description of a point in Euclidean geometry.',
                    solution: 'False. A point has <strong>no</strong> size at all. It represents only a location, with zero width, length, or depth.'
                },
                {
                    question: 'How many lines can pass through two distinct points?',
                    hint: 'Think about the Two-Point Postulate.',
                    solution: 'Exactly one. The Two-Point Postulate guarantees that through any two distinct points there is exactly one line.'
                },
                {
                    question: 'Points \\(P\\), \\(Q\\), and \\(R\\) are collinear, with \\(Q\\) between \\(P\\) and \\(R\\). If a fourth point \\(S\\) does not lie on \\(\\overleftrightarrow{PR}\\), are \\(P\\), \\(Q\\), \\(S\\) collinear?',
                    hint: 'Is \\(S\\) on line \\(\\overleftrightarrow{PQ}\\)?',
                    solution: 'Since \\(P\\), \\(Q\\), \\(R\\) are collinear, \\(\\overleftrightarrow{PQ} = \\overleftrightarrow{PR}\\). Because \\(S\\) is not on \\(\\overleftrightarrow{PR}\\), it is not on \\(\\overleftrightarrow{PQ}\\), so \\(P\\), \\(Q\\), \\(S\\) are <strong>not</strong> collinear.'
                },
                {
                    question: 'Name three undefined terms of Euclidean geometry.',
                    hint: 'These are the building blocks that we describe but never formally define.',
                    solution: 'Point, line, and plane.'
                },
                {
                    question: 'Can two different lines intersect in more than one point? Explain.',
                    hint: 'If two lines share two distinct points, what does the Two-Point Postulate say?',
                    solution: 'No. If two lines shared two distinct points, then by the Two-Point Postulate they would be the same line. Therefore two different lines can intersect in at most one point.'
                },
                {
                    question: 'Find the distance between \\(A(1, 3)\\) and \\(B(4, 7)\\).',
                    hint: 'Use the distance formula: \\(d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}\\).',
                    solution: '\\(AB = \\sqrt{(4-1)^2 + (7-3)^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Segments & Rays
        // ============================================================
        {
            id: 'ch00-sec02',
            title: 'Segments & Rays',
            content: `<h2>Segments & Rays</h2>

                <div class="env-block intuition">
                    <div class="env-title">From Lines to Segments</div>
                    <div class="env-body"><p>A line goes on forever in both directions. In practice, we often work with a <em>piece</em> of a line. A segment has two endpoints; a ray has one endpoint and extends infinitely in one direction.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Line Segment)</div>
                    <div class="env-body"><p>The <strong>line segment</strong> \\(\\overline{AB}\\) is the set of points \\(A\\), \\(B\\), and all points between \\(A\\) and \\(B\\). Its <strong>length</strong> is denoted \\(AB\\) (without the bar).</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Ray)</div>
                    <div class="env-body"><p>The <strong>ray</strong> \\(\\overrightarrow{AB}\\) starts at point \\(A\\) (the <strong>endpoint</strong>) and extends infinitely through \\(B\\). Opposite rays \\(\\overrightarrow{AB}\\) and \\(\\overrightarrow{AC}\\) share endpoint \\(A\\) and together form line \\(\\overleftrightarrow{BC}\\).</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Betweenness)</div>
                    <div class="env-body"><p>Point \\(M\\) is <strong>between</strong> \\(A\\) and \\(B\\) if \\(A\\), \\(M\\), \\(B\\) are collinear and \\(AM + MB = AB\\).</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Postulate (Segment Addition Postulate)</div>
                    <div class="env-body"><p>If \\(B\\) is between \\(A\\) and \\(C\\), then \\(AB + BC = AC\\).</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Midpoint)</div>
                    <div class="env-body"><p>The <strong>midpoint</strong> \\(M\\) of \\(\\overline{AB}\\) is the point between \\(A\\) and \\(B\\) such that \\(AM = MB\\). Equivalently, \\(M = \\left(\\frac{x_A + x_B}{2},\\; \\frac{y_A + y_B}{2}\\right)\\).</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-segment-midpoint"></div>

                <h3>Segments, Rays, and Lines Compared</h3>
                <p>It is essential to distinguish these three objects:</p>
                <ul>
                    <li>A <strong>segment</strong> \\(\\overline{AB}\\) has two endpoints and finite length.</li>
                    <li>A <strong>ray</strong> \\(\\overrightarrow{AB}\\) has one endpoint \\(A\\) and extends infinitely through \\(B\\).</li>
                    <li>A <strong>line</strong> \\(\\overleftrightarrow{AB}\\) extends infinitely in both directions.</li>
                </ul>

                <div class="viz-placeholder" data-viz="viz-seg-ray-line"></div>

                <div class="env-block example">
                    <div class="env-title">Example (Segment Addition)</div>
                    <div class="env-body"><p>If \\(B\\) is between \\(A\\) and \\(C\\) with \\(AB = 5\\) and \\(BC = 8\\), then \\(AC = AB + BC = 5 + 8 = 13\\).</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Congruent Segments)</div>
                    <div class="env-body"><p>Two segments are <strong>congruent</strong> (\\(\\overline{AB} \\cong \\overline{CD}\\)) if they have the same length (\\(AB = CD\\)). In diagrams, congruent segments are marked with the same number of tick marks.</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-segment-midpoint',
                    title: 'Segment, Midpoint & Betweenness',
                    description: 'Drag endpoints A and B. The midpoint M is computed and displayed. Drag point P to see the Segment Addition Postulate in action.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40, height: 400 });
                        var ptA = viz.addDraggable('A', -4, 1, viz.colors.blue, 10);
                        var ptB = viz.addDraggable('B', 3, -1, viz.colors.teal, 10);
                        var ptP = viz.addDraggable('P', -0.5, 0, viz.colors.orange, 10);

                        function dist(x1, y1, x2, y2) {
                            return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
                        }

                        function projectOntoSegment(px, py, ax, ay, bx, by) {
                            var dx = bx - ax, dy = by - ay;
                            var lenSq = dx * dx + dy * dy;
                            if (lenSq < 0.0001) return { x: ax, y: ay, t: 0 };
                            var t = ((px - ax) * dx + (py - ay) * dy) / lenSq;
                            t = Math.max(0, Math.min(1, t));
                            return { x: ax + t * dx, y: ay + t * dy, t: t };
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();

                            var mx = (ptA.x + ptB.x) / 2;
                            var my = (ptA.y + ptB.y) / 2;

                            // Draw the segment
                            viz.drawSegment(ptA.x, ptA.y, ptB.x, ptB.y, viz.colors.white, 2);

                            // Project P onto segment for betweenness visualization
                            var proj = projectOntoSegment(ptP.x, ptP.y, ptA.x, ptA.y, ptB.x, ptB.y);
                            var dToSeg = dist(ptP.x, ptP.y, proj.x, proj.y);
                            var isBetween = dToSeg < 0.3 && proj.t > 0.01 && proj.t < 0.99;

                            // Draw dashed line from P to its projection if not on segment
                            if (dToSeg > 0.1) {
                                viz.drawSegment(ptP.x, ptP.y, proj.x, proj.y, viz.colors.orange + '44', 1, true);
                            }

                            // Draw midpoint
                            viz.drawPoint(mx, my, viz.colors.purple, 'M', 6);

                            // Draw points
                            viz.drawPoint(ptA.x, ptA.y, viz.colors.blue, 'A', 6);
                            viz.drawPoint(ptB.x, ptB.y, viz.colors.teal, 'B', 6);
                            viz.drawPoint(ptP.x, ptP.y, viz.colors.orange, 'P', 6);
                            viz.drawDraggables();

                            var ctx = viz.ctx;
                            var ab = dist(ptA.x, ptA.y, ptB.x, ptB.y);
                            var am = ab / 2;

                            // Info display
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';

                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('AB = ' + ab.toFixed(2), 15, 15);
                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillText('AM = MB = ' + am.toFixed(2), 15, 35);

                            if (isBetween) {
                                var ap = dist(ptA.x, ptA.y, ptP.x, ptP.y);
                                var pb = dist(ptP.x, ptP.y, ptB.x, ptB.y);
                                ctx.fillStyle = viz.colors.green;
                                ctx.fillText('P is between A and B', 15, 60);
                                ctx.fillText('AP + PB = ' + ap.toFixed(2) + ' + ' + pb.toFixed(2) + ' = ' + (ap + pb).toFixed(2), 15, 80);
                            } else {
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillText('P is NOT between A and B', 15, 60);
                            }
                        }

                        ptA.onDrag = function() { draw(); };
                        ptB.onDrag = function() { draw(); };
                        ptP.onDrag = function() { draw(); };
                        draw();
                        viz.animate(function() { draw(); });
                        return viz;
                    }
                },
                {
                    id: 'viz-seg-ray-line',
                    title: 'Segment vs Ray vs Line',
                    description: 'Toggle between segment, ray, and line to see how each extends. Drag the two points to reposition.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40, height: 350 });
                        var ptA = viz.addDraggable('A', -3, 0, viz.colors.blue, 10);
                        var ptB = viz.addDraggable('B', 3, 0, viz.colors.teal, 10);
                        var mode = 'segment';

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            if (mode === 'segment') {
                                viz.drawSegment(ptA.x, ptA.y, ptB.x, ptB.y, viz.colors.yellow, 3);
                                // Endpoint dots
                                viz.drawPoint(ptA.x, ptA.y, viz.colors.blue, 'A', 7);
                                viz.drawPoint(ptB.x, ptB.y, viz.colors.teal, 'B', 7);

                                viz.screenText('Segment AB: finite, two endpoints', viz.width / 2, 18, viz.colors.yellow, 15);
                            } else if (mode === 'ray') {
                                // Draw segment then extend past B
                                viz.drawSegment(ptA.x, ptA.y, ptB.x, ptB.y, viz.colors.yellow, 3);
                                // Extend past B
                                var dx = ptB.x - ptA.x, dy = ptB.y - ptA.y;
                                var len = Math.sqrt(dx * dx + dy * dy);
                                if (len > 0.01) {
                                    var ext = 20;
                                    var ex = ptB.x + dx / len * ext;
                                    var ey = ptB.y + dy / len * ext;
                                    viz.drawSegment(ptB.x, ptB.y, ex, ey, viz.colors.yellow, 3);
                                    // Arrowhead
                                    var se = viz.toScreen(ptB.x + dx / len * 5, ptB.y + dy / len * 5);
                                    var angle = Math.atan2(-dy, dx);
                                    ctx.fillStyle = viz.colors.yellow;
                                    ctx.beginPath();
                                    ctx.moveTo(se[0] + 10 * Math.cos(angle), se[1] - 10 * Math.sin(angle));
                                    ctx.lineTo(se[0] - 8 * Math.cos(angle - 0.5), se[1] + 8 * Math.sin(angle - 0.5));
                                    ctx.lineTo(se[0] - 8 * Math.cos(angle + 0.5), se[1] + 8 * Math.sin(angle + 0.5));
                                    ctx.closePath();
                                    ctx.fill();
                                }
                                viz.drawPoint(ptA.x, ptA.y, viz.colors.blue, 'A (endpoint)', 7);
                                viz.drawPoint(ptB.x, ptB.y, viz.colors.teal, 'B', 5);

                                viz.screenText('Ray AB: one endpoint A, extends through B to infinity', viz.width / 2, 18, viz.colors.yellow, 14);
                            } else {
                                // Full line
                                viz.drawLine(ptA.x, ptA.y, ptB.x, ptB.y, viz.colors.yellow, 3);
                                viz.drawPoint(ptA.x, ptA.y, viz.colors.blue, 'A', 5);
                                viz.drawPoint(ptB.x, ptB.y, viz.colors.teal, 'B', 5);

                                viz.screenText('Line AB: extends infinitely in both directions', viz.width / 2, 18, viz.colors.yellow, 14);
                            }

                            viz.drawDraggables();

                            var d = Math.sqrt((ptB.x - ptA.x) * (ptB.x - ptA.x) + (ptB.y - ptA.y) * (ptB.y - ptA.y));
                            viz.screenText('Distance AB = ' + d.toFixed(2), viz.width / 2, viz.height - 15, viz.colors.text, 12);
                        }

                        VizEngine.createButton(controls, 'Segment', function() { mode = 'segment'; draw(); });
                        VizEngine.createButton(controls, 'Ray', function() { mode = 'ray'; draw(); });
                        VizEngine.createButton(controls, 'Line', function() { mode = 'line'; draw(); });
                        ptA.onDrag = function() { draw(); };
                        ptB.onDrag = function() { draw(); };
                        draw();
                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'If \\(M\\) is the midpoint of \\(\\overline{AB}\\) and \\(AM = 7\\), what is \\(AB\\)?',
                    hint: 'A midpoint divides a segment into two equal parts.',
                    solution: 'Since \\(M\\) is the midpoint, \\(AM = MB = 7\\), so \\(AB = AM + MB = 14\\).'
                },
                {
                    question: 'Point \\(B\\) is between \\(A\\) and \\(C\\). If \\(AB = 3x + 2\\), \\(BC = x + 6\\), and \\(AC = 28\\), find \\(x\\) and \\(BC\\).',
                    hint: 'Use the Segment Addition Postulate: \\(AB + BC = AC\\).',
                    solution: '\\((3x + 2) + (x + 6) = 28\\), so \\(4x + 8 = 28\\), giving \\(x = 5\\). Then \\(BC = 5 + 6 = 11\\).'
                },
                {
                    question: 'Explain the difference between \\(\\overline{AB}\\), \\(\\overrightarrow{AB}\\), and \\(\\overleftrightarrow{AB}\\).',
                    hint: 'Consider what each notation includes: does it stop, go one way forever, or go both ways?',
                    solution: '\\(\\overline{AB}\\) is the segment from \\(A\\) to \\(B\\) (finite length). \\(\\overrightarrow{AB}\\) is the ray starting at \\(A\\) and going through \\(B\\) to infinity. \\(\\overleftrightarrow{AB}\\) is the full line extending infinitely in both directions through \\(A\\) and \\(B\\).'
                },
                {
                    question: 'Find the midpoint of the segment with endpoints \\(A(2, 5)\\) and \\(B(8, -1)\\).',
                    hint: 'Average the \\(x\\)-coordinates and the \\(y\\)-coordinates.',
                    solution: '\\(M = \\left(\\frac{2+8}{2},\\;\\frac{5+(-1)}{2}\\right) = (5, 2)\\).'
                },
                {
                    question: 'Are opposite rays the same as a line? Explain.',
                    hint: 'Do opposite rays share an endpoint? What do they form together?',
                    solution: 'Two opposite rays share their endpoint and together cover every point on the line. So yes, opposite rays \\(\\overrightarrow{BA}\\) and \\(\\overrightarrow{BC}\\) together form line \\(\\overleftrightarrow{AC}\\).'
                },
                {
                    question: 'If \\(AM = 2x + 1\\) and \\(MB = 3x - 4\\), and \\(M\\) is the midpoint of \\(\\overline{AB}\\), find \\(x\\) and \\(AB\\).',
                    hint: 'Midpoint means \\(AM = MB\\).',
                    solution: '\\(2x + 1 = 3x - 4\\), so \\(x = 5\\). Then \\(AM = 11\\) and \\(AB = 2 \\times 11 = 22\\).'
                },
                {
                    question: 'Points \\(A\\), \\(B\\), \\(C\\) are collinear with \\(B\\) between \\(A\\) and \\(C\\). If \\(AB = 4\\) and \\(AC = 11\\), find \\(BC\\).',
                    hint: 'Use the Segment Addition Postulate.',
                    solution: '\\(AB + BC = AC\\), so \\(4 + BC = 11\\), giving \\(BC = 7\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Planes & Intersections
        // ============================================================
        {
            id: 'ch00-sec03',
            title: 'Planes & Intersections',
            content: `<h2>Planes & Intersections</h2>

                <div class="env-block definition">
                    <div class="env-title">Description (Plane)</div>
                    <div class="env-body"><p>A <strong>plane</strong> is a flat surface that extends infinitely in all directions. It has no thickness. We can name a plane using three noncollinear points on it (e.g., plane \\(ABC\\)) or by a capital script letter (e.g., plane \\(\\mathcal{P}\\)).</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Postulate (Three-Point Postulate)</div>
                    <div class="env-body"><p>Through any three noncollinear points, there is exactly one plane.</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Postulate (Flat Plane Postulate)</div>
                    <div class="env-body"><p>If two points lie in a plane, then the line containing those points lies entirely in that plane.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Coplanar)</div>
                    <div class="env-body"><p>Points that lie in the same plane are called <strong>coplanar</strong>. Points not all in the same plane are <strong>noncoplanar</strong>.</p></div>
                </div>

                <h3>Intersections</h3>

                <div class="env-block theorem">
                    <div class="env-title">Postulate (Line-Plane Intersection)</div>
                    <div class="env-body"><p>If two planes intersect, then their intersection is a line.</p></div>
                </div>

                <p>Two lines in the same plane either intersect in exactly one point or are parallel (no intersection). Two lines in different planes that do not intersect and are not parallel are called <strong>skew lines</strong>.</p>

                <div class="env-block example">
                    <div class="env-title">Example (Intersections in Everyday Life)</div>
                    <div class="env-body"><p>Consider a room. Two walls meet along a vertical edge; that edge is the line of intersection of the two planes (walls). The floor and a wall meet along a horizontal edge. Three walls might all share a single corner point; that corner is where three planes intersect.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-line-intersection"></div>

                <div class="viz-placeholder" data-viz="viz-two-planes"></div>

                <div class="env-block warning">
                    <div class="env-title">Warning</div>
                    <div class="env-body"><p>Do not assume from a drawing that lines intersect unless it is stated. Lines that appear to cross in a 2D picture may actually be skew in 3D space.</p></div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Summary of Postulates</div>
                    <div class="env-body"><p>
                    <ul>
                        <li><strong>Two-Point Postulate</strong>: Through any two distinct points, there is exactly one line.</li>
                        <li><strong>Three-Point Postulate</strong>: Through any three noncollinear points, there is exactly one plane.</li>
                        <li><strong>Flat Plane Postulate</strong>: If two points lie in a plane, the line through them lies in that plane.</li>
                        <li><strong>Plane Intersection Postulate</strong>: If two planes intersect, their intersection is a line.</li>
                    </ul></p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-line-intersection',
                    title: 'Intersection of Two Lines',
                    description: 'Drag the endpoints of two lines to see where (and whether) they intersect.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40, height: 400 });
                        var p1 = viz.addDraggable('P1', -4, -2, viz.colors.blue, 9);
                        var p2 = viz.addDraggable('P2', 3, 2, viz.colors.blue, 9);
                        var p3 = viz.addDraggable('P3', -3, 2, viz.colors.orange, 9);
                        var p4 = viz.addDraggable('P4', 4, -1, viz.colors.orange, 9);

                        function lineIntersect(x1, y1, x2, y2, x3, y3, x4, y4) {
                            var denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
                            if (Math.abs(denom) < 0.0001) return null;
                            var t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
                            return { x: x1 + t * (x2 - x1), y: y1 + t * (y2 - y1) };
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();

                            // Draw the two lines (extended)
                            viz.drawLine(p1.x, p1.y, p2.x, p2.y, viz.colors.blue, 2);
                            viz.drawLine(p3.x, p3.y, p4.x, p4.y, viz.colors.orange, 2);

                            // Compute intersection
                            var inter = lineIntersect(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);

                            // Draw control points
                            viz.drawPoint(p1.x, p1.y, viz.colors.blue, 'P', 5);
                            viz.drawPoint(p2.x, p2.y, viz.colors.blue, 'Q', 5);
                            viz.drawPoint(p3.x, p3.y, viz.colors.orange, 'R', 5);
                            viz.drawPoint(p4.x, p4.y, viz.colors.orange, 'S', 5);
                            viz.drawDraggables();

                            var ctx = viz.ctx;
                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';

                            if (inter) {
                                viz.drawPoint(inter.x, inter.y, viz.colors.green, '', 7);
                                ctx.fillStyle = viz.colors.green;
                                ctx.fillText('Intersection at (' + inter.x.toFixed(1) + ', ' + inter.y.toFixed(1) + ')', viz.width / 2, 15);
                            } else {
                                ctx.fillStyle = viz.colors.red;
                                ctx.fillText('Lines are parallel (no intersection)', viz.width / 2, 15);
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
                },
                {
                    id: 'viz-two-planes',
                    title: 'Two Planes Intersecting',
                    description: 'A 2D representation of two planes intersecting in a line. Drag the angle slider to change the intersection angle.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { scale: 40, height: 380 });
                        var angle = 0.5;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var cx = viz.width / 2, cy = viz.height / 2;

                            // Draw two parallelogram "planes" meeting at a line
                            var lineLen = 140;
                            var planeW = 120;

                            // Intersection line (vertical)
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(cx, cy - lineLen);
                            ctx.lineTo(cx, cy + lineLen);
                            ctx.stroke();

                            // Plane 1 (left)
                            var dx1 = -planeW * Math.cos(angle);
                            var dy1 = -planeW * Math.sin(angle) * 0.3;
                            ctx.fillStyle = viz.colors.blue + '33';
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(cx, cy - lineLen);
                            ctx.lineTo(cx + dx1, cy - lineLen + dy1);
                            ctx.lineTo(cx + dx1, cy + lineLen + dy1);
                            ctx.lineTo(cx, cy + lineLen);
                            ctx.closePath();
                            ctx.fill();
                            ctx.stroke();

                            // Plane 2 (right)
                            var dx2 = planeW * Math.cos(angle);
                            var dy2 = planeW * Math.sin(angle) * 0.3;
                            ctx.fillStyle = viz.colors.orange + '33';
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.moveTo(cx, cy - lineLen);
                            ctx.lineTo(cx + dx2, cy - lineLen + dy2);
                            ctx.lineTo(cx + dx2, cy + lineLen + dy2);
                            ctx.lineTo(cx, cy + lineLen);
                            ctx.closePath();
                            ctx.fill();
                            ctx.stroke();

                            // Labels
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('Plane P', cx + dx1 / 2, cy + dy1 / 2 - 20);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('Plane Q', cx + dx2 / 2, cy + dy2 / 2 - 20);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('Intersection line', cx, cy + lineLen + 25);
                        }

                        VizEngine.createSlider(controls, 'Angle', 0.2, 1.4, angle, 0.05, function(v) { angle = v; draw(); });
                        draw();
                        return viz;
                    }
                }
            ],

            exercises: [
                {
                    question: 'How many planes contain three noncollinear points?',
                    hint: 'Recall the Three-Point Postulate.',
                    solution: 'Exactly one. The Three-Point Postulate states that through any three noncollinear points there is exactly one plane.'
                },
                {
                    question: 'If two planes intersect, what is their intersection?',
                    hint: 'Think about the Line-Plane Intersection Postulate.',
                    solution: 'A line. When two planes intersect, their intersection is always a line.'
                },
                {
                    question: 'Give an example from everyday life of (a) a point, (b) a line, (c) a plane.',
                    hint: 'Think of objects that approximate these geometric ideas.',
                    solution: '(a) A star in the night sky (appears as a single location). (b) A taut string or a laser beam (appears to go in one direction). (c) The surface of a still lake or a flat tabletop (extends in two dimensions).'
                },
                {
                    question: 'Two lines in space do not intersect and are not parallel. What are they called?',
                    hint: 'This situation can only happen if the lines are in different planes.',
                    solution: 'They are called <strong>skew lines</strong>. Skew lines are non-intersecting, non-parallel lines that lie in different planes.'
                },
                {
                    question: 'True or false: Four points are always coplanar.',
                    hint: 'Three noncollinear points determine a plane, but does the fourth point have to be on it?',
                    solution: 'False. Three noncollinear points determine exactly one plane, but a fourth point may or may not lie in that plane. For example, the four vertices of a tetrahedron are not coplanar.'
                },
                {
                    question: 'How many lines are determined by four points, no three of which are collinear?',
                    hint: 'Each pair of points determines a line. How many pairs are there?',
                    solution: 'The number of pairs is \\(\\binom{4}{2} = 6\\). So four points (no three collinear) determine 6 distinct lines.'
                }
            ]
        }
    ]
});
