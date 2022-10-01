import UserServices from "../../services/API/UserServices";

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
    console.log('name',choosedFile)
    console.log('namedfsdf',choosedFile.name)

    if (choosedFile) {

        const reader = new FileReader();
        reader.addEventListener('load', function(){
            img.setAttribute('src', reader.result);
        });

        reader.readAsDataURL(choosedFile);
        try{
            const formData=new FormData();
            formData.append('Image',choosedFile)
            // formData.append('ImageName',choosedFile.name)
            // print('chooosed name',choosedFile.name)
            const call=async()=>{
                const id='6336ef11737b6053883339c6';
                // print('formData',formData)
                const response =await UserServices.updatePhoto(id,formData);
                if(response.status===200){
                    console.log('success')
                }
            }
            call()
            

        }
        catch(error){
            console.log(error)
        }
        
        
    }
})