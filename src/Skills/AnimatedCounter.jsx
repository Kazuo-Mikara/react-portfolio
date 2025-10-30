import React, { useEffect, useState } from "react";

function AnimatedCounter({ target }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let raf;
        if (count < target) {
            raf = requestAnimationFrame(() => setCount(count + 1));

        }
        return () => cancelAnimationFrame(raf);
    }, [count, target]);

    return <span className="percent-badge">{count}%</span>;
}


export default AnimatedCounter;