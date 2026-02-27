export const getApiUrl = (path: string) => {
    // With Next.js migration, the API is co-located.
    // Use NEXT_PUBLIC_APP_URL for absolute URLs (critical for server-side fetches)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "";
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    const apiPath = cleanPath.startsWith("/api") ? cleanPath : `/api${cleanPath}`;

    // On the client, relative URLs are fine if baseUrl is empty.
    // On the server, baseUrl must be present.
    return `${baseUrl}${apiPath}`;
};
