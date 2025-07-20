export const setNewOffset=(card,mouseMoveDir={x:0,y:0})=>{
    if (!card) return { x: 0, y: 0 };
    
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
    if (!selectedCard) return;
    
    selectedCard.style.zIndex = 999;

    Array.from(document.getElementsByClassName("card")).forEach((card) => {
        if (card !== selectedCard) {
            card.style.zIndex = selectedCard.style.zIndex - 1;
        }
    });
};

export const bodyParser = (body) => {
    // 处理 null/undefined
    if (body === null || body === undefined) {
        return '';
    }
    
    // 处理非字符串类型
    if (typeof body !== 'string') {
        return String(body);
    }
    
    // 处理空字符串
    if (body.trim() === '') {
        return '';
    }
    
    // 尝试解析 JSON
    try {
        if (body.startsWith('{') || body.startsWith('[')) {
            const parsed = JSON.parse(body);
            // 如果解析结果是对象或数组，返回字符串形式
            return typeof parsed === 'object' ? JSON.stringify(parsed) : parsed;
        }
    } catch(error) {
        console.error("Cannot parse body as JSON:", error);
        // 解析失败时返回原始字符串
        return body;
    }
    
    // 对于普通字符串，直接返回
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