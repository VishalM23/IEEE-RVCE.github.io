//List of societies and links
export const societies = [
    { name: "Computer Society", link: '/society',key:'compsoc' },
    { name: "Communication Society", link: '/society' ,key:'comsoc'},
    { name: "Power and Energy Society", link: '/society',key:'pes' },
    { name: "Signal Processing Society", link: '/society',key:'sps' },
    { name: "Antenna Propogation Society", link: '/society' ,key:'aps'},
    { name: "Robotics and Automation Society", link: '/society' ,key:'ras'},
]

// List of affinities and links
export const affinities = [
    { name: "SIGHT", link: '/affinity',key:'sight' },
    { name: "WIE", link: '/affinity',key:'wie' }
]

// Edit this list and the navs shall change accordingly
/**
 * @type {{name:string,link:string,isMenu?:boolean,isLogin?:boolean,children?:{name:string,link:string}[]}[]}
 */
export const navs = [
    { name: "Home", link: '/',key:'home'},
    { name: "About Us", link: '/about',key:'about' },
    { name: "Societies", isMenu: true,key:'societies', children: societies },
    { name: "Affinities", isMenu: true,key:'affinities', children: affinities },
    { name: "Membership", link: '/membership' ,key:'membership' },
    { name: "About the developers", link: '/devs' ,key:'aboutdev'},
    { name: "Login", isLogin:true, link: '/login',key:'login' },
]



