import { useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const client = new W3CWebSocket('ws://localhost:5000');

function Blog() {

    const [blog, setBlog] = useState({
        title:"", content:"", user_id:"5"
    });

    let name, value;
    const handleInput = (e) => {
        name =  e.target.name;
        value = e.target.value;

        setBlog({...blog, [name]:value});
    }
    
    const ListItems = Object.keys(blog).map(function(obj, i){
        return (
            <div key={i}>
                Title: {blog[obj].title} ;
                Content: {blog[obj].content}
            </div>
        )
    });

    const onButtonClicked = async (e)=> {
        //send messsage from client to server
        client.send(JSON.stringify(blog));

        e.preventDefault();
        
        const {content, title, user_id} = blog;

        const res = await fetch('/blog', {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                content, title, user_id, created_at: '2022-08-28 21:03:23'
            })
        });

        const data = await res.json();

        if(res.status === 422 || !data){
            window.alert(data.error);
        } else {
            console.log('success');
        }
    };

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
    <form method="POST">
        <label>Title: </label><input type="text" name="title" value={blog.title} onChange={handleInput}/><br/>
        <label>Content: </label><textarea name="content" value={blog.content} onChange={handleInput}></textarea><br/>
        <input type="hidden" name="user_id" value={blog.user_id}/>
        <button onClick={onButtonClicked}>Post</button>
        </form>


    <h3>Posts</h3>
    {ListItems}

    </>);
}

export default Blog;

