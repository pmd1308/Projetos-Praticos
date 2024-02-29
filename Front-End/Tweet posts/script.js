
const tweetForm = document.querySelector('#tweetForm');
const tweetsContainer = document.querySelector('#tweets');

tweetForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const usernameInput = tweetForm.elements.username;
    const tweetInput = tweetForm.elements.tweet;
    addTweet(usernameInput.value, tweetInput.value)
    usernameInput.value = '';
    tweetInput.value = '';

});

const addTweet = (username, tweet) => {
    const newTweet = document.createElement('li');
    const bTag = document.createElement('b');
    bTag.append(username)
    newTweet.append(bTag);
    newTweet.append(`- ${tweet}`)
    tweetsContainer.append(newTweet);

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-tweet');
    removeBtn.textContent = 'X';
    newTweet.append(removeBtn);
}

tweetsContainer.addEventListener('click', function (e) {
    e.target.nodeName === 'LI' && e.target.remove();
})

tweetsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-tweet')) {
      const tweetToRemove = e.target.parentNode;
      tweetToRemove.remove();
    }
  });
  
