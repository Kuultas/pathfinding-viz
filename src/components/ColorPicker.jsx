import styled from 'styled-components';
import { useState, useContext } from 'react';
import { ConfigContext } from '../contexts/ConfigContext';

const ColorsPanel = styled.div`
    background-color: transparent;
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
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px;
`;

const ColorPicker = () => {
    const ctx = useContext(ConfigContext);
    const { config, setConfig } = ctx;

    const [currentColors, setCurrentColors] = useState({
        visited: '#8181567f',
        path: '#fad400ce',
        start: '#004bd6',
        end: '#ff1e00',
        wall: '#00945b',
    });

    const handleSubmitColors = (e) => {
        e.preventDefault();
        setConfig({ ...config, colors: currentColors });
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
