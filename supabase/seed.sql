insert into public.authors (slug, name, bio)
values
  ('phi-thien-ngu', 'Phi Thiên Ngư', 'Tác giả tiên hiệp với thế giới tu luyện rộng lớn.'),
  ('thien-tam-tho-dau', 'Thiên Tằm Thổ Đậu', 'Tác giả huyền huyễn nổi tiếng.'),
  ('mac-lien', 'Mặc Liên', 'Tác giả ngôn tình cổ đại.'),
  ('co-man', 'Cố Mạn', 'Tác giả ngôn tình hiện đại.');

insert into public.genres (slug, name, description, sort_order)
values
  ('tien-hiep', 'Tiên Hiệp', 'Tu luyện, tiên đạo và đại thế giới.', 10),
  ('huyen-huyen', 'Huyền Huyễn', 'Thế giới kỳ ảo và sức mạnh siêu nhiên.', 20),
  ('ngon-tinh', 'Ngôn Tình', 'Tình cảm và quan hệ nhân vật.', 30),
  ('do-thi', 'Đô Thị', 'Bối cảnh hiện đại và đời sống thành thị.', 40),
  ('nu-cuong', 'Nữ Cường', 'Nữ chính mạnh mẽ và chủ động.', 50),
  ('trong-sinh', 'Trọng Sinh', 'Nhân vật làm lại cuộc đời.', 60);

insert into public.stories (
  slug,
  author_id,
  title,
  alternative_title,
  synopsis,
  cover_path,
  story_status,
  publication_status,
  is_featured,
  is_hot,
  is_vip,
  rating_average,
  rating_count,
  read_count,
  follow_count,
  chapter_count,
  latest_chapter_number,
  latest_published_at,
  published_at
)
select
  seed.slug,
  authors.id,
  seed.title,
  seed.alternative_title,
  seed.synopsis,
  seed.cover_path,
  seed.story_status,
  seed.publication_status,
  seed.is_featured,
  seed.is_hot,
  seed.is_vip,
  seed.rating_average,
  seed.rating_count,
  seed.read_count,
  seed.follow_count,
  seed.chapter_count,
  seed.latest_chapter_number,
  seed.latest_published_at,
  seed.published_at
