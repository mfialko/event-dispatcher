
import { sendEvent } from './touratte.js';
import { eventState } from './touratte.js';

let post = document.querySelector('.post');
let list = document.querySelector('.list');
let btn = document.querySelector('.stop-event');
let postsCounter = {};

document.addEventListener("shout", (event) => {
    post.innerHTML = `<h3>${event.detail.author}</h3>
                      <p>${event.detail.text}</p>`;
    post.classList.add('highlight');
    post.classList.add('with-border');
    list.classList.add('with-border');
    setTimeout(() => {
        post.classList.remove('highlight');
    }, 1000);
    postsCounter.hasOwnProperty(event.detail.author) ?
        postsCounter[event.detail.author] += 1 :
        postsCounter[event.detail.author] = 1;
    renderList();
    }, false);

const renderList = () => {
    let authorsScores = [];
    for (let i in postsCounter) {
        authorsScores.push(`
            <li>${i}: ${postsCounter[i]}</li>
        `)
    }
    list.innerHTML = authorsScores.join('');
}
btn.addEventListener('click', () => {
    if (eventState.state) {
        eventState.state = false;
        btn.innerHTML = 'Send';
    } 
    else {
        eventState.state = true;
        btn.innerHTML = 'Stop';
        sendEvent(); 
    }    
});
