const config = {
    development: {
        api:'http://192.168.3.2:9527/sudoku-api/',
    },
    production: {
        api: 'http://sudoku-api.madao.online/',
    }
};

const mode = process.env.NODE_ENV || 'development';
const result = {...config[mode]};
export default result
