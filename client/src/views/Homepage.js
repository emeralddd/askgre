import Footer from '../components/layout/Footer'
import NavbarPublic from '../components/layout/NavbarPublic'
import logo from '../assets/askgre_full.svg'
import homepageimage from '../assets/homepage-image.jpg'

const Homepage = () => {
    return (
        <>
            <div className="page d-flex flex-column">
                <NavbarPublic />
                
                <div className="homepage">
                    <div className='text'>
                        <img className='logo' src={logo} />

                        <p className="title">
                            Welcome!
                        </p>

                        <p className="subtitle">
                            Quản lý Deadline chưa bao giờ là khó khăn khi sử dụng Askgre!
                        </p>

                        <p className="subtitle">
                            Askgre đã được tối ưu hóa trải nghiệm, tăng cảm giác nhẹ nhàng, đơn giản cho người dùng khi sử dụng.
                        </p>

                        <div className='buttons' >
                            <a href='https://github.com/emeralddd/askgre' target='_blank'>
                                <div className='button'>
                                    Mã Nguồn
                                </div>
                            </a>
                            
                            <a href='https://me.momo.vn/emeralddd' target='_blank'>
                                <div className='button'>
                                    Ủng hộ
                                </div>
                            </a>
                            
                        </div>
                    </div>

                    <div className='image-box'>
                        <img className='image' src={homepageimage} />
                    </div>
                   
                    
                </div>

                <Footer />
            </div>
            
        </>
    )
}

export default Homepage