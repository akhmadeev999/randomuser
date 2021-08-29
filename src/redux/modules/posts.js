const moduleName = 'posts';

const GET_POSTS = `${moduleName}/GET_POSTS`;
const SET_FILTER_POSTS = `${moduleName}/SET_FILTER_POSTS`;

const defaultState = {
    posts: [],
}

export default (state = defaultState, {type, payload}) => {
    switch (type) {
        case GET_POSTS:
            defaultState.posts = payload;

            return {...state, posts: payload}

        case SET_FILTER_POSTS:
            let selected = {};
            let filteredPosts = [];

            Object.values(payload).map(item => {
                let checkeds = item.data.filter(f => f.isChecked);

                if(checkeds.length > 0){
                    if(item.id === 'g1'){
                        checkeds.map(ch => {
                            filteredPosts = defaultState.posts.filter(post => {
                                if(ch.value === post.gender || ch.value === 'all') {
                                    return true;
                                }
                                return false;
                            })
                        })
                    }else if(item.id === 'g2'){
                        let _filteredPosts = [];
                        checkeds.map(ch => {
                            let sect = filteredPosts.filter(post => {
                                if(post.dob.age >= ch.value.min && post.dob.age < ch.value.max ) {
                                    return true;
                                }
                                return false;
                            })
                            _filteredPosts = [..._filteredPosts, ...sect]
                        })
                        filteredPosts = _filteredPosts;
                    }
                }

                selected[item.id] = checkeds;
            })

            return {...state, posts: filteredPosts}

        default:
            return state;
    }
}

export const getPosts = () => async (dispatch) => {
    try {
        await fetch('https://randomuser.me/api/?results=20&inc=name,gender,dob,location,email,id,picture,registered&nat=us')
            .then((resp) => resp.json())
            .then((data) => dispatch({type: GET_POSTS, payload: data.results}))
    } catch (error) {
        console.log(error)
    }
}

export const setFilterPosts = (groupe) => async (dispatch) => {
    try {
        dispatch({type: SET_FILTER_POSTS, payload: groupe});
    } catch (error) {
        console.log(error)
    }
}

