export default function TwoEntitiesView(props) {
    return (
        <div {...props}>
            <h3>{props.name}</h3>
            <p>{props.text}</p>
        </div>
    )
}