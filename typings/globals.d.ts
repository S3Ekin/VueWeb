interface NodeModule {
    hot : {
        accept(path?: string, callback?: (filePath: string) => void): void;
        data: boolean;
    }
}

interface Window {
    loginApp():void;
}
