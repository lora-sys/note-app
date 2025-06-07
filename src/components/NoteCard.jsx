import { useRef, useEffect, useState } from "react";
import Trash from "../icons/Trash";
import { setNewOffset, autoGrow, setZIndex, bodyParser } from "../utils";
import {db} from "../appwrite/data.jsx"
import Spinner  from "../icons/Spinner.jsx";
const NoteCard = ({ note }) => {
    const [colors, setColors] = useState(null);
    const [position, setPosition] = useState(null);
    const textAreaRef = useRef(null);
    const [saving,setSaving]=useState(false);
    const keyUpTimer=useRef(null);

    
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
    
    const handleKeyUp=()=>{
    //1. init state
        setSaving(true);
    //2 .
    if(keyUpTimer.current){
        clearTimeout(keyUpTimer.current);
    }
    keyUpTimer.current=setTimeout(()=>{
        saveData("body",textAreaRef.current.value);
    },2000);
}
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

    let mouseStartPos = { x: 0, y: 0 };
    const cardRef = useRef(null);
    useEffect(() => {
        if (textAreaRef.current) {
            autoGrow(textAreaRef);
        }
    }, []); // 确保 DOM 已渲染再调用 autoGrow

    const mouseDown = (e) => {
        setZIndex(cardRef.current);
        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;
        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseUp);
    };
    
    const mouseMove = (e) => {
        let mouseMoveDir = {
            x: mouseStartPos.x - e.clientX,
            y: mouseStartPos.y - e.clientY,
        };
        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;
        const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
        setPosition(newPosition);
        setZIndex(cardRef.current);
    };
    
    const mouseUp = () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);
        const newPosition =setNewOffset(cardRef.current); //{x,y};
        saveData("position",newPosition);

    };
    const saveData = async (key, value) => {
        const payload = { [key]: JSON.stringify(value) };
        try {
            await db.notes.update(note.$id, payload);
        } catch (error) {
            console.error(error);
        }
        setSaving(false);

    };
    return <div
        ref={cardRef}
        className="card"
        style={{
            backgroundColor: currentColors.colorBody,
            left: `${currentPosition.x}px`,
            top: `${currentPosition.y}px`,
            border: '1px solid red',      // 添加调试边框
            minHeight: '100px'            // 确保即使内容为空也有尺寸
        }}
    >
    <div
    className="card-header"
    style={{backgroundColor:currentColors.colorHeader}}
    onMouseDown={mouseDown}
    >
    <Trash/>
    {
    saving && (
        <div className="card-saving">
            <Spinner color={colors.colorText} />
            <span style={{ color: colors.colorText }}>Saving...</span>
        </div>
    )
    };   
    </div>
    <div className="card-body">
    <textarea
    style={{color:currentColors.colorText}}
    defaultValue={bodyParser(note.body)}
    ref={textAreaRef}
    onInput={()=>{
        autoGrow(textAreaRef);
    }}

    onFocus={()=>{
    setZIndex(cardRef.current);  
    }}
    onKeyUp={handleKeyUp}
    >
    </textarea>
    </div>
    </div>;
};



export default NoteCard;