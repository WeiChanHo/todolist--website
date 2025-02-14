const nav = () => {
    const openNav = () => {
        document.querySelector('.side-bar').style.width = "250px";
        document.querySelector('.main-body').style.marginLeft = "250px";
        document.querySelector('.side-bar-button').style.left = "180px";
        document.querySelector('.project-name').style.left = "270px";
    };
    const closeNav = () => {
        document.querySelector('.side-bar').style.width = "0";
        document.querySelector('.main-body').style.marginLeft = "0";
        document.querySelector('.side-bar-button').style.left = "20px";
        document.querySelector('.project-name').style.left = "100px";
    }
    return { openNav, closeNav };
};

const navHandler = () => {
    if (window.getComputedStyle(document.querySelector('.side-bar')).width == "250px")
        nav().closeNav();
    else

        nav().openNav();
};


const navButtonHandler = () => {
    const navBtn = document.querySelector('.side-bar-button');
    navBtn.addEventListener('click',navHandler);
}

export { navButtonHandler };