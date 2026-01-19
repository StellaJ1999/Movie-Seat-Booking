"use client";

export default function Seat({occupied, selected, onSelect}:  {occupied: boolean, selected: boolean, onSelect: () => void}) {
   
    return (
        <div className={`seat${selected ? ' selected' : ''}${occupied ? ' occupied' : ''}`} onClick ={occupied ? undefined : onSelect}></div>
    )
}