"use client"

export default function ContinueButton({ onClick }: { onClick: () => void }) {
    return (
        <button onClick={onClick} id="continue-button">Continue to booking</button>
    )
}