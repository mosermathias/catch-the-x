let player1_image;
let player2_image; 
let player3_image; 

function getImagePlayer1(){
    return player1_image;
}
function getImagePlayer2(){
    return player2_image;
}
function getImagePlayer3(){
    return player3_image;
}



$("#custom-img-1").change(function(){
    let current_img = document.getElementById('custom-img-1').files[0];

    resize(current_img, 0.5).then(function (blob) {
        let imgs = document.getElementsByClassName('img-1')
        for(let i = 0; i < imgs.length; i++){
            imgs[i].src = URL.createObjectURL(blob);
        }
        player1_image = URL.createObjectURL(blob).toString();
    });
});

$("#custom-img-2").change(function(){
    let current_img = document.getElementById('custom-img-2').files[0];
    resize(current_img, 0.5).then(function (blob) {
        let imgs = document.getElementsByClassName('img-2')
        for(let i = 0; i < imgs.length; i++){
            imgs[i].src = URL.createObjectURL(blob);
        }
        player2_image = URL.createObjectURL(blob).toString();
    });
});
$("#custom-img-3").change(function(){
    let current_img = document.getElementById('custom-img-3').files[0];
    resize(current_img, 0.5).then(function (blob) {
        let imgs = document.getElementsByClassName('img-3')
        for(let i = 0; i < imgs.length; i++){
            imgs[i].src = URL.createObjectURL(blob);
        }
        // document.getElementById('img-3').src = URL.createObjectURL(blob);
        player3_image = URL.createObjectURL(blob).toString();
    });
    // $("#player-3 > img").attr('src', player3_image);
});

const resize = function (image) {
    return new Promise(function (resolve, reject) {
        const reader = new FileReader();

        // Read the file
        reader.readAsDataURL(image);

        // Manage the `load` event
        reader.addEventListener('load', function (e) {
            // Create new image element
            const ele = new Image();
            ele.addEventListener('load', function () {
                // Create new canvas
                const canvas = document.createElement('canvas');

                // Draw the image that is scaled to `ratio`
                const context = canvas.getContext('2d');
                const w = 500;
                const h = 500;
                canvas.width = w;
                canvas.height = h;
                context.drawImage(ele, 0, 0, w, h);

                // Get the data of resized image
                'toBlob' in canvas
                    ? canvas.toBlob(function (blob) {
                          resolve(blob);
                      })
                    : resolve(dataUrlToBlob(canvas.toDataURL()));
            });

            // Set the source
            ele.src = e.target.result;
        });

        reader.addEventListener('error', function (e) {
            reject();
        });
    });
};
const dataUrlToBlob = function (url) {
    const arr = url.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const str = atob(arr[1]);
    let length = str.length;
    const uintArr = new Uint8Array(length);
    while (length--) {
        uintArr[length] = str.charCodeAt(length);
    }
    return new Blob([uintArr], { type: mime });
};

