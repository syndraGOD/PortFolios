const get = (target) => document.querySelector(target);
const getAll = (target) => document.querySelectorAll(target);

let bookList = [];
let currentBook;

//class내부 Promise 처리로 10시간 날림
//Promise 객체
//await 후 상위로 돌아가서 (비동기 처리 후)함수를 처리하는 방법은 결국 없다.
//무조건 then() 내부에서 타 함수 호출할것.
//Promise 이해도만 엄청 올랐네

class Page {
    constructor(name, html) {
        // this.component = `./component/${component}.html`;
        this.name = name;
        this.html = html;
    }
    newPage = async (component) => {
        const html = await fetch(`./component/${component}.html`);
        const newClass = html.text().then((e) => {
            return new Page(component, e);
        });
        return newClass;
    };
    jsApply = () => {
        eval(`${this.name}()`)
    }
    // async html() {
    //     let result = await fetch(this.component);
    //     return await result.text();
    // }
}

class Book {
    constructor(leftPage, rightPage, prevBook) {
        // console.log(leftPage)
        this.leftPage = leftPage;
        // console.log(leftPage);
        this.rightPage = rightPage;
        this.prevBook = prevBook;
    }
    prev() {
        this.reload(this.prevBook);
        get('#login_page #page_prev').classList.remove('hide');
        if (bookList[length] <= 1) {
            get('#login_page #page_prev').classList.add('hide');
        }
    }
    next(page1, page2, index) {
        Promise.all([new Page().newPage(page1), new Page().newPage(page2)]).then((pages) => {
            bookList.push(new Book(pages[0], pages[1], index ? undefined : this));
            bookList[bookList.length - 1].reload();
            get('#login_page #page_prev').classList.remove('hide');
            if (bookList.length <= 1) {
                get('#login_page #page_prev').classList.add('hide');
            }
            console.log(bookList)

        });
    }
    reload(book) {
        if (book) {
            this.getInit(book.leftPage, '#appBox1');
            this.getInit(book.rightPage, '#appBox2');
        } else {
            // console.log(this);
            this.getInit(this.leftPage, '#appBox1');
            this.getInit(this.rightPage, '#appBox2');
        }
    }
    getInit(page, tag) {
        get(tag).innerHTML = page.html;
        page.jsApply()
    }
}

//newPage, appInit 둘다 클래스 안에 넣을 수 있을것 같긴한데, 10시간 삽질했으니 그만하고 개발이나하자
// const newPage = async (component) => {
//     const html = await fetch(`./component/${component}.html`);
//     const newClass = html.text().then((e) => {
//         return new Page(e);
//     });
//     return newClass;
// };

// let appInit = async (page1, page2, prevBook) => {
//     Promise.all([newPage(page1), newPage(page2)]).then((pages) => {
//         bookList.push(new Book(pages[0], pages[1], prevBook));
//         bookList[bookList.length-1].reload()
//     });
// };

(() => {
    new Book().next('indexPage', 'loginMiniPage', 1);

    get('#login_page #page_prev').addEventListener('click', () => {
        currentBook.prev();
    });
})();
