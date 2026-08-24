"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const pad = (value: number) => String(value).padStart(2, "0");

const climateBars = [34, 42, 38, 46, 51, 47, 58, 64, 61, 70, 66, 74, 71, 78, 74, 69, 72, 65, 68, 61, 64, 58, 61, 54];

const lohansungLeaves = [
  { x: -7, y: 278, r: -88, s: 0.72 }, { x: 8, y: 270, r: -18, s: 0.74 },
  { x: -14, y: 252, r: -128, s: 0.8 }, { x: 13, y: 246, r: 22, s: 0.82 },
  { x: -17, y: 228, r: -146, s: 0.9 }, { x: 16, y: 224, r: 38, s: 0.88 },
  { x: -20, y: 204, r: -158, s: 0.96 }, { x: 20, y: 198, r: 48, s: 0.94 },
  { x: -23, y: 181, r: -166, s: 1 }, { x: 24, y: 176, r: 55, s: 1 },
  { x: -25, y: 157, r: -171, s: 1.04 }, { x: 25, y: 152, r: 61, s: 1.03 },
  { x: -25, y: 133, r: -176, s: 1.02 }, { x: 26, y: 128, r: 67, s: 1.04 },
  { x: -24, y: 110, r: -181, s: 0.98 }, { x: 25, y: 105, r: 72, s: 1 },
  { x: -22, y: 88, r: -186, s: 0.94 }, { x: 23, y: 82, r: 78, s: 0.96 },
  { x: -19, y: 67, r: -192, s: 0.88 }, { x: 20, y: 62, r: 84, s: 0.9 },
  { x: -13, y: 48, r: -199, s: 0.82 }, { x: 15, y: 43, r: 92, s: 0.84 },
  { x: -8, y: 31, r: -208, s: 0.72 }, { x: 10, y: 26, r: 102, s: 0.74 },
];

const lohansungBranches = [
  { x: -4, y: 106, r: -28, h: 76 },
  { x: 4, y: 128, r: 26, h: 82 },
  { x: -3, y: 166, r: -22, h: 69 },
  { x: 3, y: 198, r: 20, h: 66 },
];

