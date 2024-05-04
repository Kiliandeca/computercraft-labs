export function getPressedKey(){
    const [ event, pressedKeyCode ]= os.pullEvent('key')
    return keys.getName(pressedKeyCode)
}

export function waitForKeyPress(key: string) {
    let pressedKey
    do {
        pressedKey = getPressedKey()

    } while (pressedKey !== key);
    console.log('[I] Stoping task');
}

export function waitForBackspace(){
    waitForKeyPress("backspace")
}

export function runUntileBackspace(fonc: () => void) {
    return parallel.waitForAny(waitForBackspace, fonc)
}