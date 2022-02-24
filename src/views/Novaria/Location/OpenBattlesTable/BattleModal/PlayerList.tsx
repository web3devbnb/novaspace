import { useGetNameByAddress } from "hooks/useNovaria";
import React from "react";

const PlayerList = ({player}) => {
    const playerName = useGetNameByAddress(player)
    console.log('attacker', player)
    return (
        <span>{playerName}; &nbsp;</span>
    )
}
export default PlayerList