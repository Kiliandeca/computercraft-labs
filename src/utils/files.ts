
export function saveFile(name: string, content: string) {
    const [file, error] = fs.open(name, 'w');
    if (!file) {
        throw `Can't open file named '${name}': ${error}`;
    }

    file.write(content);
    file.close();
}

export function readFile(name: string): string {
    const [file, error] = fs.open(name, 'r');
    if (!file) {
        throw `Can't open file named '${name}': ${error}`;
    }

    const content = file.readAll() || "";
    file.close();
    return content;
}
