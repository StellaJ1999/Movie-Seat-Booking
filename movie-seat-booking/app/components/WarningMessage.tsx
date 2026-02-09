"use client";

export default function WarningMessage({ warningMessage }: { warningMessage: string }) {
    return (
        <p className="warning">{warningMessage}</p>
    )
}