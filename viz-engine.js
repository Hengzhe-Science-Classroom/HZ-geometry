// === VizEngine: Visualization toolkit for Calculus ===
class VizEngine {
    constructor(container, opts = {}) {
        const containerWidth = container.clientWidth ? container.clientWidth - 32 : 0;
        const defaultWidth = containerWidth > 560 ? Math.min(containerWidth, 900) : 560;
        this.width = opts.width || defaultWidth;
        this.height = opts.height || Math.round(this.width * 0.65);
        this.scale = opts.scale || 40;
        this.originX = opts.originX ?? this.width / 2;
        this.originY = opts.originY ?? this.height / 2;

        const dpr = window.devicePixelRatio || 1;
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        this.canvas.style.width = this.width + 'px';
        this.canvas.style.height = this.height + 'px';
        this.ctx = this.canvas.getContext('2d');
        this.ctx.scale(dpr, dpr);
        container.appendChild(this.canvas);

        this.colors = {
            bg:'#0c0c20', grid:'#1a1a40', axis:'#4a4a7a', text:'#8b949e',
            white:'#f0f6fc', blue:'#58a6ff', teal:'#3fb9a0', orange:'#f0883e',
            green:'#3fb950', purple:'#bc8cff', red:'#f85149', yellow:'#d29922', pink:'#f778ba'
        };
        this.draggables = [];
        this.animationId = null;
        this._dragBound = false;
        this.dragState = null;
    }

    toScreen(x, y) { return [this.originX + x * this.scale, this.originY - y * this.scale]; }
    toMath(sx, sy) { return [(sx - this.originX) / this.scale, (this.originY - sy) / this.scale]; }

    clear() {
        this.ctx.fillStyle = this.colors.bg;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    drawGrid(spacing = 1) {
        const ctx = this.ctx;
        const minX = Math.floor(-this.originX / this.scale / spacing) * spacing;
        const maxX = Math.ceil((this.width - this.originX) / this.scale / spacing) * spacing;
        const minY = Math.floor(-(this.height - this.originY) / this.scale / spacing) * spacing;
        const maxY = Math.ceil(this.originY / this.scale / spacing) * spacing;
        ctx.strokeStyle = this.colors.grid; ctx.lineWidth = 0.5;
        for (let x = minX; x <= maxX; x += spacing) {
            const [sx] = this.toScreen(x, 0);
            ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, this.height); ctx.stroke();
        }
        for (let y = minY; y <= maxY; y += spacing) {
            const [, sy] = this.toScreen(0, y);
            ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(this.width, sy); ctx.stroke();
        }
    }

    drawAxes() {
        const ctx = this.ctx;
        ctx.strokeStyle = this.colors.axis; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(0, this.originY); ctx.lineTo(this.width, this.originY); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(this.originX, 0); ctx.lineTo(this.originX, this.height); ctx.stroke();
        ctx.fillStyle = this.colors.text; ctx.font = '11px -apple-system,sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'top';
        const minX = Math.ceil(-this.originX / this.scale), maxX = Math.floor((this.width - this.originX) / this.scale);
        for (let x = minX; x <= maxX; x++) { if (x === 0) continue; const [sx] = this.toScreen(x, 0); ctx.fillText(x, sx, this.originY + 4); }
        ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
        const minY = Math.ceil(-(this.height - this.originY) / this.scale), maxY = Math.floor(this.originY / this.scale);
        for (let y = minY; y <= maxY; y++) { if (y === 0) continue; const [, sy] = this.toScreen(0, y); ctx.fillText(y, this.originX - 6, sy); }
    }

