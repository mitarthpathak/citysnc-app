'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Activity,
  AirVent,
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Bell,
  Car,
  ChevronRight,
  CloudRain,
  Droplets,
  Globe2,
  Layers3,
  LocateFixed,
  MapPin,
  Menu,
  Moon,
  Radio,
  Sun,
  Thermometer,
  Users,
  Waves,
  X,
  Zap,
} from 'lucide-react'

const events = [
  { place: 'Pacific Ocean', type: 'Earthquake', detail: 'M 5.8 · 43 km depth', time: '2m ago', tone: 'rose', x: '71%', y: '40%' },
  { place: 'Jaipur, India', type: 'Traffic', detail: 'Moderate congestion near Amer Fort', time: '4m ago', tone: 'amber', x: '64%', y: '56%' },
  { place: 'Tokyo, Japan', type: 'Air quality', detail: 'AQI 118 · Unhealthy for sensitive groups', time: '7m ago', tone: 'amber', x: '84%', y: '36%' },
  { place: 'Lisbon, Portugal', type: 'Weather', detail: 'Heavy rain warning', time: '12m ago', tone: 'blue', x: '43%', y: '39%' },
]

const metrics = [
  { label: 'Air quality', value: '86', unit: 'AQI', note: 'Moderate', icon: AirVent, tone: 'amber', trend: '↑ 8%' },
  { label: 'Temperature', value: '31°', unit: 'C', note: 'Feels like 34°', icon: Thermometer, tone: 'neutral', trend: '↑ 2°' },
  { label: 'Traffic', value: 'Moderate', unit: '', note: 'Amer Fort corridor', icon: Car, tone: 'amber', trend: '↑ 12%' },
  { label: 'Incidents', value: '1', unit: 'active', note: 'Power complaint', icon: Zap, tone: 'rose', trend: 'new' },
  { label: 'Crowd level', value: 'Quiet', unit: '', note: 'Amer Fort · 34%', icon: Users, tone: 'blue', trend: '↓ 6%' },
]

function Sparkline({ tone = 'neutral' }: { tone?: string }) {
  const colors: Record<string, string> = { amber: '#d97706', rose: '#e11d48', blue: '#2563eb', neutral: '#64748b' }
  return (
    <svg className="sparkline" viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden="true">
      <path d="M1 18 C 12 17, 14 12, 23 15 S 34 20, 42 13 S 55 9, 62 12 S 75 6, 82 9 S 92 4, 99 6" fill="none" stroke={colors[tone] || colors.neutral} strokeWidth="1.7" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

function Brand() {
  return <div className="brand"><span className="brand-mark"><span /></span><span>CityPulse</span></div>
}

function ThemeToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return <button className="icon-button" onClick={onToggle} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} title={dark ? 'Light mode' : 'Dark mode'}>{dark ? <Sun size={16} /> : <Moon size={16} />}</button>
}

function Intro({ onEnter }: { onEnter: () => void }) {
  return (
    <section className="intro" id="intro">
      <div className="intro-grid" aria-hidden="true" />
      <div className="intro-orbit orbit-one" aria-hidden="true" /><div className="intro-orbit orbit-two" aria-hidden="true" />
      <header className="intro-nav"><Brand /><span className="eyebrow">CIVIC INTELLIGENCE / 2026</span><span className="intro-status"><i /> LIVE SYSTEM</span></header>
      <div className="intro-content">
        <span className="eyebrow intro-kicker">A clearer read on the places we share.</span>
        <h1>Every city has<br /><em>a pulse.</em></h1>
        <p>CityPulse brings the signals of a place into focus — live, legible, and grounded in context.</p>
        <button className="primary-button" onClick={onEnter}>Enter live system <ArrowUpRight size={16} /></button>
      </div>
      <div className="scroll-cue"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></div>
      <div className="intro-foot"><span>01 / 04</span><span>Signals → context → clarity</span></div>
    </section>
  )
}

function GlobeVisual({ onEvent }: { onEvent: (event: typeof events[number]) => void }) {
  return (
    <div className="globe-stage">
      <div className="globe-orbit orbit-a" /><div className="globe-orbit orbit-b" /><div className="globe-orbit orbit-c" />
      <div className="globe" aria-label="Illustration placeholder for the live 3D global event globe"><div className="globe-lines" /><div className="globe-highlight" /></div>
      {events.map((event, index) => <button key={event.place} className={`event-marker marker-${event.tone}`} style={{ left: event.x, top: event.y, animationDelay: `${index * 0.35}s` }} onClick={() => onEvent(event)} aria-label={`Open ${event.type} in ${event.place}`}><span /><b /></button>)}
      <div className="globe-label label-north">N 42°</div><div className="globe-label label-east">E 74°</div>
    </div>
  )
}

