function outer(message, storageCapacity, sendingInterval){
    const emitterStorage ={
        messages:[],
        timer:0,
        interval:null
    }
    return function inner(message, storageCapacity, sendingInterval){
        emitterStorage.messages.push(message);
        if(emitterStorage.interval === null){
            emitterStorage.interval = setInterval(function(){
                ++emitterStorage.timer;
                if(emitterStorage.timer >= sendingInterval && emitterStorage.messages.length != 0){
                    sendData(emitterStorage);
                }
            }, 1000)
        }else if(emitterStorage.messages.length >= storageCapacity){
            sendData(emitterStorage);
        }
    }
}

let emitter = outer();

function caller(number){
    for(let i = 0; i < number; ++i){
        emitter('aaa',5,5);
    }
}

function sendData(obj){
    console.log(obj.messages);
    obj.timer = 0;
    obj.messages = [];
    clearInterval(obj.interval);
    obj.interval = null;
}

// function outer(message, storageCapacity, sendingInterval){
//     let messages = [];
//     let timer = 0;
//     let interval = null;
//     return function inner(message, storageCapacity, sendingInterval){
//         messages.push(message);
//         if(interval === null){
//             interval = setInterval(function(){
//                 ++timer;
//                 if(timer >= sendingInterval && messages.length != 0){
//                     // console.log('interval');
//                     console.log(messages);
//                     timer = 0;
//                     messages = [];
//                     clearInterval(interval);
//                     interval = null;
//                 }
//             }, 1000)
//         }else if(messages.length >= storageCapacity){
//             clearInterval(interval);
//             interval = null;
//             console.log(messages);
//             timer = 0;
//             messages = [];
//         }
//     }
// }

// let emitter = outer();

// function caller(number){
//     for(let i = 0; i < number; ++i){
//         emitter('aaa',5,5);
//     }
// }

// function outer(message, storageCapacity, sendingInterval){
//     let messages = [];
//     let timer = 0;
//     let interval = null;
//     return function inner(message, storageCapacity, sendingInterval){
//         messages.push(message);
//         clearInterval(interval);
//         interval = setInterval(function(){
//             ++timer;
//             if((messages.length >= storageCapacity) || (timer >= sendingInterval && messages.length != 0)){
//                 console.log(messages);
//                 timer = 0;
//                 messages = [];
//             }
//         }, 1000)
//     }
// }

// function outer(message, storageCapacity, sendingInterval){
//     let messages = [];
//     let timer = 0;
//     let interval = null;
//     return function inner(message, storageCapacity, sendingInterval){
//         messages.push(message);
//         if(messages.length >= storageCapacity){
//             clearInterval(interval);
//             console.log(messages);
//             timer = 0;
//             messages = [];
//         }else{
//             clearInterval(interval);
//             interval = setInterval(function(){
//                 ++timer;
//                 if(timer >= sendingInterval && messages.length != 0){
//                     console.log(messages);
//                     timer = 0;
//                     messages = [];
//                     clearInterval(interval);
//                 }
//             }, 1000)
//         }
//     }
// }


function outer(message, storageCapacity, sendingInterval){
    const emitterStorage ={
        messages:[],
        timer:0,
        interval:null
    }
    return function inner(message, storageCapacity, sendingInterval){
        emitterStorage.messages.push(message);
        if(emitterStorage.interval === null){
            emitterStorage.interval = setInterval(function(){
                ++emitterStorage.timer;
                if(emitterStorage.timer >= sendingInterval && emitterStorage.messages.length != 0){
                    sendData(emitterStorage);
                }
            }, 1000)
        }else if(emitterStorage.messages.length >= storageCapacity){
            sendData(emitterStorage);
        }
    }
}

let emitter = outer();

function caller(number){
    for(let i = 0; i < number; ++i){
        emitter('aaa',5,5);
    }
}

function sendData(obj){
    console.log(obj.messages);
    obj.timer = 0;
    obj.messages = [];
    clearInterval(obj.interval);
    obj.interval = null;
}