let events = [];
let arr = []; // cargar informacion

const eventName = document.getElementById('eventName');
const eventDate = document.getElementById('eventDate');
const buttonAdd = document.getElementById('bAdd');
const eventsContainer = document.getElementById('eventsContainer');

const json = load();

try{
    arr = JSON.parse(json);
}
catch(error){
    arr = [];
}
events = arr ? [...arr] : [];

renderEvents();

document.querySelector('form').addEventListener('submit', e =>{
    e.preventDefault();
    addEvent();
})

function addEvent(){
    if(eventName.value === "" || eventDate.value === ""){
        return;
    }
    if(dateDiff(eventDate.value) < 0){
        return;
    }

    const newEvent = {
        id: (Math.random() * 100).toString(36).slice(3),
        name: eventName.value,
        date: eventDate.value
    };

    events.unshift(newEvent);

    save(JSON.stringify(events));

    eventName.value = "";

    renderEvents();
}

function dateDiff(d){
    const targetDate = new Date(d);
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();
    const days = Math.ceil(difference / (1000 * 3600 * 24));
    return days;
}

function renderEvents(){
    const eventsHTML = events.map(event => {
        return `
        <div class="event">
            <div class="days">
                <span class="days__number">${dateDiff(event.date)}</span>
                <span class="days__texts">Días</span>
            </div>
            <div class="nameEvent">${event.name}</div>
            <div class="dateEvent">${event.date}</div>
            <div class="actions">
                <button class="bDelete" data-id="${event.id}"> Eliminar evento</button>
            </div>
        </div>
        `;
    });

    eventsContainer.innerHTML = eventsHTML.join("");
    document.querySelectorAll('.bDelete').forEach(button => {
        button.addEventListener('click', e => {
            const id = button.getAttribute('data-id');
            events = events.filter(event => event.id !== id);
            save(JSON.stringify(events));
            renderEvents();
        })
    })
}

function save(data){
    localStorage.setItem('items', data);
}

function load(){
    return localStorage.getItem('items');
}