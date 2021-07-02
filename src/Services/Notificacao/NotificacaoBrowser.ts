export const AddPermission = () => Notification.requestPermission();
export const Send = (title: string, mensagem: string, onclick?: Function) => {

    if (Notification.permission === "granted") {
        let notification = new Notification(title, {
            body: mensagem,
            silent: false,
            lang: "pt-br",
            icon: "https://i.pinimg.com/originals/6b/d4/ab/6bd4ab0ae3170d212acd266b66674128.png",
        });
        if (onclick)
            notification.onclick = () => onclick();
        // new Audio("../../Assets/Songs/notification.mp3").play();
    }
}