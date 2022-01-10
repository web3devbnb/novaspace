import { times } from 'lodash'
import React from 'react'
import styled from 'styled-components'

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
            {times(nx * ny, (i) => (
                <GridCell>{i}</GridCell>
            ))}
        </Grid>
    )
}

export default Novaria