from (
  values
    (
      'van-co-than-de', 'phi-thien-ngu', 'Vạn Cổ Thần Đế', null,
      'Trương Thần trọng sinh, mang theo ký ức Thần Đế để phá cục sinh tử và trở lại con đường tu luyện.',
      '/bia-truyen/ba-xa-xinh-dep-sau-khi-ly-hon-1774133037.jpg',
      'ongoing', 'published', true, true, true, 4.80::numeric, 12500::bigint,
      1200000::bigint, 125600::bigint, 20, 2686.00::numeric, now() - interval '2 minutes', now() - interval '2 years'
    ),
    (
      'dau-pha-thuong-khung', 'thien-tam-tho-dau', 'Đấu Phá Thương Khung', null,
      'Một thiếu niên mất đi thiên phú bước vào hành trình nghịch thiên để giành lại tất cả.',
      '/bia-truyen/chi-dai-xung-than-trong-show-tap-ky-thong-linh-1764284981.jpg',
      'completed', 'published', false, true, false, 4.85::numeric, 9800::bigint,
      1000000::bigint, 96000::bigint, 2, 1652.00::numeric, now() - interval '30 minutes', now() - interval '3 years'
    ),
    (
      'tro-thanh-kieu-nu', 'mac-lien', 'Trở Thành Kiều Nữ Trong Lòng Thái Tử', 'Bùi Đại Nhân Hối Hận',
      'Thiên Mẫn Châu tự mình thoát khỏi lời nguyền cổ, mở ra con đường quyền mưu đầy hiểm nguy.',
      '/bia-truyen/thai-tu-cuong-ai-doat-the-1767748297.jpg',
      'ongoing', 'published', true, true, false, 4.82::numeric, 8600::bigint,
      825000::bigint, 67000::bigint, 2, 188.00::numeric, now() - interval '52 minutes', now() - interval '1 year'
    ),
    (
      'than-dao-dan-ton', 'phi-thien-ngu', 'Thần Đạo Đan Tôn', null,
      'Đan đạo chí tôn quay về thời niên thiếu và bước qua những bí cảnh nguy hiểm nhất đại lục.',
      '/bia-truyen/cong-chua-hom-nay-tay-trang-sao-1752423420.jpg',
      'completed', 'published', false, true, true, 4.72::numeric, 7200::bigint,
      760000::bigint, 54000::bigint, 2, 1044.00::numeric, now() - interval '1 hour', now() - interval '4 years'
    ),
    (
      'toan-chuc-phap-su', 'thien-tam-tho-dau', 'Toàn Chức Pháp Sư', null,
      'Một thế giới đô thị nơi ma pháp song hành với đời sống hiện đại.',
      '/bia-truyen/giong-cai-cuoi-cung-thoi-tinh-te-1754907283.jpg',
      'ongoing', 'published', false, true, false, 4.70::numeric, 6100::bigint,
      690000::bigint, 49000::bigint, 2, 1198.00::numeric, now() - interval '2 hours', now() - interval '18 months'
    ),
    (
      'nhat-niem-vinh-hang', 'phi-thien-ngu', 'Nhất Niệm Vĩnh Hằng', null,
      'Một ý niệm có thể thành tiên, một lựa chọn có thể đổi cả thiên hạ.',
      '/bia-truyen/huynh-truong-doc-sung-tieu-muoi-1762460517.jpg',
      'completed', 'published', false, false, false, 4.90::numeric, 5800::bigint,
      620000::bigint, 43000::bigint, 2, 981.00::numeric, now() - interval '5 hours', now() - interval '5 years'
    ),
    (
      'kiem-lai', 'phi-thien-ngu', 'Kiếm Lai', null,
      'Một thiếu niên giữ kiếm trong lòng, đi qua giang hồ và học cách nhìn thẳng vào nhân tình.',
      '/bia-truyen/ke-hoach-thuan-hoa-bao-quan-tan-doc-1759585901.jpg',
      'ongoing', 'published', false, true, true, 4.92::numeric, 5500::bigint,
      590000::bigint, 41000::bigint, 2, 778.00::numeric, now() - interval '8 hours', now() - interval '2 years'
    ),
    (
      'ba-xa-xinh-dep', 'co-man', 'Bà Xã Xinh Đẹp Sau Khi Ly Hôn', null,
      'Sau ly hôn, cô xây dựng lại cuộc sống và tìm thấy giá trị của chính mình.',
      '/bia-truyen/my-nhan-trong-long-lang-vuong-1764415439.jpg',
      'completed', 'published', false, false, false, 4.60::numeric, 4200::bigint,
      510000::bigint, 36000::bigint, 2, 520.00::numeric, now() - interval '10 hours', now() - interval '2 years'
    ),
    (
      'cong-chua-hom-nay', 'mac-lien', 'Công Chúa Hôm Nay Tẩy Trắng Sao', null,
      'Một công chúa mang tiếng xấu tìm cách thay đổi số phận và bảo vệ người thân.',
      '/bia-truyen/song-lai-thanh-bao-boi-trong-long-nhiep-chinh-vuong-1757198074.jpg',
      'ongoing', 'published', false, false, false, 4.68::numeric, 3900::bigint,
      470000::bigint, 33000::bigint, 2, 366.00::numeric, now() - interval '12 hours', now() - interval '1 year'
    ),
    (
      'ban-thao-chua-cong-bo', 'co-man', 'Bản Thảo Chưa Công Bố', null,
      'Dữ liệu draft dùng để kiểm tra chính sách không công khai nội dung.',
      null,
      'ongoing', 'draft', false, false, false, 0::numeric, 0::bigint,
      0::bigint, 0::bigint, 1, 1.00::numeric, null, null
    )
) as seed (
  slug,
  author_slug,
  title,
  alternative_title,
  synopsis,
  cover_path,
  story_status,
  publication_status,
  is_featured,
  is_hot,
  is_vip,
  rating_average,
  rating_count,
  read_count,
  follow_count,
  chapter_count,
  latest_chapter_number,
  latest_published_at,
  published_at
)
join public.authors on authors.slug = seed.author_slug;

insert into public.story_genres (story_id, genre_id, is_primary)
select stories.id, genres.id, mapping.is_primary
from (
  values
    ('van-co-than-de', 'tien-hiep', true),
    ('van-co-than-de', 'huyen-huyen', false),
    ('dau-pha-thuong-khung', 'huyen-huyen', true),
    ('tro-thanh-kieu-nu', 'ngon-tinh', true),
    ('tro-thanh-kieu-nu', 'nu-cuong', false),
    ('than-dao-dan-ton', 'tien-hiep', true),
    ('toan-chuc-phap-su', 'do-thi', true),
    ('toan-chuc-phap-su', 'huyen-huyen', false),
    ('nhat-niem-vinh-hang', 'tien-hiep', true),
    ('kiem-lai', 'tien-hiep', true),
    ('ba-xa-xinh-dep', 'ngon-tinh', true),
    ('ba-xa-xinh-dep', 'do-thi', false),
    ('cong-chua-hom-nay', 'ngon-tinh', true),
    ('cong-chua-hom-nay', 'trong-sinh', false),
    ('ban-thao-chua-cong-bo', 'do-thi', true)
) as mapping (story_slug, genre_slug, is_primary)
join public.stories on stories.slug = mapping.story_slug
join public.genres on genres.slug = mapping.genre_slug;