export default function Home() {
  const [now, setNow] = useState<Date | null>(null);
  const [plantTilt, setPlantTilt] = useState({ x: 0, y: 0 });
  const [isPlantAwake, setPlantAwake] = useState(false);
  const plantRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    const awake = window.setTimeout(() => setPlantAwake(true), 650);
    return () => {
      window.clearInterval(timer);
      window.clearTimeout(awake);
    };
  }, []);

  const time = now ? `${pad(now.getHours())}:${pad(now.getMinutes())}` : "--:--";
  const seconds = now ? pad(now.getSeconds()) : "--";
  const date = useMemo(
    () => now ? new Intl.DateTimeFormat("en-MY", { weekday: "short", day: "2-digit", month: "short" }).format(now) : "Local time",
    [now],
  );

  function respondToPointer(event: React.PointerEvent<HTMLDivElement>) {
    const box = plantRef.current?.getBoundingClientRect();
    if (!box) return;
    setPlantTilt({
      x: ((event.clientY - box.top) / box.height - 0.5) * -7,
      y: ((event.clientX - box.left) / box.width - 0.5) * 10,
    });
  }

  return (
    <main className="dashboard-shell">
      <header className="topbar neu-raised">
        <div className="brand-block">
          <div className="brand-mark" aria-hidden="true"><span /></div>
          <div>
            <div className="brand">VERDANT<span>.OS</span></div>
            <div className="eyebrow">SMART PLANT CARE</div>
          </div>
        </div>

        <div className="status-pill neu-inset" aria-label="System connection status">
          <span className="signal-bars" aria-hidden="true"><i /><i /><i /><i /></span>
          <span className="online-dot" />
          <b>ESP32 ONLINE</b>
          <span className="separator" />
          <span>SYNCED 4 SEC AGO</span>
        </div>

        <div className="clock-block">
          <div className="clock"><span>{time}</span><sup>{seconds}</sup></div>
          <div className="clock-meta"><span>{date.toUpperCase()}</span><span>MYT</span></div>
        </div>
      </header>

      <section className="dashboard-grid">
        <article className="plant-panel neu-raised">
          <div className="panel-topline">
            <div>
              <div className="eyebrow">PLANT PROFILE / 01</div>
              <h1>Anak Pokok Lohansung</h1>
              <p className="species">Podocarpus macrophyllus · young specimen</p>
            </div>
            <div className="live-tag neu-inset"><span /> LIVE</div>
          </div>

          <div
            className={`plant-stage neu-inset ${isPlantAwake ? "is-awake" : ""}`}
            ref={plantRef}
            onPointerMove={respondToPointer}
            onPointerEnter={() => setPlantAwake(true)}
            onPointerLeave={() => setPlantTilt({ x: 0, y: 0 })}
            style={{ "--tilt-x": `${plantTilt.x}deg`, "--tilt-y": `${plantTilt.y}deg` } as React.CSSProperties}
            aria-label="Interactive young Lohansung, Podocarpus macrophyllus, plant model"
          >
            <div className="plant-halo" />
            <div className="orbit orbit-a" />
            <div className="orbit orbit-b" />

            <div className="lohansung-model">
              <div className="trunk" />
              {lohansungBranches.map((branch, index) => (
                <i
                  className="lohansung-branch"
                  key={`branch-${index}`}
                  style={{
                    "--branch-x": `${branch.x}px`,
                    "--branch-y": `${branch.y}px`,
                    "--branch-r": `${branch.r}deg`,
                    "--branch-h": `${branch.h}px`,
                  } as React.CSSProperties}
                />
              ))}
              {lohansungLeaves.map((leaf, index) => (
                <span
                  className="lohansung-leaf"
                  key={`leaf-${index}`}
                  style={{
                    "--leaf-x": `${leaf.x}px`,
                    "--leaf-y": `${leaf.y}px`,
                    "--leaf-r": `${leaf.r}deg`,
                    "--leaf-s": leaf.s,
                  } as React.CSSProperties}
                />
              ))}
              <div className="new-growth"><i /><i /><i /></div>
              <div className="soil-disc" />
              <div className="pot-rim" />
              <div className="pot"><span /></div>
              <div className="pot-shadow" />
            </div>

            <div className="plant-sensor sensor-a neu-chip"><span>SOIL</span><b>64%</b></div>
            <div className="plant-sensor sensor-b neu-chip"><span>ROOT ZONE</span><b>23.8°C</b></div>
          </div>

          <div className="hydration-strip">
            <div className="hydration-copy-block">
              <div className="hydration-number">78<span>%</span></div>
              <div><div className="metric-label">PLANT HYDRATION</div><p>Well hydrated · stable uptake</p></div>
            </div>
            <div className="hydration-bar neu-inset" role="progressbar" aria-label="Plant hydration" aria-valuenow={78} aria-valuemin={0} aria-valuemax={100}><span style={{ width: "78%" }} /></div>
          </div>
        </article>

        <section className="metrics-column" aria-label="Sensor readings">
          <article className="climate-card neu-raised">
            <div className="card-heading">
              <span className="metric-icon neu-inset">01</span>
              <div><div className="metric-label">AIR CLIMATE</div><p>Ambient enclosure</p></div>
              <span className="fresh-dot" />
            </div>
            <div className="climate-readings">
              <div><span className="reading">28.4</span><span className="unit">°C</span><small>TEMPERATURE</small></div>
              <div className="climate-divider" />
              <div><span className="reading">72</span><span className="unit">%</span><small>AIR HUMIDITY</small></div>
            </div>
            <div className="mini-chart neu-inset" aria-label="24 hour climate trend">
              {climateBars.map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
            </div>
            <div className="chart-axis"><span>00:00</span><span>12:00</span><span>NOW</span></div>
          </article>

          <div className="split-metrics">
            <article className="metric-card neu-raised">
              <div className="card-heading"><span className="metric-icon neu-inset">02</span><div><div className="metric-label">SOIL MOISTURE</div><p>Capacitive probe</p></div></div>
              <div className="radial-wrap">
                <div className="radial-gauge neu-inset" style={{ "--value": 64 } as React.CSSProperties}><div><strong>64</strong><span>%</span><small>OPTIMAL</small></div></div>
              </div>
              <div className="metric-foot"><span>Target 55–75%</span><b>+2.1%</b></div>
            </article>

            <article className="metric-card neu-raised">
              <div className="card-heading"><span className="metric-icon neu-inset">03</span><div><div className="metric-label">WATER TANK</div><p>Ultrasonic level</p></div></div>
              <div className="tank-visual">
                <div className="tank-shell neu-inset"><div className="water-fill"><span /></div></div>
                <div className="tank-value"><strong>72</strong><span>%</span><small>4.6 L REMAINING</small></div>
              </div>
              <div className="metric-foot"><span>Est. 6 days</span><b>GOOD</b></div>
            </article>
          </div>

          <article className="battery-card neu-raised">
            <div className="battery-main">
              <div className="card-heading"><span className="metric-icon neu-inset">04</span><div><div className="metric-label">ENERGY SYSTEM</div><p>Solar + Li-ion</p></div></div>
              <div className="battery-reading"><strong>88</strong><span>%</span></div>
            </div>
            <div className="energy-flow">
              <div className="energy-source"><span className="sun-icon neu-inset">✦</span><div><small>SOLAR INPUT</small><b>1.8 W</b></div></div>
              <div className="flow-line"><i /><i /><i /></div>
              <div className="battery-icon neu-inset"><span style={{ width: "88%" }} /></div>
            </div>
            <div className="metric-foot battery-foot"><span>Charging · 4.12 V</span><b>+0.6 W NET</b></div>
          </article>
        </section>
      </section>

      <footer className="system-strip neu-raised">
        <div className="system-state"><span className="pulse-core" /><div><div className="metric-label">SYSTEM STATE</div><b>AUTO MONITORING</b></div></div>
        <div className="strip-divider" />
        <div className="watering-info"><span>NEXT WATERING</span><b>18:30</b><small>in 02h 14m</small></div>
        <div className="strip-divider" />
        <div className="pump-line"><span className="pump-node neu-inset">PUMP</span><i /><span className="soil-node neu-inset">ROOT ZONE</span></div>
        <div className="strip-divider" />
        <div className="device-info"><span>DEVICE</span><b>WPS-01</b><small>Firmware 1.4.2</small></div>
      </footer>
    </main>
  );
}
