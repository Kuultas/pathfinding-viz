import { useState, useContext } from 'react';
import styled, { css } from 'styled-components';
import { ConfigContext } from '../contexts/ConfigContext';

const Main = styled.div`
    background-color: #50505045;
    border-radius: 10px;
    padding: 15px;
    margin: 10px;
`;

const Title = styled.h1`
    font-size: 1.5em;
    font-weight: 300;
    color: #fff;
    text-align: center;
    margin-top: 10px;
    background-color: transparent;
`;

const Algorithms = styled.div`
    display: flex;
    align-content: center;
    justify-content: space-evenly;
    background-color: transparent;
`;

const Mazes = styled.div`
    display: flex;
    align-content: center;
    justify-content: space-evenly;
    background-color: transparent;
`;

const Colors = styled.div`
    display: flex;
    align-content: center;
    background-color: transparent;
`;

const ColorPicker = styled.input.attrs((props) => ({
    style: {
        backgroundColor: props.color,
    },
}))`
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: 5px 10px;

    ::-webkit-color-swatch-wrapper {
        padding: 25px;
    }

    ::-webkit-color-swatch {
        visibility: hidden;
    }
`;

const OptionsPanel = () => {
    const ctx = useContext(ConfigContext);

    return (
        <Main>
            <Title>settings</Title>
            <Algorithms>
                <select name='algorithm' id='algorithm'>
                    <option value='dijkstra'>dijkstra</option>
                    <option value='a-star'>a*</option>
                    <option value='breadth-first'>breadth first</option>
                </select>
            </Algorithms>
            <Mazes>
                <select name='maze' id='maze'>
                    <option value='recursive-division'>
                        recursive division
                    </option>
                    <option value='random'>random</option>
                    <option value='spiral'>spiral</option>
                </select>
            </Mazes>
            <Colors>
                <ColorPicker
                    color={ctx.config.colors.visited}
                    type='color'
                    name='visitedColor'
                    id='visitedColor'
                    onChange={(e) =>
                        ctx.setConfig({
                            ...ctx.config,
                            colors: {
                                ...ctx.config.colors,
                                visited: e.target.value,
                            },
                        })
                    }
                />
                <ColorPicker
                    color={ctx.config.colors.path}
                    type='color'
                    name='pathColor'
                    id='pathColor'
                    onChange={(e) =>
                        ctx.setConfig({
                            ...ctx.config,
                            colors: {
                                ...ctx.config.colors,
                                path: e.target.value,
                            },
                        })
                    }
                />
                <ColorPicker
                    color={ctx.config.colors.wall}
                    type='color'
                    name='wallColor'
                    id='wallColor'
                    onChange={(e) =>
                        ctx.setConfig({
                            ...ctx.config,
                            colors: {
                                ...ctx.config.colors,
                                wall: e.target.value,
                            },
                        })
                    }
                />
                <ColorPicker
                    color={ctx.config.colors.start}
                    type='color'
                    name='startColor'
                    id='startColor'
                    onChange={(e) =>
                        ctx.setConfig({
                            ...ctx.config,
                            colors: {
                                ...ctx.config.colors,
                                start: e.target.value,
                            },
                        })
                    }
                />
                <ColorPicker
                    color={ctx.config.colors.end}
                    type='color'
                    name='endColor'
                    id='endColor'
                    onChange={(e) =>
                        ctx.setConfig({
                            ...ctx.config,
                            colors: {
                                ...ctx.config.colors,
                                end: e.target.value,
                            },
                        })
                    }
                />
            </Colors>
        </Main>
    );
};

export default OptionsPanel;
