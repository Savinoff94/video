// needed consts
const onHover = true;
const body = document.getElementsByTagName('body')[0];
const radius = 600;
const marker = 'markedS';
const videoAttributesHoverOff = ['controls', 'autoplay', {name:'media'}];
const videoAttributesHoverON = ['controls', {name:'media'}];
const sourseAttributes = [{src:'https://apv-static.minute.ly/videos/v-50bc6db9-a73b-49b1-966838-aa07-4f3bbace5851-s29.92-37.16m.mp4'},
{type:'video/mp4'}];

//get all images from document and make array
let imagesCollection = document.getElementsByTagName('img');
let imagesArray = Array.from(imagesCollection);
// console.log('imagesArray', imagesArray);

//get coordinates from element
function offset(el) {
    const rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

//style div as circle
function circleStyling(element){
    element.style.position = "absolute";
    element.style.width = radius * 2 + 'px';
    element.style.height = radius * 2 + 'px';
    element.style.backgroundColor = '#ff000047';
    element.style.borderRadius = '100%';
    element.style.border = 'red solid 2px';
}

//positioning center of the circle at the same coord as center of image
function circlePlacement(element,radius,image){
    element.style.left = offset(image).left + image.offsetWidth / 2 - radius + 'px';
    element.style.top = offset(image).top + image.offsetHeight / 2 - radius + 'px';
}

//positioning and sizing video 
function videoPlacementAndSize(element,image){
    element.style.position = "absolute";
    element.style.left = offset(image).left + 'px';
    element.style.top = offset(image).top + 'px';
    element.setAttribute('width', `${image.offsetWidth}px`)
    element.setAttribute('height', `${image.offsetHeight}px`)
}

//sets attributes to html element
function setMultipleAttributes(element, array){
    array.forEach(item => {
        if(typeof(item) == 'string'){
            element.setAttribute(item,item);
        }else{
            element.setAttribute(Object.entries(item)[0][0], Object.entries(item)[0][1]);
        }
    })
}

//drowing circle aroung image
function drawCircle(image, radius){
    let circle = document.createElement('div');
    circleStyling(circle);
    circlePlacement(circle,radius,image)
    body.appendChild(circle);
}

//places video above image
function addVideo(image, onHover){
    const video = document.createElement('video');
    if(onHover){
        setMultipleAttributes(video,videoAttributesHoverON);

        video.addEventListener("mouseover", function() {
            this.play();
        });
        
        video.addEventListener("mouseleave", function() {
            this.pause();
        });
    }else{
        setMultipleAttributes(video,videoAttributesHoverOff);
    }

    // setMultipleAttributes(video,videoAttributes);
    const sourse = document.createElement('source');

    setMultipleAttributes(sourse,sourseAttributes);
    video.appendChild(sourse);

    videoPlacementAndSize(video,image);
    body.appendChild(video);
}
// returns coordinates of the center of element
function getCenterCoordinates(item){
    let x = offset(item).left + item.offsetWidth / 2;
    let y = offset(item).top + item.offsetHeight / 2;

    return {x:x,y:y}
}

function getArrayBorderPoints(elem){
    const answer = [];
    let topLeft = offset(elem);

    answer.push({x: topLeft.left, y: topLeft.top},
                {x: topLeft.left, y: topLeft.top + elem.offsetHeight / 2},
                {x: topLeft.left, y: topLeft.top + elem.offsetHeight},
                {x: topLeft.left + elem.offsetWidth / 2, y: topLeft.top},
                {x: topLeft.left + elem.offsetWidth / 2, y: topLeft.top + elem.offsetHeight},
                {x: topLeft.left + elem.offsetWidth, y: topLeft.top},
                {x: topLeft.left + elem.offsetWidth, y: topLeft.top + elem.offsetHeight /2},
                {x: topLeft.left + elem.offsetWidth, y: topLeft.top + elem.offsetHeight})
    // answer.forEach((item) => {
    //     let point = document.createElement('div');
    //     point.style.backgroundColor = 'black';
    //     point.style.width = '2px';
    //     point.style.height = '2px';
    //     point.style.position = "absolute";
    //     point.style.left = item.x + 'px';
    //     point.style.top = item.y + 'px';
    //     body.appendChild(point);

    // })
    return answer;
}


function isOverlapped(item1,item2,radius){
    const centerItem1 = getCenterCoordinates(item1);
    const arrayBorderPoints = getArrayBorderPoints(item2);

    let answer = arrayBorderPoints.some((coordinates) => {
        let distance = Math.sqrt(((centerItem1.x-coordinates.x)*(centerItem1.x-coordinates.x)) + ((centerItem1.y-coordinates.y)*(centerItem1.y-coordinates.y)))
        // console.log(item2,distance);
        return distance < radius;
    })
    return answer;
}
let lastImage = null;

function job(array){
    if(array.length > 0){
        lastImage = array[0];
        drawCircle(array[0],radius);
        addVideo(array[0], onHover);
        let filteredArray = array.filter((item) => {
            item.setAttribute('class', marker)
            return !isOverlapped(array[0],item,radius);
        })
        // console.log('filtered array:', filteredArray);
        job(filteredArray);
    }else{
        return null;
    }
}

job(imagesArray);



// window.addEventListener("scroll", function(){
//     let imagesCollectionAfter = document.getElementsByTagName('img');
//     let imagesArrayAfter = Array.from(imagesCollection);

//     imagesArrayAfter = imagesArrayAfter.filter((item) => {
//         if(item.classList.includes(marker)){
//             return false
//         }else{
//             return true;
//         }
//     })
// });

//drowing circle around every image
// imagesArray.forEach((image) => {
//     let circle = document.createElement('div');
//     circleStyling(circle);
//     circlePlacement(circle,radius,image)
//     // circle.style.left = offset(image).left + image.offsetWidth / 2 - radius / 2 + 'px';
//     // circle.style.top = offset(image).top + image.offsetHeight / 2 - radius / 2 + 'px';
//     body.appendChild(circle);
// })














// adds video above image
// const video = document.createElement('video');

// setMultipleAttributes(video,videoAttributes);
// const sourse = document.createElement('source');

// setMultipleAttributes(sourse,sourseAttributes);
// video.appendChild(sourse);

// videoPlacementAndSize(video,imagesArray[0]);
// body.appendChild(video);







// let circle = document.createElement('div');
// circleStyling(circle);
// circle.style.left = offset(imagesArray[20]).left + imagesArray[20].offsetWidth / 2 - radius / 2 + 'px';
// circle.style.top = offset(imagesArray[20]).top + imagesArray[20].offsetHeight / 2 - radius / 2 + 'px';
// body.appendChild(circle);

// let image = imagesArray[0];


// let circle = document.createElement('div');

// circle.style.position = "absolute";
// circle.style.left = offset(image).left + image.offsetWidth / 2 - radius / 2 + 'px';
// circle.style.top = offset(image).top + image.offsetHeight / 2 - radius / 2 + 'px';
// circle.style.width = radius + 'px';
// circle.style.height = radius + 'px';
// circle.style.backgroundColor = '#ff000047';
// circle.style.borderRadius = '100%';
// circle.style.border = 'red solid 2px';

// body.appendChild(circle);