    drawVector(x1, y1, x2, y2, color, label, lw = 2) {
        const ctx = this.ctx;
        const [sx1, sy1] = this.toScreen(x1, y1);
        const [sx2, sy2] = this.toScreen(x2, y2);
        const dx = sx2 - sx1, dy = sy2 - sy1, len = Math.sqrt(dx * dx + dy * dy);
        if (len < 1) return;
        const angle = Math.atan2(dy, dx);
        ctx.strokeStyle = color; ctx.lineWidth = lw;
        ctx.beginPath(); ctx.moveTo(sx1, sy1); ctx.lineTo(sx2 - Math.cos(angle) * 10, sy2 - Math.sin(angle) * 10); ctx.stroke();
        ctx.fillStyle = color; ctx.beginPath();
        ctx.moveTo(sx2, sy2);
        ctx.lineTo(sx2 - 12 * Math.cos(angle - Math.PI / 6), sy2 - 12 * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(sx2 - 12 * Math.cos(angle + Math.PI / 6), sy2 - 12 * Math.sin(angle + Math.PI / 6));
        ctx.closePath(); ctx.fill();
        if (label) {
            const ux = -dy / len, uy = dx / len;
            ctx.fillStyle = color; ctx.font = 'bold 14px -apple-system,sans-serif';
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(label, (sx1 + sx2) / 2 + ux * 16, (sy1 + sy2) / 2 + uy * 16);
        }
    }

    drawPoint(x, y, color, label, r = 5) {
        const ctx = this.ctx; const [sx, sy] = this.toScreen(x, y);
        ctx.fillStyle = color; ctx.beginPath(); ctx.arc(sx, sy, r, 0, Math.PI * 2); ctx.fill();
        if (label) { ctx.fillStyle = color; ctx.font = '12px -apple-system,sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'bottom'; ctx.fillText(label, sx + r + 4, sy - r); }
    }

    drawOpenPoint(x, y, color, r = 5) {
        const ctx = this.ctx; const [sx, sy] = this.toScreen(x, y);
        ctx.strokeStyle = color; ctx.lineWidth = 2;
        ctx.fillStyle = this.colors.bg;
        ctx.beginPath(); ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke();
    }

    drawLine(x1, y1, x2, y2, color, lw = 1, dashed = false) {
        const ctx = this.ctx;
        const [sx1, sy1] = this.toScreen(x1, y1), [sx2, sy2] = this.toScreen(x2, y2);
        const dx = sx2 - sx1, dy = sy2 - sy1, len = Math.sqrt(dx * dx + dy * dy);
        if (len < 0.1) return;
        const ux = dx / len, uy = dy / len, ext = Math.max(this.width, this.height) * 2;
        ctx.strokeStyle = color; ctx.lineWidth = lw;
        if (dashed) ctx.setLineDash([6, 4]);
        ctx.beginPath(); ctx.moveTo(sx1 - ux * ext, sy1 - uy * ext); ctx.lineTo(sx2 + ux * ext, sy2 + uy * ext); ctx.stroke();
        if (dashed) ctx.setLineDash([]);
    }

    drawSegment(x1, y1, x2, y2, color, lw = 1, dashed = false) {
        const ctx = this.ctx;
        const [sx1, sy1] = this.toScreen(x1, y1), [sx2, sy2] = this.toScreen(x2, y2);
        ctx.strokeStyle = color; ctx.lineWidth = lw;
        if (dashed) ctx.setLineDash([6, 4]);
        ctx.beginPath(); ctx.moveTo(sx1, sy1); ctx.lineTo(sx2, sy2); ctx.stroke();
        if (dashed) ctx.setLineDash([]);
    }

    drawPolygon(points, fill, stroke, lw = 1) {
        const ctx = this.ctx; ctx.beginPath();
        points.forEach(([x, y], i) => { const [sx, sy] = this.toScreen(x, y); i === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy); });
        ctx.closePath();
        if (fill) { ctx.fillStyle = fill; ctx.fill(); }
        if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
    }

    drawCircle(cx, cy, r, fill, stroke, lw = 1) {
        const ctx = this.ctx; const [sx, sy] = this.toScreen(cx, cy);
        ctx.beginPath(); ctx.arc(sx, sy, r * this.scale, 0, Math.PI * 2);
        if (fill) { ctx.fillStyle = fill; ctx.fill(); }
        if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
    }

    drawEllipse(cx, cy, rx, ry, angle, fill, stroke) {
        const ctx = this.ctx; const [sx, sy] = this.toScreen(cx, cy);
        ctx.save(); ctx.translate(sx, sy); ctx.rotate(-angle);
        ctx.beginPath(); ctx.ellipse(0, 0, rx * this.scale, ry * this.scale, 0, 0, Math.PI * 2);
        if (fill) { ctx.fillStyle = fill; ctx.fill(); }
        if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1.5; ctx.stroke(); }
        ctx.restore();
    }

    drawText(text, x, y, color, size = 14, align = 'center', baseline = 'middle') {
        const ctx = this.ctx; const [sx, sy] = this.toScreen(x, y);
        ctx.fillStyle = color || this.colors.white; ctx.font = size + 'px -apple-system,sans-serif';
        ctx.textAlign = align; ctx.textBaseline = baseline; ctx.fillText(text, sx, sy);
    }

