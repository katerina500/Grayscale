document.addEventListener('DOMContentLoaded', function()  {
    const navInit = () => {
        // изменение цвета фона меню
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }

        const links= document.querySelectorAll('.nav-link'); //ищем вск навигационные ссылки
        const sections= document.querySelectorAll('section'); //ищем все ссылки

        sections.forEach(section => { //для каждой секции
            //проверяем,если страница прокручена больше, чем расстояние секции от начала страницы
            if (window.scrollY >= (section.offsetTop - 100)) {
                //отладка. удалить
                console.log(window.scrollY + " >= " + section.offsetTop + " " + section.id);
                //для каждой ссылки
                links.forEach(link => {
                    //удаляем активный класс
                    link.classList.remove('active')
                    //проверяяем,если href ссылки без # === id секции
                    if (link.href.split('#').pop() === section.id) {
                        link.classList.add('active') //добавляем ссылке активный класс
                    }
                })
            }
        })
    }

    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.scrollX || document.documentElement.scrollLeft,
            scrollTop = window.scrollY || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft};
    }

    //Анимация контента
    const animItems = document.querySelectorAll('animate');
    if (animItems.length > 0) {
       function onEntry(params) {
           animItems.forEach(item => {
           const itemHeight = item.offsetHeight; //высота анимируемого объекта
           const itemOffset = offset(item).top; //позиция объекта от верхнего края
           const startPos = 2; //параметр регулирования старта анимации
           //не window.innerWidth/innerHeight
           const animPoint = document.documentElement.clientHeight - itemHeight / startPos;

           if(itemHeight > document.documentElement.clientHeight) {
               const animPoint = document.documentElement.clientHeight - document.documentElement.clientHeight
           }
           if((scrollY > itemOffset - animPoint) && scrollY < itemOffset + itemHeight) {
               item.classList.add('show');
           } else {
               if(!item.classList.contains('no-hide')){
               item.classList.remove('show');
               }
           }
           })
       }
    }

   /* function  onEntry(entry) {
        entry.forEach(change => {
            if (change.isIntersecting) {
                change.target.classList.add('show');
            } else change.target.classList.remove('show');
        });
    }
    let options = {threshold: [0.5]};
    let observer = new IntersectionObserver(onEntry, options);
    let elements = document.querySelectorAll('animate');

    for (let elm og elemenets) {
        observer.observe(elm);
    } */

    onEntry();
    navInit();
    window.addEventListener('scroll', () => {
        navInit(); //запускаем функцию при скролле страницы
        onEntry();
    })
    window.addEventListener('resize', () => {
        navInit(); // запускаем функцию при ресайзе страницы
    })
})