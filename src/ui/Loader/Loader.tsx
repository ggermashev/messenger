import React, {FC} from 'react';
import styles from './Loader.module.scss'

interface ILoader {
    size: 'small' | 'large'
}

const Loader: FC<ILoader> = ({
                                 size
                             }) => {
    return (
        <div className={styles.loader}>
            <img src={require(`./images/loader_${size}.png`)}/>
        </div>
    );
};

export default Loader;