import { useState } from 'react';
import styled from 'styled-components';

const Main = styled.div`
    width: 100vw;
    height: max-content;
    padding: 10px 0 10px 0;
    background-color: #333;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    @media (max-width: 750px) {
        flex-direction: column;
    }
`;

const OptionWrapper = styled.div`
    display: flex;
    margin: 0 10px 0 10px;
    flex: 1.5;

    @media (max-width: 750px) {
        margin: 5px;
    }
`;

const PageTitle = styled.h1`
    font-size: 1rem;
    color: #fff;
    margin-left: 10px;
    display: flex;
    flex: 2;
`;

const Subtitle = styled.h2`
    align-self: center;
    font-size: 0.8rem;
    color: #fff;
    margin-top: 0;
    margin-bottom: 0;
    margin-right: 10px;
`;

const GridSizeForm = styled.form`
    margin: 0 10px 0 10px;
    display: flex;
`;

const Panel = styled.div`
    display: flex;
    flex: 2;
`;

const DropdownOptions = styled.select`
    border-radius: 5px;
    border: none;
    margin: 0 5px 0 5px;

    > option {
        background-color: #333;
        color: #fff;
    }
`;

const NumberInput = styled.input`
    height: 70%;
    background-color: #4d4d4d;
    border: none;
    border-radius: 5px;
    margin-left: 5px;
    align-self: center;
`;

const SubmitButton = styled.button`
    background-color: #4d4d4d;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 5px;
    padding: 5px;
    width: 100px;

    &:hover {
        background-color: #555555;
    }
`;

const OptionsPanel = ({
    setAlgorithm,
    setMaze,
    setRows,
    setCols,
    setSpeed,
}) => {
    const [gridSize, setGridSize] = useState({ cols: 15, rows: 15 });

    const handleSubmit = (e) => {
        e.preventDefault();
        setRows(gridSize.rows);
        setCols(gridSize.cols);
    };

    return (
        <>
            <Main>
                <PageTitle>pathfinding visualizer</PageTitle>
                <OptionWrapper>
                    <Subtitle>grid size:</Subtitle>
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
                        <SubmitButton type='submit'>new grid</SubmitButton>
                    </GridSizeForm>
                </OptionWrapper>
                <OptionWrapper>
                    <Subtitle>algorithms: </Subtitle>
                    <DropdownOptions
                        name='algorithm'
                        id='algorithm'
                        onChange={(e) => setAlgorithm(e.target.value)}
                    >
                        <option value='dijkstra'>dijkstra</option>
                    </DropdownOptions>
                    <DropdownOptions
                        name='maze'
                        id='maze'
                        onChange={(e) => setMaze(e.target.value)}
                    >
                        <option value='recursive-division'>
                            recursive-division
                        </option>
                    </DropdownOptions>
                </OptionWrapper>
                <OptionWrapper>
                    <Subtitle>speed: </Subtitle>
                    <DropdownOptions
                        name='speed'
                        id='speed'
                        onChange={(e) => setSpeed(e.target.value)}
                    >
                        <option value='1'>fast</option>
                        <option value='2'>medium</option>
                        <option value='3'>slow</option>
                    </DropdownOptions>
                </OptionWrapper>
                <Panel></Panel>
            </Main>
        </>
    );
};

export default OptionsPanel;