    screenText(text, px, py, color, size = 14, align = 'center', baseline = 'middle') {
        const ctx = this.ctx;
        ctx.fillStyle = color || this.colors.white; ctx.font = size + 'px -apple-system,sans-serif';
        ctx.textAlign = align; ctx.textBaseline = baseline; ctx.fillText(text, px, py);
    }

    // --- Draggables ---
    addDraggable(id, x, y, color, radius = 8, onDrag) {
        const d = { id, x, y, color, radius: radius || 8, onDrag };
        this.draggables.push(d);
        if (!this._dragBound) {
            this._dragBound = true;
            const getPos = (e) => {
                const r = this.canvas.getBoundingClientRect();
                const cx = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
                const cy = (e.touches ? e.touches[0].clientY : e.clientY) - r.top;
                return this.toMath(cx, cy);
            };
            const startDrag = (e) => {
                const [wx, wy] = getPos(e);
                for (const dr of this.draggables) {
                    if (Math.sqrt((wx - dr.x) ** 2 + (wy - dr.y) ** 2) < dr.radius / this.scale * 2.5) {
                        this.dragState = dr; e.preventDefault(); break;
                    }
                }
            };
            const moveDrag = (e) => {
                if (!this.dragState) return;
                e.preventDefault();
                const [wx, wy] = getPos(e);
                this.dragState.x = wx; this.dragState.y = wy;
                if (this.dragState.onDrag) this.dragState.onDrag(wx, wy);
            };
            const endDrag = () => { this.dragState = null; };
            this.canvas.addEventListener('mousedown', startDrag);
            this.canvas.addEventListener('mousemove', moveDrag);
            this.canvas.addEventListener('mouseup', endDrag);
            this.canvas.addEventListener('mouseleave', endDrag);
            this.canvas.addEventListener('touchstart', startDrag, { passive: false });
            this.canvas.addEventListener('touchmove', moveDrag, { passive: false });
            this.canvas.addEventListener('touchend', endDrag);
        }
        return d;
    }

