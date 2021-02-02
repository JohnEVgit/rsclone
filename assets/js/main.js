'use strict';

const config = {
    startDialogClass: 'startDialog',
    peacefulEndingDialogClass: 'peacefulEndingDialog',
    endGameDialogClass: 'endGameDialogClass',
    gameLanguage: localStorage.getItem('gameLanguage') ? localStorage.getItem('gameLanguage') : 'en',
    gameCount: localStorage.getItem('gameCount') ? +localStorage.getItem('gameCount') : 0,
    dialogCount: 0,
    mainBtnCount: 0,
    resetBtnCount: 0,
    achievementCount: localStorage.getItem('achievementCount') ? +localStorage.getItem('achievementCount') : 0,
    achievementList: localStorage.getItem('achievementList') ? localStorage.getItem('achievementList') : '',
    canDialogClick: true,
    bodyElem: document.body,
    mainBtnElem: document.querySelector('.main-btn'),
    resetBtnElem: document.querySelector('.reset-btn'),
    menuBtnsList: document.querySelectorAll('.menu-btn'),
    achievementElemsList: document.querySelectorAll('.achievement-elem'),
    waitPeacefulEnding: null,

    volume: localStorage.getItem('volume') ? +localStorage.getItem('volume') : 0.8,
    volumeElem: document.querySelector('.menu-volume'),
    audio: null,

    audioStart: './assets/audio/pdta-start.mp3',
    audioMain: './assets/audio/pdta-main.mp3',
    audioEnding: './assets/audio/pdta-ending.mp3',
    audioEnding2: './assets/audio/pdta-ending2.mp3',
    isMushroomBtnSwitch: false,

    isRomanBtnStart: false,
    isRomanBtnSwitch: false,
    romanBtnCod: [],

    isSwitchSecondLeft: false,
    isSwitchSecondRight: false,

    isBenderBtnStart: false,
    benderBtnCod: [],

    isDditBtnStart: false,
    dditBtnCod: [],

    counterBtnCount: 0,
    counterBtnUnits: document.querySelector('.counter-btn-number-val.units'),
    counterBtnDozens: document.querySelector('.counter-btn-number-val.dozens'),
    counterBtnHundreds: document.querySelector('.counter-btn-number-val.hundreds'),

    screwdriverElem: document.querySelector('.screwdriver-elem'),
    hammerElem: document.querySelector('.hammer-elem'),
    currentDroppable: null,

    isColorBtnStart: false,
    colorBtnCod: [],

    isPhoneBtnStart: false,
    isPhoneBtnActive: false,
    phoneBtnCod: [],

    satanicBtnCod: [],

    isFourBtnStart: false,
    fourBtnCod: [],

    drinkCoffeeCount: 0,

    lang: {
        en: {
            startDialog: [
                {phrase: '...Hey man!', position: 'left'},
                {phrase: 'Man!', position: 'left'},
                {phrase: 'I need to take a bathroom break, stay here for a moment!', position: 'left'},
                {phrase: 'Wait! What is this panel for?', position: 'right'},
                {phrase: 'Just stay here, i\'ll be right back!', position: 'left'},
                {phrase: '...And don\'t touch anything!', position: 'left'},
            ],
            peacefulEndingDialog: [
                {phrase: '...Great. Thanks, man! You\'ve really helped me.', position: 'left'},
                {phrase: 'What took you so long? Something could happen.', position: 'right'},
                {phrase: 'Really?', position: 'left'},
                {phrase: 'Like what, the appocalypse?', position: 'left'},
                {phrase: 'You\'ve got to have an education to run this machine.', position: 'left'},
                {phrase: 'Let\'s go.', position: 'left'},
            ],
            endGameDialogClass: [
                {phrase: '...Hey man!', position: 'left'},
                {phrase: 'Man!', position: 'left'},
                {phrase: 'I need to take a bathroom break, stay here for a moment!', position: 'left'},
                {phrase: 'Wait! What is this panel for?', position: 'right'},
                {phrase: 'Ah, don\'t bother, it\'s just a coffee machine.', position: 'left'},
                {phrase: 'And why is it so strange?', position: 'right'},
                {phrase: 'I don\'t know. It just appeared here ane day.', position: 'left'},
                {phrase: 'Sometimes it shows ads on the screen.', position: 'left'},
                {phrase: 'You can order some coffee while i\'m gone. There is the red button.', position: 'left'},
                {phrase: 'Ok, but don\'t take it too long.', position: 'right'},
            ],
            menu: ['Resume game','Language','Fullscreen','Delete savegame','Exit game'],
            achievements: ['Peaceful',
                'Disobedience',
                'Mushroom Cloud',
                'Bender',
                'UFO',
                'Green',
                'We are Watching',
                'Yin-Yang',
                'Back to the Future',
                'Satanic',
                'Black Hole',
                'Meteors'],
        },
        by: {
            startDialog: [
                {phrase: '...Гэй, хлопец!', position: 'left'},
                {phrase: 'Хлопец!', position: 'left'},
                {phrase: 'Мне трэба адысці ў туалет, пачакай мяне тут!', position: 'left'},
                {phrase: 'Пачакай! А для чаго гэтая панэль?', position: 'right'},
                {phrase: 'Проста пастой тут, я хутка вярнуся!', position: 'left'},
                {phrase: '...і нічога не чапай!', position: 'left'},
            ],
            peacefulEndingDialog: [
                {phrase: '...Крута. Дзякуй! Ты мяне выбавіў.', position: 'left'},
                {phrase: 'Ты чаго так доўга? Магло што-небудзь здарыцца.', position: 'right'},
                {phrase: 'Праўда?', position: 'left'},
                {phrase: 'Што напрыклад, апакаліпсіс?', position: 'left'},
                {phrase: 'Патрэбна як мінімум вышэйшая адукацыя, каб кіравацца з гэтай машынай.', position: 'left'},
                {phrase: 'Пайшлі.', position: 'left'},
            ],
            endGameDialogClass: [
                {phrase: '...Гэй, хлопец!', position: 'left'},
                {phrase: 'Хлопец!', position: 'left'},
                {phrase: 'Мне трэба адысці ў туалет, пачакай мяне тут!', position: 'left'},
                {phrase: 'Пачакай! А для чаго гэтая панэль?', position: 'right'},
                {phrase: 'А, нічога асаблівага, проста кавамашына.', position: 'left'},
                {phrase: 'А чаму такая дзіўная?', position: 'right'},
                {phrase: 'Ды не ведаю. Яна проста аднойчы тут з\'явілася.', position: 'left'},
                {phrase: 'Часам паказвае рэкламу на экране.', position: 'left'},
                {phrase: 'Можаш заказаць каву, пакуль мяне няма. Вунь чырвоная кнопка.', position: 'left'},
                {phrase: 'Добра, але не затрымлівайся.', position: 'right'},
            ],
            menu: ['Працягнуць','Мова гульні','Поуны экран','Выдаліць захаванне','Выхад'],
            achievements: ['Памяркоўнасць',
                'Ганаровы націскач',
                'Ядзерны выбух',
                'Бэндэр',
                'НЛА',
                'Расліна',
                'Ілюмінаты',
                'Інь Янь',
                'Назад у будучыню',
                'Жах сатаны',
                'Чорная дзірка',
                'Метэарытны дождж'],
        },
        ru: {
            startDialog: [
                {phrase: '...Эй, парень!', position: 'left'},
                {phrase: 'Парень!', position: 'left'},
                {phrase: 'Мне надо отойти в туалет, подожди меня тут!', position: 'left'},
                {phrase: 'Погоди! А для чего эта панель?', position: 'right'},
                {phrase: 'Просто постой тут, я скоро вернусь!', position: 'left'},
                {phrase: '...и ничего не трогай!', position: 'left'},
            ],
            peacefulEndingDialog: [
                {phrase: '...Круто. Спасибо! Ты меня выручил.', position: 'left'},
                {phrase: 'Ты чего так долго? Могло ведь что-нибудь произойти.', position: 'right'},
                {phrase: 'Правда?', position: 'left'},
                {phrase: 'Что например, апокалипсис?', position: 'left'},
                {phrase: 'Нужно как минимум высшее образование, чтобы управляться с этой машиной.', position: 'left'},
                {phrase: 'Пошли.', position: 'left'},
            ],
            endGameDialogClass: [
                {phrase: '...Эй, парень!', position: 'left'},
                {phrase: 'Парень!', position: 'left'},
                {phrase: 'Мне надо отойти в туалет, подожди меня тут!', position: 'left'},
                {phrase: 'Погоди! А для чего эта панель?', position: 'right'},
                {phrase: 'А, ничего особенного, просто кофемашина.', position: 'left'},
                {phrase: 'А почему такая странная?', position: 'right'},
                {phrase: 'Да не знаю. Она просто однажды тут появилась.', position: 'left'},
                {phrase: 'Иногда показывает рекламу на экране.', position: 'left'},
                {phrase: 'Можешь заказать кофе, пока меня нет. Вон красная кнопка.', position: 'left'},
                {phrase: 'Хорошо, но не задерживайся.', position: 'right'},
            ],
            menu: ['Продолжить','Язык игры','Полный экран','Удалить сохранение','Выход'],
            achievements: ['Терпимость',
                'Почётный нажиматель',
                'Ядерный взрыв',
                'Бендер',
                'НЛО',
                'Растение',
                'Иллюминаты',
                'Инь Янь',
                'Назад в будущее',
                'Ужас сатаны',
                'Чёрная дыра',
                'Метеоритный дождь'],
        }
    }
};

