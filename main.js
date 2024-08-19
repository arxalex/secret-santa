Vue.component('member', {
    template: '#member-template',
    methods: {
        deleteMember(linkid) {
            app.deleteLink(linkid).then(() => {
                app.get(app.sessionData.teamid);
            });
        }
    },
    props: {
        member: {
            type: Object,
        }
    },
    computed: {
        displayDelete: function () {
            if (app.ishost) {
                if (app.sessionData.data) {
                    return !app.sessionData.data.randomed;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }
});
var app = new Vue({
    el: '#page-wrapper',
    data: {
        device: '',
        sessionData: {
            teamid: '',
            id: '',
            pass: '',
            data: {
                hostid: '',
                randomed: false,
            },
        },
        incorrect: false,
        registered: false,
        registration: false,
        login: false,
        displayDreamerModel: false,
        member: {
            memberid: '',
            id: '',
            pass: '',
            email: '',
            phone: '',
            first_name: '',
            last_name: '',
            address: '',
            wants: '',
        },
        links: {},
        dreamer: {
            email: '',
            phone: '',
            first_name: '',
            last_name: '',
            address: '',
            wants: '',
        },
    },
    methods: {
        getSession: function (id, pass) {
            return axios.post('get.php', {
                table: 'ss_sessions',
                query: {
                    id: id,
                    pass: pass
                }
            }).then((response) => {
                if (response.data.length > 0) {
                    return response.data;
                } else {
                    return false;
                }
            });
        },
        getMember: function (id, pass) {
            return axios.post('get.php', {
                table: 'ss_members',
                query: {
                    id: id,
                    pass: pass
                }
            }).then((response) => {
                if (response.data.length > 0) {
                    return response.data;
                } else {
                    return false;
                }
            });
        },
        getLinks: function () {
            return axios.post('get.php', {
                table: 'ss_link',
                query: {
                    id: this.sessionData.id,
                    pass: this.sessionData.pass
                }
            }).then((response) => {
                if (response.data.length > 0) {
                    return response.data;
                } else {
                    return false;
                }
            });
        },
        getRandom: function () {
            return axios.post('get.php', {
                table: 'ss_random',
                query: {
                    id: this.member.id,
                    pass: this.member.pass,
                    sessionid: this.sessionData.id
                }
            }).then((response) => {
                if (response.data.length > 0) {
                    return response.data;
                } else {
                    return false;
                }
            });
        },
        createSession: function () {
            return axios.post('create.php', {
                table: 'ss_sessions',
                query: {
                    'id': 'DEFAULT',
                    'pass': generateRandomString(6),
                    'data': JSON.stringify(this.sessionData.data),
                },
            }).then((response) => {
                return response.data;
            });
        },
        createMember: function () {
            return axios.post('create.php', {
                table: 'ss_members',
                query: {
                    'id': 'DEFAULT',
                    'pass': generateRandomString(6),
                    'email': this.member.email,
                    'phone': this.member.phone,
                    'first_name': this.member.first_name,
                    'last_name': this.member.last_name,
                    'address': this.member.address,
                    'wants': this.member.wants,
                },
            }).then((response) => {
                return response.data;
            });
        },
        createLink: function () {
            return axios.post('create.php', {
                table: 'ss_link',
                query: {
                    'id': this.sessionData.id,
                    'pass': this.sessionData.pass,
                    'memberid': this.member.id,
                    'linkid': 'DEFAULT',
                    'name': this.member.first_name
                },
            }).then((response) => {
                return response.data;
            });
        },
        createRandom: function () {
            var rids = [];
            this.links.forEach(link => {
                rids.push(link.memberid);
            });
            return axios.post('create.php', {
                table: 'ss_random',
                query: {
                    'id': '',
                    'pass': '',
                    'sessionid': this.sessionData.id,
                    'memberid': '',
                    'data': '',
                    'randomid': 'DEFAULT',
                },
                randids: rids,
            }).then((response) => {
                return response.data;
            });
        },
        saveSession() {
            axios.post('update.php', {
                table: 'ss_sessions',
                query: {
                    'id': this.sessionData.id,
                    'pass': this.sessionData.pass,
                    'data': JSON.stringify(this.sessionData.data)
                },
            }).then((response) => {
                if (response.data.response) {
                    this.saveSessionlocal();
                }
            });
        },
        saveMember() {
            axios.post('update.php', {
                table: 'ss_members',
                query: {
                    'id': this.member.id,
                    'pass': this.member.pass,
                    'email': this.member.email,
                    'phone': this.member.phone,
                    'first_name': this.member.first_name,
                    'last_name': this.member.last_name,
                    'address': this.member.address,
                    'wants': this.member.wants,
                },
            }).then((response) => {
                if (response.data.response) {
                    console.log(this.memberinlink);
                    if (this.memberinlink !== false) {
                        console.log(this.memberinlink);
                        this.deleteLink(this.links[this.memberinlink].linkid);
                        this.join();
                    }
                    this.saveMemberlocal();
                    this.registration = false;
                }
            });
        },
        saveSessionlocal() {
            localStorage.setItem('device', this.device);
            const parsed = JSON.stringify(this.sessionData);
            localStorage.setItem('sessionData', parsed);
        },
        saveMemberlocal: function () {
            const parsed = JSON.stringify(this.member);
            localStorage.setItem('member', parsed);
        },
        deleteLink(linkid) {
            return axios.post('delete.php', {
                table: 'ss_link',
                query: {
                    id: this.sessionData.id,
                    pass: this.sessionData.pass,
                    linkid: linkid
                }
            }).then((response) => {
                return response.data.response;
            });
        },
        create: function () {
            this.sessionData.data.hostid = this.device;
            this.sessionData.data.randomed = false;
            this.createSession().then((data) => {
                if (data.response == true) {
                    this.sessionData.id = data.id;
                    this.sessionData.pass = data.pass;
                    this.sessionData.teamid = data.id + data.pass;
                    this.login = true;
                    this.incorrect = false;
                    this.saveSessionlocal();
                }
            });
        },
        get: function (teamid) {
            this.getSession(teamid.slice(0, -6), teamid.slice(-6)).then((data) => {
                if (data != false) {
                    this.sessionData.id = data[0].id;
                    this.sessionData.pass = data[0].pass;
                    this.sessionData.data = JSON.parse(data[0].data);
                    this.login = true;
                    this.incorrect = false;
                    this.saveSessionlocal();
                    this.getLinks().then((links) => {
                        this.links = links;
                    });
                    this.getRandom().then((ddata) => {
                        if (ddata != false) {
                            dddata = JSON.parse(ddata[0].data);
                            this.dreamer.email = dddata.email;
                            this.dreamer.phone = dddata.phone;
                            this.dreamer.first_name = dddata.first_name;
                            this.dreamer.last_name = dddata.last_name;
                            this.dreamer.address = dddata.address;
                            this.dreamer.wants = dddata.wants;
                        }
                    });
                } else {
                    this.login = false;
                    this.incorrect = true;
                }
            });
        },
        createM: function () {
            return this.createMember().then((data) => {
                if (data.response == true) {
                    this.member.id = data.id;
                    this.member.pass = data.pass;
                    this.member.memberid = data.id + data.pass;
                    this.saveMemberlocal();
                    this.registration = false;
                }
            })
        },
        getM: function (memberid) {
            this.getSession(memberid.slice(0, -6), memberid.slice(-6)).then((data) => {
                if (data != false) {
                    this.member.id = data[0].id;
                    this.member.pass = data[0].pass;
                    this.member.email = data[0].email;
                    this.member.phone = data[0].phone;
                    this.member.first_name = data[0].first_name;
                    this.member.last_name = data[0].last_name;
                    this.member.address = data[0].address;
                    this.member.wants = data[0].wants;
                    this.saveSessionlocal();
                } else {

                }
            });
        },
        saveM: function () {
            if (this.registration) {
                if (this.member.memberid != '') {
                    this.saveMember();
                } else {
                    this.createM().then(() => {
                        if (this.member.memberid != '') {
                            this.join(this.memberid);
                        }
                    });
                }
            }
        },
        join: function (memberid) {
            if (memberid != '') {
                this.createLink().then(() => {
                    this.get(this.sessionData.teamid);
                });
            } else {
                this.registration = true;
            }
        },
        random: function () {
            this.createRandom().then(() => {
                this.sessionData.data.randomed = true;
                this.saveSession();
            });
        },
    },
    mounted() {
        if (localStorage.getItem('sessionData')) {
            try {
                this.sessionData = JSON.parse(localStorage.getItem('sessionData'));
            } catch (e) {
                localStorage.removeItem('sessionData');
            }
        }
        this.device = generateRandomString(6);
        if (localStorage.getItem('device')) {
            try {
                this.device = localStorage.getItem('device');
            } catch (e) {
                localStorage.removeItem('device');
            }
        }
        if (localStorage.getItem('member')) {
            try {
                this.member = JSON.parse(localStorage.getItem('member'));
            } catch (e) {
                localStorage.removeItem('member');
            }
        }
        setTimeout(() => {
            let timerId = setInterval(() => {
                if (this.login) {
                    this.get(this.sessionData.teamid);
                }
            }, 2000)
        }, 100);
        var params = getParams();
        if(params.teamid != null){
            this.sessionData = {
                teamid: params.teamid,
            }
            this.get(this.sessionData.teamid);
        }
        if(params.memberid != null){
            this.member = {
                memberid: params.memberid,
            }
            this.getM(this.member.memberid);
        }
        this.displayDreamerModel = false;
    },
    computed: {
        link: function () {
            return 'https://apps.arxalex.com/secret-santa?teamid=' + this.sessionData.teamid;
        },
        qrsrc: function () {
            return "https://api.qrserver.com/v1/create-qr-code/?data=" + this.link + "&amp;size=100x100";
        },
        ishost: function () {
            if (this.sessionData.data) {
                return this.device == this.sessionData.data.hostid;
            } else {
                return false;
            }
        },
        disableRandomise: function () {
            return this.links.length == null || this.links.length < 2;
        },
        displayDreamer: function () {
            return this.displayDreamerModel;
        },
        memberinlink: function () {
            if (this.links.length != null && this.member.id != null) {
                var isit = false;
                var i = 0;
                for (i = 0; i < this.links.length && !isit; i++) {
                    isit = this.links[i].memberid == this.member.id;
                }
                if (isit) {
                    return i - 1;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    },
    created: function () {
        this.registered = this.member.memberid != '';
    }
});
function generateRandomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function getParams() {
    queryString = window.location.search;
    //console.log(queryString);
    urlParams = new URLSearchParams(queryString);
    return {
        teamid: urlParams.get('teamid'),
        memberid: urlParams.get('memberid')
    }
}

