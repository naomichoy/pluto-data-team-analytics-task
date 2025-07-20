// src/pages/SimulationDetailsPage.tsx

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { simulationsApi } from '../api/simulations';
import type { Team, Simulation } from '../types';
import FilterableTable from '../components/FilterableTable';
import PageHeader from '../components/PageHeader';

interface SimulationDetailsParams extends Record<string, string | undefined> {
  teamId: string;
}

const SimulationDetailsPage: React.FC = () => {
    const { teamId: teamIdParam } = useParams<SimulationDetailsParams>();
    const navigate = useNavigate();
    const location = useLocation();

    const team = location.state?.team as Team | undefined;

    const [simulations, setSimulations] = useState<Simulation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [view, setView] = useState<'table' | 'graph'>('graph');

    useEffect(() => {
        if (!teamIdParam) {
            setError("No Team ID provided in the URL.");
            setLoading(false);
            return;
        }

        const id = parseInt(teamIdParam, 10);
        if (isNaN(id)) {
            setError(`Invalid Team ID: "${teamIdParam}".`);
            setLoading(false);
            return;
        }

        if (!team || team.team_id !== id) {
            setError("Team data not found or mismatched. Please navigate from the simulation list.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        simulationsApi.getSimulationsForTeam(id)
            .then(d => {
                setSimulations(d);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch simulation details:", err);
                setError("Failed to load simulation details. Please try again.");
                setLoading(false);
            });
    }, [teamIdParam, team]);

    if (loading) {
        return <div className="text-center p-10">Loading simulation details...</div>;
    }
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
    if (!team) return <div className="text-center p-10 text-red-500">Team data is missing. Cannot display details.</div>;


    const simulationColumns: { key: keyof Simulation; label: string }[] = [
        { key: 'simulation_run', label: 'Run' },
        { key: 'results', label: 'Result' }
    ];

    return (
        <div className="p-6">
            <PageHeader title={`Simulation Details for ${team.team}`} onBack={() => navigate(-1)} />
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