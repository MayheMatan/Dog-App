class APIManager {
    constructor() {
        this.data = {
            mainUser: {},
            users: [],
            events: []
        };
    }
    createNewUser = async user => {
        this.data.mainUser = await $.post("/user", user);
        console.log(this.data.mainUser)
    }
    createNewEvent = async event => {
        this.data.events.push(await $.post("/event", event))
    }
    createNewDog = (userId, dog) => {
        $.post(`/dog/${userId}`, dog);
    }
    getAllEvents = async() => {
        this.data.events = await $.get("/events");
    }
    getAllNearbyUsers = async() => {
        this.data.users = await $.get("/users");
    }
    updateUserProfile = (userId, info) => {
        $.ajax({
            url: `user/${userId}`,
            method: "PUT",
            data: info,
            success: updatedUser => {
                this.mainUser = updatedUser;
            }
        });
    }
    joinEvent = async eventId => {
        $.ajax({
            url: `/event/${eventId}`,
            method: "PUT",
            data: this.mainUser
        });
    }

    checkAuthState = () => {
        if (localStorage.getItem("user")) {
            return true;
        } else {
            return false;
        }
    }

    updateEvent = async(eventId, info) => {
        $.ajax({
            url: `/event/${eventId}`,
            method: "PUT",
            data: info,
            success: updatedEvent => {
                const oldEventIndex = this.data.events.findIndex(event => event.id === eventId);
                this.data.events.splice(oldEventIndex, 1, updatedEvent);
            }
        });
    }
    deleteUser = async userId => {
        return $.ajax({
            url: `/user/${userId}`,
            method: `DELETE`,
            success: () => {
                if (this.data.mainUser.id === userId) {
                    this.data.mainUser = {}
                }
                const oldUserIndex = this.data.users.findIndex(user => user.id === userId);
                this.data.users.splice(oldUserIndex, 1);
            }
        });
    }
    deleteEvent = async eventId => {
        return $.ajax({
            url: `/event/${eventId}`,
            method: `DELETE`,
            success: () => {
                const oldEventIndex = this.data.events.findIndex(event => event.id === eventId);
                this.data.events.splice(oldEventIndex, 1);
            }
        });
    }
    deleteDog = async dogId => {
        return $.ajax({
            url: `/event/${dogId}`,
            method: `DELETE`,
        });
    }

    initMap = () => {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
            center: new google.maps.LatLng(user.lat, user.lon),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        var infowindow = new google.maps.InfoWindow();
        var marker, i;
        for (i = 0; i < this.data.users.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(user[i][1], user[i][2]),
                map: map
            });
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infowindow.setContent(user[i][0]);
                    infowindow.open(map, marker);
                }
            })(marker, i));
        }
    }
}