interface NodeModule {
    hot : {
        accept(path?: string, callback?: (filePath: string) => void): void;
        data: boolean;
    }
}

interface Window {
    // eslint-disable-next-line camelcase
    hex_md5(str:string):string;
}
