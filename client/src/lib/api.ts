export const getApiUrl = (path: string) => {
    // With Next.js migration, the API is co-located.
    // We return relative paths to use the same host.
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return cleanPath.startsWith("/api") ? cleanPath : `/api${cleanPath}`;
};
