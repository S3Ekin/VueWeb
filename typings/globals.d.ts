interface NodeModule {
    hot : {
        accept(path?: string, callback?: (filePath: string) => void): void;
        data: boolean;
    }
}

interface MouseEventEl<T extends HTMLElement> extends MouseEvent {
    target: T,
    currentTarget: T
}
