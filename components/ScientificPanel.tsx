
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ChevronDown, ChevronUp, FlaskConical, Sigma, Thermometer, Wind } from 'lucide-react';
import {
  EnvironmentState, DEFAULT_ENV, localGravity,
  pendulumExperiment, pendulumPeriod, pendulumDataTable, gFromSlope, linearRegression,
  vernierReading, sphereVolume,
  screwGaugeReading,
  ohmsLawReading,
  mirrorFormula,
  titrationResult,
  osmoticPressure, waterPotential,
  analyzeReadings,
  gaussianNoise,
} from '../services/simulationEngine';

const MotionDiv = motion.div as any;

// ─── SECTION CARD ─────────────────────────────────────────────────────────────
const Card: React.FC<{ title: string; icon?: React.ReactNode; children: React.ReactNode; accent?: string }> = ({
  title, icon, children, accent = '#3b82f6'
}) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden mb-3">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
      >
        <span className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-white">
          <span style={{ color: accent }}>{icon}</span>
          {title}
        </span>
        {open ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <MotionDiv
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
          >
            <div className="px-4 py-3 bg-white dark:bg-slate-900 text-sm text-slate-700 dark:text-gray-300">
              {children}
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── KV ROW ──────────────────────────────────────────────────────────────────
const KV: React.FC<{ k: string; v: string | number; unit?: string; highlight?: boolean }> = ({ k, v, unit, highlight }) => (
  <div className={`flex justify-between items-center py-1 border-b border-slate-100 dark:border-white/5 last:border-0 ${highlight ? 'font-bold' : ''}`}>
    <span className="text-slate-500 dark:text-gray-400 text-xs">{k}</span>
    <span className={`font-mono text-xs ${highlight ? 'text-green-600 dark:text-green-400' : 'text-slate-800 dark:text-white'}`}>
      {v}{unit ? <span className="text-slate-400 ml-1">{unit}</span> : null}
    </span>
  </div>
);

const Formula: React.FC<{ expr: string }> = ({ expr }) => (
  <div className="my-2 px-3 py-2 bg-slate-100 dark:bg-black/30 rounded-lg font-mono text-xs text-blue-600 dark:text-blue-300 break-all">{expr}</div>
);

// ─── ENVIRONMENT EDITOR ───────────────────────────────────────────────────────
const EnvEditor: React.FC<{ env: EnvironmentState; onChange: (e: EnvironmentState) => void }> = ({ env, onChange }) => (
  <Card title="Environmental Conditions" icon={<Thermometer size={14} />} accent="#f59e0b">
    <p className="text-xs text-slate-400 dark:text-gray-500 mb-2 italic">Affects g, resistance, reaction rates &amp; more.</p>
    <div className="space-y-2">
      {([
        { label: 'Temperature (°C)', key: 'temperature_C', min: 0, max: 50, step: 1 },
        { label: 'Altitude (m)', key: 'altitude_m', min: 0, max: 5000, step: 100 },
        { label: 'Humidity (%)', key: 'humidity_pct', min: 0, max: 100, step: 5 },
      ] as const).map(({ label, key, min, max, step }) => (
        <div key={key}>
          <div className="flex justify-between text-xs mb-0.5">
            <span className="text-slate-500 dark:text-gray-400">{label}</span>
            <span className="font-mono text-slate-700 dark:text-white">{env[key as keyof EnvironmentState]}</span>
          </div>
          <input
            type="range" min={min} max={max} step={step}
            value={env[key as keyof EnvironmentState]}
            onChange={e => onChange({ ...env, [key]: parseFloat(e.target.value) })}
            className="w-full h-1.5 rounded accent-amber-500"
          />
        </div>
      ))}
      <KV k="Local gravity g" v={localGravity(env).toFixed(5)} unit="m/s²" highlight />
    </div>
  </Card>
);

// ─── ERROR BADGE ─────────────────────────────────────────────────────────────
const ErrorBadge: React.FC<{ pct: number }> = ({ pct }) => {
  const good = pct < 2;
  const ok = pct < 5;
  return (
    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-bold ${
      good ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
           : ok  ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                 : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    }`}>
      {!good && !ok && <AlertTriangle size={10} />}
      {pct.toFixed(2)}% error
    </span>
  );
};

// ════════════════════════════════════════════════════════════════════════════════
// PANEL IMPLEMENTATIONS PER LAB
// ════════════════════════════════════════════════════════════════════════════════

// P1: Vernier Calipers
const VernierPanel: React.FC<{ sliderVal: number; hex: string }> = ({ sliderVal, hex }) => {
  const [env, setEnv] = useState<EnvironmentState>(DEFAULT_ENV);
  const zeroError = -0.02; // fixed session zero error
  const r = vernierReading(sliderVal, zeroError);
  const vol = sphereVolume(r.displayed_value - zeroError);

  const allReadings = Array.from({ length: 5 }, () =>
    vernierReading(sliderVal, zeroError).displayed_value
  );
  const stats = analyzeReadings(allReadings);

  return (
    <div className="space-y-1">
      <EnvEditor env={env} onChange={setEnv} />
      <Card title="Instrument Model" icon={<FlaskConical size={14} />} accent={hex}>
        <Formula expr="Total Reading = MSR + (VC × LC)" />
        <KV k="Instrument" v={r.instrument} />
        <KV k="LC (Least Count)" v="0.01" unit="cm" />
        <KV k="Session Zero Error" v={`${zeroError >= 0 ? '+' : ''}${zeroError}`} unit="cm" />
        <KV k={r.notes || ''} v="" />
      </Card>
      <Card title="Live Readings" icon={<Sigma size={14} />} accent={hex}>
        <KV k="True diameter" v={sliderVal.toFixed(3)} unit="cm" />
        <KV k="Displayed (raw)" v={r.displayed_value.toFixed(2)} unit="cm" />
        <KV k="Corrected reading" v={(r.displayed_value - zeroError).toFixed(2)} unit="cm" highlight />
        <KV k="Uncertainty" v={`± ${r.uncertainty}`} unit="cm" />
      </Card>
      <Card title="Derived Calculation" icon={<Sigma size={14} />} accent={hex}>
        <Formula expr="V = (4/3) × π × r³" />
        <KV k="Radius (r)" v={(vol.volume > 0 ? (r.displayed_value - zeroError) / 2 : 0).toFixed(3)} unit="cm" />
        <KV k="Volume (V)" v={vol.volume} unit="cm³" highlight />
      </Card>
      <Card title="Statistical Error Analysis" icon={<AlertTriangle size={14} />} accent="#ef4444">
        <p className="text-xs text-slate-400 mb-2">Simulated 5 repeat measurements:</p>
        <KV k="Mean" v={stats.mean.toFixed(3)} unit="cm" />
        <KV k="Std. Deviation (σ)" v={stats.std_deviation.toFixed(5)} unit="cm" />
        <KV k="Std. Error" v={stats.std_error.toFixed(5)} unit="cm" />
        <KV k="Relative Error" v={stats.relative_error_pct.toFixed(3)} unit="%" />
        <div className="mt-2"><ErrorBadge pct={stats.relative_error_pct} /></div>
      </Card>
    </div>
  );
};

// P2: Simple Pendulum
const PendulumPanel: React.FC<{ length_m: number; hex: string }> = ({ length_m, hex }) => {
  const [env, setEnv] = useState<EnvironmentState>(DEFAULT_ENV);
  const res = pendulumExperiment(length_m, env);
  const tableData = pendulumDataTable(env);
  const regression = linearRegression(tableData);
  const g_from_graph = gFromSlope(regression.slope);

  return (
    <div className="space-y-1">
      <EnvEditor env={env} onChange={setEnv} />
      <Card title="Formula" icon={<Sigma size={14} />} accent={hex}>
        <Formula expr="T = 2π√(L/g)  →  g = 4π²L / T²" />
        <Formula expr="δg/g = √[(δL/L)² + (2δT/T)²]" />
      </Card>
      <Card title="Live Experiment Results" icon={<FlaskConical size={14} />} accent={hex}>
        <KV k="String length (L)" v={length_m.toFixed(2)} unit="m" />
        <KV k="Local g (at altitude)" v={res.g_local} unit="m/s²" />
        <KV k="Theoretical T" v={res.T_theoretical} unit="s" />
        <KV k="Measured T (20 osc.)" v={res.T_measured} unit="s" />
        <KV k="g calculated" v={res.g_calculated} unit="m/s²" highlight />
        <KV k="Uncertainty in g" v={`± ${res.uncertainty_g}`} unit="m/s²" />
        <div className="mt-2"><ErrorBadge pct={res.percentage_error} /></div>
      </Card>
      <Card title="L–T² Graph Analysis (8 points)" icon={<Sigma size={14} />} accent={hex}>
        <Formula expr="Slope = 4π²/g  →  g = 4π²/slope" />
        <KV k="Slope (L/T²)" v={regression.slope.toFixed(4)} unit="m/s²" />
        <KV k="g from graph" v={g_from_graph} unit="m/s²" highlight />
        <KV k="R² (linearity)" v={regression.r_squared.toFixed(5)} />
      </Card>
    </div>
  );
};

// P3: Screw Gauge
const ScrewPanel: React.FC<{ rotation: number; hex: string }> = ({ rotation, hex }) => {
  const [env, setEnv] = useState<EnvironmentState>(DEFAULT_ENV);
  const pitch = 0.5, divs = 50;
  const LC = pitch / divs;
  const true_d = (rotation / divs) * pitch; // mm
  const zeroError = 0.03;
  const r = screwGaugeReading(true_d, zeroError);
  const area = Math.PI * ((r.displayed_value - zeroError) / 2 / 10) ** 2; // cm²

  return (
    <div className="space-y-1">
      <EnvEditor env={env} onChange={setEnv} />
      <Card title="Instrument Model" icon={<FlaskConical size={14} />} accent={hex}>
        <Formula expr="LC = Pitch / Circular Divisions = 0.5/50 = 0.01 mm" />
        <Formula expr="Reading = MSR + (CSR × LC) − Zero Error" />
        <KV k="Pitch" v={pitch} unit="mm" />
        <KV k="Divisions" v={divs} />
        <KV k="LC" v={LC.toFixed(2)} unit="mm" />
        <KV k="Zero Error (session)" v={`+${zeroError}`} unit="mm" />
      </Card>
      <Card title="Live Readings" icon={<Sigma size={14} />} accent={hex}>
        <KV k="True diameter" v={true_d.toFixed(3)} unit="mm" />
        <KV k="Displayed (raw)" v={r.displayed_value.toFixed(3)} unit="mm" />
        <KV k="Corrected reading" v={(r.displayed_value - zeroError).toFixed(3)} unit="mm" highlight />
        <KV k="Uncertainty" v={`± ${LC.toFixed(2)}`} unit="mm" />
      </Card>
      <Card title="Derived: Cross-Section Area" icon={<Sigma size={14} />} accent={hex}>
        <Formula expr="A = π × (d/2)²" />
        <KV k="Corrected d" v={(r.displayed_value - zeroError).toFixed(3)} unit="mm" />
        <KV k="Area (A)" v={(area * 100).toFixed(5)} unit="mm²" highlight />
      </Card>
    </div>
  );
};

// P4: Ohm's Law
const OhmPanel: React.FC<{ voltage: number; resistance: number; hex: string }> = ({ voltage, resistance, hex }) => {
  const [env, setEnv] = useState<EnvironmentState>(DEFAULT_ENV);
  const res = ohmsLawReading(voltage, resistance, env);
  const alpha = 0.004;
  const R_at_T = resistance * (1 + alpha * (env.temperature_C - 25));

  return (
    <div className="space-y-1">
      <EnvEditor env={env} onChange={setEnv} />
      <Card title="Formulae" icon={<Sigma size={14} />} accent={hex}>
        <Formula expr="V = IR  (Ohm's Law)" />
        <Formula expr="R(T) = R₀[1 + α(T − T₀)]  (temperature dependence)" />
        <Formula expr="ρ = R × A / L  (resistivity)" />
      </Card>
      <Card title="Live Instrument Readings" icon={<FlaskConical size={14} />} accent={hex}>
        <KV k="Set Voltage" v={voltage.toFixed(2)} unit="V" />
        <KV k="Voltmeter reads" v={res.V.displayed_value.toFixed(2)} unit={`V (±${res.V.uncertainty})`} />
        <KV k="Ammeter reads" v={res.I.displayed_value.toFixed(3)} unit={`A (±${res.I.uncertainty})`} />
        <KV k="R measured (V/I)" v={res.R_measured} unit="Ω" highlight />
      </Card>
      <Card title="Temperature Correction" icon={<Thermometer size={14} />} accent="#f59e0b">
        <Formula expr={`R(${env.temperature_C}°C) = ${resistance}×[1+0.004×(${env.temperature_C}−25)]`} />
        <KV k="R₀ (at 25°C)" v={resistance.toFixed(2)} unit="Ω" />
        <KV k={`R at ${env.temperature_C}°C`} v={R_at_T.toFixed(3)} unit="Ω" highlight />
        <div className="mt-2"><ErrorBadge pct={res.percentage_error} /></div>
      </Card>
    </div>
  );
};

// P5: Concave Mirror
const MirrorPanel: React.FC<{ u_cm: number; hex: string }> = ({ u_cm, hex }) => {
  const f = 15;
  const res = mirrorFormula(u_cm, f);
  return (
    <div className="space-y-1">
      <Card title="Mirror Formula" icon={<Sigma size={14} />} accent={hex}>
        <Formula expr="1/v + 1/u = 1/f  (New Cartesian sign convention)" />
        <Formula expr="m = −v/u  (magnification)" />
        <Formula expr="f = R/2  (relation to radius of curvature)" />
      </Card>
      <Card title="Live Calculation" icon={<FlaskConical size={14} />} accent={hex}>
        <KV k="Focal length (f)" v={`−${f}`} unit="cm" />
        <KV k="Object distance (u)" v={`−${u_cm}`} unit="cm" />
        <KV k="Image distance (v)" v={res.v} unit="cm" highlight />
        <KV k="Magnification (m)" v={res.m} />
        <KV k="Nature" v={res.nature} />
        <KV k="Size" v={res.size} />
      </Card>
      <Card title="1/u vs 1/v values" icon={<Sigma size={14} />} accent={hex}>
        <KV k="1/u" v={(1 / -u_cm).toFixed(4)} unit="cm⁻¹" />
        <KV k="1/v" v={(1 / res.v).toFixed(4)} unit="cm⁻¹" />
        <KV k="1/f (check)" v={(1 / -f).toFixed(4)} unit="cm⁻¹" />
        <Formula expr={res.formula_str} />
      </Card>
    </div>
  );
};

// C1: Titration
const TitrationPanel: React.FC<{ vol_added: number; hex: string }> = ({ vol_added, hex }) => {
  const M_acid = 0.1, V_acid = 20, M_base = 0.1;
  const res = titrationResult(M_acid, V_acid, M_base);
  return (
    <div className="space-y-1">
      <Card title="Reaction & Formula" icon={<FlaskConical size={14} />} accent={hex}>
        <Formula expr="HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)" />
        <Formula expr="M₁V₁ = M₂V₂  (1:1 stoichiometry)" />
        <Formula expr="ΔH_neut = −57.1 kJ/mol (strong acid-base)" />
      </Card>
      <Card title="Live Experiment" icon={<Sigma size={14} />} accent={hex}>
        <KV k="M(HCl)" v={M_acid} unit="mol/L" />
        <KV k="V(HCl)" v={V_acid} unit="mL" />
        <KV k="M(NaOH)" v={M_base} unit="mol/L" />
        <KV k="V(NaOH) theoretical" v={res.V_base_theoretical} unit="mL" />
        <KV k="V(NaOH) measured" v={res.V_base_measured} unit="mL" />
        <KV k="Volume added now" v={vol_added.toFixed(1)} unit="mL" />
        <KV k="Endpoint volume" v={res.V_base_theoretical} unit="mL" />
        <KV k="M(HCl) back-calc" v={res.M_acid_back_calculated} unit="mol/L" highlight />
        <KV k="Enthalpy released" v={res.enthalpy_kJ} unit="kJ" />
        <div className="mt-2"><ErrorBadge pct={res.percentage_error} /></div>
      </Card>
    </div>
  );
};

// B3: Osmosis
const OsmosisPanel: React.FC<{ hex: string }> = ({ hex }) => {
  const [molarity, setMolarity] = useState(0.5);
  const [env, setEnv] = useState<EnvironmentState>(DEFAULT_ENV);
  const pi = osmoticPressure(molarity, env.temperature_C);
  const psi = waterPotential(molarity, env.temperature_C);
  return (
    <div className="space-y-1">
      <EnvEditor env={env} onChange={setEnv} />
      <Card title="Van't Hoff Equation" icon={<Sigma size={14} />} accent={hex}>
        <Formula expr="π = iMRT  (osmotic pressure)" />
        <Formula expr="Ψ = Ψ_s + Ψ_p  (water potential)" />
        <Formula expr="Ψ_s = −iCRT  (solute potential, always negative)" />
      </Card>
      <div className="mb-2">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-500 dark:text-gray-400">Sugar Solution Molarity</span>
          <span className="font-mono text-slate-700 dark:text-white">{molarity} M</span>
        </div>
        <input type="range" min="0.1" max="2.0" step="0.1" value={molarity}
          onChange={e => setMolarity(parseFloat(e.target.value))}
          className="w-full h-1.5 rounded accent-lime-500" />
      </div>
      <Card title="Calculated Values" icon={<FlaskConical size={14} />} accent={hex}>
        <KV k="Temperature" v={env.temperature_C} unit="°C" />
        <KV k="Molarity (M)" v={molarity} unit="mol/L" />
        <KV k="Osmotic Pressure (π)" v={pi} unit="kPa" highlight />
        <KV k="Water Potential (Ψ)" v={psi} unit="kPa" />
        <KV k="Direction of water" v={pi > 0 ? "→ Into potato cavity (endosmosis)" : "← Out of cavity"} />
      </Card>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ════════════════════════════════════════════════════════════════════════════════

interface ScientificPanelProps {
  labId: string;
  hex: string;
  // Lab-specific values passed from parent simulation
  sliderValue?: number;       // general slider (vernier pos, pendulum L, screw rotation, voltage, u_cm, vol)
  secondaryValue?: number;    // e.g. resistance for Ohm's law
}

const ScientificPanel: React.FC<ScientificPanelProps> = ({ labId, hex, sliderValue = 0, secondaryValue = 10 }) => {
  return (
    <div className="h-full overflow-y-auto bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-white/10 p-3 w-72 shrink-0 custom-scrollbar">
      <div className="flex items-center gap-2 mb-3">
        <Wind size={14} style={{ color: hex }} />
        <span className="text-xs font-bold text-slate-700 dark:text-white uppercase tracking-wider">Scientific Analysis</span>
      </div>

      {labId === 'p1' && <VernierPanel sliderVal={sliderValue} hex={hex} />}
      {labId === 'p2' && <PendulumPanel length_m={sliderValue} hex={hex} />}
      {labId === 'p3' && <ScrewPanel rotation={sliderValue} hex={hex} />}
      {labId === 'p4' && <OhmPanel voltage={sliderValue} resistance={secondaryValue} hex={hex} />}
      {labId === 'p5' && <MirrorPanel u_cm={sliderValue} hex={hex} />}
      {labId === 'c1' && <TitrationPanel vol_added={sliderValue} hex={hex} />}
      {labId === 'b3' && <OsmosisPanel hex={hex} />}

      {!['p1','p2','p3','p4','p5','c1','b3'].includes(labId) && (
        <div className="text-center py-12 text-slate-400 dark:text-gray-600">
          <FlaskConical size={32} className="mx-auto mb-3 opacity-30" />
          <p className="text-xs">Scientific analysis available for Physics &amp; Chemistry labs.</p>
        </div>
      )}
    </div>
  );
};

export default ScientificPanel;
