const imgDiv= document.getElementsByClassName(["profile-pic-div"])[0];
const img = document.getElementsByClassName(["photo"])[0];
const file = document.getElementsByClassName(['file'])[0];
const uploadBtn = document.getElementsByClassName(['uploadBtn'])[0];
console.log(img)

imgDiv.addEventListener('mouseenter', function(){
    uploadBtn.style.display = "block";
});


imgDiv.addEventListener('mouseleave', function(){
    uploadBtn.style.display = "none";
});


file.addEventListener('change', function(){
    const choosedFile = this.files[0];

    if (choosedFile) {

        const reader = new FileReader();
        reader.addEventListener('load', function(){
            img.setAttribute('src', reader.result);
        });

        reader.readAsDataURL(choosedFile);
    }
})