import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

function StatsChart({ pokemon = {} }) {
  const hp = Number(pokemon.hp) || 0;
  const attack = Number(pokemon.attack) || 0;
  const defense = Number(pokemon.defense) || 0;
  const special_attack = Number(pokemon.special_attack) || 0;
  const special_defense = Number(pokemon.special_defense) || 0;
  const speed = Number(pokemon.speed) || 0;

  const data = useMemo(
    () => [
      { name: "HP", value: hp },
      { name: "ATK", value: attack },
      { name: "DEF", value: defense },
      { name: "SpA", value: special_attack },
      { name: "SpD", value: special_defense },
      { name: "SPD", value: speed },
    ],
    [hp, attack, defense, special_attack, special_defense, speed]
  );

  const valueToColor = (value) => {
    const clamped = Math.max(0, Math.min(value, 200));
    const ratio = clamped / 200; 

    let r, g;
    if (ratio <= 0.5) {
      r = 255;
      g = Math.round((ratio / 0.5) * 255);
    } else {
      g = 255;
      r = Math.round(255 - ((ratio - 0.5) / 0.5) * 255);
    }
    return `rgb(${r}, ${g}, 0)`;
  };

  return (
  <div
    style={{
      width: "100%",
      maxWidth: "600px",
      height: "30vh",
      minHeight: "300px",
      margin: "20px auto"
    }}
  >
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 10, right: 30, left: 30, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" domain={[0, 200]} />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Bar dataKey="value" radius={[6, 6, 6, 6]}>
          {data.map((entry, idx) => (
            <Cell key={`cell-${idx}`} fill={valueToColor(entry.value)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);
}

export default StatsChart;