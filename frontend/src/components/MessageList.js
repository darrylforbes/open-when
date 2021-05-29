import { Box } from '@material-ui/core';
import { apiUrl } from '../utils';

const MessageList = ({ text }) => {
  const messages = fetch(apiUrl + 'messages')
    .then((response) => response.json())
    .then((data) => console.log(data));

  return (
    <Box>
      <h1>Message List</h1>
      <p>{ text }</p>
    </Box>
  )
}

export default MessageList;
