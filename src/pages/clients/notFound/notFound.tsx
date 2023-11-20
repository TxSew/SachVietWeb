import { Link } from 'react-router-dom';
import './style.scss';

export default function Error() {
    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <div></div>
                    <h1>404</h1>
                </div>
                <h2>Page not found</h2>
                <p>Trang bạn đang tìm kiếm có thể đã bị xóa do đã thay đổi tên hoặc tạm thời không khả dụng.</p>
                <Link
                    style={{
                        marginTop: '10px',
                    }}
                    to="/"
                >
                    Trang chủ
                </Link>
            </div>
        </div>
    );
}
