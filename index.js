let counter = 0;

const getRandomDot = (hor, ver) => {
    const randomDot = {
        hor: 0,
        ver: 0,
    };
    randomDot.hor = Math.floor(Math.random() * hor + 1);
    randomDot.ver = Math.floor(Math.random() * ver + 1);

    return randomDot;
};

const handleClickRedDot = (hor, ver) => {
    const red = document.querySelector('.--red');

    const clickRedDot = () => {
        counter++;
        document.querySelector('.counter').innerHTML = counter;
        red.classList.remove('--red');
        const randomIndex = Math.floor(Math.random() * hor * ver + 1);
        let index = 0;
        document.querySelectorAll('.dot').forEach((dot) => {
            if (index === randomIndex) {
                dot.querySelector('.dotel').classList.add('--red');
            }
            index++;
        });
        red.removeEventListener('click', clickRedDot);
        handleClickRedDot(hor, ver);
    };

    red.addEventListener('click', clickRedDot);
};

const renderApp = () => {
    window.addEventListener('DOMContentLoaded', () => {
        const appElement = document.getElementById('root');
        const appWidth = appElement.offsetWidth;
        const appHeight = appElement.offsetHeight;
        const dotSize = 15;

        const numDotsHorizontal = Math.floor(appWidth / dotSize);
        const numDotsVertical = Math.floor(appHeight / dotSize);

        const randomDot = getRandomDot(numDotsHorizontal, numDotsVertical);

        for (let i = 0; i < numDotsHorizontal; i++) {
            for (let j = 0; j < numDotsVertical; j++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dot.style.left = i * dotSize + 'px';
                dot.style.top = j * dotSize + 'px';
                appElement.appendChild(dot);

                if (i === randomDot.hor && j === randomDot.ver) {
                    dot.innerHTML = `<div class="dotel --red"></div>`;
                } else {
                    dot.innerHTML = `<div class="dotel"></div>`;
                }
            }
        }

        const dotWrap = document.querySelectorAll('.dot');
        dotWrap.forEach((dot) => {
            dot.addEventListener('mouseover', () => {
                const dotel = dot.querySelector('.dotel');
                dotel.classList.add('--active');
                setTimeout(() => {
                    dotel.classList.remove('--active');
                }, 300);
            });
        });

        dotWrap.forEach((dot) => {
            dot.addEventListener('click', () => {
                const dotel = dot.querySelector('.dotel');
                dotel.classList.add('--super-active');
                setTimeout(() => {
                    dotel.classList.remove('--super-active');
                }, 300);
            });
        });

        handleClickRedDot(numDotsHorizontal, numDotsVertical);
    });
};

renderApp();
