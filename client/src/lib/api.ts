export const getApiUrl = (path: string) => {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    const apiPath = cleanPath.startsWith("/api") ? cleanPath : `/api${cleanPath}`;

    if (typeof window !== "undefined") {
        return apiPath;
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "";
    return `${baseUrl}${apiPath}`;
};
