export const setNewOffset=(card,mouseMoveDir={x:0,y:0})=>{
    const offsetLeft=card.offsetLeft-mouseMoveDir.x;
    const offsetTop=card.offsetTop-mouseMoveDir.y;
    return{
        x:offsetLeft<0 ? 0 : offsetLeft,
        y:offsetTop<0 ? 0 : offsetTop,
    };
};
export function autoGrow(textAreaRef){
    const { current } = textAreaRef;
    if (!current) return; // 添加防御判断，防止 null 访问

    current.style.height = "auto";
    current.style.height = current.scrollHeight + "px";
}
export const setZIndex = (selectedCard) => {
    selectedCard.style.zIndex = 999;

    Array.from(document.getElementsByClassName("card")).forEach((card) => {
        if (card !== selectedCard) {
            card.style.zIndex = selectedCard.style.zIndex - 1;
        }
    });
};

export const bodyParser = (body) => {
    // 如果是字符串且看起来像 JSON 字符串（被引号包裹）
    if (typeof body === 'string') {
        try {
            // 只有在确实是 JSON 格式时才解析
            if (body.startsWith('{') || body.startsWith('[')) {
                return JSON.parse(body);
            }
        } catch(error) {
            console.error("Cannot parse body as JSON:", error);
        }
        // 对于普通字符串，直接返回
        return body;
    }
    // 对于非字符串，直接返回
    return body;
}