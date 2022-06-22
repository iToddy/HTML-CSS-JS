const activity = {
    all: [
        {
            id: 1,
            description: "Malhar",
            done: false,
        },

        {
            id: 2,
            description: "Reunião",
            done: false,
        },

        {
            id: 3,
            description: "Fazer Faxina",
            done: false,
        },

        {
            id: 4,
            description: "Estudar",
            done: false,
        },
    ],
}


const funcActivities = {
    nextId: 5,

    showList(list) {
        list.forEach(function (activity) {
            DOM.showActivity(activity)
        })
    },

    add(newActivity) {

        const task = {
            id: funcActivities.nextId,
            description: newActivity
        };

        activity.all.push(task);
        funcActivities.nextId++;

        App.reload();
    },

    search(searchActivity) {

        if (searchActivity) {
            DOM.clearList();
            const search = activity.all.filter(function (activitySearch) {
                return activitySearch.description.toLowerCase().includes(searchActivity.toLowerCase())
            });
            console.log(search);
            funcActivities.showList(search)

        } else {
            DOM.clearList();
            App.init();
        }



    },

    exclude(excludeActivity) {
        const index = activity.all.findIndex((task) => {
            task.id === excludeActivity;
        });

        activity.all.splice(index, 1);
        App.reload();
    }
}

const DOM = {
    activityContainer: document.querySelector('#activities-table tbody'),

    showActivity(activity) {
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.formatActivity(activity)

        DOM.activityContainer.appendChild(tr)
    },


    formatActivity(activity) {

        const activityAdded = ` 
            <td class="description">${activity.description}</td>
            <td> <input class="styles-checkbox" onchange="doneActivity(${activity.id})" type="checkbox"></td>
            <td> <img height="20" width="20" src="./Icons/calendar-xmark-solid.svg" onclick="funcActivities.exclude(${activity.id})"></td>
        `

        return activityAdded
    },

    clearList() {
        DOM.activityContainer.innerHTML = ""
    }
}

const App = {
    init() {
        funcActivities.showList(activity.all)
    },

    reload() {
        DOM.clearList()
        App.init()
    }
}

function doneActivity(activityId) {
    console.log(activityId);
}

App.init()

