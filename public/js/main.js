const output = document.querySelector('#output')
const button = document.querySelector('#get-posts-button')
const form = document.querySelector('#add-post-form')

async function showPosts(){
    try{
        const res = await fetch('http://localhost:8000/api/posts')
        if(!res.ok){
            throw new Error('failed to fetch posts'); 
        }

        const posts = await res.json()
        output.innerHTML = ''

        posts.forEach((post) => {
            const postEl = document.createElement('div')
            postEl.textContent = post.title
            output.appendChild(postEl)
        });
    }
    catch(error){
        console.log('Error fetching post', error)
    }
}

//submit new post
async function addPost(e){
    e.preventDefault()
    const formData = new FormData(this)
    const title = formData.get('title')

    try {
        const res = await fetch('http://localhost:3000/api/posts', {
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({title})
        })
        if(!res.ok){
            throw new Error('failed to add post')
        }
        const newPost = await res.json()
        const postEl = document.createElement('div')
        postEl.textContent = newPost.title
        output.appendChild(postEl)
        showPosts()
    } catch (error) {
        console.error('Error adding post')
    }
}

//event listeners
button.addEventListener('click', showPosts)
form.addEventListener('submit', addPost)