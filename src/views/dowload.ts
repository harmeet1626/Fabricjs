import html2canvas from 'html2canvas';



const downloadDivAsImage = () => {
    console.log('working')
    const div = document.getElementById('demoCanvas');

    html2canvas(div).then(canvas => {
        const dataUrl = canvas.toDataURL('image/png');
        console.log(dataUrl, 'testing')
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'image.png';

        link.click();
    });
}
export const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
};

export default { downloadDivAsImage } 