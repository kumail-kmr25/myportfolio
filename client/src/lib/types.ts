export interface Project {
    id: string;
    title: string;
    summary: string;
    description: string;
    category: string;
    status: string;
    role: string;
    tags: string[];
    image: string;
    demo: string;
    github?: string;
    architecture?: any;
    isFeatured: boolean;
    isVisible: boolean;
    problem?: string;
    solution?: string;
    results?: string;
    metrics?: string[];
    engineering?: string;
    uiDepth?: number;
    backendDepth?: number;
    securityDepth?: number;
    scalabilityDepth?: number;
    valuePoints?: string[];
    created_at?: string;
    systemArchitecture?: { name: string; value: string }[];
    engineeringDecisions?: { title: string; reason: string; benefits: string }[];
    codeSnippet?: { language: string; description: string; code: string };
    realStats?: {
        components: string;
        apiRoutes: string;
        models: string;
        platform: string;
        buildTime: string;
    };
}
