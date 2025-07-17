import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface SimulationHistogramProps {
  homeSimulations: number[];
  awaySimulations: number[];
  homeTeam: string;
  awayTeam: string;
}

const SimulationHistogram: React.FC<SimulationHistogramProps> = ({
  homeSimulations,
  awaySimulations,
  homeTeam,
  awayTeam,
}) => {
  // Prepare data for Recharts — histogram binning is optional but this is a simple line plot per simulation run
  // For simplicity, display each simulation run as a point; for real histograms consider binning results

  const data = homeSimulations.map((homeScore, index) => ({
    simulationRun: index + 1,
    [homeTeam]: homeScore,
    [awayTeam]: awaySimulations[index] ?? 0,
  }));

  return (
    <BarChart width={600} height={300} data={data}>
      <XAxis dataKey="simulationRun" label={{ value: "Simulation Run", position: "insideBottomRight", offset: 0 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey={homeTeam} fill="#8884d8" />
      <Bar dataKey={awayTeam} fill="#82ca9d" />
    </BarChart>
  );
};

export default SimulationHistogram;
