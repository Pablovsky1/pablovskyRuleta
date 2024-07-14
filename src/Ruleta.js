import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './Ruleta.css';

const Ruleta = () => {
    const location = useLocation();
    const [spinAngle, setSpinAngle] = useState(0);
    const [selectedSegment, setSelectedSegment] = useState(null);
    const [spinning, setSpinning] = useState(false);
    const timerRef = useRef(null);

    const parseParams = (search) => {
        const params = new URLSearchParams(search);
        const values = [];
        for (let value of params.keys()) {
            values.push(value);
        }
        return values;
    };

    const values = parseParams(location.search);

    useEffect(() => {
        if (!spinning) {
            // Determine which segment is on top
            const topIndex = Math.floor(((360 - (spinAngle % 360)) % 360) / (360 / values.length));
            setSelectedSegment(topIndex);
        }
    }, [spinAngle, spinning, values.length]);

    const spinWheel = () => {
        if (spinning) return;
        const randomIndex = Math.floor(Math.random() * values.length);
        const anglePerSegment = 360 / values.length;
        const randomAngle = randomIndex * anglePerSegment + (Math.random() * anglePerSegment);
        setSpinAngle(prevAngle => prevAngle + 360 * 4 + randomAngle); // 4 full spins + random segment
        setSpinning(true);

        // Reiniciar la ruleta después de unos segundos
        timerRef.current = setTimeout(() => {
            setSpinning(false);
        }, 4000); // 4 segundos (ajusta según la duración de la animación de giro)
    };

    return (
        <div className="ruleta-container">
            <h1>Ruleta</h1>
            <div className="ruleta" style={{ transform: `rotate(${spinAngle}deg)` }}>
                {values.map((value, index) => (
                    <div
                        key={index}
                        className={`segment ${index === selectedSegment && !spinning ? 'selected' : ''}`}
                        style={{ transform: `rotate(${index * (360 / values.length)}deg)` }}
                    >
                        {value}
                    </div>
                ))}
            </div>
            <button className="spin-button" onClick={spinWheel} disabled={spinning}>
                {spinning ? 'Girando...' : 'Girar la ruleta'}
            </button>
        </div>
    );
};

export default Ruleta;
