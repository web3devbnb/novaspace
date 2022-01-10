import { times } from 'lodash'
import React from 'react'
import styled from 'styled-components'

const Grid = styled.div.attrs(props => ({ nx: 5, ny: 5 }))`
  display: grid;
  grid-template-columns: repeat(${props => props.nx}, 1fr);
  grid-template-rows: repeat(${props => props.ny}, 1fr);
`

const GridCell = styled.div`
`

const Novaria = (props) => {
    const [nx, ny] = [5, 5];

    return (
        <Grid nx={nx} ny={ny}>
            {times(nx * ny, () => (
                <GridCell />
            ))}
        </Grid>
    )
}

export default Novaria
