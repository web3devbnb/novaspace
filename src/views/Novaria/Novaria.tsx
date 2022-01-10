import { times } from 'lodash'
import React from 'react'
import styled from 'styled-components'

const mockData: [string, string, boolean, boolean, boolean][] = [
    ['Haven', '', true, true, true],
    ['', '', false, false, false],
    ['', '', false, false, false],
    ['', '', false, false, false],
    ['', '', false, false, false],
    ['', '', false, false, false],
    ['', '', false, false, false],
    ['', '', false, false, false],
    ['', '', false, false, false],
    ['', '', false, false, false],
    ['', '', false, false, false],
    ['', '', false, false, false],
    ['The Sun', 'Star', true, true, true],
    ['', '', false, false, false],
    ['', '', false, false, false],
    ['', '', false, false, false],
    ['', '', false, false, false],
    ['', '', false, false, false],
    ['', '', false, false, false],
    ['', '', false, false, false],
    ['', '', false, false, false],
    ['', '', false, false, false],
    ['', '', false, false, false],
    ['', '', false, false, false],
    ['', '', false, false, false],
]
export interface GridProps {
    nx: number
    ny: number
}

const Grid = styled.div`
  height: calc(100vh - 68px - 145px);
  display: grid;
  grid-template-rows: repeat(${(props: GridProps) => props.nx}, 1fr);
  grid-template-columns: repeat(${(props: GridProps) => props.ny}, 1fr);
`

const GridCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Novaria = (props) => {
    const [nx, ny] = [5, 5];

    return (
        <Grid nx={nx} ny={ny}>
            {times(nx * ny, (i) => {
                const [handle, placeType, isDmz, isRefinery, isActive] = mockData[i];
                return (
                    <GridCell>
                        {handle || i}
                    </GridCell>
                )
            })}
        </Grid>
    )
}

export default Novaria
