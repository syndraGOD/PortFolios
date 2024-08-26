// const get = (target) => document.querySelector(target);
// const getAll = (target) => document.querySelectorAll(target);

const registerPage_1 = () => {
    const agreeChks = getAll('#login_page #registerPage_1 .agreeBox i');
    const [disAgreeBtn, agreeBtn] = getAll('#login_page #registerPage_1 .btnBox button');
    agreeBtn.addEventListener('click', (e) => {
        e.target.innerHTML = '';
    });
}

const indexPage = () => {};
const registerPage_2 = () => {};