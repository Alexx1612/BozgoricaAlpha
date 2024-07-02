// Call the function
var on_class=0
var on_trait=0
var on_side=0
body = document.querySelector('body')
const scale = (number, inMin, inMax, outMin, outMax) => { 
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;}
//
// For the Hidden widget
const user = document.querySelector('.username')
const NameButton =document.querySelector('.NameButton')
const input = document.querySelector('.input')

NameButton.addEventListener('click', () => {
    user.classList.toggle('active')
})

let username = document.getElementById("username");
username.addEventListener('keyup' ,(e) =>{
    if(e.keyCode===13){
        document.getElementById('class_text').innerText = 'Choose a class!'
        username= document.getElementById("username").value
        document.getElementById("welcome_text").textContent='Hello ' + username
        body.classList.add('afterfirst')
        let int = setInterval(blurring,40)
        document.getElementById("welcome_text").classList.add('hidden');
        setTimeout(() => {
         document.getElementById("welcome_text").classList.remove('hidden');
         document.getElementById("welcome_text").classList.add('blur-in');
        }, 1500);
        user.classList.add('done')
    }
})

//
// For the Expanding cards (Here we only change the type of the panel : active or not active)
const panels = document.querySelectorAll('.panel')
const move2 =document.getElementById('movebtn2')
const move1 =document.getElementById('movebtn1')
panels.forEach((panel) => {
    panel.addEventListener('click', () => {
        removeActiveClasses()
        panel.classList.add('active')
        move2.classList.remove('hidden')
        move2.classList.add('blur-in');
        CHARACTER_class = panel.innerText
        on_class=1
        if(on_class+on_trait+on_side === 3)
            Character_text.innerText= username +', you will be a ' + panel.innerText + ' with ' + CHARACTER_trait + ' traits, member of the ' + CHARACTER_side + '.'
    })
})

function removeActiveClasses() {
    panels.forEach((panel) => {
        panel.classList.remove('active')
    })
}

//
// For the Progress bar
const progress_container = document.querySelector('.progress_container')
const progress = document.getElementById('progress')
const circles = document.querySelectorAll('.circle')


//
// For the loading text
const loadtext = document.querySelector('.loading-text')
const bg = document.querySelector('html')
let load = 0
function blurring() {
   
    load++
    if(load===1)
        loadtext.classList.add('active')
    if(load<=35){
        bg.style.filter= `blur(${scale(load,0,35,0,15)}px)`
        loadtext.style.filter = `blur${0}px`
        checkBoxes()
    }   
    else if(load<=70){
    bg.style.filter= `blur(${scale(load,35,70,15,0)}px)`
    progress_container.style.opacity=scale(load,35,70,0,1)
    document.getElementById('movebtn1').classList.remove('hidden')
    document.getElementById("movebtn1").classList.add('blur-in');
    }

    loadtext.innerText=load+'%'
    loadtext.style.opacity=scale(load,0,100,0,1)
    if(load>98)
        {
        loadtext.innerText=' '
        loadtext.classList.remove('active')
        }
}



//
// For Scroll animation
const containers =document.querySelectorAll('.container')
window.addEventListener('scroll', checkBoxes)

function checkBoxes(){
    const triggerBottom=window.innerHeight/5*4
    containers.forEach(container => {
        const boxTop= container.getBoundingClientRect().top

        if(boxTop<triggerBottom)
            container.classList.add('show')
        else 
            container.classList.remove('show')

    })
}

///////         OTHER STUFF             ///////

const procent_text = document.getElementById('procent_text')
let CHARACTER_trait=''
let CHARACTER_class=''
let CHARACTER_side=''
let Character_text=''

move1.addEventListener('click', () => {
    procent= 0 + '%'
    if(on_class+on_trait+on_side === 0){
    progress.style.width = procent
    procent_text.innerText = 'STATUS: ' + procent + ' complete'
    circles[0].classList.add('completed')
    }
})

move2.addEventListener('click', () => {
    procent= 33 + '%'
    if(on_class+on_trait+on_side === 1){
    progress.style.width = procent
    procent_text.innerText = 'STATUS: ' + procent + ' complete'
    circles[1].classList.add('completed')
    document.getElementById('trait_text').innerText = 'Choose a trait!'
    }
})

const cards = document.querySelectorAll('.front')
    cards.forEach((front) => {
    front.addEventListener('click', () => {
    CHARACTER_trait = front.id
    on_trait=1
    if(on_class+on_trait+on_side === 2){
    procent= 66 + '%'
    progress.style.width = procent
    procent_text.innerText = 'STATUS: ' + procent + ' complete'
    circles[2].classList.add('completed')
    }
    document.getElementById('side_text').innerText = 'Join a side!'
    if(on_class+on_trait === 2){
        if(CHARACTER_trait.localeCompare('Water') === 0)
            document.getElementById('trait_result').style.backgroundImage="url(sword_water.png)"
        if(CHARACTER_trait.localeCompare('Earth') === 0)
            document.getElementById('trait_result').style.backgroundImage="url(sword_earth.png)"
        if(CHARACTER_trait.localeCompare('Fire') === 0)
            document.getElementById('trait_result').style.backgroundImage="url(sword_fire.png)"
        if(CHARACTER_trait.localeCompare('Air') === 0)
            document.getElementById('trait_result').style.backgroundImage="url(sword_air.png)"
        }
    if(on_class+on_trait+on_side === 3)
        Character_text.innerText= username +', you will be a ' + CHARACTER_class + ' with ' + CHARACTER_trait + ' traits, member of the ' + CHARACTER_side + '.'
    })
})


const sides = document.querySelectorAll('.picker')
    sides.forEach((picker) => {
    picker.addEventListener('click', () => {
    let CHARACTER_side = picker.id
    on_side=1
    let result = CHARACTER_side.localeCompare('1')
    if(on_class+on_trait+on_side === 3){
        if(result <= 0){            
            CHARACTER_side='Day-enjoyers'
            document.getElementById('side_result').style.backgroundImage="url(sun_enjoyer.webp)"

        } else {
            CHARACTER_side='Night-dwellers'
            document.getElementById('side_result').style.backgroundImage="url(night_dweller.webp)"

            }
        }
        procent= 100 + '%'
        progress.style.width = procent

        circles[3].classList.add('completed')
        const Character_text=document.querySelector('.Character_text')
        console.log(on_class+on_trait+on_side)    
    if(on_class+on_trait+on_side === 3){
        procent_text.innerText = '- Character Sketch -'
        Character_text.innerText= username +', you will be a ' + CHARACTER_class + ' with ' + CHARACTER_trait + ' traits, member of the ' + CHARACTER_side + '.'
        document.getElementById("repeat").classList.remove('hidden');
    }
    })
})








