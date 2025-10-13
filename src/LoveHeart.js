import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const LoveHeart = () => {
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // ⏰ Giữ tim hiển thị 7 giây rồi mới chuyển trang
    const timer = setTimeout(() => {
      // SỬA LỖI Ở ĐÂY: Đảm bảo nó chuyển đến "/letter"
      navigate("/letter");
    }, 7000);

    // ========== HIỆU ỨNG CANVAS (Giữ nguyên) ==========
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const rand = Math.random;

    const isDevice =
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        (navigator.userAgent || navigator.vendor || window.opera).toLowerCase()
      );
    const mobile = isDevice;
    const koef = mobile ? 0.5 : 1;

    const heartPosition = (rad) => [
      Math.pow(Math.sin(rad), 3),
      -(
        15 * Math.cos(rad) -
        5 * Math.cos(2 * rad) -
        2 * Math.cos(3 * rad) -
        Math.cos(4 * rad)
      ),
    ];

    const scaleAndTranslate = (pos, sx, sy, dx, dy) => [
      dx + pos[0] * sx,
      dy + pos[1] * sy,
    ];

    let animationFrameId;

    const resize = () => {
      width = canvas.width = koef * window.innerWidth;
      height = canvas.height = koef * window.innerHeight;
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fillRect(0, 0, width, height);
    };

    window.addEventListener("resize", resize);
    resize();

    const traceCount = mobile ? 20 : 50;
    const pointsOrigin = [];
    let dr = mobile ? 0.3 : 0.1;
    for (let i = 0; i < Math.PI * 2; i += dr)
      pointsOrigin.push(scaleAndTranslate(heartPosition(i), 210, 13, 0, 0));
    for (let i = 0; i < Math.PI * 2; i += dr)
      pointsOrigin.push(scaleAndTranslate(heartPosition(i), 150, 9, 0, 0));
    for (let i = 0; i < Math.PI * 2; i += dr)
      pointsOrigin.push(scaleAndTranslate(heartPosition(i), 90, 5, 0, 0));
    const heartPointsCount = pointsOrigin.length;

    const targetPoints = [];
    const pulse = (kx, ky) => {
      for (let i = 0; i < pointsOrigin.length; i++) {
        targetPoints[i] = [];
        targetPoints[i][0] = kx * pointsOrigin[i][0] + width / 2;
        targetPoints[i][1] = ky * pointsOrigin[i][1] + height / 2;
      }
    };

    const e = [];
    for (let i = 0; i < heartPointsCount; i++) {
      const x = rand() * width;
      const y = rand() * height;
      e[i] = {
        vx: 0,
        vy: 0,
        R: 2,
        speed: rand() + 5,
        q: ~~(rand() * heartPointsCount),
        D: 2 * (i % 2) - 1,
        force: 0.2 * rand() + 0.7,
        f: `hsla(0,${~~(40 * rand() + 60)}%,${~~(60 * rand() + 20)}%,.3)`,
        trace: [],
      };
      for (let k = 0; k < traceCount; k++) e[i].trace[k] = { x, y };
    }

    const config = { traceK: 0.4, timeDelta: 0.01 };
    let time = 0;

    const loop = () => {
      const n = -Math.cos(time);
      pulse((1 + n) * 0.5, (1 + n) * 0.5);
      time += (Math.sin(time) < 0 ? 9 : n > 0.8 ? 0.2 : 1) * config.timeDelta;
      ctx.fillStyle = "rgba(0,0,0,.1)";
      ctx.fillRect(0, 0, width, height);

      for (let i = e.length; i--; ) {
        const u = e[i];
        const q = targetPoints[u.q];
        const dx = u.trace[0].x - q[0];
        const dy = u.trace[0].y - q[1];
        const length = Math.sqrt(dx * dx + dy * dy);
        if (10 > length) {
          if (0.95 < rand()) u.q = ~~(rand() * heartPointsCount);
          else {
            if (0.99 < rand()) u.D *= -1;
            u.q += u.D;
            u.q %= heartPointsCount;
            if (u.q < 0) u.q += heartPointsCount;
          }
        }
        u.vx += (-dx / length) * u.speed;
        u.vy += (-dy / length) * u.speed;
        u.trace[0].x += u.vx;
        u.trace[0].y += u.vy;
        u.vx *= u.force;
        u.vy *= u.force;
        for (let k = 0; k < u.trace.length - 1; ) {
          const T = u.trace[k];
          const N = u.trace[++k];
          N.x -= config.traceK * (N.x - T.x);
          N.y -= config.traceK * (N.y - T.y);
        }
        ctx.fillStyle = u.f;
        for (let k = 0; k < u.trace.length; k++) {
          ctx.fillRect(u.trace[k].x, u.trace[k].y, 1, 1);
        }
      }
      animationFrameId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [navigate]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      <canvas ref={canvasRef} id="heart" />
    </div>
  );
};

export default LoveHeart;