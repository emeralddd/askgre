const run = async ({sendMessage,senderId}) => {
    sendMessage(senderId, `Danh sách lệnh:\nhi/hello: chào mừng\nping: kiểm tra bot đang hoạt động\nxacminh: xác minh tài khoản\ninfo: lấy thông tin thành viên\nnaplai: xóa các dữ liệu đã nạp\nsent: xem thông tin các file đã gửi, tình trạng xác nhận deadline\ndeadline: xem deadline hiện tại\nhelp: lấy danh sách lệnh`)
}

module.exports.run = run

module.exports.name = 'help'