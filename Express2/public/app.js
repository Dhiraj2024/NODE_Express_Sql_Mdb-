const btns = document.querySelectorAll("button");

for(btn of btns){
    btn.addEventlistner("click", () => {
        console.log("button was clicked");
    });
}