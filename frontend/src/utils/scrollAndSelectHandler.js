export const enableScroll = () => {
    document.body.style.overflow = 'auto';
    document.body.classList.remove('noselect');

}

export const disableScroll = () => {
    document.body.style.overflow = 'hidden';
    document.body.classList.add('noselect');
}


