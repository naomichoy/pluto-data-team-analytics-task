import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { simulationsApi } from '../api/simulations';
import type { Team, Simulation } from '../types';
import FilterableTable from '../components/FilterableTable';
import PageHeader from '../components/PageHeader';

interface SimulationDetailsPageProps {
    team: Team;
    onBack: () => void;
}

const SimulationDetailsPage: React.FC<SimulationDetailsPageProps> = ({ team, onBack }) => {
    const [simulations, setSimulations] = useState<Simulation[]>([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState<'table' | 'graph'>('graph');

    useEffect(() => {
        simulationsApi.getSimulationsForTeam(team.team_id).then(d => {
            setSimulations(d);
            setLoading(false);
        });
    }, [team.team_id]);

    const simulationColumns: { key: keyof Simulation; label: string }[] = [
        { key: 'simulation_run', label: 'Run' },
        { key: 'results', label: 'Result' }
    ];

    if (loading) {
        return <div className="text-center p-10">Loading simulation details...</div>;
    }

    return (
        <div className="p-6">
            <PageHeader title={`Simulation Details for ${team.team}`} onBack={onBack} />
            <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="flex justify-end items-center mb-4">
                    <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg">
                        {(['Graph', 'Table'] as const).map(v => (
                            <button
                                key={v}
                                onClick={() => setView(v.toLowerCase() as typeof view)}
                                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${view === v.toLowerCase() ? 'bg-white text-cyan-600 shadow' : 'text-gray-600 hover:bg-gray-300'}`}
                            >
                                {v}
                            </button>
                        ))}
                    </div>
                </div>
                {view === 'table' && (
                    <FilterableTable<Simulation>
                        data={simulations}
                        columns={simulationColumns}
                        filterableCols={[]}
                    />
                )}
                {view === 'graph' && (
                    <div className="w-full h-96">
                        <ResponsiveContainer>
                            <LineChart data={simulations} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="simulation_run" label={{ value: 'Run', position: 'insideBottom', offset: -5 }} />
                                <YAxis label={{ value: 'Result', angle: -90, position: 'insideLeft' }} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="results" stroke="#0891b2" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SimulationDetailsPage;