import os
import json
import re
from bs4 import BeautifulSoup

base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
html_path = os.path.join(os.path.dirname(base_dir), "khoahocgiahoi-clone-static", "index.html")

with open(html_path, "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

# 1. Categories
categories = [
    {"id": "combo", "name": "Combo Khóa Học", "slug": "combo-khoa-hoc", "icon": "Layers"},
    {"id": "it", "name": "Công nghệ & Lập trình", "slug": "cong-nghe-thong-tin", "icon": "Code"},
    {"id": "ai", "name": "AI & Vibe Coding", "slug": "tri-tue-nhan-tao", "icon": "Sparkles"},
    {"id": "mmo", "name": "Kiếm tiền & MMO", "slug": "kiem-tien-va-mmo", "icon": "TrendingUp"},
    {"id": "marketing", "name": "Marketing & Ads", "slug": "marketing", "icon": "Megaphone"},
    {"id": "languages", "name": "Ngoại ngữ (Anh, Trung, Nhật, Hàn)", "slug": "ngoai-ngu", "icon": "Languages"},
    {"id": "design", "name": "Thiết kế & Đồ họa", "slug": "thiet-ke-djo-hoa", "icon": "Palette"},
    {"id": "finance", "name": "Đầu tư & Forex & Crypto", "slug": "djau-tu", "icon": "DollarSign"},
    {"id": "office", "name": "Tin học văn phòng", "slug": "tin-hoc-van-phong", "icon": "FileSpreadsheet"}
]

# 2. Extract Course Cards
course_articles = soup.find_all("article", class_=re.compile(r"khgh-course-card"))
print(f"Found {len(course_articles)} course cards in HTML.")

courses = []
for idx, card in enumerate(course_articles):
    # Image
    img_el = card.find("img")
    img_src = img_el.get("src", "") if img_el else ""
    alt_text = img_el.get("alt", "") if img_el else ""
    
    # Title
    title_el = card.find("h3") or card.find("h2") or card.find("h4")
    title = title_el.get_text(strip=True) if title_el else alt_text
    
    # Link
    link_el = card.find("a", href=re.compile(r"/khoa-hoc/"))
    href = link_el.get("href", "") if link_el else f"/khoa-hoc/course-{idx}"
    slug = href.replace("/khoa-hoc/", "")
    
    # Category / Eyebrow
    eyebrow_el = card.find(class_=re.compile(r"eyebrow"))
    category_name = eyebrow_el.get_text(strip=True) if eyebrow_el else "Khóa học chất lượng"
    
    # Discount
    discount_el = card.find(class_=re.compile(r"discount|badge"))
    discount = discount_el.get_text(strip=True) if discount_el else ""
    
    # Price
    price_container = card.find(class_=re.compile(r"price"))
    sale_price = ""
    regular_price = ""
    if price_container:
        strong = price_container.find("strong")
        del_tag = price_container.find("del")
        sale_price = strong.get_text(strip=True) if strong else ""
        regular_price = del_tag.get_text(strip=True) if del_tag else ""
    
    if not sale_price:
        # fallback search
        prices = re.findall(r"(\d{1,3}(?:\.\d{3})+|\d+)\s*₫", card.get_text())
        if len(prices) >= 2:
            sale_price = f"{prices[0]} ₫"
            regular_price = f"{prices[1]} ₫"
        elif len(prices) == 1:
            sale_price = f"{prices[0]} ₫"
            regular_price = "1.500.000 ₫"
        else:
            sale_price = "99.000 ₫"
            regular_price = "1.200.000 ₫"
            
    is_flash = "khgh-course-card--flash" in card.get("class", [])
    
    # Button state
    button_el = card.find("button", class_=re.compile(r"button|btn"))
    btn_text = button_el.get_text(strip=True) if button_el else "Xem ngay"
    
    if title:
        courses.append({
            "id": f"course-{idx+1}",
            "slug": slug,
            "title": title,
            "category": category_name,
            "image": img_src,
            "salePrice": sale_price,
            "regularPrice": regular_price or "1.500.000 ₫",
            "discount": discount or "-80%",
            "rating": 5.0,
            "reviewsCount": 128 + (idx * 17) % 350,
            "studentsCount": 450 + (idx * 53) % 1200,
            "isFlashSale": is_flash,
            "buttonText": btn_text,
            "href": href
        })

# Deduplicate courses by slug/title
unique_courses = []
seen = set()
for c in courses:
    key = c["slug"] or c["title"]
    if key not in seen:
        seen.add(key)
        unique_courses.append(c)

# 3. Testimonials
testimonials = [
    {
        "id": "1",
        "name": "Nguyễn Hoàng Nam",
        "role": "Software Engineer",
        "avatar": "/images/24_feedback-khach-hang-49.webp",
        "rating": 5,
        "content": "Khóa học đầy đủ tài liệu, video Full HD sắc nét, âm thanh rõ ràng. Mình tiết kiệm được hơn chục triệu tiền mua lẻ từng khóa. Quá hời!",
        "course": "Full Combo Lập Trình 28Tech & AI"
    },
    {
        "id": "2",
        "name": "Trần Thị Mai Anh",
        "role": "Marketing Specialist",
        "avatar": "/images/25_feedback-khach-hang-51.webp",
        "rating": 5,
        "content": "Admin support cực kỳ nhiệt tình qua Zalo, chuyển khoản xong trong 2 phút là có link Google Drive truy cập trọn đời ngay. Sẽ ủng hộ dài dài.",
        "course": "Trọn bộ Khóa học Marketing & Facebook Ads"
    },
    {
        "id": "3",
        "name": "Lê Quốc Bảo",
        "role": "Freelancer & Content Creator",
        "avatar": "/images/26_feedback-khach-hang-57.webp",
        "rating": 5,
        "content": "Gói trọn bộ 2.000 khóa học giá 599k thực sự là món hời nhất từng mua. Đủ mọi lĩnh vực từ Vibe Coding, AI, đồ họa đến ngoại ngữ.",
        "course": "Trọn Bộ Hơn 2.000 Khóa Học Vĩnh Viễn"
    },
    {
        "id": "4",
        "name": "Đặng Minh Quân",
        "role": "Data Analyst",
        "avatar": "/images/27_feedback-khach-hang-58.webp",
        "rating": 5,
        "content": "Khoá học AI và MLOps rất chất lượng, có cả bài tập thực hành và code mẫu. Rất hài lòng về tốc độ tải Google Drive.",
        "course": "Combo Data Science & MLOps AIVietnam"
    }
]

# 4. Membership Plans
membership_plans = [
    {
        "id": "starter",
        "name": "Gói Mua Lẻ Từng Khóa",
        "price": "49.000 ₫",
        "period": "khóa",
        "popular": False,
        "description": "Phù hợp cho bạn chỉ cần học một kỹ năng hoặc công cụ cụ thể.",
        "features": [
            "Truy cập vĩnh viễn khóa học đã chọn",
            "Xem trực tiếp hoặc tải về máy qua Google Drive",
            "Cập nhật nội dung khóa học nếu có phần mới",
            "Hỗ trợ kỹ thuật 24/7 qua Zalo"
        ],
        "buttonText": "Chọn Khóa Học",
        "buttonHref": "#courses"
    },
    {
        "id": "vip-all",
        "name": "Trọn Bộ Hơn 2.000+ Khóa Học",
        "price": "599.000 ₫",
        "period": "trọn đời",
        "popular": True,
        "badge": "TIẾT KIỆM 99% - BÁN CHẠY NHẤT",
        "description": "Toàn quyền truy cập tất cả mọi khóa học hiện tại và tương lai trên website.",
        "features": [
            "Truy cập hơn 2.000+ khóa học thuộc mọi lĩnh vực",
            "Quyền truy cập vĩnh viễn (Lifetime Access)",
            "Tự động cập nhật các khóa học mới hàng tuần",
            "Tặng kèm bộ công cụ Tool Download, Drive Backup",
            "Kênh Telegram VIP nhận thông báo cập nhật",
            "Bảo hành link tải và hỗ trợ ưu tiên 1-1"
        ],
        "buttonText": "Đăng Ký Gói 599K Ngay",
        "buttonHref": "/khoa-hoc/tron-bo-khoa-hoc-tren-website-voi-quyen-truy-cap-vinh-vien-and-cap-nhat-lien-tuc"
    },
    {
        "id": "drive-tool",
        "name": "Tool & Công Cụ Học Tập",
        "price": "99.000 ₫",
        "period": "vĩnh viễn",
        "popular": False,
        "description": "Bộ tiện ích hỗ trợ tải video chặn tải, sao lưu Drive không giới hạn.",
        "features": [
            "Tool tải video Drive bị chặn tải",
            "Tool sao lưu Drive hàng loạt siêu tốc",
            "Tool tải tài liệu Scribd, StuDocu, 123doc",
            "Hướng dẫn cài đặt chi tiết bằng video"
        ],
        "buttonText": "Xem Chi Tiết Tool",
        "buttonHref": "#tools"
    }
]

# 5. FAQs
faqs = [
    {
        "question": "Tôi sẽ nhận khóa học như thế nào sau khi thanh toán?",
        "answer": "Sau khi chuyển khoản thành công, hệ thống tự động hoặc Admin qua Zalo sẽ gửi link thư mục Google Drive chứa toàn bộ video bài giảng, tài liệu, slide, mã nguồn. Bạn có thể xem online hoặc tải về máy vĩnh viễn."
    },
    {
        "question": "Khóa học có thời hạn xem không, có bị mất link không?",
        "answer": "Tất cả các khóa học tại Khóa Học Giá Hời đều có quyền truy cập TRỌN ĐỜI (Lifetime). Hệ thống có hệ thống sao lưu đa tầng (backup), nếu có bất kỳ sự cố link tải nào, Admin cam kết cấp lại link mới ngay lập tức qua Zalo hỗ trợ."
    },
    {
        "question": "Nội dung khóa học có đầy đủ như khóa gốc không?",
        "answer": "Nội dung chuẩn 100% video gốc Full HD, bài giảng âm thanh rõ nét kèm đầy đủ tài liệu, mã nguồn thực hành, file đính kèm của giảng viên/trung tâm."
    },
    {
        "question": "Gói trọn bộ 599K có thực sự được cập nhật khóa mới không?",
        "answer": "Đúng vậy! Thành viên gói trọn bộ 599K được thêm vào thư mục Drive tổng và nhóm cập nhật riêng, mỗi khi có khóa học hot mới về AI, Lập trình, Marketing, Ngoại ngữ... hệ thống sẽ tự động cập nhật vào kho mà không thu thêm bất kỳ phụ phí nào."
    },
    {
        "question": "Tôi cần hỗ trợ kỹ thuật hoặc tư vấn thì liên hệ qua đâu?",
        "answer": "Bạn có thể liên hệ trực tiếp qua Zalo hỗ trợ: 0583 953 426 (hỗ trợ nhanh từ 8h00 đến 23h30 hàng ngày kể cả thứ 7, CN và ngày lễ)."
    }
]

# 6. Tools Section
tools = [
    {
        "title": "Tool Tải Video Drive Bị Chặn Tải",
        "category": "Công cụ độc quyền",
        "image": "/images/16_tool-tai-video-google-drive-bi-chan-tai-thumbnail.jpg",
        "price": "Miễn phí với VIP",
        "tag": "Hot Tool"
    },
    {
        "title": "Drive Backup Master Tool",
        "category": "Sao lưu dữ liệu",
        "image": "/images/20_drive-master.png",
        "price": "Tặng kèm trọn bộ",
        "tag": "Tiện ích"
    },
    {
        "title": "Document Downloader Pro",
        "category": "Tải tài liệu học tập",
        "image": "/images/23_document-downloader.png",
        "price": "Tặng kèm trọn bộ",
        "tag": "Mới"
    }
]

# 7. Goals
goals = [
    {"title": "Học Lập Trình & AI Đi Làm", "desc": "Java, Python, Next.js, AI Vibe Coding từ cơ bản tới nâng cao", "icon": "Terminal", "count": "95+ khóa học"},
    {"title": "Làm Chủ AI Trong Công Việc", "desc": "Claude AI, ChatGPT, Prompt Engineering, Tự động hóa", "icon": "Cpu", "count": "60+ khóa học"},
    {"title": "Kiếm Tiền MMO & Affiliate", "desc": "Video AI, TikTok Shop, YouTube Shorts, Dropshipping", "icon": "Banknote", "count": "80+ khóa học"},
    {"title": "Chạy Quảng Cáo & Marketing", "desc": "Facebook Ads 2025, Google Ads, SEO, Content Marketing", "icon": "Target", "count": "110+ khóa học"},
    {"title": "Giao Tiếp Ngoại Ngữ Cấp Tốc", "desc": "Tiếng Anh giao tiếp, Tiếng Trung HSK, Tiếng Hàn, Tiếng Nhật", "icon": "Globe", "count": "75+ khóa học"},
    {"title": "Đầu Tư Tài Chính & Giao Dịch", "desc": "Forex, Smart Money Concept (SMC), Price Action, Crypto", "icon": "LineChart", "count": "45+ khóa học"}
]

data = {
    "siteInfo": {
        "title": "Khóa Học Giá Hời - Share khóa học giá rẻ, uy tín, chất lượng",
        "tagline": "Khám phá hàng ngàn khóa học online chất lượng cao với mức giá ưu đãi nhất",
        "phone": "0583 953 426",
        "zalo": "https://zalo.me/0583953426",
        "logo": "/images/0_logo.png",
        "banner599k": "/images/1_599k_1.webp",
        "bannerAffiliate": "/images/2_affiliate-program-banner.webp",
        "bannerSpecial": "/images/48_special-offer-banner.png"
    },
    "categories": categories,
    "courses": unique_courses,
    "testimonials": testimonials,
    "membershipPlans": membership_plans,
    "faqs": faqs,
    "tools": tools,
    "goals": goals
}

out_json = os.path.join(base_dir, "public", "data", "siteData.json")
os.makedirs(os.path.dirname(out_json), exist_ok=True)
with open(out_json, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Generated Next.js data at {out_json}: {len(unique_courses)} unique courses, {len(categories)} categories.")
