interface NodeModule {
    hot : {
        accept(path?: string, callback?: (filePath: string) => void): void
    }
}
