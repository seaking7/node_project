import rollupCommonConfig from "./rollup.common.config"

const config = {...rollupCommonConfig}

config.plugins = [
    ...config.plugin,
    terser()
];

export default config;