const showFirstScreen = () => {
    const firstScreenElem = document.querySelector('.first-screen');
    firstScreenElem.addEventListener('click', function () {
        firstScreenElem.remove();
        init();
    });
};

const init = () => {

    initAudio();


    if (!localStorage.getItem('gameLanguage')) {
        chooseLanguage(false);
    } else {

        document.querySelector(`.choose-language-radio[value="${config.gameLanguage}"]`).checked = true;

        if (config.gameCount < 3) {
            runDialog(config.startDialogClass);
        } else {
            waitPeacefulEnding();
        }
    }

    showAchievements();
    changeMenuLanguage();
    changeAchievementsLanguage();
    menuEvents();
    mainEvents();
    resetGame();
};


const chooseLanguage = (isMenu) => {
    const chooseLanguageBlock = document.querySelector('.choose-language');
    const chooseLanguageElems = chooseLanguageBlock.querySelectorAll('.choose-language-radio');

    chooseLanguageBlock.classList.add('show');
    if (isMenu) {
        chooseLanguageBlock.classList.add('show-in-menu');
    }

    chooseLanguageElems.forEach(function(btn) {
        if (btn.checked) {
            btn.nextElementSibling.addEventListener('click', function () {
                chooseLanguageBlock.classList.remove('show');
            });
        }
        btn.addEventListener('change', function () {
            config.gameLanguage = btn.value;
            localStorage.setItem('gameLanguage',btn.value);

            chooseLanguageBlock.classList.remove('show');

            if (isMenu) {
                chooseLanguageBlock.classList.remove('show-in-menu');
            } else {
                runDialog(config.startDialogClass);
            }

            changeMenuLanguage();
            changeAchievementsLanguage();
        });

    });

};
const changeMenuLanguage = () => {
    config.menuBtnsList.forEach(function(btn,i) {
        btn.textContent = config.lang[config.gameLanguage].menu[i];
    });
};
const changeAchievementsLanguage = () => {
    config.achievementElemsList.forEach(function(elem,i) {
        elem.textContent = config.lang[config.gameLanguage].achievements[i];
    });
};


