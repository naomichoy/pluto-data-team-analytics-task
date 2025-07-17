import React from "react";

interface WinPercentageProps {
  value: number;
  team: string;
}

const WinPercentage: React.FC<WinPercentageProps> = ({ value, team }) => {
  return (
    <div>
      <h3>{team} Win Percentage</h3>
      <p>{value.toFixed(1)}% of simulation runs result in a win</p>
    </div>
  );
};

export default WinPercentage;
