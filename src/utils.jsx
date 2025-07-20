export const setNewOffset = (card, mouseMoveDir = { x: 0, y: 0 }) => {
    // 增加参数验证
    if (!card || !card.offsetLeft !== undefined) {
        console.warn('setNewOffset: 无效的 card 参数');
        return { x: 0, y: 0 };
    }
    
    const offsetLeft = card.offsetLeft - mouseMoveDir.x;
    const offsetTop = card.offsetTop - mouseMoveDir.y;
    
    // 获取视口边界
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const cardWidth = card.offsetWidth || 200; // 默认宽度
    const cardHeight = card.offsetHeight || 150; // 默认高度
    
    // 计算边界限制
    const maxX = Math.max(0, viewportWidth - cardWidth);
    const maxY = Math.max(0, viewportHeight - cardHeight);
    
    return {
        x: Math.max(0, Math.min(offsetLeft, maxX)),
        y: Math.max(0, Math.min(offsetTop, maxY)),
    };
};

export function autoGrow(textAreaRef) {
    const { current } = textAreaRef;
    if (!current) {
        console.warn('autoGrow: textAreaRef.current 为空');
        return;
    }

    try {
        // 保存当前滚动位置
        const scrollTop = current.scrollTop;
        
        // 重置高度以获取真实内容高度
        current.style.height = "auto";
        const newHeight = current.scrollHeight;
        
        // 设置新高度，但不超过最大高度（避免过长）
        const maxHeight = 400; // 最大高度限制
        current.style.height = Math.min(newHeight, maxHeight) + "px";
        
        // 恢复滚动位置
        current.scrollTop = scrollTop;
    } catch (error) {
        console.error('autoGrow 执行失败:', error);
    }
}

export const setZIndex = (selectedCard) => {
    if (!selectedCard) return; // 增加空值检查
    
    selectedCard.style.zIndex = 999;

    Array.from(document.getElementsByClassName("card")).forEach((card) => {
        if (card !== selectedCard) {
            card.style.zIndex = selectedCard.style.zIndex - 1;
        }
    });
};

export const bodyParser = (body) => {
    // 处理 null/undefined 情况
    if (body === null || body === undefined) {
        return '';
    }
    
    // 处理非字符串类型
    if (typeof body !== 'string') {
        try {
            return String(body);
        } catch (error) {
            console.error("无法转换 body 为字符串:", error);
            return '';
        }
    }
    
    // 处理空字符串
    if (body.trim() === '') {
        return '';
    }
    
    // 尝试解析 JSON
    try {
        if (body.startsWith('{') || body.startsWith('[')) {
            const parsed = JSON.parse(body);
            // 如果解析结果是对象或数组，转换为字符串
            if (typeof parsed === 'object') {
                return JSON.stringify(parsed);
            }
            return String(parsed);
        }
    } catch(error) {
        console.error("Cannot parse body as JSON:", error);
        // JSON 解析失败，返回原始字符串
        return body;
    }
    
    // 返回原始字符串
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