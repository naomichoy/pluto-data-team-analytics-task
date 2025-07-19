import { CheckSquare, Square } from "lucide-react";

interface HistogramTeamSelectorProps {
    allTeamNames: string[];
    selectedTeams: string[];
    onTeamSelectionChange: (teamName: string) => void;
}
const HistogramTeamSelector: React.FC<HistogramTeamSelectorProps> = ({ allTeamNames, selectedTeams, onTeamSelectionChange }) => (
    <div className="lg:col-span-1 bg-white shadow-lg rounded-lg p-6 self-start">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">Select Teams</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
            {allTeamNames.map(teamName => (
                <label key={teamName} className="flex items-center space-x-3 cursor-pointer">
                    <input
                        type="checkbox"
                        className="hidden"
                        checked={selectedTeams.includes(teamName)}
                        onChange={() => onTeamSelectionChange(teamName)}
                    />
                    {selectedTeams.includes(teamName) ? <CheckSquare className="text-cyan-600" /> : <Square className="text-gray-400" />}
                    <span className="text-gray-700">{teamName}</span>
                </label>
            ))}
        </div>
    </div>
);

export default HistogramTeamSelector;