function LayerChips() {
  const [active, setActive] = useState(['earthquakes', 'weather', 'air quality', 'incidents'])
  const layers = [{ name: 'earthquakes', icon: Waves }, { name: 'weather', icon: CloudRain }, { name: 'air quality', icon: AirVent }, { name: 'incidents', icon: Bell }]
  return <div className="layer-chips">{layers.map(({ name, icon: Icon }) => <button key={name} className={active.includes(name) ? 'chip active' : 'chip'} onClick={() => setActive(active.includes(name) ? active.filter(x => x !== name) : [...active, name])}><Icon size={14} />{name}</button>)}</div>
}

function GlobalView({ onLocal, onEvent }: { onLocal: () => void; onEvent: (event: typeof events[number]) => void }) {
  return <section className="app-shell global-view" id="global">
    <header className="app-nav"><Brand /><div className="mode-switch"><button className="mode active">GLOBAL</button><button className="mode" onClick={onLocal}>LOCAL <span>Amer</span></button></div><div className="nav-right"><span className="live-counter"><i /> 24 events live</span><span className="clock">14:32:08 UTC</span><ThemeToggle dark={false} onToggle={() => {}} /><button className="icon-button mobile-menu" aria-label="Open menu"><Menu size={17} /></button></div></header>
    <main className="global-main">
      <div className="section-heading"><div><span className="eyebrow">LIVE OVERVIEW / WORLD</span><h2>The world, in pulse.</h2></div><div className="refresh-note"><Radio size={14} /> Updating continuously</div></div>
      <div className="globe-layout"><aside className="globe-side left"><div className="side-block"><span className="eyebrow">LAYERS</span><LayerChips /></div><div className="side-block legend"><span className="eyebrow">SEVERITY</span><div className="legend-row"><i className="dot dot-low" /> Low</div><div className="legend-row"><i className="dot dot-medium" /> Moderate</div><div className="legend-row"><i className="dot dot-high" /> High</div></div></aside><GlobeVisual onEvent={onEvent} /><aside className="globe-side right"><div className="mini-stat"><span className="eyebrow">SIGNALS INDEX</span><strong>72<span>/100</span></strong><div className="stat-change"><ArrowUp size={13} /> 4.2% since 12:00</div></div><div className="mini-stat"><span className="eyebrow">COVERAGE</span><strong>118<span> cities</span></strong><p>Across 42 countries</p></div></aside></div>
      <div className="ticker"><span className="ticker-label"><i /> LIVE FEED</span><div className="ticker-track">{events.map(e => <button key={e.place} className="ticker-item" onClick={() => onEvent(e)}><span>{e.place}</span><b>{e.detail}</b><small>{e.time}</small><ChevronRight size={14} /></button>)}</div></div>
    </main>
  </section>
}

function LocalMap() {
  return <div className="local-map" aria-label="Illustration placeholder for Amer area map"><div className="map-road road-one" /><div className="map-road road-two" /><div className="map-road road-three" /><div className="map-water" /><div className="map-label fort">Amer Fort</div><div className="map-label kunda">Kunda</div><div className="map-pin pin-fort"><span /></div><div className="map-pin pin-kunda"><span /></div><div className="map-pin pin-alert"><span /></div><div className="map-controls"><button aria-label="Locate me"><LocateFixed size={15} /></button><button aria-label="Map layers"><Layers3 size={15} /></button></div><span className="map-attribution">© CityPulse map / simulated terrain</span></div>
}

function MetricTile({ metric }: { metric: typeof metrics[number] }) { const Icon = metric.icon; return <article className={`metric-tile tone-${metric.tone}`}><div className="metric-top"><span className="metric-icon"><Icon size={15} /></span><span className="metric-trend">{metric.trend}</span></div><div className="metric-value">{metric.value}<small>{metric.unit}</small></div><div className="metric-label">{metric.label}</div><div className="metric-note">{metric.note}</div><Sparkline tone={metric.tone} /></article> }

