export function textMatch(source: string, query: string): boolean {
    if (!source || !query) return false;

    const trimmedQuery = query.trim();
    if (!trimmedQuery) return false;

    // Decode any Unicode escape sequences in the source
    const decodedSource = source.replace(/\\u([a-fA-F0-9]{4})/g, (_, hex) =>
        String.fromCharCode(parseInt(hex, 16))
    );

    // Normalize both strings to NFD (decomposed) form and convert to lowercase
    const normalizedSource = decodedSource.normalize('NFD').toLowerCase();
    const normalizedQuery = trimmedQuery.normalize('NFD').toLowerCase();

    // Remove diacritics and non-alphabetic characters for comparison
    const cleanSource = normalizedSource.replace(/[^\p{L}\p{N}\s]/gu, '');
    const cleanQuery = normalizedQuery.replace(/[^\p{L}\p{N}\s]/gu, '');

    return cleanSource.includes(cleanQuery);
}