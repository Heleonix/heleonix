export function isPrimitive(value) {
    return (typeof value !== "object" && typeof value !== "function") || value === null;
}
