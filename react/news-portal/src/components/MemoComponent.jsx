import React, { useState, useMemo } from 'react';

const MemoComponent = () => {
    const [count, setCount] = useState(0);
    const [dark, setDark] = useState(false);

    const doubleCount = useMemo(() => {
        console.log('Computing...');
        return count * 2;
    }, [count]); // only re-computes when count changes

    const themeStyle = {
        backgroundColor: dark ? '#333' : '#fff',
        color: dark ? '#fff' : '#000',
        padding: '10px',
    };

    return (
        <div style={themeStyle}>
            <h1>Double: {doubleCount} {count}</h1>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setDark(!dark)}>Toggle Theme</button>
        </div>
    );
};

export default MemoComponent;