    drawDraggables() {
        for (const d of this.draggables) {
            const [sx, sy] = this.toScreen(d.x, d.y);
            const ctx = this.ctx;
            ctx.fillStyle = d.color + '33'; ctx.beginPath(); ctx.arc(sx, sy, d.radius + 4, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = d.color; ctx.beginPath(); ctx.arc(sx, sy, d.radius, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#ffffff44'; ctx.beginPath(); ctx.arc(sx - 2, sy - 2, d.radius * 0.3, 0, Math.PI * 2); ctx.fill();
        }
    }

    // --- Animation ---
    animate(drawFrame) {
        const loop = (t) => { drawFrame(t); this.animationId = requestAnimationFrame(loop); };
        this.animationId = requestAnimationFrame(loop);
    }
    stopAnimation() { if (this.animationId) { cancelAnimationFrame(this.animationId); this.animationId = null; } }

    // --- UI Controls ---
    static createSlider(container, label, min, max, val, step, onChange) {
        const g = document.createElement('div'); g.className = 'viz-slider-group';
        const l = document.createElement('span'); l.className = 'viz-slider-label'; l.textContent = label;
        const s = document.createElement('input'); s.type = 'range'; s.className = 'viz-slider';
        s.min = min; s.max = max; s.value = val; s.step = step || 0.1;
        const v = document.createElement('span'); v.className = 'viz-slider-value'; v.textContent = parseFloat(val).toFixed(1);
        s.addEventListener('input', () => { v.textContent = parseFloat(s.value).toFixed(1); onChange(parseFloat(s.value)); });
        g.appendChild(l); g.appendChild(s); g.appendChild(v); container.appendChild(g);
        return s;
    }

    static createButton(container, label, onClick) {
        const b = document.createElement('button');
        b.style.cssText = 'padding:4px 12px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.78rem;cursor:pointer;';
        b.textContent = label; b.addEventListener('click', onClick); container.appendChild(b); return b;
    }

    // === Calculus-Specific Drawing Methods ===

    // Draw a function curve
    drawFunction(f, xMin, xMax, color, lw = 2, steps = 300) {
        const ctx = this.ctx;
        ctx.strokeStyle = color; ctx.lineWidth = lw;
        ctx.beginPath();
        let started = false;
        for (let i = 0; i <= steps; i++) {
            const x = xMin + (xMax - xMin) * i / steps;
            const y = f(x);
            if (!isFinite(y)) { started = false; continue; }
            const [sx, sy] = this.toScreen(x, y);
            if (!started) { ctx.moveTo(sx, sy); started = true; }
            else ctx.lineTo(sx, sy);
        }
        ctx.stroke();
    }

    // Shade area under f(x) down to x-axis
    shadeUnder(f, xMin, xMax, color, steps = 200) {
        const ctx = this.ctx;
        ctx.fillStyle = color;
        ctx.beginPath();
        const [sx0, sy0] = this.toScreen(xMin, 0);
        ctx.moveTo(sx0, sy0);
        for (let i = 0; i <= steps; i++) {
            const x = xMin + (xMax - xMin) * i / steps;
            const y = f(x);
            const [sx, sy] = this.toScreen(x, isFinite(y) ? y : 0);
            ctx.lineTo(sx, sy);
        }
        const [sxEnd, syEnd] = this.toScreen(xMax, 0);
        ctx.lineTo(sxEnd, syEnd);
        ctx.closePath();
        ctx.fill();
    }

    // Shade area between two curves
    shadeBetween(f1, f2, xMin, xMax, color, steps = 200) {
        const ctx = this.ctx;
        ctx.fillStyle = color;
        ctx.beginPath();
        for (let i = 0; i <= steps; i++) {
            const x = xMin + (xMax - xMin) * i / steps;
            const y = f1(x);
            const [sx, sy] = this.toScreen(x, isFinite(y) ? y : 0);
            i === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
        }
        for (let i = steps; i >= 0; i--) {
            const x = xMin + (xMax - xMin) * i / steps;
            const y = f2(x);
            const [sx, sy] = this.toScreen(x, isFinite(y) ? y : 0);
            ctx.lineTo(sx, sy);
        }
        ctx.closePath();
        ctx.fill();
    }

    // Draw Riemann sum rectangles
    drawRiemannSums(f, a, b, n, type, color) {
        const ctx = this.ctx;
        const dx = (b - a) / n;
        for (let i = 0; i < n; i++) {
            const xL = a + i * dx;
            const xR = xL + dx;
            let h;
            if (type === 'left') h = f(xL);
            else if (type === 'right') h = f(xR);
            else if (type === 'mid') h = f((xL + xR) / 2);
            else if (type === 'upper') h = Math.max(f(xL), f(xR));
            else if (type === 'lower') h = Math.min(f(xL), f(xR));
            else h = f(xL);
            if (!isFinite(h)) continue;
            const [sx1, sy1] = this.toScreen(xL, Math.max(h, 0));
            const [sx2, sy2] = this.toScreen(xR, Math.min(h, 0));
            const w = sx2 - sx1, ht = sy2 - sy1;
            ctx.fillStyle = color + '44';
            ctx.fillRect(sx1, sy1, w, ht);
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.strokeRect(sx1, sy1, w, ht);
        }
    }

    // Epsilon band (horizontal strip around y = L)
    drawEpsilonBand(L, epsilon, color) {
        const ctx = this.ctx;
        const [, sy1] = this.toScreen(0, L + epsilon);
        const [, sy2] = this.toScreen(0, L - epsilon);
        ctx.fillStyle = color;
        ctx.fillRect(0, sy1, this.width, sy2 - sy1);
    }

    // Delta band (vertical strip around x = a)
    drawDeltaBand(a, delta, color) {
        const ctx = this.ctx;
        const [sx1] = this.toScreen(a - delta, 0);
        const [sx2] = this.toScreen(a + delta, 0);
        ctx.fillStyle = color;
        ctx.fillRect(sx1, 0, sx2 - sx1, this.height);
    }

    // Draw parametric curve: (fx(t), fy(t)) for t in [tMin, tMax]
    drawParametric(fx, fy, tMin, tMax, color, lw = 2, steps = 500) {
        const ctx = this.ctx;
        ctx.strokeStyle = color; ctx.lineWidth = lw;
        ctx.beginPath();
        let started = false;
        for (let i = 0; i <= steps; i++) {
            const t = tMin + (tMax - tMin) * i / steps;
            const x = fx(t), y = fy(t);
            if (!isFinite(x) || !isFinite(y)) { started = false; continue; }
            const [sx, sy] = this.toScreen(x, y);
            if (!started) { ctx.moveTo(sx, sy); started = true; }
            else ctx.lineTo(sx, sy);
        }
        ctx.stroke();
    }

    // Draw polar curve: r(theta) for theta in [thetaMin, thetaMax]
    drawPolar(r, thetaMin, thetaMax, color, lw = 2, steps = 500) {
        this.drawParametric(
            t => r(t) * Math.cos(t),
            t => r(t) * Math.sin(t),
            thetaMin, thetaMax, color, lw, steps
        );
    }

    // Draw a 2D vector field: (fx(x,y), fy(x,y))
    drawVectorField(fx, fy, xMin, xMax, yMin, yMax, nx = 12, ny = 10) {
        const ctx = this.ctx;
        const dx = (xMax - xMin) / nx;
        const dy = (yMax - yMin) / ny;
        const maxLen = Math.min(dx, dy) * 0.4;
        for (let i = 0; i <= nx; i++) {
            for (let j = 0; j <= ny; j++) {
                const x = xMin + i * dx;
                const y = yMin + j * dy;
                const vx = fx(x, y), vy = fy(x, y);
                const len = Math.sqrt(vx * vx + vy * vy);
                if (len < 1e-10) continue;
                const s = Math.min(maxLen / len, maxLen);
                const ex = x + vx * s, ey = y + vy * s;
                const [sx1, sy1] = this.toScreen(x, y);
                const [sx2, sy2] = this.toScreen(ex, ey);
                const sdx = sx2 - sx1, sdy = sy2 - sy1;
                const slen = Math.sqrt(sdx * sdx + sdy * sdy);
                if (slen < 1) continue;
                const angle = Math.atan2(sdy, sdx);
                ctx.strokeStyle = this.colors.teal + 'aa'; ctx.lineWidth = 1.2;
                ctx.beginPath(); ctx.moveTo(sx1, sy1); ctx.lineTo(sx2, sy2); ctx.stroke();
                ctx.fillStyle = this.colors.teal + 'aa';
                ctx.beginPath();
                ctx.moveTo(sx2, sy2);
                ctx.lineTo(sx2 - 6 * Math.cos(angle - 0.4), sy2 - 6 * Math.sin(angle - 0.4));
                ctx.lineTo(sx2 - 6 * Math.cos(angle + 0.4), sy2 - 6 * Math.sin(angle + 0.4));
                ctx.closePath(); ctx.fill();
            }
        }
    }

    // Draw direction field for dy/dx = f(x, y)
    drawDirectionField(f, xMin, xMax, yMin, yMax, nx = 20, ny = 15) {
        const ctx = this.ctx;
        const dx = (xMax - xMin) / nx;
        const dy = (yMax - yMin) / ny;
        const segLen = Math.min(dx, dy) * 0.35;
        for (let i = 0; i <= nx; i++) {
            for (let j = 0; j <= ny; j++) {
                const x = xMin + i * dx;
                const y = yMin + j * dy;
                const slope = f(x, y);
                if (!isFinite(slope)) continue;
                const angle = Math.atan(slope);
                const ddx = segLen * Math.cos(angle);
                const ddy = segLen * Math.sin(angle);
                const [sx1, sy1] = this.toScreen(x - ddx / 2, y - ddy / 2);
                const [sx2, sy2] = this.toScreen(x + ddx / 2, y + ddy / 2);
                ctx.strokeStyle = this.colors.text;
                ctx.lineWidth = 1;
                ctx.beginPath(); ctx.moveTo(sx1, sy1); ctx.lineTo(sx2, sy2); ctx.stroke();
            }
        }
    }

    // Draw a solution curve for an ODE dy/dx = f(x,y) using Euler's method
    drawODESolution(f, x0, y0, xEnd, color, lw = 2, steps = 500) {
        const ctx = this.ctx;
        const h = (xEnd - x0) / steps;
        ctx.strokeStyle = color; ctx.lineWidth = lw;
        ctx.beginPath();
        let x = x0, y = y0;
        const [sx0, sy0] = this.toScreen(x, y);
        ctx.moveTo(sx0, sy0);
        for (let i = 0; i < steps; i++) {
            const slope = f(x, y);
            if (!isFinite(slope)) break;
            y += slope * h;
            x += h;
            if (!isFinite(y)) break;
            const [sx, sy] = this.toScreen(x, y);
            ctx.lineTo(sx, sy);
        }
        ctx.stroke();
    }

    // Draw Taylor polynomial: sum coeffs[k] * (x - x0)^k
    drawTaylorPoly(coeffs, x0, color, xMin, xMax, lw = 2, steps = 300) {
        this.drawFunction(x => {
            let sum = 0, power = 1;
            for (let k = 0; k < coeffs.length; k++) {
                sum += coeffs[k] * power;
                power *= (x - x0);
            }
            return sum;
        }, xMin, xMax, color, lw, steps);
    }

    // Draw sequence of points: seq(n) for n = 1..nMax
    drawSequence(seq, nMax, color, r = 3) {
        for (let n = 1; n <= nMax; n++) {
            const val = typeof seq === 'function' ? seq(n) : seq[n - 1];
            if (isFinite(val)) this.drawPoint(n, val, color, null, r);
        }
    }

    // Draw open interval markers
    drawOpenInterval(a, b, y, color, lw = 3) {
        this.drawSegment(a, y, b, y, color, lw);
        this.drawOpenPoint(a, y, color, 5);
        this.drawOpenPoint(b, y, color, 5);
    }

    // Draw closed interval markers
    drawClosedInterval(a, b, y, color, lw = 3) {
        this.drawSegment(a, y, b, y, color, lw);
        this.drawPoint(a, y, color, null, 5);
        this.drawPoint(b, y, color, null, 5);
    }

    // Draw horizontal band
    drawHorizontalBand(yCenter, halfWidth, color) {
        const ctx = this.ctx;
        const [, sy1] = this.toScreen(0, yCenter + halfWidth);
        const [, sy2] = this.toScreen(0, yCenter - halfWidth);
        ctx.fillStyle = color;
        ctx.fillRect(0, sy1, this.width, sy2 - sy1);
    }

    // Draw vertical band
    drawVerticalBand(xCenter, halfWidth, color) {
        const ctx = this.ctx;
        const [sx1] = this.toScreen(xCenter - halfWidth, 0);
        const [sx2] = this.toScreen(xCenter + halfWidth, 0);
        ctx.fillStyle = color;
        ctx.fillRect(sx1, 0, sx2 - sx1, this.height);
    }

    // Draw histogram bars
    drawHistogram(bins, color, strokeColor, lw = 1) {
        const ctx = this.ctx;
        for (const bin of bins) {
            const [sx1, sy1] = this.toScreen(bin.x, bin.height);
            const [sx2, sy2] = this.toScreen(bin.x + bin.width, 0);
            const w = sx2 - sx1, h = sy2 - sy1;
            if (color) { ctx.fillStyle = color; ctx.fillRect(sx1, sy1, w, h); }
            if (strokeColor) { ctx.strokeStyle = strokeColor; ctx.lineWidth = lw; ctx.strokeRect(sx1, sy1, w, h); }
        }
    }

    // --- Linear Algebra / Vector Utilities ---
    static matVec(M, v) { return [M[0][0]*v[0]+M[0][1]*v[1], M[1][0]*v[0]+M[1][1]*v[1]]; }
    static matMul(A, B) { return [[A[0][0]*B[0][0]+A[0][1]*B[1][0], A[0][0]*B[0][1]+A[0][1]*B[1][1]], [A[1][0]*B[0][0]+A[1][1]*B[1][0], A[1][0]*B[0][1]+A[1][1]*B[1][1]]]; }
    static det2(M) { return M[0][0]*M[1][1]-M[0][1]*M[1][0]; }
    static normalize(v) { const l = Math.sqrt(v[0]*v[0]+v[1]*v[1]); return l < 1e-10 ? [0,0] : [v[0]/l, v[1]/l]; }
    static vecLen(v) { return Math.sqrt(v[0]*v[0]+v[1]*v[1]); }
    static dot(u, v) { return u[0]*v[0]+u[1]*v[1]; }
    static lerp(a, b, t) { return a + (b - a) * t; }

    // --- Math Utilities for Calculus ---
    static factorial(n) { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; }

    static gamma(z) {
        if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * VizEngine.gamma(1 - z));
        z -= 1;
        const g = 7;
        const c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028,
            771.32342877765313, -176.61502916214059, 12.507343278686905,
            -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
        let x = c[0];
        for (let i = 1; i < g + 2; i++) x += c[i] / (z + i);
        const t = z + g + 0.5;
        return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
    }

    static normalPDF(x, mu = 0, sigma = 1) {
        const z = (x - mu) / sigma;
        return Math.exp(-0.5 * z * z) / (sigma * Math.sqrt(2 * Math.PI));
    }

    static erf(x) {
        const sign = x >= 0 ? 1 : -1;
        x = Math.abs(x);
        const t = 1 / (1 + 0.3275911 * x);
        const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
        return sign * y;
    }
}

window.VizEngine = VizEngine;
