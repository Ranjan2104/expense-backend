import en from "./en.json"

function getLanguage(lan) {
    if(lan === "en") {
        return en
    }
}

export default function getMessage(code, lan = "en") {
    let language = getLanguage(lan)
    const message = language[code]
    return message
}