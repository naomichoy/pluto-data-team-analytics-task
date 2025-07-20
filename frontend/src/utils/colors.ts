export const getWinPercentageColor = (percentage: number): string => {
    if (percentage < 40) {
        return 'text-red-600 font-semibold';
    }
    if (percentage > 55) {
        return 'text-green-600 font-semibold';
    }
    return 'text-gray-800';
};