
type propsType = {
    title:string
    callback:() => void
}

export const Button = (props:propsType) => {

    const onClickHandler = () => {
        props.callback()
    }
    return(
        <button onClick={onClickHandler}>{props.title}</button>
    )
}