import aspectRatio from '@tailwindcss/aspect-ratio';

export default {
    content: [
        "./src/**/*.{html,js,jsx,ts,tsx}",  // Đảm bảo tailwind CSS sẽ quét tất cả file trong thư mục src
    ],
    theme: {
        extend: {},
    },
    plugins: [aspectRatio], 
};
