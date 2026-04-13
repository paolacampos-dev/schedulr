export default function PageWrapper ({ children })  {
return (
    <div className="page-container">
        <div className="events-card">
            {children}
        </div>
    </div>
    )
}