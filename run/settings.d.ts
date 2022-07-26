declare namespace _default {
    const entryPoints: string[];
    const bundle: boolean;
    const sourcemap: string;
    const minify: boolean;
    const target: string[];
    const outfile: string;
    const loader: {
        '.png': string;
        '.svg': string;
        '.pcss': string;
    };
    const plugins: {
        name: string;
        setup(build: any): void;
    }[];
    namespace banner {
        const js: string;
    }
}
export default _default;
//# sourceMappingURL=settings.d.ts.map