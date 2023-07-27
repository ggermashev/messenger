import React, {ButtonHTMLAttributes, createRef, FC, LegacyRef, useRef, useState} from 'react';
import styles from "./Button.module.scss"

interface IButton extends ButtonHTMLAttributes<any> {
    children: React.ReactNode,
    isActive?: boolean,
    bgColor?: string,
    bgHoverColor?: string,
    onClick: () => void,
}

const Button: FC<IButton> = ({
                                 children,
                                 className = "",
                                 bgColor = 'rgba(0,0,0,0.05)',
                                 bgHoverColor = 'lightblue',
                                 onClick,
                                 isActive = true,
                                 ...props
                             }) => {

    const btnRef = useRef(null)

    const [promptIsVisible, setPromptIsVisible] = useState(false)
    const timer = useRef<NodeJS.Timeout>()

    return (
        <div className={styles.wrap}>
            <button
                className={`${styles.button} ${className}`}
                {...props}
                ref={btnRef}
                style={{backgroundColor: bgColor || 'lightgrey'}}
                onMouseOver={() => {
                    //@ts-ignore
                    btnRef.current.style.backgroundColor = isActive ? bgHoverColor : bgColor
                    //@ts-ignore
                    btnRef.current.style.cursor = isActive ? 'pointer' : 'initial'
                }}
                onMouseLeave={() => {
                    //@ts-ignore
                    btnRef.current.style.backgroundColor = bgColor
                    //@ts-ignore
                    btnRef.current.style.cursor = 'initial'
                }}
                onClick={() => {
                    if (isActive) {
                        onClick()
                    }
                }}
            >{children}</button>
        </div>
    );
};

export default Button;