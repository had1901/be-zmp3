import multer from 'multer'

// config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads') // Thư mục lưu trữ tệp tin
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname) // Thay đổi tên file trước khi upload
    }
})


const upload = multer({ storage: storage })
// const upload = multer({ dest: 'uploads/' })

export default upload