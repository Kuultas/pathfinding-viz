import { useState } from "react";
import "../styles/pathfinding-visualizer.scss";

const Color = ({ color, onChange }) => {
    const [value, setValue] = useState(color);

    const handleChange = (e) => {
        setValue(e.target.value);
        onChange(e.target.value);
    };

    return <input type="color" value={value} onChange={handleChange} />;
};

const SubmitColors = ({ onClick }) => (
    <button type="submit" className="submit-button" onClick={onClick}>
        set colors
    </button>
);

const ColorPicker = ({ setColors }) => {
    const [currentColors, setCurrentColors] = useState({
        visited: "#8C8C8C",
        path: "#FEB562",
        start: "#2478FF",
        end: "#FF4242",
        wall: "#6EC3D8",
    });

    const handleSubmitColors = (e) => {
        e.preventDefault();
        setColors(currentColors);
    };

    const handleChangeColor = (colorName, colorValue) => {
        setCurrentColors((prevColors) => ({
            ...prevColors,
            [colorName]: colorValue,
        }));
    };

    return (
        <div>
            <Color
                color={currentColors.visited}
                onChange={(color) => handleChangeColor("visited", color)}
            />
            <Color
                color={currentColors.path}
                onChange={(color) => handleChangeColor("path", color)}
            />
            <Color
                color={currentColors.wall}
                onChange={(color) => handleChangeColor("wall", color)}
            />
            <Color
                color={currentColors.start}
                onChange={(color) => handleChangeColor("start", color)}
            />
            <Color
                color={currentColors.end}
                onChange={(color) => handleChangeColor("end", color)}
            />
            <SubmitColors onClick={handleSubmitColors} />
        </div>
    );
};

export default ColorPicker;
