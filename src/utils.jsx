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
    if (typeof body === 'string') {
        try {
            if (body.startsWith('{') || body.startsWith('[')) {
                return JSON.parse(body);
            }
        } catch(error) {
            console.error("Cannot parse body as JSON:", error);
            return '';
        }
        return body;
    }
    if (body === undefined || body === null) return '';
    return body;
}

// 防抖函数
export function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 便于单元测试
export default { setNewOffset, autoGrow, setZIndex, bodyParser, debounce };