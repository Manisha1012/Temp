import './App.css';

import { w3cwebsocket as W3CWebSocket } from 'websocket';


const client = new W3CWebSocket('ws://localhost:5000');
function App() {

    const onButtonClicked = (value)=> {
        //send messsage from client to server
        client.send(JSON.stringify({
            type:"message",
            message: value,
        }));
    }
    //client connection confirmation
    client.onopen = () => {
        console.log('WebSocket Client Connected.');
    };

    //got message from server
    client.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        console.log('Got Reply! ', dataFromServer);
    };


    return (<>

    <button onClick={() => onButtonClicked('Hello')}>Send Message</button>
    
    </>);
}

export default App;

