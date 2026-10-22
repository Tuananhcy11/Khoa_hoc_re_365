from playwright.sync_api import sync_playwright

urls = [
    "http://localhost:3000/",
    "http://localhost:3000/mua",
    "http://localhost:3000/hoi-vien",
    "http://localhost:3000/cong-cu",
    "http://localhost:3000/huong-dan-mua-hang",
    "http://localhost:3000/cac-cau-hoi-thuong-gap",
    "http://localhost:3000/gioi-thieu",
    "http://localhost:3000/danh-gia-khach-hang",
    "http://localhost:3000/chinh-sach-affiliate",
    "http://localhost:3000/gio-hang",
    "http://localhost:3000/danh-muc/tri-tue-nhan-tao",
    "http://localhost:3000/khoa-hoc/tron-bo-khoa-hoc-tren-website-voi-quyen-truy-cap-vinh-vien-and-cap-nhat-lien-tuc"
]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    for u in urls:
        try:
            res = page.goto(u, wait_until="load", timeout=20000)
            status = res.status if res else "Unknown"
            print(f"[OK {status}] {u}")
        except Exception as e:
            print(f"[ERR] {u}: {e}")
    browser.close()
