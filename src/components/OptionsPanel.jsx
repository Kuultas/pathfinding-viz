import { useState, useContext } from 'react';
import styled from 'styled-components';
import { ConfigContext } from '../contexts/ConfigContext';
import ColorPicker from './ColorPicker';

const Main = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 3vh;
    background-color: #50505045;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
`;

const Algorithms = styled.div`
    background-color: transparent;
`;

const Mazes = styled.div`
    background-color: transparent;
`;

const DropdownOptions = styled.select`
    height: 25%;
    border-radius: 5px;
    border: none;
    background-color: transparent;
    font-size: 16px;
`;

const GridSizeForm = styled.form`
    background-color: transparent;
`;

const NumberInput = styled.input`
    padding: 5px;
    margin: 5px;
    background-color: #313131;
    border: none;
    border-radius: 5px;
`;

const SubmitButton = styled.button`
    padding: 5px;
    margin: 5px;
    background-color: #1a1a1a;
    border: none;
    border-radius: 5px;
`;

const OptionsPanel = () => {
    const ctx = useContext(ConfigContext);
    const { config, setConfig } = ctx;

    const [algorithm, setAlgorithm] = useState('dijkstra');
    const [maze, setMaze] = useState('recursiveDivision');
    const [gridSize, setGridSize] = useState({ cols: 15, rows: 15 });

    const handleSubmit = (e) => {
        e.preventDefault();

        setConfig({
            ...config,
            gridSize,
        });
    };

    return (
        <>
            <Main>
                <ColorPicker></ColorPicker>
                <GridSizeForm onSubmit={handleSubmit}>
                    <NumberInput
                        type='number'
                        name='cols'
                        id='cols'
                        min='5'
                        max='50'
                        placeholder='cols'
                        required
                        onChange={(e) =>
                            setGridSize({
                                ...gridSize,
                                cols: e.target.value,
                            })
                        }
                    ></NumberInput>
                    <NumberInput
                        type='number'
                        name='rows'
                        id='rows'
                        min='5'
                        max='50'
                        placeholder='rows'
                        required
                        onChange={(e) =>
                            setGridSize({
                                ...gridSize,
                                rows: e.target.value,
                            })
                        }
                    ></NumberInput>
                    <SubmitButton type='submit'>submit</SubmitButton>
                </GridSizeForm>
            </Main>
        </>
    );
};

export default OptionsPanel;
