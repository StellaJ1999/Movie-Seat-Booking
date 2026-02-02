

export default function AdminButton({ onClick }: { onClick: () => void }) {

    return (
        <button className="admin-button" onClick={onClick} >Admin</button>
    )
}