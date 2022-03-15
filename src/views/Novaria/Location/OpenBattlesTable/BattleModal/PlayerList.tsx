import { useGetNameByAddress } from "hooks/useNovaria";
import React from "react";
import styled from "styled-components";

const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin:5px;
`

const PlayerList = ({player}) => {
    const playerName = useGetNameByAddress(player)
    console.log('attacker', player)
    return (
        <List>{playerName}; &nbsp;</List>
    )
}
export default PlayerList