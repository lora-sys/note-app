import { useRef, useEffect, useState, useCallback } from "react";
import Trash from "../icons/Trash";
import { setNewOffset, autoGrow, setZIndex, bodyParser, debounce } from "../utils";
import {db} from "../appwrite/data.jsx"
import Spinner  from "../icons/Spinner.jsx";
import NoteCardHeader from "./NoteCardHeader";
import NoteCardBody from "./NoteCardBody";

const NoteCard = ({ note }) => {
    const [colors, setColors] = useState(null);
    const [position, setPosition] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const textAreaRef = useRef(null);
    const [saving, setSaving] = useState(false);
    const cardRef = useRef(null);
    const dragStartPos = useRef({ x: 0, y: 0 });
    const dragOffset = useRef({ x: 0, y: 0 });

    useEffect(() => {
        try {
            setColors(JSON.parse(note.colors));
        } catch (error) {
            console.error('Failed to parse colors:', error);
        }

        try {
            setPosition(JSON.parse(note.position));
        } catch (error) {
            console.error('Failed to parse position:', error);
        }
    }, [note.colors, note.position]);
    
    const debouncedSave = useCallback(debounce((value) => {
        saveData("body", value);
    }, 2000), []);

    const handleKeyUp = () => {
        setSaving(true);
        debouncedSave(textAreaRef.current.value);
    };

    // 添加默认样式值，防止组件返回 null
    const defaultColors = {
        colorHeader: "#FED0FD",
        colorBody: "#FEE5FD",
        colorText: "#18181A"
    };
    const defaultPosition = {
        x: 100,
        y: 100
    };

    // 使用解析后的值或默认值
    const currentColors = colors || defaultColors;
    const currentPosition = position || defaultPosition;

    useEffect(() => {
        if (textAreaRef.current) {
            autoGrow(textAreaRef);
        }
    }, []);

    const mouseDown = (e) => {
        e.preventDefault();
        setZIndex(cardRef.current);
        setIsDragging(true);
        dragStartPos.current = { x: e.clientX, y: e.clientY };
        dragOffset.current = { x: 0, y: 0 };
        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseUp);
    };
    
    const mouseMove = useCallback((e) => {
        if (!isDragging) return;
        
        const deltaX = dragStartPos.current.x - e.clientX;
        const deltaY = dragStartPos.current.y - e.clientY;
        
        dragOffset.current = { x: deltaX, y: deltaY };
        
        // 直接更新 DOM 位置，不触发状态更新，提升性能
        if (cardRef.current) {
            const newX = Math.max(0, currentPosition.x - deltaX);
            const newY = Math.max(0, currentPosition.y - deltaY);
            
            // 限制边界，防止拖出可视区域
            const maxX = window.innerWidth - cardRef.current.offsetWidth;
            const maxY = window.innerHeight - cardRef.current.offsetHeight;
            
            const boundedX = Math.min(Math.max(0, newX), maxX);
            const boundedY = Math.min(Math.max(0, newY), maxY);
            
            cardRef.current.style.left = `${boundedX}px`;
            cardRef.current.style.top = `${boundedY}px`;
        }
    }, [isDragging, currentPosition]);
    
    const mouseUp = useCallback(() => {
        if (!isDragging) return;
        
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);
        
        setIsDragging(false);
        
        // 只在 mouseup 时更新状态和保存，提升性能
        if (cardRef.current) {
            const newPosition = {
                x: Math.max(0, currentPosition.x - dragOffset.current.x),
                y: Math.max(0, currentPosition.y - dragOffset.current.y)
            };
            
            // 应用边界限制
            const maxX = window.innerWidth - cardRef.current.offsetWidth;
            const maxY = window.innerHeight - cardRef.current.offsetHeight;
            
            const boundedPosition = {
                x: Math.min(Math.max(0, newPosition.x), maxX),
                y: Math.min(Math.max(0, newPosition.y), maxY)
            };
            
            setPosition(boundedPosition);
            saveData("position", boundedPosition);
        }
    }, [isDragging, currentPosition]);

    const saveData = async (key, value) => {
        const payload = { [key]: JSON.stringify(value) };
        try {
            await db.notes.update(note.$id, payload);
        } catch (error) {
            console.error('保存数据失败:', error);
            // 可以在这里添加重试逻辑或用户提示
            if (error.code === 'network_error') {
                console.warn('网络错误，数据将在网络恢复后重试');
            }
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('确定要删除这个笔记吗？此操作不可撤销。')) return;
        
        setSaving(true);
        try {
            await db.notes.delete(note.$id);
            if (typeof note.onDelete === 'function') {
                note.onDelete(note.$id);
            }
        } catch (error) {
            console.error('删除笔记失败:', error);
            alert('删除失败，请检查网络连接后重试');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div
            ref={cardRef}
            className="card"
            style={{
                backgroundColor: currentColors.colorBody,
                left: `${currentPosition.x}px`,
                top: `${currentPosition.y}px`,
                border: '1px solid red',
                minHeight: '100px',
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none'
            }}
        >
            <NoteCardHeader
                colors={currentColors}
                saving={saving}
                onDelete={handleDelete}
                onMouseDown={mouseDown}
            />
            <NoteCardBody
                colors={currentColors}
                note={note}
                textAreaRef={textAreaRef}
                handleKeyUp={handleKeyUp}
                setZIndex={() => setZIndex(cardRef.current)}
            />
        </div>
    );
};

export default NoteCard;