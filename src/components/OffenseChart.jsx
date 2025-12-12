import React, { useMemo } from "react";

const EFFECTIVENESS = {
  normal:    { rock:0.5, ghost:0, steel:0.5 },
  fire:      { fire:0.5, water:0.5, grass:2, ice:2, bug:2, rock:0.5, dragon:0.5, steel:2 },
  water:     { fire:2, water:0.5, grass:0.5, ground:2, rock:2, dragon:0.5 },
  electric:  { water:2, electric:0.5, grass:0.5, ground:0, flying:2, dragon:0.5 },
  grass:     { fire:0.5, water:2, grass:0.5, poison:0.5, ground:2, flying:0.5, bug:0.5, rock:2, dragon:0.5, steel:0.5 },
  ice:       { fire:0.5, water:0.5, grass:2, ice:0.5, ground:2, flying:2, dragon:2, steel:0.5 },
  fighting:  { normal:2, ice:2, rock:2, dark:2, steel:2, poison:0.5, flying:0.5, psychic:0.5, bug:0.5, ghost:0, fairy:0.5 },
  poison:    { grass:2, poison:0.5, ground:0.5, rock:0.5, ghost:0.5, steel:0, fairy:2 },
  ground:    { fire:2, electric:2, grass:0.5, poison:2, flying:0, bug:0.5, rock:2, steel:2 },
  flying:    { grass:2, electric:0.5, fighting:2, bug:2, rock:0.5, steel:0.5 },
  psychic:   { fighting:2, poison:2, psychic:0.5, dark:0, steel:0.5 },
  bug:       { fire:0.5, grass:2, fighting:0.5, poison:0.5, flying:0.5, psychic:2, ghost:0.5, dark:2, steel:0.5, fairy:0.5 },
  rock:      { fire:2, ice:2, fighting:0.5, ground:0.5, flying:2, bug:2, steel:0.5 },
  ghost:     { normal:0, psychic:2, ghost:2, dark:0.5 },
  dragon:    { dragon:2, steel:0.5, fairy:0 },
  dark:      { fighting:0.5, psychic:2, ghost:2, dark:0.5, fairy:0.5 },
  steel:     { fire:0.5, water:0.5, electric:0.5, ice:2, rock:2, fairy:2, steel:0.5 },
  fairy:     { fire:0.5, fighting:2, poison:0.5, dragon:2, dark:2, steel:0.5 }
};

function OffenseChart({ type1, type2 }) {
  const result = useMemo(() => {
    if (!type1) return null;

    const multiplier = {};

    const applyAttackType = (atk) => {
      const eff = EFFECTIVENESS[atk];
      if (!eff) return;

      Object.entries(eff).forEach(([def, m]) => {
        multiplier[def] = (multiplier[def] || 1) * m;
      });
    };

    applyAttackType(type1);
    if (type2) applyAttackType(type2);

    const filtered = Object.entries(multiplier)
      .filter(([_, m]) => Math.abs(m - 1) > 1e-6)
      .sort((a, b) => {
        const ma = a[1], mb = b[1];
        if (ma === 0 && mb !== 0) return 1;
        if (mb === 0 && ma !== 0) return -1;
        return mb - ma;
      });

    return filtered;
  }, [type1, type2]);

  const getColor = (m) => {
    if (m === 0) return "white";      
    if (m > 1) return "#4EFF4E";      
    if (m < 1) return "#FF4E4E";      
    return "white";
  };

  if (!result) return null;

  return (
    <div style={{ marginTop: 30, textAlign: "center", color: "white" }}>
      <h2>Offense Chart</h2>

      <div style={{
        marginBottom: 80,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 15,
        marginTop: 20,
      }}>
        {result.map(([t, m]) => (
          <div key={t} style={{ textAlign: "center" }}>
            <div className="type-tooltip" data-tip={t}>
            <img src={`/types/${t}.png`} alt={t} style={{ width: 45, height: 45 }} />
            <div
              style={{
                fontSize: 18,
                marginTop: 5,
                color: getColor(m),
                fontWeight: "bold",
                textShadow: "0px 0px 5px black",
              }}
            >
              {m === 0 ? "0×" : m + "×"}
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OffenseChart;