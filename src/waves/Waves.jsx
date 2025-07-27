// Waves.jsx
import { useRef, useEffect } from "react";
import './Waves.css';

class Grad {
  constructor(x, y) {
    this.x = x; this.y = y;
  }
  dot2(x, y) { return this.x * x + this.y * y; }
}

class Noise {
  constructor(seed = Math.random()) {
    const grad3 = [new Grad(1,1), new Grad(-1,1), new Grad(1,-1), new Grad(-1,-1), new Grad(1,0), new Grad(-1,0), new Grad(0,1), new Grad(0,-1)];
    const p = Array.from({ length: 256 }, (_, i) => i);
    this.perm = new Array(512);
    this.gradP = new Array(512);

    if (seed > 0 && seed < 1) seed *= 65536;
    seed = Math.floor(seed);
    if (seed < 256) seed |= seed << 8;

    for (let i = 0; i < 256; i++) {
      const v = (i & 1) ? (p[i] ^ (seed & 255)) : (p[i] ^ ((seed >> 8) & 255));
      this.perm[i] = this.perm[i + 256] = v;
      this.gradP[i] = this.gradP[i + 256] = grad3[v % grad3.length];
    }
  }
  fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
  lerp(a, b, t) { return (1 - t) * a + t * b; }
  perlin2(x, y) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    const n00 = this.gradP[X + this.perm[Y]].dot2(x, y);
    const n01 = this.gradP[X + this.perm[Y + 1]].dot2(x, y - 1);
    const n10 = this.gradP[X + 1 + this.perm[Y]].dot2(x - 1, y);
    const n11 = this.gradP[X + 1 + this.perm[Y + 1]].dot2(x - 1, y - 1);
    return this.lerp(
      this.lerp(n00, n10, this.fade(x)),
      this.lerp(n01, n11, this.fade(x)),
      this.fade(y)
    );
  }
}

const Waves = ({
  lineColor = "black",
  backgroundColor = "transparent",
  waveSpeedX = 0.0125,
  waveSpeedY = 0.005,
  waveAmpX = 32,
  waveAmpY = 16,
  xGap = 10,
  yGap = 32,
  style = {},
  className = ""
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const linesRef = useRef([]);
  const noise = useRef(new Noise());

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      linesRef.current = [];
      const cols = Math.ceil((width + 200) / xGap);
      const rows = Math.ceil((height + 30) / yGap);
      const xStart = (width - xGap * cols) / 2;
      const yStart = (height - yGap * rows) / 2;

      for (let i = 0; i <= cols; i++) {
        const line = [];
        for (let j = 0; j <= rows; j++) {
          line.push({ x: xStart + xGap * i, y: yStart + yGap * j, wave: {} });
        }
        linesRef.current.push(line);
      }
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.strokeStyle = lineColor;

      for (const line of linesRef.current) {
        for (let i = 0; i < line.length; i++) {
          const p = line[i];
          const noiseVal = noise.current.perlin2((p.x + time * waveSpeedX) * 0.002, (p.y + time * waveSpeedY) * 0.0015) * 12;
          const x = p.x + Math.cos(noiseVal) * waveAmpX;
          const y = p.y + Math.sin(noiseVal) * waveAmpY;
          ctx[i === 0 ? 'moveTo' : 'lineTo'](x, y);
        }
      }

      ctx.stroke();
      requestAnimationFrame(draw);
    };

    resize();
    requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [lineColor, waveSpeedX, waveSpeedY, waveAmpX, waveAmpY, xGap, yGap]);

  return (
    <div
      ref={containerRef}
      className={`waves ${className}`}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "hidden", backgroundColor, ...style }}
    >
      <canvas ref={canvasRef} className="waves-canvas" />
    </div>
  );
};

export default Waves;
