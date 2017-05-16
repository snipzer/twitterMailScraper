import parserConfig from './parser/parserConfig';

const pConfig = new parserConfig("src/config/config.sample.yml", "src/config/config.yml");

pConfig.setParam().writeConfig();


