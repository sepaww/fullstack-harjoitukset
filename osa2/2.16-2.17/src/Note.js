import "./css/Note.css"

const Notification = ({ message }) => {
    if (message.content === null) {
        console.log("????")
      return 
    }
  
    return (
      <div className={message.type ? 'error' : 'affirmation'}>
        {message.content}
      </div>
    )
  }
  export default Notification