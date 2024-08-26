// const get = (target) => document.querySelector(target);
// const getAll = (target) => document.querySelectorAll(target);

const loginMiniPage = () => {
    const agreeChks = getAll('#login_page #registerPage_1 .agreeBox i');
    const loginBtn = get('#loginMiniPage button');
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault()
        new Book().next('registerPage_1', 'registerPage_2');
    });
};

