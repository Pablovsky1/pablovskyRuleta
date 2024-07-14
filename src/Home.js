import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const [names, setNames] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        let value = event.target.value;
        // Filtrar caracteres no deseados y reemplazar espacios con _
        value = value.replace(/[^a-zA-Z_\s]/g, '');
        setInputValue(value);
    };

    const handleAddName = () => {
        if (inputValue.trim() !== '') {
            const updatedNames = [...names, inputValue.trim()];
            setNames(updatedNames);
            setInputValue('');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Evita que se envíe el formulario
            handleAddName(); // Llama a la función para agregar el nombre
        }
    };

    const removeName = (index) => {
        const updatedNames = [...names];
        updatedNames.splice(index, 1);
        setNames(updatedNames);
    };

    return (
        <div className="home-container">
            <h1>Agregar Nombres</h1>
            <div className="names-input">
                <input
                    type="text"
                    placeholder="Ingrese un nombre"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown} // Maneja el evento onKeyDown
                />
                <button onClick={handleAddName}>Agregar</button>
            </div>
            <div className="names-list">
                <h2>Nombres agregados:</h2>
                <ul>
                    {names.map((name, index) => (
                        <li key={index}>
                            {name}
                            <button onClick={() => removeName(index)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="link-generator">
                <h2>Generar enlace:</h2>
                <p>
                    <Link to={`/ruleta?${names.map(name => name.trim()).join('&')}`}>
                        Ver Ruleta
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Home;
