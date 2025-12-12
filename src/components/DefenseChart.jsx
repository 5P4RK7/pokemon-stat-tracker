import React, { useMemo } from "react";

const TYPE_CHART = {
  normal:    { weak: ["fighting"], resist: [], immune: ["ghost"] },
  fire:      { weak: ["water", "ground", "rock"], resist: ["fire", "grass", "ice", "bug", "steel", "fairy"], immune: [] },
  water:     { weak: ["electric", "grass"], resist: ["fire", "water", "ice", "steel"], immune: [] },
  electric:  { weak: ["ground"], resist: ["electric", "flying", "steel"], immune: [] },
  grass:     { weak: ["fire", "ice", "poison", "flying", "bug"], resist: ["water", "electric", "grass", "ground"], immune: [] },
  ice:       { weak: ["fire", "fighting", "rock", "steel"], resist: ["ice"], immune: [] },
  fighting:  { weak: ["flying", "psychic", "fairy"], resist: ["bug", "rock", "dark"], immune: [] },
  poison:    { weak: ["ground", "psychic"], resist: ["grass", "fighting", "poison", "bug", "fairy"], immune: [] },
  ground:    { weak: ["water", "grass", "ice"], resist: ["poison", "rock"], immune: ["electric"] },
  flying:    { weak: ["electric", "ice", "rock"], resist: ["grass", "fighting", "bug"], immune: ["ground"] },
  psychic:   { weak: ["bug", "ghost", "dark"], resist: ["fighting", "psychic"], immune: [] },
  bug:       { weak: ["fire", "flying", "rock"], resist: ["grass", "fighting", "ground"], immune: [] },
  rock:      { weak: ["water", "grass", "fighting", "ground", "steel"], resist: ["normal", "fire", "poison", "flying"], immune: [] },
  ghost:     { weak: ["ghost", "dark"], resist: ["poison", "bug"], immune: ["normal", "fighting"] },
  dragon:    { weak: ["ice", "dragon", "fairy"], resist: ["fire", "water", "electric", "grass"], immune: [] },
  dark:      { weak: ["fighting", "bug", "fairy"], resist: ["ghost", "dark"], immune: ["psychic"] },
  steel:     { weak: ["fire", "fighting", "ground"], resist: ["normal","grass","ice","flying","psychic","bug","rock","dragon","steel","fairy"], immune: ["poison"] },
  fairy:     { weak: ["poison", "steel"], resist: ["fighting", "bug", "dark"], immune: ["dragon"] }
};

function DefenseChart({ type1, type2 }) {
  const result = useMemo(() => {
    if (!type1) return null;

    const multiplier = {};

    const applyType = (t) => {
      const info = TYPE_CHART[t];
      if (!info) return;
      info.weak.forEach((x) => multiplier[x] = (multiplier[x] || 1) * 2);
      info.resist.forEach((x) => multiplier[x] = (multiplier[x] || 1) * 0.5);
      info.immune.forEach((x) => multiplier[x] = (multiplier[x] || 1) * 0);
    };

    applyType(type1);
    if (type2) applyType(type2);

    const entries = Object.entries(multiplier);
    const filtered = entries.filter(([_, m]) => Math.abs(m - 1) > 1e-6);

    filtered.sort((a, b) => {
      const ma = a[1], mb = b[1];
      if (ma === 0 && mb !== 0) return 1;
      if (mb === 0 && ma !== 0) return -1;
      return mb - ma;
    });

    return filtered;
  }, [type1, type2]);

  const getColor = (m) => {
    if (m === 0) return "white";
    if (m < 1) return "#4EFF4E";
    if (m > 1) return "#FF4E4E";
    return "white";
  };

  if (!result) return null;

  return (
    <div style={{ marginTop: 30, textAlign: "center", color: "white" }}>
      <h2>Defense Chart</h2>

      <div style={{
        display: "flex", gap: 15,
        flexWrap: "wrap", justifyContent: "center",
        marginTop: 20
      }}>
        {result.map(([t, m]) => (
          <div key={t} style={{ textAlign: "center" }}>
            <div className="type-tooltip" data-tip={t}>
            <img src={`/types/${t}.png`} alt={t} style={{ width: 45, height: 45 }} />
            <div style={{
              fontSize: 18,
              marginTop: 5,
              color: getColor(m),
              fontWeight: "bold",
              textShadow: "0px 0px 5px black"
            }}>
              {m === 0 ? "0×" : m + "×"}
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DefenseChart;