function LocalView({ onGlobal }: { onGlobal: () => void }) {
  return <section className="app-shell local-view" id="local"><header className="app-nav"><Brand /><div className="mode-switch"><button className="mode" onClick={onGlobal}>GLOBAL</button><button className="mode active">LOCAL <span>Amer</span></button></div><div className="nav-right"><span className="location"><MapPin size={14} /> Amer, Jaipur</span><ThemeToggle dark={false} onToggle={() => {}} /><button className="icon-button mobile-menu" aria-label="Open menu"><Menu size={17} /></button></div></header><main className="local-main"><div className="local-heading"><div><span className="eyebrow">AREA PULSE / RAJASTHAN, INDIA</span><h2>Amer, Jaipur</h2></div><button className="outline-button"><LocateFixed size={15} /> Recenter</button></div><div className="pulse-summary"><div className="pulse-ring"><div className="pulse-core"><Activity size={22} /><span>ACTIVE</span></div></div><div><span className="eyebrow">AREA PULSE</span><h3>Amer is active.</h3><p>Heavy traffic near Amer Fort, moderate air quality, one power complaint in Kunda.</p></div><span className="updated"><i /> updated 18 sec ago</span></div><div className="metrics-grid">{metrics.map(metric => <MetricTile key={metric.label} metric={metric} />)}</div><div className="local-grid"><div className="map-card"><div className="card-heading"><div><span className="eyebrow">LIVE MAP</span><h3>Activity around Amer</h3></div><span className="sim-tag">SIMULATED MAP</span></div><LocalMap /></div><div className="insight-column"><div className="correlation-card"><div className="card-heading"><span className="eyebrow">POSSIBLE CORRELATION</span><span className="question-mark">?</span></div><h3>Traffic and air quality are moving together.</h3><p>Both signals rose near the Amer Fort corridor over the last 40 minutes. This may be related, but it is not confirmed.</p><div className="correlation-bar"><span /><span /><span /></div><small>Confidence: moderate · 40 min window</small></div><div className="incident-card"><div className="card-heading"><div><span className="eyebrow">INCIDENT FEED</span><h3>Recent signals</h3></div><button className="text-button">View all <ArrowUpRight size={14} /></button></div><div className="incident-list"><div className="incident"><span className="incident-dot rose" /><div><strong>Power complaint</strong><p>Kunda · transformer issue reported</p></div><time>4m</time></div><div className="incident"><span className="incident-dot amber" /><div><strong>Traffic building</strong><p>Amer Fort road · northbound</p></div><time>8m</time></div><div className="incident"><span className="incident-dot blue" /><div><strong>Visitors easing</strong><p>Amer Fort · crowd level falling</p></div><time>14m</time></div></div></div></div></div></main></section>
}

function EventPanel({ event, onClose }: { event: typeof events[number]; onClose: () => void }) { return <aside className="event-panel"><div className="panel-top"><span className={`severity-pill ${event.tone}`}>{event.tone === 'rose' ? 'HIGH' : event.tone === 'amber' ? 'MODERATE' : 'LOW'}</span><button className="icon-button" onClick={onClose} aria-label="Close event details"><X size={17} /></button></div><span className="eyebrow">{event.type}</span><h3>{event.place}</h3><p className="panel-detail">{event.detail}</p><div className="panel-rule" /><div className="panel-meta"><span>REPORTED</span><strong>{event.time}</strong><span>SOURCE</span><strong>CityPulse network</strong></div><button className="primary-button panel-button">Open full event <ArrowUpRight size={15} /></button></aside> }

export default function Page() {
  const [entered, setEntered] = useState(false)
  const [local, setLocal] = useState(false)
  const [dark, setDark] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<typeof events[number] | null>(null)
  useEffect(() => { document.documentElement.classList.toggle('dark', dark) }, [dark])
  const app = useMemo(() => local ? <LocalView onGlobal={() => setLocal(false)} /> : <GlobalView onLocal={() => setLocal(true)} onEvent={setSelectedEvent} />, [local])
  if (!entered) return <><Intro onEnter={() => setEntered(true)} /><button className="floating-theme" onClick={() => setDark(!dark)} aria-label="Toggle dark mode">{dark ? <Sun size={16} /> : <Moon size={16} />}</button></>
  return <div className={`citypulse ${dark ? 'is-dark' : ''}`}>{app}<button className="app-theme" onClick={() => setDark(!dark)} aria-label="Toggle dark mode">{dark ? <Sun size={16} /> : <Moon size={16} />}</button>{selectedEvent && <EventPanel event={selectedEvent} onClose={() => setSelectedEvent(null)} />}</div>
}
