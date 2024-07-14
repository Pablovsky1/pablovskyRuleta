import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './Ruleta.css';

const Ruleta = () => {
    const location = useLocation();
    const [spinAngle, setSpinAngle] = useState(0);
    const [selectedName, setSelectedName] = useState('');
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
            setSelectedName(values[topIndex]);
        }
    }, [spinAngle, spinning, values]);

    const spinWheel = () => {
        if (spinning) return;
        setSelectedName();
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

    const handleShareResult = () => {
        const shareText = `El resultado de la ruleta fue: "${selectedName}"`;
        if (navigator.share) {
            navigator.share({
                title: 'Resultado de la Ruleta',
                text: shareText,
            })
            .then(() => console.log('Resultado compartido correctamente.'))
            .catch((error) => console.error('Error al compartir resultado:', error));
        } else {
            console.log('La API de compartir no está soportada en este navegador.');
            // Aquí podrías agregar un fallback o instrucciones para compartir manualmente
        }
    };

    const shareUrl = () => {
        const url = window.location.href;
            if (navigator.share) {
                navigator.share({
                    url
                })
                .then(() => console.log('Resultado compartido correctamente.'))
                .catch((error) => console.error('Error al compartir resultado:', error));
            } else {
                console.log('La API de compartir no está soportada en este navegador.');
                // Aquí podrías agregar un fallback o instrucciones para compartir manualmente
            }
    };

    return (
        <div className="ruleta-container">
        <h1>Ruleta</h1>
        <div className="ruleta" style={{ transform: `rotate(${spinAngle}deg)` }}>
            {values.map((value, index) => (
                <div
                    key={index}
                    className={`segment ${index === values.indexOf(selectedName) && !spinning ? 'selected' : ''}`}
                    style={{ transform: `rotate(${index * (360 / values.length)}deg)` }}
                >
                    {value}
                </div>
            ))}
        </div>
        <div className="selected-name">
            {selectedName && <p>Seleccionado: {selectedName}</p>}
        </div>
        <button className="spin-button" onClick={spinWheel} disabled={spinning}>
            {spinning ? 'Girando...' : 'Girar la ruleta'}
        </button>
        <button className="share-button" onClick={handleShareResult} disabled={!selectedName}>
    Compartir resultado
</button>
        <button className="share-button" onClick={shareUrl}>
                 Compartir ruleta
            </button>
            <button className="back-button" onClick={() => window.history.back()}>Volver a la Home</button>

    </div>
    );
};

export default Ruleta;