const menuEvents = () => {
    document.querySelector('.open-menu-btn').addEventListener('click', function () {
        config.bodyElem.classList.add('body-menu-opened');
        clearTimeout(config.waitPeacefulEnding);
    });
    document.querySelector('.menu-btn-resume-js').addEventListener('click', function () {
        config.bodyElem.classList.remove('body-menu-opened');
        waitPeacefulEnding();
    });
    document.querySelector('.menu-btn-lang-js').addEventListener('click', function () {
        chooseLanguage(true);
    });
    document.querySelector('.menu-btn-fullscreen-js').addEventListener('click', function () {
        showFullscreen();
    });
    document.querySelector('.menu-btn-del-js').addEventListener('click', function () {
        config.bodyElem.classList.remove('body-menu-opened');

        clearLocalStorageg();
        clearAchievements();
        clearConfig();

        pauseAudio();
        config.audio.src = config.audioStart;
        config.audio.play();

        runDialog(config.startDialogClass);
    });
    document.querySelector('.menu-btn-quite-js').addEventListener('click', function () {
        window.close();
    });
    config.volumeElem.addEventListener('input', function () {
        const valueNum = this.value / 10;

        config.audio.volume = valueNum;
        config.volume = valueNum;
        localStorage.setItem('volume', config.volume);
    });

};

const showFullscreen = () => {

    const elem = document.documentElement;

    if (config.bodyElem.classList.contains('body-fullscreen')) {

        config.bodyElem.classList.remove('body-fullscreen');

        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }

    } else {

        config.bodyElem.classList.add('body-fullscreen');

        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }

    }

};


