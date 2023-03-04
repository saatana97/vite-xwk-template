import { now } from 'lodash';
export const useLib = () => {
    const lib = 'Hello Lib';
    console.info(lib, now());
    return lib;
};
