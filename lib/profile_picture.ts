export default function fileToProfilePictureDataUrl(file: File, size = 128): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);

        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size
            const ctx = canvas.getContext('2d')!;

            const min = Math.min(img.width, img.height);
            const sx = (img.width - min) / 2;
            const sy = (img.height - min) / 2;

            ctx.drawImage(img, sx, sy, min, min, 0, 0, size, size);
            URL.revokeObjectURL(objectUrl);
            resolve(canvas.toDataURL('image/png', 0.85));
        };
        img.onerror = reject;
        img.src = objectUrl;
    });
}
