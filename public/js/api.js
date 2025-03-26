export function generateFloatArray(size, min, max) {
    return Array.from({ length: size }, () => ({
        weight: Math.random() * (max - min) + min,
        date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)) // Random date within the last ~115 days
    }));
}
;
