<template>
    <div>
        <input id="upload" type="file" accept="image/*" />


    </div>
</template>


<script setup>
import { watch, watchEffect } from 'vue';

const fileInput = document.querySelector("#upload");

// fileInput.addEventListener("change", async (e) => {
//     const [file] = fileInput.files;

//     // displaying the uploaded image
//     const image = document.createElement("img");
//     image.src = await fileToDataUri(file);

//     // enbaling the brush after after the image
//     // has been uploaded
//     image.addEventListener("load", () => {
//         drawOnImage(image);
//     });

//     return false;
// });
watchEffect(async()=>{
    const [file] = fileInput.files;

    // displaying the uploaded image
    const image = document.createElement("img");
    image.src = await fileToDataUri(file);

    // enbaling the brush after after the image
    // has been uploaded
    image.addEventListener("load", () => {
        drawOnImage(image);
    });

    return false;
})

</script>