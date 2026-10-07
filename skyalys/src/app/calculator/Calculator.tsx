"use client";

import { useMemo, useState } from "react";
import { products } from "@/lib/catalog";

const withMass = products.filter((p) => p.molarMass);

const fmt = (n: number, d = 3) => (Number.isFinite(n) ? n.toLocaleString("fr-FR", { maximumSignificantDigits: d }) : "–");

// Calculateur de solution mere et de dilution pour la preparation au laboratoire.
export function Calculator() {
  const [slug, setSlug] = useState(withMass[0]?.slug ?? "");
  const [customMass, setCustomMass] = useState("");
  const [mg, setMg] = useState("10");
  const [ml, setMl] = useState("2");
  const [target, setTarget] = useState("100");
  const [finalVol, setFinalVol] = useState("1");

  const molar = customMass ? Number(customMass.replace(",", ".")) : withMass.find((p) => p.slug === slug)?.molarMass ?? 0;

  const r = useMemo(() => {
    const massMg = Number(mg.replace(",", "."));
    const volMl = Number(ml.replace(",", "."));
    const concMgMl = massMg / volMl;
    const molarity = (concMgMl / molar) * 1000; // mmol/L = mM
    const targetNm = Number(target.replace(",", "."));
    const finalMl = Number(finalVol.replace(",", "."));
    const stockNm = molarity * 1e6;
    const neededUl = ((targetNm * finalMl) / stockNm) * 1000;
    return { concMgMl, molarity, stockUm: molarity * 1000, neededUl };
  }, [mg, ml, molar, target, finalVol]);

  return (
    <div className="calc">
      <div className="card form">
        <div className="field">
          <label htmlFor="c-prod">Composé</label>
          <select id="c-prod" className="select" value={slug} onChange={(e) => setSlug(e.target.value)}>
            {withMass.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name} ({p.molarMass?.toLocaleString("fr-FR")} g/mol)
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="c-mw">Masse molaire personnalisée (g/mol)</label>
          <input id="c-mw" className="input" inputMode="decimal" value={customMass} onChange={(e) => setCustomMass(e.target.value)} placeholder="Laisser vide pour la valeur catalogue" />
        </div>
        <div className="form-row">
          <div className="field">
            <label htmlFor="c-mg">Masse de peptide (mg)</label>
            <input id="c-mg" className="input" inputMode="decimal" value={mg} onChange={(e) => setMg(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="c-ml">Volume de solvant (ml)</label>
            <input id="c-ml" className="input" inputMode="decimal" value={ml} onChange={(e) => setMl(e.target.value)} />
          </div>
        </div>
        <div className="form-row">
          <div className="field">
            <label htmlFor="c-target">Concentration finale visée (nM)</label>
            <input id="c-target" className="input" inputMode="decimal" value={target} onChange={(e) => setTarget(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="c-final">Volume final du milieu (ml)</label>
            <input id="c-final" className="input" inputMode="decimal" value={finalVol} onChange={(e) => setFinalVol(e.target.value)} />
          </div>
        </div>
        <p className="small muted" style={{ margin: 0 }}>
          La masse indiquée sur le flacon est une masse brute. Pour un calcul exact, corrigez-la avec la teneur nette en peptide du certificat
          d’analyse.
        </p>
      </div>
      <div className="result" aria-live="polite">
        <span className="small">Molarité de la solution mère</span>
        <strong>{fmt(r.molarity)} mM</strong>
        <dl>
          <dt>Concentration massique</dt>
          <dd>{fmt(r.concMgMl)} mg/ml</dd>
          <dt>Soit</dt>
          <dd>{fmt(r.stockUm)} µM</dd>
          <dt>Volume de solution mère à prélever</dt>
          <dd>{fmt(r.neededUl)} µl</dd>
          <dt>Masse molaire utilisée</dt>
          <dd>{molar ? `${molar.toLocaleString("fr-FR")} g/mol` : "–"}</dd>
        </dl>
        <p className="small" style={{ marginTop: 16, marginBottom: 0, color: "#a3a8c3" }}>
          Si le volume à prélever est inférieur à 1 µl, préparez une dilution intermédiaire pour garder une bonne précision de pipetage.
        </p>
      </div>
    </div>
  );
}
