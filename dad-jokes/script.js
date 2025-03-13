const btn = document.getElementById('jokeBtn')
const joke = document.getElementById('joke')

joke.addEventListener('click', createJoke)

createJoke()

async function createJoke() {
    const config = {
        headers:{
            Accept: 'application/json',
        },
    }
    const res = await fetch('https://icanhazdadjoke.com', config)
    const data = await res.json()

    joke.innerHTML = data.joke
}