const runDialog = (dialogClass) => {

    config.bodyElem.insertAdjacentHTML('beforeend', `<div class="dialog-block ${dialogClass}"></div>`);

    let dialogBlockElem = document.querySelector(`.${dialogClass}`);

    renderDialog(dialogBlockElem, dialogClass);
    config.dialogCount++;

    dialogBlockElem.addEventListener('click', function () {

        if (!config.canDialogClick) {
            return false;
        }

        if (config.dialogCount < config.lang[config.gameLanguage][dialogClass].length) {
            renderDialog(dialogBlockElem, dialogClass);
        } else {
            closeDialog(dialogBlockElem);
            return false;
        }

        config.dialogCount++;

    });

};

const renderDialog = (dialogContElem, dialogClass) => {
    const text = config.lang[config.gameLanguage][dialogClass][config.dialogCount].phrase,
    position = config.lang[config.gameLanguage][dialogClass][config.dialogCount].position;
    dialogContElem.insertAdjacentHTML('beforeend', `<p class="dialog dialog-${position} start-dialog${config.dialogCount}" 
        data-text="${text}"><span class="dialog-text"></span></p>`);

    writeTextByJS(dialogContElem.querySelector('.dialog:last-child .dialog-text'), text);

};

const writeTextByJS = (elem, text) => {

    let textArr = text.split("");
    config.canDialogClick = false;

    let interval = setInterval(() => {

        if(!textArr[0]){
            config.canDialogClick = true;
            return clearInterval(interval);
        }

        elem.innerHTML += textArr.shift();
    }, 25);

    return false;
};

const closeDialog = (dialogContElem) => {
    dialogContElem.remove();
    config.dialogCount = 0;

    if (dialogContElem.classList.contains('startDialog')) {
        config.gameCount++;
        localStorage.setItem('gameCount', config.gameCount);

        waitPeacefulEnding();
    }
};





const waitPeacefulEnding = () => {
    config.waitPeacefulEnding = setTimeout (() => {
        if(config.mainBtnCount =! 0 && config.achievementCount <= 12){
            getAchievement(1);
            runDialog(config.peacefulEndingDialogClass);
        }
    }, 60000);
};

const resetGame = () => {
    config.resetBtnElem.addEventListener('click', function () {
        resetConfig();

        clearTimeout(config.waitPeacefulEnding);
        waitPeacefulEnding();

        pauseAudio();
        if (config.achievementCount === 13) {
            config.audio.src = config.audioEnding2;
            document.querySelector('.screen-top-text').textContent = 'Game Over!';
            config.bodyElem.classList.add('body-game-over');
        } else {
            config.audio.src = config.audioStart;
        }
        config.audio.play();

        if (config.achievementCount === 12) {
            getAchievement(13);
        }
    });
};






const getAchievement = (number) => {
    const achievementElem = document.querySelector(`.achievement-elem${number}`);
    if (achievementElem) {
        achievementElem.classList.add('active');
    }

    const achievementProgress = document.querySelector(`.progress-elem[data-achievement="${number}"]`);
    achievementProgress.classList.add('active');

    if (config.achievementList) {
        if (config.achievementList.toString().split(',').indexOf(number.toString()) === -1) {
            config.achievementList += ',' + number;
            config.achievementCount++;
        }
    } else {
        config.achievementList = number;
        config.achievementCount++;
    }
    localStorage.setItem('achievementList', config.achievementList);
    localStorage.setItem('achievementCount', config.achievementCount);

    if (config.achievementCount === 13) {
        runDialog(config.endGameDialogClass);
        pauseAudio();
        config.audio.src = config.audioEnding2;
        config.audio.play();
        config.bodyElem.classList.add('body-game-over');
        document.querySelector('.screen-top-text').textContent = 'Game Over!';
    } else {
        blockBtns();
        pauseAudio();
        config.audio.src = config.audioEnding;
        config.audio.play();
        document.querySelector('.screen-top-text').textContent = achievementElem.textContent;
    }
};
const clearAchievements = () => {
    config.achievementElemsList.forEach(function(elem) {
        elem.classList.remove('active');
    });

    const achievementProgresses = document.querySelectorAll('.progress-elem');
    achievementProgresses.forEach(function(elem) {
        elem.classList.remove('active');
    });
};
const showAchievements = () => {
    if (config.achievementList) {
        config.achievementList.split(',').forEach(function(number) {
            if (number <= 12) {
                let achievementElem = document.querySelector(`.achievement-elem${number}`);
                achievementElem.classList.add('active');
            }
            let achievementProgress = document.querySelector(`.progress-elem[data-achievement="${number}"]`);
            achievementProgress.classList.add('active');
        });
    }
};

