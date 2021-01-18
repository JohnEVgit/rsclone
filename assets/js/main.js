'use strict';

const config = {
    startDialogClass: 'startDialog',
    peacefulEndingDialogClass: 'peacefulEndingDialog',
    endGameDialogClass: 'endGameDialogClass',
    gameLanguage: localStorage.getItem('gameLanguage') ? localStorage.getItem('gameLanguage') : 'en',
    gameCount: localStorage.getItem('gameCount') ? localStorage.getItem('gameCount') : 0,
    dialogCount: 0,
    mainBtnCount: 0,
    resetBtnCount: 0,
    achievementCount: localStorage.getItem('achievementCount') ? localStorage.getItem('achievementCount') : 0,
    achievementList: localStorage.getItem('achievementList') ? localStorage.getItem('achievementList') : '',
    canDialogClick: true,
    bodyElem: document.body,
    mainBtnElem: document.querySelector('.main-btn'),
    resetBtnElem: document.querySelector('.reset-btn'),
    menuBtnsList: document.querySelectorAll('.menu-btn'),

    waitPeacefulEnding: null,
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
    menuEvents();
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
        });

    });

};
const changeMenuLanguage = () => {
    config.menuBtnsList.forEach(function(btn,i) {
        btn.textContent = config.lang[config.gameLanguage].menu[i];
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

        runDialog(config.startDialogClass);
    });
    document.querySelector('.menu-btn-quite-js').addEventListener('click', function () {
        window.close();
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
        if(config.mainBtnCount =! 0){
            getAchievement(1);
            runDialog(config.peacefulEndingDialogClass);
        }
    }, 60000);
};

const resetGame = () => {
    config.resetBtnElem.addEventListener('click', function () {
        config.resetBtnCount = 0;
        config.bodyElem.classList.remove('disabled-btns-when-achievement');
        config.mainBtnElem.disabled = false;
        clearTimeout(config.waitPeacefulEnding);
        waitPeacefulEnding();
    });
};






const getAchievement = (number) => {
    const achievementElem = document.querySelector(`.achievement-elem${number}`);
    achievementElem.classList.add('active');

    const achievementProgress = document.querySelector(`.progress-elem[data-achievement="${number}"]`);
    achievementProgress.classList.add('active');

    if (config.achievementList) {
        if (config.achievementList.split(',').indexOf(number) != -1) {
            config.achievementList += ',' + number;
            config.achievementCount++;
        }
    } else {
        config.achievementList = number;
        config.achievementCount++;
    }
    localStorage.setItem('achievementList', config.achievementList);
    localStorage.setItem('achievementCount', config.achievementCount);

    if (config.achievementCount >= 10) {
        runDialog(config.endGameDialogClass);
        // TODO coffee;
    } else {
        blockBtns();
    }
};
const clearAchievements = () => {
    const achievementElems = document.querySelectorAll('.achievement-elem');
    achievementElems.forEach(function(elem) {
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
            let achievementElem = document.querySelector(`.achievement-elem${number}`);
            achievementElem.classList.add('active');
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

const clearConfig = () => {
    config.gameCount = 0;
    config.dialogCount = 0;
    config.mainBtnCount = 0;
    config.resetBtnCount = 0;
    config.achievementCount = 0;
    config.achievementList = '';
};

const blockBtns = () => {
    config.bodyElem.classList.add('disabled-btns-when-achievement');
    config.mainBtnElem.disabled = true;
};

showFirstScreen();