insert into public.chapters (
  story_id,
  chapter_number,
  slug,
  title,
  access_level,
  coin_price,
  publication_status,
  is_hot,
  published_at,
  word_count
)
select
  stories.id,
  chapter_number,
  'chuong-' || chapter_number::text,
  case
    when chapter_number = 2686 then 'Quyết chiến'
    when chapter_number = 2685 then 'Phá vỡ cấm chế'
    else 'Thần Uyên chương ' || chapter_number::text
  end,
  case when chapter_number in (2667, 2670, 2675, 2680, 2686) then 'free' else 'vip' end,
  case when chapter_number in (2667, 2670, 2675, 2680, 2686) then 0 else 700 end,
  'published',
  chapter_number = 2686,
  now() - ((2686 - chapter_number) || ' hours')::interval,
  2100 + (chapter_number - 2667)::integer * 10
from public.stories
cross join generate_series(2667, 2686) as chapter_number
where stories.slug = 'van-co-than-de';

insert into public.chapters (
  story_id,
  chapter_number,
  slug,
  title,
  access_level,
  coin_price,
  publication_status,
  published_at,
  word_count
)
select
  stories.id,
  chapter_number,
  'chuong-' || chapter_number::text,
  'Chương mẫu ' || chapter_number::text,
  case when chapter_number = stories.latest_chapter_number then 'free' else 'vip' end,
  case when chapter_number = stories.latest_chapter_number then 0 else 500 end,
  'published',
  stories.latest_published_at - ((stories.latest_chapter_number - chapter_number)::integer || ' hours')::interval,
  1800
from public.stories
cross join lateral (
  values
    (stories.latest_chapter_number - 1),
    (stories.latest_chapter_number)
) as generated (chapter_number)
where stories.publication_status = 'published'
  and stories.slug <> 'van-co-than-de';

insert into public.chapters (
  story_id,
  chapter_number,
  slug,
  title,
  access_level,
  coin_price,
  publication_status,
  word_count
)
select id, 1, 'chuong-1', 'Chương nội bộ', 'free', 0, 'draft', 1200
from public.stories
where slug = 'ban-thao-chua-cong-bo';

insert into public.chapter_contents (chapter_id, content)
select
  chapters.id,
  concat(
    'Màn đêm phủ xuống Thần Uyên. Đây là nội dung mẫu của ',
    stories.title,
    ' — chương ',
    chapters.chapter_number,
    '.'
  )
from public.chapters
join public.stories on stories.id = chapters.story_id;

insert into auth.users (
  id,
  email,
  raw_user_meta_data,
  created_at,
  updated_at
)
values
  (
    '10000000-0000-0000-0000-000000000001',
    'binh-luan-mot@example.com',
    '{"display_name":"Thiên Đạo Vô Cực"}'::jsonb,
    now(),
    now()
  ),
  (
    '10000000-0000-0000-0000-000000000002',
    'binh-luan-hai@example.com',
    '{"display_name":"Kiếm Tâm"}'::jsonb,
    now(),
    now()
  ),
  (
    '10000000-0000-0000-0000-000000000003',
    'binh-luan-ba@example.com',
    '{"display_name":"Huyền Vũ"}'::jsonb,
    now(),
    now()
  );

insert into public.comments (user_id, story_id, body, created_at)
select seed.user_id::uuid, stories.id, seed.body, now() - seed.age
from (
  values
    (
      '10000000-0000-0000-0000-000000000001',
      'Truyện quá hay! Mình đã đọc, tình tiết hấp dẫn, càng đọc càng cuốn!',
      interval '2 hours'
    ),
    (
      '10000000-0000-0000-0000-000000000002',
      'Chương mới ra nhanh quá, cảm ơn tác giả và nhóm tác giả nhiều!',
      interval '1 hour'
    ),
    (
      '10000000-0000-0000-0000-000000000003',
      'Top 1 tiên hiệp không phải tự nhiên mà có!',
      interval '30 minutes'
    )
) as seed (user_id, body, age)
join public.stories on stories.slug = 'van-co-than-de';
