"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const pad = (value: number) => String(value).padStart(2, "0");

export default function Home() {
  const [now, setNow] = useState<Date | null>(null);
  const [plantTilt, setPlantTilt] = useState({ x: 0, y: 0 });
  const [isPlantAwake, setPlantAwake] = useState(false);
  const plantRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    const awake = window.setTimeout(() => setPlantAwake(true), 700);
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
      x: ((event.clientY - box.top) / box.height - 0.5) * -9,
      y: ((event.clientX - box.left) / box.width - 0.5) * 13,
    });
  }

  return (
    <main className="dashboard-shell">
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-mark" aria-hidden="true"><span /></div>
          <div>
            <div className="brand">VERDANT<span>.OS</span></div>
            <div className="eyebrow">PLANT CARE SYSTEM</div>
          </div>
        </div>

        <div className="topbar-center" aria-label="System status">
          <span className="signal-bars" aria-hidden="true"><i /><i /><i /><i /></span>
          <span className="online-dot" />
          <span>ESP32 ONLINE</span>
          <span className="separator" />
          <span>SYNCED 4 SEC AGO</span>
        </div>

        <div className="clock-block">
          <div className="clock"><span>{time}</span><sup>{seconds}</sup></div>
          <div className="clock-meta"><span>{date.toUpperCase()}</span><span>MYT</span></div>
        </div>
      </header>

      <section className="dashboard-grid">
        <article className="plant-panel panel">
          <div className="panel-topline">
            <div>
              <div className="eyebrow">PLANT PROFILE / 01</div>
              <h1>Anak Pokok Lohansung</h1>
            </div>
            <div className="live-tag"><span /> LIVE</div>
          </div>

          <div
            className={`plant-stage ${isPlantAwake ? "is-awake" : ""}`}
            ref={plantRef}
            onPointerMove={respondToPointer}
            onPointerEnter={() => setPlantAwake(true)}
            onPointerLeave={() => setPlantTilt({ x: 0, y: 0 })}
            style={{ "--tilt-x": `${plantTilt.x}deg`, "--tilt-y": `${plantTilt.y}deg` } as React.CSSProperties}
            aria-label="Animated three dimensional young Lohansung plant. Move the pointer over the plant to make it respond."
          >
            <div className="orbital-ring ring-one" />
            <div className="orbital-ring ring-two" />
            <div className="scan-line" />
            <div className="plant-model">
              <div className="leaf leaf-1"><span /></div>
              <div className="leaf leaf-2"><span /></div>
              <div className="leaf leaf-3"><span /></div>
              <div className="leaf leaf-4"><span /></div>
              <div className="leaf leaf-5"><span /></div>
              <div className="leaf leaf-6"><span /></div>
              <div className="leaf leaf-7"><span /></div>
              <div className="stem stem-1" />
              <div className="stem stem-2" />
              <div className="stem stem-3" />
              <div className="stem stem-4" />
              <div className="pot-rim" />
              <div className="pot"><span /></div>
              <div className="pot-shadow" />
            </div>
            <div className="plant-sensor sensor-a"><span>SOIL</span><b>64%</b></div>
            <div className="plant-sensor sensor-b"><span>ROOT ZONE</span><b>23.8°C</b></div>
          </div>

          <div className="plant-footer">
            <div className="hydration-block">
              <div className="hydration-number">78<span>%</span></div>
              <div><div className="metric-label">PLANT HYDRATION</div><div className="hydration-copy">Well hydrated · stable</div></div>
            </div>
            <div className="hydration-track" role="progressbar" aria-label="Plant hydration" aria-valuenow={78} aria-valuemin={0} aria-valuemax={100}><span style={{ width: "78%" }} /></div>
          </div>
        </article>

        <section className="metrics-column" aria-label="Sensor readings">
          <article className="climate-card panel">
            <div className="card-heading"><span className="metric-index">01</span><div><div className="metric-label">AIR CLIMATE</div><p>Ambient enclosure</p></div><span className="fresh-dot" /></div>
            <div className="climate-readings">
              <div><span className="reading">28.4</span><span className="unit">°C</span><small>TEMPERATURE</small></div>
              <div className="climate-divider" />
              <div><span className="reading">72</span><span className="unit">%</span><small>AIR HUMIDITY</small></div>
            </div>
            <div className="mini-chart" aria-label="24 hour climate trend">
              {[32,37,35,44,42,52,49,60,58,66,63,72,68,74,70,64,66,58,61,55,58,52,55,48].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}
            </div>
            <div className="chart-axis"><span>00:00</span><span>12:00</span><span>NOW</span></div>
          </article>

          <div className="split-metrics">
            <article className="metric-card panel soil-card">
              <div className="card-heading"><span className="metric-index">02</span><div><div className="metric-label">SOIL MOISTURE</div><p>Capacitive probe</p></div></div>
              <div className="radial-gauge" style={{ "--value": 64 } as React.CSSProperties}><div><strong>64</strong><span>%</span><small>OPTIMAL</small></div></div>
              <div className="metric-foot"><span>Target 55–75%</span><b>+2.1%</b></div>
            </article>

            <article className="metric-card panel tank-card">
              <div className="card-heading"><span className="metric-index">03</span><div><div className="metric-label">WATER TANK</div><p>Ultrasonic level</p></div></div>
              <div className="tank-visual"><div className="tank-shell"><div className="water-fill"><span /><span /></div></div><div className="tank-value"><strong>72</strong><span>%</span><small>4.6 L REMAINING</small></div></div>
              <div className="metric-foot"><span>Est. 6 days</span><b>GOOD</b></div>
            </article>
          </div>

          <article className="battery-card panel">
            <div className="battery-main">
              <div className="card-heading"><span className="metric-index">04</span><div><div className="metric-label">ENERGY SYSTEM</div><p>Solar + Li-ion battery</p></div></div>
              <div className="battery-reading"><strong>88</strong><span>%</span></div>
            </div>
            <div className="energy-flow">
              <div className="energy-source"><span className="sun-icon">✦</span><div><small>SOLAR INPUT</small><b>1.8 W</b></div></div>
              <div className="flow-line"><i /><i /><i /></div>
              <div className="battery-icon"><span style={{ width: "88%" }} /></div>
            </div>
            <div className="charge-track"><span style={{ width: "88%" }} /></div>
            <div className="metric-foot"><span>Charging · 4.12 V</span><b>+0.6 W NET</b></div>
          </article>
        </section>
      </section>

      <footer className="system-strip panel">
        <div className="system-state"><span className="pulse-core" /><div><div className="metric-label">SYSTEM STATE</div><b>AUTO MONITORING</b></div></div>
        <div className="strip-divider" />
        <div className="watering-info"><span>NEXT WATERING</span><b>18:30</b><small>in 02h 14m</small></div>
        <div className="strip-divider" />
        <div className="pump-line"><span className="pump-node">PUMP</span><i /><span className="soil-node">ROOT ZONE</span></div>
        <div className="strip-divider" />
        <div className="device-info"><span>DEVICE</span><b>WPS-01</b><small>Firmware 1.4.2</small></div>
      </footer>
    </main>
  );
}
