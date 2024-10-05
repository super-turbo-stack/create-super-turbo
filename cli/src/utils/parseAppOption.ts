export const parseAppOption = (value:string) :false |[true, number] => {
    if (value === "") return [true, 1];
    const parsed = parseInt(value, 10);
    if(isNaN(parsed) || parsed < 0) return false;
    return [true, Math.max(1, parsed)];
}
