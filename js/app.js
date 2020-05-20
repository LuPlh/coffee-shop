
//Rendre le code plus flexible et dynamique - moins répétitif

//création de la classe en premier
class UI {
    //Création des méthodes de la class pour gérer les évènements
    hidePreloader() {
        document.querySelector('.preloader').style.display = "none";
    }
    showNav() {
        document.querySelector('.nav').classList.toggle('nav--show');
    }
    videoControls() {
        let btn = document.querySelector('.switch_btn');
        if (!btn.classList.contains('btnSlide')) { //si le bouton n'a pas la class
            btn.classList.add('btnSlide');
            document.querySelector('.video__item').pause();
        }
        else {
            btn.classList.remove('btnSlide');
            document.querySelector('.video__item').play();
        }
    }
    checkEmpty(name, lastName, email) {
        let result;
        if (name === '' || lastName === '' || email === '') {
            result = false;
        }
        else {
            result = true;
        }
        return result;
    }
    showFeedback(text, type) {
        const feedback = document.querySelector('.drink-form__feedback');
        if (type === 'success') {
            feedback.classList.add('success');
            feedback.innerText = text;
            this.removeAlert('success');
        }
        else if (type === 'error') {
            feedback.classList.add('error');
            feedback.innerText = text;
            this.removeAlert('error');
        }
    }
    removeAlert(type) {
        setTimeout(function () {
            document.querySelector('.drink-form__feedback').classList.remove(type)
        }, 3000)
    }
    //add customer
    addCustomer(customer) {
        const images = [1, 2, 3, 4, 5]; //la série d'image qui sera utilisée pour les thumbnail
        let random = Math.floor(Math.random() * images.length);//création d'un nombre aléatoire entre 0 et 1 et Math.floor renvoie le plus grand entier inférieur ou égale
        const div = document.createElement('div');
        div.classList.add('person');
        div.innerHTML = `<img src="img/person-${random}.jpeg" alt="person" class="person__thumbnail">
        <h4 class="person__name">${customer.name}</h4>
        <h4 class="person__lastName">${customer.lastName}</h4>`
        document.querySelector('.drink-card__list').appendChild(div);
    }
    //clear fields
    clearFields() {
        document.querySelector('.input-name').value = '';
        document.querySelector('.input-lastName').value = '';
        document.querySelector('.input-email').value = '';
    }
    //showModal
    showModal(e) {
        e.preventDefault();
        //console.log(e.target);on récupére l'icon met on souhaite avoir le parent <a> qui possède le data-id
        console.log(e.target.parentElement);//parenElement pour récup data-id dans <a>
        if (e.target.parentElement.classList.contains('work-item__icon')) {
            let id = e.target.parentElement.dataset.id;//equivalent en jquery -> data() qui répond aux attributs data HTML
           console.log(id);
            const modal = document.querySelector('.work-modal');
            const modalItem = document.querySelector('.work-modal__item');
            modal.classList.add('work-modal--show');
           modalItem.style.backgroundImage=`url(../img/work-${id}.jpeg)`;
        }
    }
    //closeModal
    closeModal(){
        document.querySelector('.work-modal').classList.remove('work-modal--show');
    }
}






function Customer(name, lastName, email) {
    this.name = name,
        this.lastName = lastName,
        this.email = email
}

function eventListeners() {
    const ui = new UI(); //création instance de la class UI

    //preloader
    window.addEventListener('load', function () {
        ui.hidePreloader(); //appel de la méthode 
    })
    //nav btn
    document.querySelector('.navBtn').addEventListener('click', function () {
        ui.showNav();
    })
    //control the video - switch button
    document.querySelector('.video__switch').addEventListener('click', function () {
        ui.videoControls();
    })
    //submit the form
    document.querySelector('.drink-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.querySelector('.input-name').value;
        const lastName = document.querySelector('.input-lastName').value;
        const email = document.querySelector('.input-email').value;

        let value = ui.checkEmpty(name, lastName, email);
        if (value) {
            let customer = new Customer(name, lastName, email)
            console.log(customer);
            ui.addCustomer(customer);
            ui.showFeedback('customer added correctly', 'success');
            ui.clearFields();
        } else {
            ui.showFeedback('some form values are empty', 'error');
        }

    })
    //display modal
    const links = document.querySelectorAll('.work-item__icon');//créé un array
    //console.log(links);
    links.forEach(function (item) {
        item.addEventListener('click', function (e) {
            ui.showModal(e);
        })
    })
    //hide modal
    document.querySelector('.work-modal__close').addEventListener('click',function(){
        ui.closeModal();
    })
}
eventListeners(); //appel de la fonction


