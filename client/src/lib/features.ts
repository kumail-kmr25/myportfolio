import useSWR from "swr";
import { getApiUrl } from "./api";

const fetcher = (url: string) => fetch(getApiUrl(url)).then((res) => res.json()).then(data => data.success ? data.data : {});

export interface FeatureConfig {
    enabled: boolean;
    config: any;
    category: string;
}

export type FeatureMap = Record<string, FeatureConfig>;

export function useFeatures() {
    const { data, error, isLoading, mutate } = useSWR<FeatureMap>("/api/features", fetcher, {
        revalidateOnFocus: false,
        revalidateIfStale: false,
    });

    const isEnabled = (key: string) => {
        return !!data?.[key]?.enabled;
    };

    const getConfig = (key: string) => {
        return data?.[key]?.config || {};
    };

    return {
        features: data || {},
        isLoading,
        error,
        isEnabled,
        getConfig,
        mutate
    };
}