const clearLocalStorageg = () => {
    let tmp = localStorage.getItem('gameLanguage');
    localStorage.clear();
    localStorage.setItem('gameLanguage', tmp);
};

const resetConfig = () => {
    config.resetBtnCount = 0;
    config.mainBtnCount = 0;
    config.bodyElem.className = '';
    config.mainBtnElem.disabled = false;
    config.isMushroomBtnSwitch = false;
    config.isRomanBtnStart = false;
    config.isRomanBtnSwitch = false;
    config.romanBtnCod = [];
    config.isSwitchSecondLeft = false;
    config.isSwitchSecondRight = false;
    config.isBenderBtnStart = false;
    config.benderBtnCod = [];
    config.isDditBtnStart = false;
    config.dditBtnCod = [];
    config.isColorBtnStart = false;
    config.colorBtnCod = [];
    config.isPhoneBtnStart = false;
    config.isPhoneBtnActive = false;
    config.phoneBtnCod = [];
    config.satanicBtnCod = [];
    config.isFourBtnStart = false;
    config.fourBtnCod = [];
    config.drinkCoffeeCount = 0;

};
const clearConfig = () => {
    resetConfig();
    config.gameCount = 0;
    config.dialogCount = 0;
    config.achievementCount = 0;
    config.achievementList = '';
};

const blockBtns = () => {
    config.bodyElem.classList.add('disabled-btns-when-achievement');
    config.mainBtnElem.disabled = true;
};


const initAudio = () => {
    if (config.achievementCount === 13) {
        config.audio = new Audio(config.audioEnding2);
        document.querySelector('.screen-top-text').textContent = 'Game Over!';
        config.bodyElem.classList.add('body-game-over');
    } else {
        config.audio = new Audio(config.audioStart);
    }
    config.audio.loop = true;
    config.audio.volume = config.volume;

    config.volumeElem.value = config.volume * 10;
    config.audio.play();
};

const pauseAudio = () => {
    config.audio.pause();
    config.audio.currentTime = 0;
};


const mainEvents = () => {
    config.mainBtnElem.addEventListener('click', function () {
        mainBtnEvent();
    });
    document.querySelector('.mushroom-btn-block').addEventListener('click', function () {
        activeMushroomBtn();
    });
    document.querySelectorAll('.roman-btn').forEach(function (elem) {
        elem.addEventListener('click', function () {
            activeRomanBtns(this);
        })
    });
    document.querySelector('.switch-second-left').addEventListener('click', function () {
        activeSwitchSecondLeft();
    });
    document.querySelector('.switch-second-right').addEventListener('click', function () {
        activeSwitchSecondRight();
    });
    document.querySelectorAll('.bender-btn').forEach(function (elem) {
        elem.addEventListener('click', function () {
            activeBenderBtns(this);
        })
    });
    document.querySelectorAll('.ddit-btn').forEach(function (elem) {
        elem.addEventListener('click', function () {
            activeDditBtns(this);
        })
    });

    document.querySelector('.counter-btn-submit').addEventListener('click', function () {
        activeCounterBtnSubmit();
    });
    document.querySelector('.counter-btn-addone').addEventListener('click', function () {
        activeCounterBtnAddone();
    });

    document.querySelectorAll('.color-btn').forEach(function (elem) {
        elem.addEventListener('click', function () {
            activeColorBtns(this);
        })
    });

    document.querySelectorAll('.phone-btn').forEach(function (elem) {
        elem.addEventListener('click', function () {
            activePhoneBtns(this);
        })
    });

    document.querySelectorAll('.satanic-btn').forEach(function (elem) {
        elem.addEventListener('click', function () {
            activeSatanicBtns(this);
        })
    });

    document.querySelectorAll('.four-btn').forEach(function (elem) {
        elem.addEventListener('click', function () {
            activeFourBtns(this);
        })
    });

    document.querySelector('.main-coffee').addEventListener('click', function () {
        drinkCoffee();
    });

};
const clearBodyClassList = () => {
    let classListArr = config.bodyElem.classList;
    while (classListArr.length > 0) {
        classListArr.remove(classListArr.item(0));
    }
};
const mainBtnEvent = () => {
    config.mainBtnCount++;

    if ( config.achievementCount >= 12 ) {
        config.bodyElem.classList.remove('body-coffee-drink3');
        config.bodyElem.classList.add('body-coffee-show');
        return false;
    }

    if (config.isMushroomBtnSwitch) {
        clearBodyClassList();
        getAchievement(3);
        return false;
    }

    switch (config.mainBtnCount) {
        case 1:
            clearTimeout(config.waitPeacefulEnding);
            pauseAudio();
            config.audio.src = config.audioMain;
            config.audio.play();
            config.bodyElem.classList.add('body-mushroom-btn-show');
            break;
        case 2:
            config.bodyElem.classList.add('body-roman-btn-show');
            break;
        case 8:
            config.bodyElem.classList.add('body-screwdriver-block-show');
            break;
        case 15:
            config.bodyElem.classList.add('body-hammer-block-show');
            break;
        case 20:
            getAchievement(2);
            config.bodyElem.classList.add('body-main-screen-switch-off');
            break;
    }

};

