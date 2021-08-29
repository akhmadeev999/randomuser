import logo from './logo.svg';
import './App.css';
import './App-media.css';
import {connect} from "react-redux";
import {getPosts as getPostAction, setFilterPosts as setFilterPostsAction} from "./redux/modules/posts";
import { Filter, Post, Header, SearchBar } from "./components/";
import {useEffect} from "react";

function App({posts, getPosts, setFilterPosts}) {

    useEffect(()=>{
        getPosts();

        console.log('sadasdasd', setFilterPosts);
    }, [])

    console.log(posts);

    return (
        <div className="App">
            <Header>
                <SearchBar />
                <Filter filterChange={ setFilterPosts } />
            </Header>
            <div className={'posts'}>
                {
                    posts.map(item => <Post key={ item.email } { ...item }/>)
                }
            </div>

        </div>
    );
}

export default connect(
    ({posts}) => ({...posts}),
    {
        getPosts: getPostAction,
        setFilterPosts: setFilterPostsAction
    }
)(App);
