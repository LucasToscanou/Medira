export function generateFloatArray(size: number, min: number, max: number): { weight: number, date: Date }[] {
    return Array.from({ length: size }, () => ({
        weight: Math.random() * (max - min) + min,
        date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)) // Random date within the last ~115 days
    }));
};