const activeMushroomBtn = () => {
    config.bodyElem.classList.add('body-mushroom-btn-active');
    config.isMushroomBtnSwitch = true;
};

const activeRomanBtns = (thisElem) => {

    changeNumbersShow(thisElem);

    let btnNumber = +thisElem.dataset.roman;

    config.romanBtnCod.push(btnNumber);
    document.querySelector('.screen-bottom-roman-numbers span:nth-child(' + config.romanBtnCod.length + ')').textContent = btnNumber;
    if (config.romanBtnCod.length >= 6) {
        if (config.romanBtnCod.join() === [1,3,2,2,3,1].join()) {
            config.isRomanBtnSwitch = true;
            config.bodyElem.classList.add('body-switch-second-show');
        }
        config.romanBtnCod = [];
        setTimeout (() => {
            document.querySelectorAll('.screen-bottom-roman-numbers span').forEach(function (item) {
                item.textContent = '_'
            });
        }, 200);
    }

};

const activeSwitchSecondLeft = () => {
    config.isSwitchSecondLeft = true;
    config.bodyElem.classList.add('body-switch-second-left', 'body-phone-btn-show');
};
const activeSwitchSecondRight = () => {
    config.bodyElem.classList.add('body-switch-second-right', 'body-bender-btn-show');
};

const activeBenderBtns = (thisElem) => {

    changeNumbersShow(thisElem);

    let btnNumber = +thisElem.dataset.bender;

    config.benderBtnCod.push(btnNumber);
    document.querySelector('.screen-bottom-bender-numbers span:nth-child(' + config.benderBtnCod.length + ')').textContent = btnNumber;
    if (config.benderBtnCod.length >= 7) {
        if (config.benderBtnCod.join() === [0,0,1,0,0,0,1].join()) {
            clearBodyClassList();
            getAchievement(4);
        }
        config.benderBtnCod = [];
        setTimeout (() => {
            document.querySelectorAll('.screen-bottom-bender-numbers span').forEach(function (item) {
                item.textContent = '_'
            });
        }, 200);
    }

};


const activeDditBtns = (thisElem) => {

    changeNumbersShow(thisElem);

    let btnNumber = +thisElem.dataset.ddit;

    config.dditBtnCod.push(btnNumber);
    document.querySelector('.screen-bottom-ddit-numbers span:nth-child(' + config.dditBtnCod.length + ')').textContent = '◼';
    if (config.dditBtnCod.length >= 4) {
        if (config.dditBtnCod.join() === [1,2,2,1].join()) {
            clearBodyClassList();
            getAchievement(5);
        }
        if (config.dditBtnCod.join() === [4,3,3,4].join()) {
            config.bodyElem.classList.add('body-counter-btn-block-show');
        }
        config.dditBtnCod = [];
        setTimeout (() => {
            document.querySelectorAll('.screen-bottom-ddit-numbers span').forEach(function (item) {
                item.textContent = '_'
            });
        }, 200);
    }

};


const activeCounterBtnAddone = () => {
    config.counterBtnCount++;

    config.counterBtnUnits.textContent = (config.counterBtnCount % 100 % 10).toString();
    config.counterBtnDozens.textContent = (((config.counterBtnCount / 10)^0) % 10).toString();
    config.counterBtnHundreds.textContent = ((config.counterBtnCount / 100)^0).toString();
};

const activeCounterBtnSubmit = () => {

    if (config.counterBtnCount === 276) {
        clearBodyClassList();
        getAchievement(6);
    }

    config.counterBtnCount = 0;
    config.counterBtnUnits.textContent = '0';
    config.counterBtnDozens.textContent = '0';
    config.counterBtnHundreds.textContent = '0';
};


