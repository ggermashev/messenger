import React, {FC, InputHTMLAttributes, useEffect, useMemo, useState} from 'react';
import styles from './TextInput.module.scss'

interface ITextInput extends InputHTMLAttributes<any> {
    value: string,
    setValue: (val: string) => void,
    multiline?: boolean,
    title: string,
    type?: "phone" | "email" | "text",
    maxLength?: number,
    required?: boolean,
    setIsValid?: (isValid: boolean) => void,
    wrapClassName?: string,
}

const TextInput: FC<ITextInput> = ({
                                       className = "",
                                       value,
                                       setValue,
                                       title,
                                       multiline = false,
                                       type = "text",
                                       maxLength,
                                       required = false,
                                       setIsValid,
                                       wrapClassName,
                                       ...props
                                   }) => {

    const [isChanged, setIsChanged] = useState(false)

    const error = useMemo(() => {
        if (setIsValid) {
            setIsValid(false)
        }
        if (!isChanged) {
            setIsChanged(true)
        }
        if (maxLength) {
            if (value.length > maxLength) {
                return `Число символов не должно превышать ${maxLength}`
            }
        }
        if (required && value.length === 0 && isChanged) {
            return `Обязательное поле`
        }
        if (type === 'email' && value.length > 0) {
            if (!/^[А-Яа-яA-Za-z0-9.`\-#%&/\t]+@[А-Яа-яA-Za-z0-9.`\-#%&/\t]+.[А-Яа-яA-Za-z0-9.`\-#%&/\t]+$/.test(value)) {
                return `email введен некорректно`
            }
        }
        if (setIsValid) {
            setIsValid(true)
        }
        return '';
    }, [value])

    useEffect(() => {
        switch (type) {
            case "phone":
                if (!/\d/.test(value.at(-1) as string) && value.at(-1) !== "+" && value.length > 0) {
                    setValue(value.slice(0, -1))
                } else if (value.length === 0) {
                    setValue("+")
                } else if (value.length === 3) {
                    setValue(`${value.slice(0, -1)} ${value.at(-1)}`)
                } else if (value.length === 7) {
                    setValue(`${value.slice(0, -1)} ${value.at(-1)}`)
                } else if (value.length === 11) {
                    setValue(`${value.slice(0, -1)} ${value.at(-1)}`)
                } else if (value.length === 14) {
                    setValue(`${value.slice(0, -1)} ${value.at(-1)}`)
                } else if (value.length > 16) {
                    setValue(value.slice(0, 16))
                }
                break;
            case "email":
                break;
            case "text":
                break;
        }
    }, [value])

    return (
        <div className={`${styles.wrap} ${wrapClassName}`}>
            <p className={styles.title}>{title}</p>
            {multiline
                ? <textarea
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value)
                    }}
                    className={`${styles.textInput} ${className}`}
                    {...props}
                >
                </textarea>
                : <input
                    type={"text"}
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value)
                    }}
                    className={`${styles.textInput} ${className}`}
                    {...props}
                >
                </input>
            }
            <p className={styles.error}>{error}</p>
        </div>
    );
};

export default TextInput;