"use client";

interface SummaryProps {
  selectedSeatCount: number;
  totalPrice: number;
}

const Summary: React.FC<SummaryProps> = ({ selectedSeatCount, totalPrice }) => {
    return (
    <p className="text">
      You have selected  
      <span id="count"> {selectedSeatCount} </span>
        seats for a price of 
      <span id="total"> {totalPrice} </span>
        kr.
    </p>
    )
}

export default Summary;