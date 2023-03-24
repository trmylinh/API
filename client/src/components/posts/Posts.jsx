import Post from "../post/Post";
import "./posts.scss";
import {useQuery} from '@tanstack/react-query'
import { makeRequest } from "../../axios";

  //TEMPORARY
  const Posts = ({userId}) => {
   
    // const fetchPosts = async () =>{
    //   const response = await axios.get(`http://localhost:8080/api/posts/${userId}`);
      
    //   return response.data;
    // }
  
    // const { isLoading, error, data } = useQuery("posts",fetchPosts);
    

    const { isLoading, error, data } = useQuery(["posts"], () =>
      makeRequest.get("/posts?userId="+userId).then((res) => {
        return res.data;
      })
    );
    // console.log(data);
    return (
      <div className="posts">
        {error 
        ? "Something went wrong!"
        : isLoading 
        ? "loading" 
        : data.map((post)=>
          <Post post={post} key ={post.id}/>)
        }
      </div>
    );
  }

export default Posts;
