import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';

export interface Column<T> {
    key: keyof T;
    label: string;
}
interface FilterableTableProps<T> {
    data: T[];
    columns: Column<T>[];
    filterableCols: Column<T>[];
    renderActions?: (item: T) => React.ReactNode;
}
const FilterableTable = <T extends object>({ data, columns, filterableCols, renderActions }: FilterableTableProps<T>) => {
    const [filters, setFilters] = useState<Partial<Record<keyof T, string>>>({});
    const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'ascending' | 'descending' } | null>(null);

    const filteredData = useMemo(() => {
        let filtered = [...data];
        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                filtered = filtered.filter(item => String(item[key as keyof T]).toLowerCase().includes(String(value).toLowerCase()));
            }
        });
        if (sortConfig !== null) {
            filtered.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }
        return filtered;
    }, [data, filters, sortConfig]);

    const requestSort = (key: keyof T) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') direction = 'descending';
        setSortConfig({ key, direction });
    };

    const getSortIndicator = (key: keyof T) => {
        if (!sortConfig || sortConfig.key !== key) return null;
        return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                {filterableCols.map(col => (
                    <div key={String(col.key)} className="relative">
                        <input type="text" placeholder={`Filter by ${col.label}`} className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" onChange={(e) => setFilters(prev => ({ ...prev, [col.key]: e.target.value }))} />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                ))}
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left table-auto">
                    <thead><tr className="bg-gray-100">
                        {columns.map(col => (<th key={String(col.key)} className="p-4 font-semibold cursor-pointer" onClick={() => requestSort(col.key)}>{col.label}<span>{getSortIndicator(col.key)}</span></th>))}
                        {renderActions && <th className="p-4 font-semibold">Actions</th>}
                    </tr></thead>
                    <tbody>{filteredData.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-b hover:bg-gray-50">
                            {columns.map(col => (<td key={String(col.key)} className="p-4">{String(row[col.key])}</td>))}
                            {renderActions && <td className="p-4">{renderActions(row)}</td>}
                        </tr>
                    ))}</tbody>
                </table>
            </div>
        </div>
    );
};

export default FilterableTable;