config.screwdriverElem.onmousedown = function(e) {

    let shiftX = e.clientX - config.screwdriverElem.getBoundingClientRect().left;
    let shiftY = e.clientY - config.screwdriverElem.getBoundingClientRect().top;

    config.screwdriverElem.style.position = 'absolute';
    config.screwdriverElem.style.zIndex = 1000;
    config.bodyElem.append(config.screwdriverElem);

    moveAt(e.pageX, e.pageY);

    function moveAt(pageX, pageY) {
        config.screwdriverElem.style.left = pageX - shiftX + 'px';
        config.screwdriverElem.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(e) {
        moveAt(e.pageX, e.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    config.screwdriverElem.onmouseup = function(e) {

        config.screwdriverElem.hidden = true;
        let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
        config.screwdriverElem.hidden = false;

        if (!elemBelow) return;

        let droppableBelow = elemBelow.closest('.color-btns-outer');
        if (config.currentDroppable !== droppableBelow) {
            config.currentDroppable = droppableBelow;
            if (config.currentDroppable) {
                config.bodyElem.classList.add('body-color-btns-show');
            }
        }
        document.querySelector('.screwdriver-top-inner').appendChild(config.screwdriverElem);
        config.screwdriverElem.removeAttribute('style');
        document.removeEventListener('mousemove', onMouseMove);
        config.screwdriverElem.onmouseup = null;
        config.currentDroppable = null;
    };
};
config.screwdriverElem.ondragstart = function() {
    return false;
};


config.hammerElem.onmousedown = function(e) {
    let shiftX = e.clientX - config.hammerElem.getBoundingClientRect().left;
    let shiftY = e.clientY - config.hammerElem.getBoundingClientRect().top;

    config.hammerElem.style.position = 'absolute';
    config.hammerElem.style.zIndex = 1000;
    config.bodyElem.append(config.hammerElem);

    moveAt(e.pageX, e.pageY);

    function moveAt(pageX, pageY) {
        config.hammerElem.style.left = pageX - shiftX + 'px';
        config.hammerElem.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(e) {
        moveAt(e.pageX, e.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    config.hammerElem.onmouseup = function(e) {

        config.hammerElem.hidden = true;
        let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
        config.hammerElem.hidden = false;

        if (!elemBelow) return;

        let droppableBelow = elemBelow.closest('.main-screen');
        if (config.currentDroppable !== droppableBelow) {
            config.currentDroppable = droppableBelow;
            if (config.currentDroppable) {
                clearBodyClassList();
                config.bodyElem.classList.add('body-main-screen-crush');
                getAchievement(7);
            }
        }
        document.querySelector('.hammer-top-inner').appendChild(config.hammerElem);
        config.hammerElem.removeAttribute('style');
        document.removeEventListener('mousemove', onMouseMove);
        config.hammerElem.onmouseup = null;
        config.currentDroppable = null;
    };
};
config.hammerElem.ondragstart = function() {
    return false;
};


const activeColorBtns = (thisElem) => {

    changeNumbersShow(thisElem);

    let btnNumber = +thisElem.dataset.color;

    config.colorBtnCod.push(btnNumber);
    document.querySelector('.screen-bottom-color-numbers span:nth-child(' + config.colorBtnCod.length + ')').textContent = '◼';
    if (config.colorBtnCod.length >= 4) {
        if (config.colorBtnCod.join() === [1,2,3,3].join()) {
            clearBodyClassList();
            getAchievement(8);
        }
        config.colorBtnCod = [];
        setTimeout (() => {
            document.querySelectorAll('.screen-bottom-color-numbers span').forEach(function (item) {
                item.textContent = '_'
            });
        }, 200);
    }

};


const activePhoneBtns = (thisElem) => {

    changeNumbersShow(thisElem);

    let btnNumber = +thisElem.dataset.phone;

    config.phoneBtnCod.push(btnNumber);
    document.querySelector('.screen-bottom-phone-numbers span:nth-child(' + config.phoneBtnCod.length + ')').textContent = btnNumber;
    if (config.phoneBtnCod.length >= 4) {
        if (config.phoneBtnCod.join() === [8,3,6,7].join()) {
            config.bodyElem.classList.add('body-satanic-four-block-show');
        }
        if (config.phoneBtnCod.join() === [8,2,3,2].join()) {
            clearBodyClassList();
            getAchievement(9);
        }
        config.phoneBtnCod = [];
        setTimeout (() => {
            document.querySelectorAll('.screen-bottom-phone-numbers span').forEach(function (item) {
                item.textContent = '_'
            });
        }, 200);
    }

};

const activeSatanicBtns = (thisElem) => {

    let btnNumber = +thisElem.dataset.satanic;

    if (config.satanicBtnCod.indexOf( btnNumber ) === -1) {
        thisElem.classList.add('active');
        config.satanicBtnCod.push(btnNumber);
    }

    if (config.satanicBtnCod.length >= 5) {
        if (config.satanicBtnCod.join() === [14,31,37,72,76].join()) {
            clearBodyClassList();
            config.bodyElem.classList.add('body-main-screen-crush');
            getAchievement(10);
        }
        config.satanicBtnCod = [];

        let satanicBtns = document.querySelectorAll('.satanic-btn');
        satanicBtns.forEach(function (elem) {
            elem.classList.remove('active');
        });
    }
};

const activeFourBtns = (thisElem) => {

    changeNumbersShow(thisElem);

    let btnNumber = +thisElem.dataset.four;

    config.fourBtnCod.push(btnNumber);
    document.querySelector('.screen-bottom-four-numbers span:nth-child(' + config.fourBtnCod.length + ')').textContent = btnNumber;

    if (config.fourBtnCod.length >= 4) {
        if (config.fourBtnCod.join() === [1,2,4,3].join()) {
            clearBodyClassList();
            getAchievement(11);
        }
        if (config.fourBtnCod.join() === [1,2,1,1].join()) {
            clearBodyClassList();
            getAchievement(12);
        }
        config.fourBtnCod = [];
        setTimeout (() => {
            document.querySelectorAll('.screen-bottom-four-numbers span').forEach(function (item) {
                item.textContent = '_'
            });
        }, 200);
    }
};


const changeNumbersShow = (elem) => {

    if (elem.classList.contains('roman-btn')) {
        if (!config.isRomanBtnStart) {
            config.isRomanBtnStart = true;
            config.bodyElem.classList.add('body-roman-numbers-show');
        }
    } else {
        if (config.isRomanBtnStart) {
            config.isRomanBtnStart = false;
            config.bodyElem.classList.remove('body-roman-numbers-show');
        }
    }

    if (elem.classList.contains('bender-btn')) {
        if (!config.isBenderBtnStart) {
            config.isBenderBtnStart = true;
            config.bodyElem.classList.add('body-bender-numbers-show');
        }
    } else {
        if (config.isBenderBtnStart) {
            config.isBenderBtnStart = false;
            config.bodyElem.classList.remove('body-bender-numbers-show');
        }
    }

    if (elem.classList.contains('ddit-btn')) {
        if (!config.isDditBtnStart) {
            config.isDditBtnStart = true;
            config.bodyElem.classList.add('body-ddit-numbers-show');
        }
    } else {
        if (config.isDditBtnStart) {
            config.isDditBtnStart = false;
            config.bodyElem.classList.remove('body-ddit-numbers-show');
        }
    }

    if (elem.classList.contains('color-btn')) {
        if (!config.isColorBtnStart) {
            config.isColorBtnStart = true;
            config.bodyElem.classList.add('body-color-numbers-show');
        }
    } else {
        if (config.isColorBtnStart) {
            config.isColorBtnStart = false;
            config.bodyElem.classList.remove('body-color-numbers-show');
        }
    }

    if (elem.classList.contains('phone-btn')) {
        if (!config.isPhoneBtnStart) {
            config.isPhoneBtnStart = true;
            config.bodyElem.classList.add('body-phone-numbers-show');
        }
    } else {
        if (config.isPhoneBtnStart) {
            config.isPhoneBtnStart = false;
            config.bodyElem.classList.remove('body-phone-numbers-show');
        }
    }

    if (elem.classList.contains('four-btn')) {
        if (!config.isFourBtnStart) {
            config.isFourBtnStart = true;
            config.bodyElem.classList.add('body-four-numbers-show');
        }
    } else {
        if (config.isFourBtnStart) {
            config.isFourBtnStart = false;
            config.bodyElem.classList.remove('body-four-numbers-show');
        }
    }

};

const drinkCoffee = () => {
    if (config.drinkCoffeeCount === 0) {
        config.bodyElem.classList.add('body-coffee-drink1');
        config.drinkCoffeeCount++;
    } else if (config.drinkCoffeeCount === 1) {
        config.bodyElem.classList.remove('body-coffee-drink1');
        config.bodyElem.classList.add('body-coffee-drink2');
        config.drinkCoffeeCount++;
    } else if (config.drinkCoffeeCount === 2) {
        config.bodyElem.classList.remove('body-coffee-drink2');
        config.bodyElem.classList.add('body-coffee-drink3');
        config.drinkCoffeeCount++;
    } else {
        config.bodyElem.classList.remove('body-coffee-show');
        config.drinkCoffeeCount = 0;
    }
};

showFirstScreen();
