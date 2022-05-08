import Footer from '../components/layout/Footer'
import NavbarPublic from '../components/layout/NavbarPublic'

const Homepage = () => {
    return (
        <>
            <div className="page d-flex flex-column">
                <NavbarPublic />
                
                <div className="homepage">
                    <p className="homepage_title">
                        Welcome!
                    </p>

                    <p className="homepage_subtitle">
                        Quản lý Deadline chưa bao giờ là khó khăn khi sử dụng Askgre!
                    </p>

                    <p className="homepage_subtitle">
                        Askgre đã được tối ưu hóa trải nghiệm, tăng cảm giác nhẹ nhàng, đơn giản cho người dùng khi sử dụng.
                    </p>

                    <div className='homepage_options' target='_blank'>
                        <a href='https://github.com/emeralddd/askgre'>
                            <div className='homepage_button'>
                                Mã Nguồn
                            </div>
                        </a>
                        
                        <a href='https://me.momo.vn/emeralddd' target='_blank'>
                            <div className='homepage_button'>
                                Ủng hộ
                            </div>
                        </a>
                        
                    </div>
                    
                </div>

                <Footer />
            </div>
            
        </>
    )
}

export default Homepage