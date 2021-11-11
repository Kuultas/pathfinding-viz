import styled from 'styled-components';
import { useState } from 'react';

const ColorsPanel = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
`;

const Color = styled.input.attrs((props) => ({
    style: {
        backgroundColor: props.color,
    },
}))`
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: 5px;
    cursor: pointer;

    ::-webkit-color-swatch-wrapper {
        padding: 5px;
    }

    ::-webkit-color-swatch {
        visibility: hidden;
    }
`;

const SubmitColors = styled.button.attrs(() => ({
    type: 'submit',
}))`
    background-color: #4d4d4d;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;

    &:hover {
        background-color: #555555;
    }
`;

const ColorPicker = ({ setColors }) => {
    const [currentColors, setCurrentColors] = useState({
        visited: '#8C8C8C',
        path: '#FEB562',
        start: '#2478FF',
        end: '#FF4242',
        wall: '#6EC3D8',
    });

    const handleSubmitColors = (e) => {
        e.preventDefault();
        setColors(currentColors);
    };

    return (
        <ColorsPanel>
            <Color
                color={currentColors.visited}
                type='color'
                name='visitedColor'
                id='visitedColor'
                onChange={(e) =>
                    setCurrentColors({
                        ...currentColors,
                        visited: e.target.value,
                    })
                }
            />
            <Color
                color={currentColors.path}
                type='color'
                name='pathColor'
                id='pathColor'
                onChange={(e) =>
                    setCurrentColors({ ...currentColors, path: e.target.value })
                }
            />
            <Color
                color={currentColors.wall}
                type='color'
                name='wallColor'
                id='wallColor'
                onChange={(e) =>
                    setCurrentColors({ ...currentColors, wall: e.target.value })
                }
            />
            <Color
                color={currentColors.start}
                type='color'
                name='startColor'
                id='startColor'
                onChange={(e) =>
                    setCurrentColors({
                        ...currentColors,
                        start: e.target.value,
                    })
                }
            />
            <Color
                color={currentColors.end}
                type='color'
                name='endColor'
                id='endColor'
                onChange={(e) =>
                    setCurrentColors({ ...currentColors, end: e.target.value })
                }
            />
            <SubmitColors onClick={handleSubmitColors}>set colors</SubmitColors>
        </ColorsPanel>
    );
};

export default ColorPicker;
