const baseUrl = "http://90.65.50.45:8080/dist"

export const filesToInstall = [
    'output'
]

export function getRemoteFileContent(fileName: string){
    const [reqResult, error] = http.get(`${baseUrl}/${fileName}`)

    if (!reqResult) {
        throw `Can't get the ${fileName} file: ${error}`
    }

    const content = reqResult.readAll()

    if (!content) {
        throw `Can't get content`
    }

    return content
}

export function saveFile(name: string, content: string){
    const [file, error] = fs.open(name, 'w')
    if (!file) {
        throw `Can't open file named '${name}': ${error}`
    }
    
    file.write(content)
    file.close()
}

export function installAllFiles(){
    for (const file of filesToInstall) {
        saveFile(file, getRemoteFileContent(`${file}.lua`))
    }
}

export function updateStartup(){
    saveFile('startup', getRemoteFileContent(`output.lua`))
}