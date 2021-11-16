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

function outer(message, storageCapacity, sendingInterval){
    let messages = [];
    let timer = 0;
    let interval = null;
    return function inner(message, storageCapacity, sendingInterval){
        messages.push(message);
        if(messages.length >= storageCapacity){
            clearInterval(interval);
            console.log(messages);
            timer = 0;
            messages = [];
        }else{
            clearInterval(interval);
            interval = setInterval(function(){
                ++timer;
                if(timer >= sendingInterval && messages.length != 0){
                    console.log(messages);
                    timer = 0;
                    messages = [];
                    clearInterval(interval);
                }
            }, 1000)
        }
    }
}

function outer(message, storageCapacity, sendingInterval){
    let messages = [];
    let timer = 0;
    let interval = null;
    return function inner(message, storageCapacity, sendingInterval){
        messages.push(message);
        if(interval === null){
            interval = setInterval(function(){
                ++timer;
                if(timer >= sendingInterval && messages.length != 0){
                    console.log('interval');
                    console.log(messages);
                    timer = 0;
                    messages = [];
                    clearInterval(interval);
                    interval = null;
                }
            }, 1000)
        }else if(messages.length >= storageCapacity){
            clearInterval(interval);
            interval = null;
            console.log(messages);
            timer = 0;
            messages = [];
        }
    }
}

let emitter = outer('aaa',5,5);
// emitter('aaa',5,5);

function caller(number){
    for(let i = 0; i < number; ++i){
        emitter('aaa',5,5);
    }
}