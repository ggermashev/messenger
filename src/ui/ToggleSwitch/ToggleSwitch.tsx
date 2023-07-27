import React, {createRef, FC, useEffect, useMemo, useRef, useState} from 'react';
import styles from './ToggleSwitch.module.scss'

interface IToggleSwitch {
    height?: number,
    width?: number,
    bgLeftColor?: string,
    bgRightColor?: string,
    position: 'left' | 'right' | undefined,
    setPosition: (pos: 'left' | 'right' | undefined) => void
}

const ToggleSwitch: FC<IToggleSwitch> = ({
                                             height,
                                             width,
                                             bgLeftColor,
                                             bgRightColor,
                                             position = 'right',
                                             setPosition
                                         }) => {

    const baseBgLeftColor = 'rgba(0,0,0,0.1)'
    const baseBgRightColor = 'lightblue'

    const baseHeight = 25
    const baseWidth = 50

    const bgColor = useMemo(() => {
        if (position === 'right') {
            return bgRightColor || baseBgRightColor
        } else {
            return bgLeftColor || baseBgLeftColor
        }
    }, [position])

    const toggleRef = useRef(null)

    useEffect(() => {
        setPosition('right')
    }, [])

    return (
        <div
            className={styles.switch}
            style={{backgroundColor: bgColor, width: width || baseWidth, height: height || baseHeight}}
            onClick={() => {
                if (position === 'right') {
                    setPosition('left')
                    //@ts-ignore
                    toggleRef.current.style.left = `5px`
                    //@ts-ignore
                    toggleRef.current.style.right = `auto`
                } else {
                    setPosition('right')
                    //@ts-ignore
                    toggleRef.current.style.right = `5px`
                    //@ts-ignore
                    toggleRef.current.style.left = `auto`
                }
            }}
        >
            <div
                className={styles.toggle}
                style={{width: height || baseHeight, height: height || baseHeight, maxHeight: width ? width/2 : baseWidth/2, maxWidth: width ? width/2 : baseWidth/2}}
                ref={toggleRef}
            >
            </div>
        </div>
    );
};

export default ToggleSwitch;